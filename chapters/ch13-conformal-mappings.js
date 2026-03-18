window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'Conformal Mappings',
    subtitle: 'Angle-preserving transformations and their magic',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Conformal Mappings?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Conformal Mappings?</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Idea</div>
    <div class="env-body">
        <p>Imagine you are an ant walking on a surface. You make a right-angle turn at a crossroads. Now someone stretches and bends the surface, but in a very special way: every angle you turn still feels the same. The crossroads might move, the roads might curve, but your right turn is still a right turn. That is what a conformal mapping does: it can distort shapes, but it faithfully preserves all angles.</p>
    </div>
</div>

<p>Conformal mappings sit at the intersection of complex analysis and geometry. They emerged from two very different motivations:</p>

<ol>
    <li><strong>Cartography.</strong> Mercator's 1569 projection preserves angles, so compass bearings on the map match compass bearings on the globe. Every angle-preserving map projection is a conformal mapping.</li>
    <li><strong>Physics.</strong> Laplace's equation \\(\\nabla^2 \\phi = 0\\) governs electrostatic potentials, steady-state heat flow, and ideal fluid flow. Conformal maps transform solutions of Laplace's equation on one domain into solutions on another, letting us solve hard boundary-value problems by mapping them to easier geometries.</li>
</ol>

<p>The deep connection to complex analysis is this: <strong>a holomorphic function with nonzero derivative is conformal</strong>. Analyticity, which we have studied in terms of power series, Cauchy integrals, and residues, automatically gives us angle preservation. This chapter makes that connection precise.</p>

<h3>What This Chapter Covers</h3>

<p>We begin with the precise definition of conformality and its link to the complex derivative. We then build a catalog of conformal maps from elementary functions (powers, exponential, trigonometric, Joukowski), study how compositions of conformal maps let us chain simple transformations into complicated ones, preview the Schwarz-Christoffel formula for mapping to polygonal regions, and close with applications to fluid dynamics, electrostatics, and heat flow.</p>

