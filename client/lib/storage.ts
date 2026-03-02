import { supabase } from "@/lib/supabase";

export type StudentRecord = {
  id: string;
  regNo: string;
  name: string;
  fatherName: string;
  className: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  studentCnic: string;
  createdAt: string;
  course?: string;
};

export type TeacherRecord = {
  id: string;
  teacherId: string;
  name: string;
  fatherName: string;
  mobile: string;
  cnic: string;
  address: string;
  salary: string;
  createdAt: string;
};

export type ResultSubject = {
  name: string;
  obtained: number;
  total: number;
};

export type ResultRecord = {
  id: string;
  className: string;
  title?: string;
  imageDataUrl?: string;
  imagePath?: string;
  ocrText?: string;
  ocrLines?: string[];
  regNo?: string;
  name?: string;
  fatherName?: string;
  subjects?: ResultSubject[];
  totalObtained?: number;
  totalMarks?: number;
  percentage?: number;
  grade?: string;
  published: boolean;
  createdAt: string;
};

export type StudentInsert = {
  regNo: string;
  name: string;
  fatherName: string;
  className: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  studentCnic: string;
};

export type TeacherInsert = {
  teacherId: string;
  name: string;
  fatherName: string;
  mobile: string;
  cnic: string;
  address: string;
  salary: string;
};

export type ResultInsert = {
  className: string;
  title?: string;
  imageDataUrl?: string;
  imagePath?: string;
  published: boolean;
};

export type Settings = {
  principalName: string;
  principalTitle: string;
  signatureDataUrl?: string;
};

const RESULTS_BUCKET = (import.meta.env.VITE_SUPABASE_RESULTS_BUCKET as string | undefined) || "smartschool";
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || "";

const mapStudentRow = (row: any): StudentRecord => ({
  id: String(row.id),
  regNo: String(row.reg_no ?? ""),
  name: String(row.name ?? ""),
  fatherName: String(row.father_name ?? ""),
  className: String(row.class_name ?? row.course ?? ""),
  phone: String(row.phone ?? ""),
  address: String(row.address ?? ""),
  dateOfBirth: String(row.date_of_birth ?? ""),
  studentCnic: String(row.student_cnic ?? ""),
  createdAt: String(row.created_at ?? new Date().toISOString()),
  course: row.course ?? undefined,
});

const mapTeacherRow = (row: any): TeacherRecord => ({
  id: String(row.id),
  teacherId: String(row.teacher_id ?? ""),
  name: String(row.name ?? ""),
  fatherName: String(row.father_name ?? ""),
  mobile: String(row.mobile ?? ""),
  cnic: String(row.cnic ?? ""),
  address: String(row.address ?? ""),
  salary: String(row.salary ?? ""),
  createdAt: String(row.created_at ?? new Date().toISOString()),
});

const mapResultRow = (row: any): ResultRecord => ({
  id: String(row.id),
  className: String(row.class_name ?? ""),
  title: row.title ?? undefined,
  imageDataUrl: row.image_url ?? undefined,
  imagePath: row.image_path ?? undefined,
  published: Boolean(row.published),
  createdAt: String(row.created_at ?? new Date().toISOString()),
});

const toStudentPayload = (record: StudentInsert) => ({
  reg_no: record.regNo,
  name: record.name,
  father_name: record.fatherName,
  class_name: record.className,
  phone: record.phone,
  address: record.address,
  date_of_birth: record.dateOfBirth,
  student_cnic: record.studentCnic,
});

const toTeacherPayload = (record: TeacherInsert) => ({
  teacher_id: record.teacherId,
  name: record.name,
  father_name: record.fatherName,
  mobile: record.mobile,
  cnic: record.cnic,
  address: record.address,
  salary: record.salary,
});

const toResultPayload = (record: ResultInsert) => ({
  class_name: record.className,
  title: record.title ?? null,
  image_url: record.imageDataUrl ?? null,
  image_path: record.imagePath ?? null,
  published: record.published,
});

export const loadStudents = async (): Promise<StudentRecord[]> => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapStudentRow);
};

