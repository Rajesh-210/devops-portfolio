#!/usr/bin/env python3
"""Build Rajesh Chilukuri's one-page DevOps Résumé PDF."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable,
    KeepTogether, PageBreak
)

# Colors matching the portfolio
NEON_PURPLE = HexColor("#8b5cf6")
NEON_CYAN = HexColor("#06b6d4")
NEON_PINK = HexColor("#ec4899")
NEON_EMERALD = HexColor("#10b981")
NEON_AMBER = HexColor("#f59e0b")
DARK_BG = HexColor("#020204")
DARK_CARD = HexColor("#0a0a12")
TEXT_WHITE = white
TEXT_SLATE = HexColor("#94a3b8")
TEXT_SLATE_DARK = HexColor("#64748b")

# Output path
OUTPUT = "/sessions/ecstatic-zen-hypatia/mnt/outputs/Rajesh_Chilukuri_DevOps_Resume.pdf"

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=letter,
    leftMargin=0.55 * inch,
    rightMargin=0.55 * inch,
    topMargin=0.45 * inch,
    bottomMargin=0.45 * inch,
    title="Rajesh Chilukuri - DevOps & Platform Engineer",
    author="Rajesh Chilukuri",
)

story = []

# ============ HEADER ============
header_style = ParagraphStyle(
    "HeaderName",
    fontName="Helvetica-Bold",
    fontSize=22,
    textColor=TEXT_WHITE,
    alignment=TA_CENTER,
    spaceAfter=2,
)

header_sub_style = ParagraphStyle(
    "HeaderSub",
    fontName="Courier-Bold",
    fontSize=10,
    textColor=NEON_CYAN,
    alignment=TA_CENTER,
    spaceAfter=6,
)

name_para = Paragraph("RAJESH CHILUKURI", header_style)
sub_para = Paragraph(
    "Senior DevOps &amp; Platform Engineer &nbsp;|&nbsp; Hyderabad, India (Remote-first) &nbsp;|&nbsp; "
    "rajeshchilukuri210@gmail.com &nbsp;|&nbsp; linkedin.com/in/rajesh-chilukuri-692506406 &nbsp;|&nbsp; "
    "github.com/Rajesh-210",
    header_sub_style,
)

story.append(name_para)
story.append(sub_para)
story.append(HRFlowable(width="100%", thickness=1.5, color=NEON_PURPLE, spaceAfter=8))

# ============ PROFESSIONAL SUMMARY ============
section_title_style = ParagraphStyle(
    "SectionTitle",
    fontName="Courier-Bold",
    fontSize=11,
    textColor=NEON_PURPLE,
    spaceBefore=6,
    spaceAfter=4,
)

body_style = ParagraphStyle(
    "Body",
    fontName="Helvetica",
    fontSize=9,
    textColor=TEXT_WHITE,
    leading=12.5,
    alignment=TA_LEFT,
)

story.append(Paragraph("PROFESSIONAL SUMMARY", section_title_style))
story.append(Paragraph(
    "DevOps &amp; Platform Engineer with 4+ years of experience designing, building, and operating "
    "scalable, secure, and cost-efficient cloud infrastructure on AWS &amp; Kubernetes. Proven track record "
    "of delivering 99.9% SLA, reducing cloud spend by 30% through FinOps automation, and enabling daily "
    "production deployments with zero downtime via GitOps and CI/CD pipelines.",
    body_style,
))

# ============ CORE COMPETENCIES ============
story.append(Paragraph("CORE COMPETENCIES", section_title_style))

skills_data = [
    ["Cloud &amp; Infrastructure", "Containers", "GitOps &amp; CI/CD", "IaC &amp; Configuration"],
    ["AWS (EKS, VPC, IAM, ECR, RDS)", "Docker", "Jenkins CI/CD", "Terraform"],
    ["Kubernetes (EKS)", "Helm", "ArgoCD", "Ansible"],
    ["Prometheus, Grafana", "", "GitHub Actions", "Linux (Ubuntu, RHEL, Amazon Linux)"],
    ["FinOps &amp; Cost Optimization", "", "", "Scripting: Bash, Python, Go"],
]

skills_table = Table(skills_data, colWidths=[1.85 * inch, 1.45 * inch, 1.45 * inch, 1.75 * inch])
skills_table.setStyle(TableStyle([
    ("FONTNAME", (0, 0), (-1, -1), "Courier-Bold"),
    ("FONTSIZE", (0, 0), (-1, -1), 7.5),
    ("TEXTCOLOR", (0, 0), (-1, 0), NEON_PURPLE),
    ("TEXTCOLOR", (0, 1), (-1, -1), TEXT_WHITE),
    ("BACKGROUND", (0, 0), (-1, 0), HexColor("#1a1a2e")),
    ("BACKGROUND", (0, 1), (-1, -1), DARK_CARD),
    ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#1a1a2e")),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("TOPPADDING", (0, 0), (-1, -1), 4),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
]))
story.append(skills_table)

# ============ PROFESSIONAL EXPERIENCE ============
story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_title_style))

def job_entry(title, company, duration, location, bullets):
    """Create a job entry block."""
    header = Paragraph(
        f'<font color="#06b6d4"><b>{title}</b></font>'
        f' <font color="#94a3b8" fontSize="8">{company} &nbsp;|&nbsp; {duration} &nbsp;|&nbsp; {location}</font>',
        body_style,
    )
    bullet_paras = []
    for b in bullets:
        bullet_paras.append(Paragraph(
            f'<font color="#ec4899">▸</font>&nbsp; {b}',
            ParagraphStyle("Bullet", parent=body_style, fontSize=8.5, leading=11, leftIndent=10, spaceAfter=2),
        ))
    return KeepTogether([header] + bullet_paras)

story.append(job_entry(
    "Senior DevOps &amp; Platform Engineer",
    "Cloud Native Platform Team",
    "2022 – Present",
    "Hyderabad, India (Remote-first)",
    [
        "Designed and operated a three-tier microservices platform on Amazon EKS using Terraform, Jenkins, and ArgoCD, reducing release cycle from 30 minutes to 5 minutes with zero downtime deployments.",
        "Implemented zero-trust service mesh with Istio mTLS and OPA Gatekeeper policies, achieving 100% policy coverage and zero critical CVEs in production.",
        "Built FinOps automation with Karpenter spot instance orchestration and AWS Cost Explorer anomaly detection, saving 30% monthly cloud spend (~$2.3K/month) with zero performance impact.",
        "Deployed end-to-end observability with Prometheus, Grafana, and Alertmanager, reducing MTTR from hours to 15 minutes and achieving 99.9% uptime SLA.",
        "Provisioned modular IaC for VPC, multi-AZ subnets, EKS clusters, and IAM OIDC roles; 100% infrastructure governed by code.",
    ],
))

story.append(Spacer(1, 6))

story.append(job_entry(
    "DevOps Engineer",
    "Platform Engineering",
    "2020 – 2022",
    "Hyderabad, India",
    [
        "Migrated legacy monolithic applications to containerized workloads using Docker and Kubernetes on AWS EKS.",
        "Established CI/CD pipelines with Jenkins, integrating Trivy security scanning and Docker image pushes to Amazon ECR.",
        "Configured Prometheus and Grafana dashboards for cluster telemetry, reducing incident detection time by 60%.",
        "Automated server provisioning and configuration management using Ansible across 50+ EC2 instances.",
    ],
))

# ============ KEY PROJECTS ============
story.append(Paragraph("KEY PROJECTS", section_title_style))

def project_entry(name, tech, outcome):
    return Paragraph(
        f'<font color="#8b5cf6"><b>{name}</b></font>'
        f' <font color="#94a3b8" fontSize="8">&nbsp;|&nbsp; {tech}</font><br/>'
        f'{outcome}',
        ParagraphStyle("Project", parent=body_style, fontSize=8.5, leading=11, leftIndent=10, spaceAfter=3),
    )

story.append(project_entry(
    "Three-Tier EKS Platform",
    "AWS • EKS • ArgoCD • Terraform",
    "83% faster deployments, zero downtime releases, 100% IaC governed."
))
story.append(project_entry(
    "Zero-Trust Service Mesh",
    "Istio • mTLS • OPA • EKS",
    "100% policy enforcement, zero critical CVEs in production."
))
story.append(project_entry(
    "FinOps Auto-Scaling",
    "Karpenter • Spot Instances",
    "30% monthly cloud spend saved with zero performance impact."
))

# ============ CERTIFICATIONS ============
story.append(Paragraph("CERTIFICATIONS", section_title_style))
story.append(Paragraph(
    "Certified Kubernetes Administrator (CKA) &nbsp;&nbsp;|&nbsp;&nbsp; AWS Certified Solutions Architect – Associate &nbsp;&nbsp;|&nbsp;&nbsp; "
    "HashiCorp Terraform Associate",
    body_style,
))

# ============ EDUCATION ============
story.append(Paragraph("EDUCATION", section_title_style))
story.append(Paragraph(
    "Bachelor of Technology in Computer Science &amp; Engineering &nbsp;&nbsp;|&nbsp;&nbsp; Hyderabad, India",
    body_style,
))

doc.build(story)
print(f"Resume PDF created: {OUTPUT}")
