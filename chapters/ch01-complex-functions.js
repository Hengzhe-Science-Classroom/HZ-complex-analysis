window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Complex Functions & Mappings',
    subtitle: 'How complex functions transform the plane',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Study Complex Functions?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Study Complex Functions?</h2>

<div class="env-block intuition">
    <div class="env-title">From Numbers to Geometry</div>
    <div class="env-body">
        <p>In Chapter 0 we built the complex plane: a number system where every point \\((x, y)\\) represents the complex number \\(z = x + iy\\). Now we ask: what happens when we apply a function \\(f\\) to every point in this plane?</p>
        <p>A real function \\(f: \\mathbb{R} \\to \\mathbb{R}\\) has a graph you can draw as a curve. A complex function \\(f: \\mathbb{C} \\to \\mathbb{C}\\) maps one plane to another. Its "graph" lives in four dimensions (two for input, two for output), so we cannot draw it directly. Instead, we study how \\(f\\) <strong>transforms</strong> the plane: stretching, rotating, folding, and wrapping regions into new shapes.</p>
    </div>
</div>

<p>This geometric viewpoint is the central idea of complex analysis. A complex function is not just a formula; it is a <em>mapping</em> of the plane to itself. Understanding a function means understanding its geometry.</p>

<h3>What Makes Complex Functions Special?</h3>

<p>Consider the function \\(f(z) = z^2\\). Written in Cartesian form with \\(z = x + iy\\):</p>
\\[f(z) = (x + iy)^2 = (x^2 - y^2) + i(2xy).\\]
<p>The real part \\(u(x,y) = x^2 - y^2\\) and imaginary part \\(v(x,y) = 2xy\\) satisfy the <strong>Cauchy-Riemann equations</strong>:</p>
\\[\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\qquad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}.\\]
<p>This is not a coincidence. Functions that satisfy these equations (the <em>analytic</em> functions) have extraordinary properties: they are infinitely differentiable, determined by their values on any curve, and preserve angles locally. We will meet these ideas fully in Chapter 2. For now, we focus on building geometric intuition.</p>

<h3>The Four-Dimensional Problem</h3>

<p>Since \\(f: \\mathbb{C} \\to \\mathbb{C}\\) maps \\((x, y) \\mapsto (u, v)\\), its complete graph is a surface in \\(\\mathbb{R}^4\\). We cannot visualize four dimensions, so we use two strategies:</p>
<ol>
    <li><strong>Domain coloring</strong>: color each input point \\(z\\) according to the output \\(f(z)\\). The hue encodes the argument (direction), and the brightness encodes the modulus (magnitude).</li>
    <li><strong>Grid mapping</strong>: draw a grid in the domain, apply \\(f\\) to every grid point, and see how the grid deforms in the codomain.</li>
