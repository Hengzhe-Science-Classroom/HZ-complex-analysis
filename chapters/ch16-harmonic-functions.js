window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'Harmonic Functions',
    subtitle: 'Solutions to Laplace\'s equation and the Dirichlet problem',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Why Harmonic Functions?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation: Why Harmonic Functions?',
            content: `
<h2>Why Harmonic Functions?</h2>

<div class="env-block intuition">
    <div class="env-title">From Analytic to Harmonic</div>
    <div class="env-body">
        <p>Every analytic function \\(f = u + iv\\) carries two real-valued functions \\(u\\) and \\(v\\) that satisfy the Cauchy-Riemann equations. Take these equations one step further: differentiate the first with respect to \\(x\\) and the second with respect to \\(y\\), then add. You get \\(\\Delta u = u_{xx} + u_{yy} = 0\\). The function \\(u\\) solves <strong>Laplace's equation</strong>, and the same holds for \\(v\\). Functions satisfying this PDE are called <em>harmonic</em>.</p>
    </div>
</div>

<p>Laplace's equation is one of the most important PDEs in mathematics and physics. It governs steady-state temperature distributions, electrostatic potentials, incompressible fluid flow, and gravitational fields. The theory of harmonic functions thus sits at the intersection of complex analysis, PDE theory, and mathematical physics.</p>

<div class="env-block definition">
    <div class="env-title">Definition (Harmonic Function)</div>
    <div class="env-body">
        <p>A real-valued function \\(u: \\Omega \\to \\mathbb{R}\\), where \\(\\Omega \\subseteq \\mathbb{R}^2\\) is open, is <strong>harmonic</strong> on \\(\\Omega\\) if \\(u \\in C^2(\\Omega)\\) and</p>
        \\[
        \\Delta u = \\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} = 0 \\quad \\text{on } \\Omega.
        \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Basic Harmonic Functions</div>
    <div class="env-body">
        <p>Each of these satisfies \\(\\Delta u = 0\\):</p>
        <ul>
            <li>\\(u(x,y) = x^2 - y^2\\) (real part of \\(z^2\\))</li>
            <li>\\(u(x,y) = e^x \\cos y\\) (real part of \\(e^z\\))</li>
            <li>\\(u(x,y) = \\log(x^2 + y^2)\\) (real part of \\(2\\log z\\), harmonic on \\(\\mathbb{R}^2 \\setminus \\{0\\}\\))</li>
            <li>\\(u(x,y) = \\text{Im}(z^3) = 3x^2y - y^3\\)</li>
        </ul>
        <p>Verification for \\(u = x^2 - y^2\\): we have \\(u_{xx} = 2\\) and \\(u_{yy} = -2\\), so \\(\\Delta u = 2 + (-2) = 0\\). \\(\\checkmark\\)</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.1 (Analytic implies harmonic)</div>
    <div class="env-body">
        <p>If \\(f = u + iv\\) is analytic on a domain \\(\\Omega\\), then both \\(u\\) and \\(v\\) are harmonic on \\(\\Omega\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Since \\(f\\) is analytic, the Cauchy-Riemann equations hold: \\(u_x = v_y\\) and \\(u_y = -v_x\\). Since \\(f\\) is analytic, all partial derivatives of \\(u\\) and \\(v\\) of all orders exist and are continuous. Differentiating:</p>
        \\[u_{xx} = v_{yx}, \\quad u_{yy} = -v_{xy}.\\]
        <p>By equality of mixed partials, \\(v_{yx} = v_{xy}\\), so \\(u_{xx} + u_{yy} = v_{yx} - v_{xy} = 0\\). The argument for \\(v\\) is identical. \\(\\square\\)</p>
    </div>
</div>

<p>The converse is more subtle. A single harmonic function is not necessarily the real part of an analytic function on arbitrary domains (topological obstructions may prevent finding a harmonic conjugate globally). But on simply connected domains, the converse holds, as we will see in Section 3.</p>

<div class="env-block remark">
    <div class="env-title">Non-example</div>
    <div class="env-body">
        <p>The function \\(u(x,y) = x^2 + y^2\\) is <em>not</em> harmonic: \\(u_{xx} + u_{yy} = 2 + 2 = 4 \\neq 0\\). It is the modulus squared \\(|z|^2\\), which is not the real part of any analytic function.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-harmonic-heatmap"></div>
`,
            visualizations: [
                {
                    id: 'viz-harmonic-heatmap',
                    title: 'Heatmaps of Harmonic Functions',
                    description: 'Visualize four harmonic functions as heatmaps. Each satisfies Laplace\'s equation. Use the buttons to switch between functions.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 40 });

                        var functions = [
                            { name: 'Re(z\u00B2) = x\u00B2 - y\u00B2', fn: function(x, y) { return x*x - y*y; } },
                            { name: 'Re(e^z) = e^x cos y', fn: function(x, y) { return Math.exp(x) * Math.cos(y); } },
                            { name: 'log|z| (r > 0)', fn: function(x, y) { var r2 = x*x + y*y; return r2 < 1e-6 ? NaN : 0.5 * Math.log(r2); } },
                            { name: 'Im(z\u00B3) = 3x\u00B2y - y\u00B3', fn: function(x, y) { return 3*x*x*y - y*y*y; } }
                        ];
                        var currentIdx = 0;

                        for (var i = 0; i < functions.length; i++) {
                            (function(idx) {
                                VizEngine.createButton(controls, functions[idx].name, function() {
                                    currentIdx = idx;
                                    draw();
                                });
                            })(i);
                        }

                        function draw() {
                            viz.drawHeatmap(functions[currentIdx].fn, [-4, 4], [-3, 3], 'coolwarm');
                            var ctx = viz.ctx;
                            ctx.fillStyle = 'rgba(12,12,32,0.7)';
                            ctx.fillRect(0, 0, viz.width, 30);
                            viz.screenText('u(x,y) = ' + functions[currentIdx].name, viz.width / 2, 16, '#f0f6fc', 14);
                            viz.screenText('\u0394u = 0 (harmonic)', viz.width / 2, viz.height - 12, '#8b949e', 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(u(x,y) = e^x \\cos y\\) is harmonic by computing \\(u_{xx}\\) and \\(u_{yy}\\) explicitly.',
                    hint: 'Compute the second partial derivatives and check that their sum is zero.',
                    solution: 'We have \\(u_x = e^x \\cos y\\) and \\(u_{xx} = e^x \\cos y\\). Also \\(u_y = -e^x \\sin y\\) and \\(u_{yy} = -e^x \\cos y\\). So \\(u_{xx} + u_{yy} = e^x \\cos y - e^x \\cos y = 0\\). \\(\\checkmark\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Properties of Harmonic Functions
        // ================================================================
        {
            id: 'sec-properties',
            title: 'Properties: Mean Value, Maximum Principle, Harnack',
            content: `
<h2>Properties of Harmonic Functions</h2>

<p>Harmonic functions inherit remarkable rigidity from their connection to analytic functions. Three properties stand out: the mean value property, the maximum principle, and Harnack's inequality. These properties are not only theoretically elegant but serve as the workhorses of the theory.</p>

<h3>The Mean Value Property</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.2 (Mean Value Property)</div>
    <div class="env-body">
        <p>If \\(u\\) is harmonic on a domain \\(\\Omega\\) and the closed disk \\(\\overline{D}(a, R)\\) is contained in \\(\\Omega\\), then</p>
        \\[
        u(a) = \\frac{1}{2\\pi} \\int_0^{2\\pi} u(a + Re^{i\\theta})\\, d\\theta.
        \\]
        <p>That is, the value of \\(u\\) at the center of any disk equals the average of \\(u\\) on the boundary circle.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof sketch</div>
    <div class="env-body">
        <p>On the simply connected disk \\(D(a, R)\\), the harmonic function \\(u\\) is the real part of some analytic function \\(f\\). By Cauchy's integral formula,</p>
        \\[
        f(a) = \\frac{1}{2\\pi i} \\oint_{|z-a|=R} \\frac{f(z)}{z-a}\\, dz = \\frac{1}{2\\pi} \\int_0^{2\\pi} f(a + Re^{i\\theta})\\, d\\theta.
        \\]
        <p>Taking the real part of both sides gives the result. \\(\\square\\)</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Physical Intuition</div>
    <div class="env-body">
        <p>Think of \\(u\\) as a steady-state temperature. No point can be hotter than the average of its surroundings (otherwise, heat would flow inward, contradicting the steady state). This is precisely the mean value property: every point's temperature equals the average over any surrounding circle.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Converse of the mean value property</div>
    <div class="env-body">
        <p>A continuous function satisfying the mean value property on every disk within \\(\\Omega\\) is harmonic on \\(\\Omega\\). This gives an alternative characterization of harmonic functions that avoids requiring \\(C^2\\) regularity in the definition.</p>
    </div>
</div>

<h3>The Maximum Principle</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.3 (Maximum Principle for Harmonic Functions)</div>
    <div class="env-body">
        <p>Let \\(u\\) be harmonic on a connected open set \\(\\Omega\\).</p>
        <ol>
            <li><strong>Strong form:</strong> If \\(u\\) attains its maximum at an interior point of \\(\\Omega\\), then \\(u\\) is constant on \\(\\Omega\\).</li>
            <li><strong>Weak form:</strong> If \\(\\Omega\\) is bounded and \\(u\\) extends continuously to \\(\\overline{\\Omega}\\), then \\(\\max_{\\overline{\\Omega}} u = \\max_{\\partial \\Omega} u\\).</li>
        </ol>
        <p>The same statements hold for the minimum (apply the maximum principle to \\(-u\\)).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof of the strong form</div>
    <div class="env-body">
        <p>Suppose \\(u(a) = M = \\max_{\\Omega} u\\) for some \\(a \\in \\Omega\\). Take any disk \\(D(a, r) \\subset \\Omega\\). By the mean value property:</p>
        \\[
        M = u(a) = \\frac{1}{2\\pi} \\int_0^{2\\pi} u(a + re^{i\\theta})\\, d\\theta.
        \\]
        <p>Since \\(u \\leq M\\) everywhere, the only way the average can equal \\(M\\) is if \\(u \\equiv M\\) on the circle. Since \\(r\\) is arbitrary (up to the boundary of \\(\\Omega\\)), the set \\(\\{z : u(z) = M\\}\\) is open. It is also closed (by continuity of \\(u\\)). Since \\(\\Omega\\) is connected, \\(u \\equiv M\\) on all of \\(\\Omega\\). \\(\\square\\)</p>
    </div>
</div>

<h3>Harnack's Inequality</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.4 (Harnack's Inequality)</div>
    <div class="env-body">
        <p>Let \\(u\\) be a <em>non-negative</em> harmonic function on the disk \\(D(0, R)\\). Then for \\(|z| = r < R\\):</p>
        \\[
        \\frac{R - r}{R + r} \\, u(0) \\leq u(z) \\leq \\frac{R + r}{R - r} \\, u(0).
        \\]
    </div>
</div>

<p>Harnack's inequality says that a non-negative harmonic function on a disk cannot vary too wildly: the ratio \\(u(z)/u(0)\\) is bounded above and below by factors depending only on \\(|z|/R\\). As \\(z \\to 0\\), both bounds converge to 1. As \\(|z| \\to R\\), the upper bound blows up and the lower bound goes to zero, which is sharp.</p>

<div class="env-block remark">
    <div class="env-title">Harnack's convergence theorem</div>
    <div class="env-body">
        <p>An important consequence: if \\(u_1 \\leq u_2 \\leq u_3 \\leq \\cdots\\) is an increasing sequence of harmonic functions on a domain \\(\\Omega\\), then either \\(u_n \\to \\infty\\) uniformly on compact subsets (in which case the limit is not harmonic) or \\(u_n\\) converges uniformly on compact subsets to a harmonic function.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-mean-value-harmonic"></div>
`,
            visualizations: [
                {
                    id: 'viz-mean-value-harmonic',
                    title: 'Mean Value Property',
                    description: 'An animated circle samples points on its boundary. The average of the harmonic function on the boundary equals its value at the center. Drag the center point to test this at different locations.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400, scale: 60,
                            originX: 280, originY: 200
                        });

                        var R = 1.5;
                        var slider = VizEngine.createSlider(controls, 'Radius R', 0.3, 2.5, R, 0.1, function(v) {
                            R = v;
                        });

                        // Harmonic function: Re(z^2) = x^2 - y^2
                        function u(x, y) { return x*x - y*y; }

                        var center = viz.addDraggable('center', 1, 0.5, viz.colors.blue, 8);

                        viz.animate(function(t) {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var cx = center.x, cy = center.y;
                            var uCenter = u(cx, cy);

                            // Draw circle
                            viz.drawCircle(cx, cy, R, null, viz.colors.blue + '88', 2);

                            // Sample points on circle and compute average
                            var N = 64;
                            var sum = 0;
                            var theta = (t / 1500) % (2 * Math.PI);
                            for (var i = 0; i < N; i++) {
                                var angle = 2 * Math.PI * i / N;
                                var px = cx + R * Math.cos(angle);
                                var py = cy + R * Math.sin(angle);
                                sum += u(px, py);
                            }
                            var avg = sum / N;

                            // Draw animated sampling point
                            var sampX = cx + R * Math.cos(theta);
                            var sampY = cy + R * Math.sin(theta);
                            viz.drawPoint(sampX, sampY, viz.colors.orange, null, 5);

                            // Draw a few sample points with colors showing value
                            var nShow = 24;
                            for (var j = 0; j < nShow; j++) {
                                var a = 2 * Math.PI * j / nShow;
                                var spx = cx + R * Math.cos(a);
                                var spy = cy + R * Math.sin(a);
                                var val = u(spx, spy);
                                var col = val >= 0 ? viz.colors.teal : viz.colors.red;
                                viz.drawPoint(spx, spy, col, null, 3);
                            }

                            // Draw center point
                            viz.drawPoint(cx, cy, viz.colors.blue, null, 6);

                            // Display values
                            viz.screenText('u(x,y) = x\u00B2 \u2212 y\u00B2   (harmonic)', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('u(center) = ' + uCenter.toFixed(3), viz.width / 2, viz.height - 50, viz.colors.blue, 13);
                            viz.screenText('avg on circle = ' + avg.toFixed(3), viz.width / 2, viz.height - 30, viz.colors.orange, 13);
                            viz.screenText(Math.abs(uCenter - avg) < 0.01 ? 'Equal! Mean value property holds.' : '(adjust for boundary)', viz.width / 2, viz.height - 12, viz.colors.teal, 11);

                            viz.drawDraggables();
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the mean value property implies the maximum principle directly (without using analyticity).',
                    hint: 'If \\(u(a) = M\\) is the maximum and the mean value property holds, what can you conclude about \\(u\\) on any circle centered at \\(a\\)?',
                    solution: 'Suppose \\(u(a) = M = \\max u\\). By the mean value property, \\(M = \\frac{1}{2\\pi}\\int_0^{2\\pi} u(a+re^{i\\theta})\\,d\\theta\\). Since \\(u \\leq M\\), the integrand is at most \\(M\\), and the average equals \\(M\\), so \\(u \\equiv M\\) on each circle. The set \\(\\{u = M\\}\\) is thus open. Being a level set of a continuous function, it is also closed. By connectedness, \\(u \\equiv M\\).'
                },
                {
                    question: 'Let \\(u\\) and \\(v\\) be harmonic on a bounded domain \\(\\Omega\\), continuous on \\(\\overline{\\Omega}\\), with \\(u = v\\) on \\(\\partial\\Omega\\). Prove that \\(u = v\\) on \\(\\Omega\\).',
                    hint: 'Apply the maximum principle to \\(w = u - v\\) and to \\(-w\\).',
                    solution: 'Let \\(w = u - v\\). Then \\(w\\) is harmonic on \\(\\Omega\\), continuous on \\(\\overline{\\Omega}\\), and \\(w = 0\\) on \\(\\partial\\Omega\\). By the maximum principle, \\(\\max_{\\overline{\\Omega}} w = \\max_{\\partial\\Omega} w = 0\\). By the minimum principle (applied to \\(-w\\)), \\(\\min_{\\overline{\\Omega}} w = 0\\). Hence \\(w \\equiv 0\\), so \\(u \\equiv v\\). This proves <strong>uniqueness</strong> for the Dirichlet problem.'
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

<div class="env-block intuition">
    <div class="env-title">Reconstructing the Analytic Function</div>
    <div class="env-body">
        <p>Given a harmonic function \\(u\\), can we find a harmonic function \\(v\\) so that \\(f = u + iv\\) is analytic? Such a \\(v\\) is called a <em>harmonic conjugate</em> of \\(u\\). The Cauchy-Riemann equations tell us exactly what \\(v\\) must be: \\(v_x = -u_y\\) and \\(v_y = u_x\\). The question is whether these conditions can be integrated consistently.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Harmonic Conjugate)</div>
    <div class="env-body">
        <p>If \\(u\\) is harmonic on a domain \\(\\Omega\\), a function \\(v\\) is a <strong>harmonic conjugate</strong> of \\(u\\) if \\(v\\) is harmonic on \\(\\Omega\\) and \\(f = u + iv\\) is analytic on \\(\\Omega\\). Equivalently, \\(u\\) and \\(v\\) satisfy the Cauchy-Riemann equations throughout \\(\\Omega\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.5 (Existence of Harmonic Conjugates)</div>
    <div class="env-body">
        <p>If \\(u\\) is harmonic on a <strong>simply connected</strong> domain \\(\\Omega\\), then \\(u\\) has a harmonic conjugate \\(v\\) on \\(\\Omega\\). The conjugate is unique up to an additive constant.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Fix \\(z_0 = (x_0, y_0) \\in \\Omega\\). Define</p>
        \\[
        v(x, y) = \\int_{(x_0, y_0)}^{(x, y)} \\left( -u_y\\, dx + u_x\\, dy \\right).
        \\]
        <p>By Laplace's equation, \\(\\frac{\\partial(-u_y)}{\\partial y} = -u_{yy} = u_{xx} = \\frac{\\partial(u_x)}{\\partial x}\\), so the integrand is an exact differential. On a simply connected domain, the line integral is path-independent. One verifies \\(v_x = -u_y\\) and \\(v_y = u_x\\), which are the Cauchy-Riemann equations. \\(\\square\\)</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Conjugate of \\(x^2 - y^2\\)</div>
    <div class="env-body">
        <p>Let \\(u = x^2 - y^2\\). By Cauchy-Riemann: \\(v_y = u_x = 2x\\) and \\(v_x = -u_y = 2y\\).</p>
        <p>Integrating \\(v_y = 2x\\) with respect to \\(y\\) gives \\(v = 2xy + g(x)\\). Substituting into \\(v_x = 2y + g'(x) = 2y\\), we get \\(g'(x) = 0\\), so \\(g(x) = C\\).</p>
        <p>Thus \\(v = 2xy + C\\), and \\(f = (x^2 - y^2) + i(2xy) = z^2\\). \\(\\checkmark\\)</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Failure on non-simply-connected domains</div>
    <div class="env-body">
        <p>The function \\(u(x,y) = \\log\\sqrt{x^2 + y^2}\\) is harmonic on \\(\\mathbb{C} \\setminus \\{0\\}\\). Its would-be conjugate is \\(v = \\arg(z)\\), but \\(\\arg(z)\\) is not single-valued on this domain. The line integral picks up a nonzero increment \\(2\\pi\\) around each loop encircling the origin. Simple connectivity is essential.</p>
    </div>
</div>

<h3>Orthogonality of Level Curves</h3>

<p>If \\(f = u + iv\\) is analytic and \\(f'(z) \\neq 0\\), the level curves \\(u = c_1\\) and \\(v = c_2\\) are orthogonal wherever they intersect. This is because \\(\\nabla u = (u_x, u_y)\\) and \\(\\nabla v = (v_x, v_y) = (-u_y, u_x)\\) are perpendicular:</p>
\\[
\\nabla u \\cdot \\nabla v = u_x(-u_y) + u_y(u_x) = 0.
\\]

<p>This orthogonality is visible in the visualization below, where the level curves of \\(u\\) and \\(v\\) form a grid of curvilinear rectangles.</p>

<div class="viz-placeholder" data-viz="viz-conjugate-level-curves"></div>
`,
            visualizations: [
                {
                    id: 'viz-conjugate-level-curves',
                    title: 'Orthogonal Level Curves of u and v',
                    description: 'The level curves of a harmonic function u and its conjugate v intersect at right angles, forming an orthogonal net. Choose the analytic function f = u + iv to see the pattern.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400, scale: 60,
                            originX: 280, originY: 200
                        });

                        var funcs = [
                            {
                                name: 'z\u00B2',
                                u: function(x, y) { return x*x - y*y; },
                                v: function(x, y) { return 2*x*y; }
                            },
                            {
                                name: 'e^z',
                                u: function(x, y) { return Math.exp(x) * Math.cos(y); },
                                v: function(x, y) { return Math.exp(x) * Math.sin(y); }
                            },
                            {
                                name: 'z\u00B3',
                                u: function(x, y) { return x*x*x - 3*x*y*y; },
                                v: function(x, y) { return 3*x*x*y - y*y*y; }
                            }
                        ];
                        var currentFunc = 0;

                        for (var i = 0; i < funcs.length; i++) {
                            (function(idx) {
                                VizEngine.createButton(controls, 'f(z) = ' + funcs[idx].name, function() {
                                    currentFunc = idx;
                                    draw();
                                });
                            })(i);
                        }

                        function drawContours(fn, color, levels, xMin, xMax, yMin, yMax, step) {
                            var ctx = viz.ctx;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 1.2;
                            var dx = step || 0.04;
                            var dy = step || 0.04;
                            // Simple marching: find zero crossings row by row
                            for (var li = 0; li < levels.length; li++) {
                                var lev = levels[li];
                                ctx.beginPath();
                                var moved = false;
                                // Scan columns
                                for (var x = xMin; x <= xMax; x += dx) {
                                    for (var y = yMin; y <= yMax; y += dy) {
                                        var v00 = fn(x, y) - lev;
                                        var v10 = fn(x + dx, y) - lev;
                                        var v01 = fn(x, y + dy) - lev;
                                        // Check horizontal edge
                                        if (v00 * v10 < 0) {
                                            var t = v00 / (v00 - v10);
                                            var px = x + t * dx;
                                            var py = y;
                                            var s = viz.toScreen(px, py);
                                            if (!moved) { ctx.moveTo(s[0], s[1]); moved = true; }
                                            else { ctx.lineTo(s[0], s[1]); }
                                        }
                                        // Check vertical edge
                                        if (v00 * v01 < 0) {
                                            var t2 = v00 / (v00 - v01);
                                            var px2 = x;
                                            var py2 = y + t2 * dy;
                                            var s2 = viz.toScreen(px2, py2);
                                            if (!moved) { ctx.moveTo(s2[0], s2[1]); moved = true; }
                                            else { ctx.lineTo(s2[0], s2[1]); }
                                        }
                                    }
                                }
                                ctx.stroke();
                            }
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var f = funcs[currentFunc];
                            var levels = [];
                            for (var k = -8; k <= 8; k++) {
                                levels.push(k * 0.5);
                            }

                            drawContours(f.u, viz.colors.blue, levels, -5, 5, -4, 4, 0.05);
                            drawContours(f.v, viz.colors.orange, levels, -5, 5, -4, 4, 0.05);

                            viz.screenText('f(z) = ' + f.name, viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('u = const (blue)    v = const (orange)    orthogonal!', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the harmonic conjugate of \\(u(x,y) = e^x \\cos y\\).',
                    hint: 'Use the Cauchy-Riemann equations: \\(v_y = u_x\\) and \\(v_x = -u_y\\). Integrate and determine the arbitrary function.',
                    solution: 'From \\(v_y = u_x = e^x \\cos y\\), integrating with respect to \\(y\\): \\(v = e^x \\sin y + g(x)\\). From \\(v_x = -u_y = e^x \\sin y\\), we get \\(e^x \\sin y + g\'(x) = e^x \\sin y\\), so \\(g\'(x) = 0\\) and \\(g = C\\). Thus \\(v = e^x \\sin y + C\\), and \\(f = e^x\\cos y + ie^x\\sin y = e^z\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Explain why \\(u(x,y) = \\log(x^2 + y^2)\\) has no single-valued harmonic conjugate on \\(\\mathbb{C}\\setminus\\{0\\}\\), but does on any simply connected subdomain.',
                    hint: 'Compute the conjugate integral around a loop encircling the origin.',
                    solution: 'The formal conjugate is \\(v = 2\\,\\mathrm{arg}(z)\\). Integrating \\(-u_y\\,dx + u_x\\,dy\\) around the circle \\(|z|=1\\) gives \\(\\oint \\frac{-2y}{x^2+y^2}dx + \\frac{2x}{x^2+y^2}dy = 4\\pi \\neq 0\\). The integral is path-dependent on \\(\\mathbb{C}\\setminus\\{0\\}\\), so no single-valued conjugate exists. On any simply connected subdomain (e.g., a slit plane), the integral is path-independent and a conjugate exists.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: The Poisson Integral Formula
        // ================================================================
        {
            id: 'sec-poisson',
            title: 'The Poisson Integral Formula',
            content: `
<h2>The Poisson Integral Formula</h2>

<div class="env-block intuition">
    <div class="env-title">From Boundary to Interior</div>
    <div class="env-body">
        <p>The Dirichlet problem asks: given boundary values, find a harmonic function in the interior. For the unit disk, the answer is the <em>Poisson integral formula</em>, which expresses interior values as a weighted average of boundary values. The weight is the <strong>Poisson kernel</strong>, a bump function that peaks at the boundary point closest to the interior point.</p>
    </div>
</div>

<h3>Deriving the Poisson Kernel</h3>

<p>Start with the Cauchy integral formula for the disk \\(D(0,1)\\). If \\(f\\) is analytic on \\(\\overline{D}\\) and \\(|z| < 1\\):</p>
\\[
f(z) = \\frac{1}{2\\pi i} \\oint_{|\\zeta|=1} \\frac{f(\\zeta)}{\\zeta - z}\\, d\\zeta.
\\]

<p>The reflected point \\(1/\\bar{z}\\) lies outside the disk, so by Cauchy's theorem:</p>
\\[
0 = \\frac{1}{2\\pi i} \\oint_{|\\zeta|=1} \\frac{f(\\zeta)}{\\zeta - 1/\\bar{z}}\\, d\\zeta.
\\]

<p>Subtracting the second from the first, taking the real part, and writing \\(z = re^{i\\theta}\\), \\(\\zeta = e^{i\\varphi}\\), one arrives at the Poisson integral formula.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.6 (Poisson Integral Formula)</div>
    <div class="env-body">
        <p>Let \\(u\\) be harmonic on a domain containing \\(\\overline{D}(0, R)\\). Then for \\(z = re^{i\\theta}\\) with \\(r < R\\):</p>
        \\[
        u(re^{i\\theta}) = \\frac{1}{2\\pi} \\int_0^{2\\pi} P_r(\\theta - \\varphi)\\, u(Re^{i\\varphi})\\, d\\varphi,
        \\]
        <p>where the <strong>Poisson kernel</strong> (for the disk of radius \\(R\\)) is</p>
        \\[
        P_r(\\theta) = \\frac{R^2 - r^2}{R^2 - 2Rr\\cos\\theta + r^2}.
        \\]
        <p>For the unit disk (\\(R = 1\\)):</p>
        \\[
        P_r(\\theta) = \\frac{1 - r^2}{1 - 2r\\cos\\theta + r^2} = \\text{Re}\\left(\\frac{1 + re^{i\\theta}}{1 - re^{i\\theta}}\\right).
        \\]
    </div>
</div>

<h3>Properties of the Poisson Kernel</h3>

<p>The Poisson kernel enjoys three key properties that make it an <em>approximate identity</em>:</p>
<ol>
    <li>\\(P_r(\\theta) > 0\\) for all \\(\\theta\\) and \\(0 \\leq r < 1\\).</li>
    <li>\\(\\frac{1}{2\\pi} \\int_0^{2\\pi} P_r(\\theta)\\, d\\theta = 1\\).</li>
    <li>For any \\(\\delta > 0\\), \\(P_r(\\theta) \\to 0\\) uniformly for \\(|\\theta| \\geq \\delta\\) as \\(r \\to 1^-\\).</li>
</ol>

<p>Property (3) says that as \\(r \\to 1\\), the Poisson kernel concentrates all its mass near \\(\\theta = 0\\), acting like a Dirac delta at the point \\(e^{i\\varphi}\\) closest to \\(z\\). This is why the Poisson integral recovers the boundary values in the limit.</p>

<div class="env-block example">
    <div class="env-title">Example: Constant boundary data</div>
    <div class="env-body">
        <p>If \\(u \\equiv C\\) on \\(|z| = 1\\), then \\(u(re^{i\\theta}) = \\frac{C}{2\\pi} \\int_0^{2\\pi} P_r(\\theta - \\varphi)\\,d\\varphi = C\\). A constant boundary condition yields a constant harmonic function in the interior. This is consistent with the maximum principle.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-poisson-kernel"></div>
`,
            visualizations: [
                {
                    id: 'viz-poisson-kernel',
                    title: 'The Poisson Kernel P_r(\u03B8)',
                    description: 'The Poisson kernel concentrates near \u03B8 = 0 as r approaches 1. Use the slider to vary r and watch the kernel sharpen into a spike.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            originX: 280, originY: 320, scale: 85
                        });

                        var rVal = 0.5;
                        VizEngine.createSlider(controls, 'r', 0.0, 0.95, rVal, 0.05, function(v) {
                            rVal = v;
                            draw();
                        });

                        function poissonKernel(r, theta) {
                            return (1 - r * r) / (1 - 2 * r * Math.cos(theta) + r * r);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw axes manually for this plot
                            // x-axis: theta from -pi to pi
                            // y-axis: P_r(theta)
                            var xScale = viz.width / (2 * Math.PI + 0.5);
                            var yScale = 250;
                            var xOff = viz.width / 2;
                            var yOff = 340;

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var g = -3; g <= 3; g++) {
                                var gx = xOff + g * xScale;
                                ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, viz.height); ctx.stroke();
                            }
                            for (var h = 0; h <= 5; h++) {
                                var gy = yOff - h * yScale / 5;
                                ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(viz.width, gy); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(0, yOff); ctx.lineTo(viz.width, yOff); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(xOff, 0); ctx.lineTo(xOff, viz.height); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('-\u03C0', xOff - Math.PI * xScale, yOff + 4);
                            ctx.fillText('\u03C0', xOff + Math.PI * xScale, yOff + 4);
                            ctx.fillText('0', xOff + 4, yOff + 4);

                            // Draw Poisson kernel for several r values (faded)
                            var rVals = [0.2, 0.5, 0.8, 0.9];
                            for (var ri = 0; ri < rVals.length; ri++) {
                                var rv = rVals[ri];
                                if (Math.abs(rv - rVal) < 0.05) continue;
                                ctx.strokeStyle = viz.colors.purple + '33';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                for (var j = 0; j <= 300; j++) {
                                    var t = -Math.PI + 2 * Math.PI * j / 300;
                                    var pv = poissonKernel(rv, t);
                                    var sx = xOff + t * xScale;
                                    var sy = yOff - pv * yScale / 5;
                                    if (sy < 10) { j === 0 ? ctx.moveTo(sx, 10) : ctx.lineTo(sx, 10); continue; }
                                    j === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();
                            }

                            // Draw current r
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var k = 0; k <= 400; k++) {
                                var t2 = -Math.PI + 2 * Math.PI * k / 400;
                                var pv2 = poissonKernel(rVal, t2);
                                var sx2 = xOff + t2 * xScale;
                                var sy2 = yOff - pv2 * yScale / 5;
                                if (sy2 < 10) sy2 = 10;
                                k === 0 ? ctx.moveTo(sx2, sy2) : ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Peak value label
                            var peakVal = poissonKernel(rVal, 0);
                            viz.screenText('P_r(\u03B8) with r = ' + rVal.toFixed(2), viz.width / 2, 16, viz.colors.white, 14);
                            viz.screenText('Peak P_r(0) = ' + peakVal.toFixed(2), viz.width / 2, 36, viz.colors.blue, 12);
                            viz.screenText('\u03B8', viz.width - 15, yOff - 5, viz.colors.text, 12);

                            if (rVal > 0.85) {
                                viz.screenText('Kernel concentrating \u2192 approximate identity', viz.width / 2, viz.height - 12, viz.colors.teal, 11);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(\\frac{1}{2\\pi}\\int_0^{2\\pi} P_r(\\theta)\\,d\\theta = 1\\) for \\(0 \\leq r < 1\\) using the formula \\(P_r(\\theta) = \\text{Re}\\left(\\frac{1+re^{i\\theta}}{1-re^{i\\theta}}\\right)\\).',
                    hint: 'The integral of the real part is the real part of the integral. Evaluate \\(\\frac{1}{2\\pi}\\int_0^{2\\pi} \\frac{1+re^{i\\theta}}{1-re^{i\\theta}}d\\theta\\) by substituting \\(\\zeta = e^{i\\theta}\\).',
                    solution: 'Write \\(\\frac{1}{2\\pi}\\int_0^{2\\pi}\\frac{1+re^{i\\theta}}{1-re^{i\\theta}}d\\theta\\). With \\(\\zeta = e^{i\\theta}\\), \\(d\\theta = d\\zeta/(i\\zeta)\\), this becomes \\(\\frac{1}{2\\pi i}\\oint_{|\\zeta|=1}\\frac{1+r\\zeta}{(1-r\\zeta)\\zeta}d\\zeta\\). Partial fractions: \\(\\frac{1+r\\zeta}{(1-r\\zeta)\\zeta} = \\frac{1}{\\zeta} + \\frac{2r}{1-r\\zeta}\\). The first gives residue 1 at \\(\\zeta=0\\); the second has its pole at \\(\\zeta = 1/r > 1\\), outside the contour, contributing 0. The integral equals \\(\\frac{1}{2\\pi i}\\cdot 2\\pi i \\cdot 1 = 1\\). Taking Re gives 1.'
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

<div class="env-block definition">
    <div class="env-title">Definition (Dirichlet Problem)</div>
    <div class="env-body">
        <p>Given a bounded domain \\(\\Omega \\subset \\mathbb{C}\\) and a continuous function \\(g: \\partial\\Omega \\to \\mathbb{R}\\), the <strong>Dirichlet problem</strong> asks for a function \\(u\\) satisfying:</p>
        <ol>
            <li>\\(u\\) is harmonic on \\(\\Omega\\),</li>
            <li>\\(u\\) is continuous on \\(\\overline{\\Omega}\\),</li>
            <li>\\(u = g\\) on \\(\\partial\\Omega\\).</li>
        </ol>
    </div>
</div>

<p>We have already seen that the maximum principle guarantees <strong>uniqueness</strong>: if two solutions exist, their difference is harmonic, zero on the boundary, and hence zero everywhere.</p>

<h3>Solution on the Disk</h3>

<p>The Poisson integral formula provides an explicit solution for the disk \\(D(0, R)\\):</p>
\\[
u(re^{i\\theta}) = \\frac{1}{2\\pi} \\int_0^{2\\pi} P_r(\\theta - \\varphi)\\, g(Re^{i\\varphi})\\, d\\varphi.
\\]

<p>One must verify that: (i) this integral defines a harmonic function in the interior (differentiate under the integral sign), and (ii) the boundary values are attained continuously (this uses the approximate identity properties of the Poisson kernel).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 16.7 (Solution of the Dirichlet problem on the disk)</div>
    <div class="env-body">
        <p>If \\(g\\) is continuous on \\(\\partial D(0, R)\\), the Poisson integral</p>
        \\[
        u(z) = \\begin{cases} \\frac{1}{2\\pi} \\int_0^{2\\pi} P_r(\\theta - \\varphi)\\, g(Re^{i\\varphi})\\, d\\varphi & |z| < R, \\\\ g(z) & |z| = R \\end{cases}
        \\]
        <p>is the unique solution to the Dirichlet problem on \\(D(0, R)\\) with boundary data \\(g\\).</p>
    </div>
</div>

<h3>General Domains: Perron's Method</h3>

<p>For domains more general than disks, Perron's method provides an elegant existence proof (under mild regularity conditions on \\(\\partial\\Omega\\)).</p>

<div class="env-block definition">
    <div class="env-title">Definition (Subharmonic function)</div>
    <div class="env-body">
        <p>A continuous function \\(v: \\Omega \\to \\mathbb{R}\\) is <strong>subharmonic</strong> if for every disk \\(D(a, r) \\subset \\Omega\\),</p>
        \\[
        v(a) \\leq \\frac{1}{2\\pi} \\int_0^{2\\pi} v(a + re^{i\\theta})\\, d\\theta.
        \\]
        <p>In words: the value at the center is at most the average on the circle. (Harmonic functions satisfy this with equality.)</p>
    </div>
</div>

<p><strong>Perron's method:</strong> Define the <em>Perron family</em></p>
\\[
\\mathcal{S}_g = \\{ v : v \\text{ is subharmonic on } \\Omega, \\; \\limsup_{z \\to \\zeta} v(z) \\leq g(\\zeta) \\text{ for all } \\zeta \\in \\partial\\Omega \\}.
\\]

<p>The Perron solution is \\(u(z) = \\sup\\{ v(z) : v \\in \\mathcal{S}_g \\}\\). One shows that \\(u\\) is harmonic (the key step uses the "Poisson modification" trick: replacing a subharmonic function by the Poisson integral on a small disk gives a larger subharmonic function). Whether \\(u\\) attains the boundary values depends on the regularity of \\(\\partial\\Omega\\).</p>

<div class="env-block remark">
    <div class="env-title">Barrier functions and regular boundary points</div>
    <div class="env-body">
        <p>A boundary point \\(\\zeta_0\\) is called <em>regular</em> if the Perron solution attains the prescribed boundary value \\(g(\\zeta_0)\\) there. A sufficient condition for regularity is the existence of a <strong>barrier</strong>: a superharmonic function \\(w\\) on \\(\\Omega\\) with \\(w(z) > 0\\) for \\(z \\neq \\zeta_0\\) and \\(w(\\zeta_0) = 0\\). For domains with smooth boundaries (or even Lipschitz boundaries), every boundary point is regular.</p>
        <p>The classical example of an irregular boundary point is the origin for the punctured disk \\(D(0,1) \\setminus \\{0\\}\\): the boundary value at 0 cannot be attained by a bounded harmonic function on this domain.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-dirichlet-disk"></div>
`,
            visualizations: [
                {
                    id: 'viz-dirichlet-disk',
                    title: 'Dirichlet Problem on the Disk',
                    description: 'Given piecewise-constant boundary data on the unit disk, the Poisson integral formula produces a smooth harmonic function in the interior. Watch how boundary values propagate inward.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 40 });

                        var bdryType = 0;
                        var bdryFunctions = [
                            {
                                name: 'Hot top / cold bottom',
                                fn: function(phi) { return Math.sin(phi) > 0 ? 1 : -1; }
                            },
                            {
                                name: 'Single hot arc',
                                fn: function(phi) { return (phi > -Math.PI/4 && phi < Math.PI/4) ? 1 : 0; }
                            },
                            {
                                name: 'cos(\u03C6)',
                                fn: function(phi) { return Math.cos(phi); }
                            },
                            {
                                name: 'cos(3\u03C6)',
                                fn: function(phi) { return Math.cos(3 * phi); }
                            }
                        ];

                        for (var i = 0; i < bdryFunctions.length; i++) {
                            (function(idx) {
                                VizEngine.createButton(controls, bdryFunctions[idx].name, function() {
                                    bdryType = idx;
                                    draw();
                                });
                            })(i);
                        }

                        function poissonSolve(r, theta, gFn, N) {
                            if (r < 1e-8) {
                                // At origin: simple average
                                var s = 0;
                                for (var k = 0; k < N; k++) {
                                    s += gFn(2 * Math.PI * k / N);
                                }
                                return s / N;
                            }
                            var sum = 0;
                            var dphi = 2 * Math.PI / N;
                            for (var j = 0; j < N; j++) {
                                var phi = -Math.PI + dphi * j;
                                var Pr = (1 - r * r) / (1 - 2 * r * Math.cos(theta - phi) + r * r);
                                sum += Pr * gFn(phi) * dphi;
                            }
                            return sum / (2 * Math.PI);
                        }

                        function draw() {
                            var R = 3.5;
                            var gFn = bdryFunctions[bdryType].fn;

                            // Draw heatmap: only inside disk
                            viz.drawHeatmap(function(x, y) {
                                var rr = Math.sqrt(x * x + y * y);
                                if (rr > 1.0) return NaN;
                                if (rr > 0.99) return gFn(Math.atan2(y, x));
                                var th = Math.atan2(y, x);
                                return poissonSolve(rr, th, gFn, 128);
                            }, [-R / viz.scale * viz.width / 2, R / viz.scale * viz.width / 2],
                               [-R / viz.scale * viz.height / 2, R / viz.scale * viz.height / 2],
                               'coolwarm');

                            // Draw boundary circle
                            var ctx = viz.ctx;
                            var cx = viz.originX, cy = viz.originY, sr = viz.scale;
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx, cy, sr, 0, 2 * Math.PI);
                            ctx.stroke();

                            viz.screenText('Boundary: ' + bdryFunctions[bdryType].name, viz.width / 2, 16, viz.colors.white, 13);
                            viz.screenText('Poisson integral solution (harmonic inside disk)', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the Poisson integral formula to solve the Dirichlet problem on the unit disk with boundary data \\(g(e^{i\\theta}) = \\cos\\theta\\). What is \\(u(0)\\)?',
                    hint: 'Express \\(\\cos\\theta\\) in terms of \\(e^{i\\theta}\\) and use the fact that the Poisson integral of \\(e^{in\\theta}\\) is \\(r^n e^{in\\theta}\\).',
                    solution: 'The boundary data \\(g(e^{i\\theta}) = \\cos\\theta = \\text{Re}(e^{i\\theta})\\). The Poisson integral extends this to \\(u(re^{i\\theta}) = \\text{Re}(re^{i\\theta}) = r\\cos\\theta\\). This is harmonic (it is \\(x\\), which satisfies \\(\\Delta x = 0\\)) and matches \\(\\cos\\theta\\) on \\(r = 1\\). At the origin: \\(u(0) = 0\\). This is consistent with \\(u(0)\\) being the average of \\(\\cos\\theta\\) over \\([0, 2\\pi]\\), which is 0.'
                },
                {
                    question: 'Explain why the Dirichlet problem on the punctured disk \\(D(0,1) \\setminus \\{0\\}\\) with \\(g \\equiv 0\\) on \\(|z|=1\\) and \\(g(0) = 1\\) has no solution.',
                    hint: 'If a bounded harmonic function on the punctured disk exists, what does the removable singularity theorem for harmonic functions say?',
                    solution: 'Any bounded harmonic function on the punctured disk extends harmonically to the full disk (removable singularity theorem for harmonic functions). The extended function is harmonic on \\(D(0,1)\\) with \\(u = 0\\) on \\(|z|=1\\). By the maximum principle, \\(u \\equiv 0\\) on \\(D(0,1)\\). So \\(u(0) = 0 \\neq 1\\), contradicting the boundary condition at 0. The origin is an <em>irregular</em> boundary point for this domain.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge to the Next Chapter
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'The Harmonic-Analytic Bridge',
            content: `
<h2>The Harmonic-Analytic Bridge</h2>

<p>Let us take stock of the deep connection between harmonic and analytic functions that we have built throughout this chapter.</p>

<div class="env-block theorem">
    <div class="env-title">Summary: The Harmonic-Analytic Correspondence</div>
    <div class="env-body">
        <p>On a simply connected domain \\(\\Omega\\), the following are equivalent:</p>
        <ol>
            <li>\\(u\\) is harmonic on \\(\\Omega\\).</li>
            <li>\\(u\\) is locally the real part of an analytic function.</li>
            <li>\\(u\\) is globally the real part of an analytic function on \\(\\Omega\\).</li>
        </ol>
        <p>The passage \\(u \\mapsto f = u + iv\\) (with \\(v\\) the harmonic conjugate) provides a bijection between harmonic functions modulo constants and analytic functions modulo purely imaginary constants.</p>
    </div>
</div>

<h3>Applications to Physical Problems</h3>

<p>The Dirichlet problem is a model for <strong>steady-state heat conduction</strong>. If the boundary of a region is held at prescribed temperatures \\(g\\), the equilibrium temperature distribution inside is the unique harmonic function agreeing with \\(g\\) on the boundary.</p>

<div class="env-block example">
    <div class="env-title">Example: Heat distribution on a plate</div>
    <div class="env-body">
        <p>Consider a thin circular plate of radius 1. The top semicircle is held at temperature 1, the bottom at temperature 0. The steady-state temperature inside the plate is given by the Poisson integral:</p>
        \\[
        u(r, \\theta) = \\frac{1}{2} + \\frac{1}{\\pi} \\arctan\\left(\\frac{2r\\sin\\theta}{1-r^2}\\right).
        \\]
        <p>At the center, \\(u(0) = 1/2\\), exactly the average of the boundary values. The isotherms (level curves of \\(u\\)) are circular arcs connecting the two points where the boundary temperature jumps.</p>
    </div>
</div>

<h3>Electrostatic Interpretation</h3>

<p>In two-dimensional electrostatics, the electric potential \\(\\Phi\\) satisfies Laplace's equation in charge-free regions. The boundary conditions are set by the voltages on conductors. The electric field \\(\\mathbf{E} = -\\nabla\\Phi\\) is orthogonal to the equipotential lines, which is why the level curves of \\(u\\) and its conjugate \\(v\\) form an orthogonal grid: the \\(u = \\text{const}\\) curves are equipotentials, and the \\(v = \\text{const}\\) curves are field lines (or vice versa).</p>

<h3>Looking Ahead</h3>

<p>The theory of harmonic functions opens several further directions:</p>
<ul>
    <li><strong>Conformal mapping and the Dirichlet problem:</strong> If \\(\\Omega\\) can be conformally mapped to the disk, we can solve the Dirichlet problem on \\(\\Omega\\) by pulling back the Poisson integral through the conformal map. The Riemann mapping theorem guarantees this is possible for any simply connected domain (other than \\(\\mathbb{C}\\) itself).</li>
    <li><strong>Green's functions:</strong> The Poisson kernel can be interpreted via Green's functions, providing a systematic approach to the Dirichlet problem on general domains.</li>
    <li><strong>Harmonic functions in higher dimensions:</strong> Laplace's equation \\(\\Delta u = 0\\) makes sense in \\(\\mathbb{R}^n\\) for any \\(n\\). The two-dimensional theory is special because of its connection to complex analysis, but the mean value property, maximum principle, and Poisson integral generalize to all dimensions.</li>
</ul>

<div class="viz-placeholder" data-viz="viz-temperature"></div>
`,
            visualizations: [
                {
                    id: 'viz-temperature',
                    title: 'Steady-State Temperature Distribution',
                    description: 'A circular plate with prescribed boundary temperatures. The interior temperature is the harmonic extension (Poisson integral). Toggle between boundary conditions to see how heat distributes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 40 });

                        var scenario = 0;
                        var scenarios = [
                            {
                                name: 'Hot top / cold bottom',
                                fn: function(phi) { return phi > 0 && phi < Math.PI ? 1 : 0; }
                            },
                            {
                                name: 'Two hot arcs',
                                fn: function(phi) {
                                    var a = ((phi % (2*Math.PI)) + 2*Math.PI) % (2*Math.PI);
                                    return (a < Math.PI/3 || (a > Math.PI && a < 4*Math.PI/3)) ? 1 : 0;
                                }
                            },
                            {
                                name: 'Gradient (cos\u03C6)',
                                fn: function(phi) { return 0.5 + 0.5 * Math.cos(phi); }
                            }
                        ];

                        for (var i = 0; i < scenarios.length; i++) {
                            (function(idx) {
                                VizEngine.createButton(controls, scenarios[idx].name, function() {
                                    scenario = idx;
                                    draw();
                                });
                            })(i);
                        }

                        function poissonSolve(r, theta, gFn, N) {
                            if (r < 1e-8) {
                                var s = 0;
                                for (var k = 0; k < N; k++) {
                                    s += gFn(-Math.PI + 2 * Math.PI * k / N);
                                }
                                return s / N;
                            }
                            var sum = 0;
                            var dphi = 2 * Math.PI / N;
                            for (var j = 0; j < N; j++) {
                                var phi = -Math.PI + dphi * j;
                                var Pr = (1 - r * r) / (1 - 2 * r * Math.cos(theta - phi) + r * r);
                                sum += Pr * gFn(phi) * dphi;
                            }
                            return sum / (2 * Math.PI);
                        }

                        function draw() {
                            var xRange = [-1.3, 1.3];
                            var yRange = [-1.1, 1.1];
                            var gFn = scenarios[scenario].fn;

                            viz.drawHeatmap(function(x, y) {
                                var rr = Math.sqrt(x * x + y * y);
                                if (rr > 1.02) return NaN;
                                if (rr > 0.99) return gFn(Math.atan2(y, x));
                                var th = Math.atan2(y, x);
                                return poissonSolve(rr, th, gFn, 128);
                            }, xRange, yRange, 'inferno');

                            // Draw boundary circle
                            var ctx = viz.ctx;
                            // Convert disk boundary to screen coords
                            var cx = (-xRange[0]) / (xRange[1] - xRange[0]) * viz.canvas.width / (window.devicePixelRatio || 1);
                            var cy = (yRange[1]) / (yRange[1] - yRange[0]) * viz.canvas.height / (window.devicePixelRatio || 1);
                            var sr = 1.0 / (xRange[1] - xRange[0]) * viz.canvas.width / (window.devicePixelRatio || 1);
                            ctx.strokeStyle = '#ffffff88';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx, cy, sr, 0, 2 * Math.PI);
                            ctx.stroke();

                            // Draw isotherms
                            ctx.strokeStyle = '#ffffff33';
                            ctx.lineWidth = 0.8;
                            for (var lev = 0.1; lev < 1.0; lev += 0.1) {
                                ctx.beginPath();
                                var started = false;
                                for (var ai = 0; ai <= 360; ai++) {
                                    var ang = ai * Math.PI / 180;
                                    // Binary search for radius where u = lev
                                    var rLo = 0, rHi = 0.99;
                                    for (var it = 0; it < 20; it++) {
                                        var rMid = (rLo + rHi) / 2;
                                        var val = poissonSolve(rMid, ang, gFn, 64);
                                        if (val < lev) rLo = rMid; else rHi = rMid;
                                    }
                                    var rSol = (rLo + rHi) / 2;
                                    if (rSol > 0.01 && rSol < 0.98) {
                                        var ix = rSol * Math.cos(ang);
                                        var iy = rSol * Math.sin(ang);
                                        var px = (-xRange[0] + ix) / (xRange[1] - xRange[0]) * viz.canvas.width / (window.devicePixelRatio || 1);
                                        var py = (yRange[1] - iy) / (yRange[1] - yRange[0]) * viz.canvas.height / (window.devicePixelRatio || 1);
                                        if (!started) { ctx.moveTo(px, py); started = true; }
                                        else ctx.lineTo(px, py);
                                    }
                                }
                                ctx.stroke();
                            }

                            viz.screenText('Steady-state temperature: ' + scenarios[scenario].name, viz.width / 2, 16, '#f0f6fc', 13);
                            viz.screenText('Isotherms shown as white curves', viz.width / 2, viz.height - 12, '#8b949e', 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Suppose \\(u\\) is harmonic on the unit disk with \\(u(e^{i\\theta}) = 1\\) for \\(0 < \\theta < \\pi\\) and \\(u(e^{i\\theta}) = 0\\) for \\(\\pi < \\theta < 2\\pi\\). Find \\(u(0)\\) without computing the full Poisson integral.',
                    hint: 'Use the mean value property.',
                    solution: 'By the mean value property, \\(u(0) = \\frac{1}{2\\pi}\\int_0^{2\\pi} u(e^{i\\theta})\\,d\\theta = \\frac{1}{2\\pi}(\\pi \\cdot 1 + \\pi \\cdot 0) = \\frac{1}{2}\\). The center temperature is the average boundary temperature.'
                },
                {
                    question: 'Show that if \\(u\\) is harmonic and bounded on \\(\\mathbb{C}\\), then \\(u\\) is constant. (This is Liouville\'s theorem for harmonic functions.)',
                    hint: 'Use the mean value property and let the radius of the circle go to infinity, or use the connection to analytic functions.',
                    solution: 'Method 1 (via analytic functions): On the simply connected domain \\(\\mathbb{C}\\), \\(u = \\text{Re}(f)\\) for some entire function \\(f\\). Since \\(u\\) is bounded, \\(e^f\\) has bounded modulus (\\(|e^f| = e^u\\)), so \\(e^f\\) is a bounded entire function. By Liouville\'s theorem for analytic functions, \\(e^f\\) is constant, hence \\(f\\) is constant, hence \\(u\\) is constant. Method 2: Use Harnack\'s inequality on \\(D(0,R)\\): for \\(u \\geq 0\\), \\(\\frac{R-r}{R+r}u(0) \\leq u(z) \\leq \\frac{R+r}{R-r}u(0)\\). As \\(R \\to \\infty\\) with \\(r = |z|\\) fixed, both bounds approach \\(u(0)\\), so \\(u(z) = u(0)\\) for all \\(z\\).'
                }
            ]
        }
    ]
});
