import type { ResultRecord, Settings, StudentRecord, TeacherRecord } from "./storage";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const formatDate = () => new Date().toLocaleDateString();

export const buildStudentCertificateSvg = (
  student: StudentRecord,
  settings: Settings,
  logoDataUrl: string,
  title: string = "STUDENT CERTIFICATE"
) => {
  const w = 1200;
  const h = 900;
  const signature = settings.signatureDataUrl || "";
  const className = student.className || student.course || "";
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="#ffffff" stroke="#155BA0" stroke-width="6"/>
  <rect x="40" y="40" width="${w - 80}" height="${h - 80}" fill="none" stroke="#7fb3ff" stroke-width="2"/>
  <image href="${logoDataUrl}" x="70" y="70" width="120" height="120" preserveAspectRatio="xMidYMid slice"/>
  <text x="210" y="105" font-family="Georgia, serif" font-size="28" fill="#0B2B4F" font-weight="700">THE SMART SCHOOL &amp; GIRLS COLLEGE</text>
  <text x="210" y="135" font-family="Georgia, serif" font-size="16" fill="#334155">Shangla</text>

  <text x="${w / 2}" y="210" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#0B2B4F" font-weight="700">${escapeXml(title)}</text>
  <text x="${w / 2}" y="240" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#475569">Issued on ${formatDate()}</text>

  <line x1="120" y1="280" x2="${w - 120}" y2="280" stroke="#155BA0" stroke-width="2"/>

  <text x="120" y="320" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Student Name:</text>
  <text x="360" y="320" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(student.name)}</text>

  <text x="120" y="360" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Father Name:</text>
  <text x="360" y="360" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(student.fatherName)}</text>

  <text x="120" y="400" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Reg No:</text>
  <text x="360" y="400" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(student.regNo)}</text>

  <text x="120" y="440" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Class:</text>
  <text x="360" y="440" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(className)}</text>

  <text x="120" y="480" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Phone:</text>
  <text x="360" y="480" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(student.phone || "-")}</text>

  <text x="120" y="520" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Address:</text>
  <text x="360" y="520" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(student.address || "-")}</text>

  <text x="120" y="560" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Date of Birth:</text>
  <text x="360" y="560" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(student.dateOfBirth || "-")}</text>

  <text x="120" y="600" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Student CNIC/B-Form:</text>
  <text x="360" y="600" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(student.studentCnic || "-")}</text>

  <line x1="120" y1="660" x2="${w - 120}" y2="660" stroke="#e2e8f0" stroke-width="2"/>

  ${signature ? `<image href="${signature}" x="${w - 360}" y="675" width="200" height="70" preserveAspectRatio="xMidYMid meet"/>` : ""}
  <text x="${w - 260}" y="775" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">${escapeXml(settings.principalName)}</text>
  <text x="${w - 260}" y="795" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#475569">${escapeXml(settings.principalTitle)}</text>
