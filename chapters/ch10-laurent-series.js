window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Laurent Series & Singularities',
    subtitle: 'Negative powers, singularities, and their classification',
    sections: [

        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Motivation: When Taylor Series Fail</h2>

<div class="env-block intuition">
    <div class="env-title">A Fundamental Limitation</div>
    <div class="env-body">
        <p>Taylor series represent analytic functions as power series \\(\\sum_{n=0}^{\\infty} a_n(z-z_0)^n\\) near a center \\(z_0\\). But what happens when \\(f\\) has a singularity <em>at</em> \\(z_0\\)? For example, \\(f(z) = 1/z\\) near \\(z = 0\\), or \\(f(z) = e^{1/z}\\) near the same point? Taylor series are powerless here: they require the function to be analytic <em>at</em> the center.</p>
        <p>The resolution is the <strong>Laurent series</strong>, which allows negative powers of \\((z - z_0)\\). This one extension unlocks a complete classification of isolated singularities and, ultimately, the residue theorem.</p>
    </div>
</div>

<p>Recall that a power series \\(\\sum_{n=0}^{\\infty} a_n (z - z_0)^n\\) converges in a disk \\(|z - z_0| < R\\). If \\(f\\) is analytic inside this disk (including at \\(z_0\\)), we can use Taylor's theorem. But many functions of interest are analytic in a <em>punctured disk</em> or more generally in an <strong>annulus</strong></p>

\\[
A(z_0; r, R) = \\{z \\in \\mathbb{C} : r < |z - z_0| < R\\},
\\]

<p>where \\(0 \\leq r < R \\leq \\infty\\). The inner radius \\(r > 0\\) excludes a region around \\(z_0\\) where \\(f\\) may fail to be analytic. Laurent's theorem gives us a series expansion valid in precisely such an annulus.</p>

<h3>Three Leading Examples</h3>

<p>Three functions illustrate the full range of behavior at a singularity:</p>
<ul>
    <li><strong>Removable singularity:</strong> \\(f(z) = \\dfrac{\\sin z}{z}\\). The singularity at \\(z = 0\\) is only apparent; \\(f\\) extends to an entire function.</li>
    <li><strong>Pole:</strong> \\(f(z) = \\dfrac{1}{(z-1)^2}\\). The function blows up at \\(z = 1\\), but in a controlled, algebraic way.</li>
    <li><strong>Essential singularity:</strong> \\(f(z) = e^{1/z}\\). Near \\(z = 0\\), the function oscillates wildly and takes every nonzero value infinitely often.</li>
</ul>

<p>The Laurent series will give us a unified framework to classify and understand all three.</p>

<div class="env-block remark">
    <div class="env-title">Historical Context</div>
    <div class="env-body">
        <p>Pierre Alphonse Laurent (1813–1854) presented his series expansion to the French Academy of Sciences in 1843. Cauchy had obtained similar results, but Laurent's clear formulation and proof via contour integration is the version that entered textbooks. Laurent died young at 41; his theorem is his primary mathematical legacy.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Laurent Series
        // ================================================================
        {
            id: 'sec-laurent',
            title: 'Laurent Series',
            content: `
<h2>Laurent Series</h2>

<div class="env-block theorem">
    <div class="env-title">Theorem (Laurent)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic in the annulus \\(A(z_0; r, R) = \\{z : r < |z - z_0| < R\\}\\). Then \\(f\\) has a unique representation</p>
        \\[
        f(z) = \\sum_{n=-\\infty}^{\\infty} a_n (z - z_0)^n,
        \\]
        <p>converging absolutely and uniformly on every compact subset of \\(A(z_0; r, R)\\). The coefficients are given by</p>
        \\[
        a_n = \\frac{1}{2\\pi i} \\oint_{\\gamma} \\frac{f(\\zeta)}{(\\zeta - z_0)^{n+1}} \\, d\\zeta,
        \\]
        <p>where \\(\\gamma\\) is any positively oriented simple closed contour in \\(A(z_0; r, R)\\) surrounding \\(z_0\\).</p>
    </div>
</div>

<h3>Splitting into Two Parts</h3>

<p>It is helpful to split the Laurent series into the <strong>analytic part</strong> and the <strong>principal part</strong>:</p>

\\[
f(z) = \\underbrace{\\sum_{n=0}^{\\infty} a_n (z-z_0)^n}_{\\text{analytic part}} + \\underbrace{\\sum_{n=1}^{\\infty} \\frac{a_{-n}}{(z-z_0)^n}}_{\\text{principal part}}.
\\]

<p>The analytic part converges for \\(|z - z_0| < R\\) and represents the "well-behaved" component. The principal part converges for \\(|z - z_0| > r\\) and captures the singular behavior near \\(z_0\\).</p>

<h3>Computing Laurent Series in Practice</h3>

<p>Direct use of the contour integral formula is rarely necessary. Instead, exploit known series:</p>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = e^{1/z}\\)</div>
    <div class="env-body">
        <p>Substitute \\(w = 1/z\\) into \\(e^w = \\sum_{n=0}^{\\infty} w^n / n!\\):</p>
        \\[
        e^{1/z} = \\sum_{n=0}^{\\infty} \\frac{1}{n! \\, z^n} = 1 + \\frac{1}{z} + \\frac{1}{2! z^2} + \\frac{1}{3! z^3} + \\cdots
        \\]
        <p>This converges for all \\(z \\neq 0\\), i.e., in the annulus \\(0 < |z| < \\infty\\). The principal part is the entire infinite sum \\(\\sum_{n=1}^{\\infty} 1/(n! z^n)\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = \\sin z / z^3\\)</div>
    <div class="env-body">
        <p>Use \\(\\sin z = z - z^3/3! + z^5/5! - \\cdots\\):</p>
        \\[
        \\frac{\\sin z}{z^3} = \\frac{1}{z^2} - \\frac{1}{6} + \\frac{z^2}{120} - \\cdots
        \\]
        <p>The principal part is just \\(1/z^2\\) (one term). This is a pole of order 2 at \\(z = 0\\).</p>
    </div>
</div>

<h3>Uniqueness and the Coefficient Formula</h3>

<p>Uniqueness of the Laurent expansion follows from the same argument as for Taylor series: if two Laurent series agree on an annulus, multiply both sides by \\((z - z_0)^{-n-1}\\) and integrate around a contour to isolate each coefficient. The coefficient \\(a_{-1}\\) plays a distinguished role: it is the <strong>residue</strong> of \\(f\\) at \\(z_0\\), central to the next chapter.</p>

<div class="env-block remark">
    <div class="env-title">Different Annuli, Different Series</div>
    <div class="env-body">
        <p>The same function can have different Laurent expansions in different annuli. For instance, \\(f(z) = 1/(z(z-1))\\) has one expansion valid for \\(0 < |z| < 1\\) and a different one for \\(|z| > 1\\). Each expansion is correct in its respective region of convergence.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-laurent-annulus',
                    title: 'Annulus of Convergence',
                    description: 'Drag the inner radius r and outer radius R to see the annulus in which the Laurent series converges. The center z0 can also be repositioned.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 60 });
                        var r = 0.8, R = 2.2, z0x = 0, z0y = 0;
                        var innerPt, outerPt;

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Shade annulus
                            var [sx0, sy0] = viz.toScreen(z0x, z0y);
                            // Outer disk fill
                            ctx.save();
                            ctx.beginPath();
                            ctx.arc(sx0, sy0, R * viz.scale, 0, Math.PI * 2);
                            ctx.fillStyle = viz.colors.teal + '22';
                            ctx.fill();
                            // Cut out inner disk
                            ctx.beginPath();
                            ctx.arc(sx0, sy0, r * viz.scale, 0, Math.PI * 2);
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fill();
                            ctx.restore();

                            // Outer circle
                            ctx.beginPath();
                            ctx.arc(sx0, sy0, R * viz.scale, 0, Math.PI * 2);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Inner circle
                            ctx.beginPath();
                            ctx.arc(sx0, sy0, r * viz.scale, 0, Math.PI * 2);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Radii labels
                            viz.screenText('r = ' + r.toFixed(2), sx0 + r * viz.scale * 0.5, sy0 - 10, viz.colors.orange, 12);
                            viz.screenText('R = ' + R.toFixed(2), sx0 + R * viz.scale * 0.7, sy0 + 14, viz.colors.blue, 12);

                            // Center
                            viz.drawPoint(z0x, z0y, viz.colors.white, 'z\u2080', 5);

                            // Annotations
                            viz.screenText('Laurent series converges here', viz.width / 2, 20, viz.colors.teal, 13);
                            viz.screenText('r < |z \u2212 z\u2080| < R', viz.width / 2, 38, viz.colors.white, 12);

                            // Radial segment for r
                            ctx.beginPath();
                            ctx.moveTo(sx0, sy0);
                            ctx.lineTo(sx0 + r * viz.scale, sy0);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Radial segment for R
                            ctx.beginPath();
                            ctx.moveTo(sx0, sy0);
                            ctx.lineTo(sx0 + R * viz.scale, sy0);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            viz.drawDraggables();
                        }

                        innerPt = viz.addDraggable('inner', z0x + r, z0y, viz.colors.orange, 8, function(wx, wy) {
                            r = Math.max(0.05, Math.sqrt((wx - z0x) ** 2 + (wy - z0y) ** 2));
                            if (r >= R - 0.1) r = R - 0.1;
                            draw();
                        });
                        outerPt = viz.addDraggable('outer', z0x + R, z0y, viz.colors.blue, 8, function(wx, wy) {
                            R = Math.max(r + 0.1, Math.sqrt((wx - z0x) ** 2 + (wy - z0y) ** 2));
                            draw();
                        });

                        VizEngine.createSlider(controls, 'r (inner)', 0.05, 2.5, r, 0.05, function(v) {
                            r = Math.min(v, R - 0.1);
                            innerPt.x = z0x + r; innerPt.y = z0y;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'R (outer)', 0.3, 4.0, R, 0.1, function(v) {
                            R = Math.max(v, r + 0.1);
                            outerPt.x = z0x + R; outerPt.y = z0y;
                            draw();
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-laurent-coefficients',
                    title: 'Laurent Coefficients via Contour Integral',
                    description: 'Animate the computation of a_n = (1/2\u03c0i) \u222e f(\u03b6)/(\u03b6 - z0)^{n+1} d\u03b6. Select n and watch the integrand wind around the contour.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 55 });
                        var nCoeff = -1;
                        var t = 0;
                        var R_contour = 1.5;
                        var animating = false;

                        // f(z) = e^{1/z}, Laurent coeffs: a_{-n} = 1/n!
                        function laurentCoeff(n) {
                            if (n >= 0) return 0;
                            var k = -n;
                            var fact = 1;
                            for (var i = 2; i <= k; i++) fact *= i;
                            return 1 / fact;
                        }

                        // Integrand winding number visualization
                        function drawFrame(time) {
                            viz.clear();
                            viz.drawGrid(0.5);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw contour circle
                            var [sx0, sy0] = viz.toScreen(0, 0);
                            ctx.beginPath();
                            ctx.arc(sx0, sy0, R_contour * viz.scale, 0, Math.PI * 2);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1.5;
                            ctx.stroke();

                            // Animate a point moving along the contour
                            if (animating) t = (time / 2000) % 1;
                            var angle = 2 * Math.PI * t;
                            var zx = R_contour * Math.cos(angle);
                            var zy = R_contour * Math.sin(angle);
                            var [spx, spy] = viz.toScreen(zx, zy);

                            // Show the integrand value direction as a small vector
                            // For e^{1/z} / z^{n+1}: direction of arg
                            // Compute f(zeta) * dz / zeta^{n+1} argument
                            // f = e^{1/z}: arg(e^{1/z}) ≈ -sin(theta)/r (imaginary part of 1/z)
                            var arg_f = -Math.sin(angle) / R_contour; // Im(1/z)
                            var arg_dz = angle + Math.PI / 2;
                            var arg_denom = (nCoeff + 1) * angle;
                            var total_arg = arg_f + arg_dz - arg_denom;

                            ctx.beginPath();
                            ctx.moveTo(spx, spy);
                            ctx.lineTo(spx + 20 * Math.cos(total_arg), spy - 20 * Math.sin(total_arg));
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            viz.drawPoint(zx, zy, viz.colors.yellow, null, 5);

                            // Origin marker
                            viz.drawPoint(0, 0, viz.colors.red, 'z\u2080=0', 4);

                            // Info text
                            viz.screenText('f(z) = e^{1/z}', viz.width / 2, 18, viz.colors.white, 13);
                            viz.screenText('n = ' + nCoeff, viz.width / 2, 36, viz.colors.blue, 13);
                            var exact = laurentCoeff(nCoeff);
                            viz.screenText('a_n = 1/' + (-nCoeff) + '! = ' + exact.toFixed(4), viz.width / 2, 54, viz.colors.teal, 12);
                            viz.screenText('Contour at |z| = ' + R_contour.toFixed(1), viz.width / 2, viz.height - 14, viz.colors.text, 11);

                            // Progress arc
                            ctx.beginPath();
                            ctx.arc(sx0, sy0, R_contour * viz.scale, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * t);
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 3;
                            ctx.stroke();
                        }

                        viz.animate(function(time) {
                            drawFrame(time);
                        });

                        VizEngine.createSlider(controls, 'n', -5, 3, nCoeff, 1, function(v) {
                            nCoeff = Math.round(v);
                            t = 0;
                        });
                        VizEngine.createSlider(controls, 'Contour radius', 0.3, 3.0, R_contour, 0.1, function(v) {
                            R_contour = v;
                        });

                        var btn = VizEngine.createButton(controls, 'Animate', function() {
                            animating = !animating;
                            btn.textContent = animating ? 'Pause' : 'Animate';
                        });

                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the Laurent series for \\(f(z) = \\dfrac{1}{z(z-1)}\\) in the annulus \\(0 < |z| < 1\\).',
                    hint: 'Use partial fractions: \\(\\frac{1}{z(z-1)} = \\frac{-1}{z} + \\frac{1}{z-1}\\). Then expand \\(\\frac{1}{z-1} = \\frac{-1}{1-z} = -\\sum_{n=0}^{\\infty} z^n\\) for \\(|z| < 1\\).',
                    solution: '\\[\\frac{1}{z(z-1)} = -\\frac{1}{z} - 1 - z - z^2 - z^3 - \\cdots = -\\sum_{n=-1}^{\\infty} z^n, \\quad 0 < |z| < 1.\\] The principal part is just \\(-1/z\\), so this is actually a simple pole at \\(z = 0\\).'
                },
                {
                    question: 'Find the Laurent series for \\(f(z) = \\dfrac{\\cos z}{z^2}\\) centered at \\(z = 0\\). Identify the principal part.',
                    hint: 'Use \\(\\cos z = 1 - z^2/2! + z^4/4! - \\cdots\\) and divide by \\(z^2\\).',
                    solution: '\\[\\frac{\\cos z}{z^2} = \\frac{1}{z^2} - \\frac{1}{2} + \\frac{z^2}{24} - \\frac{z^4}{720} + \\cdots\\] The principal part is \\(1/z^2\\). This is a pole of order 2 at \\(z = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Isolated Singularities
        // ================================================================
        {
            id: 'sec-singularities',
            title: 'Isolated Singularities',
            content: `
<h2>Isolated Singularities</h2>

<p>A point \\(z_0\\) is an <strong>isolated singularity</strong> of \\(f\\) if \\(f\\) is analytic in a punctured disk \\(0 < |z - z_0| < \\delta\\) but not at \\(z_0\\) itself. The Laurent series in this punctured disk exists, and its principal part determines which of three categories \\(z_0\\) falls into.</p>

<div class="env-block definition">
    <div class="env-title">Classification of Isolated Singularities</div>
    <div class="env-body">
        <p>Let \\(f\\) have an isolated singularity at \\(z_0\\) with Laurent series \\(\\sum_{n=-\\infty}^{\\infty} a_n(z-z_0)^n\\) in \\(0 < |z-z_0| < \\delta\\).</p>
        <ol>
            <li><strong>Removable singularity:</strong> All \\(a_n = 0\\) for \\(n < 0\\). The principal part is zero.</li>
            <li><strong>Pole of order \\(m\\):</strong> There exists \\(m \\geq 1\\) such that \\(a_{-m} \\neq 0\\) but \\(a_n = 0\\) for all \\(n < -m\\). The principal part is a finite sum \\(a_{-m}/(z-z_0)^m + \\cdots + a_{-1}/(z-z_0)\\).</li>
            <li><strong>Essential singularity:</strong> Infinitely many \\(a_n \\neq 0\\) for \\(n < 0\\). The principal part is an infinite series.</li>
        </ol>
    </div>
</div>

<p>This trichotomy is exhaustive: every isolated singularity is exactly one of these three types. The behavior of \\(f(z)\\) as \\(z \\to z_0\\) differs dramatically across the three cases.</p>

<table style="width:100%;border-collapse:collapse;margin:1em 0;font-size:0.9em;">
    <thead>
        <tr style="border-bottom:1px solid #30363d;">
            <th style="padding:6px;text-align:left;">Type</th>
            <th style="padding:6px;text-align:left;">Principal Part</th>
            <th style="padding:6px;text-align:left;">\\(|f(z)|\\) as \\(z \\to z_0\\)</th>
            <th style="padding:6px;text-align:left;">Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding:6px;">Removable</td>
            <td style="padding:6px;">None (zero)</td>
            <td style="padding:6px;">Finite limit</td>
            <td style="padding:6px;">\\(\\sin z / z\\)</td>
        </tr>
        <tr style="background:#1a1a40;">
            <td style="padding:6px;">Pole of order \\(m\\)</td>
            <td style="padding:6px;">Finite, \\(m\\) terms</td>
            <td style="padding:6px;">\\(\\to \\infty\\)</td>
            <td style="padding:6px;">\\(1/z^m\\)</td>
        </tr>
        <tr>
            <td style="padding:6px;">Essential</td>
            <td style="padding:6px;">Infinite</td>
            <td style="padding:6px;">No limit (oscillates wildly)</td>
            <td style="padding:6px;">\\(e^{1/z}\\)</td>
        </tr>
    </tbody>
</table>

<h3>Non-isolated Singularities</h3>

<p>Not every singularity is isolated. For example, \\(f(z) = 1/\\sin(1/z)\\) has singularities at \\(z = 1/(n\\pi)\\) for all integers \\(n \\neq 0\\), which accumulate at \\(z = 0\\). The point \\(z = 0\\) is then a non-isolated singularity (also called a cluster point of singularities). Laurent series theory does not apply at such points.</p>
`,
            visualizations: [
                {
                    id: 'viz-singularity-zoo',
                    title: 'Singularity Zoo: Domain Coloring Gallery',
                    description: 'Domain coloring of three prototypical singularities. Hue encodes argument, brightness encodes modulus. Select a function to see the singularity type.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420 });
                        var mode = 0;
                        var range = 2.5;

                        var functions = [
                            {
                                name: 'sin(z)/z  (removable)',
                                color: '#3fb9a0',
                                f: function(re, im) {
                                    // sin(z)/z: sin(x+iy) = sin x cosh y + i cos x sinh y
                                    var sinRe = Math.sin(re) * Math.cosh(im);
                                    var sinIm = Math.cos(re) * Math.sinh(im);
                                    var r2 = re * re + im * im;
                                    if (r2 < 1e-12) return [1, 0]; // removable: limit = 1
                                    return [sinRe / r2 * re + sinIm / r2 * im, (sinIm * re - sinRe * im) / r2];
                                }
                            },
                            {
                                name: '1/z\u00b2  (pole order 2)',
                                color: '#58a6ff',
                                f: function(re, im) {
                                    // 1/z^2
                                    var r2 = re * re + im * im;
                                    if (r2 < 1e-12) return [1e6, 0];
                                    // 1/z^2 = (re - i*im)^2 / (re^2+im^2)^2
                                    var num_re = re * re - im * im;
                                    var num_im = -2 * re * im;
                                    return [num_re / (r2 * r2), num_im / (r2 * r2)];
                                }
                            },
                            {
                                name: 'e^{1/z}  (essential)',
                                color: '#f0883e',
                                f: function(re, im) {
                                    // e^{1/z}: 1/z = re/(re^2+im^2) - i*im/(re^2+im^2)
                                    var r2 = re * re + im * im;
                                    if (r2 < 1e-12) return [1e6, 0];
                                    var invRe = re / r2;
                                    var invIm = -im / r2;
                                    // e^{a+ib} = e^a * (cos b + i sin b)
                                    var mag = Math.exp(invRe);
                                    if (!isFinite(mag) || mag > 1e8) mag = 1e8;
                                    return [mag * Math.cos(invIm), mag * Math.sin(invIm)];
                                }
                            }
                        ];

                        function drawColoring() {
                            var fn = functions[mode];
                            viz.clear();
                            viz.drawDomainColoring(fn.f, [-range, range], [-range * viz.height / viz.width, range * viz.height / viz.width]);
                            // Overlay axes
                            var ctx = viz.ctx;
                            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.height / 2); ctx.lineTo(viz.width, viz.height / 2); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.width / 2, 0); ctx.lineTo(viz.width / 2, viz.height); ctx.stroke();
                            // Label
                            ctx.fillStyle = 'rgba(0,0,0,0.6)';
                            ctx.fillRect(0, 0, viz.width, 38);
                            viz.screenText(fn.name, viz.width / 2, 13, fn.color, 14);
                            viz.screenText('Singularity at z = 0   (range: \u00b1' + range.toFixed(1) + ')', viz.width / 2, 28, '#c9d1d9', 11);
                        }

                        var btns = [];
                        functions.forEach(function(fn, i) {
                            var b = VizEngine.createButton(controls, fn.name, function() {
                                mode = i;
                                drawColoring();
                            });
                            b.style.marginRight = '6px';
                            btns.push(b);
                        });

                        VizEngine.createSlider(controls, 'View range', 0.5, 5.0, range, 0.1, function(v) {
                            range = v;
                            drawColoring();
                        });

                        drawColoring();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Classify the singularities of \\(f(z) = \\dfrac{e^z - 1}{z^3}\\) at \\(z = 0\\).',
                    hint: 'Expand \\(e^z - 1 = z + z^2/2 + z^3/6 + \\cdots\\) and divide by \\(z^3\\).',
                    solution: '\\[\\frac{e^z-1}{z^3} = \\frac{1}{z^2} + \\frac{1}{2z} + \\frac{1}{6} + \\frac{z}{24} + \\cdots\\] The principal part is \\(1/z^2 + 1/(2z)\\), with the most negative power being \\(-2\\). So \\(z = 0\\) is a <strong>pole of order 2</strong>.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Removable Singularities
        // ================================================================
        {
            id: 'sec-removable',
            title: 'Removable Singularities',
            content: `
<h2>Removable Singularities</h2>

<p>A removable singularity is the most benign type: the singularity exists only because we have not (or cannot directly) define the function at a point, but any definition consistent with continuity makes \\(f\\) analytic there.</p>

<div class="env-block theorem">
    <div class="env-title">Riemann's Theorem on Removable Singularities</div>
    <div class="env-body">
        <p>Suppose \\(f\\) is analytic in the punctured disk \\(0 < |z - z_0| < \\delta\\). The following are equivalent:</p>
        <ol>
            <li>\\(z_0\\) is a removable singularity of \\(f\\).</li>
            <li>\\(\\displaystyle\\lim_{z \\to z_0} f(z)\\) exists (and is finite).</li>
            <li>\\(f\\) is bounded in some punctured disk \\(0 < |z - z_0| < \\varepsilon\\).</li>
            <li>\\(\\displaystyle\\lim_{z \\to z_0} (z - z_0) f(z) = 0\\).</li>
        </ol>
        <p>When these hold, defining \\(f(z_0) = \\lim_{z \\to z_0} f(z)\\) extends \\(f\\) to an analytic function on the full disk \\(|z - z_0| < \\delta\\).</p>
    </div>
</div>

<h3>Canonical Example: \\(\\sin z / z\\)</h3>

<p>The function \\(f(z) = \\sin z / z\\) is not defined at \\(z = 0\\), but its Laurent series is</p>

\\[
\\frac{\\sin z}{z} = 1 - \\frac{z^2}{6} + \\frac{z^4}{120} - \\cdots = \\sum_{n=0}^{\\infty} \\frac{(-1)^n z^{2n}}{(2n+1)!}.
\\]

<p>There are no negative powers, confirming the singularity is removable. Setting \\(f(0) = 1\\) gives an entire function.</p>

<h3>Why Boundedness Is Key</h3>

<p>Riemann's theorem says bounded + isolated singularity = removable. Intuitively: a pole forces \\(|f(z)| \\to \\infty\\), and an essential singularity forces \\(f\\) to take arbitrarily large values. Only a removable singularity is compatible with \\(f\\) staying bounded near \\(z_0\\).</p>

<div class="env-block example">
    <div class="env-title">Example: A Deceptive Singularity</div>
    <div class="env-body">
        <p>Define \\(f(z) = (z^2 - 1)/(z - 1)\\) for \\(z \\neq 1\\). Algebraically, \\(f(z) = z + 1\\), which is entire. The point \\(z = 1\\) looks like a singularity (denominator vanishes) but is actually removable: \\(\\lim_{z \\to 1} f(z) = 2\\). Setting \\(f(1) = 2\\) makes \\(f\\) analytic everywhere.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Riemann's Theorem in Higher Dimensions</div>
    <div class="env-body">
        <p>Riemann's theorem has a striking contrast with real analysis: a bounded real function with a single bad point need not be extendable continuously (e.g., \\(\\sin(1/x)\\) near \\(x=0\\)). In complex analysis, boundedness forces the extension to be not just continuous but analytic. This reflects the much stronger constraints that analyticity places on a function.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-removable-demo',
                    title: 'sin(z)/z: The Removable Singularity',
                    description: 'Domain coloring of sin(z)/z. Near z = 0 the color pattern looks smooth because the singularity is removable. Compare with the pole and essential singularity.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420 });
                        var range = 3.0;

                        function sincf(re, im) {
                            var r2 = re * re + im * im;
                            if (r2 < 1e-14) return [1, 0];
                            var sinRe = Math.sin(re) * Math.cosh(im);
                            var sinIm = Math.cos(re) * Math.sinh(im);
                            // (sinRe + i sinIm) / (re + i im) = [(sinRe*re + sinIm*im) + i(sinIm*re - sinRe*im)] / r2
                            return [(sinRe * re + sinIm * im) / r2, (sinIm * re - sinRe * im) / r2];
                        }

                        function draw() {
                            viz.clear();
                            var h = range * viz.height / viz.width;
                            viz.drawDomainColoring(sincf, [-range, range], [-h, h]);
                            var ctx = viz.ctx;
                            // Axis overlay
                            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.height / 2); ctx.lineTo(viz.width, viz.height / 2); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.width / 2, 0); ctx.lineTo(viz.width / 2, viz.height); ctx.stroke();
                            // Header
                            ctx.fillStyle = 'rgba(0,0,0,0.65)';
                            ctx.fillRect(0, 0, viz.width, 42);
                            viz.screenText('f(z) = sin(z)/z', viz.width / 2, 13, '#3fb9a0', 14);
                            viz.screenText('The "hole" at z = 0 is removable: coloring looks smooth there', viz.width / 2, 29, '#c9d1d9', 11);
                            // Circle around origin
                            ctx.beginPath();
                            ctx.arc(viz.width / 2, viz.height / 2, 14, 0, Math.PI * 2);
                            ctx.strokeStyle = '#ffffff55';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 3]);
                            ctx.stroke();
                            ctx.setLineDash([]);
                        }

                        VizEngine.createSlider(controls, 'View range', 1.0, 6.0, range, 0.1, function(v) {
                            range = v;
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Is the singularity of \\(f(z) = \\dfrac{z^2 + z - 2}{z - 1}\\) at \\(z = 1\\) removable? If so, what value should \\(f(1)\\) take?',
                    hint: 'Factor the numerator.',
                    solution: 'Factor: \\(z^2 + z - 2 = (z-1)(z+2)\\). So \\(f(z) = z + 2\\) for \\(z \\neq 1\\). The limit as \\(z \\to 1\\) is \\(3\\), so setting \\(f(1) = 3\\) makes \\(f\\) analytic (in fact, entire).'
                },
                {
                    question: 'Suppose \\(f\\) is analytic in \\(0 < |z| < 1\\) and \\(|f(z)| \\leq M|z|^{1/2}\\) for some constant \\(M\\). Is \\(z = 0\\) a removable singularity?',
                    hint: 'Check whether \\((z - 0)f(z) \\to 0\\) as \\(z \\to 0\\).',
                    solution: '\\(|z \\cdot f(z)| \\leq M|z|^{3/2} \\to 0\\) as \\(z \\to 0\\). By Riemann\'s theorem (criterion 4: \\(zf(z) \\to 0\\)), the singularity is removable.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Poles
        // ================================================================
        {
            id: 'sec-poles',
            title: 'Poles',
            content: `
<h2>Poles</h2>

<p>A pole of order \\(m\\) is the next most structured type of singularity after removable. Near a pole, the function blows up at an algebraic rate, and the behavior is entirely captured by a finite principal part.</p>

<div class="env-block definition">
    <div class="env-title">Equivalent Characterizations of a Pole of Order \\(m\\)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic in \\(0 < |z - z_0| < \\delta\\). The following are equivalent:</p>
        <ol>
            <li>\\(z_0\\) is a pole of order \\(m\\).</li>
            <li>\\(\\displaystyle\\lim_{z \\to z_0} (z-z_0)^m f(z) = A \\neq 0\\) (finite, nonzero).</li>
            <li>\\(f(z) = g(z)/(z-z_0)^m\\) where \\(g\\) is analytic at \\(z_0\\) and \\(g(z_0) \\neq 0\\).</li>
            <li>\\(h(z) = 1/f(z)\\) has a zero of order \\(m\\) at \\(z_0\\).</li>
        </ol>
    </div>
</div>

<h3>Principal Part and Partial Fractions</h3>

<p>A function with a pole of order \\(m\\) at \\(z_0\\) can be written</p>

\\[
f(z) = \\underbrace{\\frac{a_{-m}}{(z-z_0)^m} + \\cdots + \\frac{a_{-1}}{z-z_0}}_{\\text{principal part}} + \\underbrace{a_0 + a_1(z-z_0) + \\cdots}_{\\text{analytic part}}.
\\]

<p>For rational functions, the partial fraction decomposition decomposes \\(f\\) into a sum of principal parts at each pole. Each \\(1/(z - z_k)^j\\) term contributes a pole of order \\(j\\) at \\(z_k\\).</p>

<div class="env-block example">
    <div class="env-title">Example: Simple Pole</div>
    <div class="env-body">
        <p>\\(f(z) = 1/(z^2 - 1) = 1/((z-1)(z+1))\\). Partial fractions give</p>
        \\[
        f(z) = \\frac{1/2}{z-1} - \\frac{1/2}{z+1}.
        \\]
        <p>So \\(f\\) has simple poles (order 1) at \\(z = \\pm 1\\) with residues \\(a_{-1} = 1/2\\) and \\(-1/2\\) respectively.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Higher Order Pole</div>
    <div class="env-body">
        <p>\\(f(z) = (z+1)/(z-2)^3\\) has a pole of order 3 at \\(z = 2\\). Near \\(z = 2\\), write \\(z = 2 + w\\):</p>
        \\[
        f(z) = \\frac{w + 3}{w^3} = \\frac{3}{w^3} + \\frac{1}{w^2} = \\frac{3}{(z-2)^3} + \\frac{1}{(z-2)^2}.
        \\]
        <p>The residue (coefficient of \\(1/(z-2)\\)) is \\(a_{-1} = 0\\).</p>
    </div>
</div>

<h3>Order of a Pole from the Denominator</h3>

<p>For rational functions \\(P(z)/Q(z)\\) where \\(P(z_0) \\neq 0\\) and \\(Q\\) has a zero of order \\(m\\) at \\(z_0\\), the pole has order \\(m\\).</p>

<div class="env-block remark">
    <div class="env-title">Poles on the Riemann Sphere</div>
    <div class="env-body">
        <p>On the Riemann sphere \\(\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}\\), a pole is not a "bad" point but rather the point where \\(f\\) takes the value \\(\\infty\\). A meromorphic function on \\(\\hat{\\mathbb{C}}\\) is simply a rational function. From this perspective, poles are just zeros of \\(1/f\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-pole-order',
                    title: 'Pole Order Comparison',
                    description: 'Domain coloring of 1/z, 1/z\u00b2, 1/z\u00b3. Higher order poles cause colors to wind faster around the singularity. Select the order to compare.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420 });
                        var order = 1;
                        var range = 2.0;

                        function poleF(re, im, m) {
                            // 1/z^m
                            var r2 = re * re + im * im;
                            if (r2 < 1e-14) return [1e8, 0];
                            // 1/z = conj(z)/|z|^2
                            var invRe = re / r2;
                            var invIm = -im / r2;
                            // Now raise to power m by repeated multiplication
                            var rRe = 1, rIm = 0;
                            for (var k = 0; k < m; k++) {
                                var newRe = rRe * invRe - rIm * invIm;
                                var newIm = rRe * invIm + rIm * invRe;
                                rRe = newRe; rIm = newIm;
                            }
                            return [rRe, rIm];
                        }

                        function draw() {
                            viz.clear();
                            var h = range * viz.height / viz.width;
                            viz.drawDomainColoring(
                                function(re, im) { return poleF(re, im, order); },
                                [-range, range], [-h, h]
                            );
                            var ctx = viz.ctx;
                            ctx.strokeStyle = 'rgba(255,255,255,0.25)';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.height / 2); ctx.lineTo(viz.width, viz.height / 2); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.width / 2, 0); ctx.lineTo(viz.width / 2, viz.height); ctx.stroke();
                            ctx.fillStyle = 'rgba(0,0,0,0.65)';
                            ctx.fillRect(0, 0, viz.width, 42);
                            viz.screenText('f(z) = 1/z^' + order + '  (pole of order ' + order + ' at z = 0)', viz.width / 2, 13, '#58a6ff', 14);
                            viz.screenText('Colors wind around origin ' + order + ' time' + (order > 1 ? 's' : '') + ' per loop', viz.width / 2, 29, '#c9d1d9', 11);
                        }

                        VizEngine.createSlider(controls, 'Pole order m', 1, 5, order, 1, function(v) {
                            order = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'View range', 0.5, 4.0, range, 0.1, function(v) {
                            range = v;
                            draw();
                        });

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-partial-fractions',
                    title: 'Partial Fraction Decomposition',
                    description: 'Visualize a rational function as a sum of principal parts. Each pole contributes one term. Toggle individual terms on/off to see how they combine.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420 });
                        // f(z) = z / ((z-1)(z+1)(z-2i)) -- three poles
                        // Partial fractions: A/(z-1) + B/(z+1) + C/(z-2i)
                        var showFull = true, showTerm1 = false, showTerm2 = false, showTerm3 = false;
                        var range = 3.0;

                        // Compute complex multiply, divide
                        function cmul(a, b) { return [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]]; }
                        function cadd(a, b) { return [a[0]+b[0], a[1]+b[1]]; }
                        function cdiv(a, b) {
                            var d = b[0]*b[0]+b[1]*b[1];
                            if (d < 1e-14) return [1e8, 0];
                            return [(a[0]*b[0]+a[1]*b[1])/d, (a[1]*b[0]-a[0]*b[1])/d];
                        }

                        // f(z) = z / ((z-1)(z+1)(z-2i))
                        function fullF(re, im) {
                            var z = [re, im];
                            var num = z;
                            var d1 = [re-1, im], d2 = [re+1, im], d3 = [re, im-2];
                            return cdiv(num, cmul(d1, cmul(d2, d3)));
                        }
                        // A/(z-1): A = z0 / ((z0+1)(z0-2i)) at z0=1 => 1/(2*(1-2i))
                        function term1F(re, im) {
                            var A = cdiv([1,0], cmul([2,0],[1,-2]));
                            return cdiv(A, [re-1, im]);
                        }
                        // B/(z+1): B = z0/((z0-1)(z0-2i)) at z0=-1 => -1/((-2)(-1-2i)) = 1/(2(-1-2i))?
                        // B = (-1)/((-2)(-1-2i)) = (-1)/(2+4i)
                        function term2F(re, im) {
                            var B = cdiv([-1,0], cmul([-2,0],[-1,-2]));
                            return cdiv(B, [re+1, im]);
                        }
                        // C/(z-2i): C = z0/((z0-1)(z0+1)) at z0=2i => 2i/((2i-1)(2i+1)) = 2i/(4i^2-1) = 2i/(-5)
                        function term3F(re, im) {
                            var C = cdiv([0,2], [(-5),0]);
                            return cdiv(C, [re, im-2]);
                        }

                        function draw() {
                            viz.clear();
                            var h = range * viz.height / viz.width;
                            var fn;
                            if (showTerm1) fn = term1F;
                            else if (showTerm2) fn = term2F;
                            else if (showTerm3) fn = term3F;
                            else fn = fullF;
                            viz.drawDomainColoring(fn, [-range, range], [-h, h]);
                            var ctx = viz.ctx;
                            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.height/2); ctx.lineTo(viz.width, viz.height/2); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.width/2, 0); ctx.lineTo(viz.width/2, viz.height); ctx.stroke();
                            ctx.fillStyle = 'rgba(0,0,0,0.65)';
                            ctx.fillRect(0,0,viz.width,42);
                            var label = showTerm1 ? 'A/(z-1)' : showTerm2 ? 'B/(z+1)' : showTerm3 ? 'C/(z-2i)' : 'z / [(z-1)(z+1)(z-2i)]';
                            viz.screenText(label, viz.width/2, 13, '#bc8cff', 13);
                            viz.screenText('Poles at z = 1, -1, 2i', viz.width/2, 29, '#c9d1d9', 11);
                        }

                        VizEngine.createButton(controls, 'Full f(z)', function() { showFull=true; showTerm1=showTerm2=showTerm3=false; draw(); });
                        VizEngine.createButton(controls, 'A/(z-1)', function() { showTerm1=true; showFull=showTerm2=showTerm3=false; draw(); });
                        VizEngine.createButton(controls, 'B/(z+1)', function() { showTerm2=true; showFull=showTerm1=showTerm3=false; draw(); });
                        VizEngine.createButton(controls, 'C/(z-2i)', function() { showTerm3=true; showFull=showTerm1=showTerm2=false; draw(); });
                        VizEngine.createSlider(controls, 'View range', 1.0, 5.0, range, 0.1, function(v) { range=v; draw(); });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find all poles and their orders for \\(f(z) = \\dfrac{z^2}{(z-i)^3(z^2+1)}\\).',
                    hint: 'Factor the denominator completely over \\(\\mathbb{C}\\). Note \\(z^2 + 1 = (z-i)(z+i)\\).',
                    solution: '\\(z^2 + 1 = (z-i)(z+i)\\), so \\(f(z) = z^2 / [(z-i)^4(z+i)]\\). Poles: \\(z = i\\) of order 4, and \\(z = -i\\) of order 1 (simple pole).'
                },
                {
                    question: 'Compute the partial fraction decomposition of \\(f(z) = \\dfrac{1}{z^2(z-1)}\\) and identify the residue at each pole.',
                    hint: 'Write \\(f(z) = A/z + B/z^2 + C/(z-1)\\) and solve for \\(A, B, C\\).',
                    solution: '\\(1 = Az(z-1) + B(z-1) + Cz^2\\). At \\(z=0\\): \\(B = -1\\). At \\(z=1\\): \\(C = 1\\). Comparing \\(z^2\\) coefficients: \\(A + C = 0\\), so \\(A = -1\\). Thus \\(f = -1/z - 1/z^2 + 1/(z-1)\\). Residues: \\(\\text{Res}(f, 0) = -1\\), \\(\\text{Res}(f, 1) = 1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Essential Singularities
        // ================================================================
        {
            id: 'sec-essential',
            title: 'Essential Singularities',
            content: `
<h2>Essential Singularities</h2>

<p>Essential singularities exhibit behavior that is qualitatively far more chaotic than poles. Near an essential singularity, a function comes arbitrarily close to every complex value.</p>

<div class="env-block theorem">
    <div class="env-title">Casorati-Weierstrass Theorem</div>
    <div class="env-body">
        <p>If \\(f\\) has an essential singularity at \\(z_0\\), then for every \\(w_0 \\in \\mathbb{C}\\) and every \\(\\varepsilon, \\delta > 0\\),</p>
        \\[
        f(\\{0 < |z - z_0| < \\delta\\}) \\cap \\{|w - w_0| < \\varepsilon\\} \\neq \\emptyset.
        \\]
        <p>In other words, \\(f\\) is <strong>dense</strong> in \\(\\mathbb{C}\\) on every punctured neighborhood of \\(z_0\\).</p>
    </div>
</div>

<p>Casorati-Weierstrass says the image is <em>dense</em>. Picard's theorem, much harder to prove, says something dramatically stronger.</p>

<div class="env-block theorem">
    <div class="env-title">Picard's Great Theorem (stated)</div>
    <div class="env-body">
        <p>If \\(f\\) has an essential singularity at \\(z_0\\), then in every punctured neighborhood of \\(z_0\\), \\(f\\) takes every value in \\(\\mathbb{C}\\) infinitely often, with at most one exception.</p>
    </div>
</div>

<p>For \\(e^{1/z}\\) near \\(z = 0\\): the exceptional value is \\(w = 0\\) (since \\(e^{1/z} \\neq 0\\) for any \\(z\\)). Every other nonzero complex number is taken infinitely often.</p>

<h3>The Laurent Series of an Essential Singularity</h3>

<p>The prototypical essential singularity \\(e^{1/z}\\) has Laurent series with infinitely many negative powers:</p>

\\[
e^{1/z} = \\sum_{n=0}^{\\infty} \\frac{1}{n! \\, z^n} = 1 + z^{-1} + \\frac{1}{2} z^{-2} + \\frac{1}{6} z^{-3} + \\cdots
\\]

<p>There is no "leading negative power," i.e., no finite \\(m\\) such that \\(z^m f(z)\\) is bounded near \\(z = 0\\). The behavior of \\(|f(z)|\\) as \\(z \\to z_0\\) is neither bounded (ruling out removable) nor tending to \\(\\infty\\) (ruling out a pole): it oscillates without limit.</p>

<h3>Contrast with Poles</h3>

<p>For a pole of order \\(m\\): \\(|f(z)| \\sim |a_{-m}|/|z-z_0|^m \\to \\infty\\) in a uniform, directionally independent way. For an essential singularity, the behavior depends radically on the direction of approach. For \\(e^{1/z}\\):</p>
<ul>
    <li>Along the positive real axis (\\(z = x > 0, x \\to 0\\)): \\(e^{1/x} \\to +\\infty\\).</li>
    <li>Along the negative real axis (\\(z = -x < 0, x \\to 0^+\\)): \\(e^{-1/x} \\to 0\\).</li>
    <li>Along the imaginary axis (\\(z = iy\\)): \\(e^{-i/y}\\) has modulus 1 but argument oscillating through all values.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">Proof Sketch of Casorati-Weierstrass</div>
    <div class="env-body">
        <p>Suppose for contradiction that \\(f\\) avoids a disk \\(|w - w_0| < \\varepsilon\\) near \\(z_0\\). Then \\(g(z) = 1/(f(z) - w_0)\\) is analytic and bounded near \\(z_0\\), so \\(z_0\\) is a removable singularity of \\(g\\). If \\(g(z_0) \\neq 0\\), then \\(f(z) = w_0 + 1/g(z)\\) is analytic at \\(z_0\\), contradicting \\(z_0\\) being a singularity of \\(f\\). If \\(g(z_0) = 0\\), then \\(1/g(z)\\) has a pole at \\(z_0\\), so \\(f\\) has a pole, contradicting the assumption that it is an essential singularity.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-essential-picard',
                    title: 'e^{1/z} Near 0: Every Color Infinitely Often',
                    description: 'Domain coloring of e^{1/z} near z = 0. Picard\'s theorem says every color (i.e., every value) appears infinitely often in every neighborhood of the origin. Zoom in to see the pattern repeat at smaller scales.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420 });
                        var range = 1.5;
                        var zoomLevel = 0;

                        function expInvZ(re, im) {
                            var r2 = re * re + im * im;
                            if (r2 < 1e-14) return [1e8, 0];
                            var invRe = re / r2, invIm = -im / r2;
                            var mag = Math.exp(invRe);
                            if (!isFinite(mag) || mag > 1e9) mag = 1e9;
                            if (mag < 1e-9) mag = 1e-9;
                            return [mag * Math.cos(invIm), mag * Math.sin(invIm)];
                        }

                        function draw() {
                            viz.clear();
                            var r = range * Math.pow(0.2, zoomLevel);
                            var h = r * viz.height / viz.width;
                            viz.drawDomainColoring(expInvZ, [-r, r], [-h, h]);
                            var ctx = viz.ctx;
                            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(0, viz.height/2); ctx.lineTo(viz.width, viz.height/2); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(viz.width/2, 0); ctx.lineTo(viz.width/2, viz.height); ctx.stroke();
                            ctx.fillStyle = 'rgba(0,0,0,0.65)';
                            ctx.fillRect(0,0,viz.width,50);
                            viz.screenText('f(z) = e^{1/z}  (essential singularity at z = 0)', viz.width/2, 13, '#f0883e', 13);
                            viz.screenText('Range: \u00b1' + r.toFixed(4) + '   Zoom level: ' + zoomLevel, viz.width/2, 29, '#c9d1d9', 11);
                            viz.screenText('Picard: every nonzero value taken \u221e often near origin', viz.width/2, 43, '#8b949e', 10);
                        }

                        VizEngine.createSlider(controls, 'Zoom (closer to 0)', 0, 4, zoomLevel, 1, function(v) {
                            zoomLevel = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Base range', 0.3, 3.0, range, 0.1, function(v) {
                            range = v;
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Classify the singularity of \\(f(z) = \\sin(1/z)\\) at \\(z = 0\\) and verify using the Laurent series.',
                    hint: 'Substitute \\(w = 1/z\\) into the Taylor series for \\(\\sin w\\).',
                    solution: '\\(\\sin(1/z) = \\sum_{n=0}^{\\infty} (-1)^n / ((2n+1)! z^{2n+1})\\). The principal part has infinitely many terms (all odd negative powers), so \\(z = 0\\) is an <strong>essential singularity</strong>. Alternatively: \\(\\sin(1/z) \\to 0\\) along \\(z = 1/(n\\pi)\\) as \\(n \\to \\infty\\), but \\(\\sin(1/z) \\to \\pm 1\\) along other sequences, so there is no limit and no consistent blow-up rate.'
                },
                {
                    question: 'Prove directly (not using Casorati-Weierstrass) that \\(e^{1/z}\\) takes every nonzero value in every punctured disk \\(0 < |z| < \\delta\\).',
                    hint: 'Given \\(w_0 \\neq 0\\), you need to solve \\(e^{1/z} = w_0\\) with \\(|z| < \\delta\\).',
                    solution: 'Solve \\(e^{1/z} = w_0\\): \\(1/z = \\log w_0 + 2\\pi i k\\) for any integer \\(k\\). So \\(z_k = 1/(\\log w_0 + 2\\pi i k)\\). As \\(k \\to \\infty\\), \\(|z_k| \\to 0\\). For any \\(\\delta > 0\\), choose \\(|k|\\) large enough so that \\(|z_k| < \\delta\\). This gives infinitely many solutions inside any punctured disk, confirming Picard\'s theorem for this function.'
                }
            ]
        },

        // ================================================================
        // SECTION 7: The Residue
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'The Residue',
            content: `
<h2>The Residue: Bridge to Integration</h2>

<p>The entire machinery of Laurent series culminates in a single coefficient that encodes the key information about a singularity for integration purposes.</p>

<div class="env-block definition">
    <div class="env-title">Definition: Residue</div>
    <div class="env-body">
        <p>Let \\(f\\) have an isolated singularity at \\(z_0\\) with Laurent series \\(\\sum_{n=-\\infty}^{\\infty} a_n (z-z_0)^n\\). The <strong>residue</strong> of \\(f\\) at \\(z_0\\) is</p>
        \\[
        \\operatorname{Res}(f, z_0) = a_{-1}.
        \\]
        <p>Equivalently,</p>
        \\[
        \\operatorname{Res}(f, z_0) = \\frac{1}{2\\pi i} \\oint_{\\gamma} f(z) \\, dz,
        \\]
        <p>where \\(\\gamma\\) is any small positively oriented simple closed contour encircling \\(z_0\\) and no other singularities.</p>
    </div>
</div>

<h3>Why \\(a_{-1}\\) Is Special</h3>

<p>When we integrate the Laurent series term by term around a circle \\(|z - z_0| = r\\), every term \\(a_n (z-z_0)^n\\) with \\(n \\neq -1\\) integrates to zero (it has an antiderivative \\(a_n(z-z_0)^{n+1}/(n+1)\\)). Only the \\(n = -1\\) term contributes:</p>

\\[
\\oint_{|z-z_0|=r} \\frac{a_{-1}}{z - z_0} \\, dz = a_{-1} \\cdot 2\\pi i.
\\]

<p>So the contour integral of \\(f\\) around \\(z_0\\) is determined entirely by \\(a_{-1} = \\operatorname{Res}(f, z_0)\\).</p>

<h3>Computing Residues</h3>

<p><strong>Simple pole (order 1):</strong></p>
\\[
\\operatorname{Res}(f, z_0) = \\lim_{z \\to z_0} (z - z_0) f(z).
\\]

<p><strong>Pole of order \\(m\\):</strong></p>
\\[
\\operatorname{Res}(f, z_0) = \\frac{1}{(m-1)!} \\lim_{z \\to z_0} \\frac{d^{m-1}}{dz^{m-1}} \\left[ (z - z_0)^m f(z) \\right].
\\]

<p><strong>Simple pole of \\(P(z)/Q(z)\\) where \\(Q(z_0) = 0\\), \\(Q'(z_0) \\neq 0\\), \\(P(z_0) \\neq 0\\):</strong></p>
\\[
\\operatorname{Res}\\left(\\frac{P}{Q}, z_0\\right) = \\frac{P(z_0)}{Q'(z_0)}.
\\]

<div class="env-block example">
    <div class="env-title">Examples</div>
    <div class="env-body">
        <p>(i) \\(f(z) = e^z / z^2\\): pole of order 2 at \\(z = 0\\). Residue \\(= \\frac{d}{dz}[z^2 \\cdot e^z/z^2]\\big|_{z=0} = e^0 = 1\\).</p>
        <p>(ii) \\(f(z) = 1/(z^2 + 1)\\): simple poles at \\(\\pm i\\). At \\(z = i\\): \\(\\operatorname{Res} = 1/(2i) = -i/2\\).</p>
        <p>(iii) \\(f(z) = e^{1/z}\\): essential singularity at \\(z = 0\\). From the Laurent series, \\(a_{-1} = 1\\), so \\(\\operatorname{Res}(e^{1/z}, 0) = 1\\).</p>
    </div>
</div>

<h3>Preview: The Residue Theorem</h3>

<p>The Residue Theorem (Chapter 11) generalizes Cauchy's theorem to functions with poles inside a contour:</p>

\\[
\\oint_{\\gamma} f(z) \\, dz = 2\\pi i \\sum_{k} \\operatorname{Res}(f, z_k),
\\]

<p>where the sum is over all isolated singularities \\(z_k\\) inside \\(\\gamma\\). This single formula evaluates an enormous class of definite integrals, both complex and real, and is the payoff for everything built in this chapter.</p>

<div class="env-block remark">
    <div class="env-title">Residues at Essential Singularities</div>
    <div class="env-body">
        <p>The residue formula \\(a_{-1}\\) applies at all isolated singularities, including essential ones. The residue of \\(e^{1/z}\\) at \\(z = 0\\) is \\(1\\) (the coefficient of \\(1/z\\) in its Laurent expansion). There is no difficulty in computing \\(a_{-1}\\); the difficulty with essential singularities lies elsewhere (their wild behavior, lack of algebraic shortcuts for other coefficients). The residue itself is perfectly well-defined.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Compute \\(\\operatorname{Res}\\left(\\dfrac{z}{(z-1)^2(z+2)}, 1\\right)\\) and \\(\\operatorname{Res}\\left(\\dfrac{z}{(z-1)^2(z+2)}, -2\\right)\\).',
                    hint: 'At \\(z=1\\) (order 2 pole): differentiate \\((z-1)^2 f(z)\\). At \\(z=-2\\) (simple pole): use the limit formula.',
                    solution: 'At \\(z = 1\\): \\((z-1)^2 f = z/(z+2)\\). Differentiate: \\(d/dz[z/(z+2)] = 2/(z+2)^2\\). Evaluate at \\(z=1\\): \\(2/9\\). So \\(\\operatorname{Res}(f, 1) = 2/9\\).\n\nAt \\(z = -2\\): \\(\\operatorname{Res} = \\lim_{z\\to-2}(z+2)f(z) = (-2)/((-3)^2) = -2/9\\).'
                },
                {
                    question: 'Use the Laurent series of \\(\\dfrac{1}{\\sin z}\\) near \\(z = 0\\) to find its residue there.',
                    hint: 'Write \\(\\sin z = z - z^3/6 + \\cdots = z(1 - z^2/6 + \\cdots)\\). Then \\(1/\\sin z = (1/z)(1 + z^2/6 + \\cdots)\\).',
                    solution: '\\[\\frac{1}{\\sin z} = \\frac{1}{z(1 - z^2/6 + \\cdots)} = \\frac{1}{z}\\cdot\\frac{1}{1 - z^2/6 + \\cdots} = \\frac{1}{z}(1 + z^2/6 + \\cdots) = \\frac{1}{z} + \\frac{z}{6} + \\cdots\\] The coefficient of \\(1/z\\) is \\(1\\), so \\(\\operatorname{Res}(1/\\sin z, 0) = 1\\).'
                },
                {
                    question: 'The function \\(f(z) = \\cot z = \\cos z / \\sin z\\) has simple poles at \\(z = n\\pi\\) for all \\(n \\in \\mathbb{Z}\\). Find \\(\\operatorname{Res}(\\cot z, n\\pi)\\).',
                    hint: 'Use the formula \\(\\operatorname{Res}(P/Q, z_0) = P(z_0)/Q\'(z_0)\\) with \\(P = \\cos z\\), \\(Q = \\sin z\\).',
                    solution: '\\(Q\'(z) = \\cos z\\). At \\(z = n\\pi\\): \\(P(n\\pi) = \\cos(n\\pi) = (-1)^n\\) and \\(Q\'(n\\pi) = \\cos(n\\pi) = (-1)^n\\). So \\(\\operatorname{Res}(\\cot z, n\\pi) = (-1)^n / (-1)^n = 1\\) for all \\(n\\).'
                },
                {
                    question: 'Find all isolated singularities of \\(f(z) = \\dfrac{1}{z^2 \\sin z}\\) and classify each one.',
                    hint: '\\(\\sin z = 0\\) at \\(z = n\\pi\\). Treat \\(z = 0\\) separately since both \\(z^2\\) and \\(\\sin z\\) vanish there.',
                    solution: 'Singularities at \\(z = n\\pi\\), \\(n \\in \\mathbb{Z}\\). For \\(n \\neq 0\\): \\(z^2\\) is nonzero, \\(\\sin z\\) has a simple zero, so \\(f\\) has a simple pole at \\(z = n\\pi\\) (\\(n \\neq 0\\)). At \\(z = 0\\): \\(\\sin z \\sim z\\), so \\(f \\sim 1/(z^3)\\) near \\(z = 0\\), making it a pole of order 3.'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=2} \\frac{e^z}{z(z-1)} \\, dz\\) using residues.',
                    hint: 'Both singularities \\(z = 0\\) and \\(z = 1\\) lie inside \\(|z| = 2\\). Compute the residues at each.',
                    solution: 'Simple poles at \\(z = 0\\) and \\(z = 1\\). \\[\\operatorname{Res}\\left(\\frac{e^z}{z(z-1)}, 0\\right) = \\lim_{z \\to 0} z \\cdot \\frac{e^z}{z(z-1)} = \\frac{e^0}{0-1} = -1.\\] \\[\\operatorname{Res}\\left(\\frac{e^z}{z(z-1)}, 1\\right) = \\lim_{z \\to 1} (z-1) \\cdot \\frac{e^z}{z(z-1)} = \\frac{e^1}{1} = e.\\] By the Residue Theorem: \\(\\oint = 2\\pi i(-1 + e) = 2\\pi i(e - 1)\\).'
                }
            ]
        }

    ] // end sections
}); // end CHAPTERS.push
