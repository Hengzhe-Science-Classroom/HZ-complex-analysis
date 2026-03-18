window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Laurent Series & Singularities',
    subtitle: 'Negative powers, singularities, and their classification',
    sections: [
        // ================================================================
        // SECTION 1: Motivation — Beyond Taylor Series
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Beyond Taylor Series',
            content: `
<h2>Beyond Taylor Series</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Question</div>
    <div class="env-body">
        <p>Taylor series represent analytic functions as sums of <em>non-negative</em> powers \\((z - z_0)^n\\). But what happens at points where a function blows up, like \\(f(z) = 1/z\\) at \\(z = 0\\)? Taylor series are useless there: \\(1/z\\) is not analytic at the origin. Yet \\(1/z\\) clearly has a perfectly good "series representation" consisting of a single term with exponent \\(-1\\). Laurent series extend Taylor series by allowing <strong>negative powers</strong>, opening up the study of singularities.</p>
    </div>
</div>

<p>Consider the function \\(f(z) = \\frac{1}{z(z-1)}\\). This function is analytic everywhere except at \\(z = 0\\) and \\(z = 1\\). In the annular region \\(0 < |z| < 1\\), we can write</p>

\\[
\\frac{1}{z(z-1)} = -\\frac{1}{z} \\cdot \\frac{1}{1 - z} = -\\frac{1}{z} \\sum_{n=0}^{\\infty} z^n = -\\sum_{n=0}^{\\infty} z^{n-1} = -\\frac{1}{z} - 1 - z - z^2 - \\cdots
\\]

<p>This series has a term with \\(z^{-1}\\), something a Taylor series cannot produce. The theory of Laurent series makes this kind of expansion rigorous and systematic.</p>

<h3>Why Negative Powers Matter</h3>

<p>Three reasons to care about negative powers:</p>
<ol>
    <li><strong>Singularities</strong>: The behavior of a function near a singular point is encoded in the negative-power terms. Classifying singularities (removable, pole, essential) amounts to examining which negative powers appear.</li>
    <li><strong>Residues</strong>: The coefficient of \\((z - z_0)^{-1}\\) in a Laurent expansion, called the <em>residue</em>, is the key to evaluating contour integrals via the residue theorem.</li>
    <li><strong>Annular domains</strong>: In multiply-connected regions (domains with holes), Taylor series centered at a point may not converge everywhere the function is analytic. Laurent series, converging on annuli, fill this gap.</li>
</ol>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Pierre Alphonse Laurent published his theorem on series expansions in annular regions in 1843, though Karl Weierstrass had independently obtained similar results. Laurent's work was communicated to the French Academy by Cauchy, who had himself developed related ideas. The systematic classification of singularities using Laurent series was refined by Weierstrass and his school in the latter half of the 19th century.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-laurent-annulus"></div>
`,
            visualizations: [
                {
                    id: 'viz-laurent-annulus',
                    title: 'Laurent Series Annulus of Convergence',
                    description: 'A Laurent series converges on an annulus \\(r < |z - z_0| < R\\). Drag the inner and outer radii to see the region. The function \\(1/(z(z-1))\\) is analytic on the annulus \\(0 < |z| < 1\\) and also on \\(1 < |z| < \\infty\\), each region yielding a different Laurent expansion.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 80 });
                        var rInner = 0.3;
                        var rOuter = 1.0;

                        VizEngine.createSlider(controls, 'r (inner)', 0.0, 2.5, rInner, 0.05, function(v) {
                            rInner = v;
                            if (rInner >= rOuter) rOuter = rInner + 0.1;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'R (outer)', 0.2, 3.0, rOuter, 0.05, function(v) {
                            rOuter = v;
                            if (rOuter <= rInner) rInner = Math.max(0, rOuter - 0.1);
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Shade annular region
                            // Outer circle fill
                            var cx = viz.originX, cy = viz.originY;
                            ctx.beginPath();
                            ctx.arc(cx, cy, rOuter * viz.scale, 0, Math.PI * 2);
                            ctx.arc(cx, cy, rInner * viz.scale, 0, Math.PI * 2, true);
                            ctx.fillStyle = viz.colors.blue + '22';
                            ctx.fill();

                            // Outer circle
                            ctx.beginPath();
                            ctx.arc(cx, cy, rOuter * viz.scale, 0, Math.PI * 2);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 4]);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Inner circle
                            if (rInner > 0.01) {
                                ctx.beginPath();
                                ctx.arc(cx, cy, rInner * viz.scale, 0, Math.PI * 2);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([6, 4]);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Center point
                            viz.drawPoint(0, 0, viz.colors.red, 'z\u2080', 4);

                            // Labels
                            var labelAngle = Math.PI / 4;
                            var rMid = (rInner + rOuter) / 2;
                            viz.drawText('Convergence', rMid * Math.cos(labelAngle), rMid * Math.sin(labelAngle), viz.colors.blue, 12);

                            // Radius labels
                            ctx.strokeStyle = viz.colors.orange + '88';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(cx, cy);
                            ctx.lineTo(cx + rInner * viz.scale, cy);
                            ctx.stroke();
                            viz.screenText('r = ' + rInner.toFixed(2), cx + rInner * viz.scale / 2, cy + 16, viz.colors.orange, 11);

                            ctx.strokeStyle = viz.colors.blue + '88';
                            ctx.beginPath();
                            ctx.moveTo(cx, cy);
                            var dx = rOuter * viz.scale * Math.cos(-Math.PI / 6);
                            var dy = rOuter * viz.scale * Math.sin(-Math.PI / 6);
                            ctx.lineTo(cx + dx, cy + dy);
                            ctx.stroke();
                            viz.screenText('R = ' + rOuter.toFixed(2), cx + dx / 2 + 10, cy + dy / 2 + 10, viz.colors.blue, 11);

                            // Title
                            viz.screenText('Annulus: ' + rInner.toFixed(2) + ' < |z \u2212 z\u2080| < ' + rOuter.toFixed(2), viz.width / 2, 22, viz.colors.white, 14);

                            // Axis labels
                            viz.screenText('Re', viz.width - 20, viz.originY - 10, viz.colors.text, 11);
                            viz.screenText('Im', viz.originX + 14, 14, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
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

<div class="env-block definition">
    <div class="env-title">Definition (Laurent Series)</div>
    <div class="env-body">
        <p>A <strong>Laurent series</strong> centered at \\(z_0\\) is a doubly infinite series of the form</p>
        \\[
        f(z) = \\sum_{n=-\\infty}^{\\infty} a_n (z - z_0)^n = \\cdots + \\frac{a_{-2}}{(z-z_0)^2} + \\frac{a_{-1}}{z-z_0} + a_0 + a_1(z-z_0) + a_2(z-z_0)^2 + \\cdots
        \\]
        <p>The sum splits into two parts:</p>
        <ul>
            <li>The <strong>analytic part</strong> (or regular part): \\(\\displaystyle\\sum_{n=0}^{\\infty} a_n(z-z_0)^n\\)</li>
            <li>The <strong>principal part</strong>: \\(\\displaystyle\\sum_{n=1}^{\\infty} a_{-n}(z-z_0)^{-n}\\)</li>
        </ul>
    </div>
</div>

<p>The analytic part is an ordinary power series converging inside some disk \\(|z - z_0| < R\\). The principal part, after the substitution \\(w = 1/(z - z_0)\\), becomes \\(\\sum_{n=1}^{\\infty} a_{-n} w^n\\), a power series in \\(w\\) converging for \\(|w| < 1/r\\), i.e., \\(|z - z_0| > r\\). Together, the Laurent series converges on the annulus \\(r < |z - z_0| < R\\).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.1 (Laurent's Theorem)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic in the annulus \\(A = \\{z : r < |z - z_0| < R\\}\\) where \\(0 \\le r < R \\le \\infty\\). Then \\(f\\) has a unique Laurent series representation</p>
        \\[
        f(z) = \\sum_{n=-\\infty}^{\\infty} a_n (z - z_0)^n
        \\]
        <p>converging absolutely and uniformly on compact subsets of \\(A\\), where the coefficients are given by</p>
        \\[
        a_n = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f(\\zeta)}{(\\zeta - z_0)^{n+1}} \\, d\\zeta
        \\]
        <p>for any positively oriented simple closed curve \\(\\gamma\\) lying in \\(A\\) and encircling \\(z_0\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Comparison with Taylor's Theorem</div>
    <div class="env-body">
        <p>When \\(r = 0\\) and \\(f\\) is analytic at \\(z_0\\), the principal part vanishes (all \\(a_{-n} = 0\\)) and the Laurent series reduces to the Taylor series. The coefficient formula reduces to \\(a_n = f^{(n)}(z_0)/n!\\). Laurent's theorem is strictly more general: it applies wherever \\(f\\) is analytic, even around isolated singularities.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Two Laurent Expansions of the Same Function</div>
    <div class="env-body">
        <p>Consider \\(f(z) = \\frac{1}{z(1-z)}\\). This has singularities at \\(z = 0\\) and \\(z = 1\\), so there are two annular regions centered at \\(z = 0\\):</p>
        <p><strong>Region 1</strong>: \\(0 < |z| < 1\\). Here \\(|z| < 1\\), so \\(\\frac{1}{1-z} = \\sum_{n=0}^\\infty z^n\\), giving</p>
        \\[
        f(z) = \\frac{1}{z} \\sum_{n=0}^{\\infty} z^n = \\frac{1}{z} + 1 + z + z^2 + \\cdots
        \\]
        <p><strong>Region 2</strong>: \\(|z| > 1\\). Here \\(|1/z| < 1\\), so \\(\\frac{1}{1-z} = -\\frac{1}{z} \\cdot \\frac{1}{1 - 1/z} = -\\sum_{n=1}^\\infty z^{-n}\\), giving</p>
        \\[
        f(z) = \\frac{1}{z} \\cdot \\left(-\\sum_{n=1}^{\\infty} z^{-n}\\right) = -\\frac{1}{z^2} - \\frac{1}{z^3} - \\frac{1}{z^4} - \\cdots
        \\]
        <p>The same function, two different Laurent series, depending on the annular region.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Principal Part)</div>
    <div class="env-body">
        <p>The <strong>principal part</strong> of the Laurent series of \\(f\\) at \\(z_0\\) is</p>
        \\[
        \\sum_{n=1}^{\\infty} \\frac{a_{-n}}{(z - z_0)^n}.
        \\]
        <p>The nature of the singularity at \\(z_0\\) is completely determined by the principal part:</p>
        <ul>
            <li>If all \\(a_{-n} = 0\\): the singularity is <strong>removable</strong>.</li>
            <li>If finitely many \\(a_{-n} \\neq 0\\): the singularity is a <strong>pole</strong>.</li>
            <li>If infinitely many \\(a_{-n} \\neq 0\\): the singularity is <strong>essential</strong>.</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-laurent-coefficients"></div>
`,
            visualizations: [
                {
                    id: 'viz-laurent-coefficients',
                    title: 'Laurent Coefficients via Contour Integration',
                    description: 'The coefficient \\(a_n\\) is computed by integrating \\(f(\\zeta)/(\\zeta - z_0)^{n+1}\\) around a circle in the annulus. Watch the integration contour sweep around, accumulating the coefficient value.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 70 });
                        var nCoeff = -1;
                        var contourR = 0.8;
                        var animPhase = 0;

                        VizEngine.createSlider(controls, 'n', -3, 3, nCoeff, 1, function(v) {
                            nCoeff = Math.round(v);
                        });
                        VizEngine.createSlider(controls, 'Radius', 0.2, 1.8, contourR, 0.1, function(v) {
                            contourR = v;
                        });

                        // f(z) = 1/(z(1-z)), coefficients in 0 < |z| < 1
                        function fComplex(re, im) {
                            // 1 / (z * (1-z))
                            var zr = re, zi = im;
                            var omzr = 1 - re, omzi = -im;
                            // z * (1-z)
                            var pr = zr * omzr - zi * omzi;
                            var pi = zr * omzi + zi * omzr;
                            // 1 / (pr + i*pi)
                            var d = pr * pr + pi * pi;
                            if (d < 1e-12) return [0, 0];
                            return [pr / d, -pi / d];
                        }

                        viz.animate(function(t) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            animPhase = (t * 0.001) % (2 * Math.PI);
                            var steps = 200;
                            var maxAngle = animPhase;

                            // Draw contour circle
                            viz.drawCircle(0, 0, contourR, null, viz.colors.teal + '44', 1);

                            // Draw the swept portion
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= steps; i++) {
                                var theta = maxAngle * i / steps;
                                var x = contourR * Math.cos(theta);
                                var y = contourR * Math.sin(theta);
                                var sx = viz.originX + x * viz.scale;
                                var sy = viz.originY - y * viz.scale;
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Moving point on contour
                            var px = contourR * Math.cos(animPhase);
                            var py = contourR * Math.sin(animPhase);
                            viz.drawPoint(px, py, viz.colors.yellow, null, 5);

                            // Compute partial integral sum
                            var sumRe = 0, sumIm = 0;
                            var dt = maxAngle / steps;
                            for (var j = 0; j < steps; j++) {
                                var th = maxAngle * j / steps;
                                var zr = contourR * Math.cos(th);
                                var zi = contourR * Math.sin(th);
                                var fv = fComplex(zr, zi);
                                // divide by z^(n+1): z = contourR * e^(i*th)
                                // z^(n+1) = contourR^(n+1) * e^(i*(n+1)*th)
                                var rPow = Math.pow(contourR, nCoeff + 1);
                                var angPow = (nCoeff + 1) * th;
                                var zPowRe = rPow * Math.cos(angPow);
                                var zPowIm = rPow * Math.sin(angPow);
                                // f/z^(n+1)
                                var denom = zPowRe * zPowRe + zPowIm * zPowIm;
                                if (denom < 1e-15) continue;
                                var gRe = (fv[0] * zPowRe + fv[1] * zPowIm) / denom;
                                var gIm = (fv[1] * zPowRe - fv[0] * zPowIm) / denom;
                                // dz = i * contourR * e^(i*th) * dth
                                var dzRe = -contourR * Math.sin(th) * dt;
                                var dzIm = contourR * Math.cos(th) * dt;
                                sumRe += gRe * dzRe - gIm * dzIm;
                                sumIm += gRe * dzIm + gIm * dzRe;
                            }
                            // Divide by 2*pi*i
                            var aRe = sumIm / (2 * Math.PI);
                            var aIm = -sumRe / (2 * Math.PI);

                            // Singularity markers
                            viz.drawPoint(0, 0, viz.colors.red, 'z=0', 4);
                            viz.drawPoint(1, 0, viz.colors.red, 'z=1', 4);

                            // Info
                            viz.screenText('f(z) = 1/(z(1\u2212z)),  contour in 0 < |z| < 1', viz.width / 2, 22, viz.colors.white, 13);
                            viz.screenText('Computing a' + (nCoeff < 0 ? '\u208B' + Math.abs(nCoeff) : '\u2080'.charCodeAt(0) + nCoeff > 57 ? nCoeff : String.fromCharCode(8320 + nCoeff)), viz.width / 2, 42, viz.colors.teal, 12);
                            var progress = (animPhase / (2 * Math.PI) * 100).toFixed(0);
                            viz.screenText('Integral progress: ' + progress + '%', viz.width / 2, viz.height - 40, viz.colors.text, 11);
                            viz.screenText('a_' + nCoeff + ' \u2248 ' + aRe.toFixed(3) + (aIm >= 0 ? ' + ' : ' \u2212 ') + Math.abs(aIm).toFixed(3) + 'i', viz.width / 2, viz.height - 20, viz.colors.yellow, 13);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the Laurent series of \\(f(z) = \\frac{e^z}{z^2}\\) centered at \\(z = 0\\). What is the annulus of convergence?',
                    hint: 'Write the Taylor series of \\(e^z\\) and divide each term by \\(z^2\\).',
                    solution: 'Since \\(e^z = \\sum_{n=0}^\\infty \\frac{z^n}{n!}\\), we have \\(\\frac{e^z}{z^2} = \\sum_{n=0}^\\infty \\frac{z^{n-2}}{n!} = \\frac{1}{z^2} + \\frac{1}{z} + \\frac{1}{2} + \\frac{z}{6} + \\cdots\\). This converges on \\(0 < |z| < \\infty\\).'
                },
                {
                    question: 'Find two different Laurent expansions of \\(f(z) = \\frac{1}{z(z-2)}\\) centered at \\(z = 0\\), one valid for \\(0 < |z| < 2\\) and one for \\(|z| > 2\\).',
                    hint: 'Use partial fractions: \\(\\frac{1}{z(z-2)} = \\frac{-1/2}{z} + \\frac{1/2}{z-2}\\). For each region, expand \\(\\frac{1}{z-2}\\) using the appropriate geometric series.',
                    solution: 'Partial fractions: \\(f(z) = \\frac{-1}{2z} + \\frac{1}{2(z-2)}\\). For \\(0 < |z| < 2\\): \\(\\frac{1}{z-2} = \\frac{-1}{2} \\cdot \\frac{1}{1 - z/2} = -\\sum_{n=0}^\\infty \\frac{z^n}{2^{n+1}}\\), so \\(f(z) = -\\frac{1}{2z} - \\sum_{n=0}^\\infty \\frac{z^n}{2^{n+2}}\\). For \\(|z| > 2\\): \\(\\frac{1}{z-2} = \\frac{1}{z} \\cdot \\frac{1}{1 - 2/z} = \\sum_{n=0}^\\infty \\frac{2^n}{z^{n+1}}\\), so \\(f(z) = \\sum_{n=0}^\\infty \\frac{2^n - (n=0 ? 1 : 0)}{2 \\cdot z^{n+1}}\\). More explicitly, \\(f(z) = \\sum_{n=1}^\\infty \\frac{2^{n-1} - [n=1]/2}{z^n}\\).'
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

<div class="env-block definition">
    <div class="env-title">Definition (Isolated Singularity)</div>
    <div class="env-body">
        <p>A point \\(z_0\\) is an <strong>isolated singularity</strong> of \\(f\\) if \\(f\\) is analytic in some punctured disk \\(0 < |z - z_0| < R\\) but not at \\(z_0\\) itself. In other words, there is a neighborhood of \\(z_0\\) containing no other singularity.</p>
    </div>
</div>

<p>Since \\(f\\) is analytic in the punctured disk (an annulus with \\(r = 0\\)), Laurent's theorem gives a Laurent expansion</p>
\\[
f(z) = \\sum_{n=-\\infty}^{\\infty} a_n(z - z_0)^n, \\quad 0 < |z - z_0| < R.
\\]

<p>The nature of the singularity is completely determined by the principal part \\(\\sum_{n=1}^\\infty a_{-n}(z-z_0)^{-n}\\):</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.2 (Classification of Isolated Singularities)</div>
    <div class="env-body">
        <p>Let \\(z_0\\) be an isolated singularity of \\(f\\) with Laurent expansion \\(\\sum a_n(z-z_0)^n\\). Exactly one of the following holds:</p>
        <ol>
            <li><strong>Removable singularity</strong>: \\(a_n = 0\\) for all \\(n < 0\\). The principal part is empty. Example: \\(\\frac{\\sin z}{z}\\) at \\(z = 0\\).</li>
            <li><strong>Pole of order \\(m\\)</strong>: \\(a_{-m} \\neq 0\\) but \\(a_n = 0\\) for all \\(n < -m\\). The principal part has finitely many terms. Example: \\(\\frac{1}{z^2}\\) at \\(z = 0\\) (pole of order 2).</li>
            <li><strong>Essential singularity</strong>: \\(a_n \\neq 0\\) for infinitely many \\(n < 0\\). The principal part is an infinite series. Example: \\(e^{1/z}\\) at \\(z = 0\\).</li>
        </ol>
    </div>
</div>

<p>The three types exhibit dramatically different behavior. Near a removable singularity, \\(f\\) is bounded. Near a pole, \\(|f(z)| \\to \\infty\\). Near an essential singularity, \\(f\\) takes on nearly every complex value, a phenomenon we will make precise in Section 6.</p>

<div class="env-block example">
    <div class="env-title">Example: A Gallery of Singularities</div>
    <div class="env-body">
        <p>All at \\(z = 0\\):</p>
        <ul>
            <li>\\(\\frac{\\sin z}{z} = 1 - \\frac{z^2}{6} + \\frac{z^4}{120} - \\cdots\\): <strong>removable</strong> (no negative powers). Defining \\(f(0) = 1\\) makes the function entire.</li>
            <li>\\(\\frac{1}{z^3}\\): <strong>pole of order 3</strong>. The Laurent series is just the single term \\(z^{-3}\\).</li>
            <li>\\(e^{1/z} = 1 + \\frac{1}{z} + \\frac{1}{2z^2} + \\frac{1}{6z^3} + \\cdots\\): <strong>essential</strong>. Infinitely many negative powers, each \\(a_{-n} = 1/n!\\).</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-singularity-zoo"></div>
`,
            visualizations: [
                {
                    id: 'viz-singularity-zoo',
                    title: 'Singularity Zoo: Domain Coloring Gallery',
                    description: 'Domain coloring reveals the nature of singularities at a glance. Color encodes the argument of \\(f(z)\\), brightness encodes modulus. Compare: removable (smooth), pole (color winds around), essential (wild oscillation near the singularity).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });

                        var funcIdx = 0;
                        var funcs = [
                            {
                                name: 'sin(z)/z  (removable)',
                                f: function(re, im) {
                                    // sin(z)/z
                                    var zr = re, zi = im;
                                    var mag2 = zr * zr + zi * zi;
                                    if (mag2 < 1e-12) return [1, 0];
                                    // sin(z) = (e^(iz) - e^(-iz)) / (2i)
                                    var eizr = Math.exp(-zi), eizRe = eizr * Math.cos(zr), eizIm = eizr * Math.sin(zr);
                                    var emizr = Math.exp(zi), emizRe = emizr * Math.cos(-zr), emizIm = emizr * Math.sin(-zr);
                                    var sinRe = (eizIm - emizIm) / (-2);
                                    var sinIm = (eizRe - emizRe) / 2;
                                    // Actually: sin(z) = (e^{iz} - e^{-iz})/(2i)
                                    // = Im parts... let me just compute directly
                                    // sin(a+bi) = sin(a)cosh(b) + i cos(a)sinh(b)
                                    var sr = Math.sin(zr) * Math.cosh(zi);
                                    var si = Math.cos(zr) * Math.sinh(zi);
                                    // divide by z
                                    var d = mag2;
                                    return [(sr * zr + si * zi) / d, (si * zr - sr * zi) / d];
                                }
                            },
                            {
                                name: '1/z\u00B2  (pole, order 2)',
                                f: function(re, im) {
                                    // 1/z^2
                                    var zr = re, zi = im;
                                    var mag2 = zr * zr + zi * zi;
                                    if (mag2 < 1e-12) return [1e6, 0];
                                    // z^2 = (zr + i zi)^2 = zr^2 - zi^2 + 2i zr zi
                                    var z2r = zr * zr - zi * zi;
                                    var z2i = 2 * zr * zi;
                                    var d = z2r * z2r + z2i * z2i;
                                    if (d < 1e-15) return [1e6, 0];
                                    return [z2r / d, -z2i / d];
                                }
                            },
                            {
                                name: 'e^(1/z)  (essential)',
                                f: function(re, im) {
                                    var mag2 = re * re + im * im;
                                    if (mag2 < 1e-12) return [1e6, 0];
                                    // 1/z = (re - i*im) / mag2
                                    var invRe = re / mag2;
                                    var invIm = -im / mag2;
                                    // e^(1/z) = e^(invRe) * (cos(invIm) + i sin(invIm))
                                    var expR = Math.exp(Math.min(invRe, 50));
                                    return [expR * Math.cos(invIm), expR * Math.sin(invIm)];
                                }
                            }
                        ];

                        VizEngine.createButton(controls, 'sin(z)/z', function() { funcIdx = 0; draw(); });
                        VizEngine.createButton(controls, '1/z\u00B2', function() { funcIdx = 1; draw(); });
                        VizEngine.createButton(controls, 'e^(1/z)', function() { funcIdx = 2; draw(); });

                        function draw() {
                            var xR = [-3.5, 3.5];
                            var yR = [-2.8, 2.8];
                            viz.drawDomainColoring(funcs[funcIdx].f, xR, yR);

                            // Label
                            var ctx = viz.ctx;
                            ctx.save();
                            ctx.fillStyle = 'rgba(12,12,32,0.7)';
                            ctx.fillRect(0, 0, viz.width, 32);
                            ctx.restore();
                            viz.screenText(funcs[funcIdx].name, viz.width / 2, 18, viz.colors.white, 14);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Classify the singularity of \\(f(z) = \\frac{z^2 - 1}{z - 1}\\) at \\(z = 1\\).',
                    hint: 'Factor the numerator.',
                    solution: '\\(f(z) = \\frac{(z-1)(z+1)}{z-1} = z + 1\\) for \\(z \\neq 1\\). The Laurent series at \\(z = 1\\) has no negative powers. Setting \\(f(1) = 2\\) removes the singularity, so it is <strong>removable</strong>.'
                },
                {
                    question: 'Classify the singularity of \\(f(z) = \\frac{\\cos z - 1}{z^2}\\) at \\(z = 0\\).',
                    hint: 'Expand \\(\\cos z\\) as a Taylor series and subtract 1.',
                    solution: '\\(\\cos z - 1 = -\\frac{z^2}{2} + \\frac{z^4}{24} - \\cdots\\), so \\(f(z) = -\\frac{1}{2} + \\frac{z^2}{24} - \\cdots\\). No negative powers appear: the singularity is <strong>removable</strong>, with \\(f(0) = -1/2\\).'
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

<div class="env-block intuition">
    <div class="env-title">The Idea</div>
    <div class="env-body">
        <p>A removable singularity is a "fake" singularity: the function is undefined at the point, but its values nearby are perfectly consistent with analytic continuation. The function \\(\\sin z / z\\) is undefined at \\(z = 0\\), but \\(\\lim_{z \\to 0} \\sin z / z = 1\\), and defining \\(f(0) = 1\\) makes \\(f\\) entire. The singularity is removable because the function is bounded near the point.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.3 (Riemann's Removable Singularity Theorem)</div>
    <div class="env-body">
        <p>Let \\(z_0\\) be an isolated singularity of \\(f\\). The following are equivalent:</p>
        <ol>
            <li>\\(z_0\\) is a removable singularity.</li>
            <li>\\(f\\) is bounded in some punctured neighborhood of \\(z_0\\).</li>
            <li>\\(\\lim_{z \\to z_0} (z - z_0) f(z) = 0\\).</li>
            <li>\\(\\lim_{z \\to z_0} f(z)\\) exists (and is finite).</li>
        </ol>
        <p>If any of these hold, then defining \\(f(z_0) = \\lim_{z \\to z_0} f(z)\\) extends \\(f\\) to an analytic function on a full neighborhood of \\(z_0\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">The Proof Idea</div>
    <div class="env-body">
        <p>The key insight in the proof of (2) \\(\\Rightarrow\\) (1) is: define \\(g(z) = (z - z_0)^2 f(z)\\) for \\(z \\neq z_0\\) and \\(g(z_0) = 0\\). If \\(f\\) is bounded near \\(z_0\\), then \\(g\\) is continuous at \\(z_0\\) and analytic elsewhere. One can show \\(g\\) is analytic at \\(z_0\\) (by Morera's theorem or direct verification), so \\(g\\) has a Taylor series \\(g(z) = a_2(z-z_0)^2 + a_3(z-z_0)^3 + \\cdots\\). Dividing by \\((z-z_0)^2\\) gives the Taylor (not Laurent!) series for \\(f\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Detecting Removable Singularities</div>
    <div class="env-body">
        <p>Is the singularity of \\(f(z) = \\frac{e^z - 1 - z}{z^2}\\) at \\(z = 0\\) removable?</p>
        <p>Expand: \\(e^z - 1 - z = \\frac{z^2}{2} + \\frac{z^3}{6} + \\cdots\\), so \\(f(z) = \\frac{1}{2} + \\frac{z}{6} + \\cdots\\). No negative powers, so the singularity is removable with \\(f(0) = 1/2\\).</p>
        <p>Alternatively, since \\(\\lim_{z \\to 0} f(z) = 1/2\\) is finite, Riemann's theorem applies directly.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-removable-demo"></div>
`,
            visualizations: [
                {
                    id: 'viz-removable-demo',
                    title: 'Removable Singularity: sin(z)/z',
                    description: 'The real part of \\(\\sin(z)/z\\) along the real axis shows the function approaching 1 smoothly as \\(z \\to 0\\). Compare with \\(1/z\\) (pole) where the function blows up. Toggle between functions.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380, scale: 50,
                            originX: 280, originY: 280
                        });
                        var showPole = false;

                        VizEngine.createButton(controls, 'sin(z)/z', function() { showPole = false; draw(); });
                        VizEngine.createButton(controls, '1/z (pole)', function() { showPole = true; draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            if (showPole) {
                                viz.drawFunction(function(x) { return 1 / x; }, -5, -0.05, viz.colors.red, 2);
                                viz.drawFunction(function(x) { return 1 / x; }, 0.05, 5, viz.colors.red, 2);
                                viz.screenText('f(z) = 1/z   (pole of order 1 at z = 0)', viz.width / 2, 22, viz.colors.red, 13);
                                viz.screenText('|f(z)| \u2192 \u221e as z \u2192 0', viz.width / 2, 42, viz.colors.text, 11);
                            } else {
                                viz.drawFunction(function(x) {
                                    if (Math.abs(x) < 1e-10) return 1;
                                    return Math.sin(x) / x;
                                }, -5, 5, viz.colors.teal, 2.5);
                                // Mark the "filled in" point
                                viz.drawPoint(0, 1, viz.colors.yellow, 'f(0) = 1', 5);
                                viz.screenText('f(z) = sin(z)/z   (removable singularity at z = 0)', viz.width / 2, 22, viz.colors.teal, 13);
                                viz.screenText('Bounded near z = 0, limit = 1', viz.width / 2, 42, viz.colors.text, 11);
                            }

                            viz.screenText('Re(z)', viz.width - 30, viz.originY - 10, viz.colors.text, 11);
                            viz.screenText('Re f(z)', viz.originX + 24, 14, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that if \\(f\\) has a removable singularity at \\(z_0\\) and \\(f(z) \\neq 0\\) in some punctured neighborhood, then \\(1/f\\) has either a removable singularity or a pole at \\(z_0\\).',
                    hint: 'Let \\(L = \\lim_{z \\to z_0} f(z)\\). Consider the cases \\(L \\neq 0\\) and \\(L = 0\\) separately.',
                    solution: 'If \\(L \\neq 0\\), then \\(1/f(z) \\to 1/L\\), so \\(1/f\\) has a removable singularity. If \\(L = 0\\), then \\(|1/f(z)| \\to \\infty\\), so \\(1/f\\) has a pole. The order of the pole equals the order of the zero of \\(f\\) at \\(z_0\\).'
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

<div class="env-block definition">
    <div class="env-title">Definition (Pole of Order \\(m\\))</div>
    <div class="env-body">
        <p>An isolated singularity \\(z_0\\) of \\(f\\) is a <strong>pole of order \\(m\\)</strong> (where \\(m \\ge 1\\)) if the Laurent series of \\(f\\) at \\(z_0\\) has the form</p>
        \\[
        f(z) = \\frac{a_{-m}}{(z-z_0)^m} + \\frac{a_{-m+1}}{(z-z_0)^{m-1}} + \\cdots + \\frac{a_{-1}}{z-z_0} + a_0 + a_1(z-z_0) + \\cdots
        \\]
        <p>with \\(a_{-m} \\neq 0\\). A pole of order 1 is called a <strong>simple pole</strong>. A pole of order 2 is a <strong>double pole</strong>.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.4 (Characterizations of Poles)</div>
    <div class="env-body">
        <p>Let \\(z_0\\) be an isolated singularity of \\(f\\). The following are equivalent:</p>
        <ol>
            <li>\\(z_0\\) is a pole of order \\(m\\).</li>
            <li>\\(\\lim_{z \\to z_0} |f(z)| = \\infty\\), and \\((z - z_0)^m f(z)\\) has a removable singularity at \\(z_0\\) with non-zero limit.</li>
            <li>There exists a function \\(g\\) analytic at \\(z_0\\) with \\(g(z_0) \\neq 0\\) such that \\(f(z) = \\frac{g(z)}{(z - z_0)^m}\\) near \\(z_0\\).</li>
            <li>\\(1/f\\) has a zero of order \\(m\\) at \\(z_0\\).</li>
        </ol>
    </div>
</div>

<p>The equivalence of (1) and (4) is especially useful: poles and zeros are "inverses" of each other. A zero of order \\(m\\) at \\(z_0\\) means \\(f(z) = (z - z_0)^m g(z)\\) with \\(g(z_0) \\neq 0\\); a pole of order \\(m\\) means \\(f(z) = (z - z_0)^{-m} g(z)\\) with \\(g(z_0) \\neq 0\\).</p>

<div class="env-block example">
    <div class="env-title">Example: Finding Pole Orders</div>
    <div class="env-body">
        <p><strong>(a)</strong> \\(f(z) = \\frac{z+1}{z^3(z^2+1)}\\) at \\(z = 0\\): The denominator has a zero of order 3 at \\(z = 0\\); the numerator is non-zero there. So \\(f\\) has a pole of order 3.</p>
        <p><strong>(b)</strong> \\(f(z) = \\frac{z+1}{z^3(z^2+1)}\\) at \\(z = i\\): The denominator vanishes to order 1 (simple zero), the numerator \\(i + 1 \\neq 0\\). So \\(f\\) has a simple pole at \\(z = i\\).</p>
        <p><strong>(c)</strong> \\(f(z) = \\frac{1 - \\cos z}{z^4}\\) at \\(z = 0\\): Since \\(1 - \\cos z = \\frac{z^2}{2} - \\frac{z^4}{24} + \\cdots\\), the numerator has a zero of order 2. So \\(f\\) has a pole of order \\(4 - 2 = 2\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-pole-order"></div>
`,
            visualizations: [
                {
                    id: 'viz-pole-order',
                    title: 'Poles of Different Orders: Domain Coloring',
                    description: 'Near a pole of order \\(m\\), the argument of \\(f(z)\\) winds around \\(m\\) times as \\(z\\) circles the singularity. Count the color cycles! Compare \\(1/z\\) (1 cycle), \\(1/z^2\\) (2 cycles), \\(1/z^3\\) (3 cycles).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });
                        var order = 1;

                        VizEngine.createSlider(controls, 'Pole order m', 1, 5, order, 1, function(v) {
                            order = Math.round(v);
                            draw();
                        });

                        function draw() {
                            var m = order;
                            viz.drawDomainColoring(function(re, im) {
                                var mag2 = re * re + im * im;
                                if (mag2 < 1e-14) return [1e8, 0];
                                // Compute z^m
                                var zr = re, zi = im;
                                var pr = 1, pi = 0;
                                for (var k = 0; k < m; k++) {
                                    var nr = pr * zr - pi * zi;
                                    var ni = pr * zi + pi * zr;
                                    pr = nr; pi = ni;
                                }
                                // 1/z^m = conj(z^m)/|z^m|^2
                                var d = pr * pr + pi * pi;
                                if (d < 1e-15) return [1e8, 0];
                                return [pr / d, -pi / d];
                            }, [-3, 3], [-2.5, 2.5]);

                            // Overlay a small circle to help count windings
                            var ctx = viz.ctx;
                            var cx = viz.width / 2, cy = viz.height / 2;
                            ctx.beginPath();
                            ctx.arc(cx, cy, 40, 0, Math.PI * 2);
                            ctx.strokeStyle = 'rgba(255,255,255,0.4)';
                            ctx.lineWidth = 1;
                            ctx.stroke();

                            // Label
                            ctx.save();
                            ctx.fillStyle = 'rgba(12,12,32,0.75)';
                            ctx.fillRect(0, 0, viz.width, 36);
                            ctx.restore();
                            viz.screenText('1/z' + (m > 1 ? '\u2070\u00B9\u00B2\u00B3\u2074\u2075'.charAt(m) || '^' + m : '') + '   (pole of order ' + m + ': ' + m + ' color winding' + (m > 1 ? 's' : '') + ')', viz.width / 2, 20, viz.colors.white, 14);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the order of the pole of \\(f(z) = \\frac{z}{\\sin^2 z}\\) at \\(z = 0\\).',
                    hint: '\\(\\sin z\\) has a simple zero at \\(z = 0\\), so \\(\\sin^2 z\\) has a zero of order 2. What about the numerator?',
                    solution: '\\(\\sin^2 z\\) has a zero of order 2 at \\(z = 0\\), while the numerator \\(z\\) has a zero of order 1. So \\(f(z) = z / \\sin^2 z\\) has a pole of order \\(2 - 1 = 1\\) (simple pole). Verification: \\(z/\\sin^2 z = z/(z - z^3/6 + \\cdots)^2 = z/(z^2(1 - z^2/6 + \\cdots)^2) = 1/(z(1 - z^2/3 + \\cdots)) = \\frac{1}{z} + \\frac{z}{3} + \\cdots\\).'
                },
                {
                    question: 'Let \\(f(z) = \\frac{(z-1)^2}{\\sin(\\pi z)}\\). Find and classify all singularities of \\(f\\).',
                    hint: '\\(\\sin(\\pi z) = 0\\) when \\(z\\) is an integer. At each integer, determine the zero order of the numerator and denominator.',
                    solution: '\\(\\sin(\\pi z)\\) has simple zeros at every integer \\(z = n\\). The numerator \\((z-1)^2\\) has a double zero at \\(z = 1\\) and is non-zero elsewhere. At \\(z = 1\\): numerator has order 2, denominator order 1, so \\(f\\) has a <strong>simple zero</strong> (not a singularity). At \\(z = n \\neq 1\\): denominator order 1, numerator order 0 (non-zero), so \\(f\\) has a <strong>simple pole</strong>.'
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

<div class="env-block intuition">
    <div class="env-title">The Wildness of Essential Singularities</div>
    <div class="env-body">
        <p>Near a removable singularity, a function is well-behaved (bounded). Near a pole, it blows up in a controlled way (like \\(1/z^m\\)). But near an essential singularity, the function goes completely wild: it takes on nearly every complex value infinitely many times in every punctured neighborhood of the singularity. This is not a pathology; it is a precise mathematical theorem.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.5 (Casorati-Weierstrass)</div>
    <div class="env-body">
        <p>If \\(z_0\\) is an essential singularity of \\(f\\), then for every \\(w \\in \\mathbb{C}\\) and every \\(\\varepsilon > 0\\), every punctured neighborhood of \\(z_0\\) contains a point \\(z\\) with \\(|f(z) - w| < \\varepsilon\\).</p>
        <p>In other words, the image \\(f(\\{z : 0 < |z - z_0| < \\delta\\})\\) is <strong>dense</strong> in \\(\\mathbb{C}\\) for every \\(\\delta > 0\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>Suppose for contradiction that \\(f\\) avoids a disk \\(|f(z) - w_0| < \\varepsilon\\) in some punctured neighborhood of \\(z_0\\). Then \\(g(z) = 1/(f(z) - w_0)\\) is bounded near \\(z_0\\), so \\(g\\) has a removable singularity there. If \\(g(z_0) \\neq 0\\), then \\(f = w_0 + 1/g\\) has a removable singularity. If \\(g(z_0) = 0\\) (zero of order \\(m\\)), then \\(f = w_0 + 1/g\\) has a pole of order \\(m\\). Either way, \\(z_0\\) is not essential, contradicting our assumption.</p>
    </div>
</div>

<p>The Casorati-Weierstrass theorem is dramatically strengthened by Picard's theorem:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.6 (Picard's Great Theorem, stated without proof)</div>
    <div class="env-body">
        <p>If \\(z_0\\) is an essential singularity of \\(f\\), then in every punctured neighborhood of \\(z_0\\), \\(f\\) takes on every complex value infinitely many times, with <strong>at most one exception</strong>.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(e^{1/z}\\) near \\(z = 0\\)</div>
    <div class="env-body">
        <p>The function \\(e^{1/z}\\) has an essential singularity at \\(z = 0\\). Let us verify the Casorati-Weierstrass theorem for a specific target: can \\(e^{1/z}\\) come close to, say, \\(-5\\) near \\(z = 0\\)?</p>
        <p>We need \\(e^{1/z} = -5\\), i.e., \\(1/z = \\log(-5) = \\ln 5 + i(\\pi + 2\\pi k)\\) for integer \\(k\\). So \\(z_k = \\frac{1}{\\ln 5 + i(2k+1)\\pi}\\). As \\(k \\to \\pm\\infty\\), \\(z_k \\to 0\\). So \\(e^{1/z}\\) not only comes close to \\(-5\\) but actually <em>equals</em> \\(-5\\) infinitely often near \\(z = 0\\).</p>
        <p>The only value that \\(e^{1/z}\\) never takes is \\(0\\) (since \\(e^w \\neq 0\\) for all \\(w\\)). This is Picard's "at most one exception."</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-essential-picard"></div>
`,
            visualizations: [
                {
                    id: 'viz-essential-picard',
                    title: 'Essential Singularity: e^(1/z) near z = 0',
                    description: 'Domain coloring of \\(e^{1/z}\\) near the origin. Every color (= every complex argument) appears in every punctured neighborhood of \\(z = 0\\), illustrating Picard\'s theorem. Zoom in to see the pattern repeat infinitely.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });
                        var zoom = 1.0;

                        VizEngine.createSlider(controls, 'Zoom', 0.1, 5.0, zoom, 0.1, function(v) {
                            zoom = v;
                            draw();
                        });

                        function draw() {
                            var halfW = 3.0 / zoom;
                            var halfH = 2.5 / zoom;
                            viz.drawDomainColoring(function(re, im) {
                                var mag2 = re * re + im * im;
                                if (mag2 < 1e-14) return [0, 0];
                                var invRe = re / mag2;
                                var invIm = -im / mag2;
                                var expR = Math.exp(Math.min(Math.max(invRe, -50), 50));
                                return [expR * Math.cos(invIm), expR * Math.sin(invIm)];
                            }, [-halfW, halfW], [-halfH, halfH]);

                            var ctx = viz.ctx;
                            ctx.save();
                            ctx.fillStyle = 'rgba(12,12,32,0.75)';
                            ctx.fillRect(0, 0, viz.width, 50);
                            ctx.restore();
                            viz.screenText('e^(1/z): essential singularity at z = 0', viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('Every color appears in every neighborhood of z = 0 (Picard)', viz.width / 2, 38, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(\\sin(1/z)\\) has an essential singularity at \\(z = 0\\). What is the exceptional value in Picard\'s theorem for this function?',
                    hint: 'Write the Laurent series of \\(\\sin(1/z)\\) by substituting \\(w = 1/z\\) into the Taylor series of \\(\\sin w\\). For Picard, think about whether \\(\\sin w = c\\) has solutions for all \\(c \\in \\mathbb{C}\\).',
                    solution: '\\(\\sin(1/z) = \\sum_{n=0}^\\infty \\frac{(-1)^n}{(2n+1)!} z^{-(2n+1)} = \\frac{1}{z} - \\frac{1}{6z^3} + \\frac{1}{120z^5} - \\cdots\\). Since there are infinitely many negative powers, \\(z = 0\\) is essential. For Picard: the equation \\(\\sin w = c\\) has solutions for every \\(c \\in \\mathbb{C}\\) (the sine function is surjective onto \\(\\mathbb{C}\\)). So \\(\\sin(1/z)\\) takes every value infinitely often near \\(z = 0\\), with <strong>no exceptional value</strong>. (Picard says "at most one," and this function achieves "none.")'
                },
                {
                    question: 'Prove that if \\(z_0\\) is an essential singularity of \\(f\\), then \\(z_0\\) is also an essential singularity of \\(f^2\\).',
                    hint: 'If \\(f^2\\) had a pole or removable singularity at \\(z_0\\), what would that imply about \\(f\\)?',
                    solution: 'If \\(f^2\\) had a removable singularity at \\(z_0\\), then \\(f^2\\) is bounded near \\(z_0\\), so \\(|f| \\le M\\) near \\(z_0\\), making \\(z_0\\) removable for \\(f\\), a contradiction. If \\(f^2\\) had a pole of order \\(k\\), then \\(|f^2(z)| \\sim C|z - z_0|^{-k}\\), so \\(|f(z)| \\sim \\sqrt{C}|z - z_0|^{-k/2}\\), meaning \\(|f(z)| \\to \\infty\\), forcing \\(z_0\\) to be a pole for \\(f\\), a contradiction. So \\(z_0\\) must be essential for \\(f^2\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: The Bridge — Residues
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'The Residue',
            content: `
<h2>The Residue: Bridge to Integration</h2>

<div class="env-block intuition">
    <div class="env-title">One Coefficient Rules Them All</div>
    <div class="env-body">
        <p>Of all the Laurent coefficients \\(a_n\\), one stands out: \\(a_{-1}\\), the coefficient of \\((z - z_0)^{-1}\\). This single number, called the <strong>residue</strong>, is the only Laurent coefficient that survives integration around a closed curve. All other terms \\((z - z_0)^n\\) for \\(n \\neq -1\\) integrate to zero around a circle. The residue is the bridge between Laurent series (local information) and contour integrals (global information).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Residue)</div>
    <div class="env-body">
        <p>If \\(z_0\\) is an isolated singularity of \\(f\\) with Laurent expansion \\(\\sum a_n(z - z_0)^n\\), the <strong>residue</strong> of \\(f\\) at \\(z_0\\) is</p>
        \\[
        \\operatorname{Res}(f, z_0) = a_{-1} = \\frac{1}{2\\pi i} \\oint_\\gamma f(z)\\, dz,
        \\]
        <p>where \\(\\gamma\\) is any positively oriented simple closed curve encircling \\(z_0\\) and no other singularity.</p>
    </div>
</div>

<h3>Why Only \\(a_{-1}\\) Survives</h3>

<p>On the circle \\(\\gamma: z = z_0 + re^{i\\theta}\\), \\(0 \\le \\theta \\le 2\\pi\\):</p>
\\[
\\oint_\\gamma (z - z_0)^n\\, dz = \\int_0^{2\\pi} r^n e^{in\\theta} \\cdot ire^{i\\theta}\\, d\\theta = ir^{n+1} \\int_0^{2\\pi} e^{i(n+1)\\theta}\\, d\\theta.
\\]
<p>When \\(n \\neq -1\\), the integral \\(\\int_0^{2\\pi} e^{ik\\theta}\\, d\\theta = 0\\) for \\(k \\neq 0\\). When \\(n = -1\\), \\(k = 0\\), and the integral equals \\(2\\pi\\). So</p>
\\[
\\oint_\\gamma (z - z_0)^n\\, dz = \\begin{cases} 2\\pi i & \\text{if } n = -1, \\\\ 0 & \\text{if } n \\neq -1. \\end{cases}
\\]

<p>This is why integrating the full Laurent series term by term gives \\(\\oint_\\gamma f(z)\\, dz = 2\\pi i \\cdot a_{-1}\\).</p>

<h3>Computing Residues</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 10.7 (Residue Formulas)</div>
    <div class="env-body">
        <p><strong>(a) Simple pole</strong>: If \\(f\\) has a simple pole at \\(z_0\\),</p>
        \\[
        \\operatorname{Res}(f, z_0) = \\lim_{z \\to z_0} (z - z_0) f(z).
        \\]
        <p><strong>(b) Pole of order \\(m\\)</strong>: If \\(f\\) has a pole of order \\(m\\) at \\(z_0\\),</p>
        \\[
        \\operatorname{Res}(f, z_0) = \\frac{1}{(m-1)!} \\lim_{z \\to z_0} \\frac{d^{m-1}}{dz^{m-1}}\\left[(z - z_0)^m f(z)\\right].
        \\]
        <p><strong>(c) Quotient rule</strong>: If \\(f(z) = p(z)/q(z)\\) where \\(p(z_0) \\neq 0\\) and \\(q\\) has a simple zero at \\(z_0\\),</p>
        \\[
        \\operatorname{Res}(f, z_0) = \\frac{p(z_0)}{q'(z_0)}.
        \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Computing Residues</div>
    <div class="env-body">
        <p><strong>(a)</strong> \\(f(z) = \\frac{e^z}{z^2}\\) at \\(z = 0\\): This is a pole of order 2. \\(\\operatorname{Res}(f,0) = \\lim_{z \\to 0} \\frac{d}{dz}[z^2 \\cdot e^z/z^2] = \\lim_{z \\to 0} e^z = 1\\). Alternatively, from the Laurent series: \\(e^z/z^2 = z^{-2} + z^{-1} + 1/2 + \\cdots\\), so \\(a_{-1} = 1\\).</p>
        <p><strong>(b)</strong> \\(f(z) = \\frac{1}{z^2 + 1}\\) at \\(z = i\\): Simple pole. By the quotient rule, \\(\\operatorname{Res}(f, i) = \\frac{1}{2i} = -i/2\\).</p>
        <p><strong>(c)</strong> \\(f(z) = e^{1/z}\\) at \\(z = 0\\): Essential singularity. From the Laurent series \\(e^{1/z} = 1 + z^{-1} + z^{-2}/2 + \\cdots\\), the residue is \\(a_{-1} = 1\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Looking Ahead</div>
    <div class="env-body">
        <p>The <strong>Residue Theorem</strong> (Chapter 11) combines the residue concept with Cauchy's theorem: if \\(\\gamma\\) encloses singularities \\(z_1, \\ldots, z_k\\), then</p>
        \\[
        \\oint_\\gamma f(z)\\, dz = 2\\pi i \\sum_{j=1}^k \\operatorname{Res}(f, z_j).
        \\]
        <p>This reduces the global problem of evaluating contour integrals to the local problem of finding residues, which is why the Laurent expansion is so powerful.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-partial-fractions"></div>
`,
            visualizations: [
                {
                    id: 'viz-partial-fractions',
                    title: 'Partial Fractions and Residues',
                    description: 'A rational function decomposes into partial fractions, each corresponding to a pole. The coefficient of \\(1/(z - z_k)\\) in the partial fraction expansion is exactly the residue at \\(z_k\\). Drag the poles to see how residues change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 50 });

                        // f(z) = 1/((z-a)(z-b)) with draggable poles
                        var poleA = viz.addDraggable('a', -1.5, 0, viz.colors.red, 8);
                        var poleB = viz.addDraggable('b', 1.5, 0, viz.colors.orange, 8);

                        viz.animate(function() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var ax = poleA.x, ay = poleA.y;
                            var bx = poleB.x, by = poleB.y;

                            // Draw poles
                            viz.drawPoint(ax, ay, viz.colors.red, null, 6);
                            viz.drawPoint(bx, by, viz.colors.orange, null, 6);

                            // Compute residues: Res at a = 1/(a-b), Res at b = 1/(b-a)
                            // (a - b) is complex
                            var dabr = ax - bx, dabi = ay - by;
                            var dabMag2 = dabr * dabr + dabi * dabi;
                            var resAr, resAi, resBr, resBi;
                            if (dabMag2 < 0.01) {
                                resAr = 0; resAi = 0; resBr = 0; resBi = 0;
                            } else {
                                // 1/(a-b) = conj(a-b)/|a-b|^2
                                resAr = dabr / dabMag2;
                                resAi = -dabi / dabMag2;
                                resBr = -dabr / dabMag2;
                                resBi = dabi / dabMag2;
                            }

                            // Draw small circles around poles
                            viz.drawCircle(ax, ay, 0.4, null, viz.colors.red + '88', 1);
                            viz.drawCircle(bx, by, 0.4, null, viz.colors.orange + '88', 1);

                            // Labels
                            function fmtComplex(re, im) {
                                var s = re.toFixed(2);
                                if (Math.abs(im) > 0.005) {
                                    s += (im >= 0 ? ' + ' : ' \u2212 ') + Math.abs(im).toFixed(2) + 'i';
                                }
                                return s;
                            }

                            viz.screenText('f(z) = 1/((z \u2212 a)(z \u2212 b))', viz.width / 2, 18, viz.colors.white, 14);

                            viz.screenText('a = ' + fmtComplex(ax, ay), 90, viz.height - 55, viz.colors.red, 12, 'left');
                            viz.screenText('Res(f, a) = ' + fmtComplex(resAr, resAi), 90, viz.height - 38, viz.colors.red, 12, 'left');

                            viz.screenText('b = ' + fmtComplex(bx, by), viz.width - 90, viz.height - 55, viz.colors.orange, 12, 'right');
                            viz.screenText('Res(f, b) = ' + fmtComplex(resBr, resBi), viz.width - 90, viz.height - 38, viz.colors.orange, 12, 'right');

                            // Verify sum of residues
                            var sumR = resAr + resBr, sumI = resAi + resBi;
                            viz.screenText('Sum of residues: ' + fmtComplex(sumR, sumI) + '  (always 0 for this function)', viz.width / 2, viz.height - 16, viz.colors.teal, 11);

                            viz.drawDraggables();
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\operatorname{Res}\\left(\\frac{z^2}{(z-1)(z-2)(z-3)}, z\\right)\\) at each of the three poles.',
                    hint: 'All poles are simple. Use the quotient rule or the limit formula for simple poles.',
                    solution: 'Each pole is simple. \\(\\operatorname{Res}(f, 1) = \\frac{1^2}{(1-2)(1-3)} = \\frac{1}{2}\\). \\(\\operatorname{Res}(f, 2) = \\frac{4}{(2-1)(2-3)} = -4\\). \\(\\operatorname{Res}(f, 3) = \\frac{9}{(3-1)(3-2)} = \\frac{9}{2}\\). Check: \\(\\frac{1}{2} - 4 + \\frac{9}{2} = 1\\), which equals the leading coefficient ratio (as expected for a degree-2/degree-3 rational function).'
                },
                {
                    question: 'Compute the residue of \\(f(z) = \\frac{\\cos z}{z^3}\\) at \\(z = 0\\).',
                    hint: 'Expand \\(\\cos z\\) in its Taylor series and divide by \\(z^3\\). Read off \\(a_{-1}\\).',
                    solution: '\\(\\cos z = 1 - z^2/2 + z^4/24 - \\cdots\\), so \\(\\cos z / z^3 = z^{-3} - z^{-1}/2 + z/24 - \\cdots\\). The coefficient of \\(z^{-1}\\) is \\(-1/2\\), so \\(\\operatorname{Res}(f, 0) = -1/2\\).'
                },
                {
                    question: 'Compute \\(\\displaystyle\\oint_{|z|=2} \\frac{e^z}{z(z-1)} \\, dz\\) using residues.',
                    hint: 'Find the singularities inside \\(|z| = 2\\), compute their residues, and apply \\(\\oint f = 2\\pi i \\sum \\text{Res}\\).',
                    solution: 'Singularities inside \\(|z| = 2\\): simple poles at \\(z = 0\\) and \\(z = 1\\). \\(\\operatorname{Res}(f, 0) = \\lim_{z \\to 0} z \\cdot \\frac{e^z}{z(z-1)} = \\frac{e^0}{0-1} = -1\\). \\(\\operatorname{Res}(f, 1) = \\lim_{z \\to 1} (z-1) \\cdot \\frac{e^z}{z(z-1)} = \\frac{e^1}{1} = e\\). So \\(\\oint_{|z|=2} \\frac{e^z}{z(z-1)} dz = 2\\pi i(-1 + e) = 2\\pi i(e - 1)\\).'
                }
            ]
        }
    ]
});
