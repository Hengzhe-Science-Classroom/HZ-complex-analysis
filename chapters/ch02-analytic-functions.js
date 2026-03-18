window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Analytic Functions',
    subtitle: 'The Cauchy-Riemann equations and the magic of complex differentiability',
    sections: [
        // ================================================================
        // SECTION 1: Complex Differentiability
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Complex Differentiability',
            content: `
<h2>Complex Differentiability</h2>

<div class="env-block intuition">
    <div class="env-title">Why This Is Different</div>
    <div class="env-body">
        <p>In real analysis, the derivative of \\(f: \\mathbb{R} \\to \\mathbb{R}\\) at \\(x_0\\) requires the limit of \\((f(x_0 + h) - f(x_0))/h\\) to exist as \\(h \\to 0\\) along the real line. There are only two directions: left and right. For a complex function \\(f: \\mathbb{C} \\to \\mathbb{C}\\), the point \\(z_0 + h\\) can approach \\(z_0\\) from <em>infinitely many directions</em> in the plane. Requiring the same limit from every direction is an enormously stronger constraint.</p>
    </div>
</div>

<p>This extra rigidity is what makes complex analysis miraculous. A real function can be differentiable once but not twice (think of functions built from \\(|x|\\)). But a complex function that is differentiable even in a tiny open disk is automatically differentiable infinitely many times, representable by a convergent power series, and determined everywhere by its values on any convergent sequence of points. Being once complex-differentiable is enough to guarantee everything.</p>

<h3>The Contrast with Real Analysis</h3>

<p>Consider the function \\(f(x) = |x|\\) on \\(\\mathbb{R}\\). It is continuous everywhere but not differentiable at \\(x = 0\\). We can build smooth-looking functions with isolated points of non-differentiability. In complex analysis, this simply cannot happen: if \\(f\\) is complex-differentiable at every point of an open set, there are no "corner points" lurking anywhere.</p>

<p>Another contrast: in real analysis, knowing \\(f(x)\\) on \\([0, 1]\\) tells us nothing about \\(f(x)\\) on \\([2, 3]\\) without extra assumptions. But a complex-differentiable function defined on any open connected set is completely determined by its values on any tiny open disk inside that set. This is the <em>identity theorem</em>, a consequence of the power series representation we will prove in Chapter 7.</p>

<h3>The Program for This Chapter</h3>

<p>We proceed in three steps. First, we define complex differentiability rigorously and explore what the limit condition means geometrically. Second, we derive the <strong>Cauchy-Riemann equations</strong>, the algebraic fingerprint of complex differentiability expressed in terms of the real and imaginary parts. Third, we study the class of functions satisfying these conditions everywhere on an open set, called <strong>analytic</strong> or <strong>holomorphic</strong> functions, and discover their geometric meaning (conformality) and their connection to harmonic functions.</p>

<div class="env-block remark">
    <div class="env-title">Terminology</div>
    <div class="env-body">
        <p>The terms <em>analytic</em>, <em>holomorphic</em>, and <em>regular</em> are used interchangeably in the literature. Ahlfors prefers "analytic"; Stein and Shakarchi prefer "holomorphic." We will use both. (The term "regular" appears more often in older British texts.) These terms all mean: complex differentiable at every point of some open set.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(f: \\mathbb{R} \\to \\mathbb{R}\\) be given by \\(f(x) = x|x|\\). Show that \\(f\\) is differentiable at every point of \\(\\mathbb{R}\\) but \\(f\'\'(0)\\) does not exist. Explain why this behavior is impossible for an analytic complex function.',
                    hint: 'Compute \\(f\'(x)\\) for \\(x > 0\\), \\(x < 0\\), and use the limit definition at \\(x = 0\\). For the second part, recall that analyticity implies infinite differentiability.',
                    solution: 'For \\(x > 0\\): \\(f(x) = x^2\\), so \\(f\'(x) = 2x\\). For \\(x < 0\\): \\(f(x) = -x^2\\), so \\(f\'(x) = -2x\\). At \\(x=0\\): \\(\\lim_{h\\to 0} h|h|/h = \\lim_{h\\to 0} |h| = 0\\), so \\(f\'(0) = 0\\). Thus \\(f\'(x) = 2|x|\\), which is continuous but not differentiable at 0. For a complex analytic function, differentiability on an open set implies the function equals its Taylor series, hence is infinitely differentiable. A "first differentiable but not second" scenario is impossible.'
                },
                {
                    question: 'Explain intuitively why the limit \\(\\lim_{h \\to 0} \\frac{f(z_0 + h) - f(z_0)}{h}\\) in \\(\\mathbb{C}\\) is more restrictive than the analogous limit in \\(\\mathbb{R}\\).',
                    hint: 'In \\(\\mathbb{R}\\), \\(h \\to 0\\) means \\(h \\to 0^+\\) or \\(h \\to 0^-\\). In \\(\\mathbb{C}\\), describe the directions available.',
                    solution: 'In \\(\\mathbb{R}\\), the limit needs to agree from only two directions. In \\(\\mathbb{C}\\), \\(h\\) can approach 0 along any curve: horizontally (\\(h = t\\)), vertically (\\(h = it\\)), diagonally, or along a spiral. The limit must be the same number regardless of path. This is why the Cauchy-Riemann equations (which express the agreement between horizontal and vertical approach) are necessary conditions.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: The Complex Derivative
        // ================================================================
        {
            id: 'sec-derivative',
            title: 'The Complex Derivative',
            content: `
<h2>The Complex Derivative</h2>

<div class="env-block definition">
    <div class="env-title">Definition 2.1 (Complex Derivative)</div>
    <div class="env-body">
        <p>Let \\(f: U \\to \\mathbb{C}\\) where \\(U \\subseteq \\mathbb{C}\\) is open. The <strong>derivative of \\(f\\) at \\(z_0 \\in U\\)</strong> is</p>
        \\[f'(z_0) = \\lim_{h \\to 0} \\frac{f(z_0 + h) - f(z_0)}{h}\\]
        <p>provided this limit exists and is the same for every sequence \\(h_n \\to 0\\) with \\(h_n \\neq 0\\). If \\(f'(z_0)\\) exists, we say \\(f\\) is <strong>complex differentiable</strong> at \\(z_0\\).</p>
    </div>
</div>

<p>The formal definition looks identical to the real case, but the division \\(1/h\\) is now complex division: if \\(h = a + bi\\) then \\(1/h = (a - bi)/(a^2 + b^2)\\). The result is a complex number, and the limit requires the ratio to converge to the same complex number regardless of how \\(h \\to 0\\) in the plane.</p>

<h3>Basic Examples</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = z^2\\)</div>
    <div class="env-body">
        <p>\\[\\frac{(z_0 + h)^2 - z_0^2}{h} = \\frac{2z_0 h + h^2}{h} = 2z_0 + h \\to 2z_0\\]</p>
        <p>as \\(h \\to 0\\), regardless of direction. So \\((z^2)' = 2z\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = \\bar{z}\\) (complex conjugate)</div>
    <div class="env-body">
        <p>Here \\(f(z_0 + h) = \\overline{z_0 + h} = \\bar{z}_0 + \\bar{h}\\), so</p>
        \\[\\frac{f(z_0 + h) - f(z_0)}{h} = \\frac{\\bar{h}}{h}.\\]
        <p>If \\(h = t \\in \\mathbb{R}\\), this ratio is \\(t/t = 1\\). If \\(h = it\\), this ratio is \\(-it/it = -1\\). The limit depends on the direction, so the derivative does not exist at any point. The conjugate function is <em>nowhere</em> complex differentiable.</p>
    </div>
</div>

<h3>Geometric Meaning of \\(f'(z_0)\\)</h3>

<p>Write \\(f'(z_0) = |f'(z_0)| e^{i\\theta}\\) in polar form. Near \\(z_0\\), the linear approximation gives</p>
\\[f(z_0 + h) \\approx f(z_0) + f'(z_0) \\cdot h.\\]
<p>Multiplication by \\(f'(z_0)\\) rotates \\(h\\) by angle \\(\\theta = \\arg(f'(z_0))\\) and scales its length by \\(|f'(z_0)|\\). Therefore:</p>
<ul>
    <li>\\(|f'(z_0)|\\) is the <strong>local scaling factor</strong> (how much \\(f\\) stretches lengths near \\(z_0\\))</li>
    <li>\\(\\arg(f'(z_0))\\) is the <strong>local rotation angle</strong> (how much \\(f\\) rotates directions near \\(z_0\\))</li>
</ul>
<p>Crucially, this rotation and scaling is the <em>same in every direction</em> from \\(z_0\\). This directional uniformity is precisely the content of the Cauchy-Riemann equations.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.1 (Differentiation Rules)</div>
    <div class="env-body">
        <p>The usual real-variable rules carry over verbatim to complex derivatives:</p>
        <ul>
            <li><strong>Power rule:</strong> \\((z^n)' = nz^{n-1}\\) for \\(n \\in \\mathbb{Z}\\)</li>
            <li><strong>Sum rule:</strong> \\((f+g)' = f' + g'\\)</li>
            <li><strong>Product rule:</strong> \\((fg)' = f'g + fg'\\)</li>
            <li><strong>Chain rule:</strong> \\((f \\circ g)'(z) = f'(g(z)) \\cdot g'(z)\\)</li>
        </ul>
        <p>The proofs are identical to the real case, since they use only algebraic manipulations of the limit definition.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-complex-derivative"></div>
`,
            visualizations: [
                {
                    id: 'viz-complex-derivative',
                    title: 'The Derivative as Local Rotation and Scaling',
                    description: 'Drag z\u2080 in the domain (left). A small grid around z\u2080 is mapped by f to the image (right). The derivative f\'(z\u2080) tells you the rotation angle and scaling factor. Switch between f(z)=z\u00b2, f(z)=z\u00b3, and f(z)=e^z.',
                    setup: function(body, controls) {
                        var W = 580, H = 320;
                        var viz = new VizEngine(body, { width: W, height: H, originX: W/4, originY: H/2, scale: 50 });

                        var funcs = [
                            {
                                name: 'f(z) = z\u00b2',
                                f: function(re, im) { return [re*re - im*im, 2*re*im]; },
                                df: function(re, im) { return [2*re, 2*im]; }
                            },
                            {
                                name: 'f(z) = z\u00b3',
                                f: function(re, im) {
                                    return [re*re*re - 3*re*im*im, 3*re*re*im - im*im*im];
                                },
                                df: function(re, im) {
                                    return [3*(re*re - im*im), 6*re*im];
                                }
                            },
                            {
                                name: 'f(z) = e^z',
                                f: function(re, im) {
                                    var er = Math.exp(re);
                                    return [er*Math.cos(im), er*Math.sin(im)];
                                },
                                df: function(re, im) {
                                    var er = Math.exp(re);
                                    return [er*Math.cos(im), er*Math.sin(im)];
                                }
                            }
                        ];

                        var fIdx = 0;
                        var z0 = { x: 0.8, y: 0.5 };

                        // Selector buttons
                        var btnRow = document.createElement('div');
                        btnRow.style.cssText = 'display:flex;gap:6px;margin-bottom:6px;';
                        funcs.forEach(function(fn, i) {
                            var b = document.createElement('button');
                            b.textContent = fn.name;
                            b.style.cssText = 'padding:3px 10px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;cursor:pointer;';
                            b.addEventListener('click', function() {
                                fIdx = i;
                                btnRow.querySelectorAll('button').forEach(function(bb, ii) {
                                    bb.style.background = ii === i ? '#3fb9a0' : '#1a1a40';
                                    bb.style.color = ii === i ? '#0c0c20' : '#c9d1d9';
                                });
                                draw();
                            });
                            if (i === 0) { b.style.background = '#3fb9a0'; b.style.color = '#0c0c20'; }
                            btnRow.appendChild(b);
                        });
                        controls.appendChild(btnRow);

                        // Draggable point
                        var drg = viz.addDraggable('z0', z0.x, z0.y, viz.colors.orange, 8, function(x, y) {
                            z0.x = x; z0.y = y; draw();
                        });

                        var halfW = W / 2;

                        function drawPanel(isRight) {
                            var ctx = viz.ctx;
                            ctx.save();
                            if (isRight) ctx.translate(halfW, 0);
                            // Background
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, halfW, H);
                            // Divider
                            if (!isRight) {
                                ctx.strokeStyle = '#2a2a50';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(halfW - 1, 0); ctx.lineTo(halfW - 1, H); ctx.stroke();
                            }
                            ctx.restore();
                        }

                        function drawLocalGrid(ctx, cx, cy, scaleFactor, rotAngle, originSx, originSy, scale, color, label) {
                            var gs = 0.25; // grid spacing in math units
                            var steps = [-1, 0, 1];
                            ctx.save();
                            ctx.translate(originSx, originSy);

                            // Draw transformed grid lines
                            var cosA = Math.cos(rotAngle), sinA = Math.sin(rotAngle);
                            var sf = scaleFactor * scale;

                            ctx.strokeStyle = color + '60';
                            ctx.lineWidth = 1;

                            // Horizontal lines (constant im)
                            for (var j = -1; j <= 1; j++) {
                                ctx.beginPath();
                                for (var ii = -20; ii <= 20; ii++) {
                                    var lx = (ii * gs - cx) * scale;
                                    var ly = -(j * gs - cy) * scale;
                                    // transform by derivative: rotation + scaling
                                    var tx = cosA * lx - sinA * ly;
                                    var ty = sinA * lx + cosA * ly;
                                    tx *= scaleFactor; ty *= scaleFactor;
                                    if (ii === -20) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
                                }
                                ctx.stroke();
                            }
                            // Vertical lines (constant re)
                            for (var i = -1; i <= 1; i++) {
                                ctx.beginPath();
                                for (var jj = -20; jj <= 20; jj++) {
                                    var lx2 = (i * gs - cx) * scale;
                                    var ly2 = -(jj * gs - cy) * scale;
                                    var tx2 = cosA * lx2 - sinA * ly2;
                                    var ty2 = sinA * lx2 + cosA * ly2;
                                    tx2 *= scaleFactor; ty2 *= scaleFactor;
                                    if (jj === -20) ctx.moveTo(tx2, ty2); else ctx.lineTo(tx2, ty2);
                                }
                                ctx.stroke();
                            }

                            // Draw center point
                            ctx.fillStyle = color;
                            ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill();

                            // Label
                            ctx.fillStyle = color;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                            ctx.fillText(label, 8, -8);
                            ctx.restore();
                        }

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.clearRect(0, 0, W, H);

                            // Left panel: domain
                            ctx.save();
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, halfW, H);
                            ctx.restore();

                            // Left panel grid and axes
                            ctx.save();
                            // draw grid in left half only
                            ctx.beginPath(); ctx.rect(0, 0, halfW, H); ctx.clip();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            ctx.restore();

                            // Panel labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Domain (z-plane)', halfW/2, 6);

                            // Draw small grid around z0 in domain
                            var [dsx, dsy] = viz.toScreen(z0.x, z0.y);
                            drawLocalGrid(ctx, z0.x, z0.y, 1, 0, dsx, dsy, viz.scale, viz.colors.blue, 'z\u2080');

                            // Draggable point
                            viz.drawDraggables();

                            // Compute f(z0) and f'(z0)
                            var fn = funcs[fIdx];
                            var [fre, fim] = fn.f(z0.x, z0.y);
                            var [dre, dim] = fn.df(z0.x, z0.y);

                            var mag = Math.sqrt(dre*dre + dim*dim);
                            var ang = Math.atan2(dim, dre);

                            // Right panel: image
                            ctx.save();
                            ctx.translate(halfW, 0);
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, halfW, H);

                            // Right axes: centered at halfW/2, H/2
                            var rox = halfW/2, roy = H/2;
                            // grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = -5; gx <= 5; gx++) {
                                var sx = rox + gx * viz.scale;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, H); ctx.stroke();
                            }
                            for (var gy = -5; gy <= 5; gy++) {
                                var sy = roy - gy * viz.scale;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(halfW, sy); ctx.stroke();
                            }
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(0, roy); ctx.lineTo(halfW, roy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rox, 0); ctx.lineTo(rox, H); ctx.stroke();

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Image (w-plane)', halfW/2, 6);

                            // Clamp image center to visible area
                            var clampedFre = Math.max(-halfW/(2*viz.scale)+0.3, Math.min(halfW/(2*viz.scale)-0.3, fre));
                            var clampedFim = Math.max(-(H)/(2*viz.scale)+0.3, Math.min((H)/(2*viz.scale)-0.3, fim));
                            var isx = rox + clampedFre * viz.scale;
                            var isy = roy - clampedFim * viz.scale;

                            drawLocalGrid(ctx, 0, 0, mag, ang, isx, isy, viz.scale, viz.colors.teal, 'f(z\u2080)');

                            ctx.restore();

                            // Info panel
                            var infoY = H - 38;
                            ctx.fillStyle = '#12122a';
                            ctx.fillRect(4, infoY, W - 8, 34);
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.strokeRect(4, infoY, W - 8, 34);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            ctx.fillText(
                                'z\u2080 = ' + z0.x.toFixed(2) + (z0.y >= 0 ? '+' : '') + z0.y.toFixed(2) + 'i' +
                                '    f(z\u2080) = ' + fre.toFixed(2) + (fim >= 0 ? '+' : '') + fim.toFixed(2) + 'i' +
                                '    |f\'| = ' + mag.toFixed(3) +
                                '    arg(f\') = ' + (ang * 180 / Math.PI).toFixed(1) + '\u00b0',
                                14, infoY + 17
                            );

                            // Divider
                            ctx.strokeStyle = '#2a2a50'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, H); ctx.stroke();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Using the definition of the complex derivative, show that \\(f(z) = z^3\\) has derivative \\(f\'(z) = 3z^2\\).',
                    hint: 'Expand \\((z + h)^3\\) and simplify the difference quotient, then take \\(h \\to 0\\).',
                    solution: '\\(\\frac{(z+h)^3 - z^3}{h} = \\frac{3z^2h + 3zh^2 + h^3}{h} = 3z^2 + 3zh + h^2 \\to 3z^2\\) as \\(h \\to 0\\).'
                },
                {
                    question: 'Show that \\(f(z) = \\text{Re}(z) = x\\) is nowhere complex differentiable.',
                    hint: 'Approach along the real axis (\\(h = t \\in \\mathbb{R}\\)) and along the imaginary axis (\\(h = it\\)) and compare limits.',
                    solution: 'Along \\(h = t\\): \\(\\frac{\\text{Re}(z+t) - \\text{Re}(z)}{t} = \\frac{t}{t} = 1\\). Along \\(h = it\\): \\(\\frac{\\text{Re}(z+it) - \\text{Re}(z)}{it} = \\frac{0}{it} = 0\\). The limits differ, so no derivative exists at any point.'
                },
                {
                    question: 'If \\(f\'(z_0) = 3 + 4i\\), what is the local scaling factor and rotation angle of \\(f\\) near \\(z_0\\)?',
                    hint: 'Convert \\(3 + 4i\\) to polar form.',
                    solution: '\\(|f\'(z_0)| = \\sqrt{9 + 16} = 5\\). So \\(f\\) scales lengths by a factor of 5 near \\(z_0\\). The rotation angle is \\(\\arg(3 + 4i) = \\arctan(4/3) \\approx 53.13^\\circ\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Cauchy-Riemann Equations
        // ================================================================
        {
            id: 'sec-cauchy-riemann',
            title: 'Cauchy-Riemann Equations',
            content: `
<h2>The Cauchy-Riemann Equations</h2>

<p>Every complex function \\(f: U \\to \\mathbb{C}\\) can be written as</p>
\\[f(x + iy) = u(x, y) + i\\,v(x, y)\\]
<p>where \\(u, v: U \\to \\mathbb{R}\\) are real-valued functions. If \\(f\\) is complex differentiable at \\(z_0 = x_0 + iy_0\\), we can compute the derivative by approaching along two specific directions and equating the results.</p>

<h3>Derivation</h3>

<p><strong>Horizontal approach:</strong> Take \\(h = \\Delta x \\in \\mathbb{R}\\):</p>
\\[f'(z_0) = \\lim_{\\Delta x \\to 0} \\frac{u(x_0+\\Delta x, y_0) - u(x_0,y_0)}{\\Delta x} + i\\frac{v(x_0+\\Delta x, y_0) - v(x_0,y_0)}{\\Delta x} = u_x + iv_x.\\]

<p><strong>Vertical approach:</strong> Take \\(h = i\\Delta y\\):</p>
\\[f'(z_0) = \\lim_{\\Delta y \\to 0} \\frac{u(x_0, y_0+\\Delta y) - u(x_0,y_0)}{i\\,\\Delta y} + i\\frac{v(x_0, y_0+\\Delta y) - v(x_0,y_0)}{i\\,\\Delta y} = \\frac{u_y}{i} + v_y = -iu_y + v_y = v_y - iu_y.\\]

<p>Since both expressions equal \\(f'(z_0)\\), equating real and imaginary parts gives:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.2 (Cauchy-Riemann Equations)</div>
    <div class="env-body">
        <p>If \\(f = u + iv\\) is complex differentiable at \\(z_0\\), then at \\(z_0\\):</p>
        \\[u_x = v_y \\quad \\text{and} \\quad u_y = -v_x.\\]
        <p>These are the <strong>Cauchy-Riemann equations</strong>. Moreover, when they hold,</p>
        \\[f'(z_0) = u_x + iv_x = v_y - iu_y.\\]
    </div>
</div>

<h3>Sufficient Conditions</h3>

<p>The CR equations are necessary for complex differentiability but not quite sufficient on their own. The additional hypothesis needed is that the partial derivatives be continuous.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.3 (Sufficiency of CR Equations)</div>
    <div class="env-body">
        <p>Suppose \\(f = u + iv\\) is defined on an open set \\(U\\), and that \\(u, v\\) have continuous first partial derivatives on \\(U\\) satisfying the Cauchy-Riemann equations. Then \\(f\\) is complex differentiable at every point of \\(U\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Why Continuity of Partials Matters</div>
    <div class="env-body">
        <p>A pathological real function can satisfy \\(u_x = v_y\\) and \\(u_y = -v_x\\) at a single point without being complex differentiable there (the partials exist but the function is not real-differentiable in the sense of \\(f(z_0 + h) = f(z_0) + Lh + o(|h|)\\)). Continuous partials guarantee real differentiability, and then the CR equations promote real differentiability to complex differentiability.</p>
    </div>
</div>

<h3>Example: Verifying CR for \\(e^z\\)</h3>

<p>Write \\(e^z = e^{x+iy} = e^x \\cos y + i e^x \\sin y\\). So \\(u = e^x \\cos y\\), \\(v = e^x \\sin y\\).</p>
\\[u_x = e^x \\cos y = v_y, \\qquad u_y = -e^x \\sin y = -v_x.\\]
<p>The CR equations hold everywhere, and \\(f'(z) = u_x + iv_x = e^x \\cos y + i e^x \\sin y = e^z\\). So \\((e^z)' = e^z\\), exactly as expected from the Taylor series.</p>

<div class="viz-placeholder" data-viz="viz-cauchy-riemann"></div>
`,
            visualizations: [
                {
                    id: 'viz-cauchy-riemann',
                    title: 'CR Equations for f(z) = z\u00b2',
                    description: 'Left: heatmap of u = x\u00b2 \u2212 y\u00b2. Right: heatmap of v = 2xy. Drag the point to see u_x, v_y (which must be equal) and u_y, \u2212v_x (which must be equal) at that location. The CR equations hold everywhere.',
                    setup: function(body, controls) {
                        var W = 580, H = 300;
                        var viz = new VizEngine(body, { width: W, height: H, originX: W/4, originY: H/2, scale: 50 });

                        var pt = { x: 0.7, y: 0.5 };
                        viz.addDraggable('pt', pt.x, pt.y, viz.colors.orange, 8, function(x, y) {
                            pt.x = x; pt.y = y; draw();
                        });

                        var halfW = W / 2;
                        var xRange = [-2, 2], yRange = [-1.5, 1.5];

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.clearRect(0, 0, W, H);

                            // Left heatmap: u = x^2 - y^2
                            ctx.save();
                            ctx.beginPath(); ctx.rect(0, 0, halfW, H); ctx.clip();
                            viz.drawHeatmap(function(x, y) { return x*x - y*y; }, xRange, yRange, 'coolwarm');
                            ctx.restore();

                            // Right heatmap: v = 2xy
                            ctx.save();
                            ctx.translate(halfW, 0);
                            ctx.beginPath(); ctx.rect(0, 0, halfW, H); ctx.clip();

                            // Manual heatmap for right panel with shifted coords
                            var pw = viz.canvas.width / 2;
                            var ph = viz.canvas.height;
                            var dpr = window.devicePixelRatio || 1;
                            var imgData = ctx.createImageData(Math.floor(halfW * dpr), Math.floor(H * dpr));
                            var data = imgData.data;
                            var vMin = Infinity, vMax = -Infinity;
                            var vals = new Float64Array(Math.floor(halfW * dpr) * Math.floor(H * dpr));
                            var iW = Math.floor(halfW * dpr), iH = Math.floor(H * dpr);
                            for (var py = 0; py < iH; py++) {
                                for (var px2 = 0; px2 < iW; px2++) {
                                    var x2 = xRange[0] + (xRange[1] - xRange[0]) * px2 / iW;
                                    var y2 = yRange[1] - (yRange[1] - yRange[0]) * py / iH;
                                    var val = 2 * x2 * y2;
                                    vals[py * iW + px2] = val;
                                    if (isFinite(val)) { vMin = Math.min(vMin, val); vMax = Math.max(vMax, val); }
                                }
                            }
                            var range2 = vMax - vMin || 1;
                            for (var i = 0; i < iW * iH; i++) {
                                var t = Math.max(0, Math.min(1, (vals[i] - vMin) / range2));
                                var rgb = VizEngine.colormapSample(t, 'coolwarm');
                                data[i*4] = rgb[0]; data[i*4+1] = rgb[1]; data[i*4+2] = rgb[2]; data[i*4+3] = 255;
                            }
                            ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
                            ctx.putImageData(imgData, Math.floor(halfW * dpr), 0);
                            ctx.restore();
                            ctx.restore();

                            // Draw point on left panel
                            var [sx, sy] = viz.toScreen(pt.x, pt.y);
                            if (sx >= 0 && sx <= halfW) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(sx, sy, 7, 0, Math.PI * 2); ctx.fill();
                                ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.arc(sx, sy, 7, 0, Math.PI * 2); ctx.stroke();
                            }

                            // Draw point on right panel (same math coords)
                            var rx = halfW + (halfW/2) + (pt.x - (xRange[0]+xRange[1])/2) / (xRange[1]-xRange[0]) * halfW;
                            var ry = H/2 - (pt.y / (yRange[1]-yRange[0]) * H);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(rx, ry, 7, 0, Math.PI * 2); ctx.fill();
                            ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.arc(rx, ry, 7, 0, Math.PI * 2); ctx.stroke();

                            // Panel labels
                            ctx.fillStyle = '#000000aa';
                            ctx.fillRect(halfW/2 - 80, 6, 160, 22);
                            ctx.fillRect(halfW + halfW/2 - 80, 6, 160, 22);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('u(x,y) = x\u00b2 \u2212 y\u00b2', halfW/2, 17);
                            ctx.fillText('v(x,y) = 2xy', halfW + halfW/2, 17);

                            // CR verification
                            var x0 = pt.x, y0 = pt.y;
                            var ux = 2*x0;      // u_x
                            var uy = -2*y0;     // u_y
                            var vx = 2*y0;      // v_x
                            var vy = 2*x0;      // v_y
                            var crOk1 = Math.abs(ux - vy) < 1e-10;
                            var crOk2 = Math.abs(uy + vx) < 1e-10;

                            var infoY = H - 44;
                            ctx.fillStyle = '#12122a';
                            ctx.fillRect(4, infoY, W - 8, 40);
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.strokeRect(4, infoY, W - 8, 40);

                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText(
                                'At z\u2080 = (' + x0.toFixed(2) + ', ' + y0.toFixed(2) + '):   ' +
                                'u_x = ' + ux.toFixed(3) + ',  v_y = ' + vy.toFixed(3) +
                                '  \u27a4 u_x = v_y: ' + (crOk1 ? '\u2713' : '\u2717') +
                                '      u_y = ' + uy.toFixed(3) + ',  \u2212v_x = ' + (-vx).toFixed(3) +
                                '  \u27a4 u_y = \u2212v_x: ' + (crOk2 ? '\u2713' : '\u2717'),
                                14, infoY + 14
                            );
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText(
                                'f\'(z\u2080) = u_x + iv_x = ' + ux.toFixed(3) + (vx >= 0 ? '+' : '') + vx.toFixed(3) + 'i' +
                                '    (= 2z\u2080 = ' + (2*x0).toFixed(3) + (2*y0 >= 0 ? '+' : '') + (2*y0).toFixed(3) + 'i)',
                                14, infoY + 30
                            );

                            // Divider
                            ctx.strokeStyle = '#2a2a50'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, H); ctx.stroke();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify the Cauchy-Riemann equations for \\(f(z) = e^z\\). Show that \\(f\'(z) = e^z\\).',
                    hint: 'Write \\(e^z = e^x \\cos y + i e^x \\sin y\\). Compute all four partial derivatives.',
                    solution: '\\(u = e^x \\cos y\\), \\(v = e^x \\sin y\\). Then \\(u_x = e^x \\cos y = v_y\\) and \\(u_y = -e^x \\sin y = -v_x\\). CR holds. \\(f\'(z) = u_x + iv_x = e^x \\cos y + ie^x \\sin y = e^z\\).'
                },
                {
                    question: 'Show that \\(f(z) = z^n\\) satisfies the CR equations and compute \\(f\'(z)\\) using the CR formula.',
                    hint: 'Use the binomial expansion to write \\(u\\) and \\(v\\) for \\(z^n = (x+iy)^n\\), or use complex exponential: \\(z = re^{i\\theta}\\).',
                    solution: 'The cleanest approach: the limit definition directly gives \\(f\'(z) = nz^{n-1}\\) (same algebra as real case). The CR equations then hold because \\(f\'(z) = u_x + iv_x = v_y - iu_y = nz^{n-1}\\).'
                },
                {
                    question: 'Find all points where \\(f(z) = z \\text{Re}(z) = (x^2 + ixy)\\) is complex differentiable.',
                    hint: 'Write \\(u = x^2\\), \\(v = xy\\). Apply the CR equations and find where both hold.',
                    solution: '\\(u_x = 2x\\), \\(v_y = x\\). CR requires \\(2x = x\\), so \\(x = 0\\). \\(u_y = 0\\), \\(-v_x = -y\\). CR requires \\(0 = -y\\), so \\(y = 0\\). The function is complex differentiable only at \\(z = 0\\), so it is not analytic anywhere.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Analytic Functions
        // ================================================================
        {
            id: 'sec-analytic',
            title: 'Analytic (Holomorphic) Functions',
            content: `
<h2>Analytic Functions</h2>

<div class="env-block definition">
    <div class="env-title">Definition 2.2 (Analytic / Holomorphic)</div>
    <div class="env-body">
        <p>A function \\(f: U \\to \\mathbb{C}\\) defined on an open set \\(U \\subseteq \\mathbb{C}\\) is called <strong>analytic</strong> (or <strong>holomorphic</strong>) on \\(U\\) if it is complex differentiable at every point of \\(U\\).</p>
        <p>If \\(f\\) is analytic on all of \\(\\mathbb{C}\\), we call \\(f\\) an <strong>entire function</strong>.</p>
    </div>
</div>

<p>Examples of entire functions: polynomials \\(p(z)\\), \\(e^z\\), \\(\\sin z\\), \\(\\cos z\\). Rational functions are analytic away from their poles.</p>

<h3>Non-Analytic vs. Non-Differentiable</h3>

<p>A function can be differentiable at isolated points without being analytic. For instance, \\(f(z) = |z|^2 = x^2 + y^2\\) satisfies the CR equations only at \\(z = 0\\), so it is differentiable at the origin but not analytic (there is no open neighborhood of 0 where it is differentiable).</p>

<h3>The Rigidity of Analytic Functions</h3>

<p>Analyticity is far more rigid than real differentiability. The key results (proved in later chapters) are:</p>

<ol>
    <li><strong>Analyticity implies infinite differentiability:</strong> If \\(f\\) is analytic on \\(U\\), then \\(f', f'', f''', \\ldots\\) all exist and are analytic on \\(U\\).</li>
    <li><strong>Analyticity implies power series representation:</strong> Around any \\(z_0 \\in U\\), \\(f(z) = \\sum_{n=0}^\\infty a_n (z - z_0)^n\\) with positive radius of convergence. (Thus "analytic" in the complex sense coincides with "analytic" as power series.)</li>
    <li><strong>Identity theorem:</strong> If two analytic functions agree on a sequence of points with an accumulation point in \\(U\\), they agree everywhere on \\(U\\).</li>
    <li><strong>Maximum modulus principle:</strong> If \\(|f|\\) attains its maximum at an interior point of \\(U\\), then \\(f\\) is constant.</li>
</ol>

<p>These results have no real analogues of comparable strength. A real function that equals a convergent power series on \\((0, 1)\\) need not equal any power series on \\((2, 3)\\).</p>

<div class="env-block remark">
    <div class="env-title">The \\(\\bar{\\partial}\\) Operator</div>
    <div class="env-body">
        <p>Define the Wirtinger derivatives:</p>
        \\[\\frac{\\partial}{\\partial z} = \\frac{1}{2}\\left(\\frac{\\partial}{\\partial x} - i\\frac{\\partial}{\\partial y}\\right), \\qquad \\frac{\\partial}{\\partial \\bar{z}} = \\frac{1}{2}\\left(\\frac{\\partial}{\\partial x} + i\\frac{\\partial}{\\partial y}\\right).\\]
        <p>Then the CR equations \\(u_x = v_y\\) and \\(u_y = -v_x\\) are equivalent to \\(\\frac{\\partial f}{\\partial \\bar{z}} = 0\\). Analytic functions are precisely those with \\(\\bar{\\partial} f = 0\\). This is the starting point for several variable complex analysis and the theory of \\(\\bar{\\partial}\\)-equations.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-not-analytic"></div>
`,
            visualizations: [
                {
                    id: 'viz-not-analytic',
                    title: 'Domain Coloring: Analytic vs. Non-Analytic',
                    description: 'Left: domain coloring of f(z) = z\u00b2 (analytic). Right: f(z) = |z|\u00b2 = z\u00b7\u0305z (not analytic). Analytic functions have characteristic "swirling" hue patterns. |z|\u00b2 looks flat/radial \u2014 the coloring reveals that no interesting complex structure exists.',
                    setup: function(body, controls) {
                        var W = 580, H = 300;
                        var viz = new VizEngine(body, { width: W, height: H, originX: W/2, originY: H/2, scale: 60 });
                        var halfW = W / 2;
                        var range = [-2, 2];

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.clearRect(0, 0, W, H);

                            // Left: z^2 domain coloring
                            ctx.save();
                            ctx.beginPath(); ctx.rect(0, 0, halfW, H); ctx.clip();
                            viz.drawDomainColoring(function(re, im) {
                                return [re*re - im*im, 2*re*im];
                            }, range, range);
                            ctx.restore();

                            // Right: |z|^2 = x^2 + y^2 (real-valued, so imaginary part = 0)
                            // Draw manually for right half
                            var dpr = window.devicePixelRatio || 1;
                            var iW = Math.floor(halfW * dpr), iH = Math.floor(H * dpr);
                            var imgData = ctx.createImageData(iW, iH);
                            var data = imgData.data;
                            for (var py = 0; py < iH; py++) {
                                for (var px = 0; px < iW; px++) {
                                    var re = range[0] + (range[1] - range[0]) * px / iW;
                                    var im = range[1] - (range[1] - range[0]) * py / iH;
                                    // f(z) = |z|^2 as complex function: u = x^2+y^2, v=0
                                    var u = re*re + im*im;
                                    var v = 0;
                                    var arg = Math.atan2(v, u);
                                    var mag = Math.sqrt(u*u + v*v);
                                    var hue = (arg / Math.PI + 1) / 2;
                                    var light = 1 - 1 / (1 + mag * 0.3);
                                    var rgb = VizEngine.hslToRgb(hue, 0.8, light);
                                    var idx = (py * iW + px) * 4;
                                    data[idx] = rgb[0]; data[idx+1] = rgb[1]; data[idx+2] = rgb[2]; data[idx+3] = 255;
                                }
                            }
                            ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
                            ctx.putImageData(imgData, Math.floor(halfW * dpr), 0);
                            ctx.restore();

                            // Labels
                            ctx.fillStyle = '#000000aa';
                            ctx.fillRect(halfW/2 - 60, 6, 120, 22);
                            ctx.fillRect(halfW + halfW/2 - 60, 6, 120, 22);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('f(z) = z\u00b2 (analytic)', halfW/2, 17);
                            ctx.fillText('f(z) = |z|\u00b2 (not analytic)', halfW + halfW/2, 17);

                            // Annotation
                            ctx.fillStyle = '#0c0c20cc';
                            ctx.fillRect(4, H - 34, W - 8, 30);
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.strokeRect(4, H - 34, W - 8, 30);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText(
                                'Analytic: hue rotates n times around any loop encircling a zero (winding number = order). Non-analytic: hue is constant on circles (no winding).',
                                W/2, H - 19
                            );

                            // Divider
                            ctx.strokeStyle = '#2a2a50'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, H); ctx.stroke();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Determine where \\(f(z) = |z|^2\\) is complex differentiable, and explain why it is not analytic on any open set.',
                    hint: 'Write \\(u = x^2 + y^2\\), \\(v = 0\\). Apply CR equations.',
                    solution: '\\(u_x = 2x\\), \\(v_y = 0\\) requires \\(x = 0\\). \\(u_y = 2y\\), \\(-v_x = 0\\) requires \\(y = 0\\). Differentiable only at \\(z = 0\\). Any open set contains points other than the origin, so \\(f\\) is not analytic on any open set.'
                },
                {
                    question: 'Show that the composition of two analytic functions is analytic, using the chain rule.',
                    hint: 'If \\(f\\) is analytic on \\(U\\) and \\(g\\) is analytic on \\(V\\) with \\(f(U) \\subseteq V\\), apply the chain rule at each point.',
                    solution: 'For any \\(z \\in U\\), \\((g \\circ f)\'(z) = g\'(f(z)) \\cdot f\'(z)\\) by the chain rule. Since \\(f\'(z)\\) and \\(g\'(f(z))\\) both exist, so does \\((g \\circ f)\'(z)\\). As \\(z\\) ranges over \\(U\\), \\(g \\circ f\\) is complex differentiable at every point, hence analytic.'
                },
                {
                    question: 'Prove that if \\(f\\) is analytic on a connected open set \\(U\\) and \\(f\'(z) = 0\\) for all \\(z \\in U\\), then \\(f\\) is constant on \\(U\\).',
                    hint: 'If \\(f\' = 0\\), what does that say about \\(u_x, u_y, v_x, v_y\\)? What does calculus say about functions with zero gradient?',
                    solution: '\\(f\' = u_x + iv_x = 0\\) means \\(u_x = v_x = 0\\). By CR, \\(v_y = u_x = 0\\) and \\(u_y = -v_x = 0\\). So all partial derivatives of \\(u\\) and \\(v\\) vanish on \\(U\\). By real calculus (connectedness is needed), \\(u\\) and \\(v\\) are each constant on \\(U\\), hence \\(f = u + iv\\) is constant.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Conformality
        // ================================================================
        {
            id: 'sec-conformal',
            title: 'Conformality',
            content: `
<h2>Conformality: Analytic Functions Preserve Angles</h2>

<p>We have seen that near \\(z_0\\), an analytic function \\(f\\) acts like multiplication by \\(f'(z_0)\\): rotation by \\(\\arg(f'(z_0))\\) and scaling by \\(|f'(z_0)|\\). Crucially, this rotation is the <em>same for every direction</em> from \\(z_0\\). This means that angles between curves are preserved.</p>

<div class="env-block definition">
    <div class="env-title">Definition 2.3 (Conformal Map)</div>
    <div class="env-body">
        <p>A map \\(f: U \\to V\\) is <strong>conformal at \\(z_0\\)</strong> if it preserves angles between curves at \\(z_0\\): whenever two smooth curves \\(\\gamma_1, \\gamma_2\\) intersect at \\(z_0\\), the angle between their tangent vectors equals the angle between the tangent vectors of \\(f \\circ \\gamma_1\\) and \\(f \\circ \\gamma_2\\) at \\(f(z_0)\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.4 (Analytic Implies Conformal)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic at \\(z_0\\) and \\(f'(z_0) \\neq 0\\), then \\(f\\) is conformal at \\(z_0\\).</p>
    </div>
</div>

<p><strong>Proof sketch.</strong> Let \\(\\gamma(t)\\) be a smooth curve with \\(\\gamma(0) = z_0\\). Its tangent direction at \\(z_0\\) is \\(\\gamma'(0)\\). The image curve \\((f \\circ \\gamma)(t)\\) has tangent</p>
\\[(f \\circ \\gamma)'(0) = f'(\\gamma(0)) \\cdot \\gamma'(0) = f'(z_0) \\cdot \\gamma'(0).\\]
<p>This tangent is \\(\\gamma'(0)\\) rotated by \\(\\arg(f'(z_0))\\) and scaled by \\(|f'(z_0)|\\). Two curves \\(\\gamma_1, \\gamma_2\\) meeting at \\(z_0\\) have their tangents each rotated by the <em>same</em> angle \\(\\arg(f'(z_0))\\). Since both tangents rotate equally, the angle between them is unchanged. \\(\\square\\)</p>

<h3>Where Conformality Fails</h3>

<p>At a critical point \\(z_0\\) where \\(f'(z_0) = 0\\), angles are not preserved. If \\(f(z) - f(z_0) \\approx c(z - z_0)^k\\) with \\(c \\neq 0\\) and \\(k \\geq 2\\), then angles are multiplied by \\(k\\). For example, \\(f(z) = z^2\\) maps a \\(90°\\) angle at \\(z_0 = 0\\) to a \\(180°\\) angle.</p>

<h3>Conformal Self-Maps of the Disk</h3>

<p>The conformal self-maps (biholomorphisms) of the unit disk \\(\\mathbb{D} = \\{|z| < 1\\}\\) are the <strong>Mobius transformations</strong></p>
\\[f(z) = e^{i\\theta} \\frac{z - a}{1 - \\bar{a} z}, \\quad a \\in \\mathbb{D}, \\theta \\in \\mathbb{R}.\\]
<p>This is a three-real-parameter family. The <strong>Riemann mapping theorem</strong> (Chapter 12) asserts that every simply connected proper open subset of \\(\\mathbb{C}\\) is conformally equivalent to \\(\\mathbb{D}\\).</p>

<div class="viz-placeholder" data-viz="viz-conformality"></div>
`,
            visualizations: [
                {
                    id: 'viz-conformality',
                    title: 'Angle Preservation Under Conformal Maps',
                    description: 'A rectangular grid is mapped by f(z) = z\u00b2 (analytic, conformal away from 0) and g(z) = z\u00b7\u0305z (not analytic, non-conformal). Zoom into an intersection point. Left: right angles remain right angles. Right: angles are distorted. The critical point at z=0 is shown with a red dot \u2014 even z\u00b2 fails to be conformal there.',
                    setup: function(body, controls) {
                        var W = 580, H = 320;
                        var viz = new VizEngine(body, { width: W, height: H, originX: W/4, originY: H/2, scale: 60 });
                        var halfW = W / 2;

                        var funcs = [
                            {
                                name: 'f(z) = z\u00b2 (conformal)',
                                f: function(re, im) { return [re*re - im*im, 2*re*im]; }
                            },
                            {
                                name: 'f(z) = |z|\u00b2 (non-conformal)',
                                f: function(re, im) { return [re*re + im*im, 0]; }
                            }
                        ];
                        var fIdx = 0;

                        var btnRow = document.createElement('div');
                        btnRow.style.cssText = 'display:flex;gap:6px;margin-bottom:6px;';
                        funcs.forEach(function(fn, i) {
                            var b = document.createElement('button');
                            b.textContent = fn.name;
                            b.style.cssText = 'padding:3px 10px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;cursor:pointer;';
                            b.addEventListener('click', function() {
                                fIdx = i;
                                btnRow.querySelectorAll('button').forEach(function(bb, ii) {
                                    bb.style.background = ii === i ? '#3fb9a0' : '#1a1a40';
                                    bb.style.color = ii === i ? '#0c0c20' : '#c9d1d9';
                                });
                                draw();
                            });
                            if (i === 0) { b.style.background = '#3fb9a0'; b.style.color = '#0c0c20'; }
                            btnRow.appendChild(b);
                        });
                        controls.appendChild(btnRow);

                        function mapCurve(curve, f) {
                            return curve.map(function(p) { return f(p[0], p[1]); });
                        }

                        function drawMappedGrid(ctx, f, originX, originY, scale, color) {
                            var lines = [];
                            // Horizontal lines: y = const
                            for (var yv = -2; yv <= 2; yv += 0.5) {
                                var line = [];
                                for (var xv = -2; xv <= 2; xv += 0.05) {
                                    line.push([xv, yv]);
                                }
                                lines.push({ pts: line, type: 'h' });
                            }
                            // Vertical lines: x = const
                            for (var xv2 = -2; xv2 <= 2; xv2 += 0.5) {
                                var line2 = [];
                                for (var yv2 = -2; yv2 <= 2; yv2 += 0.05) {
                                    line2.push([xv2, yv2]);
                                }
                                lines.push({ pts: line2, type: 'v' });
                            }

                            lines.forEach(function(line) {
                                var mapped = mapCurve(line.pts, f);
                                ctx.strokeStyle = (line.type === 'h' ? viz.colors.blue : viz.colors.teal) + '99';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                mapped.forEach(function(p) {
                                    var sx = originX + p[0] * scale;
                                    var sy = originY - p[1] * scale;
                                    if (!isFinite(sx) || !isFinite(sy) || Math.abs(sx) > 2000 || Math.abs(sy) > 2000) {
                                        started = false; return;
                                    }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                });
                                ctx.stroke();
                            });
                        }

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.clearRect(0, 0, W, H);

                            // Left: domain grid
                            ctx.save();
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, halfW, H);
                            ctx.beginPath(); ctx.rect(0, 0, halfW, H); ctx.clip();

                            // Draw domain grid
                            var dox = halfW/2, doy = H/2, dscale = 50;
                            ctx.strokeStyle = viz.colors.grid + '80'; ctx.lineWidth = 0.5;
                            for (var gx = -5; gx <= 5; gx++) {
                                var sx = dox + gx * dscale;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, H); ctx.stroke();
                            }
                            for (var gy = -5; gy <= 5; gy++) {
                                var sy = doy - gy * dscale;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(halfW, sy); ctx.stroke();
                            }
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(0, doy); ctx.lineTo(halfW, doy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(dox, 0); ctx.lineTo(dox, H); ctx.stroke();

                            // Draw domain lines (colored)
                            for (var yy = -2; yy <= 2; yy += 0.5) {
                                ctx.strokeStyle = viz.colors.blue + '80'; ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(dox - 2*dscale, doy - yy*dscale);
                                ctx.lineTo(dox + 2*dscale, doy - yy*dscale);
                                ctx.stroke();
                            }
                            for (var xx = -2; xx <= 2; xx += 0.5) {
                                ctx.strokeStyle = viz.colors.teal + '80'; ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(dox + xx*dscale, doy - 2*dscale);
                                ctx.lineTo(dox + xx*dscale, doy + 2*dscale);
                                ctx.stroke();
                            }

                            // Right-angle marker at (0.5, 0.5)
                            var px = dox + 0.5*dscale, py = doy - 0.5*dscale;
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5;
                            ctx.strokeRect(px, py - 12, 12, 12);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Domain (z-plane)', halfW/2, 6);

                            ctx.restore();

                            // Right: image under current function
                            ctx.save();
                            ctx.translate(halfW, 0);
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, 0, halfW, H);
                            ctx.beginPath(); ctx.rect(0, 0, halfW, H); ctx.clip();

                            var iox = halfW/2, ioy = H/2, iscale = 30;
                            ctx.strokeStyle = viz.colors.grid + '80'; ctx.lineWidth = 0.5;
                            for (var gx2 = -8; gx2 <= 8; gx2++) {
                                var sx2 = iox + gx2 * iscale;
                                ctx.beginPath(); ctx.moveTo(sx2, 0); ctx.lineTo(sx2, H); ctx.stroke();
                            }
                            for (var gy2 = -8; gy2 <= 8; gy2++) {
                                var sy2 = ioy - gy2 * iscale;
                                ctx.beginPath(); ctx.moveTo(0, sy2); ctx.lineTo(halfW, sy2); ctx.stroke();
                            }
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(0, ioy); ctx.lineTo(halfW, ioy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(iox, 0); ctx.lineTo(iox, H); ctx.stroke();

                            drawMappedGrid(ctx, funcs[fIdx].f, iox, ioy, iscale, viz.colors.blue);

                            // Mark critical point image
                            if (fIdx === 0) {
                                var [fpx, fpy] = funcs[fIdx].f(0.5, 0.5);
                                var mappedX = iox + fpx * iscale;
                                var mappedY = ioy - fpy * iscale;
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5;
                                // Approximate angle marker at mapped point
                                ctx.fillStyle = viz.colors.orange + '60';
                                ctx.beginPath(); ctx.arc(mappedX, mappedY, 8, 0, Math.PI * 2); ctx.fill();
                            }

                            // Critical point at z=0 in image
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(iox, ioy, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                            ctx.fillText('f(0)=0, f\'=0 here', iox + 7, ioy - 7);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Image (w-plane) \u2014 ' + funcs[fIdx].name, halfW/2, 6);

                            ctx.restore();

                            // Divider
                            ctx.strokeStyle = '#2a2a50'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, H); ctx.stroke();
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the map \\(f(z) = z^2\\) doubles angles at the origin. That is, if two curves make angle \\(\\alpha\\) at \\(z_0 = 0\\), their images make angle \\(2\\alpha\\).',
                    hint: 'Write curves as \\(\\gamma(t) = te^{i\\alpha_1}\\) and \\(\\delta(t) = te^{i\\alpha_2}\\). Compute \\(f \\circ \\gamma\\) and \\(f \\circ \\delta\\) and compare argument difference.',
                    solution: '\\(f(te^{i\\alpha}) = t^2 e^{2i\\alpha}\\). The image curve has argument \\(2\\alpha\\). If two curves have arguments \\(\\alpha_1, \\alpha_2\\) at the origin, their images have arguments \\(2\\alpha_1, 2\\alpha_2\\). The angle between them: \\(2\\alpha_2 - 2\\alpha_1 = 2(\\alpha_2 - \\alpha_1)\\). So the angle is doubled. This is because \\(f\'(0) = 0\\) (critical point), so conformality fails.'
                },
                {
                    question: 'Let \\(f(z) = \\sin z\\). Find all points where \\(f\\) is not conformal.',
                    hint: 'Conformality fails exactly where \\(f\'(z) = 0\\). Compute \\(f\'\\) and find its zeros.',
                    solution: '\\(f\'(z) = \\cos z\\). The zeros of \\(\\cos z\\) are at \\(z = \\pi/2 + n\\pi\\) for \\(n \\in \\mathbb{Z}\\). These are the points where \\(\\sin z\\) fails to be conformal. At all other points of \\(\\mathbb{C}\\), \\(\\sin z\\) is conformal.'
                },
                {
                    question: 'Prove that the inverse of a conformal bijection \\(f: U \\to V\\) is also conformal.',
                    hint: 'Use the chain rule applied to \\(f^{-1} \\circ f = \\text{id}\\). What must \\((f^{-1})\\'(f(z_0))\\) be?',
                    solution: 'Differentiating \\(f^{-1}(f(z)) = z\\) gives \\((f^{-1})\'(f(z_0)) \\cdot f\'(z_0) = 1\\), so \\((f^{-1})\'(f(z_0)) = 1/f\'(z_0) \\neq 0\\). Thus \\(f^{-1}\\) is analytic with nonzero derivative at \\(f(z_0)\\), hence conformal at every point of \\(V\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Harmonic Functions
        // ================================================================
        {
            id: 'sec-harmonic',
            title: 'Harmonic Functions',
            content: `
<h2>Harmonic Functions and Conjugates</h2>

<p>The CR equations link \\(u\\) and \\(v\\) through first-order relationships. Differentiating again reveals a beautiful second-order consequence.</p>

<h3>The Laplace Equation</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.5 (Harmonic Components)</div>
    <div class="env-body">
        <p>If \\(f = u + iv\\) is analytic on \\(U\\) (and twice continuously differentiable, which analyticity implies), then both \\(u\\) and \\(v\\) satisfy the <strong>Laplace equation</strong> on \\(U\\):</p>
        \\[\\Delta u = u_{xx} + u_{yy} = 0 \\qquad \\text{and} \\qquad \\Delta v = v_{xx} + v_{yy} = 0.\\]
        <p>Functions satisfying the Laplace equation are called <strong>harmonic</strong>.</p>
    </div>
</div>

<p><strong>Proof.</strong> From the CR equations: \\(u_x = v_y\\) and \\(u_y = -v_x\\). Differentiating the first with respect to \\(x\\): \\(u_{xx} = v_{yx}\\). Differentiating the second with respect to \\(y\\): \\(u_{yy} = -v_{xy}\\). Since \\(v\\) has continuous second partials, \\(v_{xy} = v_{yx}\\), so \\(u_{xx} + u_{yy} = v_{yx} - v_{xy} = 0\\). The proof for \\(v\\) is analogous. \\(\\square\\)</p>

<h3>Harmonic Conjugates</h3>

<div class="env-block definition">
    <div class="env-title">Definition 2.4 (Harmonic Conjugate)</div>
    <div class="env-body">
        <p>If \\(u\\) is harmonic on a simply connected domain \\(U\\), a <strong>harmonic conjugate</strong> of \\(u\\) is a harmonic function \\(v\\) on \\(U\\) such that \\(u + iv\\) is analytic on \\(U\\). The harmonic conjugate exists and is unique up to an additive constant.</p>
    </div>
</div>

<p>The level curves of \\(u\\) and its harmonic conjugate \\(v\\) are perpendicular. This follows immediately from conformality: the image of a horizontal line (constant \\(v\\) in the \\(w\\)-plane) and a vertical line (constant \\(u\\)) are perpendicular in the \\(w\\)-plane, and conformality preserves this perpendicularity in the \\(z\\)-plane.</p>

<h3>Example: Finding a Harmonic Conjugate</h3>

<p>Given \\(u(x,y) = x^2 - y^2\\), find a harmonic conjugate \\(v\\).</p>

<p>By CR: \\(v_y = u_x = 2x\\), so integrating in \\(y\\): \\(v = 2xy + g(x)\\) for some function \\(g\\). By CR: \\(v_x = u_y\\) requires \\(2y + g'(x) = -(-2y) = 2y\\), so \\(g'(x) = 0\\), hence \\(g\\) is constant. Thus \\(v = 2xy + C\\) (any constant \\(C\\)). This gives \\(f(z) = (x^2 - y^2) + i(2xy) = z^2\\), confirming our earlier calculations.</p>

<h3>Applications</h3>

<p>Harmonic functions appear throughout physics:</p>
<ul>
    <li><strong>Electrostatics:</strong> \\(u\\) is the electric potential, \\(v\\) is the stream function; level curves of \\(u\\) are equipotentials, level curves of \\(v\\) are field lines.</li>
    <li><strong>Fluid dynamics:</strong> Steady, irrotational, incompressible flow has a complex potential \\(f = \\phi + i\\psi\\) where \\(\\phi\\) is velocity potential and \\(\\psi\\) is stream function.</li>
    <li><strong>Heat conduction:</strong> \\(u\\) is the steady-state temperature distribution.</li>
</ul>

<div class="viz-placeholder" data-viz="viz-harmonic-conjugate"></div>
<div class="viz-placeholder" data-viz="viz-streamlines"></div>
`,
            visualizations: [
                {
                    id: 'viz-harmonic-conjugate',
                    title: 'Harmonic Conjugate: Orthogonal Level Curves',
                    description: 'Level curves of u (real part) and v (imaginary part) of an analytic function are always orthogonal. Drag the slider to animate through different functions. Verify: level curves of u and v are perpendicular at every intersection.',
                    setup: function(body, controls) {
                        var W = 560, H = 350;
                        var viz = new VizEngine(body, { width: W, height: H, originX: W/2, originY: H/2, scale: 70 });

                        var funcs = [
                            { name: 'z\u00b2: u=x\u00b2\u2212y\u00b2, v=2xy', u: function(x,y){return x*x-y*y;}, v: function(x,y){return 2*x*y;} },
                            { name: 'z\u00b3: u=x\u00b3\u22123xy\u00b2, v=3x\u00b2y\u2212y\u00b3', u: function(x,y){return x*x*x-3*x*y*y;}, v: function(x,y){return 3*x*x*y-y*y*y;} },
                            { name: 'e^z: u=e^x\u00b7cos y, v=e^x\u00b7sin y', u: function(x,y){return Math.exp(x)*Math.cos(y);}, v: function(x,y){return Math.exp(x)*Math.sin(y);} }
                        ];
                        var fIdx = 0;

                        var btnRow = document.createElement('div');
                        btnRow.style.cssText = 'display:flex;gap:6px;margin-bottom:6px;';
                        funcs.forEach(function(fn, i) {
                            var b = document.createElement('button');
                            b.textContent = fn.name.split(':')[0];
                            b.style.cssText = 'padding:3px 10px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;cursor:pointer;';
                            b.addEventListener('click', function() {
                                fIdx = i;
                                btnRow.querySelectorAll('button').forEach(function(bb, ii) {
                                    bb.style.background = ii === i ? '#3fb9a0' : '#1a1a40';
                                    bb.style.color = ii === i ? '#0c0c20' : '#c9d1d9';
                                });
                                draw();
                            });
                            if (i === 0) { b.style.background = '#3fb9a0'; b.style.color = '#0c0c20'; }
                            btnRow.appendChild(b);
                        });
                        controls.appendChild(btnRow);

                        function drawContour(ctx, f, levels, color, xRange, yRange, N) {
                            // Marching squares lite: draw contour lines
                            N = N || 120;
                            var dx = (xRange[1]-xRange[0])/N, dy = (yRange[1]-yRange[0])/N;
                            ctx.strokeStyle = color; ctx.lineWidth = 1;

                            for (var i = 0; i < N; i++) {
                                for (var j = 0; j < N; j++) {
                                    var x0 = xRange[0] + i*dx, y0 = yRange[0] + j*dy;
                                    var x1 = x0 + dx, y1 = y0 + dy;
                                    var v00 = f(x0,y0), v10 = f(x1,y0), v01 = f(x0,y1), v11 = f(x1,y1);

                                    levels.forEach(function(L) {
                                        // Find crossings on each edge
                                        var pts = [];
                                        // bottom edge (y=y0)
                                        if ((v00-L)*(v10-L) < 0) {
                                            var t = (L-v00)/(v10-v00);
                                            pts.push([x0+t*dx, y0]);
                                        }
                                        // top edge (y=y1)
                                        if ((v01-L)*(v11-L) < 0) {
                                            var t2 = (L-v01)/(v11-v01);
                                            pts.push([x0+t2*dx, y1]);
                                        }
                                        // left edge (x=x0)
                                        if ((v00-L)*(v01-L) < 0) {
                                            var t3 = (L-v00)/(v01-v00);
                                            pts.push([x0, y0+t3*dy]);
                                        }
                                        // right edge (x=x1)
                                        if ((v10-L)*(v11-L) < 0) {
                                            var t4 = (L-v10)/(v11-v10);
                                            pts.push([x1, y0+t4*dy]);
                                        }
                                        if (pts.length >= 2) {
                                            var [sx1, sy1] = viz.toScreen(pts[0][0], pts[0][1]);
                                            var [sx2, sy2] = viz.toScreen(pts[1][0], pts[1][1]);
                                            ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
                                        }
                                    });
                                });
                            }
                        }

                        function draw() {
                            var ctx = viz.ctx;
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            var fn = funcs[fIdx];
                            var xR = [-3, 3], yR = [-2.5, 2.5];
                            var uLevels = [], vLevels = [];
                            for (var k = -6; k <= 6; k += 0.5) {
                                uLevels.push(k);
                                vLevels.push(k);
                            }

                            drawContour(ctx, fn.u, uLevels, viz.colors.blue + 'cc', xR, yR, 150);
                            drawContour(ctx, fn.v, vLevels, viz.colors.teal + 'cc', xR, yR, 150);

                            // Legend
                            ctx.fillStyle = '#12122a';
                            ctx.fillRect(W - 220, H - 54, 216, 50);
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.strokeRect(W - 220, H - 54, 216, 50);

                            ctx.strokeStyle = viz.colors.blue + 'cc'; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(W - 210, H - 36); ctx.lineTo(W - 190, H - 36); ctx.stroke();
                            ctx.fillStyle = viz.colors.white; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            ctx.fillText('Level curves of u (Re f)', W - 186, H - 36);

                            ctx.strokeStyle = viz.colors.teal + 'cc'; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(W - 210, H - 18); ctx.lineTo(W - 190, H - 18); ctx.stroke();
                            ctx.fillText('Level curves of v (Im f)', W - 186, H - 18);

                            // Title
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText(fn.name + '  \u2014 level curves are orthogonal', W/2, 8);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-streamlines',
                    title: 'Streamlines and Equipotentials: The Fluid Dynamics Connection',
                    description: 'Interpret f(z) as a complex velocity potential. The real part \u03c6 gives equipotential lines (where potential is constant); the imaginary part \u03c8 gives streamlines (paths fluid particles follow). These are always orthogonal. Choose a flow type.',
                    setup: function(body, controls) {
                        var W = 560, H = 360;
                        var viz = new VizEngine(body, { width: W, height: H, originX: W/2, originY: H/2, scale: 60 });

                        var flows = [
                            {
                                name: 'Uniform flow: f=z',
                                phi: function(x,y){return x;},
                                psi: function(x,y){return y;},
                                vx: function(x,y){return 1;},
                                vy: function(x,y){return 0;}
                            },
                            {
                                name: 'Stagnation: f=z\u00b2',
                                phi: function(x,y){return x*x-y*y;},
                                psi: function(x,y){return 2*x*y;},
                                vx: function(x,y){return 2*x;},
                                vy: function(x,y){return -2*y;}
                            },
                            {
                                name: 'Source at origin: f=log z',
                                phi: function(x,y){return 0.5*Math.log(x*x+y*y+1e-9);},
                                psi: function(x,y){return Math.atan2(y,x);},
                                vx: function(x,y){var r2=x*x+y*y+1e-9;return x/r2;},
                                vy: function(x,y){var r2=x*x+y*y+1e-9;return y/r2;}
                            },
                            {
                                name: 'Vortex: f=\u2212i\u00b7log z',
                                phi: function(x,y){return Math.atan2(y,x);},
                                psi: function(x,y){return -0.5*Math.log(x*x+y*y+1e-9);},
                                vx: function(x,y){var r2=x*x+y*y+1e-9;return -y/r2;},
                                vy: function(x,y){var r2=x*x+y*y+1e-9;return x/r2;}
                            }
                        ];
                        var fIdx = 0;

                        var btnRow = document.createElement('div');
                        btnRow.style.cssText = 'display:flex;gap:6px;margin-bottom:6px;flex-wrap:wrap;';
                        flows.forEach(function(fl, i) {
                            var b = document.createElement('button');
                            b.textContent = fl.name;
                            b.style.cssText = 'padding:3px 10px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;cursor:pointer;';
                            b.addEventListener('click', function() {
                                fIdx = i;
                                btnRow.querySelectorAll('button').forEach(function(bb, ii) {
                                    bb.style.background = ii === i ? '#3fb9a0' : '#1a1a40';
                                    bb.style.color = ii === i ? '#0c0c20' : '#c9d1d9';
                                });
                                draw();
                            });
                            if (i === 0) { b.style.background = '#3fb9a0'; b.style.color = '#0c0c20'; }
                            btnRow.appendChild(b);
                        });
                        controls.appendChild(btnRow);

                        function drawContour(ctx, f, levels, color, xRange, yRange, N) {
                            N = N || 100;
                            var dx = (xRange[1]-xRange[0])/N, dy = (yRange[1]-yRange[0])/N;
                            ctx.strokeStyle = color; ctx.lineWidth = 1;
                            for (var i = 0; i < N; i++) {
                                for (var j = 0; j < N; j++) {
                                    var x0 = xRange[0]+i*dx, y0 = yRange[0]+j*dy;
                                    var x1 = x0+dx, y1 = y0+dy;
                                    var v00 = f(x0,y0), v10 = f(x1,y0), v01 = f(x0,y1), v11 = f(x1,y1);
                                    if (!isFinite(v00)||!isFinite(v10)||!isFinite(v01)||!isFinite(v11)) return;
                                    levels.forEach(function(L) {
                                        var pts = [];
                                        if ((v00-L)*(v10-L)<0){var t=(L-v00)/(v10-v00);pts.push([x0+t*dx,y0]);}
                                        if ((v01-L)*(v11-L)<0){var t2=(L-v01)/(v11-v01);pts.push([x0+t2*dx,y1]);}
                                        if ((v00-L)*(v01-L)<0){var t3=(L-v00)/(v01-v00);pts.push([x0,y0+t3*dy]);}
                                        if ((v10-L)*(v11-L)<0){var t4=(L-v10)/(v11-v10);pts.push([x1,y0+t4*dy]);}
                                        if (pts.length>=2){
                                            var [sx1,sy1]=viz.toScreen(pts[0][0],pts[0][1]);
                                            var [sx2,sy2]=viz.toScreen(pts[1][0],pts[1][1]);
                                            ctx.beginPath();ctx.moveTo(sx1,sy1);ctx.lineTo(sx2,sy2);ctx.stroke();
                                        }
                                    });
                                }
                            }
                        }

                        function draw() {
                            var ctx = viz.ctx;
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();

                            var fl = flows[fIdx];
                            var xR = [-3.5, 3.5], yR = [-3, 3];
                            var phiLevels = [], psiLevels = [];
                            for (var k = -8; k <= 8; k += 0.4) {
                                phiLevels.push(k);
                                psiLevels.push(k);
                            }

                            drawContour(ctx, fl.phi, phiLevels, viz.colors.blue + 'aa', xR, yR, 160);
                            drawContour(ctx, fl.psi, psiLevels, viz.colors.teal + 'cc', xR, yR, 160);

                            // Draw velocity arrows at grid points
                            ctx.strokeStyle = viz.colors.orange + 'cc';
                            ctx.fillStyle = viz.colors.orange + 'cc';
                            for (var ax = -3; ax <= 3; ax += 0.75) {
                                for (var ay = -2.5; ay <= 2.5; ay += 0.75) {
                                    var vx = fl.vx(ax, ay), vy = fl.vy(ax, ay);
                                    var vlen = Math.sqrt(vx*vx + vy*vy);
                                    if (!isFinite(vlen) || vlen < 0.001) continue;
                                    var scale = 0.25 / Math.max(1, vlen);
                                    viz.drawVector(ax, ay, ax + vx*scale, ay + vy*scale, viz.colors.orange + '99', null, 1);
                                }
                            }

                            // Legend
                            ctx.fillStyle = '#12122a';
                            ctx.fillRect(W - 260, H - 70, 256, 66);
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.strokeRect(W - 260, H - 70, 256, 66);

                            ctx.strokeStyle = viz.colors.blue + 'aa'; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(W-250, H-50); ctx.lineTo(W-230, H-50); ctx.stroke();
                            ctx.fillStyle = viz.colors.white; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            ctx.fillText('Equipotentials (\u03c6 = const)', W-226, H-50);

                            ctx.strokeStyle = viz.colors.teal + 'cc'; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(W-250, H-32); ctx.lineTo(W-230, H-32); ctx.stroke();
                            ctx.fillText('Streamlines (\u03c8 = const)', W-226, H-32);

                            ctx.strokeStyle = viz.colors.orange + 'cc'; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(W-250, H-14); ctx.lineTo(W-230, H-14); ctx.stroke();
                            ctx.fillText('Velocity field', W-226, H-14);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText(fl.name, W/2, 8);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the harmonic conjugate of \\(u(x,y) = e^x \\cos y\\) and write down the analytic function \\(f = u + iv\\).',
                    hint: 'Apply the CR equations: \\(v_y = u_x\\) and \\(v_x = -u_y\\). Integrate.',
                    solution: '\\(u_x = e^x \\cos y\\), so \\(v_y = e^x \\cos y\\), giving \\(v = e^x \\sin y + g(x)\\). Then \\(v_x = e^x \\sin y + g\'(x) = -u_y = e^x \\sin y\\), so \\(g\'(x) = 0\\) and \\(g\\) is constant. Thus \\(v = e^x \\sin y + C\\) and \\(f(z) = e^z + iC\\).'
                },
                {
                    question: 'Show directly that \\(u(x,y) = \\ln(x^2 + y^2)^{1/2} = \\frac{1}{2}\\ln(x^2 + y^2)\\) is harmonic on \\(\\mathbb{C} \\setminus \\{0\\}\\).',
                    hint: 'Compute \\(u_{xx}\\) and \\(u_{yy}\\) directly.',
                    solution: '\\(u_x = x/(x^2+y^2)\\), \\(u_{xx} = (y^2-x^2)/(x^2+y^2)^2\\). By symmetry \\(u_{yy} = (x^2-y^2)/(x^2+y^2)^2\\). Thus \\(\\Delta u = u_{xx} + u_{yy} = 0\\). This \\(u\\) is the real part of \\(\\log z\\).'
                },
                {
                    question: 'Prove the mean value property: if \\(u\\) is harmonic on a disk \\(D(z_0, R)\\), then \\(u(z_0)\\) equals the average of \\(u\\) over any circle \\(|z - z_0| = r < R\\). (Hint: use the fact that \\(u = \\text{Re}(f)\\) for analytic \\(f\\) and apply Cauchy\'s integral formula, previewed here.)',
                    hint: 'Write \\(u = \\text{Re}(f)\\) where \\(f\\) is analytic. Apply the result \\(f(z_0) = \\frac{1}{2\\pi i} \\oint_{|z-z_0|=r} \\frac{f(z)}{z - z_0} dz\\) with \\(z = z_0 + re^{i\\theta}\\).',
                    solution: 'On \\(|z - z_0| = r\\): \\(z = z_0 + re^{i\\theta}\\), \\(dz = ire^{i\\theta}d\\theta\\). Cauchy\'s formula gives \\(f(z_0) = \\frac{1}{2\\pi}\\int_0^{2\\pi} f(z_0 + re^{i\\theta})d\\theta\\). Taking real parts: \\(u(z_0) = \\frac{1}{2\\pi}\\int_0^{2\\pi} u(z_0 + re^{i\\theta})d\\theta\\), the mean value property.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Elementary Transcendentals (Ch 3)
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Elementary Transcendentals',
            content: `
<h2>Bridge to Chapter 3: Elementary Transcendentals</h2>

<p>We have now assembled the tools to study the fundamental transcendental functions of complex analysis. The Cauchy-Riemann equations tell us when functions are analytic; conformality tells us what they look like geometrically; harmonic components connect them to classical PDE theory. In Chapter 3, we apply this framework systematically to \\(e^z\\), \\(\\log z\\), \\(z^\\alpha\\), \\(\\sin z\\), and \\(\\cos z\\).</p>

<h3>Preview: The Exponential Function</h3>

<p>We have already verified that \\(e^z\\) is entire with \\((e^z)' = e^z\\). Its real and imaginary parts:</p>
\\[e^z = e^x \\cos y + i e^x \\sin y\\]
<p>make clear the periodicity: \\(e^{z + 2\\pi i} = e^z\\) for all \\(z\\). The map \\(z \\mapsto e^z\\) takes vertical strips of width \\(2\\pi\\) to the entire complex plane (minus the origin). This periodicity forces the logarithm to be multi-valued, the central complication of Chapter 3.</p>

<h3>Preview: Trigonometric Functions</h3>

<p>Euler's formula \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\) extends to complex arguments via</p>
\\[\\cos z = \\frac{e^{iz} + e^{-iz}}{2}, \\qquad \\sin z = \\frac{e^{iz} - e^{-iz}}{2i}.\\]
<p>These are entire functions. Unlike their real counterparts, \\(|\\sin z|\\) and \\(|\\cos z\\)|  are unbounded: \\(\\sin(iy) = i\\sinh y\\) grows like \\(e^y/2\\). The real "oscillates between \\(-1\\) and \\(1\\)" intuition completely breaks down in the complex plane.</p>

<h3>What the CR Framework Gives Us</h3>

<div class="env-block theorem">
    <div class="env-title">Summary: The CR Toolkit</div>
    <div class="env-body">
        <ul>
            <li><strong>Testing analyticity:</strong> Check \\(u_x = v_y\\) and \\(u_y = -v_x\\) with continuous partials.</li>
            <li><strong>Computing derivatives:</strong> \\(f' = u_x + iv_x\\) (or \\(v_y - iu_y\\)).</li>
            <li><strong>Conformality:</strong> Analytic functions with \\(f' \\neq 0\\) preserve angles.</li>
            <li><strong>Harmonic functions:</strong> Real and imaginary parts of analytic functions solve \\(\\Delta u = 0\\).</li>
            <li><strong>Finding conjugates:</strong> Integrate the CR equations to recover \\(v\\) from \\(u\\).</li>
        </ul>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">What We Have Not Yet Proved</div>
    <div class="env-body">
        <p>We have asserted that analytic functions are infinitely differentiable and representable by power series, but not proved it. These are deep theorems requiring complex integration (Chapters 4-7). The CR equations and local geometry studied in this chapter are the gateway, but the true power of complex analysis will emerge only after we develop the integral machinery.</p>
    </div>
</div>

<h3>Chapter 3 Roadmap</h3>

<ul>
    <li><strong>\\(e^z\\):</strong> Full properties, periodicity, the map \\(\\mathbb{C} \\to \\mathbb{C}^*\\)</li>
    <li><strong>\\(\\log z\\):</strong> Branches, branch cuts, Riemann surfaces (preview)</li>
    <li><strong>\\(z^\\alpha\\) for \\(\\alpha \\in \\mathbb{C}\\):</strong> Defined via \\(z^\\alpha = e^{\\alpha \\log z}\\), branch choices</li>
    <li><strong>\\(\\sin z, \\cos z\\):</strong> Complex extensions, growth, zeros</li>
    <li><strong>\\(\\sinh z, \\cosh z\\):</strong> Hyperbolic functions and their relation to trigonometric</li>
</ul>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify that \\(\\sin z = \\frac{e^{iz} - e^{-iz}}{2i}\\) defines an entire function and compute its derivative.',
                    hint: 'Use the fact that \\(e^z\\) is entire and the rules for sums, scalar multiples, and compositions of analytic functions.',
                    solution: '\\(e^{iz}\\) is the composition of \\(z \\mapsto iz\\) (analytic) with \\(e^z\\) (entire), hence entire. Similarly \\(e^{-iz}\\). Their difference and the division by the constant \\(2i\\) preserve analyticity. By the chain rule: \\(\\frac{d}{dz}\\sin z = \\frac{ie^{iz} + ie^{-iz}}{2i} = \\frac{e^{iz}+e^{-iz}}{2} = \\cos z\\).'
                },
                {
                    question: 'Show that \\(e^z\\) is periodic with period \\(2\\pi i\\): \\(e^{z + 2\\pi i} = e^z\\) for all \\(z\\).',
                    hint: 'Use the definition \\(e^z = e^x(\\cos y + i\\sin y)\\) and periodicity of \\(\\sin\\) and \\(\\cos\\).',
                    solution: '\\(e^{z+2\\pi i} = e^{(x+iy)+2\\pi i} = e^x(\\cos(y+2\\pi) + i\\sin(y+2\\pi)) = e^x(\\cos y + i\\sin y) = e^z\\). The \\(2\\pi\\)-periodicity of real sine and cosine gives the \\(2\\pi i\\)-periodicity of \\(e^z\\).'
                },
                {
                    question: 'Write \\(\\cos z\\) in terms of its real and imaginary parts \\(u(x,y) + iv(x,y)\\), and verify the Cauchy-Riemann equations.',
                    hint: 'Use \\(\\cos z = \\cos(x+iy) = \\cos x \\cosh y - i \\sin x \\sinh y\\) (from the addition formula and \\(\\cos(iy) = \\cosh y\\), \\(\\sin(iy) = i\\sinh y\\)).',
                    solution: '\\(u = \\cos x \\cosh y\\), \\(v = -\\sin x \\sinh y\\). Then \\(u_x = -\\sin x \\cosh y\\) and \\(v_y = -\\sin x \\cosh y\\): equal. \\(u_y = \\cos x \\sinh y\\) and \\(-v_x = \\sin x \\cdot (-\\cos x \\cdot 0) \\ldots\\) more carefully: \\(v_x = -\\cos x \\sinh y\\), so \\(-v_x = \\cos x \\sinh y = u_y\\). CR holds, confirming \\(\\cos z\\) is entire.'
                },
                {
                    question: '(Preview) The logarithm \\(\\log z\\) is defined on \\(\\mathbb{C} \\setminus (-\\infty, 0]\\) by \\(\\log z = \\ln|z| + i\\arg(z)\\) with \\(\\arg(z) \\in (-\\pi, \\pi)\\). Verify the Cauchy-Riemann equations in polar coordinates: if \\(u = \\ln r\\) and \\(v = \\theta\\), show \\(u_r = (1/r) v_\\theta\\) and \\(v_r = -(1/r) u_\\theta\\).',
                    hint: 'The polar form of the CR equations for \\(f(re^{i\\theta}) = u(r,\\theta) + iv(r,\\theta)\\) is \\(u_r = v_\\theta / r\\) and \\(v_r = -u_\\theta / r\\).',
                    solution: '\\(u = \\ln r\\): \\(u_r = 1/r\\), \\(u_\\theta = 0\\). \\(v = \\theta\\): \\(v_r = 0\\), \\(v_\\theta = 1\\). Check: \\(u_r = 1/r = v_\\theta/r = 1/r\\). Check: \\(v_r = 0 = -u_\\theta/r = 0\\). Both CR equations hold, confirming \\(\\log z\\) is analytic on its domain. The derivative is \\(f\'(z) = e^{-i\\theta}(u_r + iv_r) = e^{-i\\theta}(1/r) = 1/(re^{i\\theta}) = 1/z\\).'
                }
            ]
        }
    ]
});
