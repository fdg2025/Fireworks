/**
 * 诊断脚本 - 在浏览器控制台运行此代码来检查事件问题
 */

console.log('=== 烟花模拟器诊断工具 ===');

// 1. 检查所有固定定位的元素
console.log('\n📍 检查固定定位元素:');
const fixedElements = Array.from(document.querySelectorAll('*')).filter(el => {
    return window.getComputedStyle(el).position === 'fixed';
});
fixedElements.forEach(el => {
    const style = window.getComputedStyle(el);
    console.log(`- ${el.className || el.tagName}:`, {
        display: style.display,
        visibility: style.visibility,
        pointerEvents: style.pointerEvents,
        zIndex: style.zIndex,
        opacity: style.opacity
    });
});

// 2. 检查画布元素
console.log('\n🎨 检查画布元素:');
const mainCanvas = document.getElementById('main-canvas');
const trailsCanvas = document.getElementById('trails-canvas');
if (mainCanvas) {
    const style = window.getComputedStyle(mainCanvas);
    console.log('Main Canvas:', {
        width: mainCanvas.width,
        height: mainCanvas.height,
        pointerEvents: style.pointerEvents,
        zIndex: style.zIndex
    });
}

// 3. 检查按钮元素
console.log('\n🔘 检查控制按钮:');
const buttons = {
    pause: document.querySelector('.pause-btn'),
    sound: document.querySelector('.sound-btn'),
    settings: document.querySelector('.settings-btn')
};
Object.entries(buttons).forEach(([name, btn]) => {
    if (btn) {
        const style = window.getComputedStyle(btn);
        console.log(`${name} button:`, {
            display: style.display,
            pointerEvents: style.pointerEvents,
            zIndex: style.zIndex,
            position: style.position
        });
    } else {
        console.log(`${name} button: NOT FOUND`);
    }
});

// 4. 检查配置面板和分享面板
console.log('\n⚙️ 检查面板状态:');
const configPanel = document.querySelector('.config-panel');
const sharePanel = document.querySelector('.share-panel');
[
    { name: 'Config Panel', el: configPanel },
    { name: 'Share Panel', el: sharePanel }
].forEach(({ name, el }) => {
    if (el) {
        const style = window.getComputedStyle(el);
        console.log(`${name}:`, {
            display: style.display,
            pointerEvents: style.pointerEvents,
            zIndex: style.zIndex,
            hasOpenClass: el.classList.contains('config-panel--open') || el.classList.contains('share-panel--open')
        });
    } else {
        console.log(`${name}: NOT FOUND`);
    }
});

// 5. 测试点击检测
console.log('\n🖱️ 点击检测测试:');
console.log('请点击屏幕任意位置...');
let clickCount = 0;
const testClickHandler = (e) => {
    clickCount++;
    const element = document.elementFromPoint(e.clientX, e.clientY);
    console.log(`点击 #${clickCount}:`, {
        x: e.clientX,
        y: e.clientY,
        target: e.target.tagName + '.' + e.target.className,
        elementAtPoint: element.tagName + '.' + element.className,
        type: e.type
    });
    
    if (clickCount >= 3) {
        document.removeEventListener('click', testClickHandler);
        console.log('✓ 点击测试完成（已移除监听器）');
    }
};
document.addEventListener('click', testClickHandler);

// 6. 检查 window.configUI 和 window.shareUI
console.log('\n🪟 检查全局对象:');
console.log('window.configUI:', typeof window.configUI, window.configUI);
console.log('window.shareUI:', typeof window.shareUI, window.shareUI);

// 7. 检查 Stage 实例
console.log('\n🎭 检查 Stage 实例:');
if (window.Stage && window.Stage.stages) {
    console.log('Stage instances:', window.Stage.stages.length);
    window.Stage.stages.forEach((stage, i) => {
        console.log(`Stage ${i}:`, {
            canvas: stage.canvas.id,
            width: stage.width,
            height: stage.height,
            listeners: Object.keys(stage._listeners)
        });
    });
}

console.log('\n=== 诊断完成 ===');
console.log('💡 提示: 点击屏幕3次以完成点击检测测试');
