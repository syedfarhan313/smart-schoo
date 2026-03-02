import React from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildStudentCertificateSvg, downloadPngFromSvg } from "@/lib/certificate";
import { findStudent, loadSettings, Settings, StudentRecord } from "@/lib/storage";

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

export default function StudentPortal() {
  const [regNo, setRegNo] = React.useState("");
  const [name, setName] = React.useState("");
  const [fatherName, setFatherName] = React.useState("");
  const [student, setStudent] = React.useState<StudentRecord | null>(null);
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
    setLoading(true);
    setError("");
    try {
      const match = await findStudent(regNo, name, fatherName);
      if (!match) {
        setStudent(null);
        setError("Record not found. Please check Reg No, Name, and Father Name.");
        return;
      }
      setStudent(match);
    } catch (error) {
      setStudent(null);
      setError("Unable to search right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!student) return;
    const logo = logoDataUrl || (await getDataUrl(LOGO_URL));
    if (!logo) return;
    setLogoDataUrl(logo);
    const svg = buildStudentCertificateSvg(student, settings, logo);
    await downloadPngFromSvg(svg, `student-certificate-${student.regNo}.png`, 1200, 900);
  };

  return (
    <Layout>
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-heading font-bold text-foreground">Student Portal</h1>
            <p className="text-foreground/70 mt-2">Search your record and download your certificate.</p>
          </div>

          <form onSubmit={handleSearch} className="bg-card p-6 sm:p-8 border border-accent/20 shadow-xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Student Reg No</Label>
                <Input value={regNo} onChange={(e) => setRegNo(e.target.value)} required className="rounded-none border-accent/20" />
              </div>
              <div className="space-y-2">
                <Label>Student Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required className="rounded-none border-accent/20" />
              </div>
              <div className="space-y-2">
                <Label>Father Name</Label>
                <Input value={fatherName} onChange={(e) => setFatherName(e.target.value)} required className="rounded-none border-accent/20" />
              </div>
            </div>
            <Button className="w-full h-12 bg-primary text-white font-bold rounded-none" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </form>

          {student && (
            <div className="mt-10 bg-card p-6 sm:p-8 border border-accent/20 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <img src={logoDataUrl || LOGO_URL} alt="Logo" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h2 className="text-xl font-heading font-bold text-foreground">THE SMART SCHOOL & GIRLS COLLEGE</h2>
                  <p className="text-foreground/70 text-sm">Student Certificate</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground/80">
                <p><span className="font-bold">Name:</span> {student.name}</p>
                <p><span className="font-bold">Father Name:</span> {student.fatherName}</p>
                <p><span className="font-bold">Reg No:</span> {student.regNo}</p>
                <p><span className="font-bold">Class:</span> {student.className || student.course}</p>
                <p><span className="font-bold">Phone:</span> {student.phone || "-"}</p>
                <p className="md:col-span-2"><span className="font-bold">Address:</span> {student.address || "-"}</p>
                <p><span className="font-bold">Date of Birth:</span> {student.dateOfBirth || "-"}</p>
                <p><span className="font-bold">Student CNIC/B-Form:</span> {student.studentCnic || "-"}</p>
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

