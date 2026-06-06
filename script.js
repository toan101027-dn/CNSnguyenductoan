/**
 * script.js – Portfolio Nguyễn Đức Toàn
 * Chức năng:
 *  1. Navbar: sticky + highlight active link
 *  2. Hamburger menu (mobile)
 *  3. Scroll-reveal animation
 *  4. Modal "Xem chi tiết"
 */

/* ── 1. DỮ LIỆU CÁC BÀI TẬP (dùng cho modal) ────────────── */
const projects = {
  1: {
    title: 'Máy tính và các thiết bị ngoại vi',
    icon:  'fa-computer',
    goal:  'Tìm hiểu cấu tạo máy tính và thiết bị ngoại vi.',
    process: [
      'Nghiên cứu các thành phần phần cứng cơ bản của máy tính (CPU, RAM, ổ cứng, bo mạch chủ…).',
      'Phân loại thiết bị ngoại vi: thiết bị nhập (bàn phím, chuột), thiết bị xuất (màn hình, máy in) và thiết bị lưu trữ ngoài.',
      'Xây dựng sơ đồ minh họa mối quan hệ giữa các thành phần.',
    ],
    attach: 'PDF / Hình ảnh',
    attachIcon: 'fa-file-pdf',
  },
  2: {
    title: 'Khai thác dữ liệu và thông tin',
    icon:  'fa-magnifying-glass-chart',
    goal:  'Rèn luyện kỹ năng tìm kiếm và đánh giá nguồn thông tin.',
    process: [
      'Học và luyện tập các toán tử tìm kiếm nâng cao (AND, OR, NOT, site:, filetype:…).',
      'Đánh giá độ tin cậy của nguồn thông tin theo tiêu chí CRAAP (Currency, Relevance, Authority, Accuracy, Purpose).',
      'Tổng hợp kết quả vào báo cáo PDF.',
    ],
    attach: 'PDF',
    attachIcon: 'fa-file-pdf',
  },
  3: {
    title: 'Tổng quan về Trí tuệ nhân tạo',
    icon:  'fa-robot',
    goal:  'Tìm hiểu khái niệm và ứng dụng AI.',
    process: [
      'Nghiên cứu lịch sử hình thành và các nhánh chính của AI (ML, Deep Learning, NLP, Computer Vision…).',
      'Khảo sát các lĩnh vực ứng dụng AI: y tế, giao thông, giáo dục, sản xuất.',
      'Đánh giá tác động tích cực và tiêu cực của AI đối với xã hội.',
    ],
    attach: 'PDF',
    attachIcon: 'fa-file-pdf',
  },
  4: {
    title: 'Giao tiếp & Hợp tác trong môi trường số',
    icon:  'fa-users',
    goal:  'Sử dụng công cụ cộng tác trực tuyến hiệu quả.',
    process: [
      'Thực hành quản lý dự án nhóm trên các nền tảng như Google Workspace, Trello hoặc Notion.',
      'Tổ chức họp nhóm trực tuyến và ghi chú biên bản bằng công cụ số.',
      'Chia sẻ tài liệu, phân công nhiệm vụ và theo dõi tiến độ theo thời gian thực.',
    ],
    attach: 'Hình ảnh / Link',
    attachIcon: 'fa-image',
  },
  5: {
    title: 'Sáng tạo nội dung số',
    icon:  'fa-wand-magic-sparkles',
    goal:  'Ứng dụng AI tạo sinh để hỗ trợ sáng tạo nội dung.',
    process: [
      'Sử dụng các công cụ AI tạo sinh (ChatGPT, Gemini, Canva AI…) để tạo văn bản, hình ảnh và video.',
      'Chỉnh sửa, hoàn thiện sản phẩm đảm bảo tính thẩm mỹ và nội dung phù hợp.',
      'Đánh giá chất lượng đầu ra và rút kinh nghiệm về cách đặt prompt hiệu quả.',
    ],
    attach: 'Video / Hình ảnh',
    attachIcon: 'fa-video',
  },
  6: {
    title: 'An toàn & Liêm chính học thuật trong môi trường số',
    icon:  'fa-shield-halved',
    goal:  'Nâng cao nhận thức về sử dụng AI có trách nhiệm.',
    process: [
      'Nghiên cứu các nguyên tắc đạo đức AI: công bằng, minh bạch, bảo mật dữ liệu.',
      'Tìm hiểu quy tắc liêm chính học thuật: tránh đạo văn, ghi nguồn trích dẫn đúng chuẩn.',
      'Thảo luận về ranh giới giữa hỗ trợ AI hợp lệ và vi phạm học thuật.',
    ],
    attach: 'PDF',
    attachIcon: 'fa-file-pdf',
  },
};

