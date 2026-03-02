import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import {
  StudentInsert,
  StudentRecord,
  TeacherInsert,
  TeacherRecord,
  ResultInsert,
  ResultRecord,
  createResult,
  createStudent,
  createTeacher,
  deleteResult,
  deleteStudent,
  deleteTeacher,
  loadResults,
  loadStudents,
  loadTeachers,
  updateResult,
  uploadResultImage,
} from "@/lib/storage";
import { supabase } from "@/lib/supabase";

const AdminPanel = () => {
  const [authReady, setAuthReady] = React.useState(false);
  const [isAuthed, setIsAuthed] = React.useState(false);
  const [authError, setAuthError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [authForm, setAuthForm] = React.useState({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    let active = true;
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setIsAuthed(Boolean(data.session));
      setAuthReady(true);
    };
    init();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setIsAuthed(Boolean(session));
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleAuthSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError("");
    const email = authForm.email.trim().toLowerCase();
    const password = authForm.password;
    if (!email || !password) {
      setAuthError("Please enter both email and password.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message || "Invalid email or password. Please try again.");
      return;
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsAuthed(false);
    setAuthForm({ email: "", password: "" });
  };

  const [tab, setTab] = React.useState<"students" | "teachers" | "results">("students");

  const [students, setStudents] = React.useState<StudentRecord[]>([]);
  const [teachers, setTeachers] = React.useState<TeacherRecord[]>([]);
  const [results, setResults] = React.useState<ResultRecord[]>([]);
  const [dataLoading, setDataLoading] = React.useState(false);
  const [dataError, setDataError] = React.useState("");

  const [studentForm, setStudentForm] = React.useState({
    regNo: "",
    name: "",
    fatherName: "",
    className: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    studentCnic: "",
  });

  const [teacherForm, setTeacherForm] = React.useState({
    teacherId: "",
    name: "",
    fatherName: "",
    mobile: "",
    cnic: "",
    address: "",
    salary: "",
  });

  const [resultForm, setResultForm] = React.useState({
    className: "",
    title: "",
    published: true,
  });
  const [resultError, setResultError] = React.useState("");

  const [studentQuery, setStudentQuery] = React.useState("");
  const [classFilter, setClassFilter] = React.useState("all");
  const [teacherQuery, setTeacherQuery] = React.useState("");
  const [resultQuery, setResultQuery] = React.useState("");
  const [resultImageFile, setResultImageFile] = React.useState<File | null>(null);
  const [resultImagePreview, setResultImagePreview] = React.useState("");

  React.useEffect(() => {
    if (!isAuthed) return;
    let active = true;
    const loadData = async () => {
      setDataLoading(true);
      setDataError("");
      try {
        const [studentsData, teachersData, resultsData] = await Promise.all([
          loadStudents(),
          loadTeachers(),
          loadResults(),
        ]);
        if (!active) return;
        setStudents(studentsData);
        setTeachers(teachersData);
        setResults(resultsData);
      } catch (error) {
        if (!active) return;
        setDataError("Unable to load admin data from Supabase.");
      } finally {
        if (!active) return;
        setDataLoading(false);
      }
    };
    loadData();
    return () => {
      active = false;
    };
  }, [isAuthed]);

  React.useEffect(() => {
    return () => {
      if (resultImagePreview) {
        URL.revokeObjectURL(resultImagePreview);
      }
    };
  }, [resultImagePreview]);

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const record: StudentInsert = {
      regNo: studentForm.regNo.trim(),
      name: studentForm.name.trim(),
      fatherName: studentForm.fatherName.trim(),
      className: studentForm.className.trim(),
      phone: studentForm.phone.trim(),
      address: studentForm.address.trim(),
      dateOfBirth: studentForm.dateOfBirth,
      studentCnic: studentForm.studentCnic.trim(),
    };
    try {
      const created = await createStudent(record);
      setStudents((prev) => [created, ...prev]);
      setDataError("");
      setStudentForm({
        regNo: "",
        name: "",
        fatherName: "",
        className: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        studentCnic: "",
      });
    } catch (error) {
      setDataError("Unable to save student record.");
    }
  };

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const record: TeacherInsert = {
      teacherId: teacherForm.teacherId.trim() || `T-${Date.now()}`,
      name: teacherForm.name.trim(),
      fatherName: teacherForm.fatherName.trim(),
      mobile: teacherForm.mobile.trim(),
      cnic: teacherForm.cnic.trim(),
      address: teacherForm.address.trim(),
      salary: teacherForm.salary.trim(),
    };
    try {
      const created = await createTeacher(record);
      setTeachers((prev) => [created, ...prev]);
      setDataError("");
      setTeacherForm({ teacherId: "", name: "", fatherName: "", mobile: "", cnic: "", address: "", salary: "" });
    } catch (error) {
      setDataError("Unable to save teacher record.");
    }
  };

  const handleResultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultForm.className.trim()) {
      setResultError("Please enter the class name.");
      return;
    }
    if (!resultImageFile) {
      setResultError("Please upload the result sheet image.");
      return;
    }

    try {
      const upload = await uploadResultImage(resultImageFile, resultForm.className.trim());
      const record: ResultInsert = {
        className: resultForm.className.trim(),
        title: resultForm.title.trim() || undefined,
        imageDataUrl: upload.publicUrl,
        imagePath: upload.path,
        published: resultForm.published,
      };
      const created = await createResult(record);
      setResults((prev) => [created, ...prev]);
      setDataError("");
      setResultForm({ className: "", title: "", published: true });
      setResultImageFile(null);
      setResultImagePreview("");
      setResultError("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to publish result. Please try again.";
      setResultError(message);
    }
  };

  const handleResultImageUpload = (file?: File) => {
    if (!file) {
      setResultImageFile(null);
      setResultImagePreview("");
      return;
    }
    setResultImageFile(file);
    setResultError("");
    const preview = URL.createObjectURL(file);
    setResultImagePreview(preview);
  };

  const filteredStudents = students.filter((s) => {
    const term = studentQuery.trim().toLowerCase();
    const classTerm = classFilter === "all" ? "" : classFilter.trim().toLowerCase();
    const studentClass = (s.className || s.course || "").trim().toLowerCase();
    if (classTerm && studentClass !== classTerm) return false;
    if (!term) return true;
    return [
      s.regNo,
      s.name,
      s.fatherName,
      s.className || s.course || "",
      s.phone,
      s.studentCnic,
    ]
      .join(" ")
      .toLowerCase()
      .includes(term);
  });

  const classOptions = React.useMemo(() => {
    const values = new Set<string>();
    students.forEach((s) => {
      const label = (s.className || s.course || "").trim();
      if (label) values.add(label);
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [students]);

  const stats = [
    { label: "Total Students", value: students.length },
    { label: "Total Teachers", value: teachers.length },
    { label: "Published Results", value: results.filter((r) => r.published).length },
    { label: "Draft Results", value: results.filter((r) => !r.published).length },
  ];

  const filteredTeachers = teachers.filter((t) => {
    const term = teacherQuery.trim().toLowerCase();
    if (!term) return true;
    return [t.teacherId, t.name, t.fatherName, t.mobile, t.cnic]
      .join(" ")
      .toLowerCase()
      .includes(term);
  });

  const filteredResults = results.filter((r) => {
    const term = resultQuery.trim().toLowerCase();
    if (!term) return true;
    return [r.className, r.title || ""]
      .join(" ")
      .toLowerCase()
      .includes(term);
  });

  const toggleResultPublish = async (id: string) => {
    const target = results.find((r) => r.id === id);
    if (!target) return;
    try {
      const updated = await updateResult(id, { published: !target.published });
      setResults((prev) => prev.map((r) => (r.id === id ? updated : r)));
      setDataError("");
    } catch (error) {
      setDataError("Unable to update result status.");
    }
  };

  const handleDeleteResult = async (id: string) => {
    const target = results.find((r) => r.id === id);
    if (!target) return;
    if (!window.confirm("Delete this result? This cannot be undone.")) return;
    try {
      await deleteResult(target);
      setResults((prev) => prev.filter((r) => r.id !== id));
      setDataError("");
    } catch (error) {
      setDataError("Unable to delete result.");
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!window.confirm("Delete this student record? This cannot be undone.")) return;
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setDataError("");
    } catch (error) {
      setDataError("Unable to delete student record.");
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    if (!window.confirm("Delete this teacher record? This cannot be undone.")) return;
    try {
      await deleteTeacher(id);
      setTeachers((prev) => prev.filter((t) => t.id !== id));
      setDataError("");
    } catch (error) {
      setDataError("Unable to delete teacher record.");
    }
  };

  if (!authReady) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-3">
          <ShieldCheck className="w-10 h-10 text-accent mx-auto" />
          <p className="text-sm text-foreground/70">Loading secure admin area...</p>
        </div>
      </div>
    );
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 gold-gradient" />
          <div className="absolute inset-0 islamic-pattern opacity-80" />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
            <div className="w-full max-w-xl bg-card/90 border border-white/10 shadow-2xl backdrop-blur-md p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-white">Admin Sign In</h2>
                  <p className="text-sm text-white/70">Enter your email and password to continue.</p>
                </div>
              </div>

              <form onSubmit={handleAuthSubmit} className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label className="text-white/80">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      type="email"
                      value={authForm.email}
                      onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })}
                      placeholder="admin@school.edu"
                      required
                      className="pl-10 rounded-none border-white/20 bg-background/60 text-white placeholder:text-white/40 focus:border-accent"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={authForm.password}
                      onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })}
                      placeholder="Enter your password"
                      required
                      className="pl-10 pr-10 rounded-none border-white/20 bg-background/60 text-white placeholder:text-white/40 focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="text-xs text-white/60">Contact IT for access</div>
                {authError && <p className="text-sm text-red-300">{authError}</p>}
                <Button type="submit" className="w-full h-12 bg-accent text-foreground font-bold rounded-none">
                  Login
                </Button>
              </form>

              <div className="mt-6 border-t border-white/10 pt-4 text-xs text-white/60">
                Use your authorized admin email and password.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-accent/20 bg-card/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Admin Panel</h1>
            <p className="text-foreground/70 text-sm">Manage students, teachers, and results.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2 rounded-none border text-xs tracking-widest uppercase font-bold transition-colors border-red-400/40 text-red-200 hover:text-white hover:bg-red-500/20"
            >
              Sign Out
            </button>
            <Link
              to="/"
              className="px-4 py-2 rounded-none border text-xs tracking-widest uppercase font-bold transition-colors border-accent/20 text-foreground/70 hover:text-foreground hover:bg-accent/10"
            >
              Back To Home
            </Link>
            {[
              { id: "students", label: "Students" },
              { id: "teachers", label: "Teachers" },
              { id: "results", label: "Results" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                className={`px-4 py-2 rounded-none border text-xs tracking-widest uppercase font-bold transition-colors ${
                  tab === t.id
                    ? "bg-accent text-foreground border-accent"
                    : "border-accent/20 text-foreground/70 hover:text-foreground hover:bg-accent/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-accent/20 p-4 shadow-md">
              <p className="text-xs uppercase tracking-widest text-foreground/60">{stat.label}</p>
              <p className="text-2xl font-heading font-bold text-foreground mt-2">{stat.value}</p>
            </div>
          ))}
        </div>
        {dataError && (
          <div className="border border-red-400/40 bg-red-500/10 text-red-100 px-4 py-3 text-sm">
            {dataError}
          </div>
        )}
        {dataLoading && (
          <div className="border border-accent/20 bg-background/60 text-foreground/70 px-4 py-3 text-sm">
            Loading admin data from Supabase...
          </div>
        )}
        {tab === "students" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <form onSubmit={handleStudentSubmit} className="bg-card p-6 sm:p-8 border border-accent/20 shadow-xl space-y-6">
              <div>
                <h2 className="text-xl font-heading font-bold">Add Student</h2>
                <p className="text-sm text-foreground/70 mt-1">Enter student details and marks for certificate generation.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Student Reg No *</Label>
                  <Input
                    value={studentForm.regNo}
                    onChange={(e) => setStudentForm({ ...studentForm, regNo: e.target.value })}
                    placeholder="e.g. 001"
                    required
                    className="rounded-none border-accent/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    placeholder="Student name"
                    required
                    className="rounded-none border-accent/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Father Name *</Label>
                  <Input
                    value={studentForm.fatherName}
                    onChange={(e) => setStudentForm({ ...studentForm, fatherName: e.target.value })}
                    placeholder="Father name"
                    required
                    className="rounded-none border-accent/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Class / Grade *</Label>
                  <Input
                    value={studentForm.className}
                    onChange={(e) => setStudentForm({ ...studentForm, className: e.target.value })}
                    placeholder="e.g. Matric"
                    required
                    className="rounded-none border-accent/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    required
                    className="rounded-none border-accent/20"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Address *</Label>
                  <Textarea
                    value={studentForm.address}
                    onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
                    placeholder="Full address"
                    required
                    className="rounded-none border-accent/20"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date of Birth *</Label>
                  <Input
                    type="date"
                    value={studentForm.dateOfBirth}
                    onChange={(e) => setStudentForm({ ...studentForm, dateOfBirth: e.target.value })}
                    required
                    className="rounded-none border-accent/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Student CNIC / B-Form *</Label>
                  <Input
                    value={studentForm.studentCnic}
                    onChange={(e) => setStudentForm({ ...studentForm, studentCnic: e.target.value })}
                    placeholder="e.g. 12345-1234567-1"
                    required
                    className="rounded-none border-accent/20"
                  />
                </div>
              </div>
              <Button className="w-full h-12 bg-primary text-white font-bold rounded-none">Save Student</Button>
            </form>

            <div className="lg:col-span-2 bg-card p-6 sm:p-8 border border-accent/20 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-heading font-bold">Student Records</h2>
                  <p className="text-foreground/60 text-sm">{filteredStudents.length} records</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="rounded-none border-accent/20 w-full sm:w-48">
                      <SelectValue placeholder="All Classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      {classOptions.map((className) => (
                        <SelectItem key={className} value={className}>
                          {className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={studentQuery}
                    onChange={(e) => setStudentQuery(e.target.value)}
                    placeholder="Search by reg no, name, class, phone, CNIC"
                    className="rounded-none border-accent/20 w-full sm:w-64"
                  />
                </div>
              </div>
              <div className="space-y-3 lg:hidden">
                {filteredStudents.map((s) => (
                  <div key={s.id} className="border border-accent/20 bg-background p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-foreground">{s.name}</p>
                        <p className="text-xs text-foreground/60">Reg No: {s.regNo}</p>
                      </div>
                      <span className="px-2 py-1 text-[10px] uppercase tracking-widest bg-accent/20 text-foreground">
                        {s.className || s.course || "-"}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/70">
                      <span>Father: {s.fatherName}</span>
                      <span>Phone: {s.phone || "-"}</span>
                      <span>DOB: {s.dateOfBirth || "-"}</span>
                      <span>CNIC: {s.studentCnic || "-"}</span>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => handleDeleteStudent(s.id)}
                        className="px-3 py-1 text-[10px] uppercase tracking-widest border border-red-400/40 text-red-300 hover:text-red-100 hover:bg-red-500/10 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {!filteredStudents.length && (
                  <div className="border border-accent/20 bg-background p-6 text-center text-foreground/60">
                    No matching students found.
                  </div>
                )}
              </div>
              <div className="hidden lg:block overflow-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead className="text-left text-foreground/70">
                    <tr>
                      <th className="py-2 whitespace-nowrap">Reg No</th>
                      <th className="whitespace-nowrap">Name</th>
                      <th className="whitespace-nowrap">Father</th>
                      <th className="whitespace-nowrap">Class</th>
                      <th className="whitespace-nowrap">Phone</th>
                      <th className="whitespace-nowrap">DOB</th>
                      <th className="whitespace-nowrap">CNIC/B-Form</th>
                      <th className="whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => (
                      <tr key={s.id} className="border-t border-accent/10">
                        <td className="py-2 whitespace-nowrap">{s.regNo}</td>
                        <td className="whitespace-nowrap">{s.name}</td>
                        <td className="whitespace-nowrap">{s.fatherName}</td>
                        <td className="whitespace-nowrap">{s.className || s.course || "-"}</td>
                        <td className="whitespace-nowrap">{s.phone || "-"}</td>
                        <td className="whitespace-nowrap">{s.dateOfBirth || "-"}</td>
                        <td className="whitespace-nowrap">{s.studentCnic || "-"}</td>
                        <td className="whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleDeleteStudent(s.id)}
                            className="px-3 py-1 text-[10px] uppercase tracking-widest border border-red-400/40 text-red-300 hover:text-red-100 hover:bg-red-500/10 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!filteredStudents.length && (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-foreground/60">
                          No matching students found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === "teachers" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <form onSubmit={handleTeacherSubmit} className="bg-card p-6 sm:p-8 border border-accent/20 shadow-xl space-y-5">
              <div>
                <h2 className="text-xl font-heading font-bold">Add Teacher</h2>
                <p className="text-sm text-foreground/70 mt-1">Store faculty details for certificate and record keeping.</p>
              </div>
              <div className="space-y-2">
                <Label>Teacher ID</Label>
                <Input value={teacherForm.teacherId} onChange={(e) => setTeacherForm({ ...teacherForm, teacherId: e.target.value })} className="rounded-none border-accent/20" />
              </div>
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input value={teacherForm.name} onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })} required className="rounded-none border-accent/20" />
              </div>
              <div className="space-y-2">
                <Label>Father Name *</Label>
                <Input value={teacherForm.fatherName} onChange={(e) => setTeacherForm({ ...teacherForm, fatherName: e.target.value })} required className="rounded-none border-accent/20" />
              </div>
              <div className="space-y-2">
                <Label>Mobile *</Label>
                <Input value={teacherForm.mobile} onChange={(e) => setTeacherForm({ ...teacherForm, mobile: e.target.value })} required className="rounded-none border-accent/20" />
              </div>
              <div className="space-y-2">
                <Label>CNIC / ID Card *</Label>
                <Input value={teacherForm.cnic} onChange={(e) => setTeacherForm({ ...teacherForm, cnic: e.target.value })} required className="rounded-none border-accent/20" />
              </div>
              <div className="space-y-2">
                <Label>Address *</Label>
                <Textarea value={teacherForm.address} onChange={(e) => setTeacherForm({ ...teacherForm, address: e.target.value })} required className="rounded-none border-accent/20" />
              </div>
              <div className="space-y-2">
                <Label>Salary *</Label>
                <Input value={teacherForm.salary} onChange={(e) => setTeacherForm({ ...teacherForm, salary: e.target.value })} required className="rounded-none border-accent/20" />
              </div>
              <Button className="w-full h-12 bg-primary text-white font-bold rounded-none">Save Teacher</Button>
            </form>

            <div className="lg:col-span-2 bg-card p-6 sm:p-8 border border-accent/20 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-heading font-bold">Teacher Records</h2>
                  <p className="text-foreground/60 text-sm">{filteredTeachers.length} records</p>
                </div>
                <Input
                  value={teacherQuery}
                  onChange={(e) => setTeacherQuery(e.target.value)}
                  placeholder="Search by ID, name, mobile"
                  className="rounded-none border-accent/20 md:max-w-sm"
                />
              </div>
              <div className="space-y-3 lg:hidden">
                {filteredTeachers.map((t) => (
                  <div key={t.id} className="border border-accent/20 bg-background p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-foreground">{t.name}</p>
                        <p className="text-xs text-foreground/60">ID: {t.teacherId}</p>
                      </div>
                      <span className="px-2 py-1 text-[10px] uppercase tracking-widest bg-accent/20 text-foreground">
                        {t.cnic || "-"}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/70">
                      <span>Father: {t.fatherName}</span>
                      <span>Mobile: {t.mobile}</span>
                      <span>Address: {t.address || "-"}</span>
                      <span>Salary: {t.salary || "-"}</span>
                    </div>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => handleDeleteTeacher(t.id)}
                        className="px-3 py-1 text-[10px] uppercase tracking-widest border border-red-400/40 text-red-300 hover:text-red-100 hover:bg-red-500/10 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {!filteredTeachers.length && (
                  <div className="border border-accent/20 bg-background p-6 text-center text-foreground/60">
                    No matching teachers found.
                  </div>
                )}
              </div>
              <div className="hidden lg:block overflow-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="text-left text-foreground/70">
                    <tr>
                      <th className="py-2 whitespace-nowrap">ID</th>
                      <th className="whitespace-nowrap">Name</th>
                      <th className="whitespace-nowrap">Father</th>
                      <th className="whitespace-nowrap">Mobile</th>
                      <th className="whitespace-nowrap">CNIC</th>
                      <th className="whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((t) => (
                      <tr key={t.id} className="border-t border-accent/10">
                        <td className="py-2 whitespace-nowrap">{t.teacherId}</td>
                        <td className="whitespace-nowrap">{t.name}</td>
                        <td className="whitespace-nowrap">{t.fatherName}</td>
                        <td className="whitespace-nowrap">{t.mobile}</td>
                        <td className="whitespace-nowrap">{t.cnic}</td>
                        <td className="whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleDeleteTeacher(t.id)}
                            className="px-3 py-1 text-[10px] uppercase tracking-widest border border-red-400/40 text-red-300 hover:text-red-100 hover:bg-red-500/10 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!filteredTeachers.length && (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-foreground/60">
                          No matching teachers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === "results" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <form onSubmit={handleResultSubmit} className="bg-card p-6 sm:p-8 border border-accent/20 shadow-xl space-y-5">
              <div>
                <h2 className="text-xl font-heading font-bold">Publish Result</h2>
                <p className="text-sm text-foreground/70 mt-1">Upload a complete class result sheet image.</p>
              </div>
              <div className="space-y-2">
                <Label>Class *</Label>
                <Input
                  value={resultForm.className}
                  onChange={(e) => setResultForm({ ...resultForm, className: e.target.value })}
                  placeholder="e.g. 9th, Matric, Grade 10"
                  required
                  className="rounded-none border-accent/20"
                />
              </div>
              <div className="space-y-2">
                <Label>Result Title (Optional)</Label>
                <Input
                  value={resultForm.title}
                  onChange={(e) => setResultForm({ ...resultForm, title: e.target.value })}
                  placeholder="e.g. 9th Results 2025"
                  className="rounded-none border-accent/20"
                />
              </div>
              <div className="space-y-2">
                <Label>Result Sheet Image *</Label>
                <Input type="file" accept="image/*" onChange={(e) => handleResultImageUpload(e.target.files?.[0])} className="rounded-none border-accent/20" />
                {resultImagePreview && (
                  <img src={resultImagePreview} alt="Result preview" className="mt-3 w-full max-h-64 object-contain border border-accent/20 bg-background p-2" />
                )}
              </div>

              <div className="space-y-2">
                <Label>Publish Result</Label>
                <Select
                  value={resultForm.published ? "yes" : "no"}
                  onValueChange={(v) => setResultForm({ ...resultForm, published: v === "yes" })}
                >
                  <SelectTrigger className="rounded-none border-accent/20">
                    <SelectValue placeholder="Yes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {resultError && <p className="text-red-400 text-sm">{resultError}</p>}
              <Button className="w-full h-12 bg-primary text-white font-bold rounded-none">Publish Result</Button>
            </form>

            <div className="lg:col-span-2 bg-card p-6 sm:p-8 border border-accent/20 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-heading font-bold">Results</h2>
                  <p className="text-foreground/60 text-sm">{filteredResults.length} records</p>
                </div>
                <Input
                  value={resultQuery}
                  onChange={(e) => setResultQuery(e.target.value)}
                  placeholder="Search by class or title"
                  className="rounded-none border-accent/20 md:max-w-sm"
                />
              </div>
              <div className="space-y-3 lg:hidden">
                {filteredResults.map((r) => (
                  <div key={r.id} className="border border-accent/20 bg-background p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-foreground">Class {r.className}</p>
                        <p className="text-xs text-foreground/60">{r.title || "Result Sheet"}</p>
                      </div>
                      <span className="px-2 py-1 text-[10px] uppercase tracking-widest bg-accent/20 text-foreground">
                        {r.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => toggleResultPublish(r.id)}
                        className="px-3 py-1 text-[10px] uppercase tracking-widest border border-accent/30 text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-colors"
                      >
                        {r.published ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteResult(r.id)}
                        className="px-3 py-1 text-[10px] uppercase tracking-widest border border-red-400/40 text-red-300 hover:text-red-100 hover:bg-red-500/10 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-foreground/60">Image: {r.imageDataUrl ? "Uploaded" : "—"}</p>
                  </div>
                ))}
                {!filteredResults.length && (
                  <div className="border border-accent/20 bg-background p-6 text-center text-foreground/60">
                    No matching results found.
                  </div>
                )}
              </div>
              <div className="hidden lg:block overflow-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead className="text-left text-foreground/70">
                    <tr>
                      <th className="py-2 whitespace-nowrap">Class</th>
                      <th className="whitespace-nowrap">Title</th>
                      <th className="whitespace-nowrap">Status</th>
                      <th className="whitespace-nowrap">Image</th>
                      <th className="whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((r) => (
                      <tr key={r.id} className="border-t border-accent/10">
                        <td className="py-2 whitespace-nowrap">{r.className}</td>
                        <td className="whitespace-nowrap">{r.title || "-"}</td>
                        <td className="whitespace-nowrap">{r.published ? "Published" : "Draft"}</td>
                        <td className="whitespace-nowrap">{r.imageDataUrl ? "Uploaded" : "—"}</td>
                        <td>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => toggleResultPublish(r.id)}
                              className="px-3 py-1 text-xs uppercase tracking-widest border border-accent/30 text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-colors"
                            >
                              {r.published ? "Unpublish" : "Publish"}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteResult(r.id)}
                              className="px-3 py-1 text-xs uppercase tracking-widest border border-red-400/40 text-red-300 hover:text-red-100 hover:bg-red-500/10 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!filteredResults.length && (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-foreground/60">
                          No matching results found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminPanel;

