/**
 * 全面的点击诊断工具
 * 在浏览器控制台运行：fetch('./click-diagnosis.js').then(r => r.text()).then(eval);
 */

console.log('🔍 === 点击诊断工具启动 ===\n');

// 记录所有事件类型
const eventTypes = ['mousedown', 'mouseup', 'click', 'touchstart', 'touchend', 'touchmove', 'pointerdown', 'pointerup', 'pointermove'];
const eventCounts = {};

eventTypes.forEach(type => {
    eventCounts[type] = 0;
    
    document.addEventListener(type, function(e) {
        eventCounts[type]++;
        
        // 只记录前5次点击事件
        if (eventCounts[type] <= 5) {
            const element = e.target;
            const computedStyle = window.getComputedStyle(element);
            
            console.log(`📍 ${type} #${eventCounts[type]}:`, {
                target: `${element.tagName}.${element.className}`,
                id: element.id || 'none',
                position: { x: e.clientX, y: e.clientY },
                targetStyle: {
                    pointerEvents: computedStyle.pointerEvents,
                    zIndex: computedStyle.zIndex,
                    position: computedStyle.position
                },
                elementAtPoint: (() => {
                    const el = document.elementFromPoint(e.clientX, e.clientY);
                    return el ? `${el.tagName}.${el.className}` : 'null';
                })()
            });
        }
    }, true); // capture phase
});

// 检查 Stage 实例和事件监听器
setTimeout(() => {
    console.log('\n🎭 Stage 检查:');
    
    // 检查 mainStage 是否存在
    const mainCanvas = document.getElementById('main-canvas');
    const trailsCanvas = document.getElementById('trails-canvas');
    
    if (mainCanvas) {
        console.log('✅ main-canvas 存在');
        console.log('   尺寸:', mainCanvas.width, 'x', mainCanvas.height);
        console.log('   样式:', window.getComputedStyle(mainCanvas));
    } else {
        console.log('❌ main-canvas 不存在！');
    }
    
    // 检查 window 上的 Stage
    if (window.Stage) {
        console.log('✅ window.Stage 存在');
        console.log('   Stage.stages 数量:', window.Stage.stages ? window.Stage.stages.length : 'undefined');
        
        if (window.Stage.stages && window.Stage.stages.length > 0) {
            window.Stage.stages.forEach((stage, i) => {
                console.log(`   Stage[${i}]:`, {
                    canvas: stage.canvas.id,
                    width: stage.width,
                    height: stage.height,
                    hasListeners: !!stage._listeners
                });
                
                if (stage._listeners) {
                    console.log(`   监听器:`, Object.keys(stage._listeners));
                    if (stage._listeners.pointerstart) {
                        console.log(`   pointerstart 监听器数量: ${stage._listeners.pointerstart.length}`);
                    }
                }
            });
        }
    } else {
        console.log('❌ window.Stage 不存在！');
    }
    
    console.log('\n💡 提示:');
    console.log('1. 现在点击画布任意位置');
    console.log('2. 观察控制台输出哪些事件被触发');
    console.log('3. 检查事件的 target 是否是 CANVAS');
    console.log('4. 查看是否有 [Input] 开头的日志\n');
}, 500);

// 5秒后显示统计
setTimeout(() => {
    console.log('\n📊 事件统计（5秒内）:');
    Object.entries(eventCounts).forEach(([type, count]) => {
        if (count > 0) {
            console.log(`   ${type}: ${count} 次`);
        }
    });
    
    if (eventCounts.mousedown === 0 && eventCounts.touchstart === 0 && eventCounts.pointerdown === 0) {
        console.log('\n⚠️ 警告: 没有检测到任何点击事件！');
        console.log('   可能的原因:');
        console.log('   1. 有元素完全阻挡了所有事件');
        console.log('   2. 浏览器事件被禁用');
        console.log('   3. 页面被覆盖');
    }
}, 5000);

console.log('✅ 诊断工具已加载，5秒内点击屏幕进行测试\n');