</svg>
`;
};

export const buildSimpleResultCertificateSvg = (
  info: { name: string; fatherName: string; className: string },
  settings: Settings,
  logoDataUrl: string,
  title: string = "RESULT CERTIFICATE",
  details?: {
    rowText?: string;
    numbers?: string[];
    grade?: string;
    percentage?: string;
  }
) => {
  const w = 1200;
  const h = 940;
  const signature = settings.signatureDataUrl || "";
  const safeName = info.name || "-";
  const safeFather = info.fatherName || "-";
  const safeClass = info.className || "-";
  const safeRow = details?.rowText?.trim() || "";
  const safeNumbers = details?.numbers?.length ? details.numbers.join(", ") : "";
  const safeGrade = details?.grade || "";
  const safePercent = details?.percentage || "";

  const wrapText = (text: string, max = 70) => {
    if (!text) return [];
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let current = "";
    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word;
      if (next.length > max) {
        if (current) lines.push(current);
        current = word;
      } else {
        current = next;
      }
    });
    if (current) lines.push(current);
    return lines;
  };
  const rowLines = wrapText(safeRow, 72);
  const numbersLines = wrapText(safeNumbers ? `Numbers: ${safeNumbers}` : "", 72);
  const gradeLine = safeGrade ? `Grade: ${safeGrade}` : "";
  const percentLine = safePercent ? `Percentage: ${safePercent}` : "";

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="#ffffff" stroke="#155BA0" stroke-width="6"/>
  <rect x="40" y="40" width="${w - 80}" height="${h - 80}" fill="none" stroke="#7fb3ff" stroke-width="2"/>
  <image href="${logoDataUrl}" x="70" y="70" width="120" height="120" preserveAspectRatio="xMidYMid slice"/>
  <text x="210" y="105" font-family="Georgia, serif" font-size="28" fill="#0B2B4F" font-weight="700">THE SMART SCHOOL &amp; GIRLS COLLEGE</text>
  <text x="210" y="135" font-family="Georgia, serif" font-size="16" fill="#334155">Shangla</text>

  <text x="${w / 2}" y="220" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#0B2B4F" font-weight="700">${escapeXml(title)}</text>
  <text x="${w / 2}" y="250" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#475569">Issued on ${formatDate()}</text>

  <line x1="120" y1="290" x2="${w - 120}" y2="290" stroke="#155BA0" stroke-width="2"/>

  <text x="120" y="350" font-family="Arial, sans-serif" font-size="20" fill="#0f172a">Student Name:</text>
  <text x="380" y="350" font-family="Arial, sans-serif" font-size="20" fill="#0f172a" font-weight="700">${escapeXml(safeName)}</text>

  <text x="120" y="410" font-family="Arial, sans-serif" font-size="20" fill="#0f172a">Father Name:</text>
  <text x="380" y="410" font-family="Arial, sans-serif" font-size="20" fill="#0f172a" font-weight="700">${escapeXml(safeFather)}</text>

  <text x="120" y="470" font-family="Arial, sans-serif" font-size="20" fill="#0f172a">Class:</text>
  <text x="380" y="470" font-family="Arial, sans-serif" font-size="20" fill="#0f172a" font-weight="700">${escapeXml(safeClass)}</text>

  <line x1="120" y1="520" x2="${w - 120}" y2="520" stroke="#e2e8f0" stroke-width="2"/>

  ${safeRow || safeNumbers || safeGrade || safePercent ? `
  <text x="120" y="565" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">Extracted From Result Sheet:</text>
  ${rowLines
    .map((line, idx) => `<text x="120" y="${600 + idx * 26}" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">${escapeXml(line)}</text>`)
    .join("")}
  ${numbersLines
    .map((line, idx) => `<text x="120" y="${600 + (rowLines.length + idx) * 26}" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">${escapeXml(line)}</text>`)
    .join("")}
  ${gradeLine ? `<text x="120" y="${600 + (rowLines.length + numbersLines.length) * 26}" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">${escapeXml(gradeLine)}</text>` : ""}
  ${percentLine ? `<text x="360" y="${600 + (rowLines.length + numbersLines.length) * 26}" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">${escapeXml(percentLine)}</text>` : ""}
  ` : ""}

  ${signature ? `<image href="${signature}" x="${w - 360}" y="${h - 190}" width="200" height="70" preserveAspectRatio="xMidYMid meet"/>` : ""}
  <text x="${w - 260}" y="${h - 100}" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">${escapeXml(settings.principalName)}</text>
  <text x="${w - 260}" y="${h - 80}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#475569">${escapeXml(settings.principalTitle)}</text>
</svg>
`;
};

export const buildTeacherCertificateSvg = (
  teacher: TeacherRecord,
  settings: Settings,
  logoDataUrl: string
) => {
  const w = 1200;
  const h = 820;
  const signature = settings.signatureDataUrl || "";
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="#ffffff" stroke="#155BA0" stroke-width="6"/>
  <rect x="40" y="40" width="${w - 80}" height="${h - 80}" fill="none" stroke="#7fb3ff" stroke-width="2"/>
  <image href="${logoDataUrl}" x="70" y="70" width="120" height="120" preserveAspectRatio="xMidYMid slice"/>
  <text x="210" y="105" font-family="Georgia, serif" font-size="28" fill="#0B2B4F" font-weight="700">THE SMART SCHOOL &amp; GIRLS COLLEGE</text>
  <text x="210" y="135" font-family="Georgia, serif" font-size="16" fill="#334155">Shangla</text>

  <text x="${w / 2}" y="210" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#0B2B4F" font-weight="700">TEACHER CERTIFICATE</text>
  <text x="${w / 2}" y="240" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#475569">Issued on ${formatDate()}</text>

  <line x1="120" y1="280" x2="${w - 120}" y2="280" stroke="#155BA0" stroke-width="2"/>

  <text x="120" y="330" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Teacher Name:</text>
  <text x="360" y="330" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(teacher.name)}</text>

  <text x="120" y="370" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Father Name:</text>
  <text x="360" y="370" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(teacher.fatherName)}</text>

  <text x="120" y="410" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Teacher ID:</text>
  <text x="360" y="410" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(teacher.teacherId)}</text>

  <text x="120" y="450" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">CNIC:</text>
  <text x="360" y="450" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(teacher.cnic)}</text>

  <text x="120" y="490" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Mobile:</text>
  <text x="360" y="490" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(teacher.mobile)}</text>

  <text x="120" y="530" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Address:</text>
  <text x="360" y="530" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(teacher.address)}</text>

  <text x="120" y="570" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Salary:</text>
  <text x="360" y="570" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(teacher.salary)}</text>

  <line x1="120" y1="660" x2="${w - 120}" y2="660" stroke="#e2e8f0" stroke-width="2"/>

  ${signature ? `<image href="${signature}" x="${w - 360}" y="675" width="200" height="70" preserveAspectRatio="xMidYMid meet"/>` : ""}
  <text x="${w - 260}" y="765" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">${escapeXml(settings.principalName)}</text>
  <text x="${w - 260}" y="785" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#475569">${escapeXml(settings.principalTitle)}</text>
