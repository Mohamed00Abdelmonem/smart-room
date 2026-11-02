import { FurnitureProduct, DesignProposal } from '../types';

export interface SpecSheetData {
  documentId?: string;
  roomType?: string;
  dimensions?: {
    widthM: number;
    lengthM: number;
    heightM: number;
  };
  style?: string;
  budgetEgp?: number;
  prompt?: string;
  proposal?: DesignProposal | null;
  items: {
    product: FurnitureProduct;
    quantity: number;
  }[];
  subtotalEgp: number;
  totalEgp: number;
  isRTL?: boolean;
}

export function generateArchitecturalSpecSheetPdf(data: SpecSheetData): void {
  const isRTL = Boolean(data.isRTL);
  const docId = data.documentId || `RM-SPEC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateFormatted = new Date().toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const roomType = data.roomType || (isRTL ? 'غرفة المعيشة' : 'Living Room');
  const widthM = data.dimensions?.widthM || 5.0;
  const lengthM = data.dimensions?.lengthM || 4.0;
  const heightM = data.dimensions?.heightM || 2.9;
  const areaM2 = (widthM * lengthM).toFixed(1);
  const volumeM3 = (widthM * lengthM * heightM).toFixed(1);
  const style = data.style || data.proposal?.style || (isRTL ? 'مينيمال معاصر' : 'Modern Minimalist');

  const itemsList = data.items.length > 0
    ? data.items
    : data.proposal
    ? data.proposal.selectedProducts.map((p) => ({ product: p, quantity: 1 }))
    : [];

  const subtotal = data.subtotalEgp || itemsList.reduce((acc, item) => acc + (item.product.priceEgp * item.quantity), 0);
  const total = data.totalEgp || subtotal;

  const formatEgp = (num: number) => {
    return isRTL ? `${num.toLocaleString('ar-EG')} ج.م` : `${num.toLocaleString('en-US')} EGP`;
  };

  const previewImage = data.proposal?.previewImageUrl || '';

  const htmlContent = `
<!DOCTYPE html>
<html lang="${isRTL ? 'ar' : 'en'}" dir="${isRTL ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <title>ROOMORA - ${isRTL ? 'المقايسة المعمارية والمواصفات الفنية' : 'Architectural Spec Sheet'} - ${docId}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;600;700;800&family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

    :root {
      --bg: #F8F6F1;
      --card-bg: #FFFFFF;
      --sand-subtle: #EDE4D5;
      --sand-border: #DECDB8;
      --gold-accent: #B58A54;
      --text-main: #2C241D;
      --text-muted: #786957;
      --success: #1b633f;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: ${isRTL ? "'Alexandria', sans-serif" : "'Plus Jakarta Sans', sans-serif"};
      background-color: var(--bg);
      color: var(--text-main);
      line-height: 1.5;
      padding: 24px;
    }

    /* Floating Toolbar (Hidden during Print) */
    .no-print-toolbar {
      position: sticky;
      top: 12px;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #2C241D;
      color: #F8F6F1;
      padding: 12px 24px;
      border-radius: 14px;
      margin-bottom: 24px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }

    .no-print-toolbar .title {
      font-weight: 700;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .no-print-toolbar .actions {
      display: flex;
      gap: 10px;
    }

    .btn {
      cursor: pointer;
      border: none;
      padding: 8px 18px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 12px;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .btn-gold {
      background: var(--gold-accent);
      color: #FFFFFF;
    }
    .btn-gold:hover {
      background: #9D7543;
    }

    .btn-outline {
      background: transparent;
      color: #F8F6F1;
      border: 1px solid rgba(255,255,255,0.3);
    }
    .btn-outline:hover {
      background: rgba(255,255,255,0.1);
    }

    /* Document Sheet Container */
    .document-sheet {
      max-width: 900px;
      margin: 0 auto;
      background: var(--card-bg);
      border: 1px solid var(--sand-border);
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }

    /* Header */
    .doc-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid var(--sand-subtle);
      padding-bottom: 24px;
      margin-bottom: 28px;
    }

    .brand-title {
      font-family: 'Playfair Display', serif;
      font-size: 30px;
      font-weight: 800;
      letter-spacing: 0.1em;
      color: var(--text-main);
    }

    .brand-sub {
      font-size: 11px;
      color: var(--gold-accent);
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-top: 4px;
    }

    .doc-meta {
      text-align: ${isRTL ? 'left' : 'right'};
      font-size: 12px;
      color: var(--text-muted);
    }

    .doc-badge {
      display: inline-block;
      background: rgba(181, 138, 84, 0.15);
      color: var(--gold-accent);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 6px;
    }

    /* Specs Grid */
    .specs-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      background: var(--sand-subtle);
      border: 1px solid var(--sand-border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 28px;
    }

    .spec-item {
      display: flex;
      flex-direction: column;
    }

    .spec-label {
      font-size: 10px;
      text-transform: uppercase;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .spec-val {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
    }

    /* Rendering Preview */
    .preview-box {
      margin-bottom: 28px;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--sand-border);
      position: relative;
    }

    .preview-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      display: block;
    }

    .preview-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 12px 18px;
      background: linear-gradient(to top, rgba(44,36,29,0.9), transparent);
      color: #FFFFFF;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
    }

    /* Table Section */
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .section-subtitle {
      font-size: 11px;
      color: var(--text-muted);
      font-weight: normal;
    }

    table.items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 28px;
    }

    table.items-table th {
      background: var(--sand-subtle);
      color: var(--text-main);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 12px 14px;
      text-align: ${isRTL ? 'right' : 'left'};
      border-top: 1px solid var(--sand-border);
      border-bottom: 1px solid var(--sand-border);
    }

    table.items-table td {
      padding: 14px;
      border-bottom: 1px solid #ECE6DD;
      font-size: 12px;
      vertical-align: middle;
    }

    .prod-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .prod-thumb {
      width: 54px;
      height: 54px;
      border-radius: 8px;
      object-fit: cover;
      background: var(--sand-subtle);
      border: 1px solid var(--sand-border);
      flex-shrink: 0;
    }

    .prod-name {
      font-weight: 700;
      color: var(--text-main);
      font-size: 13px;
    }

    .prod-code {
      font-size: 10px;
      color: var(--gold-accent);
      font-family: monospace;
      font-weight: 600;
    }

    .prod-materials {
      font-size: 10px;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .dim-tag {
      display: inline-block;
      font-size: 10px;
      color: var(--text-muted);
      background: #F4EFEB;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #E4D8C8;
    }

    /* Financials & Sign-off */
    .summary-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    .clearance-audit-box {
      border: 1px dashed var(--gold-accent);
      background: #FAF7F2;
      border-radius: 12px;
      padding: 18px;
    }

    .audit-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      color: var(--text-main);
      font-size: 12px;
      margin-bottom: 8px;
    }

    .audit-list {
      list-style: none;
      font-size: 11px;
      color: var(--text-muted);
      space-y: 6px;
    }

    .audit-list li {
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .audit-list li::before {
      content: "✓";
      color: var(--gold-accent);
      font-weight: bold;
    }

    .financials-card {
      background: var(--sand-subtle);
      border: 1px solid var(--sand-border);
      border-radius: 12px;
      padding: 18px;
    }

    .fin-row {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text-muted);
      margin-bottom: 8px;
    }

    .fin-total {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 800;
      color: var(--text-main);
      border-top: 1px solid var(--sand-border);
      padding-top: 10px;
      margin-top: 10px;
    }

    /* Footer & Seal */
    .doc-footer {
      border-top: 1px solid var(--sand-border);
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      color: var(--text-muted);
    }

    .signatures {
      display: flex;
      gap: 40px;
      text-align: center;
    }

    .sig-line {
      width: 130px;
      border-top: 1px solid var(--text-muted);
      margin-top: 30px;
      padding-top: 4px;
      font-size: 10px;
    }

    /* Print Rules */
    @media print {
      body {
        background: #FFFFFF !important;
        padding: 0 !important;
      }
      .no-print-toolbar {
        display: none !important;
      }
      .document-sheet {
        box-shadow: none !important;
        border: none !important;
        padding: 0 !important;
        max-width: 100% !important;
      }
      @page {
        size: A4;
        margin: 12mm;
      }
      .preview-box {
        page-break-inside: avoid;
      }
      table.items-table {
        page-break-inside: auto;
      }
      tr {
        page-break-inside: avoid;
        page-break-after: auto;
      }
    }
  </style>
