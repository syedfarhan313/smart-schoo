import React from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

declare global {
  interface Window {
    emailjs?: {
      init: (publicKey: string) => void;
      sendForm: (serviceId: string, templateId: string, form: HTMLFormElement) => Promise<{ status: number; text: string }>;
    };
  }
}

const EMAIL_SERVICE_ID = "service_fnu802k";
const EMAIL_TEMPLATE_ID = "template_wrfa10s";
const EMAIL_PUBLIC_KEY = "TwHzNUnj5O158AQop";

export default function Admissions() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const emailReadyRef = React.useRef(false);
  const [gender, setGender] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const loadEmailJs = React.useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.emailjs?.init) {
        resolve();
        return;
      }
      const existing = document.querySelector<HTMLScriptElement>('script[data-emailjs="true"]');
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("EmailJS failed to load.")), { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.async = true;
      script.setAttribute("data-emailjs", "true");
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("EmailJS failed to load."));
      document.body.appendChild(script);
    });
  }, []);

  React.useEffect(() => {
    loadEmailJs()
      .then(() => {
        if (!emailReadyRef.current) {
          window.emailjs?.init(EMAIL_PUBLIC_KEY);
          emailReadyRef.current = true;
        }
      })
      .catch(() => {
        // ignore init errors, handled on submit
      });
  }, [loadEmailJs]);

  const showModal = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formRef.current || sending) return;
    const submitDateInput = formRef.current.querySelector<HTMLInputElement>("#submitDate");
    if (submitDateInput) {
      submitDateInput.value = new Date().toLocaleString();
    }
    setSending(true);
    try {
      await loadEmailJs();
      if (!emailReadyRef.current) {
        window.emailjs?.init(EMAIL_PUBLIC_KEY);
        emailReadyRef.current = true;
      }
      if (!window.emailjs?.sendForm) throw new Error("EmailJS is not loaded.");
      await window.emailjs.sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, formRef.current);
      showModal("Thank you! We will contact you soon.");
      formRef.current.reset();
      setGender("");
    } catch (error) {
      console.log(error);
      showModal("Error sending message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 md:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-heading tracking-[0.2em] text-xs uppercase font-bold">JOIN OUR COMMUNITY</span>
              <div className="w-8 h-[1px] bg-accent" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold mb-6">
              Admissions <br />
              <span className="text-accent italic font-medium">Process & Info</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12 font-body">
              Join one of Pakistan's premier institutions for girls. We look for bright, motivated students who are eager to learn and grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admission Form */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto bg-card p-6 sm:p-8 md:p-10 shadow-2xl gold-border relative">
            <div className="absolute top-0 right-0 w-32 h-32 islamic-pattern opacity-10 pointer-events-none" />
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8">Admission Form</h2>
            <form id="admissionForm" ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="submit_date" id="submitDate" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input id="studentName" name="student_name" required placeholder="Enter student name" className="rounded-none border-accent/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father Name *</Label>
                  <Input id="fatherName" name="father_name" required placeholder="Enter father name" className="rounded-none border-accent/20" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input id="dob" name="dob" type="date" required className="rounded-none border-accent/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class *</Label>
                  <Input id="class" name="class_name" required placeholder="Enter class" className="rounded-none border-accent/20" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="previousClass">Previous Class *</Label>
                  <Input id="previousClass" name="previous_class" required placeholder="Enter previous class" className="rounded-none border-accent/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousSchool">Previous School *</Label>
                  <Input id="previousSchool" name="previous_school" required placeholder="Enter previous school" className="rounded-none border-accent/20" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <input type="hidden" name="gender" value={gender} />
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender" className="rounded-none border-accent/20">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="religion">Religion *</Label>
                  <Input id="religion" name="religion" required placeholder="Enter religion" className="rounded-none border-accent/20" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Input id="nationality" name="nationality" required placeholder="Enter nationality" className="rounded-none border-accent/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input id="phoneNumber" name="phone_number" required placeholder="+92 300 1234567" className="rounded-none border-accent/20" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
                  <Input id="whatsappNumber" name="whatsapp_number" required placeholder="+92 300 1234567" className="rounded-none border-accent/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardianName">Guardian Name *</Label>
                  <Input id="guardianName" name="guardian_name" required placeholder="Enter guardian name" className="rounded-none border-accent/20" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bFormNumber">B-Form Number *</Label>
                  <Input id="bFormNumber" name="bform_number" required placeholder="Enter B-Form number" className="rounded-none border-accent/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fatherCnicNumber">Father CNIC Number *</Label>
                  <Input id="fatherCnicNumber" name="father_cnic_number" required placeholder="Enter father CNIC number" className="rounded-none border-accent/20" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherDetails">Father Details / Job etc *</Label>
                <Textarea id="fatherDetails" name="father_details" required placeholder="Enter father details and job information" className="rounded-none border-accent/20 min-h-[120px]" />
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={sending} className="w-full h-16 bg-accent hover:bg-accent/90 text-foreground font-bold text-lg rounded-none gold-gradient shadow-2xl transition-all duration-300">
                  {sending ? "SENDING..." : "SUBMIT ADMISSION FORM"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className={`modal-overlay ${modalOpen ? "is-open" : ""}`}>
        <div className="modal-card">
          <p className="modal-message">{modalMessage}</p>
          <button type="button" className="modal-button" onClick={() => setModalOpen(false)}>
            OK
          </button>
        </div>
      </div>
    </Layout>
  );
}