/* ── 2. NAVBAR STICKY & ACTIVE LINK ─────────────────────── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

/**
 * Thêm class "scrolled" khi cuộn xuống hơn 40px
 * và cập nhật link đang active dựa vào section hiện tại
 */
function onScroll() {
  // Sticky style
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ── 3. HAMBURGER MENU (mobile) ──────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const navLinkList = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinkList.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Đóng menu khi click vào link
navLinkList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinkList.classList.remove('open');
  });
});

/* ── 4. SCROLL-REVEAL ANIMATION ─────────────────────────── */
/**
 * Thêm class "reveal" vào các phần tử cần animate,
 * sau đó dùng IntersectionObserver để thêm "visible"
 */
function initReveal() {
  // Các phần tử cần reveal
  const targets = [
    '.section-heading',
    '.about-left',
    '.about-right',
    '.card',
    '.sum-card',
    '.summary-lead',
  ];

  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger delay cho cards
      if (selector === '.card' || selector === '.sum-card') {
        el.style.transitionDelay = `${i * 0.08}s`;
      }
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // chỉ chạy 1 lần
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

initReveal();

/* ── 5. MODAL "XEM CHI TIẾT" ─────────────────────────────── */
const overlay     = document.getElementById('modal-overlay');
const modalClose  = document.getElementById('modal-close');
const modalContent = document.getElementById('modal-content');

/**
 * Mở modal với nội dung của bài tập có index tương ứng
 * @param {number} index - số thứ tự bài tập (1-6)
 */
function openModal(index) {
  const p = projects[index];
  if (!p) return;

  // Xây dựng HTML nội dung modal
  const processList = p.process
    .map(step => `<li>${step}</li>`)
    .join('');

  modalContent.innerHTML = `
    <span class="modal-badge">Bài ${String(index).padStart(2, '0')}</span>
    <h2><i class="fa-solid ${p.icon}" style="color:var(--amber);margin-right:10px;"></i>${p.title}</h2>
    <p><strong>Mục tiêu:</strong><br/>${p.goal}</p>
    <p style="margin-top:14px;"><strong>Quá trình thực hiện:</strong></p>
    <ul style="margin-left:16px;margin-top:8px;">${processList}</ul>
    <div class="modal-attach">
      <i class="fa-solid ${p.attachIcon}"></i>
      <span>Sản phẩm đính kèm: <strong>${p.attach}</strong> (placeholder)</span>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // khóa cuộn nền
}

/** Đóng modal */
function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Nút X trong modal
modalClose.addEventListener('click', closeModal);

// Click ra ngoài modal box cũng đóng
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

// Phím Escape đóng modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Expose cho inline onclick trong HTML
window.openModal = openModal;


/* ── 6. UPLOAD FILE HANDLER ──────────────────────────────── */

/**
 * Lưu trữ danh sách file đã chọn theo bài (key = số bài tập)
 * Mỗi entry: { name, size, type, dataURL }
 * Dùng localStorage để giữ tên file sau khi reload trang.
 */
const uploadedFiles = {}; // { 1: [{name, size, typeClass, dataURL}], ... }

// Khởi tạo từ localStorage khi tải trang
(function loadFromStorage() {
  for (let i = 1; i <= 6; i++) {
    const saved = localStorage.getItem(`portfolio_files_${i}`);
    if (saved) {
      try {
        uploadedFiles[i] = JSON.parse(saved);
        renderFileList(i);
      } catch(e) { /* bỏ qua lỗi parse */ }
    } else {
      uploadedFiles[i] = [];
    }
  }
})();

/** Lưu vào localStorage */
function saveToStorage(index) {
  localStorage.setItem(`portfolio_files_${index}`, JSON.stringify(uploadedFiles[index]));
}

/** Xác định class icon theo đuôi file */
function getTypeClass(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (['doc','docx'].includes(ext)) return 'doc';
  if (['ppt','pptx'].includes(ext)) return 'ppt';
  if (['jpg','jpeg','png','gif','webp'].includes(ext)) return 'img';
  if (['mp4','mov','avi','mkv'].includes(ext)) return 'vid';
  if (['zip','rar','7z'].includes(ext)) return 'zip';
  return 'other';
}

/** Lấy icon FontAwesome theo typeClass */
function getTypeIcon(typeClass) {
  const map = {
    pdf:   'fa-file-pdf',
    doc:   'fa-file-word',
    ppt:   'fa-file-powerpoint',
    img:   'fa-file-image',
    vid:   'fa-file-video',
    zip:   'fa-file-zipper',
    other: 'fa-file',
  };
  return map[typeClass] || 'fa-file';
}

/** Định dạng kích thước file */
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

/**
 * Render danh sách file đã upload vào card
 * @param {number} index - số bài tập
 */
function renderFileList(index) {
  const zone  = document.getElementById(`upload-zone-${index}`);
  const list  = document.getElementById(`upload-list-${index}`);
  const files = uploadedFiles[index] || [];

  if (files.length === 0) {
    zone.classList.remove('has-files');
    list.innerHTML = '';
    return;
  }

  zone.classList.add('has-files');

  // Header + nút xóa tất cả
  let html = `
    <div class="upload-list-header">
      <span><i class="fa-solid fa-paperclip"></i>&nbsp; ${files.length} file đính kèm</span>
      <button class="upload-clear-all" onclick="clearAllFiles(${index})">
        <i class="fa-solid fa-trash-can"></i> Xóa tất cả
      </button>
    </div>
  `;

  files.forEach((f, i) => {
    const icon = getTypeIcon(f.typeClass);
    html += `
      <div class="upload-file-item" id="file-item-${index}-${i}">
        <span class="file-type-icon ${f.typeClass}">
          <i class="fa-solid ${icon}"></i>
        </span>
        <div class="file-info">
          <span class="file-name" title="${f.name}">${f.name}</span>
          <span class="file-size">${f.size}</span>
        </div>
        <span class="file-status">
          <i class="fa-solid fa-circle-check"></i> Đã thêm
        </span>
        <button class="file-remove" onclick="removeFile(${index}, ${i})" title="Xóa file này">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;
  });

  list.innerHTML = html;
}

