import React from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loadResults, ResultRecord } from "@/lib/storage";

const downloadImage = async (url: string, filename: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(objectUrl);
};

const normalize = (value: string) => value.trim().toLowerCase();

export default function ResultPortal() {
  const [results, setResults] = React.useState<ResultRecord[]>([]);
  const [query, setQuery] = React.useState("");
  const [activeResult, setActiveResult] = React.useState<ResultRecord | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let active = true;
    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await loadResults();
        if (!active) return;
        setResults(data);
      } catch (error) {
        if (!active) return;
        setError("Unable to load results right now.");
      } finally {
        if (!active) return;
        setLoading(false);
      }
    };
    fetchResults();
    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveResult(null);
      }
    };
    if (activeResult) {
      window.addEventListener("keydown", handleKey);
    }
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeResult]);

  const published = results
    .filter((r) => r.published)
    .filter((r) => {
      const term = normalize(query);
      if (!term) return true;
      return [r.className, r.title || ""]
        .join(" ")
        .toLowerCase()
        .includes(term);
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <Layout>
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-bold text-foreground">Results</h1>
            <p className="text-foreground/70 mt-2">Published class result sheets are available below.</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card border border-accent/20 p-6 shadow-md">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by class or title"
              className="rounded-none border-accent/20 md:max-w-sm"
            />
            <Button
              onClick={async () => {
                setLoading(true);
                setError("");
                try {
                  const data = await loadResults();
                  setResults(data);
                } catch (error) {
                  setError("Unable to load results right now.");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="bg-primary text-white font-bold rounded-none px-6"
            >
              {loading ? "Refreshing..." : "Refresh Results"}
            </Button>
          </div>
          {error && (
            <div className="bg-red-500/10 border border-red-400/40 text-red-100 px-4 py-3 text-sm">
              {error}
            </div>
          )}
          {loading && (
            <div className="bg-card border border-accent/20 p-6 text-center text-foreground/70">
              Loading results...
            </div>
          )}

          {!published.length && !loading && (
            <div className="bg-card border border-accent/20 p-10 text-center text-foreground/70">
              No published results yet.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {published.map((result) => (
              <div key={result.id} className="bg-card border border-accent/20 shadow-xl p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-heading font-bold text-foreground">
                      Class {result.className}
                    </h2>
                    <p className="text-foreground/70 text-xs">
                      {result.title || "Result Sheet"}
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center min-w-[36px] px-2 py-1 text-xs font-bold bg-accent/20 text-foreground rounded-full">
                    {result.className || "-"}
                  </span>
                </div>

                {result.imageDataUrl ? (
                  <button
                    type="button"
                    onClick={() => setActiveResult(result)}
                    className="w-full border border-accent/20 bg-background p-2 hover:bg-accent/10 transition-colors"
                    aria-label={`Open result sheet for class ${result.className}`}
                  >
                    <div className="relative">
                      <img
                        src={result.imageDataUrl}
                        alt={`Result sheet for ${result.className}`}
                        className="w-full h-[200px] object-contain"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center">
                        <span className="px-3 py-1 text-[11px] font-bold tracking-widest uppercase bg-black/70 text-white">
                          View Result
                        </span>
                      </div>
                    </div>
                  </button>
                ) : (
                  <p className="text-sm text-foreground/60">Result image not uploaded yet.</p>
                )}

                <div className="flex flex-col gap-2 text-xs text-foreground/50">
                  <span>Published on {new Date(result.createdAt).toLocaleDateString()}</span>
                  <Button
                    onClick={() =>
                      result.imageDataUrl &&
                      downloadImage(result.imageDataUrl, `result-${result.className || "class"}.png`)
                    }
                    disabled={!result.imageDataUrl}
                    className="bg-accent text-foreground font-bold rounded-none px-4 py-2"
                  >
                    Download Result
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeResult && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveResult(null)}
        >
          <div
            className="bg-card border border-accent/20 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 border-b border-accent/20">
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">
                  Class {activeResult.className}
                </h3>
                <p className="text-foreground/70 text-sm">{activeResult.title || "Result Sheet"}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() =>
                    activeResult.imageDataUrl &&
                    downloadImage(activeResult.imageDataUrl, `result-${activeResult.className || "class"}.png`)
                  }
                  className="bg-accent text-foreground font-bold rounded-none px-4 py-2"
                >
                  Download
                </Button>
                <Button
                  onClick={() => setActiveResult(null)}
                  className="bg-card text-foreground font-bold rounded-none px-4 py-2 border border-accent/30"
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="p-4 bg-background">
              {activeResult.imageDataUrl ? (
                <img
                  src={activeResult.imageDataUrl}
                  alt={`Result sheet for ${activeResult.className}`}
                  className="w-full max-h-[70vh] object-contain"
                />
              ) : (
                <p className="text-sm text-foreground/60">Result image not uploaded yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