export const loadTeachers = async (): Promise<TeacherRecord[]> => {
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapTeacherRow);
};

export const loadResults = async (): Promise<ResultRecord[]> => {
  const { data, error } = await supabase
    .from("results")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapResultRow);
};

export const createStudent = async (record: StudentInsert): Promise<StudentRecord> => {
  const { data, error } = await supabase
    .from("students")
    .insert(toStudentPayload(record))
    .select("*")
    .single();
  if (error) throw error;
  return mapStudentRow(data);
};

export const deleteStudent = async (id: string): Promise<void> => {
  const { error } = await supabase.from("students").delete().eq("id", id);
  if (error) throw error;
};

export const createTeacher = async (record: TeacherInsert): Promise<TeacherRecord> => {
  const { data, error } = await supabase
    .from("teachers")
    .insert(toTeacherPayload(record))
    .select("*")
    .single();
  if (error) throw error;
  return mapTeacherRow(data);
};

export const deleteTeacher = async (id: string): Promise<void> => {
  const { error } = await supabase.from("teachers").delete().eq("id", id);
  if (error) throw error;
};

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");

export const uploadResultImage = async (
  file: File,
  className?: string,
): Promise<{ publicUrl: string; path: string }> => {
  const extension = file.name.split(".").pop() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const classSegment = className ? slugify(className) : "general";
  const path = `results/${classSegment}/${safeName}`;
  const { error } = await supabase.storage.from(RESULTS_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }
  const baseUrl = SUPABASE_URL.replace(/\/+$/, "");
  const publicUrl = `${baseUrl}/storage/v1/object/public/${RESULTS_BUCKET}/${path}`;
  return { publicUrl, path };
};

export const createResult = async (record: ResultInsert): Promise<ResultRecord> => {
  const { data, error } = await supabase
    .from("results")
    .insert(toResultPayload(record))
    .select("*")
    .single();
  if (error) {
    throw new Error(`Database insert failed: ${error.message}`);
  }
  return mapResultRow(data);
};

export const updateResult = async (id: string, updates: Partial<ResultInsert>): Promise<ResultRecord> => {
  const payload: Record<string, unknown> = {};
  if (updates.className !== undefined) payload.class_name = updates.className;
  if (updates.title !== undefined) payload.title = updates.title ?? null;
  if (updates.imageDataUrl !== undefined) payload.image_url = updates.imageDataUrl ?? null;
  if (updates.imagePath !== undefined) payload.image_path = updates.imagePath ?? null;
  if (updates.published !== undefined) payload.published = updates.published;
  const { data, error } = await supabase
    .from("results")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return mapResultRow(data);
};

export const deleteResult = async (record: ResultRecord): Promise<void> => {
  if (record.imagePath) {
    const { error: storageError } = await supabase.storage.from(RESULTS_BUCKET).remove([record.imagePath]);
    if (storageError) throw storageError;
  }
  const { error } = await supabase.from("results").delete().eq("id", record.id);
  if (error) throw error;
};

export const findStudent = async (regNo: string, name: string, fatherName: string): Promise<StudentRecord | null> => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .ilike("reg_no", regNo.trim())
    .ilike("name", name.trim())
    .ilike("father_name", fatherName.trim())
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data ? mapStudentRow(data) : null;
};

export const findTeacher = async (name: string, fatherName: string): Promise<TeacherRecord | null> => {
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .ilike("name", name.trim())
    .ilike("father_name", fatherName.trim())
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data ? mapTeacherRow(data) : null;
};

const SETTINGS_KEY = "tss_settings";

const isBrowser = () => typeof window !== "undefined";

const read = <T,>(key: string, fallback: T): T => {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
};

export const defaultSettings: Settings = {
  principalName: "Muhammad Azizanwar",
  principalTitle: "Founder The System",
  signatureDataUrl: "",
};

export const loadSettings = () => read<Settings>(SETTINGS_KEY, defaultSettings);
export const saveSettings = (data: Settings) => write(SETTINGS_KEY, data);