<div class="env-block remark">
    <div class="env-title">Prerequisite Check</div>
    <div class="env-body">
        <p>This chapter assumes familiarity with holomorphic functions (Chapter 2), elementary functions (Chapter 3), and the basics of complex differentiation. The Cauchy-Riemann equations will appear frequently.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Definition and the Derivative
        // ================================================================
        {
            id: 'sec-definition',
            title: 'Definition & the Derivative',
            content: `
<h2>Conformal Maps: Definition and the Derivative</h2>

<div class="env-block definition">
    <div class="env-title">Definition 13.1 (Conformal Map)</div>
    <div class="env-body">
        <p>A function \\(f: U \\to \\mathbb{C}\\), where \\(U \\subseteq \\mathbb{C}\\) is open, is <strong>conformal at \\(z_0 \\in U\\)</strong> if it preserves both the magnitude and the orientation of angles between smooth curves passing through \\(z_0\\). That is, if \\(\\gamma_1\\) and \\(\\gamma_2\\) are two smooth curves meeting at \\(z_0\\) at angle \\(\\alpha\\), then \\(f \\circ \\gamma_1\\) and \\(f \\circ \\gamma_2\\) meet at \\(f(z_0)\\) at the same angle \\(\\alpha\\), with the same orientation.</p>
        <p>We say \\(f\\) is <strong>conformal on \\(U\\)</strong> if it is conformal at every point of \\(U\\).</p>
    </div>
</div>

<p>The key theorem connecting conformality to complex analysis is:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.1 (Conformality of Holomorphic Functions)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic at \\(z_0\\) and \\(f'(z_0) \\neq 0\\), then \\(f\\) is conformal at \\(z_0\\).</p>
        <p>Conversely, if \\(f: U \\to \\mathbb{C}\\) is a \\(C^1\\) orientation-preserving conformal map on an open set \\(U\\), then \\(f\\) is holomorphic with \\(f'(z) \\neq 0\\) on \\(U\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Let \\(\\gamma\\) be a smooth curve with \\(\\gamma(t_0) = z_0\\) and \\(\\gamma'(t_0) \\neq 0\\). The image curve is \\(w(t) = f(\\gamma(t))\\), and by the chain rule:</p>
        \\[w'(t_0) = f'(z_0) \\cdot \\gamma'(t_0).\\]
        <p>Writing \\(f'(z_0) = |f'(z_0)| e^{i\\alpha}\\), we see that multiplication by \\(f'(z_0)\\) <strong>rotates</strong> every tangent vector by the fixed angle \\(\\alpha = \\arg f'(z_0)\\) and <strong>scales</strong> it by \\(|f'(z_0)|\\). Since all tangent vectors at \\(z_0\\) are rotated by the same angle, the angle between any two curves is preserved.</p>
        <p>When \\(f'(z_0) = 0\\), angles are not preserved. If \\(f\\) has a zero of order \\(n\\) at \\(z_0\\) (i.e., \\(f(z) - f(z_0) \\sim c(z-z_0)^n\\)), then angles are multiplied by \\(n\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Local Geometry of \\(f'(z_0)\\)</h3>

<p>At a point where \\(f'(z_0) = re^{i\\theta}\\), the map \\(f\\) locally acts as:</p>
<ul>
    <li><strong>Scaling</strong> by \\(r = |f'(z_0)|\\): infinitesimal lengths are multiplied by \\(r\\).</li>
    <li><strong>Rotation</strong> by \\(\\theta = \\arg f'(z_0)\\): all directions are rotated by \\(\\theta\\).</li>
</ul>
<p>This means that infinitesimally, a conformal map sends circles to circles (not ellipses). The Jacobian matrix of the real mapping \\((x,y) \\mapsto (u,v)\\) is a scalar multiple of a rotation matrix, which is precisely the content of the Cauchy-Riemann equations.</p>

<div class="env-block example">
    <div class="env-title">Example: Where Is \\(f(z) = z^2\\) Conformal?</div>
    <div class="env-body">
        <p>\\(f'(z) = 2z\\), which vanishes only at \\(z = 0\\). So \\(f(z) = z^2\\) is conformal on \\(\\mathbb{C} \\setminus \\{0\\}\\). At the origin, angles are doubled: two curves meeting at angle \\(\\alpha\\) have images meeting at angle \\(2\\alpha\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-angle-preservation"></div>
`,
            visualizations: [
                {
                    id: 'viz-angle-preservation',
                    title: 'Angle Preservation Under Conformal Maps',
                    description: 'Two curves (red and blue) meet at a point in the z-plane. Their images under f(z) meet at the same angle in the w-plane. Drag the intersection point to see how f\'(z) determines the local rotation and scaling. When f\'(z) = 0 (at the origin for z^2), angles are multiplied.',
                    setup: function(body, controls) {
                        var container = document.createElement('div');
                        container.style.display = 'flex';
                        container.style.gap = '8px';
                        container.style.justifyContent = 'center';
                        body.appendChild(container);

                        var leftDiv = document.createElement('div');
                        var rightDiv = document.createElement('div');
                        container.appendChild(leftDiv);
                        container.appendChild(rightDiv);

                        var w = 270, h = 270;
                        var vizL = new VizEngine(leftDiv, { width: w, height: h, scale: 40 });
                        var vizR = new VizEngine(rightDiv, { width: w, height: h, scale: 20 });

                        var mapFuncs = {
                            'z^2': function(x, y) { return [x*x - y*y, 2*x*y]; },
                            'e^z': function(x, y) { var ex = Math.exp(x); return [ex * Math.cos(y), ex * Math.sin(y)]; },
                            '1/z': function(x, y) { var d = x*x + y*y; if (d < 1e-12) return [1e6, 0]; return [x/d, -y/d]; }
                        };
                        var mapNames = Object.keys(mapFuncs);
                        var currentMap = 'z^2';

                        var sel = document.createElement('select');
                        sel.style.cssText = 'padding:3px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;';
                        mapNames.forEach(function(name) {
                            var opt = document.createElement('option');
                            opt.value = name;
                            opt.textContent = 'f(z) = ' + name;
                            sel.appendChild(opt);
                        });
                        sel.addEventListener('change', function() { currentMap = sel.value; draw(); });
                        controls.appendChild(sel);

                        var pt = vizL.addDraggable('pt', 1.5, 1.0, vizL.colors.white, 7, function() { draw(); });

                        function draw() {
                            var f = mapFuncs[currentMap];
                            var zx = pt.x, zy = pt.y;

                            // Left: z-plane
                            vizL.clear();
                            vizL.drawGrid();
                            vizL.drawAxes();
                            vizL.screenText('z-plane', w/2, 14, vizL.colors.text, 11);

                            // Draw two lines through the draggable point
                            var angle1 = 0;
                            var angle2 = Math.PI / 3;
                            var len = 2.5;

                            // Curve 1 (red line)
                            var c1pts = [];
                            for (var i = -40; i <= 40; i++) {
                                var t = i / 40 * len;
                                c1pts.push([zx + t * Math.cos(angle1), zy + t * Math.sin(angle1)]);
                            }
                            // Curve 2 (blue line)
                            var c2pts = [];
                            for (var i = -40; i <= 40; i++) {
                                var t = i / 40 * len;
                                c2pts.push([zx + t * Math.cos(angle2), zy + t * Math.sin(angle2)]);
                            }

                            var ctx = vizL.ctx;
                            ctx.strokeStyle = vizL.colors.red; ctx.lineWidth = 2;
                            ctx.beginPath();
                            c1pts.forEach(function(p, i) {
                                var s = vizL.toScreen(p[0], p[1]);
                                i === 0 ? ctx.moveTo(s[0], s[1]) : ctx.lineTo(s[0], s[1]);
                            });
                            ctx.stroke();

                            ctx.strokeStyle = vizL.colors.blue; ctx.lineWidth = 2;
                            ctx.beginPath();
                            c2pts.forEach(function(p, i) {
                                var s = vizL.toScreen(p[0], p[1]);
                                i === 0 ? ctx.moveTo(s[0], s[1]) : ctx.lineTo(s[0], s[1]);
                            });
                            ctx.stroke();

                            // Draw angle arc
                            var arcR = 25;
                            var sp = vizL.toScreen(zx, zy);
                            ctx.strokeStyle = vizL.colors.yellow; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.arc(sp[0], sp[1], arcR, -angle1, -angle2, true);
                            ctx.stroke();

                            var angleDeg = Math.round((angle2 - angle1) * 180 / Math.PI);
                            vizL.screenText(angleDeg + '\u00B0', sp[0] + 35, sp[1] - 20, vizL.colors.yellow, 11);

                            vizL.drawDraggables();

                            // Right: w-plane
                            vizR.clear();
                            vizR.drawGrid();
                            vizR.drawAxes();
                            vizR.screenText('w-plane: f(z) = ' + currentMap, w/2, 14, vizR.colors.text, 11);

                            // Map curves
                            var ctxR = vizR.ctx;
                            ctxR.strokeStyle = vizR.colors.red; ctxR.lineWidth = 2;
                            ctxR.beginPath();
                            var started = false;
                            c1pts.forEach(function(p) {
                                var w = f(p[0], p[1]);
                                if (!isFinite(w[0]) || !isFinite(w[1]) || Math.abs(w[0]) > 20 || Math.abs(w[1]) > 20) { started = false; return; }
                                var s = vizR.toScreen(w[0], w[1]);
                                !started ? (ctxR.moveTo(s[0], s[1]), started = true) : ctxR.lineTo(s[0], s[1]);
                            });
                            ctxR.stroke();

                            ctxR.strokeStyle = vizR.colors.blue; ctxR.lineWidth = 2;
                            ctxR.beginPath();
                            started = false;
                            c2pts.forEach(function(p) {
                                var w = f(p[0], p[1]);
                                if (!isFinite(w[0]) || !isFinite(w[1]) || Math.abs(w[0]) > 20 || Math.abs(w[1]) > 20) { started = false; return; }
                                var s = vizR.toScreen(w[0], w[1]);
                                !started ? (ctxR.moveTo(s[0], s[1]), started = true) : ctxR.lineTo(s[0], s[1]);
                            });
                            ctxR.stroke();

                            // Map intersection point
                            var wz = f(zx, zy);
                            if (isFinite(wz[0]) && isFinite(wz[1])) {
                                vizR.drawPoint(wz[0], wz[1], vizR.colors.white, 'f(z\u2080)', 5);

                                // Compute image tangent directions to measure angle
                                var eps = 0.001;
                                var t1a = f(zx + eps * Math.cos(angle1), zy + eps * Math.sin(angle1));
                                var t2a = f(zx + eps * Math.cos(angle2), zy + eps * Math.sin(angle2));
                                var imgAngle1 = Math.atan2(t1a[1] - wz[1], t1a[0] - wz[0]);
                                var imgAngle2 = Math.atan2(t2a[1] - wz[1], t2a[0] - wz[0]);
                                var imgAngleDiff = imgAngle2 - imgAngle1;
                                while (imgAngleDiff < 0) imgAngleDiff += 2 * Math.PI;
                                while (imgAngleDiff > Math.PI) imgAngleDiff -= 2 * Math.PI;

                                // Draw angle arc on w-plane
                                var swz = vizR.toScreen(wz[0], wz[1]);
                                ctxR.strokeStyle = vizR.colors.yellow; ctxR.lineWidth = 1.5;
                                ctxR.beginPath();
                                ctxR.arc(swz[0], swz[1], arcR, -imgAngle1, -imgAngle2, imgAngleDiff > 0);
                                ctxR.stroke();

                                var imgDeg = Math.round(Math.abs(imgAngleDiff) * 180 / Math.PI);
                                vizR.screenText(imgDeg + '\u00B0', swz[0] + 35, swz[1] - 20, vizR.colors.yellow, 11);
                            }
                        }
                        draw();
                        return vizL;
                    }
                }
            ],
            exercises: [
                {
                    question: 'At which points is \\(f(z) = z^3 - 3z\\) not conformal? What happens to angles at those points?',
                    hint: 'Find where \\(f\'(z) = 0\\). If \\(f\'(z_0) = 0\\) and \\(f\\) has a zero of order \\(n\\) at \\(z_0\\) (meaning \\(f(z) - f(z_0) \\sim c(z - z_0)^n\\)), then angles are multiplied by \\(n\\).',
                    solution: '\\(f\'(z) = 3z^2 - 3 = 3(z-1)(z+1)\\), so \\(f\'(z) = 0\\) at \\(z = \\pm 1\\). Near \\(z = 1\\): \\(f(z) - f(1) = (z-1)^2(z+2) \\approx 3(z-1)^2\\), so angles are doubled. Similarly near \\(z = -1\\): \\(f(z) - f(-1) = (z+1)^2(z-2) \\approx -3(z+1)^2\\), so angles are also doubled.'
                },
                {
                    question: 'Prove that \\(f(z) = \\bar{z}\\) (complex conjugation) preserves the magnitude of angles but reverses their orientation. Such maps are called <em>anti-conformal</em>.',
                    hint: 'If two curves meet at angle \\(\\alpha\\) (measured counterclockwise from one tangent to the other), what happens to the tangent vectors under conjugation?',
                    solution: 'Conjugation maps \\(\\gamma\'(t) = a + bi\\) to \\(\\overline{\\gamma\'(t)} = a - bi\\), reflecting across the real axis. If two tangent vectors make angle \\(\\alpha\\) (counterclockwise), their conjugates make angle \\(-\\alpha\\) (clockwise). The magnitude \\(|\\alpha|\\) is preserved but the sign flips. Conjugation is not holomorphic (it fails Cauchy-Riemann), confirming it is anti-conformal, not conformal.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Examples — A Catalog of Conformal Maps
        // ================================================================
        {
            id: 'sec-examples',
            title: 'Examples',
            content: `
<h2>A Catalog of Conformal Maps</h2>

<p>We now survey the most important conformal maps built from elementary functions. Each transforms specific geometric regions into others, forming the building blocks for solving boundary-value problems.</p>

<h3>1. Power Maps: \\(w = z^n\\)</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(w = z^2\\)</div>
    <div class="env-body">
        <p>In polar form, \\(z = re^{i\\theta} \\mapsto w = r^2 e^{2i\\theta}\\). This map:</p>
        <ul>
            <li>Doubles all angles from the origin.</li>
            <li>Maps the upper half-plane \\(\\{\\text{Im}(z) > 0\\}\\) onto the full plane minus the positive real axis.</li>
            <li>Maps a wedge of opening \\(\\pi/n\\) onto the upper half-plane (for general \\(z^n\\)).</li>
        </ul>
        <p>The inverse map \\(w^{1/n}\\) "opens up" angles, mapping the upper half-plane to a wedge of opening \\(\\pi/n\\).</p>
    </div>
</div>

<h3>2. The Exponential Map: \\(w = e^z\\)</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(w = e^z\\)</div>
    <div class="env-body">
        <p>Writing \\(z = x + iy\\), we get \\(w = e^x e^{iy}\\), so \\(|w| = e^x\\) and \\(\\arg w = y\\). Key mappings:</p>
        <ul>
            <li>Horizontal lines \\(y = c\\) map to rays from the origin at angle \\(c\\).</li>
            <li>Vertical lines \\(x = c\\) map to circles \\(|w| = e^c\\).</li>
            <li>The horizontal strip \\(\\{0 < y < \\pi\\}\\) maps to the upper half-plane.</li>
            <li>The horizontal strip \\(\\{0 < y < 2\\pi\\}\\) maps to \\(\\mathbb{C} \\setminus \\{0\\}\\) (with a cut along the positive real axis).</li>
        </ul>
        <p>Since \\((e^z)' = e^z \\neq 0\\) everywhere, the exponential map is conformal on all of \\(\\mathbb{C}\\).</p>
    </div>
</div>

<h3>3. The Sine Map: \\(w = \\sin z\\)</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(w = \\sin z\\)</div>
    <div class="env-body">
        <p>Using \\(\\sin(x + iy) = \\sin x \\cosh y + i \\cos x \\sinh y\\):</p>
        <ul>
            <li>Vertical lines \\(x = c\\) map to branches of hyperbolas.</li>
            <li>Horizontal lines \\(y = c\\) map to ellipses (for \\(c \\neq 0\\)).</li>
            <li>The vertical strip \\(\\{-\\pi/2 < x < \\pi/2\\}\\) maps conformally onto \\(\\mathbb{C}\\) minus two rays \\((-\\infty, -1]\\) and \\([1, \\infty)\\).</li>
        </ul>
        <p>Critical points: \\(\\cos z = 0\\) at \\(z = \\pm \\pi/2 + n\\pi\\). At these points, \\(\\sin z = \\pm 1\\) and conformality fails.</p>
    </div>
</div>

<h3>4. The Joukowski Map: \\(w = z + 1/z\\)</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(w = z + 1/z\\) (Joukowski Transform)</div>
    <div class="env-body">
        <p>This is the most celebrated conformal map in applied mathematics. For \\(z = re^{i\\theta}\\):</p>
        \\[w = \\left(r + \\frac{1}{r}\\right)\\cos\\theta + i\\left(r - \\frac{1}{r}\\right)\\sin\\theta.\\]
        <ul>
            <li><strong>Circles \\(|z| = r > 1\\)</strong> map to ellipses \\(\\frac{u^2}{(r+1/r)^2} + \\frac{v^2}{(r-1/r)^2} = 1\\).</li>
            <li><strong>The unit circle \\(|z| = 1\\)</strong> maps to the segment \\([-2, 2]\\) (traversed twice).</li>
            <li><strong>Circles passing near \\(|z| = 1\\) but slightly off-center</strong> map to airfoil-shaped curves.</li>
        </ul>
        <p>Critical points: \\(w'(z) = 1 - 1/z^2 = 0\\) at \\(z = \\pm 1\\). The Joukowski map is conformal on \\(\\mathbb{C} \\setminus \\{-1, 0, 1\\}\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-conformal-grid"></div>

<div class="viz-placeholder" data-viz="viz-joukowski"></div>

<div class="viz-placeholder" data-viz="viz-exp-strips"></div>

<div class="viz-placeholder" data-viz="viz-sin-mapping"></div>
`,
            visualizations: [
                {
                    id: 'viz-conformal-grid',
                    title: 'Conformal Grid Transformation',
                    description: 'Watch a regular grid in the z-plane get transformed by various conformal maps. The grid lines curve, but they always cross at right angles. Use the dropdown to select different maps and toggle animation.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 360, scale: 40 });

                        var maps = {
                            'z^2': function(x, y) { return [x*x - y*y, 2*x*y]; },
                            'e^z': function(x, y) { var ex = Math.exp(x); return [ex * Math.cos(y), ex * Math.sin(y)]; },
                            'sin(z)': function(x, y) { return [Math.sin(x) * Math.cosh(y), Math.cos(x) * Math.sinh(y)]; },
                            '1/z': function(x, y) { var d = x*x + y*y; if (d < 1e-10) return [1e5, 0]; return [x/d, -y/d]; },
                            'Joukowski': function(x, y) {
                                var d = x*x + y*y;
                                if (d < 1e-10) return [1e5, 0];
                                return [x + x/d, y - y/d];
                            }
                        };
                        var mapNames = Object.keys(maps);
                        var currentMap = 'z^2';
                        var animT = 0;
                        var animating = false;

                        var sel = document.createElement('select');
                        sel.style.cssText = 'padding:3px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;margin-right:6px;';
                        mapNames.forEach(function(name) {
                            var opt = document.createElement('option');
                            opt.value = name;
                            opt.textContent = 'f(z) = ' + name;
                            sel.appendChild(opt);
                        });
                        sel.addEventListener('change', function() {
                            currentMap = sel.value;
                            if (!animating) { animT = 1; draw(); }
                        });
                        controls.appendChild(sel);

                        var animBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true;
                            animT = 0;
                            function step() {
                                animT += 0.015;
                                if (animT >= 1) { animT = 1; animating = false; }
                                draw();
                                if (animating) requestAnimationFrame(step);
                            }
                            requestAnimationFrame(step);
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            animating = false;
                            animT = 0;
                            draw();
                        });

                        function lerp(a, b, t) { return a + (b - a) * t; }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var f = maps[currentMap];
                            var t = Math.min(1, Math.max(0, animT));

                            viz.screenText('f(z) = ' + currentMap + (t < 1 ? '  t = ' + t.toFixed(2) : ''), viz.width / 2, 16, viz.colors.white, 12);

                            // Draw transformed grid
                            var gridMin = -3, gridMax = 3;
                            var step = 0.5;
                            var res = 80;

                            // Vertical grid lines (constant x)
                            for (var gx = gridMin; gx <= gridMax; gx += step) {
                                ctx.strokeStyle = viz.colors.blue + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= res; i++) {
                                    var gy = gridMin + (gridMax - gridMin) * i / res;
                                    var mapped = f(gx, gy);
                                    var px = lerp(gx, mapped[0], t);
                                    var py = lerp(gy, mapped[1], t);
                                    if (!isFinite(px) || !isFinite(py) || Math.abs(px) > 15 || Math.abs(py) > 15) {
                                        started = false; continue;
                                    }
                                    var s = viz.toScreen(px, py);
                                    if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.stroke();
                            }

                            // Horizontal grid lines (constant y)
                            for (var gy = gridMin; gy <= gridMax; gy += step) {
                                ctx.strokeStyle = viz.colors.teal + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= res; i++) {
                                    var gx = gridMin + (gridMax - gridMin) * i / res;
                                    var mapped = f(gx, gy);
                                    var px = lerp(gx, mapped[0], t);
                                    var py = lerp(gy, mapped[1], t);
                                    if (!isFinite(px) || !isFinite(py) || Math.abs(px) > 15 || Math.abs(py) > 15) {
                                        started = false; continue;
                                    }
                                    var s = viz.toScreen(px, py);
                                    if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.stroke();
                            }

                            // Origin marker
                            var o = f(0, 0);
                            var ox = lerp(0, isFinite(o[0]) ? o[0] : 0, t);
                            var oy = lerp(0, isFinite(o[1]) ? o[1] : 0, t);
                            if (isFinite(ox) && isFinite(oy)) {
                                viz.drawPoint(ox, oy, viz.colors.white, null, 3);
                            }
                        }
                        animT = 1;
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-joukowski',
                    title: 'Joukowski Airfoil Transform',
                    description: 'Drag the center of the circle in the z-plane to see how the Joukowski map w = z + 1/z transforms circles into airfoil shapes. When the circle passes through z = 1, the trailing edge forms a cusp. Move the center off the real axis for cambered airfoils.',
                    setup: function(body, controls) {
                        var container = document.createElement('div');
                        container.style.display = 'flex';
                        container.style.gap = '8px';
                        container.style.justifyContent = 'center';
                        body.appendChild(container);

                        var leftDiv = document.createElement('div');
                        var rightDiv = document.createElement('div');
                        container.appendChild(leftDiv);
                        container.appendChild(rightDiv);

                        var w = 270, h = 270;
                        var vizL = new VizEngine(leftDiv, { width: w, height: h, scale: 50 });
                        var vizR = new VizEngine(rightDiv, { width: w, height: h, scale: 50 });

                        var center = vizL.addDraggable('center', -0.15, 0.1, vizL.colors.orange, 7, function() { draw(); });

                        function joukowski(x, y) {
                            var d = x*x + y*y;
                            if (d < 1e-10) return [1e5, 0];
                            return [x + x/d, y - y/d];
                        }

                        function draw() {
                            var cx = center.x, cy = center.y;
                            // Radius: circle passes through z = 1
                            var R = Math.sqrt((1 - cx) * (1 - cx) + cy * cy);

                            // Left: z-plane
                            vizL.clear();
                            vizL.drawGrid();
                            vizL.drawAxes();
                            vizL.screenText('z-plane', w/2, 14, vizL.colors.text, 11);

                            // Draw circle
                            vizL.drawCircle(cx, cy, R, null, vizL.colors.orange, 2);
                            vizL.drawPoint(cx, cy, vizL.colors.orange, null, 3);

                            // Mark critical points
                            vizL.drawPoint(1, 0, vizL.colors.red, '+1', 4);
                            vizL.drawPoint(-1, 0, vizL.colors.red, '-1', 4);

                            // Unit circle for reference
                            vizL.drawCircle(0, 0, 1, null, vizL.colors.text + '44', 1);

                            vizL.drawDraggables();

                            // Right: w-plane (Joukowski image)
                            vizR.clear();
                            vizR.drawGrid();
                            vizR.drawAxes();
                            vizR.screenText('w-plane: z + 1/z', w/2, 14, vizR.colors.text, 11);

                            // Map circle
                            var ctx = vizR.ctx;
                            ctx.strokeStyle = vizR.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var nPts = 300;
                            for (var i = 0; i <= nPts; i++) {
                                var theta = 2 * Math.PI * i / nPts;
                                var zx = cx + R * Math.cos(theta);
                                var zy = cy + R * Math.sin(theta);
                                var wp = joukowski(zx, zy);
                                if (!isFinite(wp[0]) || !isFinite(wp[1])) continue;
                                var s = vizR.toScreen(wp[0], wp[1]);
                                i === 0 ? ctx.moveTo(s[0], s[1]) : ctx.lineTo(s[0], s[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();

                            // Fill airfoil lightly
                            ctx.fillStyle = vizR.colors.orange + '22';
                            ctx.fill();

                            // Label
                            vizR.screenText('R = ' + R.toFixed(3), w/2, h - 14, vizR.colors.text, 10);
                        }
                        draw();
                        return vizL;
                    }
                },
                {
                    id: 'viz-exp-strips',
                    title: 'Exponential Map: Strips to Half-Planes',
                    description: 'The exponential map sends horizontal strips in the z-plane to sectors in the w-plane. Horizontal lines become rays, vertical lines become circles. Drag the strip height to see different mappings.',
                    setup: function(body, controls) {
                        var container = document.createElement('div');
                        container.style.display = 'flex';
                        container.style.gap = '8px';
                        container.style.justifyContent = 'center';
                        body.appendChild(container);

                        var leftDiv = document.createElement('div');
                        var rightDiv = document.createElement('div');
                        container.appendChild(leftDiv);
                        container.appendChild(rightDiv);

                        var w = 270, h = 270;
                        var vizL = new VizEngine(leftDiv, { width: w, height: h, scale: 30, originX: w * 0.6 });
                        var vizR = new VizEngine(rightDiv, { width: w, height: h, scale: 30 });

                        var stripH = Math.PI;
                        VizEngine.createSlider(controls, 'Strip height', 0.5, 6.28, stripH, 0.1, function(v) {
                            stripH = v;
                            draw();
                        });

                        function draw() {
                            // Left: z-plane
                            vizL.clear();
                            vizL.drawGrid();
                            vizL.drawAxes();
                            vizL.screenText('z-plane', w/2, 14, vizL.colors.text, 11);

                            var ctx = vizL.ctx;

                            // Shade the strip
                            var s0 = vizL.toScreen(-10, stripH);
                            var s1 = vizL.toScreen(10, 0);
                            ctx.fillStyle = vizL.colors.blue + '22';
                            ctx.fillRect(0, s0[1], w, s1[1] - s0[1]);

                            // Draw strip boundaries
                            ctx.strokeStyle = vizL.colors.blue; ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            var sy0 = vizL.toScreen(0, 0);
                            ctx.moveTo(0, sy0[1]); ctx.lineTo(w, sy0[1]); ctx.stroke();
                            var syH = vizL.toScreen(0, stripH);
                            ctx.beginPath();
                            ctx.moveTo(0, syH[1]); ctx.lineTo(w, syH[1]); ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw grid lines inside strip
                            var nH = 5;
                            for (var i = 0; i <= nH; i++) {
                                var y = stripH * i / nH;
                                ctx.strokeStyle = vizL.colors.teal + '66'; ctx.lineWidth = 1;
                                ctx.beginPath();
                                var sy = vizL.toScreen(0, y);
                                ctx.moveTo(0, sy[1]); ctx.lineTo(w, sy[1]); ctx.stroke();
                            }

                            var nV = 6;
                            for (var i = -3; i <= 3; i++) {
                                var x = i * 0.8;
                                ctx.strokeStyle = vizL.colors.orange + '66'; ctx.lineWidth = 1;
                                ctx.beginPath();
                                var sx0 = vizL.toScreen(x, 0);
                                var sx1 = vizL.toScreen(x, stripH);
                                ctx.moveTo(sx0[0], sx0[1]); ctx.lineTo(sx1[0], sx1[1]); ctx.stroke();
                            }

                            vizL.screenText('y = 0', 20, sy0[1] + 12, vizL.colors.blue, 10, 'left');
                            vizL.screenText('y = ' + stripH.toFixed(2), 20, syH[1] - 6, vizL.colors.blue, 10, 'left');

                            // Right: w-plane
                            vizR.clear();
                            vizR.drawGrid();
                            vizR.drawAxes();
                            vizR.screenText('w = e^z', w/2, 14, vizR.colors.text, 11);

                            var ctxR = vizR.ctx;

                            // Shade sector
                            ctxR.fillStyle = vizR.colors.blue + '22';
                            ctxR.beginPath();
                            ctxR.moveTo(vizR.originX, vizR.originY);
                            var arcR = Math.max(w, h);
                            for (var i = 0; i <= 60; i++) {
                                var a = stripH * i / 60;
                                var sx = vizR.originX + arcR * Math.cos(a);
                                var sy = vizR.originY - arcR * Math.sin(a);
                                ctxR.lineTo(sx, sy);
                            }
                            ctxR.closePath();
                            ctxR.fill();

                            // Horizontal lines -> rays
                            for (var i = 0; i <= nH; i++) {
                                var angle = stripH * i / nH;
                                ctxR.strokeStyle = vizR.colors.teal + '88'; ctxR.lineWidth = 1;
                                ctxR.beginPath();
                                var so = vizR.toScreen(0, 0);
                                ctxR.moveTo(so[0], so[1]);
                                var rEnd = 6;
                                var ex = rEnd * Math.cos(angle);
                                var ey = rEnd * Math.sin(angle);
                                var se = vizR.toScreen(ex, ey);
                                ctxR.lineTo(se[0], se[1]);
                                ctxR.stroke();
                            }

                            // Vertical lines -> circles
                            for (var i = -3; i <= 3; i++) {
                                var x = i * 0.8;
                                var r = Math.exp(x);
                                if (r > 8 || r < 0.05) continue;
                                ctxR.strokeStyle = vizR.colors.orange + '66'; ctxR.lineWidth = 1;
                                ctxR.beginPath();
                                for (var j = 0; j <= 80; j++) {
                                    var a = stripH * j / 80;
                                    var wx = r * Math.cos(a);
                                    var wy = r * Math.sin(a);
                                    var s = vizR.toScreen(wx, wy);
                                    j === 0 ? ctxR.moveTo(s[0], s[1]) : ctxR.lineTo(s[0], s[1]);
                                }
                                ctxR.stroke();
                            }
                        }
                        draw();
                        return vizL;
                    }
                },
                {
                    id: 'viz-sin-mapping',
                    title: 'Sine Map: Strips to Slit Planes',
                    description: 'The map w = sin(z) sends vertical lines to hyperbolas and horizontal lines to ellipses. The vertical strip |Re(z)| < pi/2 maps onto the plane minus two rays along the real axis.',
                    setup: function(body, controls) {
                        var container = document.createElement('div');
                        container.style.display = 'flex';
                        container.style.gap = '8px';
                        container.style.justifyContent = 'center';
                        body.appendChild(container);

                        var leftDiv = document.createElement('div');
                        var rightDiv = document.createElement('div');
                        container.appendChild(leftDiv);
                        container.appendChild(rightDiv);

                        var w = 270, h = 270;
                        var vizL = new VizEngine(leftDiv, { width: w, height: h, scale: 40 });
                        var vizR = new VizEngine(rightDiv, { width: w, height: h, scale: 40 });

                        function draw() {
                            // Left: z-plane
                            vizL.clear();
                            vizL.drawGrid();
                            vizL.drawAxes();
                            vizL.screenText('z-plane', w/2, 14, vizL.colors.text, 11);

                            var ctx = vizL.ctx;
                            // Shade strip
                            var sL = vizL.toScreen(-Math.PI/2, 0);
                            var sR = vizL.toScreen(Math.PI/2, 0);
                            ctx.fillStyle = vizL.colors.purple + '22';
                            ctx.fillRect(sL[0], 0, sR[0] - sL[0], h);

                            // Vertical grid lines
                            var nV = 8;
                            for (var i = -nV; i <= nV; i++) {
                                var x = i * Math.PI / (2 * nV) * 3;
                                if (Math.abs(x) > Math.PI / 2 + 0.01) continue;
                                ctx.strokeStyle = (i === -nV || i === nV) ? vizL.colors.purple : vizL.colors.blue + '66';
                                ctx.lineWidth = (Math.abs(Math.abs(x) - Math.PI/2) < 0.01) ? 2 : 1;
                                ctx.beginPath();
                                var st = vizL.toScreen(x, -4);
                                var sb = vizL.toScreen(x, 4);
                                ctx.moveTo(st[0], st[1]); ctx.lineTo(sb[0], sb[1]); ctx.stroke();
                            }

                            // Horizontal grid lines
                            for (var j = -3; j <= 3; j++) {
                                if (j === 0) continue;
                                var y = j * 0.6;
                                ctx.strokeStyle = vizL.colors.teal + '66'; ctx.lineWidth = 1;
                                ctx.beginPath();
                                var sl = vizL.toScreen(-Math.PI/2, y);
                                var sr = vizL.toScreen(Math.PI/2, y);
                                ctx.moveTo(sl[0], sl[1]); ctx.lineTo(sr[0], sr[1]); ctx.stroke();
                            }

                            // Right: w-plane
                            vizR.clear();
                            vizR.drawGrid();
                            vizR.drawAxes();
                            vizR.screenText('w = sin(z)', w/2, 14, vizR.colors.text, 11);

                            var ctxR = vizR.ctx;

                            // Map vertical lines -> hyperbola branches
                            for (var i = -nV; i <= nV; i++) {
                                var x = i * Math.PI / (2 * nV) * 3;
                                if (Math.abs(x) > Math.PI / 2 + 0.01) continue;
                                ctxR.strokeStyle = vizR.colors.blue + '88'; ctxR.lineWidth = 1;
                                ctxR.beginPath();
                                var started = false;
                                for (var k = -60; k <= 60; k++) {
                                    var y = k * 0.05;
                                    var u = Math.sin(x) * Math.cosh(y);
                                    var v = Math.cos(x) * Math.sinh(y);
                                    if (Math.abs(u) > 5 || Math.abs(v) > 5) { started = false; continue; }
                                    var s = vizR.toScreen(u, v);
                                    if (!started) { ctxR.moveTo(s[0], s[1]); started = true; }
                                    else ctxR.lineTo(s[0], s[1]);
                                }
                                ctxR.stroke();
                            }

                            // Map horizontal lines -> ellipses
                            for (var j = -3; j <= 3; j++) {
                                if (j === 0) continue;
                                var y = j * 0.6;
                                ctxR.strokeStyle = vizR.colors.teal + '88'; ctxR.lineWidth = 1;
                                ctxR.beginPath();
                                for (var k = 0; k <= 80; k++) {
                                    var x = -Math.PI/2 + Math.PI * k / 80;
                                    var u = Math.sin(x) * Math.cosh(y);
                                    var v = Math.cos(x) * Math.sinh(y);
                                    var s = vizR.toScreen(u, v);
                                    k === 0 ? ctxR.moveTo(s[0], s[1]) : ctxR.lineTo(s[0], s[1]);
                                }
                                ctxR.stroke();
                            }

                            // Mark the slit
                            ctxR.strokeStyle = vizR.colors.red; ctxR.lineWidth = 2.5;
                            ctxR.beginPath();
                            var s1 = vizR.toScreen(1, 0), s2 = vizR.toScreen(5, 0);
                            ctxR.moveTo(s1[0], s1[1]); ctxR.lineTo(s2[0], s2[1]); ctxR.stroke();
                            ctxR.beginPath();
                            var s3 = vizR.toScreen(-1, 0), s4 = vizR.toScreen(-5, 0);
                            ctxR.moveTo(s3[0], s3[1]); ctxR.lineTo(s4[0], s4[1]); ctxR.stroke();
                        }
                        draw();
                        return vizL;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find a conformal map from the first quadrant \\(\\{x > 0, y > 0\\}\\) to the upper half-plane \\(\\{\\text{Im}(w) > 0\\}\\).',
                    hint: 'The first quadrant is a wedge of opening \\(\\pi/2\\). Which power map opens a wedge of angle \\(\\alpha\\) to a half-plane?',
                    solution: 'The first quadrant is the wedge \\(0 < \\arg z < \\pi/2\\). The map \\(w = z^2\\) doubles angles, sending \\(0 < \\arg z < \\pi/2\\) to \\(0 < \\arg w < \\pi\\), which is the upper half-plane.'
                },
                {
                    question: 'Show that the map \\(w = e^{\\pi z/a}\\) sends the horizontal strip \\(\\{0 < \\text{Im}(z) < a\\}\\) to the upper half-plane.',
                    hint: 'Write \\(z = x + iy\\) and compute \\(\\arg(w)\\). What range does \\(\\arg(w)\\) cover as \\(y\\) ranges from \\(0\\) to \\(a\\)?',
                    solution: 'With \\(z = x + iy\\): \\(w = e^{\\pi(x+iy)/a} = e^{\\pi x/a} e^{i\\pi y/a}\\). So \\(|w| = e^{\\pi x/a} > 0\\) and \\(\\arg w = \\pi y / a\\). As \\(y\\) goes from \\(0\\) to \\(a\\), \\(\\arg w\\) goes from \\(0\\) to \\(\\pi\\), covering the upper half-plane. The map is holomorphic with \\(w\' = (\\pi/a)e^{\\pi z/a} \\neq 0\\), so it is conformal.'
                },
                {
                    question: 'At which points does the Joukowski map \\(w = z + 1/z\\) fail to be conformal? Compute \\(w\'(z)\\) and find its zeros.',
                    hint: 'Differentiate and set equal to zero.',
                    solution: '\\(w\'(z) = 1 - 1/z^2 = (z^2 - 1)/z^2\\). This vanishes when \\(z^2 = 1\\), i.e., \\(z = \\pm 1\\). At these points, \\(w(\\pm 1) = \\pm 2\\). The map is also undefined at \\(z = 0\\). So \\(w = z + 1/z\\) is conformal on \\(\\mathbb{C} \\setminus \\{-1, 0, 1\\}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Composition of Conformal Maps
        // ================================================================
        {
            id: 'sec-composition',
            title: 'Composition',
            content: `
<h2>Composition of Conformal Maps</h2>

<div class="env-block intuition">
    <div class="env-title">Building Complex Maps from Simple Ones</div>
    <div class="env-body">
        <p>In practice, we rarely find a single elementary function that maps one given region to another. Instead, we chain together simple conformal maps. Since the composition of holomorphic functions is holomorphic, and the chain rule gives \\((g \\circ f)'(z) = g'(f(z)) \\cdot f'(z)\\), the composition of two conformal maps is conformal (provided neither derivative vanishes).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.2 (Composition Preserves Conformality)</div>
    <div class="env-body">
        <p>Let \\(f: U \\to V\\) and \\(g: V \\to W\\) be holomorphic with \\(f'(z) \\neq 0\\) on \\(U\\) and \\(g'(w) \\neq 0\\) on \\(V\\). Then \\(g \\circ f: U \\to W\\) is conformal on \\(U\\).</p>
    </div>
</div>

<h3>Strategy: Multi-Step Conformal Mapping</h3>

<p>To find a conformal map from region \\(A\\) to region \\(B\\):</p>
<ol>
    <li>Map \\(A\\) to some standard region (upper half-plane, unit disk, strip) using \\(f_1\\).</li>
    <li>Map that standard region to another standard region using \\(f_2\\) (if needed).</li>
    <li>Map from the standard region to \\(B\\) using \\(f_3\\).</li>
    <li>The composition \\(f_3 \\circ f_2 \\circ f_1\\) maps \\(A\\) to \\(B\\) conformally.</li>
</ol>

<div class="env-block example">
    <div class="env-title">Example: Wedge to Strip</div>
    <div class="env-body">
        <p>Map the wedge \\(\\{0 < \\arg z < \\pi/4\\}\\) to the horizontal strip \\(\\{0 < \\text{Im}(w) < 1\\}\\).</p>
        <p><strong>Step 1:</strong> \\(z_1 = z^4\\) maps the wedge (opening \\(\\pi/4\\)) to the upper half-plane (opening \\(\\pi\\)).</p>
        <p><strong>Step 2:</strong> \\(z_2 = \\log z_1\\) maps the upper half-plane to the strip \\(\\{0 < \\text{Im}(z_2) < \\pi\\}\\).</p>
        <p><strong>Step 3:</strong> \\(w = z_2 / \\pi\\) scales the strip to height 1.</p>
        <p>Composition: \\(w = \\frac{1}{\\pi} \\log(z^4) = \\frac{4}{\\pi} \\log z\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Upper Half-Plane to Unit Disk</div>
    <div class="env-body">
        <p>The Cayley transform \\(w = \\frac{z - i}{z + i}\\) maps the upper half-plane \\(\\{\\text{Im}(z) > 0\\}\\) to the unit disk \\(\\{|w| < 1\\}\\). We can verify:</p>
        <ul>
            <li>\\(z = i \\mapsto w = 0\\) (center of the disk).</li>
            <li>\\(z = 0 \\mapsto w = -1\\), \\(z = 1 \\mapsto w = \\frac{1-i}{1+i} = -i\\), \\(z = -1 \\mapsto w = i\\).</li>
            <li>The real axis maps to the unit circle: for \\(z = x\\) real, \\(|w| = |x-i|/|x+i| = 1\\).</li>
        </ul>
        <p>This is a Mobius transformation; we will study these in depth in Chapter 14.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-composition-builder"></div>
`,
            visualizations: [
                {
                    id: 'viz-composition-builder',
                    title: 'Composition Builder',
                    description: 'Build a multi-step conformal map by chaining elementary transformations. Select up to 3 maps to compose, and see the intermediate and final results on a test grid. Each stage is applied left-to-right.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 340, scale: 35 });

                        var catalog = {
                            'identity': { name: 'z', fn: function(x, y) { return [x, y]; } },
                            'z^2': { name: 'z\u00B2', fn: function(x, y) { return [x*x - y*y, 2*x*y]; } },
                            'e^z': { name: 'e^z', fn: function(x, y) { var ex = Math.exp(x); return [ex * Math.cos(y), ex * Math.sin(y)]; } },
                            '1/z': { name: '1/z', fn: function(x, y) { var d = x*x + y*y; if (d < 1e-10) return [1e5, 0]; return [x/d, -y/d]; } },
                            'iz': { name: 'iz', fn: function(x, y) { return [-y, x]; } },
                            'z+1': { name: 'z+1', fn: function(x, y) { return [x + 1, y]; } },
                            '2z': { name: '2z', fn: function(x, y) { return [2*x, 2*y]; } },
                            'conj': { name: 'z\u0305 (anti)', fn: function(x, y) { return [x, -y]; } }
                        };
                        var catKeys = Object.keys(catalog);

                        var stages = ['identity', 'identity', 'identity'];

                        function makeSel(idx) {
                            var sel = document.createElement('select');
                            sel.style.cssText = 'padding:3px 6px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;margin-right:4px;';
                            catKeys.forEach(function(k) {
                                var opt = document.createElement('option');
                                opt.value = k;
                                opt.textContent = 'f' + (idx + 1) + ' = ' + catalog[k].name;
                                sel.appendChild(opt);
                            });
                            sel.addEventListener('change', function() { stages[idx] = sel.value; draw(); });
                            return sel;
                        }

                        var lbl = document.createElement('span');
                        lbl.style.cssText = 'color:#8b949e;font-size:0.75rem;margin-right:4px;';
                        lbl.textContent = 'Compose:';
                        controls.appendChild(lbl);

                        for (var i = 0; i < 3; i++) {
                            controls.appendChild(makeSel(i));
                            if (i < 2) {
                                var arrow = document.createElement('span');
                                arrow.style.cssText = 'color:#8b949e;font-size:0.8rem;margin:0 2px;';
                                arrow.textContent = '\u2192';
                                controls.appendChild(arrow);
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var composed = function(x, y) {
                                var p = [x, y];
                                for (var s = 0; s < 3; s++) {
                                    p = catalog[stages[s]].fn(p[0], p[1]);
                                    if (!isFinite(p[0]) || !isFinite(p[1])) return [NaN, NaN];
                                }
                                return p;
                            };

                            // Label
                            var label = catalog[stages[0]].name;
                            for (var s = 1; s < 3; s++) {
                                if (stages[s] !== 'identity') label = catalog[stages[s]].name + ' \u2218 ' + label;
                            }
                            viz.screenText('w = ' + label, viz.width / 2, 16, viz.colors.white, 12);

                            // Draw transformed grid
                            var gridMin = -3, gridMax = 3, step = 0.5, res = 60;

                            for (var gx = gridMin; gx <= gridMax; gx += step) {
                                ctx.strokeStyle = viz.colors.blue + '77'; ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= res; i++) {
                                    var gy = gridMin + (gridMax - gridMin) * i / res;
                                    var p = composed(gx, gy);
                                    if (!isFinite(p[0]) || !isFinite(p[1]) || Math.abs(p[0]) > 15 || Math.abs(p[1]) > 15) { started = false; continue; }
                                    var sc = viz.toScreen(p[0], p[1]);
                                    if (!started) { ctx.moveTo(sc[0], sc[1]); started = true; }
                                    else ctx.lineTo(sc[0], sc[1]);
                                }
                                ctx.stroke();
                            }
                            for (var gy = gridMin; gy <= gridMax; gy += step) {
                                ctx.strokeStyle = viz.colors.teal + '77'; ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= res; i++) {
                                    var gx = gridMin + (gridMax - gridMin) * i / res;
                                    var p = composed(gx, gy);
                                    if (!isFinite(p[0]) || !isFinite(p[1]) || Math.abs(p[0]) > 15 || Math.abs(p[1]) > 15) { started = false; continue; }
                                    var sc = viz.toScreen(p[0], p[1]);
                                    if (!started) { ctx.moveTo(sc[0], sc[1]); started = true; }
                                    else ctx.lineTo(sc[0], sc[1]);
                                }
                                ctx.stroke();
                            }

                            // Origin
                            var o = composed(0, 0);
                            if (isFinite(o[0]) && isFinite(o[1])) {
                                viz.drawPoint(o[0], o[1], viz.colors.white, null, 3);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find a conformal map from the sector \\(\\{0 < \\arg z < \\pi/3\\}\\) to the unit disk \\(\\{|w| < 1\\}\\).',
                    hint: 'First map the sector to the upper half-plane using a power map, then use the Cayley transform to go from the upper half-plane to the unit disk.',
                    solution: 'Step 1: \\(z_1 = z^3\\) maps the sector (opening \\(\\pi/3\\)) to the upper half-plane (opening \\(\\pi\\)). Step 2: the Cayley transform \\(w = \\frac{z_1 - i}{z_1 + i}\\) maps the upper half-plane to the unit disk. Composition: \\(w = \\frac{z^3 - i}{z^3 + i}\\).'
                },
                {
                    question: 'If \\(f\\) is conformal on \\(U\\) and \\(g\\) is anti-conformal (preserves angles but reverses orientation, e.g., \\(g(z) = \\bar{z}\\)), is \\(g \\circ f\\) conformal or anti-conformal?',
                    hint: 'Consider how each map affects the orientation of angles. Conformal preserves, anti-conformal reverses.',
                    solution: '\\(f\\) preserves orientation, \\(g\\) reverses it. So \\(g \\circ f\\) reverses orientation once, making it anti-conformal. Similarly, the composition of two anti-conformal maps is conformal (two reversals = preservation). This parallels the sign rule for determinants.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Schwarz-Christoffel Preview
        // ================================================================
        {
            id: 'sec-schwarz-christoffel',
            title: 'Schwarz-Christoffel',
            content: `
<h2>The Schwarz-Christoffel Formula: A Preview</h2>

<div class="env-block intuition">
    <div class="env-title">Mapping to Polygons</div>
    <div class="env-body">
        <p>The examples so far map between "smooth" regions (half-planes, disks, strips, sectors). But what if the target region has corners, like a rectangle or a triangle? The Schwarz-Christoffel formula gives an explicit conformal map from the upper half-plane (or the unit disk) to any polygonal region.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.3 (Schwarz-Christoffel Formula)</div>
    <div class="env-body">
        <p>Let \\(P\\) be a polygon with interior angles \\(\\alpha_1, \\alpha_2, \\ldots, \\alpha_n\\) at vertices \\(w_1, w_2, \\ldots, w_n\\). The conformal map \\(f\\) from the upper half-plane \\(\\mathbb{H}\\) to the interior of \\(P\\), sending prescribed real points \\(x_1 < x_2 < \\cdots < x_n\\) to the vertices, has the derivative:</p>
        \\[f'(z) = C \\prod_{k=1}^{n} (z - x_k)^{\\alpha_k/\\pi - 1}\\]
        <p>where \\(C\\) is a constant (determined by scaling and rotation). The map itself is:</p>
        \\[f(z) = A + C \\int_{z_0}^{z} \\prod_{k=1}^{n} (\\zeta - x_k)^{\\alpha_k/\\pi - 1} \\, d\\zeta.\\]
    </div>
</div>

<h3>How It Works</h3>

<p>The key insight: as \\(z\\) moves along the real axis past a prevertex \\(x_k\\), the factor \\((z - x_k)^{\\alpha_k/\\pi - 1}\\) introduces a change of argument in \\(f'(z)\\), which corresponds to a turn of the boundary. The exponent \\(\\alpha_k/\\pi - 1\\) is chosen so that the turning angle is exactly what is needed to create the interior angle \\(\\alpha_k\\).</p>

<div class="env-block example">
    <div class="env-title">Example: Map to a Half-Strip</div>
    <div class="env-body">
        <p>The half-strip \\(\\{u > 0, \\, 0 < v < \\pi\\}\\) is a polygon with two right-angle vertices (at \\(w = 0\\) and \\(w = i\\pi\\)) and a vertex "at infinity." Interior angles \\(\\alpha_1 = \\alpha_2 = \\pi/2\\). Placing prevertices at \\(x_1 = -1\\) and \\(x_2 = 1\\):</p>
        \\[f'(z) = \\frac{C}{\\sqrt{z^2 - 1}}\\]
        <p>Integrating: \\(f(z) = C \\cosh^{-1}(z) + A\\), which after determining constants gives the expected map.</p>
    </div>
</div>

<h3>Practical Challenges</h3>

<p>The Schwarz-Christoffel formula is theoretically exact, but practical computation faces two difficulties:</p>
<ol>
    <li><strong>Prevertex problem:</strong> While \\(n - 3\\) of the prevertices \\(x_k\\) can be freely chosen (typically \\(x_1 = 0, x_2 = 1, x_n = \\infty\\)), the remaining ones must be determined by solving a system of nonlinear equations. This is called the <em>parameter problem</em>.</li>
    <li><strong>Numerical integration:</strong> The integrand has branch-point singularities at each prevertex, requiring careful numerical treatment.</li>
</ol>

<div class="env-block remark">
    <div class="env-title">Looking Ahead</div>
    <div class="env-body">
        <p>The Schwarz-Christoffel formula is a gateway to the Riemann Mapping Theorem (Chapter 15), which guarantees that <em>any</em> simply connected region (other than \\(\\mathbb{C}\\) itself) can be conformally mapped to the unit disk. The Schwarz-Christoffel formula gives this map explicitly for polygonal regions.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Use the Schwarz-Christoffel formula to find \\(f\'(z)\\) for a conformal map from the upper half-plane to an equilateral triangle (interior angles all \\(\\pi/3\\)). You do not need to evaluate the integral.',
                    hint: 'An equilateral triangle has 3 vertices, each with interior angle \\(\\pi/3\\). Use exponents \\(\\alpha_k/\\pi - 1 = 1/3 - 1 = -2/3\\).',
                    solution: 'With three prevertices \\(x_1, x_2, x_3\\) on the real line (choose \\(x_1 = 0, x_2 = 1, x_3 = \\infty\\), so the factor for \\(x_3\\) drops out): \\[f\'(z) = C \\cdot z^{-2/3} (z - 1)^{-2/3}.\\] The map is \\(f(z) = A + C \\int_0^z \\zeta^{-2/3}(\\zeta - 1)^{-2/3} \\, d\\zeta\\), a Schwarz-Christoffel integral with branch-point singularities at \\(0\\) and \\(1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Applications
        // ================================================================
        {
            id: 'sec-applications',
            title: 'Applications',
            content: `
<h2>Applications of Conformal Mappings</h2>

<p>Conformal maps are not just mathematical curiosities. They are indispensable tools in physics and engineering, precisely because they preserve the structure of Laplace's equation.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.4 (Invariance of Laplace's Equation)</div>
    <div class="env-body">
        <p>If \\(\\phi(u, v)\\) is harmonic in a region \\(\\Omega\\) (i.e., \\(\\nabla^2 \\phi = 0\\)) and \\(w = f(z)\\) is a conformal map from \\(D\\) to \\(\\Omega\\), then \\(\\Phi(x, y) = \\phi(u(x,y), v(x,y))\\) is harmonic in \\(D\\).</p>
    </div>
</div>

<p>This means: solve Laplace's equation on an easy domain, then pull the solution back via a conformal map to the hard domain you actually care about.</p>

<h3>Application 1: Ideal Fluid Flow</h3>

<div class="env-block example">
    <div class="env-title">Flow Around an Obstacle</div>
    <div class="env-body">
        <p>For an ideal (inviscid, incompressible, irrotational) 2D fluid, the velocity field is \\(\\mathbf{v} = \\nabla \\phi\\), where \\(\\phi\\) is harmonic. The <em>complex potential</em> is \\(F(z) = \\phi + i\\psi\\), where \\(\\psi\\) is the stream function. Level curves of \\(\\psi\\) are streamlines.</p>
        <p>Uniform flow in a simple domain (say, a half-plane) has the trivial complex potential \\(F(z) = z\\). If \\(w = f(z)\\) maps the half-plane to a region with a complicated boundary (say, around an airfoil), then \\(F(f^{-1}(w))\\) gives the complex potential for flow around the airfoil.</p>
    </div>
</div>

<h3>Application 2: Electrostatics</h3>

<div class="env-block example">
    <div class="env-title">Electric Field Between Conductors</div>
    <div class="env-body">
        <p>The electric potential \\(\\phi\\) between two conductors satisfies \\(\\nabla^2 \\phi = 0\\) with \\(\\phi = V_1\\) on one conductor and \\(\\phi = V_2\\) on the other. For parallel plates, the solution is trivial (linear). For complicated conductor geometries, we conformally map to parallel plates, solve there, and map back.</p>
    </div>
</div>

<h3>Application 3: Heat Conduction</h3>

<div class="env-block example">
    <div class="env-title">Steady-State Temperature</div>
    <div class="env-body">
        <p>In steady-state heat conduction with no sources, the temperature \\(T(x, y)\\) satisfies \\(\\nabla^2 T = 0\\). Boundary conditions specify temperatures on the boundary of the region. Conformal maps let us solve heat problems on irregular domains by mapping to rectangles or half-planes where the solution is known.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-fluid-flow"></div>
`,
            visualizations: [
                {
                    id: 'viz-fluid-flow',
                    title: 'Conformal Map and Fluid Flow',
                    description: 'Streamlines of ideal fluid flow, transformed by a conformal map. In the z-plane, uniform flow has straight streamlines. The Joukowski map transforms them into flow around an airfoil. Select different flow configurations to see how conformal maps generate non-trivial flow patterns.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 360, scale: 55 });

                        var flowTypes = {
                            'Uniform': function(x, y) { return [x, y]; },
                            'Around cylinder': function(x, y) {
                                var r2 = x*x + y*y;
                                if (r2 < 0.01) return [0, 0];
                                return [x + x/r2, y - y/r2]; // Potential phi + i*psi for flow + dipole (unit circle)
                            },
                            'Source at origin': function(x, y) {
                                var r2 = x*x + y*y;
                                if (r2 < 0.01) return [0, 0];
                                return [0.5 * Math.log(r2), Math.atan2(y, x)];
                            },
                            'Vortex': function(x, y) {
                                var r2 = x*x + y*y;
                                if (r2 < 0.01) return [0, 0];
                                return [-Math.atan2(y, x), 0.5 * Math.log(r2)];
                            }
                        };
                        var flowNames = Object.keys(flowTypes);
                        var currentFlow = 'Around cylinder';

                        var sel = document.createElement('select');
                        sel.style.cssText = 'padding:3px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;';
                        flowNames.forEach(function(name) {
                            var opt = document.createElement('option');
                            opt.value = name;
                            opt.textContent = name;
                            if (name === currentFlow) opt.selected = true;
                            sel.appendChild(opt);
                        });
                        sel.addEventListener('change', function() { currentFlow = sel.value; draw(); });
                        controls.appendChild(sel);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;
                            var f = flowTypes[currentFlow];

                            viz.screenText('Flow: ' + currentFlow, viz.width / 2, 16, viz.colors.white, 12);

                            // Draw streamlines (level curves of psi)
                            var nLines = 20;
                            var xMin = -4, xMax = 4, yMin = -3, yMax = 3;
                            var res = 200;

                            // Use contour tracing: for each initial y, march along x
                            for (var k = -nLines; k <= nLines; k++) {
                                var psiTarget = k * 0.3;

                                // Trace streamline by following psi = constant
                                // Simple approach: for each psi value, draw the horizontal line at that y in the z-plane
                                ctx.strokeStyle = (k === 0) ? viz.colors.teal : viz.colors.blue + '66';
                                ctx.lineWidth = (k === 0) ? 2 : 1;
                                ctx.beginPath();
                                var started = false;

                                for (var i = 0; i <= res; i++) {
                                    var x = xMin + (xMax - xMin) * i / res;
                                    var y = psiTarget;
                                    var w = f(x, y);
                                    var px = w[0], py = w[1];
                                    if (!isFinite(px) || !isFinite(py) || Math.abs(px) > 8 || Math.abs(py) > 8) {
                                        started = false; continue;
                                    }
                                    // For "around cylinder", the streamline is the image
                                    // For uniform flow, psi = y, so streamlines are horizontal
                                    if (currentFlow === 'Uniform') {
                                        px = x; py = psiTarget;
                                    } else if (currentFlow === 'Source at origin') {
                                        // psi = theta, so constant psi = ray from origin
                                        var angle = psiTarget;
                                        var rr = 0.1 + (xMax - 0.1) * i / res;
                                        px = rr * Math.cos(angle);
                                        py = rr * Math.sin(angle);
                                    } else if (currentFlow === 'Vortex') {
                                        // psi = 0.5 log r, so constant psi = circle
                                        var r = Math.exp(2 * psiTarget);
                                        if (r > 8 || r < 0.05) { started = false; continue; }
                                        var angle = 2 * Math.PI * i / res;
                                        px = r * Math.cos(angle);
                                        py = r * Math.sin(angle);
                                    } else {
                                        // Around cylinder: the image streamlines
                                        // psi for flow around unit circle: psi = y(1 - 1/r^2)
                                        // We trace directly: for each x, find y such that psi(x,y) = target
                                        // psi = y - y/(x^2+y^2) = y(1 - 1/(x^2+y^2))
                                        // Solve numerically
                                        var yGuess = psiTarget;
                                        for (var iter = 0; iter < 15; iter++) {
                                            var r2 = x*x + yGuess*yGuess;
                                            if (r2 < 0.01) break;
                                            var psiVal = yGuess * (1 - 1/r2);
                                            var dpsi = 1 - 1/r2 + 2*yGuess*yGuess/(r2*r2);
                                            if (Math.abs(dpsi) < 1e-12) break;
                                            yGuess -= (psiVal - psiTarget) / dpsi;
                                        }
                                        var r2 = x*x + yGuess*yGuess;
                                        if (r2 < 1.01 && r2 > 0) { started = false; continue; } // inside cylinder
                                        px = x; py = yGuess;
                                    }

                                    var s = viz.toScreen(px, py);
                                    if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.stroke();
                            }

                            // Draw cylinder for flow around cylinder
                            if (currentFlow === 'Around cylinder') {
                                viz.drawCircle(0, 0, 1, viz.colors.bg, viz.colors.orange, 2);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The temperature in the upper half-plane satisfies \\(\\nabla^2 T = 0\\), with \\(T = 100\\) on the positive real axis and \\(T = 0\\) on the negative real axis. Find \\(T(x, y)\\) for \\(y > 0\\).',
                    hint: 'The harmonic function \\(\\arg(z)\\) equals \\(0\\) on the positive real axis and \\(\\pi\\) on the negative real axis. Scale appropriately.',
                    solution: 'The argument function \\(\\theta = \\arg(z) = \\arctan(y/x)\\) is harmonic, equals \\(0\\) on \\(\\{x > 0, y = 0\\}\\), and equals \\(\\pi\\) on \\(\\{x < 0, y = 0\\}\\). We want \\(T = 100\\) when \\(\\theta = 0\\) and \\(T = 0\\) when \\(\\theta = \\pi\\). So \\(T = 100(1 - \\theta/\\pi) = 100 - \\frac{100}{\\pi} \\arctan\\frac{y}{x}\\).'
                },
                {
                    question: 'Why does the Joukowski map produce realistic airfoil shapes? What physical requirement forces the trailing edge to be a cusp?',
                    hint: 'Think about the Kutta condition in aerodynamics: flow must leave the trailing edge smoothly.',
                    solution: 'The Joukowski map \\(w = z + 1/z\\) maps a circle passing through the critical point \\(z = 1\\) to a curve with a cusp at \\(w = 2\\). The cusp forms because \\(w\'(1) = 0\\), collapsing a smooth arc into a point with zero interior angle. In aerodynamics, the Kutta condition requires that flow leaves the trailing edge smoothly (finite velocity), which uniquely determines the circulation. The cusp geometry naturally enforces this condition.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Mobius Transformations
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge: Towards M\u00F6bius',
            content: `
<h2>Bridge: From Conformal Maps to M\u00F6bius Transformations</h2>

<p>This chapter has introduced conformality as the geometric face of holomorphic functions. We have seen that elementary functions (powers, exponentials, trigonometric, Joukowski) provide a toolkit of conformal maps between standard regions, and that composition lets us build maps for more complex geometries.</p>

<h3>What We Have Learned</h3>

<ul>
    <li>A holomorphic function is conformal wherever its derivative is nonzero.</li>
    <li>At a point \\(z_0\\), the derivative \\(f'(z_0) = re^{i\\theta}\\) encodes the local scaling (\\(r\\)) and rotation (\\(\\theta\\)).</li>
    <li>Standard maps: \\(z^n\\) (wedges to half-planes), \\(e^z\\) (strips to sectors), \\(\\sin z\\) (strips to slit planes), \\(z + 1/z\\) (circles to airfoils).</li>
    <li>Composition of conformal maps is conformal.</li>
    <li>The Schwarz-Christoffel formula gives conformal maps to polygonal regions.</li>
    <li>Conformal invariance of Laplace's equation underpins applications to fluid flow, electrostatics, and heat conduction.</li>
</ul>

<h3>What Comes Next</h3>

<p>The most important class of conformal maps, the <strong>M\u00F6bius transformations</strong>, deserve a chapter of their own. These are the maps of the form</p>
\\[w = \\frac{az + b}{cz + d}, \\quad ad - bc \\neq 0,\\]
<p>which map the extended complex plane \\(\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}\\) to itself. They form a group under composition, map circles and lines to circles and lines, and are determined by specifying the images of three points. The Cayley transform we encountered in this chapter is one example.</p>

<div class="env-block intuition">
    <div class="env-title">Why M\u00F6bius Transformations Are Special</div>
    <div class="env-body">
        <p>Among all conformal maps, M\u00F6bius transformations are the only ones that are <em>globally</em> conformal on the entire Riemann sphere. They are the "rigid motions" of the Riemann sphere, just as rotations and translations are the rigid motions of Euclidean space. Every other conformal map is "locally good" but eventually introduces distortion at large scales.</p>
    </div>
</div>

<p>After M\u00F6bius transformations (Chapter 14), we will prove the Riemann Mapping Theorem (Chapter 15): any simply connected region (other than \\(\\mathbb{C}\\) itself) can be conformally mapped to the unit disk. This is the pinnacle of the theory of conformal mapping, and it shows that the examples in this chapter are not just a grab bag of special cases but manifestations of a deep and general principle.</p>

<div class="env-block remark">
    <div class="env-title">Connections to Other Fields</div>
    <div class="env-body">
        <p>Conformal mappings connect complex analysis to:</p>
        <ul>
            <li><strong>Differential geometry:</strong> conformal maps preserve the metric up to a scalar factor, relating to the study of Riemannian surfaces.</li>
            <li><strong>String theory and CFT:</strong> conformal field theory studies quantum fields invariant under conformal transformations; the 2D case is especially rich because the conformal group is infinite-dimensional.</li>
            <li><strong>Numerical methods:</strong> conformal maps are used in mesh generation, since the right-angle preservation of the grid simplifies finite-element analysis.</li>
            <li><strong>Cartography:</strong> the Mercator, stereographic, and Lambert conformal projections are all conformal maps from the sphere to the plane.</li>
        </ul>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify that the Cayley transform \\(w = \\frac{z - i}{z + i}\\) maps the upper half-plane to the unit disk by checking: (a) \\(z = i \\mapsto w = 0\\), (b) \\(z = 0 \\mapsto w = -1\\), (c) \\(|w| = 1\\) when \\(z\\) is real.',
                    hint: 'For part (c), substitute \\(z = x\\) (real) and compute \\(|w|^2 = w \\bar{w}\\).',
                    solution: '(a) \\(w(i) = (i-i)/(i+i) = 0/2i = 0\\). (b) \\(w(0) = (0-i)/(0+i) = -i/i = -1\\). (c) For \\(z = x \\in \\mathbb{R}\\): \\(|w|^2 = \\frac{|x-i|^2}{|x+i|^2} = \\frac{x^2 + 1}{x^2 + 1} = 1\\). So real \\(z\\) maps to the unit circle, confirming the real axis is the boundary. For \\(z = x + iy\\) with \\(y > 0\\): \\(|w|^2 = \\frac{x^2 + (y-1)^2}{x^2 + (y+1)^2} < 1\\) since \\((y-1)^2 < (y+1)^2\\) for \\(y > 0\\).'
                },
                {
                    question: 'Show that a conformal map \\(f\\) preserves the Laplacian in the following sense: if \\(\\phi\\) is harmonic in \\(\\Omega\\) and \\(w = f(z)\\) maps \\(D\\) conformally onto \\(\\Omega\\), then \\(\\Phi(x,y) = \\phi(f(x+iy))\\) is harmonic in \\(D\\).',
                    hint: 'Use the fact that the composition of a harmonic function with a holomorphic function is harmonic. Alternatively, compute \\(\\nabla^2 \\Phi\\) using the chain rule and Cauchy-Riemann equations.',
                    solution: 'Since \\(\\phi\\) is harmonic, it is locally the real part of some holomorphic function \\(h(w)\\). Then \\(\\Phi = \\text{Re}(h \\circ f)\\). Since \\(f\\) is holomorphic, \\(h \\circ f\\) is holomorphic, so its real part \\(\\Phi\\) is harmonic. Alternatively: \\(\\nabla^2_{x,y} \\Phi = |f\'(z)|^2 \\nabla^2_{u,v} \\phi = |f\'(z)|^2 \\cdot 0 = 0\\), using the conformal change-of-variables formula for the Laplacian.'
                }
            ]
        }
    ]
});