</svg>
`;
};

export const buildResultCertificateSvg = (
  result: ResultRecord,
  settings: Settings,
  logoDataUrl: string
) => {
  const w = 1200;
  const h = 860;
  const signature = settings.signatureDataUrl || "";
  const safeName = result.name || "";
  const safeFather = result.fatherName || "";
  const safeClass = result.className || "";
  const safeSubjects = result.subjects ?? [];
  const totalObtained = result.totalObtained ?? safeSubjects.reduce((acc, s) => acc + s.obtained, 0);
  const totalMarks = result.totalMarks ?? safeSubjects.reduce((acc, s) => acc + s.total, 0);
  const percentage = result.percentage ?? (totalMarks ? Math.round((totalObtained / totalMarks) * 100) : 0);
  const grade = result.grade || "";
  const tableStartY = 410;
  const rowH = 32;
  const rows = safeSubjects
    .map((s, i) => {
      const y = tableStartY + i * rowH;
      return `
  <text x="140" y="${y}" font-family="Arial, sans-serif" font-size="16" fill="#0f172a">${escapeXml(s.name)}</text>
  <text x="720" y="${y}" font-family="Arial, sans-serif" font-size="16" fill="#0f172a" text-anchor="end">${s.obtained}</text>
  <text x="980" y="${y}" font-family="Arial, sans-serif" font-size="16" fill="#0f172a" text-anchor="end">${s.total}</text>
      `;
    })
    .join("");

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="#ffffff" stroke="#155BA0" stroke-width="6"/>
  <rect x="40" y="40" width="${w - 80}" height="${h - 80}" fill="none" stroke="#7fb3ff" stroke-width="2"/>
  <image href="${logoDataUrl}" x="70" y="70" width="120" height="120" preserveAspectRatio="xMidYMid slice"/>
  <text x="210" y="105" font-family="Georgia, serif" font-size="28" fill="#0B2B4F" font-weight="700">THE SMART SCHOOL &amp; GIRLS COLLEGE</text>
  <text x="210" y="135" font-family="Georgia, serif" font-size="16" fill="#334155">Shangla</text>

  <text x="${w / 2}" y="210" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#0B2B4F" font-weight="700">RESULT CARD</text>
  <text x="${w / 2}" y="240" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#475569">Issued on ${formatDate()}</text>

  <text x="120" y="300" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Student Name:</text>
  <text x="360" y="300" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(safeName)}</text>

  <text x="120" y="335" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Father Name:</text>
  <text x="360" y="335" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(safeFather)}</text>

  <text x="120" y="370" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Class:</text>
  <text x="360" y="370" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(safeClass)}</text>

  <line x1="120" y1="395" x2="${w - 120}" y2="395" stroke="#155BA0" stroke-width="2"/>

  <text x="140" y="${tableStartY - 18}" font-family="Arial, sans-serif" font-size="16" fill="#334155" font-weight="700">Subject</text>
  <text x="720" y="${tableStartY - 18}" font-family="Arial, sans-serif" font-size="16" fill="#334155" font-weight="700" text-anchor="end">Obtained</text>
  <text x="980" y="${tableStartY - 18}" font-family="Arial, sans-serif" font-size="16" fill="#334155" font-weight="700" text-anchor="end">Total</text>

  ${rows}

  <line x1="120" y1="${tableStartY + safeSubjects.length * rowH + 10}" x2="${w - 120}" y2="${tableStartY + safeSubjects.length * rowH + 10}" stroke="#e2e8f0" stroke-width="2"/>

  <text x="140" y="${tableStartY + safeSubjects.length * rowH + 50}" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Total Obtained:</text>
  <text x="420" y="${tableStartY + safeSubjects.length * rowH + 50}" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${totalObtained}</text>
  <text x="640" y="${tableStartY + safeSubjects.length * rowH + 50}" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Total Marks:</text>
  <text x="900" y="${tableStartY + safeSubjects.length * rowH + 50}" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${totalMarks}</text>

  <text x="140" y="${tableStartY + safeSubjects.length * rowH + 90}" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Percentage:</text>
  <text x="420" y="${tableStartY + safeSubjects.length * rowH + 90}" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${percentage}%</text>
  <text x="640" y="${tableStartY + safeSubjects.length * rowH + 90}" font-family="Arial, sans-serif" font-size="18" fill="#0f172a">Grade:</text>
  <text x="900" y="${tableStartY + safeSubjects.length * rowH + 90}" font-family="Arial, sans-serif" font-size="18" fill="#0f172a" font-weight="700">${escapeXml(grade)}</text>

  ${signature ? `<image href="${signature}" x="${w - 360}" y="${h - 170}" width="200" height="70" preserveAspectRatio="xMidYMid meet"/>` : ""}
  <text x="${w - 260}" y="${h - 80}" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">${escapeXml(settings.principalName)}</text>
  <text x="${w - 260}" y="${h - 60}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#475569">${escapeXml(settings.principalTitle)}</text>
</svg>
`;
};

