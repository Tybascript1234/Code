// repply

window.addEventListener("load", function () {
    setTimeout(() => {
        if (!window.alertOpen) {
            initializeWaveButtons();
        }
    }, 100);

    function initializeWaveButtons() {
        const elements = document.querySelectorAll('.wave-button');

        elements.forEach(element => {
            let isRippleActive = false;

            function createRipple(e) {
                if (isRippleActive) return;

                isRippleActive = true;

                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);

                // هنا نجعلها دائمًا في المنتصف
                const x = rect.width / 2 - size / 2;
                const y = rect.height / 2 - size / 2;

                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple');

                element.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                    isRippleActive = false;
                }, 600);
            }

            element.addEventListener('mousedown', createRipple);
            element.addEventListener('touchstart', createRipple);
        });
    }
});


//   -------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.click-button');
    const allMenus = document.querySelectorAll('.menu3');
    const overlay = document.getElementById('menu-overlay');
  
    let currentButton = null;
    let currentMenu = null;
  
    function positionMenu(button, menu) {
      const rect = button.getBoundingClientRect();
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  
      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;
      const margin = 5;
  
      let left = rect.left + scrollX;
      let top = rect.bottom + scrollY + margin;
  
      // تعديل الموضع إذا تجاوز الحواف
      if (left + menuWidth > window.innerWidth + scrollX) {
        left = window.innerWidth + scrollX - menuWidth - margin;
      }
  
      if (top + menuHeight > window.innerHeight + scrollY) {
        top = rect.top + scrollY - menuHeight - margin;
      }
  
      // نستخدم fixed ونحسب الموضع نسبة للنافذة
      menu.style.position = 'fixed';
      menu.style.left = `${rect.left}px`;
      menu.style.top = `${rect.bottom + margin}px`;
    }
  
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
  
        const menuId = button.getAttribute('data-menu');
        const menu3 = document.getElementById(menuId);
  
        if (!menu3) {
          console.warn(`القائمة "${menuId}" غير موجودة.`);
          return;
        }
  
        // إغلاق القوائم الأخرى
        allMenus.forEach(m => m.style.display = 'none');
  
        menu3.style.display = 'block';
        positionMenu(button, menu3);
  
        currentButton = button;
        currentMenu = menu3;
  
        overlay.style.display = 'block';
      });
    });
  
    function closeMenus() {
      allMenus.forEach(menu => menu.style.display = 'none');
      overlay.style.display = 'none';
      currentButton = null;
      currentMenu = null;
    }
  
    overlay.addEventListener('mousedown', closeMenus);
    overlay.addEventListener('touchstart', closeMenus);
  
    // إعادة تموضع القائمة عند التمرير
    window.addEventListener('scroll', () => {
      if (currentButton && currentMenu && currentMenu.style.display === 'block') {
        positionMenu(currentButton, currentMenu);
      }
    });
  
    window.addEventListener('resize', () => {
      if (currentButton && currentMenu && currentMenu.style.display === 'block') {
        positionMenu(currentButton, currentMenu);
      }
    });
  });


//   ---------------------------------------------------------------------------

  document.addEventListener("touchstart", function (event) {
    event.target.style.cursor = "context-menu";
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('toggleButton');
    const div = document.getElementById('myDiv');

    button.addEventListener('click', function() {
        div.classList.toggle('hevo');
    });

    // إضافة الاستماع للمسة خارج div
    document.addEventListener('touchstart', function(event) {
        if (!div.contains(event.target) && event.target !== button) {
            div.classList.add('hevo');
        }
    });
});
