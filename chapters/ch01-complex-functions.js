window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Complex Functions & Mappings',
    subtitle: 'How complex functions transform the plane',
    sections: [
        // ================================================================
        // SECTION 1: Functions as Mappings
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Functions as Mappings',
            content: `
<h2>Functions as Mappings</h2>

<div class="env-block intuition">
    <div class="env-title">A New Way to Think About Functions</div>
    <div class="env-body">
        <p>In real analysis, a function \\(f: \\mathbb{R} \\to \\mathbb{R}\\) is a rule that takes a number and produces a number. You visualize it as a curve in the plane. A complex function \\(f: \\mathbb{C} \\to \\mathbb{C}\\) takes a <em>point in the plane</em> and produces another <em>point in the plane</em>. It is a transformation of the entire plane into itself.</p>
        <p>This geometric view is the key. Complex analysis is not just calculus with \\(i\\) sprinkled in. It is the study of how the plane folds, stretches, and rotates under smooth transformations.</p>
    </div>
</div>

<p>Write \\(z = x + iy\\) and \\(f(z) = w = u + iv\\). The function \\(f\\) takes the point \\((x, y)\\) in the <strong>z-plane</strong> to the point \\((u, v)\\) in the <strong>w-plane</strong>. We can think of \\(f\\) as a pair of real-valued functions:</p>

\\[
u = u(x,y), \\qquad v = v(x,y).
\\]

<p>For example, \\(f(z) = z^2\\) gives \\(u = x^2 - y^2\\) and \\(v = 2xy\\). Every complex function is secretly a vector field on \\(\\mathbb{R}^2\\), but with a rigid algebraic structure that makes it far more special.</p>

<h3>Why the Geometric View Matters</h3>

<p>The power of complex analysis comes from connecting algebra and geometry. Consider:</p>
<ul>
    <li><strong>Polynomials</strong> rotate and stretch the plane near each zero.</li>
    <li><strong>Inversion</strong> \\(w = 1/z\\) sends circles to circles and lines to lines.</li>
    <li><strong>The exponential</strong> \\(w = e^z\\) wraps horizontal strips into sectors.</li>
</ul>

<p>None of these facts are obvious algebraically. They become clear only when you watch the plane move.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>The geometric interpretation of complex functions was developed primarily by Bernhard Riemann in his 1851 doctoral thesis, where he introduced what we now call Riemann surfaces. Before Riemann, complex numbers were viewed with suspicion as mere algebraic fictions. Riemann showed that they encode a rich geometric reality.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-domain-coloring-intro"></div>
`,
            visualizations: [
                {
                    id: 'viz-domain-coloring-intro',
                    title: 'Domain Coloring: f(z) = z',
                    description: 'Domain coloring assigns each point z a color based on f(z). The hue encodes the argument (angle) of f(z): red is arg = 0, cycling through yellow, green, cyan, blue, magenta, and back to red. Brightness encodes the modulus |f(z)|: brighter means larger. For the identity f(z) = z, you see the raw phase portrait of the plane itself.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });

                        function draw() {
                            viz.drawDomainColoring(
                                function(re, im) { return [re, im]; },
                                [-viz.originX / viz.scale, (viz.width - viz.originX) / viz.scale],
                                [-(viz.height - viz.originY) / viz.scale, viz.originY / viz.scale]
                            );
                            viz.drawAxes();

                            // Color wheel legend
                            var ctx = viz.ctx;
                            var legendX = viz.width - 90;
                            var legendY = 20;
                            var R = 24;
                            var cx = legendX + R, cy = legendY + R;

                            for (var a = 0; a < 360; a++) {
                                var angle = (a * Math.PI / 180);
                                var hue = (angle / Math.PI + 1) / 2;
                                var rgb = VizEngine.hslToRgb(hue, 0.8, 0.6);
                                ctx.strokeStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(cx + (R - 4) * Math.cos(angle), cy - (R - 4) * Math.sin(angle));
                                ctx.lineTo(cx + R * Math.cos(angle), cy - R * Math.sin(angle));
                                ctx.stroke();
                            }
                            ctx.fillStyle = '#0c0c20';
                            ctx.beginPath(); ctx.arc(cx, cy, R - 5, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = '#8b949e'; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('arg', cx, cy);

                            viz.screenText('Hue = arg(f(z))', legendX + R, legendY + R * 2 + 8, '#8b949e', 10);
                            viz.screenText('Brightness = |f(z)|', legendX + R, legendY + R * 2 + 20, '#8b949e', 10);

                            // Labels
                            viz.screenText('f(z) = z  (identity)', 10, 10, '#c9d1d9', 13, 'left', 'top');
                            viz.screenText('Re(z)', viz.width - 10, viz.originY - 8, '#4a4a7a', 11, 'right');
                            viz.screenText('Im(z)', viz.originX + 6, 8, '#4a4a7a', 11, 'left', 'top');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The identity function \\(f(z) = z\\) has domain coloring where hue cycles once around the origin. How many full color cycles do you expect around the origin for \\(f(z) = z^2\\)?',
                    hint: 'Think about what squaring does to the argument of z.',
                    solution: 'For \\(f(z) = z^2\\), the argument of \\(f(z)\\) is \\(2\\arg(z)\\). As you travel once around the origin, \\(\\arg(z)\\) increases by \\(2\\pi\\), so \\(\\arg(z^2)\\) increases by \\(4\\pi\\). The hue completes two full cycles. In general, \\(f(z) = z^n\\) produces \\(n\\) color cycles around the origin.'
                },
                {
                    question: 'In the domain coloring of \\(f(z) = z\\), where are the brightest regions? Where are the darkest? What does this tell you about how \\(|f(z)|\\) varies with \\(|z|\\)?',
                    hint: 'Recall that brightness encodes the modulus |f(z)|.',
                    solution: 'The brightest regions are far from the origin (large \\(|z|\\) implies large \\(|f(z)| = |z|\\)), and the darkest region is near the origin (\\(|f(0)| = 0\\)). For the identity, \\(|f(z)| = |z|\\), so brightness grows linearly with distance from the origin.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Complex Functions
        // ================================================================
        {
            id: 'sec-functions',
            title: 'Complex Functions',
            content: `
<h2>Complex Functions</h2>

<p>A <strong>complex function</strong> is a rule \\(f: D \\subseteq \\mathbb{C} \\to \\mathbb{C}\\) assigning to each \\(z\\) in a domain \\(D\\) exactly one complex number \\(f(z)\\). The most natural examples are polynomials.</p>

<div class="env-block definition">
    <div class="env-title">Definition 1.1 (Polynomial)</div>
    <div class="env-body">
        <p>A complex polynomial of degree \\(n\\) is a function of the form</p>
        \\[p(z) = a_n z^n + a_{n-1} z^{n-1} + \\cdots + a_1 z + a_0, \\qquad a_n \\neq 0,\\]
        <p>where \\(a_0, \\ldots, a_n \\in \\mathbb{C}\\). The domain is all of \\(\\mathbb{C}\\).</p>
    </div>
</div>

<p>The Fundamental Theorem of Algebra states that every degree-\\(n\\) polynomial has exactly \\(n\\) roots (counted with multiplicity) in \\(\\mathbb{C}\\). This is the first hint of why \\(\\mathbb{C}\\) is algebraically complete in a way \\(\\mathbb{R}\\) is not.</p>

<h3>Rational Functions</h3>

<div class="env-block definition">
    <div class="env-title">Definition 1.2 (Rational Function)</div>
    <div class="env-body">
        <p>A rational function is a quotient \\(f(z) = p(z)/q(z)\\) where \\(p, q\\) are polynomials and \\(q \\not\\equiv 0\\). The domain is \\(\\mathbb{C} \\setminus \\{z : q(z) = 0\\}\\). Points where \\(q(z) = 0\\) are called <strong>poles</strong>.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The Map \\(f(z) = 1/z\\)</div>
    <div class="env-body">
        <p>The simplest rational function with a pole: \\(f(z) = 1/z\\) for \\(z \\neq 0\\). Writing \\(z = re^{i\\theta}\\),</p>
        \\[f(z) = \\frac{1}{r} e^{-i\\theta}.\\]
        <p>Inversion flips the modulus (\\(r \\mapsto 1/r\\)) and negates the argument (\\(\\theta \\mapsto -\\theta\\)). Points inside the unit circle map outside; points outside map inside. The unit circle maps to itself.</p>
    </div>
</div>

<h3>Limits and Continuity</h3>

<p>The definitions mirror real analysis, using the modulus \\(|z - z_0|\\) as distance.</p>

<div class="env-block definition">
    <div class="env-title">Definition 1.3 (Limit)</div>
    <div class="env-body">
        <p>We write \\(\\lim_{z \\to z_0} f(z) = L\\) if for every \\(\\varepsilon > 0\\) there exists \\(\\delta > 0\\) such that</p>
        \\[0 < |z - z_0| < \\delta \\implies |f(z) - L| < \\varepsilon.\\]
        <p>Unlike in real analysis, \\(z\\) may approach \\(z_0\\) from any direction in the plane. The limit must be the same from all directions.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.1</div>
    <div class="env-body">
        <p>\\(\\lim_{z \\to z_0} f(z) = L\\) if and only if \\(\\lim_{z \\to z_0} u(x,y) = \\mathrm{Re}(L)\\) and \\(\\lim_{z \\to z_0} v(x,y) = \\mathrm{Im}(L)\\), where \\(f = u + iv\\).</p>
    </div>
</div>

<p>This reduces complex limits to two real ones, but the constraint that the limit be path-independent is stronger than anything in one real variable. A function like \\(f(z) = \\bar{z}/z\\) has no limit at 0, because approaching along the real axis gives 1, while approaching along the imaginary axis gives \\(-1\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition 1.4 (Continuity)</div>
    <div class="env-body">
        <p>\\(f\\) is <strong>continuous</strong> at \\(z_0\\) if \\(\\lim_{z \\to z_0} f(z) = f(z_0)\\). Polynomials and rational functions are continuous wherever they are defined.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-polynomial-coloring"></div>
`,
            visualizations: [
                {
                    id: 'viz-polynomial-coloring',
                    title: 'Domain Coloring of z^n',
                    description: 'Use the slider to change n. Watch how the n-fold symmetry emerges: there are n zeros (all at the origin, with multiplicity n) and n color cycles around the origin. The zeros of a polynomial are clearly visible as points where all colors meet.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });
                        var nVal = 2;

                        VizEngine.createSlider(controls, 'n', 1, 6, nVal, 1, function(v) {
                            nVal = Math.round(v);
                            draw();
                        });

                        // Complex power: (re, im)^n
                        function cpow(re, im, n) {
                            var r = Math.sqrt(re * re + im * im);
                            var theta = Math.atan2(im, re);
                            var rn = Math.pow(r, n);
                            return [rn * Math.cos(n * theta), rn * Math.sin(n * theta)];
                        }

                        function draw() {
                            viz.drawDomainColoring(
                                function(re, im) { return cpow(re, im, nVal); },
                                [-viz.originX / viz.scale, (viz.width - viz.originX) / viz.scale],
                                [-(viz.height - viz.originY) / viz.scale, viz.originY / viz.scale]
                            );
                            viz.drawAxes();
                            viz.screenText('f(z) = z\u207F,  n = ' + nVal, 10, 10, '#c9d1d9', 13, 'left', 'top');
                            viz.screenText(nVal + '-fold symmetry, ' + nVal + ' color cycle' + (nVal > 1 ? 's' : '') + ' around origin', 10, 28, '#8b949e', 11, 'left', 'top');
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(\\lim_{z \\to 0} \\bar{z}/z\\) does not exist by computing the limit along (a) the real axis and (b) the imaginary axis.',
                    hint: 'Substitute z = x (real) and z = iy (purely imaginary) separately.',
                    solution: '(a) Along the real axis \\(z = x \\to 0\\): \\(\\bar{z}/z = x/x = 1\\). (b) Along the imaginary axis \\(z = iy \\to 0\\): \\(\\bar{z}/z = -iy/(iy) = -1\\). Since the two limits differ, the limit at 0 does not exist. This shows that path-independence is a genuine constraint in \\(\\mathbb{C}\\).'
                },
                {
                    question: 'For \\(f(z) = z^2 = (x+iy)^2\\), write out the real part \\(u(x,y)\\) and imaginary part \\(v(x,y)\\) explicitly. Verify that both are continuous everywhere.',
                    hint: 'Expand (x + iy)^2 by distributing.',
                    solution: '\\((x+iy)^2 = x^2 - y^2 + 2ixy\\). So \\(u(x,y) = x^2 - y^2\\) and \\(v(x,y) = 2xy\\). Both are polynomials in the real variables \\(x\\) and \\(y\\), hence continuous on all of \\(\\mathbb{R}^2\\). Therefore \\(z^2\\) is continuous on all of \\(\\mathbb{C}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Visualizing Mappings
        // ================================================================
        {
            id: 'sec-mappings',
            title: 'Visualizing Mappings',
            content: `
<h2>Visualizing Mappings</h2>

<p>Since a complex function sends the plane to the plane, we cannot graph \\(f\\) as a curve (that would require four dimensions). Instead, we use two complementary techniques.</p>

<h3>Grid Mapping</h3>

<p>Draw a regular grid of horizontal and vertical lines in the <strong>z-plane</strong>. Apply \\(f\\) to every point on these lines. The image curves in the <strong>w-plane</strong> reveal the geometry of \\(f\\). Lines that remain lines indicate linear behavior; lines that become circles indicate inversion-type behavior.</p>

<h3>Domain Coloring</h3>

<p>Assign each point \\(z\\) a color based on \\(f(z)\\): hue encodes \\(\\arg(f(z))\\) and brightness encodes \\(|f(z)|\\). The resulting image lives entirely in the z-plane, but the color at each point tells you where \\(f\\) sends it. Zeros appear where all hues meet at dark centers. Poles appear where all hues meet at bright centers.</p>

<div class="env-block definition">
    <div class="env-title">Key Features in Domain Coloring</div>
    <div class="env-body">
        <ul>
            <li><strong>Zero of order \\(n\\):</strong> The hue cycles \\(n\\) times counterclockwise around a dark point.</li>
            <li><strong>Pole of order \\(n\\):</strong> The hue cycles \\(n\\) times clockwise around a bright point.</li>
            <li><strong>Branch cut:</strong> A curve where the coloring has a sharp discontinuity (jump in hue).</li>
        </ul>
    </div>
</div>

<p>The two methods are complementary. Grid mapping shows <em>how shapes deform</em>. Domain coloring shows <em>where zeros and poles are</em>, and how the function behaves locally near each.</p>

<div class="viz-placeholder" data-viz="viz-grid-mapping"></div>
`,
            visualizations: [
                {
                    id: 'viz-grid-mapping',
                    title: 'Grid Mapping: z-plane to w-plane',
                    description: 'Left panel shows the input grid in the z-plane. Right panel shows the image of that grid under f(z). Select different functions from the dropdown. Press Animate to watch the grid deform continuously from f(z) = z to the chosen function.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 40, originX: 175, originY: 180 });
                        var panelW = viz.width / 2;
                        var currentFunc = 'z2';
                        var animT = 0;
                        var animating = false;

                        // Dropdown
                        var sel = document.createElement('select');
                        sel.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
                        [['z2', 'z\u00B2'], ['z3', 'z\u00B3'], ['inv', '1/z'], ['exp', 'e\u1D63']].forEach(function(opt) {
                            var o = document.createElement('option');
                            o.value = opt[0]; o.textContent = opt[1];
                            sel.appendChild(o);
                        });
                        sel.addEventListener('change', function() {
                            currentFunc = sel.value;
                            animating = false;
                            animT = 1;
                            draw(1);
                        });
                        controls.appendChild(sel);

                        var btnAnimate = VizEngine.createButton(controls, 'Animate', function() {
                            animating = true;
                            animT = 0;
                        });

                        function applyFunc(re, im, t) {
                            var r2 = re * re + im * im;
                            var r = Math.sqrt(r2);
                            var theta = Math.atan2(im, re);
                            var wu, wv;
                            if (currentFunc === 'z2') {
                                wu = re * re - im * im; wv = 2 * re * im;
                            } else if (currentFunc === 'z3') {
                                wu = re * re * re - 3 * re * im * im;
                                wv = 3 * re * re * im - im * im * im;
                            } else if (currentFunc === 'inv') {
                                if (r2 < 1e-8) return null;
                                wu = re / r2; wv = -im / r2;
                            } else if (currentFunc === 'exp') {
                                wu = Math.exp(re) * Math.cos(im);
                                wv = Math.exp(re) * Math.sin(im);
                            } else {
                                wu = re; wv = im;
                            }
                            return [re + (wu - re) * t, im + (wv - im) * t];
                        }

                        function drawPanel(ctx, ox, oy, scale, lines, color, alpha) {
                            ctx.strokeStyle = color;
                            ctx.globalAlpha = alpha;
                            ctx.lineWidth = 1;
                            lines.forEach(function(pts) {
                                ctx.beginPath();
                                var started = false;
                                pts.forEach(function(p) {
                                    if (!p) { started = false; return; }
                                    var sx = ox + p[0] * scale;
                                    var sy = oy - p[1] * scale;
                                    if (Math.abs(sx - ox) > panelW * 1.5 || Math.abs(sy - oy) > viz.height * 1.5) { started = false; return; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; } else { ctx.lineTo(sx, sy); }
                                });
                                ctx.stroke();
                            });
                            ctx.globalAlpha = 1;
                        }

                        function buildGrid(t) {
                            var range = 3, step = 0.5, pts = 60;
                            var hLines = [], vLines = [];
                            for (var y = -range; y <= range + 0.01; y += step) {
                                var line = [];
                                for (var k = 0; k <= pts; k++) {
                                    var x = -range + 2 * range * k / pts;
                                    var w = applyFunc(x, y, t);
                                    line.push(w);
                                }
                                hLines.push(line);
                            }
                            for (var x = -range; x <= range + 0.01; x += step) {
                                var vline = [];
                                for (var k = 0; k <= pts; k++) {
                                    var y2 = -range + 2 * range * k / pts;
                                    var w = applyFunc(x, y2, t);
                                    vline.push(w);
                                }
                                vLines.push(vline);
                            }
                            return { h: hLines, v: vLines };
                        }

                        function draw(t) {
                            var ctx = viz.ctx;
                            viz.clear();

                            // Panel divider
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(panelW, 0); ctx.lineTo(panelW, viz.height); ctx.stroke();

                            // Panel labels
                            viz.screenText('z-plane', panelW / 2, 16, '#8b949e', 12);
                            var labels = { z2: 'w = z\u00B2', z3: 'w = z\u00B3', inv: 'w = 1/z', exp: 'w = e\u1D63' };
                            viz.screenText(labels[currentFunc] || 'w-plane', panelW + panelW / 2, 16, '#8b949e', 12);

                            // Axes left
                            ctx.strokeStyle = '#4a4a7a'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(panelW - 2, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();

                            // Axes right
                            var rox = panelW + viz.originX;
                            ctx.beginPath(); ctx.moveTo(panelW + 2, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rox, 0); ctx.lineTo(rox, viz.height); ctx.stroke();

                            // Input grid (left panel, always t=0)
                            var inputGrid = buildGrid(0);
                            drawPanel(ctx, viz.originX, viz.originY, viz.scale, inputGrid.h, '#3fb9a0', 0.5);
                            drawPanel(ctx, viz.originX, viz.originY, viz.scale, inputGrid.v, '#58a6ff', 0.5);

                            // Output grid (right panel, t = current)
                            var outputGrid = buildGrid(t);
                            drawPanel(ctx, rox, viz.originY, viz.scale, outputGrid.h, '#3fb9a0', 0.8);
                            drawPanel(ctx, rox, viz.originY, viz.scale, outputGrid.v, '#58a6ff', 0.8);

                            // Animation progress
                            if (animating && t < 1) {
                                var pct = Math.round(t * 100);
                                viz.screenText('Morphing: ' + pct + '%', panelW + panelW / 2, viz.height - 12, '#f0883e', 11);
                            }
                        }

                        viz.animate(function(ts) {
                            if (animating) {
                                animT = Math.min(1, animT + 0.012);
                                if (animT >= 1) animating = false;
                                draw(animT);
                            } else {
                                draw(animT);
                            }
                        });

                        animT = 1;
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In the grid mapping for \\(f(z) = 1/z\\), the image of a horizontal line \\(\\mathrm{Im}(z) = c\\) (for \\(c \\neq 0\\)) is a circle. Find the center and radius of this circle.',
                    hint: 'Write z = x + ic and compute w = 1/z. Express |w - center|^2 = radius^2.',
                    solution: 'With \\(z = x + ic\\), we get \\(w = (x - ic)/(x^2 + c^2)\\). So \\(u = x/(x^2+c^2)\\) and \\(v = -c/(x^2+c^2)\\). One can verify that \\(u^2 + (v + 1/(2c))^2 = (1/(2c))^2\\). This is a circle with center \\((0, -1/(2c))\\) and radius \\(|1/(2c)|\\). The horizontal line maps to a circle passing through the origin.'
                },
                {
                    question: 'For \\(f(z) = e^z\\), what is the image of the horizontal line \\(\\mathrm{Im}(z) = \\pi/4\\)?',
                    hint: 'Write z = x + i pi/4 and compute e^z.',
                    solution: '\\(e^{x + i\\pi/4} = e^x (\\cos(\\pi/4) + i\\sin(\\pi/4)) = e^x(\\frac{1}{\\sqrt{2}} + \\frac{i}{\\sqrt{2}})\\). As \\(x\\) varies over \\(\\mathbb{R}\\), \\(e^x > 0\\) varies over \\((0, \\infty)\\). So the image is the ray from the origin at angle \\(\\pi/4\\) (the line \\(v = u\\) for \\(u > 0\\)).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Linear Maps
        // ================================================================
        {
            id: 'sec-linear',
            title: 'Linear Maps',
            content: `
<h2>Linear Maps</h2>

<p>The simplest complex functions are the affine (linear) maps \\(f(z) = az + b\\) for constants \\(a, b \\in \\mathbb{C}\\). Despite their simplicity, they encode rotation, scaling, and translation simultaneously.</p>

<h3>Decomposition</h3>

<p>Write \\(a = |a|e^{i\\alpha}\\). Then</p>
\\[
f(z) = az + b = |a| e^{i\\alpha} z + b.
\\]

<p>This acts in three stages:</p>
<ol>
    <li><strong>Rotation</strong> by angle \\(\\alpha = \\arg(a)\\): multiply by \\(e^{i\\alpha}\\).</li>
    <li><strong>Scaling</strong> by factor \\(|a|\\): multiply by \\(|a|\\).</li>
    <li><strong>Translation</strong> by \\(b\\): add \\(b\\).</li>
</ol>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.2 (Linear Maps Are Similarities)</div>
    <div class="env-body">
        <p>The map \\(f(z) = az + b\\) with \\(a \\neq 0\\) is a <strong>direct similarity</strong> of the plane: it preserves angles and the shapes of figures, scaling all distances by the factor \\(|a|\\). In particular:</p>
        <ul>
            <li>Circles map to circles.</li>
            <li>Lines map to lines.</li>
            <li>Angles between curves are preserved.</li>
        </ul>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Rotation by 45 degrees and scaling by 2</div>
    <div class="env-body">
        <p>Take \\(a = 2e^{i\\pi/4} = \\sqrt{2}(1 + i)\\) and \\(b = 0\\). Then \\(f(z) = \\sqrt{2}(1+i)z\\). A unit square with vertices \\(0, 1, 1+i, i\\) maps to the square with vertices \\(0, \\sqrt{2}(1+i), 2i\\cdot\\sqrt{2}, \\sqrt{2}(-1+i)\\), scaled by 2 and rotated 45 degrees.</p>
    </div>
</div>

<h3>Fixed Points</h3>

<p>A fixed point of \\(f(z) = az + b\\) satisfies \\(az + b = z\\), giving \\(z = b/(1-a)\\) when \\(a \\neq 1\\). When \\(a = 1\\) (pure translation), there are no fixed points unless \\(b = 0\\).</p>

<div class="viz-placeholder" data-viz="viz-linear-map"></div>
`,
            visualizations: [
                {
                    id: 'viz-linear-map',
                    title: 'Linear Map: w = az + b',
                    description: 'Adjust the modulus |a|, argument arg(a), and translation b = Re(b) + i Im(b). The grid in the z-plane transforms in real time. Notice that the grid always remains a grid of straight lines (linear maps send lines to lines).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 40, originX: 175, originY: 180 });
                        var panelW = viz.width / 2;
                        var modA = 1.0, argA = 0.0, reB = 0.0, imB = 0.0;

                        VizEngine.createSlider(controls, '|a|', 0.2, 3.0, modA, 0.05, function(v) { modA = v; draw(); });
                        VizEngine.createSlider(controls, 'arg(a) \u00D7 \u03C0', -1, 1, argA, 0.05, function(v) { argA = v; draw(); });
                        VizEngine.createSlider(controls, 'Re(b)', -2, 2, reB, 0.1, function(v) { reB = v; draw(); });
                        VizEngine.createSlider(controls, 'Im(b)', -2, 2, imB, 0.1, function(v) { imB = v; draw(); });

                        function applyLinear(re, im) {
                            var alpha = argA * Math.PI;
                            var aRe = modA * Math.cos(alpha);
                            var aIm = modA * Math.sin(alpha);
                            return [aRe * re - aIm * im + reB, aRe * im + aIm * re + imB];
                        }

                        function drawGrid(ox, oy, scale, transform, hcol, vcol) {
                            var ctx = viz.ctx;
                            var range = 3, step = 0.5, pts = 2;
                            ctx.lineWidth = 1;

                            for (var y = -range; y <= range + 0.01; y += step) {
                                ctx.strokeStyle = hcol; ctx.globalAlpha = 0.6;
                                ctx.beginPath();
                                var w0 = transform(-range, y);
                                var sx0 = ox + w0[0] * scale, sy0 = oy - w0[1] * scale;
                                ctx.moveTo(sx0, sy0);
                                var w1 = transform(range, y);
                                ctx.lineTo(ox + w1[0] * scale, oy - w1[1] * scale);
                                ctx.stroke();
                            }
                            for (var x = -range; x <= range + 0.01; x += step) {
                                ctx.strokeStyle = vcol; ctx.globalAlpha = 0.6;
                                ctx.beginPath();
                                var w0 = transform(x, -range);
                                ctx.moveTo(ox + w0[0] * scale, oy - w0[1] * scale);
                                var w1 = transform(x, range);
                                ctx.lineTo(ox + w1[0] * scale, oy - w1[1] * scale);
                                ctx.stroke();
                            }
                            ctx.globalAlpha = 1;
                        }

                        function draw() {
                            var ctx = viz.ctx;
                            viz.clear();

                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(panelW, 0); ctx.lineTo(panelW, viz.height); ctx.stroke();

                            viz.screenText('z-plane', panelW / 2, 16, '#8b949e', 12);

                            var alpha = argA * Math.PI;
                            var aDisp = modA.toFixed(2) + 'e^{i\u00B7' + (argA >= 0 ? '' : '') + (argA * 180).toFixed(0) + '\u00B0}';
                            viz.screenText('w-plane:  w = ' + modA.toFixed(2) + '\u2220' + (argA * 180).toFixed(0) + '\u00B0 \u00B7 z + (' + reB.toFixed(1) + '+' + imB.toFixed(1) + 'i)', panelW + panelW / 2, 16, '#8b949e', 11);

                            // Axes
                            ctx.strokeStyle = '#4a4a7a'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(panelW - 2, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();
                            var rox = panelW + viz.originX;
                            ctx.beginPath(); ctx.moveTo(panelW + 2, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rox, 0); ctx.lineTo(rox, viz.height); ctx.stroke();

                            // Input grid (identity)
                            drawGrid(viz.originX, viz.originY, viz.scale, function(re, im) { return [re, im]; }, '#3fb9a0', '#58a6ff');
                            // Output grid (linear map)
                            drawGrid(rox, viz.originY, viz.scale, applyLinear, '#3fb9a0', '#58a6ff');

                            // Fixed point
                            if (Math.abs(modA - 1) > 0.01 || Math.abs(argA) > 0.01) {
                                var denom = 1 - modA * Math.cos(argA * Math.PI);
                                var denomI = -modA * Math.sin(argA * Math.PI);
                                var d2 = denom * denom + denomI * denomI;
                                if (d2 > 0.001) {
                                    var fpRe = (reB * denom + imB * denomI) / d2;
                                    var fpIm = (imB * denom - reB * denomI) / d2;
                                    var fpsx = rox + fpRe * viz.scale, fpsy = viz.originY - fpIm * viz.scale;
                                    if (fpsx > panelW + 5 && fpsx < viz.width - 5 && fpsy > 5 && fpsy < viz.height - 5) {
                                        ctx.fillStyle = '#f85149';
                                        ctx.beginPath(); ctx.arc(fpsx, fpsy, 5, 0, Math.PI * 2); ctx.fill();
                                        ctx.fillStyle = '#f85149'; ctx.font = '11px -apple-system,sans-serif';
                                        ctx.textAlign = 'left'; ctx.fillText('fixed pt', fpsx + 7, fpsy);
                                    }
                                }
                            }
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the fixed point of \\(f(z) = iz + (1-i)\\). Verify your answer by substituting back.',
                    hint: 'Solve iz + (1-i) = z for z.',
                    solution: 'Setting \\(iz + (1-i) = z\\) gives \\((i-1)z = -(1-i) = (i-1)\\), so \\(z = 1\\). Verification: \\(f(1) = i + 1 - i = 1\\). The fixed point is \\(z = 1\\).'
                },
                {
                    question: 'Describe the geometric effect of \\(f(z) = -z\\). What is its fixed point? What is its effect on a triangle with vertices \\(1, i, 1+i\\)?',
                    hint: 'Write -z = 1 * e^{i pi} * z + 0. What is |a| and arg(a)?',
                    solution: '\\(f(z) = -z\\) has \\(|a| = 1\\) and \\(\\arg(a) = \\pi\\), so it is rotation by \\(180^\\circ\\) with no scaling or translation. The fixed point is \\(z = 0\\). The triangle with vertices \\(1, i, 1+i\\) maps to the triangle with vertices \\(-1, -i, -1-i\\) (180-degree rotation about the origin).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: The Map w = z^2
        // ================================================================
        {
            id: 'sec-quadratic',
            title: 'The Map w = z\u00B2',
            content: `
<h2>The Map w = z<sup>2</sup></h2>

<p>The squaring map \\(f(z) = z^2\\) is the first genuinely nonlinear complex function. In polar form, it has a clear geometric description.</p>

<h3>Polar Form</h3>

<p>Write \\(z = re^{i\\theta}\\). Then</p>
\\[
f(z) = z^2 = r^2 e^{i2\\theta}.
\\]

<p>The squaring map:</p>
<ul>
    <li><strong>Squares the modulus:</strong> \\(|f(z)| = |z|^2\\). Points on the unit circle stay on it; points inside move closer to 0; points outside move farther.</li>
    <li><strong>Doubles the argument:</strong> \\(\\arg(f(z)) = 2\\arg(z)\\). The upper half-plane (\\(0 < \\theta < \\pi\\)) maps to the full plane minus the negative real axis (\\(0 < 2\\theta < 2\\pi\\)).</li>
</ul>

<h3>Images of Standard Curves</h3>

<div class="env-block example">
    <div class="env-title">Example: Circle \\(|z| = r_0\\)</div>
    <div class="env-body">
        <p>The circle \\(|z| = r_0\\) maps to the circle \\(|w| = r_0^2\\). Circles centered at the origin map to circles centered at the origin.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Ray \\(\\arg(z) = \\theta_0\\)</div>
    <div class="env-body">
        <p>The ray at angle \\(\\theta_0\\) maps to the ray at angle \\(2\\theta_0\\). In particular, the positive real axis (\\(\\theta_0 = 0\\)) maps to itself, and the positive imaginary axis (\\(\\theta_0 = \\pi/2\\)) maps to the negative real axis (\\(2\\theta_0 = \\pi\\)).</p>
    </div>
</div>

<h3>Two-to-One: Branch Cuts Preview</h3>

<p>The squaring map is <strong>two-to-one</strong>: both \\(z\\) and \\(-z\\) map to \\(z^2\\). This means \\(f\\) does not have a single-valued inverse on all of \\(\\mathbb{C}\\). To define a "square root function," we must restrict the domain and introduce a <strong>branch cut</strong>: a curve where the inverse is declared to be discontinuous.</p>

<p>The standard choice is to cut along the negative real axis. Then for \\(w = r e^{i\\phi}\\) with \\(-\\pi < \\phi \leq \\pi\\) (the "principal value"), the principal square root is \\(\\sqrt{w} = \\sqrt{r} e^{i\\phi/2}\\). The branch cut at \\(\\phi = \\pm\\pi\\) is visible in domain coloring as a sharp color discontinuity.</p>

<div class="viz-placeholder" data-viz="viz-z-squared"></div>
<div class="viz-placeholder" data-viz="viz-inversion"></div>
`,
            visualizations: [
                {
                    id: 'viz-z-squared',
                    title: 'Domain Coloring: z vs z\u00B2',
                    description: 'Left: domain coloring of f(z) = z (identity). Right: domain coloring of f(z) = z^2. On the right, every color appears twice (from z and from -z), reflecting the 2-to-1 nature of squaring. The branch cut of the inverse sqrt(z) would appear along the negative real axis.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 55, originX: 175, originY: 180 });
                        var panelW = viz.width / 2;

                        function draw() {
                            var ctx = viz.ctx;

                            // Left panel: z
                            viz.drawDomainColoring(
                                function(re, im) { return [re, im]; },
                                [-viz.originX / viz.scale, (panelW - viz.originX) / viz.scale],
                                [-(viz.height - viz.originY) / viz.scale, viz.originY / viz.scale]
                            );

                            // Right panel: z^2
                            var pw = viz.canvas.width, ph = viz.canvas.height;
                            var dpr = window.devicePixelRatio || 1;
                            var half = Math.floor(pw / 2);
                            var imgData = ctx.createImageData(pw - half, ph);
                            var data = imgData.data;
                            var rox = panelW + viz.originX;
                            var rpanelW = viz.width - panelW;

                            ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
                            for (var py = 0; py < ph; py++) {
                                for (var px = half; px < pw; px++) {
                                    var re = (px / dpr - rox) / viz.scale;
                                    var im = (viz.originY - py / dpr) / viz.scale;
                                    var u = re * re - im * im, v = 2 * re * im;
                                    var arg = Math.atan2(v, u);
                                    var mag = Math.sqrt(u * u + v * v);
                                    var hue = (arg / Math.PI + 1) / 2;
                                    var light = 1 - 1 / (1 + mag * 0.3);
                                    var rgb = VizEngine.hslToRgb(hue, 0.8, light);
                                    var idx = (py * (pw - half) + (px - half)) * 4;
                                    data[idx] = rgb[0]; data[idx+1] = rgb[1]; data[idx+2] = rgb[2]; data[idx+3] = 255;
                                }
                            }
                            ctx.putImageData(imgData, half, 0);
                            ctx.restore();

                            // Divider and axes
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(panelW, 0); ctx.lineTo(panelW, viz.height); ctx.stroke();

                            ctx.strokeStyle = '#ffffff33'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(panelW - 2, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(panelW + 2, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rox, 0); ctx.lineTo(rox, viz.height); ctx.stroke();

                            // Branch cut highlight
                            ctx.strokeStyle = '#f8514988'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
                            ctx.beginPath(); ctx.moveTo(rox, viz.originY); ctx.lineTo(panelW + 2, viz.originY); ctx.stroke();
                            ctx.setLineDash([]);

                            viz.screenText('f(z) = z', panelW / 2, 16, '#c9d1d9', 12);
                            viz.screenText('f(z) = z\u00B2  (2-to-1)', panelW + panelW / 2, 16, '#c9d1d9', 12);
                            viz.screenText('branch cut', panelW + 30, viz.originY - 10, '#f85149', 10, 'left');
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-inversion',
                    title: 'Inversion: w = 1/z',
                    description: 'Domain coloring (left) and grid mapping (right) for f(z) = 1/z. The pole at z = 0 is visible in the domain coloring as a bright point where all colors meet. In the grid, circles through the origin map to lines, and lines not through the origin map to circles.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 50, originX: 175, originY: 180 });
                        var panelW = viz.width / 2;

                        function draw() {
                            var ctx = viz.ctx;

                            // Left: domain coloring of 1/z
                            viz.drawDomainColoring(
                                function(re, im) {
                                    var r2 = re * re + im * im;
                                    if (r2 < 1e-10) return [0, 0];
                                    return [re / r2, -im / r2];
                                },
                                [-viz.originX / viz.scale, (panelW - viz.originX) / viz.scale],
                                [-(viz.height - viz.originY) / viz.scale, viz.originY / viz.scale]
                            );

                            // Divider
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(panelW, 0); ctx.lineTo(panelW, viz.height); ctx.stroke();

                            // Right: grid mapping
                            var rox = panelW + viz.originX;
                            ctx.fillStyle = '#0c0c20';
                            ctx.fillRect(panelW + 1, 0, panelW - 1, viz.height);

                            ctx.strokeStyle = '#ffffff22'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(panelW + 2, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rox, 0); ctx.lineTo(rox, viz.height); ctx.stroke();

                            var range = 3, step = 0.4, npts = 120;
                            function drawMappedLine(pts, color) {
                                ctx.strokeStyle = color; ctx.globalAlpha = 0.7; ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                pts.forEach(function(p) {
                                    if (!p) { started = false; return; }
                                    var sx = rox + p[0] * viz.scale, sy = viz.originY - p[1] * viz.scale;
                                    if (sx < panelW + 1 || sx > viz.width - 1 || sy < 1 || sy > viz.height - 1) { started = false; return; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; } else { ctx.lineTo(sx, sy); }
                                });
                                ctx.stroke(); ctx.globalAlpha = 1;
                            }

                            for (var yv = -range; yv <= range + 0.01; yv += step) {
                                var line = [];
                                for (var k = 0; k <= npts; k++) {
                                    var x = -range + 2 * range * k / npts;
                                    var r2 = x * x + yv * yv;
                                    if (r2 < 0.04) { line.push(null); continue; }
                                    line.push([x / r2, -yv / r2]);
                                }
                                drawMappedLine(line, '#3fb9a0');
                            }
                            for (var xv = -range; xv <= range + 0.01; xv += step) {
                                var vline = [];
                                for (var k = 0; k <= npts; k++) {
                                    var y = -range + 2 * range * k / npts;
                                    var r2 = xv * xv + y * y;
                                    if (r2 < 0.04) { vline.push(null); continue; }
                                    vline.push([xv / r2, -y / r2]);
                                }
                                drawMappedLine(vline, '#58a6ff');
                            }

                            // Axis lines left
                            ctx.strokeStyle = '#ffffff33'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(panelW - 2, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();

                            viz.screenText('f(z) = 1/z  (domain coloring)', panelW / 2, 16, '#c9d1d9', 12);
                            viz.screenText('Grid mapping under 1/z', panelW + panelW / 2, 16, '#c9d1d9', 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Under \\(f(z) = z^2\\), what is the image of the vertical line \\(\\mathrm{Re}(z) = 1\\)? Parametrize the line as \\(z = 1 + it\\) and compute \\(w = z^2\\).',
                    hint: 'Write w = (1+it)^2 = u + iv and eliminate t.',
                    solution: '\\((1+it)^2 = 1 - t^2 + 2it\\). So \\(u = 1 - t^2\\) and \\(v = 2t\\), giving \\(t = v/2\\) and \\(u = 1 - v^2/4\\). The image is the parabola \\(u = 1 - v^2/4\\), opening to the left with vertex at \\(w = 1\\).'
                },
                {
                    question: 'Show that \\(f(z) = 1/z\\) maps the circle \\(|z - 1| = 1\\) to the vertical line \\(\\mathrm{Re}(w) = 1/2\\).',
                    hint: 'Points on |z-1|=1 satisfy (z-1)(conj(z)-1) = 1. Substitute z = 1/w.',
                    solution: 'If \\(w = 1/z\\) then \\(z = 1/w\\). Substituting into \\(|z-1|^2 = 1\\): \\(|1/w - 1|^2 = 1\\), so \\(|1 - w|^2 = |w|^2\\). Writing \\(w = u + iv\\): \\((1-u)^2 + v^2 = u^2 + v^2\\), which simplifies to \\(1 - 2u = 0\\), i.e., \\(u = 1/2\\). The image is indeed the line \\(\\mathrm{Re}(w) = 1/2\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Differentiability (Bridge to Ch 2)
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Differentiability',
            content: `
<h2>Differentiability</h2>

<p>We have seen that complex functions are geometrically rich. Now we ask: what does it mean for a complex function to be differentiable? The answer is where complex analysis truly separates from real analysis.</p>

<h3>The Complex Derivative</h3>

<div class="env-block definition">
    <div class="env-title">Definition 1.5 (Complex Derivative)</div>
    <div class="env-body">
        <p>The function \\(f: D \\to \\mathbb{C}\\) is <strong>complex differentiable</strong> (or <strong>holomorphic</strong>) at \\(z_0 \\in D\\) if the limit</p>
        \\[f'(z_0) = \\lim_{\\Delta z \\to 0} \\frac{f(z_0 + \\Delta z) - f(z_0)}{\\Delta z}\\]
        <p>exists and is the same regardless of the direction in which \\(\\Delta z \\to 0\\) in \\(\\mathbb{C}\\).</p>
    </div>
</div>

<p>This looks identical to the real definition, but the requirement that the limit be path-independent in \\(\\mathbb{C}\\) (not just left and right as in \\(\\mathbb{R}\\)) makes holomorphicity an extraordinary condition.</p>

<h3>A Striking Contrast</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = \\bar{z}\\) is Nowhere Differentiable</div>
    <div class="env-body">
        <p>Consider \\(f(z) = \\bar{z} = x - iy\\). Compute the difference quotient along the real axis (\\(\\Delta z = h \\in \\mathbb{R}\\)):</p>
        \\[\\frac{\\overline{(z+h)} - \\bar{z}}{h} = \\frac{\\bar{z} + h - \\bar{z}}{h} = 1.\\]
        <p>Along the imaginary axis (\\(\\Delta z = ih\\)):</p>
        \\[\\frac{\\overline{(z+ih)} - \\bar{z}}{ih} = \\frac{\\bar{z} - ih - \\bar{z}}{ih} = \\frac{-ih}{ih} = -1.\\]
        <p>The limits differ, so \\(f(z) = \\bar{z}\\) has no complex derivative anywhere, even though it is infinitely differentiable as a real function from \\(\\mathbb{R}^2\\) to \\(\\mathbb{R}^2\\).</p>
    </div>
</div>

<h3>The Cauchy-Riemann Equations</h3>

<p>For \\(f = u + iv\\) to be differentiable at \\(z_0\\), the real and imaginary parts must satisfy a rigid pair of PDE constraints.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.3 (Cauchy-Riemann Equations)</div>
    <div class="env-body">
        <p>If \\(f = u + iv\\) is complex differentiable at \\(z_0\\), then at \\(z_0\\):</p>
        \\[\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\qquad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}.\\]
        <p>These are the <strong>Cauchy-Riemann equations</strong>. Conversely, if \\(u, v\\) have continuous partials satisfying C-R at \\(z_0\\), then \\(f\\) is differentiable there.</p>
    </div>
</div>

<p>The Cauchy-Riemann equations say that the Jacobian of \\((u,v)\\) as a map \\(\\mathbb{R}^2 \\to \\mathbb{R}^2\\) must have a very special form: it must be a scalar multiple of a rotation matrix. Geometrically, this means that holomorphic functions are exactly the conformal (angle-preserving) maps, at points where \\(f' \\neq 0\\).</p>

<div class="env-block remark">
    <div class="env-title">Preview: Chapter 2</div>
    <div class="env-body">
        <p>Chapter 2 develops the Cauchy-Riemann equations in full, characterizes holomorphic functions, and shows that the real and imaginary parts of any holomorphic function must each be harmonic (satisfy \\(\\nabla^2 u = 0\\)). This connects complex analysis to potential theory, fluid dynamics, and electrostatics.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-exp-map"></div>
`,
            visualizations: [
                {
                    id: 'viz-exp-map',
                    title: 'The Exponential Map: w = e^z',
                    description: 'The exponential is the canonical holomorphic function. Left: grid in z-plane with horizontal strip -pi < Im(z) <= pi highlighted. Right: its image under e^z. Press Animate to watch the strip wrap into the punctured plane. Horizontal lines become rays; vertical lines become circles.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 42, originX: 175, originY: 190 });
                        var panelW = viz.width / 2;
                        var animT = 1;
                        var animating = false;

                        VizEngine.createButton(controls, 'Animate', function() {
                            animating = true; animT = 0;
                        });

                        function expMap(re, im, t) {
                            var eu = Math.exp(re) * Math.cos(im);
                            var ev = Math.exp(re) * Math.sin(im);
                            return [re + (eu - re) * t, im + (ev - im) * t];
                        }

                        function draw(t) {
                            var ctx = viz.ctx;
                            viz.clear();

                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(panelW, 0); ctx.lineTo(panelW, viz.height); ctx.stroke();

                            // Axes left
                            ctx.strokeStyle = '#4a4a7a'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(panelW - 2, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, viz.height); ctx.stroke();

                            // Axes right
                            var rox = panelW + viz.originX;
                            ctx.beginPath(); ctx.moveTo(panelW + 2, viz.originY); ctx.lineTo(viz.width, viz.originY); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rox, 0); ctx.lineTo(rox, viz.height); ctx.stroke();

                            // Highlight the fundamental strip on left
                            var stripY1 = viz.originY - Math.PI * viz.scale;
                            var stripY2 = viz.originY + Math.PI * viz.scale;
                            ctx.fillStyle = '#58a6ff11';
                            ctx.fillRect(0, stripY1, panelW - 2, stripY2 - stripY1);

                            var range = 4, step = 0.5, npts = 80;

                            function drawMappedLine(pts, color, lw) {
                                ctx.strokeStyle = color; ctx.lineWidth = lw || 1; ctx.globalAlpha = 0.75;
                                ctx.beginPath(); var started = false;
                                pts.forEach(function(p) {
                                    if (!p) { started = false; return; }
                                    var sx = rox + p[0] * viz.scale, sy = viz.originY - p[1] * viz.scale;
                                    if (sx < panelW + 2 || sx > viz.width - 2 || sy < 2 || sy > viz.height - 2) { started = false; return; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; } else { ctx.lineTo(sx, sy); }
                                });
                                ctx.stroke(); ctx.globalAlpha = 1;
                            }

                            function drawInputLine(pts, color, lw) {
                                ctx.strokeStyle = color; ctx.lineWidth = lw || 1; ctx.globalAlpha = 0.6;
                                ctx.beginPath(); var started = false;
                                pts.forEach(function(p) {
                                    if (!p) { started = false; return; }
                                    var sx = viz.originX + p[0] * viz.scale, sy = viz.originY - p[1] * viz.scale;
                                    if (sx < 2 || sx > panelW - 4 || sy < 2 || sy > viz.height - 2) { started = false; return; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; } else { ctx.lineTo(sx, sy); }
                                });
                                ctx.stroke(); ctx.globalAlpha = 1;
                            }

                            // Horizontal lines (constant Im): map to rays
                            for (var y = -range; y <= range + 0.01; y += step) {
                                var hline = [], iline = [];
                                for (var k = 0; k <= npts; k++) {
                                    var x = -range + 2 * range * k / npts;
                                    iline.push([x, y]);
                                    hline.push(expMap(x, y, t));
                                }
                                var inStrip = Math.abs(y) <= Math.PI + 0.01;
                                var hcol = inStrip ? '#f0883e' : '#3fb9a088';
                                drawInputLine(iline, inStrip ? '#f0883e' : '#3fb9a088', inStrip ? 1.5 : 0.8);
                                drawMappedLine(hline, hcol, inStrip ? 1.5 : 0.8);
                            }

                            // Vertical lines (constant Re): map to circles
                            for (var x = -range; x <= range + 0.01; x += step) {
                                var vline = [], ivline = [];
                                for (var k = 0; k <= npts; k++) {
                                    var y2 = -range + 2 * range * k / npts;
                                    ivline.push([x, y2]);
                                    vline.push(expMap(x, y2, t));
                                }
                                drawInputLine(ivline, '#58a6ff88', 0.8);
                                drawMappedLine(vline, '#58a6ff', 0.8);
                            }

                            viz.screenText('z-plane  (strip: |Im z| \u2264 \u03C0)', panelW / 2, 14, '#c9d1d9', 12);
                            viz.screenText('w-plane under e\u1D63', panelW + panelW / 2, 14, '#c9d1d9', 12);
                            viz.screenText('Horizontal \u2192 rays  |  Vertical \u2192 circles', panelW + panelW / 2, viz.height - 14, '#8b949e', 11);

                            if (animating && t < 1) {
                                viz.screenText('Morphing: ' + Math.round(t * 100) + '%', panelW + panelW / 2, viz.height - 28, '#f0883e', 11);
                            }
                        }

                        viz.animate(function() {
                            if (animating) {
                                animT = Math.min(1, animT + 0.010);
                                if (animT >= 1) animating = false;
                            }
                            draw(animT);
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(f(z) = z^2 = (x^2-y^2) + 2ixy\\) satisfies the Cauchy-Riemann equations everywhere.',
                    hint: 'Compute all four partial derivatives of u = x^2 - y^2 and v = 2xy.',
                    solution: '\\(u = x^2 - y^2\\), \\(v = 2xy\\). Then: \\(u_x = 2x\\), \\(u_y = -2y\\), \\(v_x = 2y\\), \\(v_y = 2x\\). Check: \\(u_x = v_y = 2x\\) ✓ and \\(u_y = -v_x = -2y\\) ✓. Both Cauchy-Riemann equations are satisfied for all \\((x,y)\\), confirming \\(z^2\\) is holomorphic everywhere.'
                },
                {
                    question: 'Show that \\(f(z) = \\bar{z} = x - iy\\) fails the Cauchy-Riemann equations everywhere (except nowhere).',
                    hint: 'Identify u and v, then check u_x = v_y.',
                    solution: 'Here \\(u = x\\) and \\(v = -y\\). Then \\(u_x = 1\\) but \\(v_y = -1\\). Since \\(u_x \\neq v_y\\) everywhere, the first Cauchy-Riemann equation fails everywhere. Therefore \\(\\bar{z}\\) is nowhere holomorphic.'
                },
                {
                    question: 'The exponential satisfies \\(e^{z + 2\\pi i} = e^z\\). What does this imply about the map \\(w = e^z\\) from the perspective of grid mapping? How many times does the vertical line \\(\\mathrm{Re}(z) = 0\\) wrap around the origin under \\(e^z\\)?',
                    hint: 'The unit circle |w| = 1 is the image of Re(z) = 0. Consider the period 2pi.',
                    solution: 'Since \\(e^{z+2\\pi i} = e^z\\), the map is \\(2\\pi i\\)-periodic: horizontal strips of height \\(2\\pi\\) in the z-plane all map to the same punctured disk sector in the w-plane. The vertical line \\(\\mathrm{Re}(z) = 0\\) parametrized by \\(\\mathrm{Im}(z) \\in [0, 2\\pi)\\) maps to \\(e^{i\\theta}\\) for \\(\\theta \\in [0, 2\\pi)\\): exactly once around the unit circle. Over the full imaginary axis (all of \\(\\mathbb{R}\\)), the unit circle is covered infinitely many times.'
                }
            ]
        }
    ]
});