export const buildResultImageCardSvg = (
  result: ResultRecord,
  settings: Settings,
  logoDataUrl: string,
  studentName: string,
  fatherName: string,
  className: string
) => {
  const w = 1200;
  const h = 980;
  const signature = settings.signatureDataUrl || "";
  const sheet = result.imageDataUrl || "";
  const safeStudent = studentName || result.name || "";
  const safeFather = fatherName || result.fatherName || "";
  const safeClass = className || result.className || "";

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="#ffffff" stroke="#155BA0" stroke-width="6"/>
  <rect x="40" y="40" width="${w - 80}" height="${h - 80}" fill="none" stroke="#7fb3ff" stroke-width="2"/>
  <image href="${logoDataUrl}" x="70" y="58" width="90" height="90" preserveAspectRatio="xMidYMid slice"/>
  <text x="180" y="95" font-family="Georgia, serif" font-size="28" fill="#0B2B4F" font-weight="700">THE SMART SCHOOL &amp; GIRLS COLLEGE</text>
  <text x="180" y="125" font-family="Georgia, serif" font-size="16" fill="#334155">Shangla</text>

  <text x="${w / 2}" y="185" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#0B2B4F" font-weight="700">${escapeXml(result.title || "RESULT CARD")}</text>
  <text x="${w / 2}" y="210" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#475569">Issued on ${formatDate()}</text>

  <rect x="80" y="240" width="${w - 160}" height="560" fill="#0B2B4F" opacity="0.08"/>
  <image href="${sheet}" x="90" y="250" width="${w - 180}" height="540" preserveAspectRatio="xMidYMid meet"/>

  <rect x="90" y="250" width="${w - 180}" height="70" fill="#0B2B4F" opacity="0.75"/>
  <text x="120" y="293" font-family="Arial, sans-serif" font-size="18" fill="#ffffff" font-weight="700">Student: ${escapeXml(safeStudent || "-")}</text>
  <text x="520" y="293" font-family="Arial, sans-serif" font-size="18" fill="#ffffff" font-weight="700">Father: ${escapeXml(safeFather || "-")}</text>
  <text x="900" y="293" font-family="Arial, sans-serif" font-size="18" fill="#ffffff" font-weight="700">Class: ${escapeXml(safeClass || "-")}</text>

  ${signature ? `<image href="${signature}" x="${w - 360}" y="${h - 170}" width="200" height="70" preserveAspectRatio="xMidYMid meet"/>` : ""}
  <text x="${w - 260}" y="${h - 80}" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#0f172a">${escapeXml(settings.principalName)}</text>
  <text x="${w - 260}" y="${h - 60}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#475569">${escapeXml(settings.principalTitle)}</text>
</svg>
`;
};

export const downloadSvg = (svg: string, filename: string) => {
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadPngFromSvg = (svg: string, filename: string, width: number, height: number) =>
  new Promise<void>((resolve) => {
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = filename;
        a.click();
      }
      URL.revokeObjectURL(url);
      resolve();
    };
    img.src = url;
  });