/**
 * Xử lý khi người dùng chọn file qua input
 */
function handleFileChange(event, index) {
  const files = Array.from(event.target.files);
  addFiles(index, files);
  // Reset input để có thể chọn lại cùng file
  event.target.value = '';
}

/**
 * Thêm các file vào danh sách của bài tập
 * @param {number} index
 * @param {File[]} files
 */
function addFiles(index, files) {
  if (!uploadedFiles[index]) uploadedFiles[index] = [];

  files.forEach(file => {
    // Kiểm tra trùng tên
    const exists = uploadedFiles[index].some(f => f.name === file.name);
    if (exists) return;

    uploadedFiles[index].push({
      name:      file.name,
      size:      formatSize(file.size),
      typeClass: getTypeClass(file.name),
    });
  });

  saveToStorage(index);
  renderFileList(index);
}

/**
 * Xóa một file khỏi danh sách
 */
function removeFile(index, fileIdx) {
  if (!uploadedFiles[index]) return;
  uploadedFiles[index].splice(fileIdx, 1);
  saveToStorage(index);
  renderFileList(index);
}

/**
 * Xóa toàn bộ file của một bài
 */
function clearAllFiles(index) {
  uploadedFiles[index] = [];
  saveToStorage(index);
  renderFileList(index);
}

/* Drag & drop handlers */
function handleDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add('drag-over');
}

function handleDragLeave(event) {
  event.currentTarget.classList.remove('drag-over');
}

function handleDrop(event, index) {
  event.preventDefault();
  event.currentTarget.classList.remove('drag-over');
  const files = Array.from(event.dataTransfer.files);
  addFiles(index, files);
}

// Expose functions dùng trong HTML inline handlers
window.handleFileChange = handleFileChange;
window.handleDragOver   = handleDragOver;
window.handleDragLeave  = handleDragLeave;
window.handleDrop       = handleDrop;
window.removeFile       = removeFile;
window.clearAllFiles    = clearAllFiles;
