import React from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildTeacherCertificateSvg, downloadPngFromSvg } from "@/lib/certificate";
import { findTeacher, loadSettings, Settings, TeacherRecord } from "@/lib/storage";

const LOGO_URL = "/logo.jpeg";

const getDataUrl = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(blob);
  });
};

export default function TeacherPortal() {
  const [name, setName] = React.useState("");
  const [fatherName, setFatherName] = React.useState("");
  const [teacher, setTeacher] = React.useState<TeacherRecord | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [settings, setSettings] = React.useState<Settings>(loadSettings());
  const [logoDataUrl, setLogoDataUrl] = React.useState("");

  React.useEffect(() => {
    setSettings(loadSettings());
    getDataUrl(LOGO_URL).then(setLogoDataUrl).catch(() => setLogoDataUrl(""));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameTerm = name.trim().toLowerCase();
    const fatherTerm = fatherName.trim().toLowerCase();
    if (!nameTerm || !fatherTerm) {
      setTeacher(null);
      setError("Please enter Name and Father Name to search.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const match = await findTeacher(nameTerm, fatherTerm);
      if (!match) {
        setTeacher(null);
        setError("Record not found. Please check Name and Father Name.");
        return;
      }
      setTeacher(match);
    } catch (error) {
      setTeacher(null);
      setError("Unable to search right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!teacher) return;
    const logo = logoDataUrl || (await getDataUrl(LOGO_URL));
    if (!logo) return;
    setLogoDataUrl(logo);
    const svg = buildTeacherCertificateSvg(teacher, settings, logo);
    await downloadPngFromSvg(svg, `teacher-certificate-${teacher.teacherId}.png`, 1200, 820);
  };

  return (
    <Layout>
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-heading font-bold text-foreground">Teacher Portal</h1>
            <p className="text-foreground/70 mt-2">Search your record and download your certificate.</p>
          </div>

          <form onSubmit={handleSearch} className="bg-card p-6 sm:p-8 border border-accent/20 shadow-xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="rounded-none border-accent/20" />
              </div>
              <div className="space-y-2">
                <Label>Father Name</Label>
                <Input value={fatherName} onChange={(e) => setFatherName(e.target.value)} className="rounded-none border-accent/20" />
              </div>
            </div>
            <Button className="w-full h-12 bg-primary text-white font-bold rounded-none" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </form>

          {teacher && (
            <div className="mt-10 bg-card p-6 sm:p-8 border border-accent/20 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <img src={logoDataUrl || LOGO_URL} alt="Logo" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h2 className="text-xl font-heading font-bold text-foreground">THE SMART SCHOOL & GIRLS COLLEGE</h2>
                  <p className="text-foreground/70 text-sm">Teacher Certificate</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground/80">
                <p><span className="font-bold">Name:</span> {teacher.name}</p>
                <p><span className="font-bold">Father Name:</span> {teacher.fatherName}</p>
                <p><span className="font-bold">Teacher ID:</span> {teacher.teacherId}</p>
                <p><span className="font-bold">CNIC:</span> {teacher.cnic}</p>
                <p><span className="font-bold">Mobile:</span> {teacher.mobile}</p>
                <p><span className="font-bold">Address:</span> {teacher.address}</p>
                <p><span className="font-bold">Salary:</span> {teacher.salary}</p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-accent/20 pt-6">
                <div>
                  <p className="text-foreground font-bold">{settings.principalName}</p>
                  <p className="text-foreground/70 text-xs uppercase tracking-widest">{settings.principalTitle}</p>
                </div>
                {settings.signatureDataUrl && (
                  <img src={settings.signatureDataUrl} alt="Signature" className="h-14 object-contain" />
                )}
              </div>
              <div className="mt-6">
                <Button onClick={handleDownload} className="w-full h-12 bg-accent text-foreground font-bold rounded-none">
                  Download Certificate
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

