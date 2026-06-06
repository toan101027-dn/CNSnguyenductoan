/**
 * script.js – Portfolio Nguyễn Đức Toàn
 * Chức năng:
 * 1. Navbar: sticky + highlight active link
 * 2. Hamburger menu (mobile)
 * 3. Scroll-reveal animation
 * 4. Modal "Xem chi tiết"
 * 5. Cấu trúc danh sách tệp minh chứng tĩnh chạy trực tiếp trên GitHub Pages
 */

/* ── 1. DỮ LIỆU CÁC BÀI TẬP (Dùng cho Modal chi tiết) ────────────── */
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
      'Lập bảng tổng hợp các nguồn tài liệu học thuật đã đánh giá.',
    ],
    attach: 'Bảng đánh giá (PDF/Excel)',
    attachIcon: 'fa-file-excel',
  },
  3: {
    title: 'Tổng quan về trí tuệ nhân tạo',
    icon:  'fa-brain',
    goal:  'Học cách viết prompt hiệu quả để tối ưu kết quả từ AI.',
    process: [
      'Tìm hiểu các cấu trúc prompt cơ bản và nâng cao (Role, Context, Task, Format).',
      'Thử nghiệm so sánh kết quả giữa prompt thông thường và prompt cải tiến.',
      'Đúc kết kinh nghiệm ứng dụng AI trong học tập một cách có trách nhiệm.',
    ],
    attach: 'Cặp Prompt đối sánh',
    attachIcon: 'fa-comments',
  },
  4: {
    title: 'Giao tiếp và hợp tác trong môi trường số',
    icon:  'fa-users-gear',
    goal:  'Ứng dụng công cụ số để làm việc nhóm hiệu quả.',
    process: [
      'Sử dụng các nền tảng lưu trữ và chia sẻ trực tuyến (Google Drive, OneDrive).',
      'Phối hợp biên tập tài liệu, quản lý tiến độ công việc theo thời gian thực.',
      'Xây dựng quy trình làm việc nhóm đồng bộ, rõ ràng.',
    ],
    attach: 'Minh chứng thư mục nhóm',
    attachIcon: 'fa-folder-open',
  },
  5: {
    title: 'Sáng tạo nội dung số',
    icon:  'fa-photo-film',
    goal:  'Sử dụng AI hỗ trợ lên ý tưởng và tạo sản phẩm truyền thông.',
    process: [
      'Sử dụng AI tạo sinh để hỗ trợ xây dựng kịch bản, viết nội dung bài đăng.',
      'Ứng dụng các công cụ thiết kế (Canva, CapCut, Midjourney...) thiết kế ấn phẩm.',
      'Hoàn thiện sản phẩm số (hình ảnh, video short, bài viết truyền thông).',
    ],
    attach: 'Hình ảnh / Link Video sản phẩm',
    attachIcon: 'fa-file-video',
  },
  6: {
    title: 'An toàn và liêm chính học thuật trong môi trường số',
    icon:  'fa-shield-halved',
    goal:  'Hiểu về an toàn thông tin và đạo đức khi sử dụng AI.',
    process: [
      'Nghiên cứu các nguy cơ mất an toàn thông tin cá nhân trên mạng xã hội.',
      'Tìm hiểu về khái niệm đạo văn và nguyên tắc liêm chính học thuật thời đại AI.',
      'Xây dựng bảng cam kết/nguyên tắc cá nhân khi khai thác tài nguyên số.',
    ],
    attach: 'Bộ nguyên tắc cá nhân (PDF)',
    attachIcon: 'fa-file-shield',
  },
};

/* ── 2. ĐIỀU HƯỚNG & GIAO DIỆN (NAVBAR & MENU) ────── */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, header');

  // Sticky Navbar + Highlight Link khi cuộn chuột
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Toggle Hamburger Menu cho Mobile
  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksList.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksList.classList.remove('active');
      });
    });
  }

  // Tải hiển thị danh sách file bài tập tĩnh lên giao diện
  for (let i = 1; i <= 6; i++) {
    renderFileList(i);
  }
});

