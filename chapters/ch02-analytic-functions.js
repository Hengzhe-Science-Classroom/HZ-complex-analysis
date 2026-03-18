window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Analytic Functions',
    subtitle: 'The Cauchy-Riemann equations and the magic of complex differentiability',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Analyticity Matters',
            content: `
<h2>Why Analyticity Matters</h2>

<div class="env-block intuition">
    <div class="env-title">A Single Condition, Extraordinary Consequences</div>
    <div class="env-body">
        <p>In real analysis, a function can be differentiable without being twice differentiable, or smooth without being analytic. Complex analysis is startlingly different. If a complex function \\(f\\) is differentiable at every point of an open set, then it is automatically infinitely differentiable, has a convergent power series expansion, satisfies the maximum modulus principle, and much more. One condition unlocks an entire hierarchy of regularity.</p>
        <p>This chapter develops the machinery behind this phenomenon: the complex derivative, the Cauchy-Riemann equations, and their geometric and physical consequences.</p>
    </div>
</div>

<p>Recall from Chapter 1 that we write \\(f(z) = u(x,y) + iv(x,y)\\) where \\(z = x + iy\\). A complex function is thus a pair of real-valued functions \\(u\\) and \\(v\\) of two real variables. But complex differentiability imposes a very specific coupling between \\(u\\) and \\(v\\) that goes far beyond what real differentiability requires.</p>

<h3>Real vs. Complex Differentiability</h3>

<p>A real function \\(f: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) is differentiable at a point if it can be locally approximated by a linear map, i.e., by any \\(2 \\times 2\\) matrix. That gives 4 free parameters. A complex-differentiable function must be locally approximated by multiplication by a complex number \\(f'(z_0)\\), which is a very special kind of linear map: a rotation composed with a scaling. That is only 2 free parameters. The constraint that eliminates two of the four degrees of freedom is precisely the Cauchy-Riemann equations.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>The equations we now call "Cauchy-Riemann" were discovered by d'Alembert (1752) in the context of fluid mechanics, rediscovered by Euler (1757), then systematically developed by Cauchy (1814) and Riemann (1851). Riemann's insight was especially profound: he recognized that these equations define a geometric structure on the plane, not just an algebraic constraint.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
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
    <div class="env-title">Definition (Complex Derivative)</div>
    <div class="env-body">
        <p>Let \\(f\\) be defined in a neighborhood of \\(z_0 \\in \\mathbb{C}\\). The <strong>complex derivative</strong> of \\(f\\) at \\(z_0\\) is</p>
        \\[f'(z_0) = \\lim_{\\Delta z \\to 0} \\frac{f(z_0 + \\Delta z) - f(z_0)}{\\Delta z},\\]
        <p>provided this limit exists. Here \\(\\Delta z\\) is a <em>complex</em> increment, so the limit must be the same regardless of the direction from which \\(\\Delta z \\to 0\\) in the complex plane.</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">The Direction-Independence Constraint</div>
    <div class="env-body">
        <p>This is the crucial point. In real calculus, the limit \\(\\lim_{h \\to 0} [f(x_0+h) - f(x_0)]/h\\) only requires \\(h \\to 0\\) from left or right, two directions. In the complex plane, \\(\\Delta z\\) can approach 0 from any direction: along the real axis, the imaginary axis, spiraling in, or any path whatsoever. The limit must be the same for all of them.</p>
        <p>This is an incredibly restrictive condition. Most "reasonable-looking" functions of two real variables fail it.</p>
    </div>
</div>

<p>Writing \\(f'(z_0) = a + ib\\), the derivative tells us that near \\(z_0\\), the function acts like</p>
\\[f(z) \\approx f(z_0) + f'(z_0) \\cdot (z - z_0).\\]

<p>Multiplication by \\(f'(z_0)\\) scales lengths by \\(|f'(z_0)|\\) and rotates by \\(\\arg f'(z_0)\\). The complex derivative, when it exists, gives a local "rotation + scaling" description of the map.</p>

<h3>Basic Differentiation Rules</h3>

<p>The familiar rules from real calculus carry over verbatim to the complex setting, with identical proofs:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.1 (Differentiation Rules)</div>
    <div class="env-body">
        <p>If \\(f\\) and \\(g\\) are complex differentiable at \\(z_0\\), then:</p>
        <ol>
            <li><strong>Sum:</strong> \\((f + g)'(z_0) = f'(z_0) + g'(z_0)\\)</li>
            <li><strong>Product:</strong> \\((fg)'(z_0) = f'(z_0)g(z_0) + f(z_0)g'(z_0)\\)</li>
            <li><strong>Quotient:</strong> \\(\\left(\\frac{f}{g}\\right)'(z_0) = \\frac{f'(z_0)g(z_0) - f(z_0)g'(z_0)}{g(z_0)^2}\\) when \\(g(z_0) \\neq 0\\)</li>
            <li><strong>Chain rule:</strong> \\((f \\circ g)'(z_0) = f'(g(z_0)) \\cdot g'(z_0)\\)</li>
        </ol>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = z^2\\)</div>
    <div class="env-body">
        <p>We compute directly:</p>
        \\[f'(z_0) = \\lim_{\\Delta z \\to 0} \\frac{(z_0 + \\Delta z)^2 - z_0^2}{\\Delta z} = \\lim_{\\Delta z \\to 0} \\frac{2z_0 \\Delta z + (\\Delta z)^2}{\\Delta z} = 2z_0.\\]
        <p>The limit exists and equals \\(2z_0\\), independently of the direction of \\(\\Delta z\\). So \\(f(z) = z^2\\) is complex differentiable everywhere, with \\(f'(z) = 2z\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-complex-derivative"></div>
`,
            visualizations: [
                {
                    id: 'viz-complex-derivative',
                    title: 'Complex Derivative: Local Rotation and Scaling',
                    description: 'Drag the point z\u2080 to see how f(z) = z\u00B2 transforms a small grid near z\u2080. The derivative f\'(z\u2080) = 2z\u2080 determines the local rotation angle and scale factor. Notice the grid squares become (approximately) scaled, rotated copies of themselves.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 50
                        });

                        var z0 = viz.addDraggable('z0', 1.2, 0.8, viz.colors.blue, 8);

                        var funcChoice = 0; // 0 = z^2, 1 = z^3, 2 = e^z
                        var funcs = [
                            { label: 'z\u00B2', f: function(x,y) { return [x*x - y*y, 2*x*y]; }, df: function(x,y) { return [2*x, 2*y]; } },
                            { label: 'z\u00B3', f: function(x,y) { return [x*x*x - 3*x*y*y, 3*x*x*y - y*y*y]; }, df: function(x,y) { return [3*(x*x - y*y), 6*x*y]; } },
                            { label: 'e^z', f: function(x,y) { var ex = Math.exp(x); return [ex*Math.cos(y), ex*Math.sin(y)]; }, df: function(x,y) { var ex = Math.exp(x); return [ex*Math.cos(y), ex*Math.sin(y)]; } }
                        ];

                        VizEngine.createButton(controls, 'z\u00B2', function() { funcChoice = 0; });
                        VizEngine.createButton(controls, 'z\u00B3', function() { funcChoice = 1; });
                        VizEngine.createButton(controls, 'e^z', function() { funcChoice = 2; });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var fc = funcs[funcChoice];
                            var x0 = z0.x, y0 = z0.y;
                            var eps = 0.4;
                            var gridN = 6;

                            // Draw input grid (left half)
                            var halfW = viz.width / 2;
                            var leftOx = halfW / 2;
                            var rightOx = halfW + halfW / 2;
                            var oy = viz.height / 2;
                            var sc = viz.scale;

                            // Left panel: input plane
                            ctx.save();
                            ctx.beginPath();
                            ctx.rect(0, 0, halfW, viz.height);
                            ctx.clip();

                            // Grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = -10; gx <= 10; gx++) {
                                var sx = leftOx + gx * sc;
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                            }
                            for (var gy = -10; gy <= 10; gy++) {
                                var sy = oy - gy * sc;
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(halfW, sy); ctx.stroke();
                            }
                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(halfW, oy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(leftOx, 0); ctx.lineTo(leftOx, viz.height); ctx.stroke();

                            // Draw small grid around z0
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 1.5;
                            for (var i = 0; i <= gridN; i++) {
                                var t = -eps + 2 * eps * i / gridN;
                                // horizontal lines
                                ctx.beginPath();
                                ctx.moveTo(leftOx + (x0 - eps) * sc, oy - (y0 + t) * sc);
                                ctx.lineTo(leftOx + (x0 + eps) * sc, oy - (y0 + t) * sc);
                                ctx.stroke();
                                // vertical lines
                                ctx.beginPath();
                                ctx.moveTo(leftOx + (x0 + t) * sc, oy - (y0 - eps) * sc);
                                ctx.lineTo(leftOx + (x0 + t) * sc, oy - (y0 + eps) * sc);
                                ctx.stroke();
                            }

                            // z0 point
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(leftOx + x0 * sc, oy - y0 * sc, 6, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                            ctx.fillText('z\u2080', leftOx + x0 * sc + 10, oy - y0 * sc - 5);

                            // Label
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.fillText('Input: z-plane', halfW / 2, 18);
                            ctx.restore();

                            // Right panel: output plane
                            ctx.save();
                            ctx.beginPath();
                            ctx.rect(halfW, 0, halfW, viz.height);
                            ctx.clip();

                            // Grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx2 = -10; gx2 <= 10; gx2++) {
                                var sx2 = rightOx + gx2 * sc;
                                ctx.beginPath(); ctx.moveTo(sx2, 0); ctx.lineTo(sx2, viz.height); ctx.stroke();
                            }
                            for (var gy2 = -10; gy2 <= 10; gy2++) {
                                var sy2 = oy - gy2 * sc;
                                ctx.beginPath(); ctx.moveTo(halfW, sy2); ctx.lineTo(viz.width, sy2); ctx.stroke();
                            }
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(halfW, oy); ctx.lineTo(viz.width, oy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rightOx, 0); ctx.lineTo(rightOx, viz.height); ctx.stroke();

                            // Transform the grid through f
                            var steps = 30;
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.5;
                            for (var i2 = 0; i2 <= gridN; i2++) {
                                var t2 = -eps + 2 * eps * i2 / gridN;
                                // horizontal line: y = y0 + t2, x varies
                                ctx.beginPath();
                                for (var s = 0; s <= steps; s++) {
                                    var xx = x0 - eps + 2 * eps * s / steps;
                                    var yy = y0 + t2;
                                    var w = fc.f(xx, yy);
                                    var px = rightOx + w[0] * sc;
                                    var py = oy - w[1] * sc;
                                    s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                // vertical line: x = x0 + t2, y varies
                                ctx.beginPath();
                                for (var s2 = 0; s2 <= steps; s2++) {
                                    var xx2 = x0 + t2;
                                    var yy2 = y0 - eps + 2 * eps * s2 / steps;
                                    var w2 = fc.f(xx2, yy2);
                                    var px2 = rightOx + w2[0] * sc;
                                    var py2 = oy - w2[1] * sc;
                                    s2 === 0 ? ctx.moveTo(px2, py2) : ctx.lineTo(px2, py2);
                                }
                                ctx.stroke();
                            }

                            // f(z0) point
                            var fz0 = fc.f(x0, y0);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(rightOx + fz0[0] * sc, oy - fz0[1] * sc, 6, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                            ctx.fillText('f(z\u2080)', rightOx + fz0[0] * sc + 10, oy - fz0[1] * sc - 5);

                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.fillText('Output: f(z) = ' + fc.label, halfW + halfW / 2, 18);
                            ctx.restore();

                            // Dividing line
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, viz.height); ctx.stroke();
                            ctx.setLineDash([]);

                            // Info: derivative value
                            var dfVal = fc.df(x0, y0);
                            var mag = Math.sqrt(dfVal[0] * dfVal[0] + dfVal[1] * dfVal[1]);
                            var ang = Math.atan2(dfVal[1], dfVal[0]) * 180 / Math.PI;
                            ctx.fillStyle = viz.colors.white; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(
                                "f'(z\u2080) = " + dfVal[0].toFixed(2) + ' + ' + dfVal[1].toFixed(2) + 'i' +
                                '    |f\'| = ' + mag.toFixed(2) + '    arg = ' + ang.toFixed(1) + '\u00B0',
                                viz.width / 2, viz.height - 10
                            );

                            // Draggable overlay (use left panel coords)
                            z0.x = Math.max(-3, Math.min(3, z0.x));
                            z0.y = Math.max(-3, Math.min(3, z0.y));
                            // Override toScreen for draggable rendering
                            var origToScreen = viz.toScreen.bind(viz);
                            viz.toScreen = function(x, y) { return [leftOx + x * sc, oy - y * sc]; };
                            viz.drawDraggables();
                            viz.toScreen = origToScreen;
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Using the limit definition, show that \\(f(z) = \\bar{z}\\) (complex conjugation) is not complex differentiable at any point.',
                    hint: 'Compute the difference quotient \\(\\frac{\\overline{z_0 + \\Delta z} - \\bar{z}_0}{\\Delta z}\\). Try \\(\\Delta z = h\\) (real) and \\(\\Delta z = ih\\) (imaginary).',
                    solution: 'We have \\(\\frac{\\overline{z_0 + \\Delta z} - \\bar{z}_0}{\\Delta z} = \\frac{\\overline{\\Delta z}}{\\Delta z}\\). If \\(\\Delta z = h \\in \\mathbb{R}\\), this equals \\(h/h = 1\\). If \\(\\Delta z = ih\\), this equals \\(-ih/(ih) = -1\\). The limits differ, so the derivative does not exist at any \\(z_0\\).'
                },
                {
                    question: 'Compute \\(f\'(z)\\) for \\(f(z) = z^3 - 2z + 1\\) using the differentiation rules.',
                    hint: 'Apply the power rule and sum rule, just as in real calculus.',
                    solution: '\\(f\'(z) = 3z^2 - 2\\). The same rules apply: \\(\\frac{d}{dz}z^n = nz^{n-1}\\), linearity of differentiation, and the derivative of a constant is zero.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Cauchy-Riemann Equations
        // ================================================================
        {
            id: 'sec-cauchy-riemann',
            title: 'The Cauchy-Riemann Equations',
            content: `
<h2>The Cauchy-Riemann Equations</h2>

<div class="env-block intuition">
    <div class="env-title">Deriving the Equations</div>
    <div class="env-body">
        <p>The key insight is simple: if the complex derivative exists, the limit must be the same regardless of direction. Let us approach \\(\\Delta z \\to 0\\) along two specific directions and see what equality of the limits forces.</p>
    </div>
</div>

<p>Write \\(f = u + iv\\) and \\(z_0 = x_0 + iy_0\\). The difference quotient is</p>
\\[\\frac{f(z_0 + \\Delta z) - f(z_0)}{\\Delta z} = \\frac{[u(x_0 + \\Delta x, y_0 + \\Delta y) - u(x_0, y_0)] + i[v(x_0 + \\Delta x, y_0 + \\Delta y) - v(x_0, y_0)]}{\\Delta x + i\\Delta y}.\\]

<p><strong>Approach 1: along the real axis</strong> (\\(\\Delta z = \\Delta x\\), \\(\\Delta y = 0\\)):</p>
\\[f'(z_0) = \\frac{\\partial u}{\\partial x} + i\\frac{\\partial v}{\\partial x}.\\]

<p><strong>Approach 2: along the imaginary axis</strong> (\\(\\Delta z = i\\Delta y\\), \\(\\Delta x = 0\\)):</p>
\\[f'(z_0) = \\frac{1}{i}\\left(\\frac{\\partial u}{\\partial y} + i\\frac{\\partial v}{\\partial y}\\right) = \\frac{\\partial v}{\\partial y} - i\\frac{\\partial u}{\\partial y}.\\]

<p>Equating real and imaginary parts of these two expressions:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.2 (Cauchy-Riemann Equations)</div>
    <div class="env-body">
        <p>If \\(f(z) = u(x,y) + iv(x,y)\\) is complex differentiable at \\(z_0 = x_0 + iy_0\\), then the partial derivatives of \\(u\\) and \\(v\\) satisfy</p>
        \\[\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\qquad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}\\]
        <p>at \\((x_0, y_0)\\). These are the <strong>Cauchy-Riemann equations</strong> (CR equations).</p>
    </div>
</div>

<p>The converse also holds under a mild regularity condition:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.3 (Sufficient Condition)</div>
    <div class="env-body">
        <p>If \\(u\\) and \\(v\\) have continuous first partial derivatives in a neighborhood of \\((x_0, y_0)\\) and satisfy the Cauchy-Riemann equations there, then \\(f = u + iv\\) is complex differentiable at \\(z_0\\), and</p>
        \\[f'(z_0) = \\frac{\\partial u}{\\partial x}(x_0, y_0) + i\\frac{\\partial v}{\\partial x}(x_0, y_0).\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Verifying CR for \\(f(z) = z^2\\)</div>
    <div class="env-body">
        <p>Write \\(f(z) = (x+iy)^2 = (x^2 - y^2) + i(2xy)\\), so \\(u = x^2 - y^2\\), \\(v = 2xy\\).</p>
        <ul>
            <li>\\(u_x = 2x = v_y\\) \\(\\checkmark\\)</li>
            <li>\\(u_y = -2y = -v_x\\) \\(\\checkmark\\)</li>
        </ul>
        <p>The CR equations hold everywhere, confirming \\(f(z) = z^2\\) is complex differentiable on all of \\(\\mathbb{C}\\).</p>
    </div>
</div>

<h3>The Jacobian Viewpoint</h3>

<p>The real-variable Jacobian of \\(f\\) viewed as a map \\(\\mathbb{R}^2 \\to \\mathbb{R}^2\\) is</p>
\\[J_f = \\begin{pmatrix} u_x & u_y \\\\ v_x & v_y \\end{pmatrix}.\\]

<p>The CR equations say this matrix has the special form</p>
\\[J_f = \\begin{pmatrix} a & -b \\\\ b & a \\end{pmatrix} \\quad \\text{where } a = u_x, \\; b = v_x.\\]

<p>This is exactly the matrix representing multiplication by the complex number \\(a + ib = f'(z_0)\\). It decomposes as \\(r \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}\\), a rotation by \\(\\theta = \\arg f'(z_0)\\) and scaling by \\(r = |f'(z_0)|\\). The Jacobian determinant is \\(a^2 + b^2 = |f'(z_0)|^2 \\geq 0\\), which is strictly positive whenever \\(f'(z_0) \\neq 0\\), so the map is orientation-preserving and locally invertible.</p>

<div class="viz-placeholder" data-viz="viz-cauchy-riemann"></div>
`,
            visualizations: [
                {
                    id: 'viz-cauchy-riemann',
                    title: 'Cauchy-Riemann Verification: Heatmaps of u and v',
                    description: 'For f(z) = z\u00B2, view side-by-side heatmaps of u(x,y) = x\u00B2 - y\u00B2 and v(x,y) = 2xy. The CR equations u_x = v_y and u_y = -v_x can be verified by comparing the gradients at each point.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 340,
                            scale: 40
                        });

                        var showGrad = false;
                        VizEngine.createButton(controls, 'Toggle Gradients', function() {
                            showGrad = !showGrad;
                            draw();
                        });

                        var funcIdx = 0;
                        var funcDefs = [
                            {
                                label: 'z\u00B2',
                                u: function(x,y) { return x*x - y*y; },
                                v: function(x,y) { return 2*x*y; },
                                ux: function(x,y) { return 2*x; },
                                uy: function(x,y) { return -2*y; },
                                vx: function(x,y) { return 2*y; },
                                vy: function(x,y) { return 2*x; }
                            },
                            {
                                label: 'e^z',
                                u: function(x,y) { return Math.exp(x)*Math.cos(y); },
                                v: function(x,y) { return Math.exp(x)*Math.sin(y); },
                                ux: function(x,y) { return Math.exp(x)*Math.cos(y); },
                                uy: function(x,y) { return -Math.exp(x)*Math.sin(y); },
                                vx: function(x,y) { return Math.exp(x)*Math.sin(y); },
                                vy: function(x,y) { return Math.exp(x)*Math.cos(y); }
                            }
                        ];

                        VizEngine.createButton(controls, 'z\u00B2', function() { funcIdx = 0; draw(); });
                        VizEngine.createButton(controls, 'e^z', function() { funcIdx = 1; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var fd = funcDefs[funcIdx];
                            var halfW = Math.floor(viz.width / 2) - 10;
                            var range = [-3, 3];

                            // Draw u heatmap on left
                            var imgU = ctx.createImageData(halfW, viz.height);
                            var imgV = ctx.createImageData(halfW, viz.height);

                            // Find range
                            var uMin = Infinity, uMax = -Infinity, vMin = Infinity, vMax = -Infinity;
                            for (var py = 0; py < viz.height; py++) {
                                for (var px = 0; px < halfW; px++) {
                                    var x = range[0] + (range[1] - range[0]) * px / halfW;
                                    var y = range[1] - (range[1] - range[0]) * py / viz.height;
                                    var uv = fd.u(x, y);
                                    var vv = fd.v(x, y);
                                    if (isFinite(uv)) { uMin = Math.min(uMin, uv); uMax = Math.max(uMax, uv); }
                                    if (isFinite(vv)) { vMin = Math.min(vMin, vv); vMax = Math.max(vMax, vv); }
                                }
                            }
                            var uRange = uMax - uMin || 1;
                            var vRange = vMax - vMin || 1;

                            for (var py2 = 0; py2 < viz.height; py2++) {
                                for (var px2 = 0; px2 < halfW; px2++) {
                                    var x2 = range[0] + (range[1] - range[0]) * px2 / halfW;
                                    var y2 = range[1] - (range[1] - range[0]) * py2 / viz.height;
                                    var idx = (py2 * halfW + px2) * 4;

                                    var tu = Math.max(0, Math.min(1, (fd.u(x2, y2) - uMin) / uRange));
                                    var cu = VizEngine.colormapSample(tu, 'coolwarm');
                                    imgU.data[idx] = cu[0]; imgU.data[idx+1] = cu[1]; imgU.data[idx+2] = cu[2]; imgU.data[idx+3] = 255;

                                    var tv = Math.max(0, Math.min(1, (fd.v(x2, y2) - vMin) / vRange));
                                    var cv = VizEngine.colormapSample(tv, 'viridis');
                                    imgV.data[idx] = cv[0]; imgV.data[idx+1] = cv[1]; imgV.data[idx+2] = cv[2]; imgV.data[idx+3] = 255;
                                }
                            }

                            ctx.putImageData(imgU, 0, 0);
                            ctx.putImageData(imgV, halfW + 20, 0);

                            // Labels
                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('u(x,y)', halfW / 2, 18);
                            ctx.fillText('v(x,y)', halfW + 20 + halfW / 2, 18);

                            // Draw gradient arrows if toggled
                            if (showGrad) {
                                var arrowStep = 0.8;
                                var arrowScale = 0.12;
                                for (var ax = range[0] + 0.4; ax < range[1]; ax += arrowStep) {
                                    for (var ay = range[0] + 0.4; ay < range[1]; ay += arrowStep) {
                                        // u gradient on left
                                        var gux = fd.ux(ax, ay) * arrowScale;
                                        var guy = fd.uy(ax, ay) * arrowScale;
                                        var spx = (ax - range[0]) / (range[1] - range[0]) * halfW;
                                        var spy = (range[1] - ay) / (range[1] - range[0]) * viz.height;

                                        ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 1.5;
                                        ctx.beginPath(); ctx.moveTo(spx, spy);
                                        ctx.lineTo(spx + gux * halfW / (range[1] - range[0]), spy - guy * viz.height / (range[1] - range[0]));
                                        ctx.stroke();

                                        // v gradient on right
                                        var gvx = fd.vx(ax, ay) * arrowScale;
                                        var gvy = fd.vy(ax, ay) * arrowScale;
                                        var spx2 = halfW + 20 + (ax - range[0]) / (range[1] - range[0]) * halfW;
                                        var spy2 = (range[1] - ay) / (range[1] - range[0]) * viz.height;

                                        ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 1.5;
                                        ctx.beginPath(); ctx.moveTo(spx2, spy2);
                                        ctx.lineTo(spx2 + gvx * halfW / (range[1] - range[0]), spy2 - gvy * viz.height / (range[1] - range[0]));
                                        ctx.stroke();
                                    }
                                }
                            }

                            // CR verification text
                            ctx.fillStyle = viz.colors.teal; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('CR: u\u2093 = v\u1D67,  u\u1D67 = -v\u2093   \u2714', viz.width / 2, viz.height - 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify the Cauchy-Riemann equations for \\(f(z) = e^z = e^x(\\cos y + i \\sin y)\\).',
                    hint: 'Identify \\(u = e^x \\cos y\\) and \\(v = e^x \\sin y\\). Compute all four partial derivatives.',
                    solution: '\\(u_x = e^x \\cos y\\), \\(v_y = e^x \\cos y\\), so \\(u_x = v_y\\). \\(u_y = -e^x \\sin y\\), \\(v_x = e^x \\sin y\\), so \\(u_y = -v_x\\). CR holds everywhere; \\(e^z\\) is entire.'
                },
                {
                    question: 'Show that \\(f(z) = |z|^2 = x^2 + y^2\\) satisfies the CR equations only at the origin.',
                    hint: 'Here \\(u = x^2 + y^2\\) and \\(v = 0\\). Compute the partial derivatives and find where CR holds.',
                    solution: '\\(u_x = 2x\\), \\(v_y = 0\\), so \\(u_x = v_y\\) requires \\(x = 0\\). \\(u_y = 2y\\), \\(v_x = 0\\), so \\(u_y = -v_x\\) requires \\(y = 0\\). Both hold only at \\((0,0)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Analytic (Holomorphic) Functions
        // ================================================================
        {
            id: 'sec-analytic',
            title: 'Analytic (Holomorphic) Functions',
            content: `
<h2>Analytic (Holomorphic) Functions</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Holomorphic, Analytic, Entire)</div>
    <div class="env-body">
        <p>Let \\(\\Omega \\subseteq \\mathbb{C}\\) be open.</p>
        <ul>
            <li>\\(f\\) is <strong>holomorphic</strong> (or <strong>analytic</strong>) on \\(\\Omega\\) if \\(f'(z)\\) exists for every \\(z \\in \\Omega\\).</li>
            <li>\\(f\\) is <strong>holomorphic at \\(z_0\\)</strong> if it is holomorphic on some open disk containing \\(z_0\\).</li>
            <li>\\(f\\) is <strong>entire</strong> if it is holomorphic on all of \\(\\mathbb{C}\\).</li>
        </ul>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Terminology</div>
    <div class="env-body">
        <p>The terms "holomorphic" and "analytic" are used interchangeably in complex analysis. Strictly, "analytic" means locally representable by a convergent power series, while "holomorphic" means complex differentiable on an open set. A deep theorem (proved later in the course) shows these two notions coincide. We will use both terms.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Catalogue of Entire Functions</div>
    <div class="env-body">
        <p>The following functions are entire (holomorphic on all of \\(\\mathbb{C}\\)):</p>
        <ul>
            <li>Polynomials: \\(p(z) = a_nz^n + \\cdots + a_1z + a_0\\)</li>
            <li>\\(e^z\\), \\(\\sin z\\), \\(\\cos z\\)</li>
            <li>\\(\\sinh z\\), \\(\\cosh z\\)</li>
        </ul>
        <p>Rational functions \\(p(z)/q(z)\\) are holomorphic wherever \\(q(z) \\neq 0\\). The function \\(1/z\\) is holomorphic on \\(\\mathbb{C} \\setminus \\{0\\}\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = |z|^2\\) is Nowhere Analytic</div>
    <div class="env-body">
        <p>We showed that \\(f(z) = |z|^2\\) satisfies CR only at the origin. But holomorphicity at a point requires the derivative to exist on an entire open set containing that point. Since \\(f\\) is not differentiable at any point other than the origin, there is no open set on which \\(f\\) is differentiable. Thus \\(f(z) = |z|^2\\) is nowhere analytic, even though it is differentiable at a single point.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-not-analytic"></div>

<h3>Why Analyticity is So Rigid</h3>

<p>The remarkable consequence of complex differentiability is a cascade of regularity results (to be proved in subsequent chapters):</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.4 (Preview of Rigidity)</div>
    <div class="env-body">
        <p>If \\(f\\) is holomorphic on an open set \\(\\Omega\\), then:</p>
        <ol>
            <li>\\(f\\) is infinitely differentiable on \\(\\Omega\\)</li>
            <li>\\(f\\) has a convergent power series expansion around every point of \\(\\Omega\\)</li>
            <li>\\(f\\) satisfies the Cauchy integral formula</li>
            <li>\\(f\\) obeys the maximum modulus principle</li>
            <li>If \\(f\\) is not identically zero, its zeros are isolated</li>
        </ol>
        <p>None of these hold for general real-differentiable functions \\(\\mathbb{R}^2 \\to \\mathbb{R}^2\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-not-analytic',
                    title: 'Why |z|\u00B2 Fails: CR Equations Away from the Origin',
                    description: 'For f(z) = |z|\u00B2, u = x\u00B2 + y\u00B2 and v = 0. The CR "error" u_x - v_y = 2x and u_y + v_x = 2y is shown as a vector field. It vanishes only at the origin, confirming CR holds only there.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 60
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw CR error vector field
                            var step = 0.5;
                            var arrowLen = 18;
                            for (var x = -4; x <= 4; x += step) {
                                for (var y = -3; y <= 3; y += step) {
                                    // CR errors: e1 = u_x - v_y = 2x, e2 = u_y + v_x = 2y
                                    var e1 = 2 * x;
                                    var e2 = 2 * y;
                                    var mag = Math.sqrt(e1*e1 + e2*e2);
                                    if (mag < 0.01) continue;

                                    var sc = arrowLen / Math.max(mag, 1);
                                    var sx = viz.toScreen(x, y)[0];
                                    var sy = viz.toScreen(x, y)[1];

                                    // Color by magnitude
                                    var t = Math.min(1, mag / 6);
                                    var r = Math.round(248 * t + 100 * (1 - t));
                                    var g = Math.round(81 * t + 150 * (1 - t));
                                    var b = Math.round(73 * t + 200 * (1 - t));
                                    ctx.strokeStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(sx, sy);
                                    ctx.lineTo(sx + e1 * sc, sy - e2 * sc);
                                    ctx.stroke();

                                    // Arrowhead
                                    var angle = Math.atan2(-e2, e1);
                                    var tipX = sx + e1 * sc;
                                    var tipY = sy - e2 * sc;
                                    ctx.fillStyle = ctx.strokeStyle;
                                    ctx.beginPath();
                                    ctx.moveTo(tipX, tipY);
                                    ctx.lineTo(tipX - 6*Math.cos(angle - 0.4), tipY + 6*Math.sin(angle - 0.4));
                                    ctx.lineTo(tipX - 6*Math.cos(angle + 0.4), tipY + 6*Math.sin(angle + 0.4));
                                    ctx.closePath(); ctx.fill();
                                }
                            }

                            // Highlight origin
                            viz.drawPoint(0, 0, viz.colors.green, 'CR holds!', 7);

                            // Title
                            viz.screenText('CR Error for f(z) = |z|\u00B2', viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('Arrow = (u\u2093 - v\u1D67, u\u1D67 + v\u2093); vanishes only at origin', viz.width / 2, viz.height - 12, viz.colors.teal, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Determine where \\(f(z) = \\frac{z}{z^2 + 1}\\) is holomorphic.',
                    hint: 'A rational function is holomorphic wherever the denominator is nonzero. Factor \\(z^2 + 1\\).',
                    solution: '\\(z^2 + 1 = (z - i)(z + i) = 0\\) when \\(z = \\pm i\\). So \\(f\\) is holomorphic on \\(\\mathbb{C} \\setminus \\{i, -i\\}\\).'
                },
                {
                    question: 'Show that \\(f(z) = \\text{Re}(z) = x\\) is not holomorphic anywhere.',
                    hint: 'Compute \\(u\\) and \\(v\\) and check the CR equations.',
                    solution: '\\(u = x, v = 0\\). Then \\(u_x = 1\\) but \\(v_y = 0\\), so \\(u_x \\neq v_y\\) everywhere. The CR equations never hold, so \\(f\\) is nowhere differentiable (and hence nowhere analytic).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Conformal Mappings
        // ================================================================
        {
            id: 'sec-conformal',
            title: 'Conformal Mappings',
            content: `
<h2>Conformal Mappings</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Conformal Map)</div>
    <div class="env-body">
        <p>A map \\(f: \\Omega \\to \\mathbb{C}\\) is <strong>conformal</strong> at \\(z_0\\) if it preserves the angle between any two smooth curves passing through \\(z_0\\), both in magnitude and orientation. Equivalently, \\(f\\) is conformal at \\(z_0\\) if and only if \\(f\\) is holomorphic at \\(z_0\\) and \\(f'(z_0) \\neq 0\\).</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Why Holomorphic + Nonzero Derivative = Conformal</div>
    <div class="env-body">
        <p>A holomorphic function acts locally like multiplication by \\(f'(z_0) = re^{i\\theta}\\). This rotates every direction by the same angle \\(\\theta\\) and scales by the same factor \\(r\\). Since every tangent vector is rotated by the same amount, the angle between any two curves is preserved. If \\(f'(z_0) = 0\\), the local behavior is degenerate (the map "collapses" directions), and angles are typically multiplied.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.5 (Conformality)</div>
    <div class="env-body">
        <p>Let \\(f\\) be holomorphic at \\(z_0\\) with \\(f'(z_0) \\neq 0\\). Then \\(f\\) preserves angles at \\(z_0\\): if two smooth curves \\(\\gamma_1, \\gamma_2\\) cross at \\(z_0\\) with angle \\(\\alpha\\) between their tangent vectors, then \\(f \\circ \\gamma_1\\) and \\(f \\circ \\gamma_2\\) cross at \\(f(z_0)\\) with the same angle \\(\\alpha\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = z^2\\) at \\(z_0 = 1\\) vs. \\(z_0 = 0\\)</div>
    <div class="env-body">
        <p>At \\(z_0 = 1\\): \\(f'(1) = 2 \\neq 0\\), so \\(f\\) is conformal. Two curves crossing at right angles at \\(z = 1\\) map to curves crossing at right angles at \\(f(1) = 1\\).</p>
        <p>At \\(z_0 = 0\\): \\(f'(0) = 0\\). Near the origin, \\(f(z) = z^2\\) doubles angles. Two curves crossing at angle \\(\\alpha\\) map to curves crossing at angle \\(2\\alpha\\). This is why the map is not conformal at the origin.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-conformality"></div>

<h3>Applications of Conformality</h3>

<p>Conformal maps are central to applied mathematics:</p>
<ul>
    <li><strong>Fluid dynamics:</strong> If \\(f\\) maps one region conformally onto another, solutions to Laplace's equation (fluid flow, electrostatics) in the image region pull back to solutions in the original region.</li>
    <li><strong>Cartography:</strong> The Mercator projection is a conformal map; it distorts areas but preserves angles, which is why compass bearings appear as straight lines.</li>
    <li><strong>Engineering:</strong> Conformal maps transform complex boundary shapes into simpler ones (e.g., circles), making boundary value problems tractable.</li>
</ul>
`,
            visualizations: [
                {
                    id: 'viz-conformality',
                    title: 'Conformal Mapping: Angle Preservation',
                    description: 'A Cartesian grid is mapped through f(z) = z\u00B2. Where f\'(z) \u2260 0, grid lines remain orthogonal (angles preserved). At the origin where f\'(0) = 0, angles are doubled.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 50
                        });

                        var funcChoice = 0;
                        var funcList = [
                            { label: 'z\u00B2', f: function(x,y) { return [x*x-y*y, 2*x*y]; } },
                            { label: 'z\u00B3', f: function(x,y) { var x2=x*x,y2=y*y; return [x*x2-3*x*y2, 3*x2*y-y*y2]; } },
                            { label: '1/z', f: function(x,y) { var d=x*x+y*y+1e-10; return [x/d, -y/d]; } },
                            { label: 'e^z', f: function(x,y) { var ex=Math.exp(x); return [ex*Math.cos(y), ex*Math.sin(y)]; } }
                        ];

                        VizEngine.createButton(controls, 'z\u00B2', function() { funcChoice = 0; draw(); });
                        VizEngine.createButton(controls, 'z\u00B3', function() { funcChoice = 1; draw(); });
                        VizEngine.createButton(controls, '1/z', function() { funcChoice = 2; draw(); });
                        VizEngine.createButton(controls, 'e^z', function() { funcChoice = 3; draw(); });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var fc = funcList[funcChoice];
                            var halfW = viz.width / 2;
                            var ox1 = halfW / 2, ox2 = halfW + halfW / 2;
                            var oy = viz.height / 2;
                            var sc = viz.scale;

                            // Left panel: input grid
                            ctx.save();
                            ctx.beginPath(); ctx.rect(0, 0, halfW, viz.height); ctx.clip();
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx = -5; gx <= 5; gx++) {
                                ctx.beginPath(); ctx.moveTo(ox1 + gx*sc, 0); ctx.lineTo(ox1 + gx*sc, viz.height); ctx.stroke();
                            }
                            for (var gy = -5; gy <= 5; gy++) {
                                ctx.beginPath(); ctx.moveTo(0, oy - gy*sc); ctx.lineTo(halfW, oy - gy*sc); ctx.stroke();
                            }
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(halfW, oy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(ox1, 0); ctx.lineTo(ox1, viz.height); ctx.stroke();

                            // Draw grid lines in color
                            var gridRange = 2.5;
                            var gridStep = 0.5;
                            var steps = 40;

                            // Horizontal lines (constant y)
                            for (var cy = -gridRange; cy <= gridRange; cy += gridStep) {
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 1.2;
                                ctx.beginPath();
                                for (var s = 0; s <= steps; s++) {
                                    var cx = -gridRange + 2*gridRange*s/steps;
                                    var px = ox1 + cx*sc, py = oy - cy*sc;
                                    s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }
                            // Vertical lines (constant x)
                            for (var cx2 = -gridRange; cx2 <= gridRange; cx2 += gridStep) {
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.2;
                                ctx.beginPath();
                                for (var s2 = 0; s2 <= steps; s2++) {
                                    var cy2 = -gridRange + 2*gridRange*s2/steps;
                                    var px2 = ox1 + cx2*sc, py2 = oy - cy2*sc;
                                    s2 === 0 ? ctx.moveTo(px2, py2) : ctx.lineTo(px2, py2);
                                }
                                ctx.stroke();
                            }

                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.fillText('Input: z-plane', halfW/2, 18);
                            ctx.restore();

                            // Right panel: transformed grid
                            ctx.save();
                            ctx.beginPath(); ctx.rect(halfW, 0, halfW, viz.height); ctx.clip();
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gx2 = -5; gx2 <= 5; gx2++) {
                                ctx.beginPath(); ctx.moveTo(ox2 + gx2*sc, 0); ctx.lineTo(ox2 + gx2*sc, viz.height); ctx.stroke();
                            }
                            for (var gy2 = -5; gy2 <= 5; gy2++) {
                                ctx.beginPath(); ctx.moveTo(halfW, oy - gy2*sc); ctx.lineTo(viz.width, oy - gy2*sc); ctx.stroke();
                            }
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(halfW, oy); ctx.lineTo(viz.width, oy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(ox2, 0); ctx.lineTo(ox2, viz.height); ctx.stroke();

                            // Transformed horizontal lines
                            for (var cy3 = -gridRange; cy3 <= gridRange; cy3 += gridStep) {
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 1.2;
                                ctx.beginPath();
                                var started = false;
                                for (var s3 = 0; s3 <= steps; s3++) {
                                    var cx3 = -gridRange + 2*gridRange*s3/steps;
                                    var w = fc.f(cx3, cy3);
                                    var px3 = ox2 + w[0]*sc, py3 = oy - w[1]*sc;
                                    if (!isFinite(px3) || !isFinite(py3) || Math.abs(px3-ox2)>halfW || Math.abs(py3-oy)>viz.height) { started = false; continue; }
                                    if (!started) { ctx.moveTo(px3, py3); started = true; } else { ctx.lineTo(px3, py3); }
                                }
                                ctx.stroke();
                            }
                            // Transformed vertical lines
                            for (var cx4 = -gridRange; cx4 <= gridRange; cx4 += gridStep) {
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 1.2;
                                ctx.beginPath();
                                var started2 = false;
                                for (var s4 = 0; s4 <= steps; s4++) {
                                    var cy4 = -gridRange + 2*gridRange*s4/steps;
                                    var w2 = fc.f(cx4, cy4);
                                    var px4 = ox2 + w2[0]*sc, py4 = oy - w2[1]*sc;
                                    if (!isFinite(px4) || !isFinite(py4) || Math.abs(px4-ox2)>halfW || Math.abs(py4-oy)>viz.height) { started2 = false; continue; }
                                    if (!started2) { ctx.moveTo(px4, py4); started2 = true; } else { ctx.lineTo(px4, py4); }
                                }
                                ctx.stroke();
                            }

                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.fillText('Output: f(z) = ' + fc.label, halfW + halfW/2, 18);
                            ctx.restore();

                            // Divider
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                            ctx.setLineDash([4,4]);
                            ctx.beginPath(); ctx.moveTo(halfW, 0); ctx.lineTo(halfW, viz.height); ctx.stroke();
                            ctx.setLineDash([]);

                            // Note about conformality
                            ctx.fillStyle = viz.colors.teal; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Grid lines remain orthogonal where f\'(z) \u2260 0 (conformal)', viz.width/2, viz.height - 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'At which points is \\(f(z) = z^3\\) not conformal? What happens to angles at those points?',
                    hint: 'Find where \\(f\'(z) = 0\\). Then consider what \\(z^3\\) does to angles near that point.',
                    solution: '\\(f\'(z) = 3z^2 = 0\\) only at \\(z = 0\\). Away from the origin, \\(f\\) is conformal. At \\(z = 0\\), angles are tripled: if two curves meet at angle \\(\\alpha\\), their images meet at angle \\(3\\alpha\\). This is because \\(z^3\\) maps \\(re^{i\\theta} \\mapsto r^3 e^{3i\\theta}\\).'
                },
                {
                    question: 'Show that the M\\"obius transformation \\(f(z) = \\frac{az + b}{cz + d}\\) (with \\(ad - bc \\neq 0\\)) is conformal everywhere in its domain.',
                    hint: 'Compute \\(f\'(z)\\) using the quotient rule and show it is never zero on the domain.',
                    solution: 'By the quotient rule, \\(f\'(z) = \\frac{a(cz+d) - c(az+b)}{(cz+d)^2} = \\frac{ad - bc}{(cz+d)^2}\\). Since \\(ad - bc \\neq 0\\) and the denominator is nonzero on the domain \\(\\mathbb{C} \\setminus \\{-d/c\\}\\), we have \\(f\'(z) \\neq 0\\) everywhere in the domain.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Harmonic Functions
        // ================================================================
        {
            id: 'sec-harmonic',
            title: 'Harmonic Functions and Conjugates',
            content: `
<h2>Harmonic Functions and Conjugates</h2>

<div class="env-block definition">
    <div class="env-title">Definition (Harmonic Function)</div>
    <div class="env-body">
        <p>A real-valued function \\(\\phi(x,y)\\) with continuous second partial derivatives is <strong>harmonic</strong> on a domain \\(D\\) if it satisfies <strong>Laplace's equation</strong>:</p>
        \\[\\Delta \\phi = \\frac{\\partial^2 \\phi}{\\partial x^2} + \\frac{\\partial^2 \\phi}{\\partial y^2} = 0 \\quad \\text{on } D.\\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 2.6 (Holomorphic Implies Harmonic)</div>
    <div class="env-body">
        <p>If \\(f = u + iv\\) is holomorphic on an open set \\(\\Omega\\), then both \\(u\\) and \\(v\\) are harmonic on \\(\\Omega\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>By the Cauchy-Riemann equations: \\(u_x = v_y\\) and \\(u_y = -v_x\\). Differentiating the first with respect to \\(x\\) and the second with respect to \\(y\\):</p>
        \\[u_{xx} = v_{yx}, \\quad u_{yy} = -v_{xy}.\\]
        <p>Since the mixed partials are equal (\\(v_{xy} = v_{yx}\\) by continuity), adding gives</p>
        \\[u_{xx} + u_{yy} = v_{yx} - v_{xy} = 0.\\]
        <p>The proof for \\(v\\) is analogous.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Harmonic Conjugate)</div>
    <div class="env-body">
        <p>If \\(u\\) is harmonic on a simply connected domain \\(D\\), a function \\(v\\) such that \\(f = u + iv\\) is holomorphic on \\(D\\) is called a <strong>harmonic conjugate</strong> of \\(u\\). The conjugate \\(v\\) is unique up to an additive constant.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Finding a Harmonic Conjugate</div>
    <div class="env-body">
        <p>Let \\(u(x,y) = x^2 - y^2\\). Verify that \\(u\\) is harmonic: \\(u_{xx} = 2\\), \\(u_{yy} = -2\\), so \\(u_{xx} + u_{yy} = 0\\). \\(\\checkmark\\)</p>
        <p>To find \\(v\\): from \\(v_y = u_x = 2x\\), integrate: \\(v = 2xy + g(x)\\). From \\(v_x = -u_y = 2y\\), so \\(2y + g'(x) = 2y\\), giving \\(g'(x) = 0\\), thus \\(g(x) = C\\). The conjugate is \\(v = 2xy + C\\).</p>
        <p>The holomorphic function is \\(f = (x^2 - y^2) + i(2xy) = z^2\\), as expected.</p>
    </div>
</div>

<h3>Orthogonality of Level Curves</h3>

<p>A beautiful geometric fact: the level curves of \\(u\\) and its harmonic conjugate \\(v\\) are everywhere orthogonal (where the gradients are nonzero). This follows because</p>
\\[\\nabla u = (u_x, u_y), \\qquad \\nabla v = (v_x, v_y) = (-u_y, u_x),\\]
<p>by the CR equations. The dot product \\(\\nabla u \\cdot \\nabla v = u_x(-u_y) + u_y(u_x) = 0\\).</p>

<div class="viz-placeholder" data-viz="viz-harmonic-conjugate"></div>
`,
            visualizations: [
                {
                    id: 'viz-harmonic-conjugate',
                    title: 'Harmonic Conjugates: Orthogonal Level Curves',
                    description: 'Level curves of u (blue) and its harmonic conjugate v (orange) for f(z) = z\u00B2. The curves always meet at right angles, a consequence of the Cauchy-Riemann equations.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 60
                        });

                        var funcIdx = 0;
                        var funcDefs = [
                            { label: 'z\u00B2', u: function(x,y) { return x*x-y*y; }, v: function(x,y) { return 2*x*y; } },
                            { label: 'z\u00B3', u: function(x,y) { return x*x*x-3*x*y*y; }, v: function(x,y) { return 3*x*x*y-y*y*y; } },
                            { label: 'e^z', u: function(x,y) { return Math.exp(x)*Math.cos(y); }, v: function(x,y) { return Math.exp(x)*Math.sin(y); } }
                        ];

                        VizEngine.createButton(controls, 'z\u00B2', function() { funcIdx = 0; draw(); });
                        VizEngine.createButton(controls, 'z\u00B3', function() { funcIdx = 1; draw(); });
                        VizEngine.createButton(controls, 'e^z', function() { funcIdx = 2; draw(); });

                        function drawContours(func, color, numContours) {
                            var ctx = viz.ctx;
                            var xMin = -4, xMax = 4, yMin = -3, yMax = 3;
                            var nx = 300, ny = 200;
                            var dx = (xMax - xMin) / nx, dy = (yMax - yMin) / ny;

                            // Sample values
                            var vals = [];
                            var vMin = Infinity, vMax = -Infinity;
                            for (var j = 0; j <= ny; j++) {
                                vals[j] = [];
                                for (var i = 0; i <= nx; i++) {
                                    var x = xMin + i * dx;
                                    var y = yMin + j * dy;
                                    var val = func(x, y);
                                    vals[j][i] = val;
                                    if (isFinite(val) && Math.abs(val) < 100) { vMin = Math.min(vMin, val); vMax = Math.max(vMax, val); }
                                }
                            }

                            // Choose contour levels
                            var levels = [];
                            var range = vMax - vMin;
                            for (var k = 0; k < numContours; k++) {
                                levels.push(vMin + range * (k + 0.5) / numContours);
                            }

                            // Marching squares (simplified)
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 1.2;
                            for (var li = 0; li < levels.length; li++) {
                                var level = levels[li];
                                ctx.beginPath();
                                for (var jj = 0; jj < ny; jj++) {
                                    for (var ii = 0; ii < nx; ii++) {
                                        var v00 = vals[jj][ii] - level;
                                        var v10 = vals[jj][ii+1] - level;
                                        var v01 = vals[jj+1][ii] - level;
                                        var v11 = vals[jj+1][ii+1] - level;

                                        var x0 = xMin + ii * dx, x1 = x0 + dx;
                                        var y0 = yMin + jj * dy, y1 = y0 + dy;

                                        // Find crossings on edges
                                        var edges = [];
                                        if (v00 * v10 < 0) edges.push([x0 + dx*(-v00)/(v10-v00), y0]);
                                        if (v10 * v11 < 0) edges.push([x1, y0 + dy*(-v10)/(v11-v10)]);
                                        if (v01 * v11 < 0) edges.push([x0 + dx*(-v01)/(v11-v01), y1]);
                                        if (v00 * v01 < 0) edges.push([x0, y0 + dy*(-v00)/(v01-v00)]);

                                        if (edges.length >= 2) {
                                            var sp1 = viz.toScreen(edges[0][0], edges[0][1]);
                                            var sp2 = viz.toScreen(edges[1][0], edges[1][1]);
                                            ctx.moveTo(sp1[0], sp1[1]);
                                            ctx.lineTo(sp2[0], sp2[1]);
                                            if (edges.length === 4) {
                                                var sp3 = viz.toScreen(edges[2][0], edges[2][1]);
                                                var sp4 = viz.toScreen(edges[3][0], edges[3][1]);
                                                ctx.moveTo(sp3[0], sp3[1]);
                                                ctx.lineTo(sp4[0], sp4[1]);
                                            }
                                        }
                                    }
                                }
                                ctx.stroke();
                            }
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var fd = funcDefs[funcIdx];
                            drawContours(fd.u, viz.colors.blue, 15);
                            drawContours(fd.v, viz.colors.orange, 15);

                            // Legend
                            var ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.blue; ctx.fillRect(20, 15, 14, 3);
                            ctx.fillStyle = viz.colors.blue; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('u = const', 38, 20);

                            ctx.fillStyle = viz.colors.orange; ctx.fillRect(20, 30, 14, 3);
                            ctx.fillStyle = viz.colors.orange; ctx.fillText('v = const', 38, 35);

                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('f(z) = ' + fd.label + ': harmonic conjugate level curves', viz.width/2, viz.height - 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the harmonic conjugate of \\(u(x,y) = e^x \\cos y\\).',
                    hint: 'Use \\(v_y = u_x\\) to get \\(v\\) up to a function of \\(x\\), then use \\(v_x = -u_y\\) to determine that function.',
                    solution: '\\(v_y = u_x = e^x \\cos y\\), so \\(v = e^x \\sin y + g(x)\\). Then \\(v_x = e^x \\sin y + g\'(x)\\). But \\(v_x = -u_y = e^x \\sin y\\), so \\(g\'(x) = 0\\) and \\(v = e^x \\sin y + C\\). The holomorphic function is \\(f = e^x \\cos y + ie^x \\sin y = e^z\\).'
                },
                {
                    question: 'Show that \\(\\phi(x,y) = \\ln(x^2 + y^2)\\) is harmonic on \\(\\mathbb{R}^2 \\setminus \\{0\\}\\). Find its harmonic conjugate.',
                    hint: 'Compute \\(\\phi_{xx} + \\phi_{yy}\\) directly. For the conjugate, note that \\(\\ln|z|^2 = 2\\ln|z| = 2\\,\\text{Re}(\\log z)\\).',
                    solution: '\\(\\phi_x = 2x/(x^2+y^2)\\), \\(\\phi_{xx} = (2(x^2+y^2) - 4x^2)/(x^2+y^2)^2 = 2(y^2-x^2)/(x^2+y^2)^2\\). Similarly \\(\\phi_{yy} = 2(x^2-y^2)/(x^2+y^2)^2\\). Sum is zero. The conjugate is \\(\\psi = 2\\arctan(y/x)\\), since \\(\\ln(x^2+y^2) + 2i\\arctan(y/x) = 2\\log z\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Integration
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge: From Derivatives to Integrals',
            content: `
<h2>Bridge: From Derivatives to Integrals</h2>

<div class="env-block intuition">
    <div class="env-title">What Lies Ahead</div>
    <div class="env-body">
        <p>We have established the fundamental local theory: what it means for a complex function to be differentiable, and the remarkable constraints this imposes through the Cauchy-Riemann equations. But the deepest consequences of analyticity emerge when we combine differentiation with <em>integration</em> along curves in the complex plane.</p>
    </div>
</div>

<p>Here is a preview of the connections that the next chapters will develop:</p>

<h3>The Fluid-Flow Interpretation</h3>

<p>If \\(f = u + iv\\) is holomorphic, interpret \\(\\vec{F} = (u, -v)\\) as a velocity field on \\(\\mathbb{R}^2\\). The CR equations say:</p>
<ul>
    <li>\\(u_x + (-v)_y = u_x - v_y = 0\\) (the flow is <strong>incompressible</strong>, i.e., divergence-free)</li>
    <li>\\((-v)_x - u_y = -v_x - u_y = 0\\) (the flow is <strong>irrotational</strong>, i.e., curl-free)</li>
</ul>

<p>A flow that is both incompressible and irrotational is called a <strong>potential flow</strong>. The function \\(u\\) serves as the velocity potential and \\(v\\) as the stream function. The level curves of \\(v\\) (streamlines) and \\(u\\) (equipotential lines) form the orthogonal network we visualized earlier.</p>

<div class="viz-placeholder" data-viz="viz-streamlines"></div>

<h3>From CR to Cauchy's Theorem</h3>

<p>The irrotational and incompressible conditions are exactly what Green's theorem needs to conclude that the integral of \\(f\\) around a closed curve is zero (Cauchy's theorem). This is the subject of the next chapter.</p>

<h3>Looking Back</h3>

<p>Let us summarize the logical chain we have built:</p>

<div class="env-block remark">
    <div class="env-title">Summary</div>
    <div class="env-body">
        <ol>
            <li>The complex derivative requires direction-independence of the limit.</li>
            <li>Direction-independence forces the Cauchy-Riemann equations: \\(u_x = v_y\\), \\(u_y = -v_x\\).</li>
            <li>CR equations mean the Jacobian is a rotation-scaling matrix: conformality where \\(f' \\neq 0\\).</li>
            <li>CR equations imply \\(u\\) and \\(v\\) are harmonic; their level curves are orthogonal.</li>
            <li>The harmonic/CR structure connects to incompressible irrotational flow, setting the stage for complex integration.</li>
        </ol>
        <p>All of this extraordinary structure follows from a single requirement: that the complex derivative exists.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-streamlines',
                    title: 'Potential Flow: Streamlines and Equipotentials',
                    description: 'For a holomorphic function f(z), the real part u gives equipotential lines and the imaginary part v gives streamlines of an incompressible, irrotational flow. The two families of curves are orthogonal.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 50
                        });

                        var flowIdx = 0;
                        var flows = [
                            {
                                label: 'Uniform flow (f = z)',
                                u: function(x,y) { return x; },
                                v: function(x,y) { return y; },
                                vx: function(x,y) { return 1; },
                                vy: function(x,y) { return 0; }
                            },
                            {
                                label: 'Source/sink (f = log z)',
                                u: function(x,y) { return 0.5*Math.log(x*x+y*y+1e-10); },
                                v: function(x,y) { return Math.atan2(y, x); },
                                vx: function(x,y) { var d=x*x+y*y+1e-6; return x/d; },
                                vy: function(x,y) { var d=x*x+y*y+1e-6; return y/d; }
                            },
                            {
                                label: 'Dipole (f = 1/z)',
                                u: function(x,y) { var d=x*x+y*y+1e-6; return x/d; },
                                v: function(x,y) { var d=x*x+y*y+1e-6; return -y/d; },
                                vx: function(x,y) { var d=x*x+y*y+1e-6; return (y*y-x*x)/(d*d); },
                                vy: function(x,y) { var d=x*x+y*y+1e-6; return -2*x*y/(d*d); }
                            },
                            {
                                label: 'Vortex (f = -i log z)',
                                u: function(x,y) { return Math.atan2(y, x); },
                                v: function(x,y) { return -0.5*Math.log(x*x+y*y+1e-10); },
                                vx: function(x,y) { var d=x*x+y*y+1e-6; return -y/d; },
                                vy: function(x,y) { var d=x*x+y*y+1e-6; return x/d; }
                            }
                        ];

                        VizEngine.createButton(controls, 'Uniform', function() { flowIdx = 0; draw(); });
                        VizEngine.createButton(controls, 'Source', function() { flowIdx = 1; draw(); });
                        VizEngine.createButton(controls, 'Dipole', function() { flowIdx = 2; draw(); });
                        VizEngine.createButton(controls, 'Vortex', function() { flowIdx = 3; draw(); });

                        function drawContours(func, color, numContours) {
                            var ctx = viz.ctx;
                            var xMin = -4, xMax = 4, yMin = -3, yMax = 3;
                            var nx = 250, ny = 180;
                            var dx = (xMax - xMin) / nx, dy = (yMax - yMin) / ny;

                            var vals = [];
                            var vMin = Infinity, vMax = -Infinity;
                            for (var j = 0; j <= ny; j++) {
                                vals[j] = [];
                                for (var i = 0; i <= nx; i++) {
                                    var val = func(xMin + i * dx, yMin + j * dy);
                                    vals[j][i] = val;
                                    if (isFinite(val) && Math.abs(val) < 50) { vMin = Math.min(vMin, val); vMax = Math.max(vMax, val); }
                                }
                            }

                            var levels = [];
                            var range = vMax - vMin;
                            if (range < 1e-6) return;
                            for (var k = 0; k < numContours; k++) {
                                levels.push(vMin + range * (k + 0.5) / numContours);
                            }

                            ctx.strokeStyle = color; ctx.lineWidth = 1;
                            for (var li = 0; li < levels.length; li++) {
                                var level = levels[li];
                                ctx.beginPath();
                                for (var jj = 0; jj < ny; jj++) {
                                    for (var ii = 0; ii < nx; ii++) {
                                        var v00 = vals[jj][ii] - level;
                                        var v10 = vals[jj][ii+1] - level;
                                        var v01 = vals[jj+1][ii] - level;
                                        var v11 = vals[jj+1][ii+1] - level;

                                        var x0 = xMin + ii * dx, x1 = x0 + dx;
                                        var y0 = yMin + jj * dy, y1 = y0 + dy;

                                        var edges = [];
                                        if (v00 * v10 < 0) edges.push([x0 + dx*(-v00)/(v10-v00), y0]);
                                        if (v10 * v11 < 0) edges.push([x1, y0 + dy*(-v10)/(v11-v10)]);
                                        if (v01 * v11 < 0) edges.push([x0 + dx*(-v01)/(v11-v01), y1]);
                                        if (v00 * v01 < 0) edges.push([x0, y0 + dy*(-v00)/(v01-v00)]);

                                        if (edges.length >= 2) {
                                            var sp1 = viz.toScreen(edges[0][0], edges[0][1]);
                                            var sp2 = viz.toScreen(edges[1][0], edges[1][1]);
                                            ctx.moveTo(sp1[0], sp1[1]);
                                            ctx.lineTo(sp2[0], sp2[1]);
                                            if (edges.length === 4) {
                                                var sp3 = viz.toScreen(edges[2][0], edges[2][1]);
                                                var sp4 = viz.toScreen(edges[3][0], edges[3][1]);
                                                ctx.moveTo(sp3[0], sp3[1]);
                                                ctx.lineTo(sp4[0], sp4[1]);
                                            }
                                        }
                                    }
                                }
                                ctx.stroke();
                            }
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var fl = flows[flowIdx];

                            // Draw equipotentials (u = const) in blue
                            drawContours(fl.u, viz.colors.blue + 'aa', 12);
                            // Draw streamlines (v = const) in orange
                            drawContours(fl.v, viz.colors.orange + 'aa', 12);

                            // Draw velocity arrows
                            var ctx = viz.ctx;
                            var step = 0.7;
                            for (var ax = -3.5; ax <= 3.5; ax += step) {
                                for (var ay = -2.8; ay <= 2.8; ay += step) {
                                    var vxx = fl.vx(ax, ay);
                                    var vyy = fl.vy(ax, ay);
                                    var mag = Math.sqrt(vxx*vxx + vyy*vyy);
                                    if (mag < 0.001 || mag > 20) continue;
                                    var sc = Math.min(12, 8 / Math.sqrt(mag));
                                    var sp = viz.toScreen(ax, ay);
                                    ctx.strokeStyle = viz.colors.green + '88';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(sp[0], sp[1]);
                                    ctx.lineTo(sp[0] + vxx*sc, sp[1] - vyy*sc);
                                    ctx.stroke();
                                }
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.blue; ctx.fillRect(15, 12, 14, 3);
                            ctx.fillStyle = viz.colors.blue; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.fillText('Equipotentials (u)', 33, 16);

                            ctx.fillStyle = viz.colors.orange; ctx.fillRect(15, 27, 14, 3);
                            ctx.fillStyle = viz.colors.orange; ctx.fillText('Streamlines (v)', 33, 31);

                            ctx.fillStyle = viz.colors.white; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(fl.label, viz.width/2, viz.height - 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For the potential flow with complex potential \\(f(z) = z + 1/z\\), find the velocity field and identify the stagnation points (where the velocity is zero).',
                    hint: 'The velocity field is \\((u_x, -u_y)\\) or equivalently \\(\\overline{f\'(z)}\\). Set \\(f\'(z) = 0\\).',
                    solution: '\\(f\'(z) = 1 - 1/z^2\\). Setting \\(f\'(z) = 0\\): \\(z^2 = 1\\), so \\(z = \\pm 1\\). These are the stagnation points. The flow represents potential flow around a cylinder (the unit circle maps to itself under this transformation).'
                },
                {
                    question: 'Verify directly that for \\(f(z) = z^2\\), the vector field \\(\\vec{F} = (u, -v)\\) is both divergence-free and curl-free.',
                    hint: 'With \\(u = x^2 - y^2\\) and \\(v = 2xy\\), compute \\(\\nabla \\cdot \\vec{F}\\) and \\(\\nabla \\times \\vec{F}\\) (the 2D curl).',
                    solution: '\\(\\vec{F} = (x^2-y^2, -2xy)\\). Divergence: \\(\\partial_x(x^2-y^2) + \\partial_y(-2xy) = 2x - 2x = 0\\). Curl (2D): \\(\\partial_x(-2xy) - \\partial_y(x^2-y^2) = -2y - (-2y) = 0\\). Both vanish, confirming the CR equations in disguise.'
                }
            ]
        }
    ]
});
