window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: "Cauchy's Integral Formula",
    subtitle: 'Recovering function values from boundary data',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Boundary Data Determines Everything',
            content: `
<h2>Why Boundary Data Determines Everything</h2>

<div class="env-block intuition">
    <div class="env-title">The Remarkable Rigidity of Analytic Functions</div>
    <div class="env-body">
        <p>In real analysis, knowing a smooth function on the boundary of a disk tells you almost nothing about its values inside. You can extend the boundary data to the interior in infinitely many ways. Complex analysis is radically different: if \\(f\\) is analytic inside and on a closed curve \\(\\gamma\\), then the values of \\(f\\) on \\(\\gamma\\) completely determine \\(f\\) at every interior point.</p>
        <p>This is not merely a theoretical curiosity. It means that an analytic function is far more constrained than any real-differentiable function could be. A single contour integral encodes all interior information.</p>
    </div>
</div>

<p>In the previous chapter, we established Cauchy's integral theorem: if \\(f\\) is analytic on a simply connected domain \\(D\\), then</p>

\\[
\\oint_\\gamma f(z)\\,dz = 0
\\]

<p>for every closed contour \\(\\gamma\\) in \\(D\\). This tells us that contour integrals of analytic functions vanish. But what happens when the integrand has a singularity inside the contour?</p>

<p>Consider the function \\(g(z) = f(z)/(z - z_0)\\), where \\(f\\) is analytic and \\(z_0\\) lies inside \\(\\gamma\\). The function \\(g\\) is not analytic at \\(z_0\\), so Cauchy's theorem does not directly apply. Yet the integral \\(\\oint_\\gamma g(z)\\,dz\\) is far from arbitrary: it equals exactly \\(2\\pi i\\, f(z_0)\\). The contour integral "reads off" the value of \\(f\\) at the singular point.</p>

<h3>What This Chapter Builds</h3>

<p>We develop a chain of increasingly powerful results, each following from the last:</p>
<ol>
    <li><strong>Cauchy's integral formula:</strong> recover \\(f(z_0)\\) from boundary values.</li>
    <li><strong>Derivative formula:</strong> all derivatives \\(f^{(n)}(z_0)\\) are also determined by the same contour integral (analyticity implies infinite differentiability).</li>
    <li><strong>Mean value property:</strong> \\(f(z_0)\\) equals the average of \\(f\\) on any circle centered at \\(z_0\\).</li>
    <li><strong>Maximum modulus principle:</strong> \\(|f|\\) cannot attain a maximum in the interior of its domain.</li>
    <li><strong>Liouville's theorem and the Fundamental Theorem of Algebra:</strong> bounded entire functions are constant, and every non-constant polynomial has a root.</li>
</ol>

<p>Each result is a manifestation of the same underlying rigidity: analytic functions are globally constrained by local data.</p>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Cauchy's Integral Formula
        // ================================================================
        {
            id: 'sec-formula',
            title: "Cauchy's Integral Formula",
            content: `