</ol>
<p>Both techniques will appear throughout this chapter and the rest of the course.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>The idea of studying functions as geometric transformations goes back to Riemann's 1851 doctoral dissertation. Riemann emphasized that a complex function should be understood by how it maps regions of the plane, not merely by its algebraic formula. This geometric perspective revolutionized analysis and remains central to the subject today.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Complex Functions
        // ================================================================
        {
            id: 'sec-functions',
            title: 'Complex Functions',
            content: `
<h2>Complex Functions</h2>

<div class="env-block definition">
    <div class="env-title">Definition 1.1 (Complex Function)</div>
    <div class="env-body">
        <p>A <strong>complex function</strong> is a function \\(f: S \\to \\mathbb{C}\\) where \\(S \\subseteq \\mathbb{C}\\). For each \\(z = x + iy \\in S\\), we write</p>
        \\[f(z) = u(x,y) + iv(x,y)\\]
        <p>where \\(u, v: \\mathbb{R}^2 \\to \\mathbb{R}\\) are the <strong>real part</strong> and <strong>imaginary part</strong> of \\(f\\).</p>
    </div>
</div>

<p>Every complex function is equivalent to a pair of real-valued functions of two real variables. But thinking of \\(f\\) as acting on a single complex variable \\(z\\) (rather than on the pair \\((x,y)\\)) opens up powerful algebraic and geometric tools.</p>

<h3>Polynomial Functions</h3>

<p>A <strong>complex polynomial</strong> of degree \\(n\\) is</p>
\\[p(z) = a_n z^n + a_{n-1} z^{n-1} + \\cdots + a_1 z + a_0, \\qquad a_n \\neq 0.\\]
<p>The Fundamental Theorem of Algebra guarantees that \\(p(z)\\) has exactly \\(n\\) roots (counted with multiplicity) in \\(\\mathbb{C}\\). This is one reason complex analysis is so powerful: the algebraic completeness of \\(\\mathbb{C}\\) means polynomials factor completely.</p>

<div class="env-block example">
    <div class="env-title">Example: Zeros of \\(z^3 - 1\\)</div>
    <div class="env-body">
        <p>The equation \\(z^3 = 1\\) has three roots, the cube roots of unity:</p>
        \\[z_0 = 1, \\quad z_1 = e^{2\\pi i/3} = -\\tfrac{1}{2} + \\tfrac{\\sqrt{3}}{2}i, \\quad z_2 = e^{4\\pi i/3} = -\\tfrac{1}{2} - \\tfrac{\\sqrt{3}}{2}i.\\]
        <p>These are equally spaced on the unit circle, each separated by an angle of \\(120°\\).</p>
    </div>
</div>

<h3>Rational Functions</h3>

<p>A <strong>rational function</strong> is a ratio of two polynomials:</p>
\\[r(z) = \\frac{p(z)}{q(z)}.\\]
<p>It is defined everywhere except at the zeros of \\(q(z)\\), which are called <strong>poles</strong>. For example, \\(f(z) = 1/z\\) has a pole at \\(z = 0\\).</p>

<h3>Limits and Continuity</h3>

<div class="env-block definition">
    <div class="env-title">Definition 1.2 (Limit)</div>
    <div class="env-body">
        <p>We say \\(\\lim_{z \\to z_0} f(z) = L\\) if for every \\(\\varepsilon > 0\\) there exists \\(\\delta > 0\\) such that</p>
        \\[0 < |z - z_0| < \\delta \\implies |f(z) - L| < \\varepsilon.\\]
        <p>The crucial difference from \\(\\mathbb{R}\\): the limit must be the same no matter <em>how</em> \\(z\\) approaches \\(z_0\\), along any path in the plane.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 1.3 (Continuity)</div>
    <div class="env-body">
        <p>A function \\(f\\) is <strong>continuous</strong> at \\(z_0\\) if \\(\\lim_{z \\to z_0} f(z) = f(z_0)\\). Equivalently, \\(f\\) is continuous if and only if both \\(u\\) and \\(v\\) are continuous as functions \\(\\mathbb{R}^2 \\to \\mathbb{R}\\).</p>
    </div>
</div>

<p>All polynomials are continuous on \\(\\mathbb{C}\\). Rational functions are continuous on their domain (everywhere except their poles).</p>

<div class="env-block example">
    <div class="env-title">Example: A Limit That Does Not Exist</div>
    <div class="env-body">
        <p>Consider \\(f(z) = \\overline{z}/z = (x - iy)/(x + iy)\\). Along the real axis (\\(y = 0\\)), \\(f(x) = x/x = 1\\). Along the imaginary axis (\\(x = 0\\)), \\(f(iy) = -iy/(iy) = -1\\). Since these limits disagree, \\(\\lim_{z \\to 0} f(z)\\) does not exist. The function \\(f(z) = \\overline{z}/z\\) is not a "nice" complex function; it involves \\(\\overline{z}\\) and is not analytic.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Write \\(f(z) = z^2 + 2z + 1\\) in the form \\(u(x,y) + iv(x,y)\\). Verify the Cauchy-Riemann equations.',
                    hint: 'Set \\(z = x + iy\\), expand, and separate real and imaginary parts. Then compute the four partial derivatives.',
                    solution: '\\(f(z) = (x+iy)^2 + 2(x+iy) + 1 = (x^2 - y^2 + 2x + 1) + i(2xy + 2y)\\). So \\(u = x^2 - y^2 + 2x + 1\\), \\(v = 2xy + 2y\\). Then \\(u_x = 2x + 2 = v_y\\) and \\(u_y = -2y = -v_x\\). The Cauchy-Riemann equations hold everywhere.'
                },
                {
                    question: 'Show that \\(\\lim_{z \\to 0} \\frac{z}{\\overline{z}}\\) does not exist by approaching along two different paths.',
                    hint: 'Try \\(z = t\\) (real) and \\(z = it\\) (imaginary) as \\(t \\to 0\\).',
                    solution: 'Along the real axis: \\(z = t\\), so \\(z/\\overline{z} = t/t = 1\\). Along the imaginary axis: \\(z = it\\), so \\(z/\\overline{z} = it/(-it) = -1\\). Since \\(1 \\neq -1\\), the limit does not exist.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Mappings and Visualization
        // ================================================================
        {
            id: 'sec-mappings',
            title: 'Mappings & Visualization',
            content: `
<h2>Mappings and Visualization</h2>

<p>A complex function \\(f: \\mathbb{C} \\to \\mathbb{C}\\) sends each point \\(z\\) in the <strong>domain</strong> (the \\(z\\)-plane) to a point \\(w = f(z)\\) in the <strong>codomain</strong> (the \\(w\\)-plane). We call \\(f\\) a <em>mapping</em> or <em>transformation</em> to emphasize this geometric picture.</p>

<h3>Domain Coloring</h3>

<p>Domain coloring is a visualization technique that encodes both the argument and modulus of \\(f(z)\\) as color at each point \\(z\\):</p>
<ul>
    <li><strong>Hue</strong> represents \\(\\arg f(z)\\): red for positive real, cyan for negative real, with the full spectrum around the circle.</li>
    <li><strong>Brightness</strong> represents \\(|f(z)|\\): dark near zeros, bright near poles.</li>
</ul>

<p>The identity function \\(f(z) = z\\) gives the "reference" coloring. Every other domain coloring should be compared against it.</p>

<div class="viz-placeholder" data-viz="viz-domain-coloring-intro"></div>

<h3>Grid Mapping</h3>

<p>An alternative visualization: draw a regular grid of horizontal and vertical lines in the \\(z\\)-plane, apply \\(f\\) to every point on these lines, and plot the images in the \\(w\\)-plane. This reveals:</p>
<ul>
    <li><strong>Stretching and compression</strong>: grid cells that grow or shrink.</li>
    <li><strong>Rotation</strong>: grid lines that twist.</li>
    <li><strong>Conformality</strong>: right angles in the domain remain right angles in the image (for analytic functions away from critical points).</li>
</ul>

<div class="viz-placeholder" data-viz="viz-grid-mapping"></div>

<div class="env-block remark">
    <div class="env-title">Reading Domain Colorings</div>
    <div class="env-body">
        <p><strong>Zeros</strong> appear as dark spots where all colors converge (the argument cycles through all values). <strong>Poles</strong> appear as bright spots with the same color-cycling pattern. The <strong>order</strong> of a zero or pole equals the number of times the colors cycle around it.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-domain-coloring-intro',
                    title: 'Domain Coloring: The Identity \\(f(z) = z\\)',
                    description: 'This shows the reference domain coloring for the identity function. Hue encodes the argument: red at the positive real axis, cycling through yellow, green, cyan, blue, magenta. Brightness encodes the modulus: dark near the origin, bright far away.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 40 });
                        var range = [-4, 4];

                        function draw() {
                            viz.drawDomainColoring(function(re, im) {
                                return [re, im];
                            }, range, range);

                            // Overlay axis labels
                            var ctx = viz.ctx;
                            ctx.fillStyle = 'rgba(255,255,255,0.7)';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Re', viz.width - 20, viz.height / 2 + 4);
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Im', viz.width / 2 - 6, 16);

                            // Color legend
                            ctx.fillStyle = 'rgba(0,0,0,0.5)';
                            ctx.fillRect(10, 10, 140, 80);
                            ctx.fillStyle = '#fff';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Hue = arg(z)', 18, 16);
                            ctx.fillText('Bright = |z|', 18, 32);
                            ctx.fillText('f(z) = z (identity)', 18, 54);
                            ctx.fillStyle = '#aaa';
                            ctx.fillText('Reference coloring', 18, 70);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-grid-mapping',
                    title: 'Grid Mapping',
                    description: 'Select a function from the dropdown to see how it transforms a regular grid. Left: the original grid in the z-plane. Right: the transformed grid in the w-plane. Watch how straight lines bend and angles change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 40 });
                        var ctx = viz.ctx;

                        var functions = {
                            'z^2': function(re, im) { return [re*re - im*im, 2*re*im]; },
                            'z^3': function(re, im) {
                                var r2 = re*re, i2 = im*im;
                                return [re*r2 - 3*re*i2, 3*r2*im - im*i2];
                            },
                            '1/z': function(re, im) {
                                var d = re*re + im*im;
                                if (d < 1e-10) return [1e5, 0];
                                return [re/d, -im/d];
                            },
                            'e^z': function(re, im) {
                                var er = Math.exp(re);
                                return [er * Math.cos(im), er * Math.sin(im)];
                            }
                        };
                        var funcName = 'z^2';

                        // Dropdown
                        var sel = document.createElement('select');
                        sel.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.8rem;';
                        Object.keys(functions).forEach(function(name) {
                            var opt = document.createElement('option');
                            opt.value = name; opt.textContent = 'f(z) = ' + name;
                            sel.appendChild(opt);
                        });
                        sel.addEventListener('change', function() { funcName = sel.value; draw(); });
                        controls.appendChild(sel);

                        var animT = 0;
                        var animating = false;

                        var animBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) {
                                animating = false;
                                viz.stopAnimation();
                                animBtn.textContent = 'Animate';
                                draw();
                            } else {
                                animating = true;
                                animBtn.textContent = 'Stop';
                                animT = 0;
                                viz.animate(function(t) {
                                    animT = Math.min(1, (t % 4000) / 3000);
                                    draw();
                                });
                            }
                        });

                        function drawGrid(ox, oy, sc, f, t) {
                            var gridMin = -3, gridMax = 3;
                            var steps = 60;

                            // Horizontal lines
                            for (var gi = gridMin; gi <= gridMax; gi += 0.5) {
                                ctx.strokeStyle = gi === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(88,166,255,0.35)';
                                ctx.lineWidth = gi === 0 ? 1.5 : 1;
                                ctx.beginPath();
                                var started = false;
                                for (var s = 0; s <= steps; s++) {
                                    var x0 = gridMin + (gridMax - gridMin) * s / steps;
                                    var y0 = gi;
                                    var re, im;
                                    if (f && t > 0) {
                                        var w = f(x0, y0);
                                        re = x0 + (w[0] - x0) * t;
                                        im = y0 + (w[1] - y0) * t;
                                    } else {
                                        re = x0; im = y0;
                                    }
                                    var sx = ox + re * sc;
                                    var sy = oy - im * sc;
                                    if (!isFinite(sx) || !isFinite(sy) || Math.abs(sx) > 2000 || Math.abs(sy) > 2000) {
                                        started = false; continue;
                                    }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // Vertical lines
                            for (var gj = gridMin; gj <= gridMax; gj += 0.5) {
                                ctx.strokeStyle = gj === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(63,185,160,0.35)';
                                ctx.lineWidth = gj === 0 ? 1.5 : 1;
                                ctx.beginPath();
                                var started2 = false;
                                for (var s2 = 0; s2 <= steps; s2++) {
                                    var xx = gj;
                                    var yy = gridMin + (gridMax - gridMin) * s2 / steps;
                                    var re2, im2;
                                    if (f && t > 0) {
                                        var w2 = f(xx, yy);
                                        re2 = xx + (w2[0] - xx) * t;
                                        im2 = yy + (w2[1] - yy) * t;
                                    } else {
                                        re2 = xx; im2 = yy;
                                    }
                                    var sx2 = ox + re2 * sc;
                                    var sy2 = oy - im2 * sc;
                                    if (!isFinite(sx2) || !isFinite(sy2) || Math.abs(sx2) > 2000 || Math.abs(sy2) > 2000) {
                                        started2 = false; continue;
                                    }
                                    if (!started2) { ctx.moveTo(sx2, sy2); started2 = true; }
                                    else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }
                        }

                        function draw() {
                            viz.clear();

                            var halfW = viz.width / 2;
                            var sc = 40;

                            // Divider
                            ctx.strokeStyle = '#30363d';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(halfW, 0);
                            ctx.lineTo(halfW, viz.height);
                            ctx.stroke();

                            // Domain grid (left)
                            drawGrid(halfW / 2, viz.height / 2, sc, null, 0);

                            // Image grid (right)
                            var tVal = animating ? animT : 1;
                            drawGrid(halfW + halfW / 2, viz.height / 2, sc, functions[funcName], tVal);

                            // Labels
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('z-plane', halfW / 2, 8);
                            ctx.fillText('w = ' + funcName, halfW + halfW / 2, 8);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In the domain coloring of \\(f(z) = z^2\\), how many times do the colors cycle around the origin? Why?',
                    hint: 'At the origin, \\(f\\) has a zero of order 2. Count the number of full color cycles as you walk around a small circle centered at 0.',
                    solution: 'The colors cycle twice. If \\(z = re^{i\\theta}\\), then \\(z^2 = r^2 e^{2i\\theta}\\). As \\(\\theta\\) goes from \\(0\\) to \\(2\\pi\\), the argument of \\(f(z)\\) goes from \\(0\\) to \\(4\\pi\\), completing two full cycles. In general, a zero of order \\(n\\) produces \\(n\\) color cycles.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Linear Maps w = az + b
        // ================================================================
        {
            id: 'sec-linear',
            title: 'Linear Maps',
            content: `
<h2>Linear Maps: \\(w = az + b\\)</h2>

<p>The simplest complex functions are the <strong>linear</strong> (affine) maps \\(f(z) = az + b\\), where \\(a, b \\in \\mathbb{C}\\) with \\(a \\neq 0\\). Despite their simplicity, they illustrate the fundamental geometric operations that all complex functions perform locally.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.1 (Geometry of Linear Maps)</div>
    <div class="env-body">
        <p>The map \\(w = az + b\\) with \\(a = |a| e^{i\\alpha}\\) and \\(b = b_1 + ib_2\\) performs three operations in sequence:</p>
        <ol>
            <li><strong>Rotation</strong> by \\(\\alpha = \\arg(a)\\) about the origin.</li>
            <li><strong>Scaling</strong> by the factor \\(|a|\\).</li>
            <li><strong>Translation</strong> by the vector \\((b_1, b_2)\\).</li>
        </ol>
        <p>Linear maps preserve all geometric relations: straight lines map to straight lines, circles map to circles, and all angles are preserved. They are the rigid motions and dilations of the complex plane.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(w = iz\\)</div>
    <div class="env-body">
        <p>Here \\(a = i = e^{i\\pi/2}\\) and \\(b = 0\\). This is a rotation by \\(90°\\) counterclockwise. The point \\(1\\) maps to \\(i\\), \\(i\\) maps to \\(-1\\), and so on. Every point moves a quarter-turn around the origin.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(w = 2e^{i\\pi/4}z + (1 + i)\\)</div>
    <div class="env-body">
        <p>This rotates by \\(45°\\), scales by 2, and translates by \\((1, 1)\\). The origin maps to \\(1 + i\\). The unit circle maps to a circle of radius 2 centered at \\(1 + i\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-linear-map"></div>

<p>Use the sliders to explore how each parameter affects the mapping. Notice that changing \\(|a|\\) scales the image, \\(\\arg(a)\\) rotates it, and \\(b\\) shifts the entire picture.</p>
`,
            visualizations: [
                {
                    id: 'viz-linear-map',
                    title: 'Linear Map \\(w = az + b\\)',
                    description: 'Adjust \\(|a|\\), \\(\\arg(a)\\), and the components of \\(b\\) to see how the linear map transforms a grid, a unit circle, and a small square. The left panel shows the z-plane; the right panel shows the w-plane.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 40 });
                        var ctx = viz.ctx;

                        var modA = 1.5, argA = 0, reB = 0, imB = 0;

                        VizEngine.createSlider(controls, '|a|', 0.2, 3, modA, 0.1, function(v) { modA = v; draw(); });
                        VizEngine.createSlider(controls, 'arg(a)', -3.14, 3.14, argA, 0.05, function(v) { argA = v; draw(); });
                        VizEngine.createSlider(controls, 'Re(b)', -3, 3, reB, 0.1, function(v) { reB = v; draw(); });
                        VizEngine.createSlider(controls, 'Im(b)', -3, 3, imB, 0.1, function(v) { imB = v; draw(); });

                        function applyF(re, im) {
                            var aRe = modA * Math.cos(argA), aIm = modA * Math.sin(argA);
                            return [aRe * re - aIm * im + reB, aIm * re + aRe * im + imB];
                        }

                        function drawPanel(ox, oy, sc, f, label) {
                            // Grid
                            for (var g = -3; g <= 3; g++) {
                                ctx.strokeStyle = g === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(88,166,255,0.15)';
                                ctx.lineWidth = g === 0 ? 1 : 0.5;
                                // Horizontal
                                ctx.beginPath();
                                for (var s = 0; s <= 60; s++) {
                                    var x0 = -3 + 6 * s / 60, y0 = g;
                                    var p = f ? f(x0, y0) : [x0, y0];
                                    var sx = ox + p[0] * sc, sy = oy - p[1] * sc;
                                    if (!isFinite(sx) || !isFinite(sy)) continue;
                                    s === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                                // Vertical
                                ctx.beginPath();
                                for (var s2 = 0; s2 <= 60; s2++) {
                                    var xx = g, yy = -3 + 6 * s2 / 60;
                                    var p2 = f ? f(xx, yy) : [xx, yy];
                                    var sx2 = ox + p2[0] * sc, sy2 = oy - p2[1] * sc;
                                    if (!isFinite(sx2) || !isFinite(sy2)) continue;
                                    s2 === 0 ? ctx.moveTo(sx2, sy2) : ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                            }

                            // Unit circle
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var t = 0; t <= 64; t++) {
                                var th = 2 * Math.PI * t / 64;
                                var cx = Math.cos(th), cy = Math.sin(th);
                                var cp = f ? f(cx, cy) : [cx, cy];
                                var csx = ox + cp[0] * sc, csy = oy - cp[1] * sc;
                                t === 0 ? ctx.moveTo(csx, csy) : ctx.lineTo(csx, csy);
                            }
                            ctx.stroke();

                            // Square [0,1]x[0,1]
                            var sq = [[0,0],[1,0],[1,1],[0,1],[0,0]];
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var k = 0; k < sq.length; k++) {
                                var sp = f ? f(sq[k][0], sq[k][1]) : sq[k];
                                var ssx = ox + sp[0] * sc, ssy = oy - sp[1] * sc;
                                k === 0 ? ctx.moveTo(ssx, ssy) : ctx.lineTo(ssx, ssy);
                            }
                            ctx.stroke();

                            // Label
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText(label, ox, 8);
                        }

                        function draw() {
                            viz.clear();
                            var halfW = viz.width / 2;
                            var sc = 35;

                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, viz.height); ctx.stroke();

                            drawPanel(halfW / 2, viz.height / 2, sc, null, 'z-plane');
                            drawPanel(halfW + halfW / 2, viz.height / 2, sc, applyF, 'w = az + b');

                            // Info
                            var aStr = modA.toFixed(1) + 'e^{' + (argA >= 0 ? '' : '') + (argA * 180 / Math.PI).toFixed(0) + 'i}';
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('|a|=' + modA.toFixed(1) + '  arg(a)=' + (argA * 180 / Math.PI).toFixed(0) + '\u00B0  b=' + reB.toFixed(1) + '+' + imB.toFixed(1) + 'i', viz.width / 2, viz.height - 4);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the linear map \\(w = az + b\\) that sends \\(0 \\mapsto 2+i\\) and \\(1 \\mapsto 3+2i\\).',
                    hint: 'From \\(f(0) = b = 2+i\\). Then \\(f(1) = a + b = 3 + 2i\\).',
                    solution: 'From \\(f(0) = b = 2+i\\), we get \\(b = 2+i\\). From \\(f(1) = a + b = 3+2i\\), we get \\(a = (3+2i) - (2+i) = 1+i\\). So \\(f(z) = (1+i)z + (2+i)\\). This scales by \\(|1+i| = \\sqrt{2}\\) and rotates by \\(\\arg(1+i) = 45°\\), then translates by \\((2,1)\\).'
                },
                {
                    question: 'What geometric transformation does \\(w = \\overline{a}z\\) represent when \\(|a| = 1\\)?',
                    hint: 'Write \\(a = e^{i\\alpha}\\), so \\(\\overline{a} = e^{-i\\alpha}\\).',
                    solution: 'Since \\(|\\overline{a}| = |a| = 1\\) and \\(\\arg(\\overline{a}) = -\\alpha\\), the map \\(w = \\overline{a}z\\) is a rotation by \\(-\\alpha\\). It is the inverse of the rotation \\(w = az\\). Composing them gives \\(\\overline{a}(az) = |a|^2 z = z\\), the identity.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: The Squaring Map w = z^2
        // ================================================================
        {
            id: 'sec-quadratic',
            title: 'The Squaring Map',
            content: `
<h2>The Squaring Map: \\(w = z^2\\)</h2>

<p>The squaring map is the simplest nonlinear complex function, and it already displays the key phenomena that distinguish complex analysis from real analysis.</p>

<h3>Polar Form</h3>

<p>In polar coordinates \\(z = re^{i\\theta}\\):</p>
\\[w = z^2 = r^2 e^{2i\\theta}.\\]
<p>The squaring map <strong>squares the modulus</strong> and <strong>doubles the argument</strong>. This has two immediate geometric consequences:</p>
<ul>
    <li>A ray from the origin at angle \\(\\theta\\) maps to a ray at angle \\(2\\theta\\). The upper half-plane (\\(0 < \\theta < \\pi\\)) maps to the full plane (\\(0 < 2\\theta < 2\\pi\\)).</li>
    <li>A circle of radius \\(r\\) maps to a circle of radius \\(r^2\\). Small circles shrink, large circles grow.</li>
</ul>

<h3>Two-to-One</h3>

<p>Since \\(z^2 = (-z)^2\\), the squaring map is <strong>two-to-one</strong>: every point \\(w \\neq 0\\) has exactly two preimages \\(\\pm z\\). The full plane wraps twice around itself.</p>

<div class="env-block definition">
    <div class="env-title">Definition 1.4 (Branch Cut)</div>
    <div class="env-body">
        <p>To define a single-valued square root \\(w = z^{1/2}\\), we must remove a ray from the origin (typically the negative real axis) and choose one of the two possible values continuously on the remaining region. The removed ray is called a <strong>branch cut</strong>, and the resulting function is a <strong>branch</strong> of the square root.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-z-squared"></div>

<h3>Angle Doubling and Conformality</h3>

<p>At any point \\(z_0 \\neq 0\\), the squaring map preserves angles. Two curves meeting at angle \\(\\alpha\\) at \\(z_0\\) map to curves meeting at angle \\(\\alpha\\) at \\(z_0^2\\). But at \\(z_0 = 0\\), where \\(f'(0) = 0\\), angles are <strong>doubled</strong>: two curves meeting at angle \\(\\alpha\\) map to curves meeting at angle \\(2\\alpha\\). The origin is a <strong>critical point</strong>.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.2 (Critical Points and Angle Multiplication)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic and \\(f'(z_0) = f''(z_0) = \\cdots = f^{(k-1)}(z_0) = 0\\) but \\(f^{(k)}(z_0) \\neq 0\\), then \\(f\\) multiplies angles at \\(z_0\\) by \\(k\\). In particular, \\(f\\) is conformal (angle-preserving) at \\(z_0\\) if and only if \\(f'(z_0) \\neq 0\\).</p>
    </div>
</div>

<h3>What \\(z^2\\) Does to Standard Regions</h3>

<div class="env-block example">
    <div class="env-title">Example: Quarter-Plane to Half-Plane</div>
    <div class="env-body">
        <p>The first quadrant \\(\\{z : 0 < \\arg z < \\pi/2\\}\\) maps to the upper half-plane \\(\\{w : 0 < \\arg w < \\pi\\}\\). The angle range \\([0, \\pi/2]\\) doubles to \\([0, \\pi]\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-z-squared',
                    title: 'Domain Coloring: \\(f(z) = z^2\\)',
                    description: 'Compare the identity coloring (left) with \\(z^2\\) (right). Notice how the colors cycle twice around the origin in the right panel, reflecting the doubled argument. The brightness pattern shows \\(r^2\\): points inside the unit circle become darker (modulus decreases), points outside become brighter.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 40 });
                        var ctx = viz.ctx;
                        var range = [-3, 3];
                        var halfW = Math.floor(viz.width / 2);

                        function draw() {
                            // Left: identity
                            var pw = viz.canvas.width, ph = viz.canvas.height;
                            var dpr = pw / viz.width;
                            var halfPW = Math.floor(halfW * dpr);

                            ctx.save();
                            ctx.setTransform(1, 0, 0, 1, 0, 0);
                            var imgData = ctx.createImageData(pw, ph);
                            var data = imgData.data;

                            for (var py = 0; py < ph; py++) {
                                for (var px = 0; px < pw; px++) {
                                    var re = range[0] + (range[1] - range[0]) * px / pw;
                                    var im = range[1] - (range[1] - range[0]) * py / ph;
                                    var u, v;
                                    if (px < halfPW) {
                                        u = re; v = im;
                                    } else {
                                        u = re * re - im * im;
                                        v = 2 * re * im;
                                    }
                                    var arg = Math.atan2(v, u);
                                    var mag = Math.sqrt(u * u + v * v);
                                    var hue = (arg / Math.PI + 1) / 2;
                                    var light = 1 - 1 / (1 + mag * 0.3);
                                    var rgb = VizEngine.hslToRgb(hue, 0.8, light);
                                    var idx = (py * pw + px) * 4;
                                    data[idx] = rgb[0]; data[idx+1] = rgb[1]; data[idx+2] = rgb[2]; data[idx+3] = 255;
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);
                            ctx.restore();

                            // Divider
                            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, viz.height); ctx.stroke();

                            // Labels
                            ctx.fillStyle = 'rgba(0,0,0,0.5)';
                            ctx.fillRect(5, 5, 90, 22);
                            ctx.fillRect(halfW + 5, 5, 90, 22);
                            ctx.fillStyle = '#fff';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('f(z) = z', 12, 9);
                            ctx.fillText('f(z) = z\u00B2', halfW + 12, 9);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Describe the image of the line \\(\\text{Re}(z) = 1\\) under \\(w = z^2\\). What curve is it?',
                    hint: 'Set \\(z = 1 + iy\\) and compute \\(w = (1 + iy)^2\\). Express \\(u\\) and \\(v\\) in terms of \\(y\\), then eliminate \\(y\\).',
                    solution: '\\(w = (1+iy)^2 = (1-y^2) + 2iy\\). So \\(u = 1 - y^2\\) and \\(v = 2y\\), giving \\(y = v/2\\) and \\(u = 1 - v^2/4\\). This is a parabola \\(u = 1 - v^2/4\\) opening to the left.'
                },
                {
                    question: 'How many preimages does the point \\(w = -4\\) have under \\(f(z) = z^2\\)? Find them.',
                    hint: 'Solve \\(z^2 = -4\\). Write \\(-4\\) in polar form.',
                    solution: '\\(-4 = 4e^{i\\pi}\\), so \\(z = \\pm 2e^{i\\pi/2} = \\pm 2i\\). There are exactly 2 preimages: \\(z = 2i\\) and \\(z = -2i\\). Check: \\((2i)^2 = -4\\) and \\((-2i)^2 = -4\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Looking Ahead
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead</h2>

<p>In this chapter we developed the geometric viewpoint: a complex function is a mapping of the plane that can be visualized through domain coloring and grid deformation. We saw three levels of complexity:</p>

<ol>
    <li><strong>Linear maps</strong> \\(w = az + b\\): rigid motions with scaling. They preserve all geometry.</li>
    <li><strong>The squaring map</strong> \\(w = z^2\\): the simplest nonlinear map. It doubles angles, squares moduli, and is two-to-one.</li>
    <li><strong>Other mappings</strong>: inversion \\(w = 1/z\\) and the exponential \\(w = e^z\\) exhibit even richer behavior, mapping lines to circles and strips to sectors.</li>
</ol>

<h3>Inversion: \\(w = 1/z\\)</h3>

<p>The inversion map \\(w = 1/z = \\frac{1}{r}e^{-i\\theta}\\) inverts the modulus and negates the argument. It swaps the inside and outside of the unit circle, and sends \\(0\\) to \\(\\infty\\) and vice versa. One of its most remarkable properties:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 1.3 (Circles and Lines)</div>
    <div class="env-body">
        <p>The map \\(w = 1/z\\) sends circles and lines to circles and lines. Specifically:</p>
        <ul>
            <li>A circle through the origin maps to a line.</li>
            <li>A circle not through the origin maps to a circle.</li>
            <li>A line through the origin maps to a line through the origin.</li>
            <li>A line not through the origin maps to a circle through the origin.</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-inversion"></div>

<h3>The Exponential Map: \\(w = e^z\\)</h3>

<p>For \\(z = x + iy\\):</p>
\\[e^z = e^x(\\cos y + i\\sin y).\\]
<p>Horizontal lines \\(y = c\\) map to rays at angle \\(c\\) (since \\(|e^z| = e^x\\) varies along the ray). Vertical lines \\(x = c\\) map to circles of radius \\(e^c\\) (since \\(\\arg(e^z) = y\\) varies around the circle). A horizontal strip of height \\(2\\pi\\) maps to the entire plane (minus the origin).</p>

<div class="viz-placeholder" data-viz="viz-exp-map"></div>

<div class="viz-placeholder" data-viz="viz-polynomial-coloring"></div>

<h3>What Comes Next</h3>

<p>In <strong>Chapter 2</strong>, we formalize the property that makes these functions special: <em>analyticity</em>. The Cauchy-Riemann equations will give us an algebraic criterion for when a function is conformal, and the derivative \\(f'(z)\\) will quantify the local stretching and rotation at each point. The geometric intuition we have built here will become the foundation for the rigorous theory.</p>

<div class="env-block remark">
    <div class="env-title">The Big Picture</div>
    <div class="env-body">
        <p>Complex analysis sits at the intersection of algebra, geometry, and analysis. The algebraic completeness of \\(\\mathbb{C}\\) (every polynomial factors), the geometric richness of conformal mappings (angle preservation, domain coloring), and the analytic power of the Cauchy-Riemann equations (infinite differentiability, integral formulas) all reinforce each other. This chapter gave you the geometric layer. The next chapters will build the analytic and algebraic layers on top of it.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-inversion',
                    title: 'Inversion: \\(w = 1/z\\)',
                    description: 'Domain coloring of \\(1/z\\). The origin is a pole (bright spot with all colors). Compare with the identity coloring: the hue direction reverses (argument negated) and brightness inverts (inside and outside of the unit circle swap).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 40 });
                        var ctx = viz.ctx;
                        var range = [-3, 3];
                        var halfW = Math.floor(viz.width / 2);

                        function draw() {
                            var pw = viz.canvas.width, ph = viz.canvas.height;
                            var dpr = pw / viz.width;
                            var halfPW = Math.floor(halfW * dpr);

                            ctx.save();
                            ctx.setTransform(1, 0, 0, 1, 0, 0);
                            var imgData = ctx.createImageData(pw, ph);
                            var data = imgData.data;

                            for (var py = 0; py < ph; py++) {
                                for (var px = 0; px < pw; px++) {
                                    var re = range[0] + (range[1] - range[0]) * px / pw;
                                    var im = range[1] - (range[1] - range[0]) * py / ph;
                                    var u, v;
                                    if (px < halfPW) {
                                        u = re; v = im;
                                    } else {
                                        var d = re * re + im * im;
                                        if (d < 1e-10) { u = 1e5; v = 0; }
                                        else { u = re / d; v = -im / d; }
                                    }
                                    var arg = Math.atan2(v, u);
                                    var mag = Math.sqrt(u * u + v * v);
                                    var hue = (arg / Math.PI + 1) / 2;
                                    var light = 1 - 1 / (1 + mag * 0.3);
                                    var rgb = VizEngine.hslToRgb(hue, 0.8, light);
                                    var idx = (py * pw + px) * 4;
                                    data[idx] = rgb[0]; data[idx+1] = rgb[1]; data[idx+2] = rgb[2]; data[idx+3] = 255;
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);
                            ctx.restore();

                            // Divider
                            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, viz.height); ctx.stroke();

                            // Labels
                            ctx.fillStyle = 'rgba(0,0,0,0.5)';
                            ctx.fillRect(5, 5, 90, 22);
                            ctx.fillRect(halfW + 5, 5, 90, 22);
                            ctx.fillStyle = '#fff';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('f(z) = z', 12, 9);
                            ctx.fillText('f(z) = 1/z', halfW + 12, 9);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-exp-map',
                    title: 'The Exponential Map: \\(w = e^z\\)',
                    description: 'Left: the z-plane with horizontal and vertical lines. Right: domain coloring of \\(e^z\\). Horizontal strips of height \\(2\\pi\\) map to the full plane. Notice the periodicity: the coloring repeats vertically every \\(2\\pi\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 40 });
                        var ctx = viz.ctx;
                        var halfW = Math.floor(viz.width / 2);

                        function draw() {
                            var pw = viz.canvas.width, ph = viz.canvas.height;
                            var dpr = pw / viz.width;
                            var halfPW = Math.floor(halfW * dpr);
                            var xRange = [-4, 4], yRange = [-4, 4];

                            ctx.save();
                            ctx.setTransform(1, 0, 0, 1, 0, 0);
                            var imgData = ctx.createImageData(pw, ph);
                            var data = imgData.data;

                            for (var py = 0; py < ph; py++) {
                                for (var px = 0; px < pw; px++) {
                                    var re = xRange[0] + (xRange[1] - xRange[0]) * px / pw;
                                    var im = yRange[1] - (yRange[1] - yRange[0]) * py / ph;
                                    var u, v;
                                    if (px < halfPW) {
                                        u = re; v = im;
                                    } else {
                                        var er = Math.exp(re);
                                        u = er * Math.cos(im);
                                        v = er * Math.sin(im);
                                    }
                                    var arg = Math.atan2(v, u);
                                    var mag = Math.sqrt(u * u + v * v);
                                    var hue = (arg / Math.PI + 1) / 2;
                                    var light = 1 - 1 / (1 + mag * 0.3);
                                    var rgb = VizEngine.hslToRgb(hue, 0.8, light);
                                    var idx = (py * pw + px) * 4;
                                    data[idx] = rgb[0]; data[idx+1] = rgb[1]; data[idx+2] = rgb[2]; data[idx+3] = 255;
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);
                            ctx.restore();

                            // Divider
                            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, viz.height); ctx.stroke();

                            // Highlight 2pi strip on left
                            var stripTop = viz.height / 2 - Math.PI * (viz.height / (yRange[1] - yRange[0]));
                            var stripBot = viz.height / 2 + Math.PI * (viz.height / (yRange[1] - yRange[0]));
                            ctx.fillStyle = 'rgba(88,166,255,0.08)';
                            ctx.fillRect(0, stripTop, halfW, stripBot - stripTop);
                            ctx.strokeStyle = 'rgba(88,166,255,0.4)';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath(); ctx.moveTo(0, stripTop); ctx.lineTo(halfW, stripTop); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, stripBot); ctx.lineTo(halfW, stripBot); ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels
                            ctx.fillStyle = 'rgba(0,0,0,0.5)';
                            ctx.fillRect(5, 5, 90, 22);
                            ctx.fillRect(halfW + 5, 5, 90, 22);
                            ctx.fillStyle = '#fff';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('f(z) = z', 12, 9);
                            ctx.fillText('f(z) = e\u1DBB', halfW + 12, 9);

                            // Strip annotation
                            ctx.fillStyle = 'rgba(88,166,255,0.7)';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('height = 2\u03C0', 6, stripTop + 3);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-polynomial-coloring',
                    title: 'Domain Coloring: \\(f(z) = z^n\\)',
                    description: 'Slide \\(n\\) to see how higher powers produce more color cycles around the origin. The zero at the origin has order \\(n\\), so the colors cycle exactly \\(n\\) times.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 40 });
                        var ctx = viz.ctx;
                        var nVal = 2;
                        var range = [-3, 3];

                        VizEngine.createSlider(controls, 'n', 1, 6, nVal, 1, function(v) {
                            nVal = Math.round(v);
                            draw();
                        });

                        function draw() {
                            viz.drawDomainColoring(function(re, im) {
                                // Compute z^n using repeated multiplication
                                var ur = 1, ui = 0;
                                for (var k = 0; k < nVal; k++) {
                                    var tr = ur * re - ui * im;
                                    var ti = ur * im + ui * re;
                                    ur = tr; ui = ti;
                                }
                                return [ur, ui];
                            }, range, range);

                            // Label
                            ctx.fillStyle = 'rgba(0,0,0,0.55)';
                            ctx.fillRect(viz.width / 2 - 60, 8, 120, 26);
                            ctx.fillStyle = '#fff';
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('f(z) = z' + (nVal === 1 ? '' : nVal <= 3 ? ['\u00B2','\u00B3'][nVal-2] : '^' + nVal), viz.width / 2, 12);

                            // Cycle count
                            ctx.fillStyle = 'rgba(0,0,0,0.45)';
                            ctx.fillRect(viz.width / 2 - 80, viz.height - 30, 160, 22);
                            ctx.fillStyle = '#aaa';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText(nVal + ' color cycle' + (nVal > 1 ? 's' : '') + ' around origin', viz.width / 2, viz.height - 23);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(w = 1/z\\) maps the circle \\(|z - 1| = 1\\) to a vertical line. Which line?',
                    hint: 'The circle \\(|z-1|=1\\) passes through the origin (set \\(z=0\\)). Write the circle equation \\(|z-1|^2 = 1\\) in terms of \\(x\\) and \\(y\\), substitute \\(z = 1/w\\), and simplify.',
                    solution: 'The circle \\(|z-1| = 1\\) is \\(x^2 - 2x + 1 + y^2 = 1\\), i.e., \\(x^2 + y^2 = 2x\\), i.e., \\(|z|^2 = 2\\text{Re}(z)\\). Substituting \\(z = 1/w = \\overline{w}/|w|^2\\): \\(1/|w|^2 = 2\\text{Re}(w)/|w|^2\\), so \\(\\text{Re}(w) = 1/2\\). The image is the vertical line \\(u = 1/2\\). Since the circle passes through the origin, its image under inversion is a line, consistent with Theorem 1.3.'
                },
                {
                    question: 'What is the image of the vertical strip \\(0 < \\text{Re}(z) < 1\\) under \\(w = e^z\\)?',
                    hint: 'If \\(z = x + iy\\) with \\(0 < x < 1\\), what are the modulus and argument of \\(e^z\\)?',
                    solution: '\\(|e^z| = e^x\\), so \\(0 < x < 1\\) gives \\(1 < |w| < e\\). The argument \\(\\arg(w) = y\\) ranges over all of \\((-\\pi, \\pi]\\) as \\(y\\) varies. The image is the annulus \\(\\{w : 1 < |w| < e\\}\\).'
                },
                {
                    question: 'For \\(f(z) = z^3\\), describe the image of the sector \\(\\{z : |z| < 2,\\; 0 < \\arg z < \\pi/3\\}\\).',
                    hint: 'Use polar form: \\(z^3 = r^3 e^{3i\\theta}\\). What happens to the modulus bound and the angle range?',
                    solution: 'In polar form, \\(z^3 = r^3 e^{3i\\theta}\\). The modulus \\(r < 2\\) maps to \\(r^3 < 8\\). The angle range \\(0 < \\theta < \\pi/3\\) triples to \\(0 < 3\\theta < \\pi\\). So the image is \\(\\{w : |w| < 8,\\; 0 < \\arg w < \\pi\\}\\), the upper half of the disk of radius 8.'
                }
            ]
        }
    ]
});
