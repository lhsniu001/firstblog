// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#fff';
    }
});

// 设置当前活动页面的导航链接样式
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 项目过滤功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 表单提交处理
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // 这里可以添加表单提交的处理逻辑
            alert('消息已发送！');
            contactForm.reset();
        });
    }

    // 轮播图功能
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        let currentSlide = 0;
        const slideCount = slides.length;
        let slideInterval;

        // 切换到指定幻灯片
        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slideCount) % slideCount;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // 下一张幻灯片
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        // 上一张幻灯片
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // 自动播放
        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 5000); // 每5秒切换一次
        }

        // 停止自动播放
        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        // 绑定按钮事件
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideShow();
            startSlideShow();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideShow();
            startSlideShow();
        });

        // 绑定圆点事件
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopSlideShow();
                startSlideShow();
            });
        });

        // 鼠标悬停时停止自动播放
        carousel.addEventListener('mouseenter', stopSlideShow);
        carousel.addEventListener('mouseleave', startSlideShow);

        // 开始自动播放
        startSlideShow();
    }

    // 平滑滚动到文章锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 博客文章图片点击放大功能
    const images = document.querySelectorAll('.post-image');
    const overlay = document.querySelector('.image-overlay');

    if (images.length && overlay) {
        images.forEach(image => {
            image.addEventListener('click', () => {
                if (!image.classList.contains('expanded')) {
                    // 放大图片
                    image.classList.add('expanded');
                    overlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // 防止背景滚动
                }
            });
        });

        // 点击遮罩层或已放大的图片时关闭
        overlay.addEventListener('click', closeExpandedImage);
        images.forEach(image => {
            image.addEventListener('click', function() {
                if (this.classList.contains('expanded')) {
                    closeExpandedImage();
                }
            });
        });

        // 按ESC键关闭图片
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeExpandedImage();
            }
        });

        function closeExpandedImage() {
            const expandedImage = document.querySelector('.post-image.expanded');
            if (expandedImage) {
                expandedImage.classList.remove('expanded');
                overlay.classList.remove('active');
                document.body.style.overflow = ''; // 恢复背景滚动
            }
        }
    }

    // 博客文章分类筛选功能
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            button.classList.add('active');

            const selectedCategory = button.textContent.trim();

            blogPosts.forEach(post => {
                const postCategory = post.querySelector('.post-category').textContent.trim();
                if (selectedCategory === '全部' || selectedCategory === postCategory) {
                    post.style.display = 'block';
                    post.style.animation = 'fadeIn 0.5s ease';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // 添加淡入动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}); 