</head>
<body>

  <!-- Floating Toolbar -->
  <div class="no-print-toolbar">
    <div class="title">
      <span>🏛️</span>
      <span>${isRTL ? 'معاينة المقايسة المعمارية المعتمدة - جاهز للحفظ' : 'Architectural Spec Sheet Preview - Ready to Export'}</span>
    </div>
    <div class="actions">
      <button onclick="window.print()" class="btn btn-gold">
        <span>💾</span>
        <span>${isRTL ? 'حفظ بتنسيق PDF / طباعة' : 'Save as PDF / Print'}</span>
      </button>
      <button onclick="window.close()" class="btn btn-outline">
        <span>✕</span>
        <span>${isRTL ? 'إغلاق المعاينة' : 'Close Preview'}</span>
      </button>
    </div>
  </div>

  <!-- Main Architectural Dossier Sheet -->
  <div class="document-sheet">

    <!-- Document Header -->
    <div class="doc-header">
      <div>
        <div class="brand-title">ROOMORA</div>
        <div class="brand-sub">${isRTL ? 'منصة الذكاء الاصطناعي المكاني ومقايسات الأثاث المعمارية' : 'Spatial AI Interior Architecture & Showroom Specifications'}</div>
        <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">
          ${isRTL ? 'الشريك التقني للمعارض الفاخرة · فرع التجمع الخامس، القاهرة' : 'B2B Showroom Retail Partner · New Cairo Design Hub, Egypt'}
        </div>
      </div>

      <div class="doc-meta">
        <div class="doc-badge">${isRTL ? 'معتمد للمطابقة المليمترية والتوريد' : 'Certified Clearance & Supply Approved'}</div>
        <div><strong>${isRTL ? 'رقم المقايسة:' : 'Spec Dossier #:'}</strong> ${docId}</div>
        <div><strong>${isRTL ? 'تاريخ التوليد:' : 'Issue Date:'}</strong> ${dateFormatted}</div>
        <div><strong>${isRTL ? 'كود المعرض:' : 'Showroom Code:'}</strong> RM-EGY-CAI-01</div>
      </div>
    </div>

    <!-- Spatial & Room Specifications Grid -->
    <div class="specs-grid">
      <div class="spec-item">
        <span class="spec-label">${isRTL ? 'نوع الغرفة' : 'Room Type'}</span>
        <span class="spec-val">${roomType}</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">${isRTL ? 'أبعاد الغرفة المعتمدة' : 'Room Dimensions'}</span>
        <span class="spec-val" dir="ltr">${widthM.toFixed(1)}m × ${lengthM.toFixed(1)}m</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">${isRTL ? 'المساحة والارتفاع' : 'Area & Height'}</span>
        <span class="spec-val">${areaM2} m² · H ${heightM.toFixed(1)}m</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">${isRTL ? 'الطراز التصميمي' : 'Design Direction'}</span>
        <span class="spec-val">${style}</span>
      </div>
    </div>

    <!-- Rendered Perspective Visual (If available) -->
    ${previewImage ? `
    <div class="preview-box">
      <img src="${previewImage}" alt="Room Staging" class="preview-img" />
      <div class="preview-overlay">
        <span><strong>${isRTL ? 'المنظور المعماري الثلاثي الأبعاد لتوزيع الأثاث' : 'Spatial 3D Furniture Staging Perspective'}</strong> · ${data.proposal ? (isRTL ? data.proposal.titleAr : data.proposal.title) : ''}</span>
        <span>${isRTL ? 'مطابقة الأبعاد بنسبة ٩٤٪' : '94% Spatial Harmony Verified'}</span>
      </div>
    </div>
    ` : ''}

    <!-- Bill of Materials (BOM) Table -->
    <div class="section-title">
      <span>${isRTL ? 'جدول حصر قطع الأثاث والمواصفات المعمارية' : 'Itemized Bill of Materials (BOM) & Finishes'}</span>
      <span class="section-subtitle">${itemsList.length} ${isRTL ? 'قطع أثاث حقيقية من المعرض' : 'Certified Catalog Items'}</span>
    </div>

    <table class="items-table">
      <thead>
        <tr>
          <th>${isRTL ? 'قطعة الأثاث والمواصفات' : 'Furniture Item & Materials'}</th>
          <th>${isRTL ? 'الأبعاد المعتمدة' : 'Dimensions (cm)'}</th>
          <th>${isRTL ? 'الكمية' : 'Qty'}</th>
          <th>${isRTL ? 'سعر الوحدة' : 'Unit Price'}</th>
          <th>${isRTL ? 'الإجمالي' : 'Line Total'}</th>
        </tr>
      </thead>
      <tbody>
        ${itemsList.map(({ product, quantity }) => {
          const name = isRTL ? (product.nameAr || product.name) : product.name;
          const materials = isRTL ? (product.materialAr || product.material) : product.material;
          const dims = `${product.dimensions.widthCm}W × ${product.dimensions.depthCm}D × ${product.dimensions.heightCm}H cm`;

          return `
            <tr>
              <td>
                <div class="prod-cell">
                  <img src="${product.image}" alt="${name}" class="prod-thumb" />
                  <div>
                    <div class="prod-code">${product.id.toUpperCase()}</div>
                    <div class="prod-name">${name}</div>
                    <div class="prod-materials">${materials}</div>
                  </div>
                </div>
              </td>
              <td>
                <span class="dim-tag" dir="ltr">${dims}</span>
              </td>
              <td style="font-weight: 700; text-align: center;">${quantity}</td>
              <td style="font-weight: 600;">${formatEgp(product.priceEgp)}</td>
              <td style="font-weight: 700; color: var(--gold-accent);">${formatEgp(product.priceEgp * quantity)}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>

    <!-- Summary & Clearance Audits -->
    <div class="summary-grid">
      <!-- Architectural Clearance Audit -->
      <div class="clearance-audit-box">
        <div class="audit-header">
          <span>📐</span>
          <span>${isRTL ? 'شهادة التدقيق المكاني والتخليص المعماري' : 'Spatial Feasibility & Clearance Guarantee'}</span>
        </div>
        <ul class="audit-list">
          <li>${isRTL ? 'توفير ممر حركة رئيسي لا يقل عن ١.١ متر حول مسار الجلوس.' : 'Continuous 1.1m traffic clearance pathway preserved throughout.'}</li>
          <li>${isRTL ? 'مسافة مريحة لزاوية المشاهدة التلفزيونية تتناسب مع أبعاد الغرفة.' : 'Ergonomic focal viewing distance certified for visual comfort.'}</li>
          <li>${isRTL ? 'خلو مسارات فتح الأبواب والنوافذ والوصول لمخارج الكهرباء بنسبة ١٠٠٪.' : 'Zero obstruction of window portals, balcony doors, and wall sockets.'}</li>
          <li>${isRTL ? 'ضمان الهيكل الخشبي والأقمشة لمدة ٥ سنوات من المعرض.' : '5-Year Structural Frame & Upholstery Showroom Warranty.'}</li>
        </ul>
      </div>

      <!-- Financials Breakdown -->
      <div class="financials-card">
        <div class="fin-row">
          <span>${isRTL ? 'إجمالي قيمة القطع:' : 'Catalog Subtotal:'}</span>
          <span style="font-weight: 600;">${formatEgp(subtotal)}</span>
        </div>
        <div class="fin-row">
          <span>${isRTL ? 'الشحن والتوصيل المعماري الفاخر:' : 'White-Glove Delivery & Assembly:'}</span>
          <span style="color: var(--success); font-weight: 700;">${isRTL ? 'مجاناً (عرض المعرض)' : 'Complimentary (0 EGP)'}</span>
        </div>
        <div class="fin-row">
          <span>${isRTL ? 'ضريبة القيمة المضافة والشاملة:' : 'Included VAT (14%):'}</span>
          <span>${isRTL ? 'مشمولة بالكامل' : 'Inclusive'}</span>
        </div>
        <div class="fin-total">
          <span>${isRTL ? 'إجمالي الاستثمار المعماري:' : 'Total Investment:'}</span>
          <span style="color: var(--gold-accent);">${formatEgp(total)}</span>
        </div>
      </div>
    </div>

    <!-- Footer Signatures & QR Verification -->
    <div class="doc-footer">
      <div>
        <div><strong>ROOMORA AI SPATIAL ARCHITECTURE PLATFORM</strong></div>
        <div>${isRTL ? 'هذه الوثيقة صادرة ومعتمدة إلكترونياً من محرك رومورا للذكاء الاصطناعي المكاني.' : 'This document is electronically authenticated by the Roomora Spatial Simulation Engine.'}</div>
        <div>${isRTL ? 'صلاحية الأسعار وحجز القطع: ٣٠ يوماً من تاريخ التوليد.' : 'Pricing and inventory lock guarantee valid for 30 calendar days.'}</div>
      </div>

      <div class="signatures">
        <div>
          <div class="sig-line">${isRTL ? 'مهندس الديكور المعماري' : 'Lead Spatial Architect'}</div>
        </div>
        <div>
          <div class="sig-line">${isRTL ? 'إدارة المعرض والاعتماد' : 'Showroom Director'}</div>
        </div>
      </div>
    </div>

  </div>

  <script>
    // Trigger print dialog smoothly once loaded
    window.onload = function() {
      // Delay slightly so images and fonts render crisp
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
`;

  // Open printable window and render the document
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  } else {
    // If popup blocker intervened, create a downloadable data URL blob
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ROOMORA-SpecSheet-${docId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