<h2>Cauchy's Integral Formula</h2>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.1 (Cauchy's Integral Formula)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic on a simply connected domain \\(D\\), and let \\(\\gamma\\) be a positively oriented simple closed contour in \\(D\\). If \\(z_0\\) lies inside \\(\\gamma\\), then</p>
        \\[
        f(z_0) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f(z)}{z - z_0}\\,dz.
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Since \\(f\\) is continuous at \\(z_0\\), for any \\(\\varepsilon > 0\\) there exists \\(\\delta > 0\\) such that \\(|f(z) - f(z_0)| < \\varepsilon\\) whenever \\(|z - z_0| < \\delta\\). Let \\(C_r\\) be a small circle of radius \\(r < \\delta\\) centered at \\(z_0\\).</p>

        <p>By the deformation principle (a consequence of Cauchy's theorem), we can replace \\(\\gamma\\) by \\(C_r\\) without changing the integral:</p>
        \\[
        \\oint_\\gamma \\frac{f(z)}{z - z_0}\\,dz = \\oint_{C_r} \\frac{f(z)}{z - z_0}\\,dz.
        \\]

        <p>Now decompose the integrand:</p>
        \\[
        \\oint_{C_r} \\frac{f(z)}{z - z_0}\\,dz = f(z_0) \\oint_{C_r} \\frac{dz}{z - z_0} + \\oint_{C_r} \\frac{f(z) - f(z_0)}{z - z_0}\\,dz.
        \\]

        <p>The first integral equals \\(2\\pi i\\) (this is the fundamental winding number computation). For the second integral, on \\(C_r\\) we have \\(|z - z_0| = r\\) and \\(|f(z) - f(z_0)| < \\varepsilon\\), so by the ML inequality:</p>
        \\[
        \\left|\\oint_{C_r} \\frac{f(z) - f(z_0)}{z - z_0}\\,dz\\right| \\leq \\frac{\\varepsilon}{r} \\cdot 2\\pi r = 2\\pi\\varepsilon.
        \\]

        <p>Since \\(\\varepsilon\\) is arbitrary, the remainder vanishes, giving \\(\\oint_\\gamma \\frac{f(z)}{z-z_0}\\,dz = 2\\pi i\\, f(z_0)\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block intuition">
    <div class="env-title">What the Formula Says</div>
    <div class="env-body">
        <p>The value of \\(f\\) at any interior point \\(z_0\\) is a <em>weighted average</em> of \\(f\\) on the boundary, with weights \\(1/(z - z_0)\\). The pole at \\(z_0\\) acts like a "probe": it amplifies contributions from nearby points on the contour and suppresses distant ones. Yet the integral combines all boundary values into exactly \\(f(z_0)\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Computing an Integral</div>
    <div class="env-body">
        <p>Evaluate \\(\\displaystyle\\oint_{|z|=2} \\frac{e^z}{z - 1}\\,dz\\).</p>
        <p>Here \\(f(z) = e^z\\) is entire and \\(z_0 = 1\\) lies inside \\(|z| = 2\\). By Cauchy's formula:</p>
        \\[
        \\oint_{|z|=2} \\frac{e^z}{z-1}\\,dz = 2\\pi i \\cdot f(1) = 2\\pi i \\cdot e.
        \\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-cauchy-formula"></div>
`,
            visualizations: [
                {
                    id: 'viz-cauchy-formula',
                    title: "Cauchy's Integral Formula: Draggable Probe",
                    description: 'Drag the point z\u2080 inside the contour. The visualization computes the contour integral numerically and compares it to 2\u03C0i f(z\u2080). When z\u2080 is inside the curve, they match; when outside, the integral gives zero.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420, scale: 60,
                            originX: 280, originY: 210
                        });

                        // f(z) = z^2 + 1
                        function fRe(x, y) { return x * x - y * y + 1; }
                        function fIm(x, y) { return 2 * x * y; }

                        var z0 = viz.addDraggable('z0', 0.5, 0.3, viz.colors.orange, 8);

                        var contourR = 2.0;

                        function computeIntegral(z0x, z0y) {
                            var N = 2000;
                            var sumRe = 0, sumIm = 0;
                            for (var k = 0; k < N; k++) {
                                var t = 2 * Math.PI * k / N;
                                var t1 = 2 * Math.PI * (k + 1) / N;
                                var zx = contourR * Math.cos(t);
                                var zy = contourR * Math.sin(t);
                                var dzx = contourR * (Math.cos(t1) - Math.cos(t));
                                var dzy = contourR * (Math.sin(t1) - Math.sin(t));

                                // f(z) / (z - z0)
                                var numRe = fRe(zx, zy);
                                var numIm = fIm(zx, zy);
                                var denRe = zx - z0x;
                                var denIm = zy - z0y;
                                var denMag2 = denRe * denRe + denIm * denIm;
                                if (denMag2 < 1e-12) continue;

                                // complex division: (numRe + i numIm) / (denRe + i denIm)
                                var qRe = (numRe * denRe + numIm * denIm) / denMag2;
                                var qIm = (numIm * denRe - numRe * denIm) / denMag2;

                                // multiply by dz
                                sumRe += qRe * dzx - qIm * dzy;
                                sumIm += qIm * dzx + qRe * dzy;
                            }
                            return [sumRe, sumIm];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw contour
                            viz.drawCircle(0, 0, contourR, null, viz.colors.teal, 2);

                            // Direction arrow on contour
                            var arrowAngle = Math.PI / 4;
                            var ax = contourR * Math.cos(arrowAngle);
                            var ay = contourR * Math.sin(arrowAngle);
                            var tx = -Math.sin(arrowAngle);
                            var ty = Math.cos(arrowAngle);
                            var as = 0.15;
                            viz.drawVector(ax - tx * as, ay - ty * as, ax + tx * as, ay + ty * as, viz.colors.teal, null, 2);

                            var x0 = z0.x, y0 = z0.y;
                            var inside = (x0 * x0 + y0 * y0) < contourR * contourR;

                            // Compute integral numerically
                            var integral = computeIntegral(x0, y0);
                            // Expected: 2*pi*i * f(z0) if inside, 0 if outside
                            var fz0Re = fRe(x0, y0);
                            var fz0Im = fIm(x0, y0);
                            // 2*pi*i * f(z0) = -2*pi*fz0Im + i*2*pi*fz0Re
                            var expectedRe = inside ? -2 * Math.PI * fz0Im : 0;
                            var expectedIm = inside ? 2 * Math.PI * fz0Re : 0;

                            // Draw z0
                            viz.drawDraggables();
                            viz.drawText('z\u2080', x0 + 0.15, y0 + 0.2, viz.colors.orange, 14);

                            // Info panel
                            var panelY = 18;
                            viz.screenText('f(z) = z\u00B2 + 1', viz.width / 2, panelY, viz.colors.white, 14);

                            var z0Str = 'z\u2080 = ' + x0.toFixed(2) + (y0 >= 0 ? ' + ' : ' - ') + Math.abs(y0).toFixed(2) + 'i';
                            viz.screenText(z0Str, viz.width / 2, panelY + 20, viz.colors.orange, 12);

                            var fStr = 'f(z\u2080) = ' + fz0Re.toFixed(2) + (fz0Im >= 0 ? ' + ' : ' - ') + Math.abs(fz0Im).toFixed(2) + 'i';
                            viz.screenText(fStr, viz.width / 2, panelY + 38, viz.colors.blue, 12);

                            // Numerical result
                            var intRe = integral[0], intIm = integral[1];
                            // Divide by 2*pi*i to get f(z0): (intRe + i*intIm) / (2*pi*i) = intIm/(2*pi) + i*(-intRe/(2*pi))
                            var recovRe = intIm / (2 * Math.PI);
                            var recovIm = -intRe / (2 * Math.PI);

                            var recStr = '(1/2\u03C0i)\u222E = ' + recovRe.toFixed(2) + (recovIm >= 0 ? ' + ' : ' - ') + Math.abs(recovIm).toFixed(2) + 'i';
                            viz.screenText(recStr, viz.width / 2, panelY + 56, viz.colors.teal, 12);

                            if (inside) {
                                viz.screenText('z\u2080 is INSIDE \u03B3: integral recovers f(z\u2080)', viz.width / 2, viz.height - 20, viz.colors.green, 12);
                            } else {
                                viz.screenText('z\u2080 is OUTSIDE \u03B3: integral = 0', viz.width / 2, viz.height - 20, viz.colors.red, 12);
                            }
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=3} \\frac{\\sin z}{z - \\pi}\\,dz\\).',
                    hint: 'Identify \\(f(z) = \\sin z\\) and \\(z_0 = \\pi\\). Check that \\(z_0\\) is inside the contour.',
                    solution: 'Since \\(|\\pi| \\approx 3.14 > 3\\), the point \\(z_0 = \\pi\\) lies outside \\(|z| = 3\\). The integrand is analytic inside the contour, so by Cauchy\'s theorem the integral equals \\(0\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=1} \\frac{z^3 + 2z}{z - i/2}\\,dz\\).',
                    hint: 'Apply Cauchy\'s formula with \\(f(z) = z^3 + 2z\\) and \\(z_0 = i/2\\).',
                    solution: 'Here \\(z_0 = i/2\\) is inside \\(|z| = 1\\), and \\(f(z) = z^3 + 2z\\). By Cauchy\'s formula: \\(2\\pi i \\cdot f(i/2) = 2\\pi i \\left[(i/2)^3 + 2(i/2)\\right] = 2\\pi i \\left[-i/8 + i\\right] = 2\\pi i \\cdot \\frac{7i}{8} = -\\frac{7\\pi}{4}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Cauchy's Formula for Derivatives
        // ================================================================
        {
            id: 'sec-derivatives',
            title: "Cauchy's Formula for Derivatives",
            content: `
<h2>Cauchy's Formula for Derivatives</h2>

<p>One of the most striking consequences of Cauchy's integral formula is that analytic functions are infinitely differentiable, and every derivative is itself given by a contour integral.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.2 (Cauchy's Derivative Formula)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic on a simply connected domain \\(D\\), let \\(\\gamma\\) be a positively oriented simple closed contour in \\(D\\), and let \\(z_0\\) lie inside \\(\\gamma\\). Then \\(f\\) has derivatives of all orders at \\(z_0\\), and</p>
        \\[
        f^{(n)}(z_0) = \\frac{n!}{2\\pi i} \\oint_\\gamma \\frac{f(z)}{(z - z_0)^{n+1}}\\,dz, \\qquad n = 0, 1, 2, \\ldots
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Idea (Differentiation Under the Integral Sign)</div>
    <div class="env-body">
        <p>Starting from Cauchy's formula \\(f(z_0) = \\frac{1}{2\\pi i}\\oint_\\gamma \\frac{f(z)}{z-z_0}\\,dz\\), we differentiate with respect to \\(z_0\\). Since \\(z_0\\) appears only in the denominator and the integral is over a fixed contour, we can differentiate under the integral sign:</p>
        \\[
        f'(z_0) = \\frac{1}{2\\pi i}\\oint_\\gamma \\frac{\\partial}{\\partial z_0}\\left[\\frac{f(z)}{z - z_0}\\right]dz = \\frac{1}{2\\pi i}\\oint_\\gamma \\frac{f(z)}{(z-z_0)^2}\\,dz.
        \\]
        <p>Repeating \\(n\\) times and tracking the combinatorial factors yields the general formula. The rigorous justification uses uniform convergence of difference quotients on the contour.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">Analyticity Implies Smoothness</div>
    <div class="env-body">
        <p>In real analysis, a function can be differentiable once but not twice. In complex analysis, a single complex derivative forces all higher derivatives to exist. This is because the derivative formula shows \\(f^{(n)}(z_0)\\) is itself an integral of \\(f\\) (which is continuous), hence continuous, hence analytic, hence again differentiable. The bootstrap never stops.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Higher-Order Integral</div>
    <div class="env-body">
        <p>Evaluate \\(\\displaystyle\\oint_{|z|=2} \\frac{e^z}{(z-1)^3}\\,dz\\).</p>
        <p>With \\(f(z) = e^z\\), \\(z_0 = 1\\), \\(n = 2\\):</p>
        \\[
        \\oint_{|z|=2} \\frac{e^z}{(z-1)^3}\\,dz = \\frac{2\\pi i}{2!} f''(1) = \\frac{2\\pi i}{2} \\cdot e = \\pi i \\, e.
        \\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Corollary 6.3 (Cauchy's Inequality)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic on \\(|z - z_0| \\leq R\\) and \\(|f(z)| \\leq M\\) on \\(|z - z_0| = R\\), then</p>
        \\[
        |f^{(n)}(z_0)| \\leq \\frac{n! \\, M}{R^n}.
        \\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Apply the ML inequality to the derivative formula with \\(\\gamma = C_R\\) (circle of radius \\(R\\)):</p>
        \\[
        |f^{(n)}(z_0)| = \\frac{n!}{2\\pi} \\left|\\oint_{C_R} \\frac{f(z)}{(z-z_0)^{n+1}}\\,dz\\right| \\leq \\frac{n!}{2\\pi} \\cdot \\frac{M}{R^{n+1}} \\cdot 2\\pi R = \\frac{n!\\,M}{R^n}.
        \\]
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="viz-placeholder" data-viz="viz-derivative-formula"></div>
`,
            visualizations: [
                {
                    id: 'viz-derivative-formula',
                    title: "Derivative Formula: Adjustable Order",
                    description: 'Use the slider to choose the derivative order n. The visualization numerically computes the contour integral for f^(n)(z\u2080) and compares it to the exact value.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420, scale: 60,
                            originX: 280, originY: 240
                        });

                        var nOrder = 0;
                        var contourR = 1.5;

                        VizEngine.createSlider(controls, 'n (derivative order)', 0, 5, 0, 1, function(v) {
                            nOrder = Math.round(v);
                            draw();
                        });

                        // f(z) = e^z, all derivatives = e^z
                        function fRe(x, y) { return Math.exp(x) * Math.cos(y); }
                        function fIm(x, y) { return Math.exp(x) * Math.sin(y); }

                        function factorial(n) {
                            var r = 1;
                            for (var i = 2; i <= n; i++) r *= i;
                            return r;
                        }

                        function computeDerivIntegral(z0x, z0y, n) {
                            var N = 3000;
                            var sumRe = 0, sumIm = 0;
                            for (var k = 0; k < N; k++) {
                                var t = 2 * Math.PI * k / N;
                                var t1 = 2 * Math.PI * (k + 1) / N;
                                var zx = z0x + contourR * Math.cos(t);
                                var zy = z0y + contourR * Math.sin(t);
                                var dzx = contourR * (Math.cos(t1) - Math.cos(t));
                                var dzy = contourR * (Math.sin(t1) - Math.sin(t));

                                // f(z) / (z - z0)^(n+1)
                                var fR = fRe(zx, zy);
                                var fI = fIm(zx, zy);
                                var dR = zx - z0x;
                                var dI = zy - z0y;

                                // (z - z0)^(n+1): compute as polar power
                                var rr = Math.sqrt(dR * dR + dI * dI);
                                var th = Math.atan2(dI, dR);
                                var rn = Math.pow(rr, n + 1);
                                var tn = (n + 1) * th;
                                var powR = rn * Math.cos(tn);
                                var powI = rn * Math.sin(tn);

                                // f(z) / pow
                                var pm2 = powR * powR + powI * powI;
                                if (pm2 < 1e-20) continue;
                                var qR = (fR * powR + fI * powI) / pm2;
                                var qI = (fI * powR - fR * powI) / pm2;

                                sumRe += qR * dzx - qI * dzy;
                                sumIm += qI * dzx + qR * dzy;
                            }
                            // multiply by n! / (2*pi*i)
                            // division by 2*pi*i: (a + bi) / (2*pi*i) = b/(2*pi) - i*a/(2*pi)... wait
                            // n!/(2*pi*i) * integral: the integral is sumRe + i*sumIm
                            // multiply by n!: nf * (sumRe + i*sumIm)
                            // then divide by 2*pi*i: (X + iY)/(2*pi*i) = Y/(2*pi) + i*(-X/(2*pi))
                            var nf = factorial(n);
                            var X = nf * sumRe;
                            var Y = nf * sumIm;
                            return [Y / (2 * Math.PI), -X / (2 * Math.PI)];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var z0x = 0.5, z0y = 0;

                            // Draw contour
                            viz.drawCircle(z0x, z0y, contourR, null, viz.colors.teal, 2);
                            viz.drawPoint(z0x, z0y, viz.colors.orange, 'z\u2080', 6);

                            // Exact derivative of e^z at z0: it's e^z0 for all n
                            var exactRe = fRe(z0x, z0y);
                            var exactIm = fIm(z0x, z0y);

                            // Numerical result
                            var numResult = computeDerivIntegral(z0x, z0y, nOrder);

                            // Info panel
                            var py = 18;
                            viz.screenText('f(z) = e^z,  z\u2080 = 0.5', viz.width / 2, py, viz.colors.white, 14);
                            viz.screenText('Derivative order n = ' + nOrder, viz.width / 2, py + 22, viz.colors.orange, 13);
                            viz.screenText('f' + (nOrder > 0 ? '^(' + nOrder + ')' : '') + '(z\u2080) = e^{0.5} for all n (since f = e^z)', viz.width / 2, py + 42, viz.colors.text, 11);

                            var exactStr = 'Exact: ' + exactRe.toFixed(4) + (exactIm >= 0 ? ' + ' : ' - ') + Math.abs(exactIm).toFixed(4) + 'i';
                            var numStr = 'Numerical: ' + numResult[0].toFixed(4) + (numResult[1] >= 0 ? ' + ' : ' - ') + Math.abs(numResult[1]).toFixed(4) + 'i';

                            viz.screenText(exactStr, viz.width / 2, viz.height - 50, viz.colors.blue, 13);
                            viz.screenText(numStr, viz.width / 2, viz.height - 30, viz.colors.teal, 13);

                            var errRe = Math.abs(numResult[0] - exactRe);
                            var errIm = Math.abs(numResult[1] - exactIm);
                            var err = Math.sqrt(errRe * errRe + errIm * errIm);
                            viz.screenText('|error| = ' + err.toExponential(2), viz.width / 2, viz.height - 10, viz.colors.text, 11);

                            // Draw integrand magnitude around contour
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            var Npts = 300;
                            for (var k = 0; k <= Npts; k++) {
                                var t = 2 * Math.PI * k / Npts;
                                var zx = z0x + contourR * Math.cos(t);
                                var zy = z0y + contourR * Math.sin(t);
                                var fR = fRe(zx, zy);
                                var fI = fIm(zx, zy);
                                var mag = Math.sqrt(fR * fR + fI * fI);
                                var rr = contourR + mag * 0.1 / Math.pow(contourR, nOrder);
                                var px = z0x + rr * Math.cos(t);
                                var ppy = z0y + rr * Math.sin(t);
                                var sc = viz.toScreen(px, ppy);
                                if (k === 0) ctx.moveTo(sc[0], sc[1]);
                                else ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.stroke();
                            viz.screenText('|f| on contour', viz.width - 80, 80, viz.colors.purple, 10);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=1} \\frac{\\cos z}{z^4}\\,dz\\).',
                    hint: 'Write \\(1/z^4 = 1/(z - 0)^4\\). Apply the derivative formula with \\(n = 3\\) and \\(z_0 = 0\\).',
                    solution: 'With \\(f(z) = \\cos z\\), \\(z_0 = 0\\), \\(n = 3\\): the integral equals \\(\\frac{2\\pi i}{3!} f^{(3)}(0) = \\frac{2\\pi i}{6} \\cdot \\sin(0) = 0\\), since \\(f^{(3)}(z) = \\sin z\\) and \\(\\sin(0) = 0\\).'
                },
                {
                    question: 'Use Cauchy\'s inequality to show that if \\(f\\) is entire and \\(|f(z)| \\leq A + B|z|^k\\) for some constants \\(A, B\\) and integer \\(k \\geq 0\\), then \\(f\\) is a polynomial of degree at most \\(k\\).',
                    hint: 'Apply Cauchy\'s inequality for \\(f^{(n)}(0)\\) with a circle of radius \\(R\\). On this circle, \\(|f(z)| \\leq A + BR^k\\). Let \\(R \\to \\infty\\) for \\(n > k\\).',
                    solution: 'By Cauchy\'s inequality with \\(z_0 = 0\\) and radius \\(R\\): \\(|f^{(n)}(0)| \\leq \\frac{n!(A + BR^k)}{R^n}\\). For \\(n > k\\), this bound tends to 0 as \\(R \\to \\infty\\), so \\(f^{(n)}(0) = 0\\) for all \\(n > k\\). Since \\(f\\) is entire, its Taylor series converges everywhere, and all coefficients beyond degree \\(k\\) vanish. Thus \\(f\\) is a polynomial of degree \\(\\leq k\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Mean Value Property
        // ================================================================
        {
            id: 'sec-mean-value',
            title: 'The Mean Value Property',
            content: `
<h2>The Mean Value Property</h2>

<p>A beautiful special case of Cauchy's formula arises when we take \\(\\gamma\\) to be a circle centered at \\(z_0\\).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.4 (Mean Value Property)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic on an open set containing the closed disk \\(\\overline{D}(z_0, R)\\), then</p>
        \\[
        f(z_0) = \\frac{1}{2\\pi} \\int_0^{2\\pi} f(z_0 + Re^{i\\theta})\\,d\\theta.
        \\]
        <p>In words: the value of \\(f\\) at the center of any circle equals the average of \\(f\\) on that circle.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Parametrize \\(\\gamma\\) as \\(z = z_0 + Re^{i\\theta}\\) for \\(\\theta \\in [0, 2\\pi]\\). Then \\(dz = iRe^{i\\theta}\\,d\\theta\\) and \\(z - z_0 = Re^{i\\theta}\\). Cauchy's formula gives:</p>
        \\[
        f(z_0) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f(z)}{z - z_0}\\,dz = \\frac{1}{2\\pi i} \\int_0^{2\\pi} \\frac{f(z_0 + Re^{i\\theta})}{Re^{i\\theta}} \\cdot iRe^{i\\theta}\\,d\\theta = \\frac{1}{2\\pi} \\int_0^{2\\pi} f(z_0 + Re^{i\\theta})\\,d\\theta.
        \\]
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block intuition">
    <div class="env-title">No Local Extrema Without Global Consequences</div>
    <div class="env-body">
        <p>The mean value property means the center value is an average. An average cannot exceed all the values being averaged (unless they are all equal). This observation directly leads to the maximum modulus principle in the next section.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Harmonic Functions</div>
    <div class="env-body">
        <p>If \\(f = u + iv\\) is analytic, then both \\(u\\) and \\(v\\) (real and imaginary parts) separately satisfy the mean value property:</p>
        \\[
        u(x_0, y_0) = \\frac{1}{2\\pi}\\int_0^{2\\pi} u(x_0 + R\\cos\\theta,\\, y_0 + R\\sin\\theta)\\,d\\theta.
        \\]
        <p>This is exactly the mean value property for harmonic functions. Indeed, \\(u\\) and \\(v\\) are harmonic (they satisfy Laplace's equation \\(\\nabla^2 u = 0\\)), and the mean value property characterizes harmonic functions.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-mean-value"></div>
`,
            visualizations: [
                {
                    id: 'viz-mean-value',
                    title: 'Mean Value Property: Sampling the Circle',
                    description: 'Watch as sample points on a circle are averaged to approximate f(z\u2080). As more points are used, the average converges to the exact center value. The function shown is f(z) = z\u00B2 + 1.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420, scale: 55,
                            originX: 280, originY: 230
                        });

                        var R = 1.5;
                        var animPhase = 0;
                        var numSamples = 8;

                        VizEngine.createSlider(controls, 'Samples', 4, 64, numSamples, 1, function(v) {
                            numSamples = Math.round(v);
                        });
                        VizEngine.createSlider(controls, 'Radius R', 0.5, 2.5, R, 0.1, function(v) {
                            R = v;
                        });

                        var z0x = 0.5, z0y = 0.3;

                        // f(z) = z^2 + 1
                        function fRe(x, y) { return x * x - y * y + 1; }
                        function fIm(x, y) { return 2 * x * y; }

                        function draw(t) {
                            animPhase = t * 0.001;
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Draw circle
                            viz.drawCircle(z0x, z0y, R, null, viz.colors.teal + '88', 1.5);
                            viz.drawPoint(z0x, z0y, viz.colors.orange, 'z\u2080', 6);

                            // Sample points
                            var avgRe = 0, avgIm = 0;
                            var activeSamples = Math.min(numSamples, Math.floor(numSamples * ((Math.sin(animPhase * 0.5) + 1) / 2 * 0.5 + 0.5) + numSamples * 0.5));
                            activeSamples = numSamples;

                            for (var k = 0; k < activeSamples; k++) {
                                var theta = 2 * Math.PI * k / activeSamples + animPhase * 0.3;
                                var sx = z0x + R * Math.cos(theta);
                                var sy = z0y + R * Math.sin(theta);
                                var fR = fRe(sx, sy);
                                var fI = fIm(sx, sy);
                                avgRe += fR;
                                avgIm += fI;

                                // Draw sample point
                                var pulse = 0.5 + 0.5 * Math.sin(animPhase * 2 + k * 0.5);
                                var pr = 3 + pulse * 2;
                                viz.drawPoint(sx, sy, viz.colors.blue, null, pr);

                                // Draw line from sample to center (faint)
                                viz.drawSegment(z0x, z0y, sx, sy, viz.colors.blue + '22', 0.5);
                            }

                            avgRe /= activeSamples;
                            avgIm /= activeSamples;

                            // Exact f(z0)
                            var exactRe = fRe(z0x, z0y);
                            var exactIm = fIm(z0x, z0y);

                            // Info
                            var py = 16;
                            viz.screenText('f(z) = z\u00B2 + 1', viz.width / 2, py, viz.colors.white, 14);
                            viz.screenText('Mean Value Property: f(z\u2080) = average of f on circle', viz.width / 2, py + 20, viz.colors.text, 11);

                            var exactStr = 'f(z\u2080) = ' + exactRe.toFixed(4) + (exactIm >= 0 ? '+' : '') + exactIm.toFixed(4) + 'i';
                            var avgStr = 'Average (' + activeSamples + ' pts) = ' + avgRe.toFixed(4) + (avgIm >= 0 ? '+' : '') + avgIm.toFixed(4) + 'i';

                            viz.screenText(exactStr, viz.width / 2, viz.height - 40, viz.colors.orange, 13);
                            viz.screenText(avgStr, viz.width / 2, viz.height - 20, viz.colors.blue, 13);

                            var err = Math.sqrt((avgRe - exactRe) ** 2 + (avgIm - exactIm) ** 2);
                            viz.screenText('|error| = ' + err.toExponential(2), viz.width / 2, viz.height - 2, viz.colors.text, 10);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'If \\(f\\) is analytic and \\(\\text{Re}\\,f(z_0) \\geq \\text{Re}\\,f(z)\\) for all \\(z\\) in a disk around \\(z_0\\), what can you conclude about \\(f\\)?',
                    hint: 'Apply the mean value property to \\(u = \\text{Re}\\,f\\). If \\(u(z_0)\\) is at least as large as all nearby values, what does the averaging property force?',
                    solution: 'By the mean value property, \\(u(z_0) = \\frac{1}{2\\pi}\\int_0^{2\\pi} u(z_0 + re^{i\\theta})\\,d\\theta\\) for all small \\(r\\). Since \\(u(z_0) \\geq u(z_0 + re^{i\\theta})\\) everywhere, the only way the average can equal the maximum is if \\(u\\) is constant on every such circle. By continuity, \\(u\\) is constant on the disk, and since \\(u\\) is harmonic, \\(f\\) must be constant on the disk.'
                },
                {
                    question: 'Let \\(f(z) = e^z\\). Verify the mean value property directly by computing \\(\\frac{1}{2\\pi}\\int_0^{2\\pi} e^{Re^{i\\theta}}\\,d\\theta\\) and showing it equals \\(f(0) = 1\\).',
                    hint: 'Use the power series \\(e^w = \\sum_{n=0}^\\infty w^n/n!\\) and the fact that \\(\\int_0^{2\\pi} e^{in\\theta}\\,d\\theta = 0\\) for \\(n \\neq 0\\).',
                    solution: 'Write \\(e^{Re^{i\\theta}} = \\sum_{n=0}^\\infty \\frac{R^n e^{in\\theta}}{n!}\\). Integrating term by term: \\(\\frac{1}{2\\pi}\\int_0^{2\\pi} e^{in\\theta}d\\theta = \\delta_{n0}\\). So the average equals the \\(n=0\\) term, which is \\(R^0/0! = 1 = e^0 = f(0)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Maximum Modulus Principle
        // ================================================================
        {
            id: 'sec-maximum',
            title: 'The Maximum Modulus Principle',
            content: `
<h2>The Maximum Modulus Principle</h2>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.5 (Maximum Modulus Principle)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic and non-constant on a connected open set \\(D\\). Then \\(|f|\\) has no local maximum in \\(D\\). That is, for every \\(z_0 \\in D\\), there exist points \\(z\\) arbitrarily close to \\(z_0\\) with \\(|f(z)| > |f(z_0)|\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Suppose for contradiction that \\(|f(z_0)|\\) is a local maximum: \\(|f(z)| \\leq |f(z_0)|\\) for all \\(z\\) in some disk \\(D(z_0, r)\\). By the mean value property, for any \\(0 < \\rho < r\\):</p>
        \\[
        |f(z_0)| = \\left|\\frac{1}{2\\pi}\\int_0^{2\\pi} f(z_0 + \\rho e^{i\\theta})\\,d\\theta\\right| \\leq \\frac{1}{2\\pi}\\int_0^{2\\pi} |f(z_0 + \\rho e^{i\\theta})|\\,d\\theta \\leq |f(z_0)|.
        \\]
        <p>All inequalities are equalities. The first inequality (triangle inequality for integrals) is strict unless all values \\(f(z_0 + \\rho e^{i\\theta})\\) point in the same direction in the complex plane. The second inequality is strict unless \\(|f| = |f(z_0)|\\) everywhere on the circle. Together, these force \\(f\\) to be constant on every circle, hence constant on \\(D(z_0, r)\\). By the identity theorem, \\(f\\) is constant on all of \\(D\\), contradicting our assumption.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block theorem">
    <div class="env-title">Corollary 6.6 (Maximum on Boundary)</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic on a bounded domain \\(D\\) and continuous on \\(\\overline{D}\\), then \\(|f|\\) attains its maximum on the boundary \\(\\partial D\\).</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">Physical Analogy</div>
    <div class="env-body">
        <p>Think of \\(|f(z)|\\) as temperature. The maximum modulus principle says that in steady-state heat flow (governed by Laplace's equation, which harmonic functions satisfy), the hottest point in a region is always on the boundary. You cannot have a "hot spot" in the interior without a heat source, and analyticity precludes interior sources.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>Let \\(f(z) = z^2 - 2z + 3\\) on the closed disk \\(|z| \\leq 2\\). Where does \\(|f|\\) achieve its maximum?</p>
        <p>By the maximum modulus principle, the maximum is on \\(|z| = 2\\). We parametrize: \\(z = 2e^{i\\theta}\\), and</p>
        \\[
        |f(2e^{i\\theta})| = |4e^{2i\\theta} - 4e^{i\\theta} + 3|.
        \\]
        <p>The maximum of this expression over \\(\\theta \\in [0, 2\\pi]\\) gives the maximum modulus, which is achieved on the boundary, never in the interior.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-maximum-modulus"></div>
`,
            visualizations: [
                {
                    id: 'viz-maximum-modulus',
                    title: 'Maximum Modulus Principle: |f| Heatmap',
                    description: 'A heatmap of |f(z)| for an analytic function. The maximum (brightest region) always occurs on or outside the boundary of any disk, never in the interior. The contour shows a circle; notice the max is on the boundary.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420, scale: 70,
                            originX: 280, originY: 210
                        });

                        var funcChoice = 0;
                        var funcs = [
                            { name: 'z\u00B2 + 1', f: function(x, y) { var re = x*x - y*y + 1; var im = 2*x*y; return Math.sqrt(re*re + im*im); } },
                            { name: 'e^z', f: function(x, y) { return Math.exp(x); } },
                            { name: 'z\u00B3 - z', f: function(x, y) { var r = x*x*x - 3*x*y*y - x; var im = 3*x*x*y - y*y*y - y; return Math.sqrt(r*r + im*im); } },
                            { name: 'sin(z)', f: function(x, y) { var r = Math.sin(x)*Math.cosh(y); var im = Math.cos(x)*Math.sinh(y); return Math.sqrt(r*r + im*im); } }
                        ];

                        var circR = 1.5;
                        var circX = 0, circY = 0;

                        VizEngine.createSlider(controls, 'Function', 0, 3, 0, 1, function(v) {
                            funcChoice = Math.round(v);
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Circle radius', 0.5, 3, circR, 0.1, function(v) {
                            circR = v;
                            draw();
                        });

                        function draw() {
                            var xRange = [-4, 4];
                            var yRange = [-3, 3];

                            viz.drawHeatmap(funcs[funcChoice].f, xRange, yRange, 'inferno');

                            // Overlay circle
                            var ctx = viz.ctx;
                            var sc = viz.toScreen(circX, circY);
                            ctx.strokeStyle = '#ffffff';
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.arc(sc[0], sc[1], circR * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Find max on boundary vs interior (sample)
                            var maxBdy = 0, maxInt = 0;
                            var maxBdyAngle = 0;
                            var fn = funcs[funcChoice].f;
                            for (var k = 0; k < 1000; k++) {
                                var theta = 2 * Math.PI * k / 1000;
                                var val = fn(circX + circR * Math.cos(theta), circY + circR * Math.sin(theta));
                                if (val > maxBdy) { maxBdy = val; maxBdyAngle = theta; }
                            }
                            // sample interior
                            for (var i = 0; i < 50; i++) {
                                for (var j = 0; j < 50; j++) {
                                    var sx = circX - circR + 2 * circR * i / 49;
                                    var sy = circY - circR + 2 * circR * j / 49;
                                    if ((sx - circX) * (sx - circX) + (sy - circY) * (sy - circY) >= circR * circR) continue;
                                    var v = fn(sx, sy);
                                    if (v > maxInt) maxInt = v;
                                }
                            }

                            // Mark max on boundary
                            var mxPt = [circX + circR * Math.cos(maxBdyAngle), circY + circR * Math.sin(maxBdyAngle)];
                            viz.drawPoint(mxPt[0], mxPt[1], viz.colors.white, 'max', 5);

                            // Info
                            viz.screenText('f(z) = ' + funcs[funcChoice].name, viz.width / 2, 16, viz.colors.white, 14);
                            viz.screenText('max|f| on boundary: ' + maxBdy.toFixed(3), viz.width / 2, viz.height - 36, viz.colors.white, 12);
                            viz.screenText('max|f| in interior: ' + maxInt.toFixed(3), viz.width / 2, viz.height - 18, viz.colors.yellow, 12);

                            if (maxBdy >= maxInt - 0.01) {
                                viz.screenText('Boundary \u2265 Interior (as expected)', viz.width / 2, viz.height - 2, viz.colors.green, 10);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(p(z)\\) be a non-constant polynomial and \\(D = \\{z : |z| \\leq R\\}\\). Show that \\(\\min_{z \\in D} |p(z)|\\) is attained on \\(|z| = R\\) or at a zero of \\(p\\) in the interior.',
                    hint: 'Apply the maximum modulus principle to \\(1/p(z)\\), which is analytic wherever \\(p(z) \\neq 0\\).',
                    solution: 'If \\(p\\) has no zeros in \\(D\\), then \\(1/p\\) is analytic on \\(D\\). By the maximum modulus principle, \\(|1/p|\\) achieves its max on \\(\\partial D\\), which means \\(|p|\\) achieves its min on \\(\\partial D\\). If \\(p\\) has a zero in \\(D\\), then the minimum of \\(|p|\\) is 0, achieved at that zero.'
                },
                {
                    question: 'Prove the minimum modulus principle: if \\(f\\) is analytic, non-constant, and \\(f(z) \\neq 0\\) on a domain \\(D\\), then \\(|f|\\) has no local minimum in \\(D\\).',
                    hint: 'Consider \\(g(z) = 1/f(z)\\).',
                    solution: 'Since \\(f\\) is non-vanishing and analytic on \\(D\\), \\(g = 1/f\\) is analytic on \\(D\\). A local minimum of \\(|f|\\) at \\(z_0\\) would be a local maximum of \\(|g| = 1/|f|\\) at \\(z_0\\). By the maximum modulus principle, \\(g\\) (hence \\(f\\)) would be constant, contradicting our assumption.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Liouville's Theorem and the Fundamental Theorem of Algebra
        // ================================================================
        {
            id: 'sec-bridge',
            title: "Liouville's Theorem and the Fundamental Theorem of Algebra",
            content: `
<h2>Liouville's Theorem and the Fundamental Theorem of Algebra</h2>

<p>We now harvest two of the most celebrated consequences of Cauchy's machinery. Both are remarkably short proofs of deep results.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.7 (Liouville's Theorem)</div>
    <div class="env-body">
        <p>Every bounded entire function is constant.</p>
        <p>That is, if \\(f\\) is analytic on all of \\(\\mathbb{C}\\) and there exists \\(M > 0\\) with \\(|f(z)| \\leq M\\) for all \\(z\\), then \\(f\\) is a constant function.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>By Cauchy's inequality (Corollary 6.3) with \\(n = 1\\), for any \\(z_0\\) and any \\(R > 0\\):</p>
        \\[
        |f'(z_0)| \\leq \\frac{M}{R}.
        \\]
        <p>Since \\(f\\) is entire, we can take \\(R\\) as large as we please. Letting \\(R \\to \\infty\\) gives \\(|f'(z_0)| = 0\\) for every \\(z_0\\). Therefore \\(f' \\equiv 0\\), so \\(f\\) is constant.</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">Contrast with Real Analysis</div>
    <div class="env-body">
        <p>There is no real analogue: \\(\\sin x\\) is bounded and infinitely differentiable on \\(\\mathbb{R}\\), but certainly not constant. Liouville's theorem shows that complex analyticity is enormously more restrictive than real smoothness.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 6.8 (Fundamental Theorem of Algebra)</div>
    <div class="env-body">
        <p>Every non-constant polynomial \\(p(z) = a_n z^n + \\cdots + a_1 z + a_0\\) (with \\(a_n \\neq 0\\), \\(n \\geq 1\\)) has at least one root in \\(\\mathbb{C}\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Suppose for contradiction that \\(p(z) \\neq 0\\) for all \\(z \\in \\mathbb{C}\\). Then \\(g(z) = 1/p(z)\\) is entire. Since \\(|p(z)| \\to \\infty\\) as \\(|z| \\to \\infty\\) (the leading term dominates), we have \\(|g(z)| \\to 0\\) as \\(|z| \\to \\infty\\). In particular, \\(g\\) is bounded. By Liouville's theorem, \\(g\\) is constant, which forces \\(p\\) to be constant, contradicting \\(n \\geq 1\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block intuition">
    <div class="env-title">The Chain of Implications</div>
    <div class="env-body">
        <p>Trace the logical chain that makes this proof work:</p>
        <ol>
            <li>Cauchy's integral formula recovers \\(f(z_0)\\) from boundary values.</li>
            <li>Differentiating under the integral gives the derivative formula.</li>
            <li>The ML inequality applied to the derivative formula gives Cauchy's inequality.</li>
            <li>Cauchy's inequality with \\(R \\to \\infty\\) gives Liouville's theorem.</li>
            <li>Liouville's theorem applied to \\(1/p(z)\\) gives the Fundamental Theorem of Algebra.</li>
        </ol>
        <p>A single integral formula, combined with one inequality, proves that every polynomial has a complex root. This is the power of complex analysis.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Entire Functions with Polynomial Growth</div>
    <div class="env-body">
        <p>Combine Liouville's theorem with Cauchy's inequality: if \\(f\\) is entire and \\(|f(z)| \\leq C|z|^n\\) for large \\(|z|\\), then \\(f\\) is a polynomial of degree \\(\\leq n\\). (We proved this in the exercises for Section 3.)</p>
        <p>In particular, an entire function that grows slower than any polynomial must be constant. Growth rate completely determines the "polynomial complexity" of entire functions.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-liouville"></div>
<div class="viz-placeholder" data-viz="viz-fta"></div>
`,
            visualizations: [
                {
                    id: 'viz-liouville',
                    title: "Liouville's Theorem: Bounded Entire Functions",
                    description: 'Explore bounded entire functions. The only bounded entire functions are constants. This visualization shows |f(z)| for various entire functions and highlights why non-constant ones must be unbounded.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400, scale: 50,
                            originX: 280, originY: 200
                        });

                        var funcChoice = 0;
                        var funcs = [
                            { name: 'f(z) = 3 (constant, bounded)', bounded: true,
                              f: function(x, y) { return 3; } },
                            { name: 'f(z) = e^z (unbounded)', bounded: false,
                              f: function(x, y) { return Math.exp(x); } },
                            { name: 'f(z) = sin(z) (unbounded!)', bounded: false,
                              f: function(x, y) { return Math.sqrt(Math.sin(x)*Math.sin(x)*Math.cosh(y)*Math.cosh(y) + Math.cos(x)*Math.cos(x)*Math.sinh(y)*Math.sinh(y)); } },
                            { name: 'f(z) = z\u00B2 (unbounded)', bounded: false,
                              f: function(x, y) { var re = x*x - y*y; var im = 2*x*y; return Math.sqrt(re*re + im*im); } }
                        ];

                        VizEngine.createSlider(controls, 'Function', 0, 3, 0, 1, function(v) {
                            funcChoice = Math.round(v);
                            draw();
                        });

                        function draw() {
                            var xR = [-5.5, 5.5];
                            var yR = [-4, 4];
                            viz.drawHeatmap(funcs[funcChoice].f, xR, yR, 'viridis');

                            viz.screenText(funcs[funcChoice].name, viz.width / 2, 18, viz.colors.white, 13);

                            // Show circles of increasing radius with max|f|
                            var ctx = viz.ctx;
                            var radii = [1, 2, 3, 4];
                            for (var ri = 0; ri < radii.length; ri++) {
                                var R = radii[ri];
                                var sc = viz.toScreen(0, 0);
                                ctx.strokeStyle = '#ffffff44';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(sc[0], sc[1], R * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();

                                // Max on this circle
                                var maxV = 0;
                                for (var k = 0; k < 200; k++) {
                                    var t = 2 * Math.PI * k / 200;
                                    var v = funcs[funcChoice].f(R * Math.cos(t), R * Math.sin(t));
                                    if (v > maxV) maxV = v;
                                }
                                viz.screenText('R=' + R + ': max=' + maxV.toFixed(1), viz.width - 80, 50 + ri * 18, viz.colors.white, 10);
                            }

                            if (funcs[funcChoice].bounded) {
                                viz.screenText('Bounded + Entire = Constant (Liouville)', viz.width / 2, viz.height - 14, viz.colors.green, 12);
                            } else {
                                viz.screenText('Non-constant entire \u21D2 unbounded (as Liouville requires)', viz.width / 2, viz.height - 14, viz.colors.yellow, 12);
                            }
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-fta',
                    title: 'Fundamental Theorem of Algebra: Polynomial Zeros via Domain Coloring',
                    description: 'Domain coloring of a polynomial p(z). Zeros appear as points where all colors meet (the argument cycles through all values). A degree-n polynomial always has exactly n zeros (counted with multiplicity).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420, scale: 50,
                            originX: 280, originY: 210
                        });

                        var polyChoice = 0;
                        var polys = [
                            { name: 'z\u00B2 - 1 (roots: \u00B11)', zeros: [[1,0],[-1,0]],
                              f: function(re, im) { return [re*re - im*im - 1, 2*re*im]; } },
                            { name: 'z\u00B3 - 1 (cube roots of unity)', zeros: [[1,0],[-0.5, Math.sqrt(3)/2],[-0.5,-Math.sqrt(3)/2]],
                              f: function(re, im) {
                                  var r2 = re*re - im*im;
                                  var i2 = 2*re*im;
                                  return [re*r2 - im*i2 - 1, re*i2 + im*r2];
                              }},
                            { name: 'z\u2074 + 1 (4 roots)', zeros: [],
                              f: function(re, im) {
                                  var r2 = re*re - im*im; var i2 = 2*re*im;
                                  var r4 = r2*r2 - i2*i2; var i4 = 2*r2*i2;
                                  return [r4 + 1, i4];
                              }},
                            { name: 'z\u2075 - z (5 roots)', zeros: [[0,0],[1,0],[-1,0],[0,1],[0,-1]],
                              f: function(re, im) {
                                  var r2 = re*re - im*im; var i2 = 2*re*im;
                                  var r3 = re*r2 - im*i2; var i3 = re*i2 + im*r2;
                                  var r4 = r2*r2 - i2*i2; var i4 = 2*r2*i2;
                                  var r5 = re*r4 - im*i4; var i5 = re*i4 + im*r4;
                                  return [r5 - re, i5 - im];
                              }}
                        ];

                        // Compute roots of z^4 + 1
                        for (var k = 0; k < 4; k++) {
                            var angle = (Math.PI + 2 * Math.PI * k) / 4;
                            polys[2].zeros.push([Math.cos(angle), Math.sin(angle)]);
                        }

                        VizEngine.createSlider(controls, 'Polynomial', 0, 3, 0, 1, function(v) {
                            polyChoice = Math.round(v);
                            draw();
                        });

                        function draw() {
                            var xR = [-3, 3];
                            var yR = [-3, 3];
                            viz.drawDomainColoring(polys[polyChoice].f, xR, yR);

                            // Mark zeros
                            var zeros = polys[polyChoice].zeros;
                            for (var i = 0; i < zeros.length; i++) {
                                var zr = zeros[i][0], zi = zeros[i][1];
                                // Convert to screen via proportion
                                var px = (zr - xR[0]) / (xR[1] - xR[0]) * viz.width;
                                var py = (1 - (zi - yR[0]) / (yR[1] - yR[0])) * viz.height;
                                var ctx = viz.ctx;
                                ctx.strokeStyle = '#ffffff';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(px, py, 8, 0, Math.PI * 2);
                                ctx.stroke();
                            }

                            viz.screenText('p(z) = ' + polys[polyChoice].name, viz.width / 2, 16, viz.colors.white, 14);
                            viz.screenText('Zeros circled in white. All colors meet at each zero.', viz.width / 2, viz.height - 14, viz.colors.white, 11);
                            viz.screenText(zeros.length + ' zero(s) (FTA guarantees \u2265 1)', viz.width / 2, viz.height - 32, viz.colors.yellow, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that if \\(f\\) is entire and \\(\\text{Re}\\,f(z) \\leq M\\) for all \\(z\\), then \\(f\\) is constant.',
                    hint: 'Consider \\(g(z) = e^{f(z)}\\). Show that \\(g\\) is entire and bounded.',
                    solution: 'Let \\(g(z) = e^{f(z)}\\). Then \\(g\\) is entire and \\(|g(z)| = e^{\\text{Re}\\,f(z)} \\leq e^M\\). By Liouville\'s theorem, \\(g\\) is constant. Since the exponential function is injective on any horizontal strip of height \\(< 2\\pi\\), \\(f\\) must also be constant. (Alternatively: \\(g\' = f\'g = 0\\) and \\(g \\neq 0\\) implies \\(f\' = 0\\).)'
                },
                {
                    question: 'Prove that a polynomial of degree \\(n \\geq 1\\) has exactly \\(n\\) roots in \\(\\mathbb{C}\\), counted with multiplicity.',
                    hint: 'Use the FTA to find one root \\(z_1\\), factor \\(p(z) = (z - z_1)q(z)\\) where \\(\\deg q = n-1\\), and apply induction.',
                    solution: 'By the FTA, \\(p\\) has a root \\(z_1\\). The polynomial division theorem gives \\(p(z) = (z-z_1)q(z)\\) with \\(\\deg q = n-1\\). If \\(n-1 \\geq 1\\), apply the FTA to \\(q\\) to get another root. Inducting, after \\(n\\) steps we have \\(p(z) = a_n(z-z_1)(z-z_2)\\cdots(z-z_n)\\), giving exactly \\(n\\) roots (not necessarily distinct).'
                },
                {
                    question: 'Let \\(f\\) be entire with \\(|f(z)| \\geq 1\\) for all \\(z\\). Show that \\(f\\) is constant.',
                    hint: 'Consider \\(1/f(z)\\).',
                    solution: 'Since \\(|f(z)| \\geq 1 > 0\\), \\(f\\) has no zeros, so \\(g = 1/f\\) is entire. Also \\(|g(z)| = 1/|f(z)| \\leq 1\\), so \\(g\\) is bounded. By Liouville\'s theorem, \\(g\\) is constant, hence \\(f\\) is constant.'
                },
                {
                    question: 'Show that there is no entire function \\(f\\) satisfying \\(f(1/n) = 1/n^2\\) for \\(n = 1, 2, 3, \\ldots\\) and \\(f(0) = 1\\).',
                    hint: 'Consider \\(g(z) = f(z) - z^2\\). What does the identity theorem say about the zeros of \\(g\\)?',
                    solution: 'Define \\(g(z) = f(z) - z^2\\). Then \\(g(1/n) = f(1/n) - 1/n^2 = 0\\) for all \\(n \\geq 1\\). The sequence \\(1/n \\to 0\\), so the zeros of \\(g\\) accumulate at 0. By the identity theorem, \\(g \\equiv 0\\), i.e., \\(f(z) = z^2\\). But then \\(f(0) = 0 \\neq 1\\), a contradiction. So no such entire \\(f\\) exists.'
                }
            ]
        }
    ]
});