/* ── 3. HIỂN THỊ MODAL CHI TIẾT BÀI TẬP ──────────────────────────── */
function openModal(id) {
  const project = projects[id];
  if (!project) return;

  document.getElementById('modal-title').innerText = project.title;
  document.getElementById('modal-goal').innerText = project.goal;

  const processList = document.getElementById('modal-process');
  processList.innerHTML = '';
  project.process.forEach(step => {
    const li = document.createElement('li');
    li.innerText = step;
    processList.appendChild(li);
  });

  document.getElementById('modal-attach-text').innerText = project.attach;
  const attachIcon = document.getElementById('modal-attach-icon');
  if (attachIcon) attachIcon.className = `fa-solid ${project.attachIcon}`;

  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden'; 
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = ''; 
}

document.getElementById('modal-close')?.addEventListener('click', closeModal);
document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});


/* ── 4. CẤU TRÚC ĐƯỜNG DẪN FILE BÀI TẬP THỰC TẾ TRÊN GITHUB ────── */
// Điền chính xác các file nằm trong thư mục documents của Toàn
let uploadedFiles = {
  1: [
    {
      name: "NguyenDucToan_BaiTap1.pdf",
      size: "1.45 MB",
      typeClass: "pdf",
      data: "documents/NguyenDucToan_BaiTap1.pdf"
    }
  ],
  2: [
    {
      name: "NguyenDucToan_BaiTap2.docx",
      size: "420 KB",
      typeClass: "word",
      data: "documents/NguyenDucToan_BaiTap2.docx"
    }
  ],
  3: [
    {
      name: "NguyenDucToan_BaiTap3.docx",
      size: "315 KB",
      typeClass: "word",
      data: "documents/NguyenDucToan_BaiTap3.docx"
    }
  ],
  4: [
    {
      name: "NguyenDucToan_BaiTap4.docx",
      size: "512 KB",
      typeClass: "word",
      data: "documents/NguyenDucToan_BaiTap4.docx"
    }
  ],
  5: [
    {
      name: "NguyenDucToan_BaiTap5.docx",
      size: "640 KB",
      typeClass: "word",
      data: "documents/NguyenDucToan_BaiTap5.docx"
    }
  ],
  6: [] // Bài 6 hiện tại trong ảnh chưa thấy file nên mình tạm để trống, khi nào có bạn chỉ cần thêm vào nhé!
};

/**
 * Hàm vẽ giao diện danh sách file cố định
 */
function renderFileList(index) {
  const listContainer = document.getElementById(`file-list-${index}`);
  if (!listContainer) return;

  listContainer.innerHTML = '';
  const files = uploadedFiles[index] || [];

  if (files.length === 0) {
    listContainer.style.display = 'none';
    return;
  }

  listContainer.style.display = 'block';

  const header = document.createElement('div');
  header.className = 'upload-list-header';
  header.innerHTML = `<span>Tệp tin minh chứng đã nộp (${files.length})</span>`;
  listContainer.appendChild(header);

  files.forEach((file) => {
    const item = document.createElement('div');
    item.className = 'file-item';

    let iconClass = 'fa-file';
    if (file.typeClass === 'image') iconClass = 'fa-file-image';
    if (file.typeClass === 'pdf') iconClass = 'fa-file-pdf';
    if (file.typeClass === 'word') iconClass = 'fa-file-word';

    item.innerHTML = `
      <div class="file-icon ${file.typeClass}"><i class="fa-solid ${iconClass}"></i></div>
      <div class="file-details">
        <a class="file-name" href="${file.data}" download="${file.name}" title="Nhấp để tải xuống">${file.name}</a>
        <span class="file-size">${file.size}</span>
      </div>
      <div class="file-status"><i class="fa-solid fa-circle-check"></i> Sẵn sàng</div>
    `;
    listContainer.appendChild(item);
  });
}

// Giữ lại các hàm trống tránh lỗi khi HTML gọi các thuộc tính kéo thả inline cũ
window.handleFileChange = () => {};
window.handleDragOver = (e) => { e.preventDefault(); };
window.handleDragLeave = () => {};
window.handleDrop = (e) => { e.preventDefault(); };
window.openModal = openModal;