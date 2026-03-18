window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'Harmonic Functions',
    subtitle: 'Solutions to Laplace\'s equation and the Dirichlet problem',
    sections: [
        // ================================================================
        // SECTION 1: From Analytic to Harmonic
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'From Analytic to Harmonic',
            content: `
<h2>From Analytic to Harmonic</h2>

<div class="env-block intuition">
    <div class="env-title">The Bridge</div>
    <div class="env-body">
        <p>Every time you compute the real or imaginary part of an analytic function, you get something special. The function \\(f(z) = z^2 = x^2 - y^2 + 2ixy\\) has real part \\(u = x^2 - y^2\\). Check: \\(u_{xx} + u_{yy} = 2 + (-2) = 0\\). It satisfies Laplace's equation. This is no coincidence.</p>
    </div>
</div>

<p>Recall that a function \\(f = u + iv\\) is analytic in a domain \\(D\\) if and only if the Cauchy-Riemann equations hold:</p>

\\[u_x = v_y, \\qquad u_y = -v_x.\\]

<p>Differentiating the first equation with respect to \\(x\\) and the second with respect to \\(y\\):</p>

\\[u_{xx} = v_{yx}, \\qquad u_{yy} = -v_{xy}.\\]

<p>Since mixed partials commute (\\(v_{xy} = v_{yx}\\)) for smooth functions:</p>

\\[u_{xx} + u_{yy} = 0.\\]

<p>An identical argument gives \\(v_{xx} + v_{yy} = 0\\). Both components satisfy <strong>Laplace's equation</strong>.</p>

<div class="env-block definition">
    <div class="env-title">Definition 16.1 (Harmonic Function)</div>
    <div class="env-body">
        <p>A real-valued function \\(u(x, y)\\) is <em>harmonic</em> in a domain \\(D\\) if it has continuous second-order partial derivatives in \\(D\\) and satisfies Laplace's equation:</p>
        \\[\\Delta u = u_{xx} + u_{yy} = 0.\\]
    </div>
</div>

<p>We have just proved half of the following fundamental result.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.1</div>
    <div class="env-body">
        <p>If \\(f = u + iv\\) is analytic in a domain \\(D\\), then \\(u\\) and \\(v\\) are both harmonic in \\(D\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Harmonic Functions from Standard Analytic Functions</div>
    <div class="env-body">
        <ul>
            <li>\\(f(z) = e^z = e^x \\cos y + i e^x \\sin y\\): both \\(e^x \\cos y\\) and \\(e^x \\sin y\\) are harmonic.</li>
            <li>\\(f(z) = \\log z = \\ln|z| + i\\arg z\\): \\(\\ln\\sqrt{x^2 + y^2}\\) is harmonic away from the origin.</li>
            <li>\\(f(z) = z^n\\): the real and imaginary parts are harmonic polynomials of degree \\(n\\).</li>
        </ul>
    </div>
</div>

<p>Why do harmonic functions matter beyond complex analysis? Laplace's equation governs <strong>steady-state heat conduction</strong>, <strong>electrostatics</strong>, <strong>fluid flow</strong>, and <strong>gravitational potential</strong>. Analytic function theory gives us an extraordinarily powerful toolkit for solving these physical problems.</p>

<div class="env-block remark">
    <div class="env-title">Notation</div>
    <div class="env-body">
        <p>The Laplacian operator \\(\\Delta = \\partial^2/\\partial x^2 + \\partial^2/\\partial y^2\\) is also written \\(\\nabla^2\\). In polar coordinates: \\(\\Delta u = u_{rr} + \\frac{1}{r} u_r + \\frac{1}{r^2} u_{\\theta\\theta}\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-harmonic-heatmap"></div>
`,
            visualizations: [
                {
                    id: 'viz-harmonic-heatmap',
                    title: 'Heatmap of a Harmonic Function',
                    description: 'Visualize the harmonic function u(x,y) = x\u00b2 \u2212 y\u00b2 (real part of z\u00b2) as a heatmap. Notice that no interior maximum or minimum exists; extrema occur only on the boundary.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420 });

                        var funcIdx = 0;
                        var funcs = [
                            { name: 'x\u00b2 \u2212 y\u00b2', f: function(x, y) { return x*x - y*y; } },
                            { name: 'e\u02e3 cos y', f: function(x, y) { return Math.exp(x) * Math.cos(y); } },
                            { name: 'xy', f: function(x, y) { return x * y; } },
                            { name: 'ln|z|', f: function(x, y) {
                                var r = Math.sqrt(x*x + y*y);
                                return r < 0.05 ? NaN : Math.log(r);
                            }}
                        ];
                        var cmapIdx = 0;
                        var cmaps = ['viridis', 'inferno', 'coolwarm'];

                        var btnWrap = document.createElement('div');
                        btnWrap.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px;';
                        controls.appendChild(btnWrap);

                        funcs.forEach(function(fn, i) {
                            VizEngine.createButton(btnWrap, fn.name, function() {
                                funcIdx = i;
                                draw();
                            });
                        });
                        VizEngine.createButton(btnWrap, 'Colormap', function() {
                            cmapIdx = (cmapIdx + 1) % cmaps.length;
                            draw();
                        });

                        function draw() {
                            var fn = funcs[funcIdx];
                            viz.drawHeatmap(fn.f, [-3, 3], [-3, 3], cmaps[cmapIdx]);

                            // Axes overlay
                            var ctx = viz.ctx;
                            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(viz.width / 2, 0);
                            ctx.lineTo(viz.width / 2, viz.height);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(0, viz.height / 2);
                            ctx.lineTo(viz.width, viz.height / 2);
                            ctx.stroke();

                            // Label
                            viz.screenText('u(x,y) = ' + fn.name, viz.width / 2, 18, '#ffffff', 14);
                            viz.screenText('\u0394u = 0  (harmonic)', viz.width / 2, viz.height - 12, '#ffffffaa', 11);

                            // Axis labels
                            ctx.fillStyle = 'rgba(255,255,255,0.5)';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('x', viz.width - 10, viz.height / 2 - 4);
                            ctx.textAlign = 'right';
                            ctx.fillText('y', viz.width / 2 + 14, 10);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify directly that \\(u(x,y) = x^3 - 3xy^2\\) is harmonic.',
                    hint: 'Compute \\(u_{xx}\\) and \\(u_{yy}\\) separately, then add.',
                    solution: '\\(u_x = 3x^2 - 3y^2\\), \\(u_{xx} = 6x\\). \\(u_y = -6xy\\), \\(u_{yy} = -6x\\). So \\(u_{xx} + u_{yy} = 6x - 6x = 0\\). This is the real part of \\(f(z) = z^3\\).'
                },
                {
                    question: 'Is \\(u(x,y) = x^2 + y^2\\) harmonic? What physical quantity does it represent?',
                    hint: 'Compute the Laplacian. Note this equals \\(|z|^2\\).',
                    solution: '\\(u_{xx} + u_{yy} = 2 + 2 = 4 \\neq 0\\). Not harmonic. It cannot be the real part of an analytic function. It represents the squared distance from the origin, which grows everywhere and has a global minimum at the origin.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Properties of Harmonic Functions
        // ================================================================
        {
            id: 'sec-properties',
            title: 'Properties of Harmonic Functions',
            content: `
<h2>Properties of Harmonic Functions</h2>

<p>Harmonic functions enjoy remarkable regularity and extremal properties that follow from their connection to analytic functions.</p>

<h3>The Mean Value Property</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.2 (Mean Value Property)</div>
    <div class="env-body">
        <p>If \\(u\\) is harmonic in a domain containing the closed disk \\(\\overline{D}(z_0, R)\\), then</p>
        \\[u(z_0) = \\frac{1}{2\\pi} \\int_0^{2\\pi} u(z_0 + Re^{i\\theta})\\, d\\theta.\\]
        <p>The value at the center equals the average over any circle centered there.</p>
    </div>
</div>

<p><em>Proof sketch.</em> Let \\(f = u + iv\\) be analytic with real part \\(u\\). By Cauchy's integral formula applied to \\(f\\):</p>

\\[f(z_0) = \\frac{1}{2\\pi i} \\oint_{|z - z_0| = R} \\frac{f(z)}{z - z_0}\\, dz.\\]

<p>Parametrize with \\(z = z_0 + Re^{i\\theta}\\), \\(dz = iRe^{i\\theta}\\, d\\theta\\):</p>

\\[f(z_0) = \\frac{1}{2\\pi} \\int_0^{2\\pi} f(z_0 + Re^{i\\theta})\\, d\\theta.\\]

<p>Taking real parts gives the mean value property. \\(\\square\\)</p>

<h3>The Maximum Principle</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.3 (Maximum Principle)</div>
    <div class="env-body">
        <p>If \\(u\\) is harmonic and nonconstant in a bounded domain \\(D\\), then \\(u\\) attains its maximum and minimum values on the boundary \\(\\partial D\\), not in the interior.</p>
    </div>
</div>

<p><em>Proof idea.</em> Suppose \\(u\\) attains its maximum at an interior point \\(z_0\\). The mean value property forces all values on any small circle around \\(z_0\\) to equal \\(u(z_0)\\). Propagating this argument across \\(D\\) forces \\(u\\) to be constant, a contradiction.</p>

<div class="env-block corollary">
    <div class="env-title">Corollary (Uniqueness for the Dirichlet Problem)</div>
    <div class="env-body">
        <p>If two harmonic functions agree on the boundary of a bounded domain, they agree throughout the domain. (Their difference is harmonic with zero boundary values, hence identically zero by the maximum principle.)</p>
    </div>
</div>

<h3>Harnack's Inequality</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.4 (Harnack's Inequality)</div>
    <div class="env-body">
        <p>If \\(u\\) is harmonic and nonnegative in the disk \\(|z| < R\\), then for \\(|z| = r < R\\):</p>
        \\[\\frac{R - r}{R + r}\\, u(0) \\leq u(z) \\leq \\frac{R + r}{R - r}\\, u(0).\\]
    </div>
</div>

<p>Harnack's inequality quantifies how a harmonic function's values at interior points are controlled by its value at the center. As \\(r \\to R\\), the bounds diverge, reflecting that boundary behavior need not be controlled by the interior.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.5 (Harnack's Principle)</div>
    <div class="env-body">
        <p>An increasing sequence of harmonic functions either converges uniformly on compact subsets to a harmonic function, or diverges to \\(+\\infty\\) everywhere.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-mean-value-harmonic"></div>
`,
            visualizations: [
                {
                    id: 'viz-mean-value-harmonic',
                    title: 'Mean Value Property: Average on Circle = Value at Center',
                    description: 'For the harmonic function u = x\u00b2 \u2212 y\u00b2, place a circle anywhere. The value at the center equals the average of u on the circle. Drag the center; watch the animated average converge to the center value.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });

                        var cx = 0, cy = 0;
                        var radius = 1.0;
                        var t = 0;

                        VizEngine.createSlider(controls, 'Radius', 0.2, 1.5, radius, 0.05, function(v) {
                            radius = v;
                        });

                        var d = viz.addDraggable('center', cx, cy, viz.colors.orange, 8, function(x, y) {
                            cx = x; cy = y;
                        });

                        function u(x, y) { return x*x - y*y; }

                        viz.animate(function(ts) {
                            t = ts / 800;
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Draw heatmap-style shading manually
                            var ctx = viz.ctx;

                            // Compute center value
                            var centerVal = u(cx, cy);

                            // Draw the circle
                            viz.drawCircle(cx, cy, radius, null, viz.colors.blue, 2);

                            // Animated sample point on circle
                            var sx = cx + radius * Math.cos(t);
                            var sy = cy + radius * Math.sin(t);
                            var sval = u(sx, sy);

                            // Draw radius line
                            viz.drawSegment(cx, cy, sx, sy, viz.colors.blue + '88', 1.5, true);

                            // Sample point
                            viz.drawPoint(sx, sy, viz.colors.teal, null, 5);

                            // Center point
                            viz.drawDraggables();

                            // Numerically compute average
                            var N = 200;
                            var avg = 0;
                            for (var k = 0; k < N; k++) {
                                var th = 2 * Math.PI * k / N;
                                avg += u(cx + radius * Math.cos(th), cy + radius * Math.sin(th));
                            }
                            avg /= N;

                            // Labels
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.textAlign = 'left';
                            ctx.fillText('u(center) = ' + centerVal.toFixed(4), 12, 30);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('avg on circle = ' + avg.toFixed(4), 12, 50);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('u(x,y) = x\u00b2 \u2212 y\u00b2', 12, viz.height - 14);

                            // Match indicator
                            var diff = Math.abs(centerVal - avg);
                            ctx.fillStyle = diff < 0.001 ? viz.colors.green : viz.colors.yellow;
                            ctx.textAlign = 'right';
                            ctx.fillText('|diff| = ' + diff.toFixed(5), viz.width - 12, 30);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the mean value property to evaluate \\(\\frac{1}{2\\pi}\\int_0^{2\\pi} \\cos^2\\theta\\, d\\theta\\) by recognizing it as the average of a harmonic function on the unit circle.',
                    hint: 'Write \\(\\cos\\theta = \\operatorname{Re}(e^{i\\theta})\\). Consider \\(u(x,y) = x^2 - y^2\\) or use the connection to \\(\\operatorname{Re}(z^2)\\).',
                    solution: 'On the unit circle, \\(\\cos^2\\theta = \\frac{1 + \\cos 2\\theta}{2}\\). But more directly: \\(\\frac{1}{2\\pi}\\int_0^{2\\pi}(x^2-y^2)\\,d\\theta\\) with \\(x=\\cos\\theta, y=\\sin\\theta\\) equals \\(u(0,0) = 0\\), so \\(\\int \\cos^2\\theta\\,d\\theta = \\int\\sin^2\\theta\\,d\\theta\\). Since they sum to \\(2\\pi\\), each equals \\(\\pi\\).'
                },
                {
                    question: 'Prove that if \\(u\\) is harmonic in a bounded domain \\(D\\) and \\(u = 0\\) on \\(\\partial D\\), then \\(u \\equiv 0\\) in \\(D\\).',
                    hint: 'Apply the maximum principle to both \\(u\\) and \\(-u\\).',
                    solution: 'By the maximum principle, \\(u \\leq \\max_{\\partial D} u = 0\\) in \\(D\\). Applying the principle to \\(-u\\) (also harmonic), \\(-u \\leq 0\\), so \\(u \\geq 0\\). Together, \\(u \\equiv 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Harmonic Conjugates
        // ================================================================
        {
            id: 'sec-conjugate',
            title: 'Harmonic Conjugates',
            content: `
<h2>Harmonic Conjugates</h2>

<p>Given a harmonic function \\(u\\), can we always find \\(v\\) such that \\(f = u + iv\\) is analytic? The Cauchy-Riemann equations tell us what \\(v\\) must satisfy:</p>

\\[v_x = -u_y, \\qquad v_y = u_x.\\]

<p>If \\(u\\) is harmonic, these equations are consistent (by \\(\\Delta u = 0\\)), and we can integrate to find \\(v\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition 16.2 (Harmonic Conjugate)</div>
    <div class="env-body">
        <p>If \\(u\\) and \\(v\\) are harmonic in \\(D\\) and satisfy the Cauchy-Riemann equations, then \\(v\\) is called a <em>harmonic conjugate</em> of \\(u\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.6 (Existence in Simply Connected Domains)</div>
    <div class="env-body">
        <p>If \\(u\\) is harmonic in a <em>simply connected</em> domain \\(D\\), then \\(u\\) has a harmonic conjugate \\(v\\) in \\(D\\), unique up to an additive constant.</p>
    </div>
</div>

<p><em>Proof.</em> Define \\(v\\) by integrating along any path from a fixed point \\(z_0\\) to \\(z\\) in \\(D\\):</p>

\\[v(x, y) = \\int_{(x_0, y_0)}^{(x, y)} (-u_y\\, dx + u_x\\, dy).\\]

<p>Since \\(D\\) is simply connected and \\(\\Delta u = 0\\) ensures the integrand is a closed form (the mixed partials \\((-u_y)_y = -u_{yy} = u_{xx} = (u_x)_x\\) agree), the integral is path-independent. One verifies that \\(v_x = -u_y\\) and \\(v_y = u_x\\). \\(\\square\\)</p>

<div class="env-block remark">
    <div class="env-title">Simply Connected is Essential</div>
    <div class="env-body">
        <p>On the punctured plane \\(\\mathbb{C} \\setminus \\{0\\}\\), the function \\(u = \\ln|z|\\) is harmonic. Its conjugate is \\(\\arg z\\), but this is not single-valued on the punctured plane. The punctured plane is not simply connected, and indeed \\(\\ln z\\) requires a branch cut.</p>
    </div>
</div>

<h3>Orthogonality of Level Curves</h3>

<p>The level curves \\(\\{u = c\\}\\) and \\(\\{v = c'\\}\\) are orthogonal wherever \\(\\nabla u \\neq 0\\). This is because:</p>

\\[\\nabla u \\cdot \\nabla v = u_x v_x + u_y v_y = u_x(-u_y) + u_y(u_x) = 0.\\]

<p>In fluid flow, if \\(u\\) is the velocity potential, the level curves of \\(u\\) are equipotential lines and those of \\(v\\) are streamlines. They always cross at right angles.</p>

<div class="env-block example">
    <div class="env-title">Example: Computing a Harmonic Conjugate</div>
    <div class="env-body">
        <p>Find the harmonic conjugate of \\(u(x,y) = x^2 - y^2\\).</p>
        <p>From \\(v_y = u_x = 2x\\), integrate: \\(v = 2xy + g(x)\\). From \\(v_x = -u_y = 2y\\): \\(2y + g'(x) = 2y\\), so \\(g'(x) = 0\\) and \\(g\\) is constant. Thus \\(v = 2xy + C\\). Check: \\(f = (x^2-y^2) + i(2xy) = z^2\\). \\(\\checkmark\\)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-conjugate-level-curves"></div>
`,
            visualizations: [
                {
                    id: 'viz-conjugate-level-curves',
                    title: 'Harmonic Conjugate Level Curves: Orthogonal Families',
                    description: 'The level curves of u (red) and its harmonic conjugate v (blue) meet at right angles. Drag the slider to animate between different analytic functions f = u + iv.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 55 });

                        var funcIdx = 0;
                        var funcDefs = [
                            {
                                name: 'z\u00b2: u=x\u00b2-y\u00b2, v=2xy',
                                u: function(x, y) { return x*x - y*y; },
                                v: function(x, y) { return 2*x*y; }
                            },
                            {
                                name: 'e\u1d3f: u=e\u02e3cosy, v=e\u02e3siny',
                                u: function(x, y) { return Math.exp(x) * Math.cos(y); },
                                v: function(x, y) { return Math.exp(x) * Math.sin(y); }
                            },
                            {
                                name: 'z\u00b3: u=x\u00b3-3xy\u00b2, v=3x\u00b2y-y\u00b3',
                                u: function(x, y) { return x*x*x - 3*x*y*y; },
                                v: function(x, y) { return 3*x*x*y - y*y*y; }
                            }
                        ];

                        var animT = 0;
                        var animating = false;
                        var animId = null;

                        var btnWrap = document.createElement('div');
                        btnWrap.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px;';
                        controls.appendChild(btnWrap);
                        funcDefs.forEach(function(fd, i) {
                            VizEngine.createButton(btnWrap, fd.name.split(':')[0], function() {
                                funcIdx = i;
                                animT = 0;
                                draw();
                            });
                        });
                        VizEngine.createButton(btnWrap, 'Animate', function() {
                            if (animating) {
                                animating = false;
                                if (animId) { cancelAnimationFrame(animId); animId = null; }
                                draw();
                            } else {
                                animating = true;
                                function loop() {
                                    animT += 0.015;
                                    draw();
                                    if (animating) animId = requestAnimationFrame(loop);
                                }
                                loop();
                            }
                        });

                        function drawContours(fn, color, levels) {
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var xRange = [-5, 5], yRange = [-5, 5];
                            var cols = 200, rows = 200;
                            var dx = (xRange[1]-xRange[0]) / cols;
                            var dy = (yRange[1]-yRange[0]) / rows;

                            ctx.strokeStyle = color;
                            ctx.lineWidth = 1.5;

                            levels.forEach(function(lev) {
                                ctx.beginPath();
                                var started = false;
                                // March along horizontal lines
                                for (var j = 0; j < rows; j++) {
                                    for (var i = 0; i < cols; i++) {
                                        var x0 = xRange[0] + i * dx;
                                        var y0 = yRange[0] + j * dy;
                                        var v00 = fn(x0, y0) - lev;
                                        var v10 = fn(x0+dx, y0) - lev;
                                        var v01 = fn(x0, y0+dy) - lev;
                                        // Check for crossing on bottom and left edges
                                        if (v00 * v10 < 0) {
                                            var t = v00 / (v00 - v10);
                                            var px = x0 + t*dx, py = y0;
                                            var sc = viz.toScreen(px, py);
                                            started ? ctx.lineTo(sc[0], sc[1]) : ctx.moveTo(sc[0], sc[1]);
                                            started = false;
                                        }
                                        if (v00 * v01 < 0) {
                                            var t2 = v00 / (v00 - v01);
                                            var px2 = x0, py2 = y0 + t2*dy;
                                            var sc2 = viz.toScreen(px2, py2);
                                            ctx.moveTo(sc2[0], sc2[1]);
                                        }
                                    }
                                }
                                ctx.stroke();
                            });
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var fd = funcDefs[funcIdx];
                            var uFn = fd.u, vFn = fd.v;

                            // Level values, optionally animated phase shift
                            var uLevels = [], vLevels = [];
                            var nLev = 10;
                            for (var k = -nLev; k <= nLev; k++) {
                                uLevels.push(k * 0.8 + (animating ? Math.sin(animT) * 0.2 : 0));
                                vLevels.push(k * 0.8 + (animating ? Math.cos(animT) * 0.2 : 0));
                            }

                            drawContours(uFn, viz.colors.red + 'cc', uLevels);
                            drawContours(vFn, viz.colors.blue + 'cc', vLevels);

                            // Legend
                            var ctx = viz.ctx;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('u = const', 12, 22);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('v = const', 12, 40);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText(fd.name, viz.width / 2 - 80, viz.height - 12);
                            ctx.fillStyle = viz.colors.text;
                            ctx.fillText('\u2207u \u22c5 \u2207v = 0 (orthogonal)', 12, viz.height - 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the harmonic conjugate of \\(u(x,y) = e^x \\cos y\\).',
                    hint: 'Use the Cauchy-Riemann equations: \\(v_y = u_x\\) and \\(v_x = -u_y\\).',
                    solution: '\\(u_x = e^x \\cos y\\), so \\(v_y = e^x \\cos y\\), giving \\(v = e^x \\sin y + g(x)\\). Then \\(v_x = e^x \\sin y + g\'(x) = -u_y = e^x \\sin y\\), so \\(g\'(x) = 0\\). Thus \\(v = e^x \\sin y + C\\). Check: \\(f = e^x(\\cos y + i \\sin y) = e^{x+iy} = e^z\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Can \\(u(x,y) = x^2 + y^2\\) have a harmonic conjugate? Explain.',
                    hint: 'First check whether \\(u\\) is harmonic.',
                    solution: 'No. Since \\(\\Delta u = 2 + 2 = 4 \\neq 0\\), \\(u\\) is not harmonic. A function can only have a harmonic conjugate if it is itself harmonic.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Poisson Integral Formula
        // ================================================================
        {
            id: 'sec-poisson',
            title: 'Poisson Integral Formula',
            content: `
<h2>Poisson Integral Formula</h2>

<p>The Poisson integral formula solves the Dirichlet problem on the unit disk: given continuous boundary values \\(f(e^{i\\theta})\\), find the harmonic function inside the disk that matches them.</p>

<h3>Derivation</h3>

<p>Start with the Cauchy integral formula for a function \\(F\\) analytic on and inside the unit circle \\(|z| = 1\\). For \\(|z| = r < 1\\):</p>

\\[F(z) = \\frac{1}{2\\pi i} \\oint_{|\\zeta| = 1} \\frac{F(\\zeta)}{\\zeta - z}\\, d\\zeta.\\]

<p>The "reflected" point \\(1/\\bar{z}\\) lies outside the unit disk. By Cauchy's theorem applied to the point \\(1/\\bar{z}\\):</p>

\\[0 = \\frac{1}{2\\pi i} \\oint_{|\\zeta|=1} \\frac{F(\\zeta)}{\\zeta - 1/\\bar{z}}\\, d\\zeta.\\]

<p>Subtracting (after suitable manipulation) and taking real parts yields:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.7 (Poisson Integral Formula)</div>
    <div class="env-body">
        <p>If \\(u\\) is harmonic in \\(|z| < 1\\) and continuous on \\(|z| \\leq 1\\), then for \\(z = re^{i\\phi}\\) with \\(r < 1\\):</p>
        \\[u(r, \\phi) = \\frac{1}{2\\pi} \\int_0^{2\\pi} P_r(\\theta - \\phi)\\, u(1, \\theta)\\, d\\theta,\\]
        <p>where the <em>Poisson kernel</em> is</p>
        \\[P_r(\\theta) = \\frac{1 - r^2}{1 - 2r\\cos\\theta + r^2}.\\]
    </div>
</div>

<h3>Properties of the Poisson Kernel</h3>

<p>The Poisson kernel \\(P_r(\\theta)\\) has several key properties that make it a true "approximate identity":</p>

<ul>
    <li><strong>Positivity:</strong> \\(P_r(\\theta) > 0\\) for all \\(r < 1\\).</li>
    <li><strong>Normalization:</strong> \\(\\frac{1}{2\\pi}\\int_0^{2\\pi} P_r(\\theta)\\, d\\theta = 1\\).</li>
    <li><strong>Concentration:</strong> As \\(r \\to 1^-\\), \\(P_r(\\theta) \\to 0\\) for \\(\\theta \\neq 0\\) and \\(P_r(0) \\to +\\infty\\).</li>
    <li><strong>Harmonicity:</strong> \\(P_r(\\theta - \\phi)\\) is harmonic in \\((r, \\phi)\\).</li>
</ul>

<p>The concentration property means that as \\(z\\) approaches a boundary point \\(e^{i\\phi}\\), the integral picks up only the boundary value there, ensuring continuity up to the boundary.</p>

<div class="env-block example">
    <div class="env-title">Example: Constant Boundary Data</div>
    <div class="env-body">
        <p>If \\(u(1, \\theta) = 1\\) for all \\(\\theta\\), then by normalization of the Poisson kernel, \\(u(r, \\phi) = 1\\) everywhere inside. Constant boundary data gives a constant solution.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-poisson-kernel"></div>
`,
            visualizations: [
                {
                    id: 'viz-poisson-kernel',
                    title: 'Poisson Kernel P\u1d63(\u03b8) for Various r',
                    description: 'As r \u2192 1, the Poisson kernel concentrates near \u03b8 = 0, acting like a Dirac delta. It represents the "weight" given to boundary values at angle \u03b8 when computing u at radius r.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 80, originY: 340, scale: 1
                        });

                        var rVal = 0.5;
                        var animating = false;
                        var animId = null;
                        var animT = 0;

                        VizEngine.createSlider(controls, 'r', 0.0, 0.98, rVal, 0.01, function(v) {
                            rVal = v;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Animate r', function() {
                            if (animating) {
                                animating = false;
                                if (animId) { cancelAnimationFrame(animId); animId = null; }
                            } else {
                                animating = true;
                                function loop() {
                                    animT += 0.008;
                                    rVal = 0.5 + 0.48 * Math.abs(Math.sin(animT));
                                    draw();
                                    if (animating) animId = requestAnimationFrame(loop);
                                }
                                loop();
                            }
                        });

                        function poisson(r, theta) {
                            return (1 - r*r) / (1 - 2*r*Math.cos(theta) + r*r);
                        }

                        function draw() {
                            var ctx = viz.ctx;
                            viz.clear();

                            var chartLeft = 80;
                            var chartRight = viz.width - 30;
                            var chartBottom = 340;
                            var chartTop = 40;
                            var chartW = chartRight - chartLeft;
                            var chartH = chartBottom - chartTop;

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            [-Math.PI, -Math.PI/2, 0, Math.PI/2, Math.PI].forEach(function(th) {
                                var sx = chartLeft + (th + Math.PI) / (2*Math.PI) * chartW;
                                ctx.beginPath(); ctx.moveTo(sx, chartTop); ctx.lineTo(sx, chartBottom); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                var label = th === 0 ? '0' : th === Math.PI ? '\u03c0' : th === -Math.PI ? '-\u03c0' : th === Math.PI/2 ? '\u03c0/2' : '-\u03c0/2';
                                ctx.fillText(label, sx, chartBottom + 14);
                            });

                            // Y-axis
                            var yMax = Math.max(20, poisson(rVal, 0) * 1.1);
                            [0, 5, 10, 15, 20].forEach(function(p) {
                                if (p > yMax) return;
                                var sy = chartBottom - (p / yMax) * chartH;
                                ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(chartLeft, sy); ctx.lineTo(chartRight, sy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.fillText(p, chartLeft - 6, sy + 3);
                            });

                            // Plot multiple curves (static reference)
                            var rVals = [0.0, 0.3, 0.7, 0.9];
                            var refColors = [viz.colors.text, viz.colors.teal, viz.colors.blue, viz.colors.purple];
                            rVals.forEach(function(rr, idx) {
                                ctx.strokeStyle = refColors[idx] + '55';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var N = 300;
                                for (var k = 0; k <= N; k++) {
                                    var th = -Math.PI + 2*Math.PI*k/N;
                                    var pv = Math.min(poisson(rr, th), yMax);
                                    var sx = chartLeft + (th + Math.PI) / (2*Math.PI) * chartW;
                                    var sy = chartBottom - (pv / yMax) * chartH;
                                    k === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            });

                            // Active r curve
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var N = 600;
                            for (var k = 0; k <= N; k++) {
                                var th = -Math.PI + 2*Math.PI*k/N;
                                var pv = Math.min(poisson(rVal, th), yMax);
                                var sx = chartLeft + (th + Math.PI) / (2*Math.PI) * chartW;
                                var sy = chartBottom - (pv / yMax) * chartH;
                                k === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Axis labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u03b8', (chartLeft + chartRight) / 2, chartBottom + 30);
                            ctx.save(); ctx.translate(18, (chartTop + chartBottom) / 2); ctx.rotate(-Math.PI / 2);
                            ctx.fillText('P\u1d63(\u03b8)', 0, 0); ctx.restore();

                            // Title
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('r = ' + rVal.toFixed(2), chartLeft + 8, chartTop + 14);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('P\u1d63(\u03b8) = (1\u2212r\u00b2) / (1\u22122r\u00b7cos\u03b8 + r\u00b2)', chartLeft + 8, chartTop + 30);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(\\frac{1}{2\\pi}\\int_0^{2\\pi} P_r(\\theta)\\, d\\theta = 1\\) using the geometric series expansion of the Poisson kernel.',
                    hint: 'Write \\(P_r(\\theta) = \\operatorname{Re}\\frac{e^{i\\theta}+z}{e^{i\\theta}-z}\\) with \\(z = re^{i\\cdot 0}\\), or use the Fourier series \\(P_r(\\theta) = 1 + 2\\sum_{n=1}^\\infty r^n \\cos(n\\theta)\\).',
                    solution: 'Using the Fourier series: \\(\\frac{1}{2\\pi}\\int_0^{2\\pi} P_r(\\theta)\\,d\\theta = 1 + 2\\sum_{n=1}^\\infty r^n \\cdot \\frac{1}{2\\pi}\\int_0^{2\\pi}\\cos(n\\theta)\\,d\\theta = 1 + 0 = 1\\), since \\(\\cos(n\\theta)\\) integrates to zero for \\(n \\geq 1\\).'
                },
                {
                    question: 'Use the Poisson formula to find the harmonic function in \\(|z| < 1\\) with boundary values \\(u(e^{i\\theta}) = \\cos\\theta\\).',
                    hint: 'Use the Fourier expansion \\(P_r(\\theta) = 1 + 2\\sum_{n=1}^\\infty r^n \\cos n\\theta\\) and orthogonality.',
                    solution: 'Substituting: \\(u(r,\\phi) = \\frac{1}{2\\pi}\\int_0^{2\\pi}P_r(\\theta-\\phi)\\cos\\theta\\,d\\theta\\). Using the Fourier expansion, only the \\(n=1\\) term survives, giving \\(u(r,\\phi) = r\\cos\\phi\\). In Cartesian coordinates, \\(u(x,y) = x\\). This is the real part of \\(f(z) = z\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: The Dirichlet Problem
        // ================================================================
        {
            id: 'sec-dirichlet',
            title: 'The Dirichlet Problem',
            content: `
<h2>The Dirichlet Problem</h2>

<p>The <em>Dirichlet problem</em> asks: given a domain \\(D\\) and continuous boundary data \\(f: \\partial D \\to \\mathbb{R}\\), find a function \\(u\\) that is harmonic in \\(D\\) and equals \\(f\\) on \\(\\partial D\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition 16.3 (Dirichlet Problem)</div>
    <div class="env-body">
        <p>Given a bounded domain \\(D\\) with boundary \\(\\partial D\\) and a continuous function \\(f: \\partial D \\to \\mathbb{R}\\), find \\(u: \\overline{D} \\to \\mathbb{R}\\) such that:</p>
        \\[\\Delta u = 0 \\text{ in } D, \\qquad u\\big|_{\\partial D} = f.\\]
    </div>
</div>

<h3>Solution on the Disk</h3>

<p>For \\(D = \\{|z| < 1\\}\\), the Poisson integral formula gives the unique solution:</p>

\\[u(z) = \\frac{1}{2\\pi} \\int_0^{2\\pi} P_r(\\theta - \\phi)\\, f(e^{i\\theta})\\, d\\theta, \\quad z = re^{i\\phi}.\\]

<p>This can be extended to disks of any radius via a simple scaling.</p>

<h3>Perron's Method (General Domains)</h3>

<p>For general domains, one approach is <strong>Perron's method</strong>, which constructs the solution as a supremum over subharmonic functions.</p>

<div class="env-block definition">
    <div class="env-title">Definition 16.4 (Subharmonic Function)</div>
    <div class="env-body">
        <p>A function \\(v\\) is <em>subharmonic</em> in \\(D\\) if it is upper semicontinuous and satisfies the sub-mean-value property:</p>
        \\[v(z_0) \\leq \\frac{1}{2\\pi}\\int_0^{2\\pi} v(z_0 + Re^{i\\theta})\\,d\\theta\\]
        <p>for all disks \\(\\overline{D}(z_0, R) \\subset D\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.8 (Perron's Method)</div>
    <div class="env-body">
        <p>Let \\(\\mathcal{F}\\) be the family of subharmonic functions \\(v\\) in \\(D\\) with \\(v \\leq f\\) on \\(\\partial D\\). The function</p>
        \\[u(z) = \\sup_{v \\in \\mathcal{F}} v(z)\\]
        <p>is harmonic in \\(D\\). If \\(\\partial D\\) is "regular" (satisfies an exterior cone condition at every boundary point), then \\(u\\) extends continuously to \\(f\\) on \\(\\partial D\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Barriers and Irregular Points</div>
    <div class="env-body">
        <p>Not every boundary point is regular. A classic example is Lebesgue's thorn: a domain with an inward-pointing spike can fail to attain the prescribed boundary value at the tip. A boundary point is regular if and only if a <em>barrier function</em> exists there.</p>
    </div>
</div>

<h3>Conformal Mapping and the Dirichlet Problem</h3>

<p>Conformal maps preserve harmonic functions (composition of a harmonic function with a conformal map is harmonic). To solve the Dirichlet problem on a complicated domain \\(D\\):</p>

<ol>
    <li>Find a conformal map \\(\\phi: D \\to \\mathbb{D}\\) (where \\(\\mathbb{D}\\) is the unit disk).</li>
    <li>Transform the boundary data: \\(\\tilde{f} = f \\circ \\phi^{-1}\\) on \\(\\partial\\mathbb{D}\\).</li>
    <li>Solve on the disk via the Poisson formula.</li>
    <li>Pull back: \\(u = \\tilde{u} \\circ \\phi\\).</li>
</ol>

<p>The Riemann mapping theorem guarantees step 1 is always possible for simply connected domains.</p>

<div class="viz-placeholder" data-viz="viz-dirichlet-disk"></div>
`,
            visualizations: [
                {
                    id: 'viz-dirichlet-disk',
                    title: 'Dirichlet Problem on the Unit Disk',
                    description: 'Specify boundary values on the unit circle, then see the harmonic solution inside computed via the Poisson integral formula. Choose a boundary function and watch the heatmap update.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 1 });

                        var bndryIdx = 0;
                        var bndryFuncs = [
                            { name: 'cos \u03b8', f: function(th) { return Math.cos(th); } },
                            { name: 'sin 2\u03b8', f: function(th) { return Math.sin(2*th); } },
                            { name: 'step', f: function(th) { return th < Math.PI ? 1 : -1; } },
                            { name: '|\u03b8| / \u03c0', f: function(th) { var t = th - Math.PI; return Math.abs(t) / Math.PI; } }
                        ];

                        var btnWrap = document.createElement('div');
                        btnWrap.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px;';
                        controls.appendChild(btnWrap);
                        bndryFuncs.forEach(function(bf, i) {
                            VizEngine.createButton(btnWrap, bf.name, function() {
                                bndryIdx = i;
                                draw();
                            });
                        });

                        // Poisson integral on unit disk: u(r, phi)
                        function poissonSolve(r, phi, bFn) {
                            var N = 256;
                            var sum = 0;
                            var dth = 2 * Math.PI / N;
                            if (r < 1e-6) {
                                // At origin, just average
                                for (var k = 0; k < N; k++) {
                                    sum += bFn(k * dth);
                                }
                                return sum / N;
                            }
                            for (var k = 0; k < N; k++) {
                                var th = k * dth;
                                var dph = th - phi;
                                var Pr = (1 - r*r) / (1 - 2*r*Math.cos(dph) + r*r);
                                sum += Pr * bFn(th) * dth;
                            }
                            return sum / (2 * Math.PI);
                        }

                        var cached = null;
                        var cachedIdx = -1;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var bf = bndryFuncs[bndryIdx];

                            // Compute harmonic function on grid
                            var RES = 80;
                            var cx = viz.width / 2, cy = viz.height / 2;
                            var diskR = Math.min(viz.width, viz.height) / 2 - 30;

                            // Build pixel image
                            var imgData = ctx.createImageData(viz.width, viz.height);
                            var data = imgData.data;

                            var vMin = Infinity, vMax = -Infinity;
                            var vals = [];
                            for (var py = 0; py < viz.height; py++) {
                                var row = [];
                                for (var px = 0; px < viz.width; px++) {
                                    var dx = px - cx, dy = -(py - cy);
                                    var dist = Math.sqrt(dx*dx + dy*dy) / diskR;
                                    if (dist >= 1) { row.push(NaN); continue; }
                                    var phi = Math.atan2(dy, dx);
                                    if (phi < 0) phi += 2*Math.PI;
                                    var uval = poissonSolve(dist, phi, bf.f);
                                    row.push(uval);
                                    if (isFinite(uval)) { vMin = Math.min(vMin, uval); vMax = Math.max(vMax, uval); }
                                }
                                vals.push(row);
                            }

                            var range = vMax - vMin || 1;
                            for (var py = 0; py < viz.height; py++) {
                                for (var px = 0; px < viz.width; px++) {
                                    var v = vals[py][px];
                                    var idx = (py * viz.width + px) * 4;
                                    if (isNaN(v)) {
                                        data[idx] = 12; data[idx+1] = 12; data[idx+2] = 32; data[idx+3] = 255;
                                        continue;
                                    }
                                    var t = (v - vMin) / range;
                                    var rgb = VizEngine.colormapSample(t, 'coolwarm');
                                    data[idx] = rgb[0]; data[idx+1] = rgb[1]; data[idx+2] = rgb[2]; data[idx+3] = 255;
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);

                            // Draw boundary circle
                            ctx.strokeStyle = 'rgba(255,255,255,0.7)';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx, cy, diskR, 0, 2*Math.PI);
                            ctx.stroke();

                            // Draw boundary values as color ring
                            var ringW = 8;
                            var N = 360;
                            for (var k = 0; k < N; k++) {
                                var th = 2*Math.PI*k/N;
                                var bv = bf.f(th);
                                var t2 = (bv - vMin) / range;
                                var rgb2 = VizEngine.colormapSample(Math.max(0, Math.min(1, t2)), 'coolwarm');
                                ctx.strokeStyle = 'rgb(' + rgb2[0] + ',' + rgb2[1] + ',' + rgb2[2] + ')';
                                ctx.lineWidth = ringW;
                                ctx.beginPath();
                                ctx.arc(cx, cy, diskR + ringW/2, th, th + 2*Math.PI/N + 0.01);
                                ctx.stroke();
                            }

                            // Labels
                            ctx.fillStyle = 'rgba(255,255,255,0.9)';
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Boundary: f(\u03b8) = ' + bf.name, viz.width/2, 22);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = 'rgba(255,255,255,0.5)';
                            ctx.fillText('Interior: Poisson integral solution', viz.width/2, viz.height - 10);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'State and prove uniqueness of the solution to the Dirichlet problem in a bounded domain.',
                    hint: 'Suppose \\(u_1\\) and \\(u_2\\) both solve the problem. What can you say about \\(u_1 - u_2\\)?',
                    solution: 'Let \\(w = u_1 - u_2\\). Then \\(\\Delta w = 0\\) in \\(D\\) and \\(w = 0\\) on \\(\\partial D\\). By the maximum principle, \\(w \\leq \\max_{\\partial D} w = 0\\). Applying to \\(-w\\): \\(-w \\leq 0\\). Therefore \\(w \\equiv 0\\), so \\(u_1 = u_2\\).'
                },
                {
                    question: 'Use conformal mapping to solve the Dirichlet problem on the upper half-plane \\(\\{y > 0\\}\\) with boundary values \\(f(x, 0) = 1\\) for \\(x > 0\\) and \\(f(x, 0) = 0\\) for \\(x < 0\\).',
                    hint: 'Map the upper half-plane to the unit disk via \\(\\phi(z) = (z-i)/(z+i)\\). The boundary condition becomes a step function on the unit circle.',
                    solution: 'The Joukowski-type map \\(\\phi(z) = (z-i)/(z+i)\\) takes the upper half-plane to the unit disk. The solution is \\(u(x,y) = \\frac{1}{\\pi}\\arctan\\frac{x}{y} + \\frac{1}{2}\\) (for \\(y > 0\\)), which is the harmonic function equal to 1 on the positive real axis and 0 on the negative real axis.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge — Physical Applications
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Physical Applications and Outlook',
            content: `
<h2>Physical Applications and Outlook</h2>

<p>Harmonic functions are not a pure mathematical abstraction. They are the language in which classical physics describes equilibrium phenomena.</p>

<h3>Steady-State Heat Conduction</h3>

<p>If \\(T(x, y)\\) is the steady-state temperature in a 2D region (no heat sources, equilibrium reached), then energy conservation forces \\(\\Delta T = 0\\). The Dirichlet problem corresponds to maintaining fixed temperatures on the boundary and asking for the equilibrium distribution inside.</p>

<h3>Electrostatics</h3>

<p>The electrostatic potential \\(\\Phi\\) in a charge-free region satisfies \\(\\Delta \\Phi = 0\\) (Gauss's law with \\(\\rho = 0\\)). Level curves of \\(\\Phi\\) are equipotential lines; level curves of its harmonic conjugate are electric field lines. Their orthogonality is a direct consequence of the Cauchy-Riemann equations.</p>

<h3>Irrotational Fluid Flow</h3>

<p>An ideal (inviscid, incompressible, irrotational) fluid flow has a velocity potential \\(\\phi\\) satisfying \\(\\Delta \\phi = 0\\). The complex potential \\(w = \\phi + i\\psi\\) (where \\(\\psi\\) is the stream function) is analytic. The velocity field is \\(\\mathbf{v} = \\nabla \\phi = (\\phi_x, \\phi_y)\\).</p>

<div class="env-block example">
    <div class="env-title">Example: Flow around a Cylinder</div>
    <div class="env-body">
        <p>Uniform flow past a cylinder of radius \\(a\\) has complex potential \\(w(z) = U(z + a^2/z)\\). The real part gives the velocity potential; streamlines (level curves of the imaginary part) wrap around the cylinder, illustrating why complex analysis is the natural language for 2D fluid dynamics.</p>
    </div>
</div>

<h3>Summary of the Chapter</h3>

<p>We have developed the theory of harmonic functions along two tracks:</p>

<ul>
    <li><strong>Analytic origins:</strong> Real and imaginary parts of analytic functions are harmonic; every harmonic function in a simply connected domain has an analytic "lift."</li>
    <li><strong>Intrinsic theory:</strong> Harmonic functions satisfy the mean value property, obey the maximum principle, and are uniquely determined by boundary data.</li>
    <li><strong>Explicit formulas:</strong> The Poisson integral solves the Dirichlet problem on the disk; conformal mapping extends this to arbitrary simply connected domains.</li>
</ul>

<p>The connection to analytic function theory runs deep. Many results about analytic functions (Cauchy's integral formula, the maximum modulus principle, Schwarz's lemma) have exact counterparts for harmonic functions, often derivable by taking real parts.</p>

<div class="env-block remark">
    <div class="env-title">Looking Ahead</div>
    <div class="env-body">
        <p>Harmonic functions in higher dimensions (\\(\\mathbb{R}^n\\) for \\(n \\geq 3\\)) no longer have a direct connection to complex analysis, but they retain the mean value property and maximum principle. The study of their boundary behavior leads to <em>potential theory</em>. In several complex variables, the analogous objects are <em>pluriharmonic functions</em>, satisfying a system of equations that is strictly stronger than the multi-dimensional Laplace equation.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-temperature"></div>
`,
            visualizations: [
                {
                    id: 'viz-temperature',
                    title: 'Steady-State Heat Distribution',
                    description: 'Harmonic functions model steady-state temperature. Specify temperatures on two sides of a rectangular plate and watch the interior equilibrium distribution (heatmap + isotherms). Drag the temperature sliders.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 1 });

                        var TLeft = 100, TRight = 0, TTop = 50, TBottom = 20;

                        VizEngine.createSlider(controls, 'T Left', 0, 100, TLeft, 1, function(v) { TLeft = v; draw(); });
                        VizEngine.createSlider(controls, 'T Right', 0, 100, TRight, 1, function(v) { TRight = v; draw(); });
                        VizEngine.createSlider(controls, 'T Top', 0, 100, TTop, 1, function(v) { TTop = v; draw(); });
                        VizEngine.createSlider(controls, 'T Bottom', 0, 100, TBottom, 1, function(v) { TBottom = v; draw(); });

                        // Approximate solution via series for rectangle [0,1]x[0,1]
                        // T(x,y) = TBottom + (TTop-TBottom)*y + (TLeft-TRight)*... (simplification)
                        // Use bilinear + Fourier correction approximation
                        function tempAt(x, y, nTerms) {
                            // Bilinear: satisfies BCs at corners
                            var bilin = TBottom*(1-y) + TTop*y + (TLeft - TBottom*(1-y) - TTop*y)*(1-x) + (TRight - TBottom*(1-y) - TTop*y)*x;
                            return bilin;
                        }

                        // Better: use superposition of 4 Dirichlet problems each with one non-zero side
                        // For a [0,a]x[0,b] rectangle with T=f(y) on left, 0 elsewhere:
                        // u(x,y) = sum_n (2/b) int_0^b f(y)sin(npi y/b)dy * sinh(npi(a-x)/b)/sinh(npi a/b) * sin(npi y/b)
                        // We use a=W(pixels), b=H(pixels) in normalized coords

                        function solveSeries(nx, ny, TL, TR, TT, TB) {
                            // Normalize coords to [0,1]x[0,1]
                            var x = nx, y = ny;
                            var N = 20; // Fourier terms

                            var u = 0;

                            // Contribution from left wall (TL) at x=0, 0 at other walls
                            // u_L(x,y) = sum_n A_n sinh(n*pi*(1-x)) / sinh(n*pi) * sin(n*pi*y)
                            // A_n = 2 * TL * (1 - cos(n*pi)) / (n*pi)
                            for (var n = 1; n <= N; n++) {
                                var npi = n * Math.PI;
                                var cn = (1 - Math.cos(npi)) / npi; // integral of sin on [0,1] = (1-cos(npi))/(npi)
                                var An = 2 * TL * cn;
                                var sh = Math.sinh(npi);
                                if (Math.abs(sh) < 1e-10) continue;
                                u += An * Math.sinh(npi * (1 - x)) / sh * Math.sin(npi * y);
                            }

                            // Right wall (TR) at x=1
                            for (var n = 1; n <= N; n++) {
                                var npi = n * Math.PI;
                                var cn = (1 - Math.cos(npi)) / npi;
                                var An = 2 * TR * cn;
                                var sh = Math.sinh(npi);
                                if (Math.abs(sh) < 1e-10) continue;
                                u += An * Math.sinh(npi * x) / sh * Math.sin(npi * y);
                            }

                            // Bottom wall (TB) at y=0: sum in x direction
                            for (var n = 1; n <= N; n++) {
                                var npi = n * Math.PI;
                                var cn = (1 - Math.cos(npi)) / npi;
                                var An = 2 * TB * cn;
                                var sh = Math.sinh(npi);
                                if (Math.abs(sh) < 1e-10) continue;
                                u += An * Math.sinh(npi * (1 - y)) / sh * Math.sin(npi * x);
                            }

                            // Top wall (TT) at y=1
                            for (var n = 1; n <= N; n++) {
                                var npi = n * Math.PI;
                                var cn = (1 - Math.cos(npi)) / npi;
                                var An = 2 * TT * cn;
                                var sh = Math.sinh(npi);
                                if (Math.abs(sh) < 1e-10) continue;
                                u += An * Math.sinh(npi * y) / sh * Math.sin(npi * x);
                            }

                            return u;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var margin = 40;
                            var W = viz.width - 2*margin, H = viz.height - 2*margin;

                            // Compute temperature field
                            var RES = 60;
                            var tvals = [];
                            var tMin = Infinity, tMax = -Infinity;
                            for (var j = 0; j <= RES; j++) {
                                var row = [];
                                for (var i = 0; i <= RES; i++) {
                                    var nx = i / RES, ny = j / RES;
                                    var tv = solveSeries(nx, ny, TLeft, TRight, TBottom, TTop);
                                    row.push(tv);
                                    tMin = Math.min(tMin, tv);
                                    tMax = Math.max(tMax, tv);
                                }
                                tvals.push(row);
                            }
                            var tRange = tMax - tMin || 1;

                            // Draw heatmap
                            for (var j = 0; j < RES; j++) {
                                for (var i = 0; i < RES; i++) {
                                    var t = (tvals[j][i] - tMin) / tRange;
                                    var rgb = VizEngine.colormapSample(t, 'inferno');
                                    ctx.fillStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                                    ctx.fillRect(margin + i * W / RES, margin + (RES - j - 1) * H / RES,
                                                 Math.ceil(W / RES) + 1, Math.ceil(H / RES) + 1);
                                }
                            }

                            // Draw isotherms (contours)
                            var nContours = 8;
                            for (var k = 1; k < nContours; k++) {
                                var level = tMin + k * tRange / nContours;
                                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                                ctx.lineWidth = 1;
                                // Simple marching-squares approximation (horizontal crossings)
                                ctx.beginPath();
                                var started = false;
                                for (var j = 0; j < RES; j++) {
                                    for (var i = 0; i < RES; i++) {
                                        var v00 = tvals[j][i] - level;
                                        var v10 = tvals[j][i+1] - level;
                                        var v01 = tvals[j+1] ? (tvals[j+1][i] - level) : v00;
                                        if (v00 * v10 < 0) {
                                            var frac = v00 / (v00 - v10);
                                            var px = margin + (i + frac) * W / RES;
                                            var py = margin + (RES - j - 0.5) * H / RES;
                                            started ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
                                            started = true;
                                        } else {
                                            started = false;
                                        }
                                    }
                                    started = false;
                                }
                                ctx.stroke();
                            }

                            // Border
                            ctx.strokeStyle = 'rgba(255,255,255,0.6)';
                            ctx.lineWidth = 2;
                            ctx.strokeRect(margin, margin, W, H);

                            // Temperature labels on boundaries
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = '#ffffff';
                            ctx.textAlign = 'center';
                            ctx.fillText(TTop.toFixed(0) + '\u00b0', margin + W/2, margin - 8);
                            ctx.fillText(TBottom.toFixed(0) + '\u00b0', margin + W/2, margin + H + 18);
                            ctx.save(); ctx.translate(margin - 18, margin + H/2); ctx.rotate(-Math.PI/2);
                            ctx.fillText(TLeft.toFixed(0) + '\u00b0', 0, 0); ctx.restore();
                            ctx.save(); ctx.translate(margin + W + 18, margin + H/2); ctx.rotate(Math.PI/2);
                            ctx.fillText(TRight.toFixed(0) + '\u00b0', 0, 0); ctx.restore();

                            ctx.fillStyle = 'rgba(255,255,255,0.5)';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('\u0394T = 0 (steady state)', margin + W/2, viz.height - 6);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A rectangular plate occupies \\(0 \\leq x \\leq \\pi\\), \\(0 \\leq y \\leq 1\\). The top and bottom edges are held at \\(T = 0\\); the right edge at \\(T = 0\\); the left edge at \\(T = \\sin y\\). Find the steady-state temperature.',
                    hint: 'Try a separated solution \\(T = X(x)Y(y)\\) with \\(\\Delta T = 0\\). The boundary conditions force a specific eigenvalue.',
                    solution: 'Separation of variables gives \\(X\'\'Y + XY\'\' = 0\\), so \\(X\'\'/X = -Y\'\'/Y = \\lambda\\). The conditions \\(Y(0)=Y(1)=0\\) force \\(\\lambda = n^2\\pi^2\\), so \\(Y_n = \\sin(n\\pi y)\\). With \\(T(\\pi,y)=0\\): \\(X_n(x) = \\sinh(n\\pi(\\pi-x))/\\sinh(n\\pi^2)\\). Since the left boundary is \\(\\sin y = \\sin(1\\cdot \\pi y / \\pi)\\cdots\\) only \\(n=1\\) contributes: \\(T = \\sin(y)\\,\\sinh(\\pi - x)/\\sinh(\\pi)\\).'
                },
                {
                    question: 'The electric potential between two concentric cylinders (inner radius 1, outer radius \\(R > 1\\)) is \\(V_1\\) on the inner and \\(V_2\\) on the outer. Find \\(\\Phi(r)\\).',
                    hint: 'By symmetry \\(\\Phi\\) depends only on \\(r\\). In polar coordinates, \\(\\Delta \\Phi = \\Phi_{rr} + \\frac{1}{r}\\Phi_r = 0\\).',
                    solution: 'The ODE \\((r\\Phi_r)_r = 0\\) gives \\(\\Phi = A\\ln r + B\\). From \\(\\Phi(1)=V_1\\): \\(B = V_1\\). From \\(\\Phi(R)=V_2\\): \\(A = (V_2-V_1)/\\ln R\\). So \\(\\Phi(r) = V_1 + (V_2-V_1)\\frac{\\ln r}{\\ln R}\\). Note this is the harmonic function \\(\\text{Re}(c\\log z + d)\\).'
                }
            ]
        }
    ]
});
