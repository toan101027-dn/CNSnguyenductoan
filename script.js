/**
 * script.js – Portfolio Nguyễn Đức Toàn
 * Chức năng:
 * 1. Navbar: sticky + highlight active link
 * 2. Hamburger menu (mobile)
 * 3. Scroll-reveal animation
 * 4. Modal "Xem chi tiết"
 * 5. Quản lý và lưu trữ file minh chứng dạng Base64 vào localStorage (Tương thích tốt chạy local)
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

  // Tải và hiển thị danh sách các file đã lưu từ trước khi tải trang
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
  document.body.style.overflow = 'hidden'; // Khóa cuộn màn hình nền
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = ''; // Mở lại cuộn màn hình
}

document.getElementById('modal-close')?.addEventListener('click', closeModal);
document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});


/* ── 4. XỬ LÝ FILE (FILE READER API & LOCAL STORAGE) ────── */
let uploadedFiles = {};

// Khởi tạo đọc dữ liệu từ bộ nhớ localStorage của trình duyệt
try {
  const savedData = localStorage.getItem('portfolio_files');
  if (savedData) {
    uploadedFiles = JSON.parse(savedData);
  }
} catch (e) {
  console.error("Không thể khôi phục dữ liệu tệp tin từ localStorage:", e);
}

/**
 * Hàm đồng bộ trạng thái lưu tệp tin vào localStorage
 */
function saveToStorage() {
  try {
    localStorage.setItem('portfolio_files', JSON.stringify(uploadedFiles));
  } catch (e) {
    alert("⚠️ Lỗi dung lượng: Không thể lưu tệp! Bộ nhớ cục bộ (localStorage) bị tràn (Tối đa ~5MB). Vui lòng nén ảnh nhỏ lại hoặc chọn tệp nhẹ hơn.");
    console.error(e);
  }
}

/**
 * Xử lý khi nhấn nút "Chọn tệp tin" ở giao diện HTML
 */
function handleFileChange(inputElement, index) {
  if (!inputElement || !inputElement.files || inputElement.files.length === 0) return;
  const files = Array.from(inputElement.files);
  processFiles(index, files);
  inputElement.value = ''; // Reset input để cho phép chọn lại cùng một file
}

/**
 * Đọc lõi nhị phân của tệp tin chuyển thành chuỗi văn bản Base64
 */
function processFiles(index, files) {
  if (!uploadedFiles[index]) uploadedFiles[index] = [];

  files.forEach(file => {
    // Ngăn chặn tải lên các tệp trùng tên trong cùng một bài tập
    const isDuplicate = uploadedFiles[index].some(f => f.name === file.name);
    if (isDuplicate) return;

    const reader = new FileReader();
    
    // Sự kiện chạy sau khi FileReader quét thành công tệp tin
    reader.onload = function(e) {
      const base64Data = e.target.result; // Ruột tệp tin đã mã hóa Base64

      uploadedFiles[index].push({
        name: file.name,
        size: formatSize(file.size),
        typeClass: getTypeClass(file.name),
        data: base64Data // Đút văn bản Base64 này vào Object để lưu
      });

      saveToStorage();
      renderFileList(index);
    };

    // Kích hoạt đầu đọc chuyển đổi file nhị phân thành chuỗi văn bản DataURL Base64
    reader.readAsDataURL(file);
  });
}

/**
 * Vẽ danh sách hiển thị các tệp đã lưu ra ngoài giao diện người dùng
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

  // Khởi tạo phần thanh đầu danh sách (Số lượng tệp + Nút xóa sạch)
  const header = document.createElement('div');
  header.className = 'upload-list-header';
  header.innerHTML = `
    <span>Tệp tin đã tải lên (${files.length})</span>
    <button class="clear-all-btn" onclick="clearAllFiles(${index})"><i class="fa-solid fa-trash-can"></i> Xóa hết</button>
  `;
  listContainer.appendChild(header);

  // Vòng lặp xuất thẻ cho từng tệp tin
  files.forEach((file, fileIdx) => {
    const item = document.createElement('div');
    item.className = 'file-item';

    let iconClass = 'fa-file';
    if (file.typeClass === 'image') iconClass = 'fa-file-image';
    if (file.typeClass === 'pdf') iconClass = 'fa-file-pdf';
    if (file.typeClass === 'word') iconClass = 'fa-file-word';

    item.innerHTML = `
      <div class="file-icon ${file.typeClass}"><i class="fa-solid ${iconClass}"></i></div>
      <div class="file-details">
        <a class="file-name" href="${file.data || '#'}" download="${file.name}" title="Nhấp để tải xuống">${file.name}</a>
        <span class="file-size">${file.size}</span>
      </div>
      <div class="file-status"><i class="fa-solid fa-circle-check"></i> Đã lưu</div>
      <button class="file-remove" onclick="removeFile(${index}, ${fileIdx})" title="Xóa file này"><i class="fa-solid fa-xmark"></i></button>
    `;
    listContainer.appendChild(item);
  });
}

/**
 * Xóa một tệp tin đơn lẻ khỏi danh sách bài tập
 */
function removeFile(index, fileIdx) {
  if (!uploadedFiles[index]) return;
  uploadedFiles[index].splice(fileIdx, 1);
  saveToStorage();
  renderFileList(index);
}

/**
 * Xóa toàn bộ tệp tin của một mục bài tập cụ thể
 */
function clearAllFiles(index) {
  if (confirm("Bạn có chắc chắn muốn xóa toàn bộ các tệp tin đã nộp của bài tập này không?")) {
    uploadedFiles[index] = [];
    saveToStorage();
    renderFileList(index);
  }
}

/* ── 5. CÁC HÀM TRỢ GIÚP TIỆN ÍCH (HELPERS) ───────────────────────── */
function formatSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getTypeClass(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) return 'image';
  if (ext === 'pdf') return 'pdf';
  if (['doc', 'docx'].includes(ext)) return 'word';
  return 'other';
}

/* Các hàm bắt tương tác kéo thả Drag & Drop từ màn hình máy tính */
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
  processFiles(index, files);
}

// Xuất các biến và hàm này ra phạm vi Global (window) để gọi trực tiếp được từ HTML inline handlers
window.handleFileChange = handleFileChange;
window.removeFile = removeFile;
window.clearAllFiles = clearAllFiles;
window.handleDragOver = handleDragOver;
window.handleDragLeave = handleDragLeave;
window.handleDrop = handleDrop;
window.openModal = openModal;