window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'Entire & Meromorphic Functions',
    subtitle: 'Weierstrass products, Mittag-Leffler, and the order of growth',
    sections: [
        // ================================================================
        // SECTION 0: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Motivation: Factoring Entire Functions</h2>

<div class="env-block intuition">
    <div class="env-title">The Central Question</div>
    <div class="env-body">
        <p>Every polynomial \\(p(z)\\) of degree \\(n\\) factors completely over \\(\\mathbb{C}\\):
        \\[p(z) = c\\,(z-z_1)(z-z_2)\\cdots(z-z_n).\\]
        The zeros tell you everything. Can we do the same for <em>entire functions</em>?</p>
    </div>
</div>

<p>An <strong>entire function</strong> is a function holomorphic on all of \\(\\mathbb{C}\\). Examples include polynomials, \\(e^z\\), \\(\\sin z\\), \\(\\cos z\\), and \\(e^{e^z}\\). A <strong>meromorphic function</strong> is holomorphic except for isolated poles, like \\(\\tan z\\), \\(\\cot z\\), and the Gamma function \\(\\Gamma(z)\\).</p>

<p>The fundamental question of this chapter: can we <em>reconstruct</em> an entire function from knowledge of its zeros, or a meromorphic function from knowledge of its poles?</p>

<h3>What Goes Wrong with Infinite Products?</h3>

<p>Naively one might write \\(\\sin z = C \\cdot z \\prod_{n \\neq 0}(1 - z/n\\pi)\\). But the product
\\(\\prod_{n=1}^\\infty (1 - z/n\\pi)\\) diverges. The convergence factor \\(e^{z/n\\pi}\\) must be inserted:
\\[
\\sin z = z \\prod_{n=1}^\\infty \\Bigl(1 - \\tfrac{z}{n\\pi}\\Bigr)\\Bigl(1 + \\tfrac{z}{n\\pi}\\Bigr)
= z \\prod_{n=1}^\\infty \\Bigl(1 - \\tfrac{z^2}{n^2\\pi^2}\\Bigr).
\\]
This converges because the pairs \\(\\pm n\\pi\\) symmetrize the exponents away. The <em>Weierstrass elementary factors</em> are the general mechanism.</p>

<h3>The Two Dual Problems</h3>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
<thead><tr style="border-bottom:1px solid #30363d;">
<th style="text-align:left;padding:8px;">Problem</th>
<th style="text-align:left;padding:8px;">Given</th>
<th style="text-align:left;padding:8px;">Construct</th>
<th style="text-align:left;padding:8px;">Tool</th>
</tr></thead>
<tbody>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:8px;">Prescribed zeros</td>
<td style="padding:8px;">Sequence \\(\\{a_n\\}\\) with \\(|a_n|\\to\\infty\\)</td>
<td style="padding:8px;">Entire \\(f\\) with \\(f(a_n)=0\\)</td>
<td style="padding:8px;">Weierstrass product</td>
</tr>
<tr>
<td style="padding:8px;">Prescribed poles</td>
<td style="padding:8px;">Sequence \\(\\{b_n\\}\\), principal parts \\(P_n\\)</td>
<td style="padding:8px;">Meromorphic \\(g\\) with those poles</td>
<td style="padding:8px;">Mittag-Leffler theorem</td>
</tr>
</tbody>
</table>

<p>Beyond existence, the <strong>Hadamard factorization theorem</strong> gives a remarkably tight description: if \\(f\\) has finite <em>order</em> \\(\\rho\\), its Weierstrass product takes the form
\\[f(z) = z^m e^{g(z)} \\prod_n E_p(z/a_n),\\]
where \\(g\\) is a polynomial of degree \\(\\leq \\rho\\) and \\(p \\leq \\rho\\). Order connects the global growth of \\(f\\) to the density of its zeros.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Karl Weierstrass (1876) proved the product theorem, resolving a question raised by Euler's product for \\(\\sin z\\). G&ouml;sta Mittag-Leffler (1877) proved the partial-fraction theorem. Jacques Hadamard (1893) combined both into the factorization theorem for functions of finite order, with the celebrated application that \\(\\xi(s)\\) has infinitely many zeros, contributing to his proof of the prime number theorem.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 1: Weierstrass Product Theorem
        // ================================================================
        {
            id: 'sec-weierstrass',
            title: 'Weierstrass Product Theorem',
            content: `
<h2>Weierstrass Product Theorem</h2>

<h3>Elementary Factors</h3>

<p>The key building block is the <strong>Weierstrass elementary factor</strong>:
\\[
E_0(z) = 1 - z, \\qquad
E_p(z) = (1-z)\\exp\\!\\Bigl(z + \\tfrac{z^2}{2} + \\cdots + \\tfrac{z^p}{p}\\Bigr), \\quad p \\geq 1.
\\]
The exponential exactly cancels the first \\(p\\) terms in \\(\\log(1-z)\\), making \\(E_p(z/a)\\) converge fast enough even when \\(\\sum 1/|a_n|^{p}\\) diverges.</p>

<div class="env-block theorem">
    <div class="env-title">Lemma (elementary factor estimate)</div>
    <div class="env-body">
        <p>For \\(|z| \\leq 1\\),
        \\[|1 - E_p(z)| \\leq |z|^{p+1}.\\]</p>
    </div>
</div>

<p><em>Proof sketch.</em> Write \\(\\log E_p(z) = \\log(1-z) + z + z^2/2 + \\cdots + z^p/p = -\\sum_{k=p+1}^\\infty z^k/k.\\) So \\(|\\log E_p(z)| \\leq \\sum_{k\\geq p+1} |z|^k/k \\leq |z|^{p+1}/(1-|z|)\\). For \\(|z|\\leq 1/2\\) this gives \\(|E_p(z)-1|\\leq 2|z|^{p+1}\\). \\(\\square\\)</p>

<div class="env-block theorem">
    <div class="env-title">Weierstrass Product Theorem</div>
    <div class="env-body">
        <p>Let \\(\\{a_n\\}\\) be any sequence of nonzero complex numbers with \\(|a_n| \\to \\infty\\). Then there exist non-negative integers \\(p_n\\) such that the product
        \\[
        \\prod_{n=1}^\\infty E_{p_n}\\!\\bigl(z/a_n\\bigr)
        \\]
        converges absolutely and uniformly on compact sets to an entire function whose zeros are exactly \\(\\{a_n\\}\\) (with multiplicity). If \\(m \\geq 0\\), the function
        \\[
        f(z) = z^m \\prod_{n=1}^\\infty E_{p_n}\\!\\bigl(z/a_n\\bigr)
        \\]
        is entire with a zero of order \\(m\\) at \\(0\\) and zeros at \\(a_n\\).</p>
        <p><strong>Corollary.</strong> Any entire function \\(f\\) can be written as
        \\[f(z) = z^m e^{g(z)} \\prod_{n=1}^\\infty E_{p_n}\\!\\bigl(z/a_n\\bigr),\\]
        where \\(g\\) is entire and \\(\\{a_n\\}\\) are the nonzero zeros of \\(f\\).</p>
    </div>
</div>

<p><em>Proof of convergence.</em> Fix \\(R > 0\\). For \\(|z| \\leq R\\) and \\(|a_n| > 2R\\), we have \\(|z/a_n| \\leq 1/2\\), so \\(|1-E_{p_n}(z/a_n)| \\leq (|z|/|a_n|)^{p_n+1} \\leq (R/|a_n|)^{p_n+1}\\). Choosing \\(p_n = n-1\\) works whenever \\(\\sum (R/|a_n|)^n < \\infty\\), which holds since \\(|a_n| \\to \\infty\\). Absolute convergence of \\(\\sum |1-E_{p_n}(z/a_n)|\\) implies absolute convergence of the product. \\(\\square\\)</p>

<h3>Non-uniqueness and the Role of \\(e^{g(z)}\\)</h3>

<p>The Weierstrass product is far from unique: multiplying by \\(e^{g(z)}\\) for any entire \\(g\\) gives another entire function with the same zeros. Two entire functions with the same zeros differ by a zero-free entire factor, and every zero-free entire function has the form \\(e^{g(z)}\\) (since \\(\\log f\\) can be defined on the simply-connected domain \\(\\mathbb{C}\\)).</p>

<div class="env-block example">
    <div class="env-title">Canonical Example: sin(\\(\\pi z\\))</div>
    <div class="env-body">
        <p>The zeros of \\(\\sin(\\pi z)\\) are the integers \\(\\mathbb{Z}\\). With \\(p_n = 1\\) for all \\(n\\),
        \\[
        \\sin(\\pi z) = \\pi z \\prod_{n=1}^\\infty \\Bigl(1 - \\tfrac{z^2}{n^2}\\Bigr).
        \\]
        Setting \\(z = 1/2\\) gives Wallis's product: \\(\\pi/2 = \\prod_{n=1}^\\infty \\frac{4n^2}{4n^2-1}\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-weierstrass-product',
                    title: 'Building sin(z)/z as an Infinite Product',
                    description: 'Animate adding factors \\((1 - z^2/n^2\\pi^2)\\) to the partial product. Watch the product converge to sin(z)/z on the real line.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 180, scale: 50
                        });

                        var N = 1;
                        var animating = false;
                        var animId = null;

                        VizEngine.createSlider(controls, 'factors N', 1, 12, 1, 1, function(v) {
                            N = Math.round(v);
                            draw();
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true;
                            N = 1;
                            var step = function() {
                                draw();
                                if (N < 12) { N++; animId = setTimeout(step, 500); }
                                else { animating = false; }
                            };
                            step();
                        });

                        function partialProduct(x, n) {
                            // prod_{k=1}^{n} (1 - x^2/(k*pi)^2)
                            var p = 1;
                            for (var k = 1; k <= n; k++) {
                                p *= (1 - (x * x) / (k * k * Math.PI * Math.PI));
                            }
                            return p;
                        }

                        function sincReal(x) {
                            return Math.abs(x) < 1e-10 ? 1 : Math.sin(x) / x;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var xMin = -5.5, xMax = 5.5;
                            var steps = 400;

                            // True sinc
                            viz.ctx.strokeStyle = viz.colors.blue;
                            viz.ctx.lineWidth = 1.5;
                            viz.ctx.setLineDash([5, 3]);
                            viz.ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= steps; i++) {
                                var x = xMin + (xMax - xMin) * i / steps;
                                var y = sincReal(x);
                                if (!isFinite(y) || Math.abs(y) > 3) { started = false; continue; }
                                var s = viz.toScreen(x, y);
                                if (!started) { viz.ctx.moveTo(s[0], s[1]); started = true; }
                                else { viz.ctx.lineTo(s[0], s[1]); }
                            }
                            viz.ctx.stroke();
                            viz.ctx.setLineDash([]);

                            // Partial product
                            viz.ctx.strokeStyle = viz.colors.orange;
                            viz.ctx.lineWidth = 2;
                            viz.ctx.beginPath();
                            started = false;
                            for (var i = 0; i <= steps; i++) {
                                var x = xMin + (xMax - xMin) * i / steps;
                                var y = partialProduct(x, N);
                                if (!isFinite(y) || Math.abs(y) > 3) { started = false; continue; }
                                var s = viz.toScreen(x, y);
                                if (!started) { viz.ctx.moveTo(s[0], s[1]); started = true; }
                                else { viz.ctx.lineTo(s[0], s[1]); }
                            }
                            viz.ctx.stroke();

                            // Mark zeros included
                            for (var k = 1; k <= N; k++) {
                                viz.drawPoint(k * Math.PI, 0, viz.colors.teal, null, 4);
                                viz.drawPoint(-k * Math.PI, 0, viz.colors.teal, null, 4);
                            }

                            // Labels
                            viz.screenText('sin(x)/x vs partial product', viz.width / 2, 18, viz.colors.white, 14);

                            var ctx = viz.ctx;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            // legend
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath(); ctx.moveTo(viz.width - 180, 40); ctx.lineTo(viz.width - 155, 40); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('sin(x)/x', viz.width - 150, 44);

                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(viz.width - 180, 58); ctx.lineTo(viz.width - 155, 58); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('\u220f\u2099(1 \u2212 x\u00b2/n\u00b2\u03c0\u00b2), N=' + N, viz.width - 150, 62);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('zeros: \u00b1\u03c0..\u00b1' + N + '\u03c0', viz.width - 150, 78);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the Weierstrass product for \\(\\cos(\\pi z)\\). Its zeros are \\(z = n + 1/2\\) for \\(n \\in \\mathbb{Z}\\).',
                    hint: 'Pair zeros at \\(\\pm(n+1/2)\\) and use the identity \\(\\cos(\\pi z) = \\sin(\\pi(z+1/2))/\\sin(\\pi/2)\\).',
                    solution: '\\(\\cos(\\pi z) = \\prod_{n=0}^\\infty \\bigl(1 - \\frac{z^2}{(n+1/2)^2}\\bigr)\\). More explicitly, \\(\\cos(\\pi z) = \\prod_{n=0}^\\infty \\bigl(1 - \\frac{4z^2}{(2n+1)^2}\\bigr)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Mittag-Leffler Theorem
        // ================================================================
        {
            id: 'sec-mittag-leffler',
            title: 'Mittag-Leffler Theorem',
            content: `
<h2>Mittag-Leffler Theorem</h2>

<p>The Mittag-Leffler theorem is the meromorphic analogue of the Weierstrass product theorem: it constructs a meromorphic function with prescribed poles and principal parts.</p>

<h3>Principal Parts</h3>

<p>At a pole \\(b\\) of order \\(m\\), the <strong>principal part</strong> is the singular portion of the Laurent expansion:
\\[
P(z, b) = \\frac{c_{-m}}{(z-b)^m} + \\cdots + \\frac{c_{-1}}{z-b}.
\\]</p>

<div class="env-block theorem">
    <div class="env-title">Mittag-Leffler Theorem</div>
    <div class="env-body">
        <p>Let \\(\\{b_n\\}\\) be a sequence of distinct complex numbers with \\(|b_n| \\to \\infty\\), and let \\(P_n(z)\\) be a rational function (principal part) with pole only at \\(b_n\\). Then there exists a meromorphic function \\(f\\) on \\(\\mathbb{C}\\) whose poles are exactly \\(\\{b_n\\}\\) with principal parts \\(P_n\\). Explicitly,
        \\[
        f(z) = \\sum_{n=1}^\\infty \\bigl[P_n(z) - q_n(z)\\bigr],
        \\]
        where \\(q_n\\) is a polynomial (Taylor partial sum of \\(P_n\\) at \\(0\\)) chosen to ensure convergence. The general meromorphic function with these poles is \\(f(z) + g(z)\\) for any entire \\(g\\).</p>
    </div>
</div>

<p><em>Proof idea.</em> Fix \\(R > 0\\) and consider the disc \\(|z| < R\\). For all \\(|b_n| > 2R\\), the principal part \\(P_n(z)\\) is holomorphic on \\(|z| < R\\), so its Taylor series converges there. Take \\(q_n\\) to be the partial sum of that series chosen so that \\(|P_n(z) - q_n(z)| < 2^{-n}\\) on \\(|z| \\leq R\\). The series then converges normally on \\(\\mathbb{C} \\setminus \\{b_n\\}\\). \\(\\square\\)</p>

<div class="env-block example">
    <div class="env-title">Partial Fractions for \\(\\pi \\cot(\\pi z)\\)</div>
    <div class="env-body">
        <p>The function \\(\\pi \\cot(\\pi z)\\) has simple poles at every integer \\(n \\in \\mathbb{Z}\\), each with residue \\(1\\). The Mittag-Leffler expansion is
        \\[
        \\pi \\cot(\\pi z) = \\frac{1}{z} + \\sum_{n=1}^\\infty \\Bigl(\\frac{1}{z-n} + \\frac{1}{z+n}\\Bigr)
        = \\frac{1}{z} + \\sum_{n=1}^\\infty \\frac{2z}{z^2 - n^2}.
        \\]
        This follows from comparing the Weierstrass product \\(\\sin(\\pi z) = \\pi z\\prod_n(1 - z^2/n^2)\\) with its logarithmic derivative.</p>
    </div>
</div>

<h3>Connection to Weierstrass</h3>

<p>Taking the logarithmic derivative of the Weierstrass product gives the Mittag-Leffler expansion:
\\[
\\frac{f'(z)}{f(z)} = \\frac{m}{z} + g'(z) + \\sum_n \\frac{d}{dz} \\log E_{p_n}(z/a_n).
\\]
Each term \\(\\frac{d}{dz}\\log E_p(z/a)\\) has a simple pole at \\(z = a\\) with residue \\(1\\).</p>
`,
            visualizations: [
                {
                    id: 'viz-mittag-leffler',
                    title: 'Building a Function with Prescribed Poles',
                    description: 'Animate adding principal parts \\(1/(z-n)\\) to construct \\(\\pi\\cot(\\pi z)\\). The domain coloring shows poles as bright points; watch convergence as more terms are added.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 55
                        });

                        var N = 1;
                        VizEngine.createSlider(controls, 'terms N', 1, 10, 1, 1, function(v) {
                            N = Math.round(v);
                            draw();
                        });

                        // Partial sum of pi*cot(pi*z): 1/z + sum_{n=1}^{N} 2z/(z^2-n^2)
                        function partialCot(re, im, n) {
                            // 1/z
                            var denom0 = re * re + im * im;
                            if (denom0 < 1e-20) return [1e10, 0];
                            var re_sum = re / denom0;
                            var im_sum = -im / denom0;

                            for (var k = 1; k <= n; k++) {
                                // 2z / (z^2 - k^2)
                                // z^2 = (re^2-im^2) + 2*re*im*i
                                var z2re = re * re - im * im - k * k;
                                var z2im = 2 * re * im;
                                var d = z2re * z2re + z2im * z2im;
                                if (d < 1e-20) { re_sum += 1e8; continue; }
                                // 2z * conj(z^2-k^2) / |z^2-k^2|^2
                                re_sum += (2 * (re * z2re + im * z2im)) / d;
                                im_sum += (2 * (im * z2re - re * z2im)) / d;
                            }
                            return [re_sum, im_sum];
                        }

                        function draw() {
                            var xRange = [-3.5, 3.5];
                            var yRange = [-3.5, 3.5];
                            viz.drawDomainColoring(function(re, im) {
                                return partialCot(re, im, N);
                            }, xRange, yRange);

                            // Axis overlay
                            viz.ctx.strokeStyle = 'rgba(255,255,255,0.2)';
                            viz.ctx.lineWidth = 1;
                            viz.ctx.beginPath();
                            viz.ctx.moveTo(viz.originX, 0);
                            viz.ctx.lineTo(viz.originX, viz.height);
                            viz.ctx.stroke();
                            viz.ctx.beginPath();
                            viz.ctx.moveTo(0, viz.originY);
                            viz.ctx.lineTo(viz.width, viz.originY);
                            viz.ctx.stroke();

                            viz.screenText(
                                '1/z + \u03a3\u2099\u2081\u1d4e 2z/(z\u00b2\u2212n\u00b2),  N=' + N,
                                viz.width / 2, 18, '#ffffffcc', 13
                            );
                            viz.screenText('Domain coloring of partial Mittag-Leffler sum', viz.width / 2, viz.height - 14, '#88888866', 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Using the Mittag-Leffler theorem, write a meromorphic function with simple poles at \\(z = n^2\\) for \\(n = 1, 2, 3, \\ldots\\) each with residue \\(1\\).',
                    hint: 'The poles \\(n^2\\) grow fast enough that no convergence polynomials \\(q_n\\) are needed.',
                    solution: '\\(f(z) = \\sum_{n=1}^\\infty \\frac{1}{z - n^2}\\). Since \\(|1/n^2|\\) is summable, the series converges normally on compact subsets of \\(\\mathbb{C} \\setminus \\{n^2\\}\\) without any correction terms.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Order and Type
        // ================================================================
        {
            id: 'sec-order',
            title: 'Order and Type',
            content: `
<h2>Order and Type of Entire Functions</h2>

<p>Growth rate is the key to classifying entire functions. The <strong>order</strong> measures how fast \\(|f(re^{i\\theta})|\\) can grow as \\(r \\to \\infty\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition (Order)</div>
    <div class="env-body">
        <p>The <strong>order</strong> of an entire function \\(f\\) is
        \\[
        \\rho = \\limsup_{r \\to \\infty} \\frac{\\log \\log M(r)}{\\log r},
        \\]
        where \\(M(r) = \\max_{|z|=r} |f(z)|\\) is the maximum modulus. Equivalently, \\(\\rho\\) is the infimum of \\(\\lambda\\) such that \\(M(r) = O(e^{r^\\lambda})\\).</p>
    </div>
</div>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
<thead><tr style="border-bottom:1px solid #30363d;">
<th style="padding:8px;text-align:left;">Function</th>
<th style="padding:8px;text-align:left;">\\(M(r)\\) roughly</th>
<th style="padding:8px;text-align:left;">Order \\(\\rho\\)</th>
</tr></thead>
<tbody>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:8px;">\\(p(z)\\) (polynomial, degree \\(d\\))</td>
<td style="padding:8px;">\\(r^d\\)</td>
<td style="padding:8px;">\\(0\\)</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:8px;">\\(e^z\\), \\(\\sin z\\), \\(\\cos z\\)</td>
<td style="padding:8px;">\\(e^r\\)</td>
<td style="padding:8px;">\\(1\\)</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:8px;">\\(e^{z^2}\\)</td>
<td style="padding:8px;">\\(e^{r^2}\\)</td>
<td style="padding:8px;">\\(2\\)</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:8px;">\\(e^{e^z}\\)</td>
<td style="padding:8px;">\\(e^{e^r}\\)</td>
<td style="padding:8px;">\\(\\infty\\)</td>
</tr>
</tbody>
</table>

<div class="env-block definition">
    <div class="env-title">Definition (Type)</div>
    <div class="env-body">
        <p>For an entire function of finite order \\(\\rho\\), the <strong>type</strong> is
        \\[\\sigma = \\limsup_{r \\to \\infty} \\frac{\\log M(r)}{r^\\rho}.\\]
        We say \\(f\\) is of <em>minimal type</em> (\\(\\sigma = 0\\)), <em>normal type</em> (\\(0 < \\sigma < \\infty\\)), or <em>maximal type</em> (\\(\\sigma = \\infty\\)).</p>
    </div>
</div>

<h3>Power Series Criterion</h3>

<p>If \\(f(z) = \\sum_{n=0}^\\infty c_n z^n\\), then
\\[
\\rho = \\limsup_{n \\to \\infty} \\frac{n \\log n}{-\\log |c_n|}.
\\]
For example, \\(e^z = \\sum z^n/n!\\): \\(|c_n| = 1/n!\\), \\(-\\log|c_n| = \\log n! \\approx n\\log n\\), so \\(\\rho = 1\\). For \\(e^{z^2} = \\sum z^{2n}/n!\\): only even terms nonzero, \\(-\\log|c_{2n}| = \\log n! \\approx n\\log n = (2n)\\log(2n)/2\\), giving \\(\\rho = 2\\).</p>

<h3>Jensen's Formula and the Zero Counting Function</h3>

<p>The number of zeros \\(n(r)\\) of \\(f\\) in \\(|z| \\leq r\\) is controlled by growth via Jensen's formula:
\\[
\\frac{1}{2\\pi}\\int_0^{2\\pi} \\log|f(re^{i\\theta})| \\,d\\theta = \\log|f(0)| + \\sum_{|a_n|\\leq r} \\log\\frac{r}{|a_n|}.
\\]
It follows that if \\(f\\) has order \\(\\rho\\), then \\(n(r) = O(r^{\\rho+\\varepsilon})\\) for every \\(\\varepsilon > 0\\).</p>
`,
            visualizations: [
                {
                    id: 'viz-order-growth',
                    title: 'Comparing Growth: Polynomial vs Exponential vs Super-Exponential',
                    description: 'Domain coloring side by side (on the real axis slice) showing how quickly M(r) grows for functions of order 0, 1, and 2.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 340,
                            originX: 280, originY: 240, scale: 1
                        });

                        var rMax = 3;
                        VizEngine.createSlider(controls, 'r max', 1, 5, 3, 0.1, function(v) {
                            rMax = v; draw();
                        });

                        function Mz3(r) { return Math.pow(r, 3); }
                        function Mexp(r) { return Math.exp(r); }
                        function Mexp2(r) { return Math.exp(r * r); }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var pw = viz.width, ph = viz.height;
                            var chartBottom = ph - 30;
                            var chartTop = 30;
                            var chartH = chartBottom - chartTop;
                            var chartLeft = 60;
                            var chartRight = pw - 20;
                            var chartW = chartRight - chartLeft;

                            // Compute max for scaling
                            var maxVal = Math.max(Mz3(rMax), Mexp(rMax), Math.min(Mexp2(rMax), 1e15));
                            var logMax = Math.log(Math.max(maxVal, 1)) + 1;

                            var steps = 300;

                            function toScreenX(r) { return chartLeft + (r / rMax) * chartW; }
                            function toScreenY(y) {
                                var lv = Math.log(Math.max(y, 1));
                                return chartBottom - (lv / logMax) * chartH;
                            }

                            // Grid lines (log scale)
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var p = 0; p <= Math.ceil(logMax); p += 2) {
                                var sy = chartBottom - (p / logMax) * chartH;
                                ctx.beginPath(); ctx.moveTo(chartLeft, sy); ctx.lineTo(chartRight, sy); ctx.stroke();
                                ctx.fillText('e^' + p, chartLeft - 4, sy);
                            }
                            // X axis
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(chartLeft, chartBottom); ctx.lineTo(chartRight, chartBottom); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(chartLeft, chartTop); ctx.lineTo(chartLeft, chartBottom); ctx.stroke();
                            ctx.fillStyle = viz.colors.text; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var ri = 0; ri <= rMax; ri++) {
                                var sx = toScreenX(ri);
                                ctx.fillText(ri.toFixed(0), sx, chartBottom + 4);
                            }

                            // Draw functions
                            var fns = [
                                { fn: Mz3, color: viz.colors.teal, label: 'r\u00b3 (order 0)' },
                                { fn: Mexp, color: viz.colors.blue, label: 'e^r (order 1)' },
                                { fn: Mexp2, color: viz.colors.orange, label: 'e^(r\u00b2) (order 2)' }
                            ];

                            fns.forEach(function(item) {
                                ctx.strokeStyle = item.color; ctx.lineWidth = 2;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= steps; i++) {
                                    var r = (rMax * i) / steps;
                                    var y = item.fn(r);
                                    if (!isFinite(y) || y < 0.5) { started = false; continue; }
                                    var sx = toScreenX(r);
                                    var sy = toScreenY(y);
                                    if (sy < chartTop - 5) { started = false; continue; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else { ctx.lineTo(sx, sy); }
                                }
                                ctx.stroke();
                            });

                            // Legend
                            var legX = chartLeft + 10, legY = chartTop + 10;
                            ctx.font = '11px -apple-system,sans-serif';
                            fns.forEach(function(item, i) {
                                ctx.strokeStyle = item.color; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(legX, legY + i * 20 + 5); ctx.lineTo(legX + 22, legY + i * 20 + 5); ctx.stroke();
                                ctx.fillStyle = item.color; ctx.textAlign = 'left';
                                ctx.fillText(item.label, legX + 28, legY + i * 20 + 9);
                            });

                            viz.screenText('Maximum Modulus M(r) — log scale', pw / 2, 14, viz.colors.white, 13);
                            viz.screenText('r', chartRight - 8, chartBottom + 4, viz.colors.text, 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the order of \\(f(z) = \\sum_{n=0}^\\infty z^n / n^n\\).',
                    hint: 'Apply the power series formula \\(\\rho = \\limsup n\\log n / (-\\log|c_n|)\\) with \\(c_n = 1/n^n\\).',
                    solution: '\\(-\\log|c_n| = n\\log n\\), so \\(\\rho = \\limsup_{n\\to\\infty} n\\log n / (n\\log n) = 1\\). The function has order \\(1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Hadamard Factorization
        // ================================================================
        {
            id: 'sec-hadamard',
            title: 'Hadamard Factorization',
            content: `
<h2>Hadamard Factorization Theorem</h2>

<p>Hadamard sharpened Weierstrass: for entire functions of <em>finite order</em>, the factor \\(e^{g(z)}\\) is forced to be a polynomial, and the exponent \\(p_n\\) in the elementary factors is a fixed integer \\(p\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition (Genus)</div>
    <div class="env-body">
        <p>An entire function has <strong>finite genus</strong> \\(\\mu\\) if there is an integer \\(p\\) such that \\(\\sum_n |a_n|^{-(p+1)} < \\infty\\) and the Weierstrass product uses \\(E_p\\) factors. The genus is \\(\\mu = \\max(p, \\deg g)\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Hadamard Factorization Theorem</div>
    <div class="env-body">
        <p>Let \\(f\\) be an entire function of finite order \\(\\rho\\). Let \\(m\\) be the order of the zero at \\(0\\) and \\(\\{a_n\\}\\) the nonzero zeros. Then there exists a polynomial \\(g\\) with \\(\\deg g \\leq \\rho\\) and integer \\(p \\leq \\rho\\) such that
        \\[
        f(z) = z^m e^{g(z)} \\prod_{n=1}^\\infty E_p\\!\\bigl(z/a_n\\bigr).
        \\]
        The genus satisfies \\(\\mu \\leq \\rho \\leq \\mu + 1\\). In particular, \\(\\rho\\) is either an integer or half-integer (by a result of Borel).</p>
    </div>
</div>

<p><em>Key steps of the proof.</em></p>
<ol>
    <li><strong>Growth controls zero density.</strong> Jensen's formula gives \\(n(r) \\leq C r^{\\rho+\\varepsilon}\\), so \\(\\sum |a_n|^{-(\\rho+\\varepsilon)} < \\infty\\). Thus \\(p = \\lfloor\\rho\\rfloor\\) works.</li>
    <li><strong>The quotient is zero-free.</strong> After dividing by the Weierstrass product \\(h(z)\\), the quotient \\(f(z)/h(z)\\) is entire and zero-free, hence \\(e^{g(z)}\\) for some entire \\(g\\).</li>
    <li><strong>\\(g\\) is a polynomial.</strong> One shows \\(|\\text{Re}\\, g(z)| \\leq C r^{\\rho+\\varepsilon}\\) on \\(|z| = r\\). A subharmonic function growing polynomially must be a polynomial.</li>
</ol>

<div class="env-block example">
    <div class="env-title">\\(\\sin(\\pi z)\\) revisited</div>
    <div class="env-body">
        <p>\\(\\sin(\\pi z)\\) has order \\(1\\). Zeros at \\(\\mathbb{Z}\\), all with \\(|a_n| = |n|\\). Since \\(\\sum 1/n^2 < \\infty\\), we use \\(p = 1\\). Hadamard gives
        \\[
        \\sin(\\pi z) = z e^{Az+B} \\prod_{n \\neq 0} E_1(z/n)
        = \\pi z \\prod_{n=1}^\\infty \\bigl(1 - z^2/n^2\\bigr).
        \\]
        From asymptotics one deduces \\(A = 0\\), \\(e^B = \\pi\\).</p>
    </div>
</div>

<h3>Corollary: Picard's Little Theorem (sketch)</h3>

<p>If \\(f\\) is entire and omits two values, then Hadamard's theorem applied to \\(f - a\\) and \\(f - b\\) forces strong constraints on the genus that ultimately yield \\(f\\) constant. (The full proof uses the modular function.)</p>
`,
            visualizations: [
                {
                    id: 'viz-hadamard',
                    title: 'Hadamard Product for sin(\\(\\pi z\\))',
                    description: 'Animate the partial product \\(\\pi z \\prod_{n=1}^{N}(1 - z^2/n^2)\\) converging to \\(\\sin(\\pi z)\\) as N grows. Errors shown below.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 45
                        });

                        var N = 1;
                        var animating = false;

                        VizEngine.createSlider(controls, 'N', 1, 15, 1, 1, function(v) {
                            N = Math.round(v); draw();
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true; N = 1;
                            (function step() {
                                draw();
                                if (N < 15) { N++; setTimeout(step, 350); }
                                else { animating = false; }
                            })();
                        });

                        function partialHadamard(x, n) {
                            var p = Math.PI * x;
                            for (var k = 1; k <= n; k++) {
                                p *= (1 - (x * x) / (k * k));
                            }
                            return p;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var xMin = -4, xMax = 4, steps = 400;

                            // sin(pi*x)
                            viz.ctx.strokeStyle = viz.colors.blue;
                            viz.ctx.lineWidth = 1.5;
                            viz.ctx.setLineDash([5, 3]);
                            viz.ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= steps; i++) {
                                var x = xMin + (xMax - xMin) * i / steps;
                                var y = Math.sin(Math.PI * x);
                                if (!isFinite(y)) { started = false; continue; }
                                var s = viz.toScreen(x, y);
                                if (!started) { viz.ctx.moveTo(s[0], s[1]); started = true; }
                                else { viz.ctx.lineTo(s[0], s[1]); }
                            }
                            viz.ctx.stroke();
                            viz.ctx.setLineDash([]);

                            // Partial Hadamard product
                            viz.ctx.strokeStyle = viz.colors.orange;
                            viz.ctx.lineWidth = 2;
                            viz.ctx.beginPath();
                            started = false;
                            for (var i = 0; i <= steps; i++) {
                                var x = xMin + (xMax - xMin) * i / steps;
                                var y = partialHadamard(x, N);
                                if (!isFinite(y) || Math.abs(y) > 4) { started = false; continue; }
                                var s = viz.toScreen(x, y);
                                if (!started) { viz.ctx.moveTo(s[0], s[1]); started = true; }
                                else { viz.ctx.lineTo(s[0], s[1]); }
                            }
                            viz.ctx.stroke();

                            // Mark zeros included
                            for (var k = 1; k <= N; k++) {
                                viz.drawPoint(k, 0, viz.colors.teal, null, 4);
                                viz.drawPoint(-k, 0, viz.colors.teal, null, 4);
                            }

                            // Max error label
                            var maxErr = 0;
                            for (var i = 0; i <= steps; i++) {
                                var x = xMin + (xMax - xMin) * i / steps;
                                var err = Math.abs(Math.sin(Math.PI * x) - partialHadamard(x, N));
                                if (isFinite(err)) maxErr = Math.max(maxErr, err);
                            }

                            viz.screenText('sin(\u03c0x) vs \u03c0x\u220f\u207F\u2081(1\u2212x\u00b2/n\u00b2), N=' + N, viz.width / 2, 16, viz.colors.white, 13);
                            viz.screenText('max error: ' + maxErr.toFixed(4), viz.width / 2, viz.height - 14, viz.colors.orange, 12);

                            var ctx = viz.ctx;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath(); ctx.moveTo(viz.width - 175, 40); ctx.lineTo(viz.width - 150, 40); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.blue; ctx.textAlign = 'left';
                            ctx.fillText('sin(\u03c0x)', viz.width - 145, 44);
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(viz.width - 175, 58); ctx.lineTo(viz.width - 150, 58); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('partial product', viz.width - 145, 62);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'What is the genus of \\(\\sin(\\pi z)\\)? Of \\(e^z \\sin(\\pi z)\\)? Justify.',
                    hint: 'Genus depends on \\(p\\) (determined by convergence of \\(\\sum|a_n|^{-(p+1)}\\)) and \\(\\deg g\\).',
                    solution: 'For \\(\\sin(\\pi z)\\): zeros at \\(n \\in \\mathbb{Z}\\), \\(\\sum 1/n^2 < \\infty\\) so \\(p=1\\), \\(g\\) is constant, genus \\(\\mu = 1\\). For \\(e^z\\sin(\\pi z)\\): same zeros, \\(g(z) = z\\) so \\(\\deg g = 1\\), genus \\(\\mu = 1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Meromorphic Functions
        // ================================================================
        {
            id: 'sec-meromorphic',
            title: 'Meromorphic Functions',
            content: `
<h2>Meromorphic Functions in Depth</h2>

<h3>Global Structure</h3>

<p>A meromorphic function on \\(\\mathbb{C}\\) is a ratio \\(f = g/h\\) of two entire functions. Conversely, any such ratio is meromorphic wherever \\(h \\neq 0\\). The poles of \\(f\\) are (a subset of) the zeros of \\(h\\).</p>

<p>The partial fraction expansion via Mittag-Leffler combined with the Weierstrass product gives the global decomposition. The two key examples are \\(\\pi\\cot(\\pi z)\\) and \\(\\Gamma(z)\\).</p>

<h3>The Cotangent and Its Partial Fractions</h3>

<p>From the Weierstrass product \\(\\sin(\\pi z) = \\pi z \\prod_{n=1}^\\infty (1-z^2/n^2)\\), taking the logarithmic derivative:
\\[
\\pi \\cot(\\pi z) = \\frac{1}{z} + \\sum_{n=1}^\\infty \\Bigl(\\frac{1}{z-n} + \\frac{1}{z+n}\\Bigr).
\\]
This is the Mittag-Leffler expansion: simple poles at all integers, all with residue \\(1\\).</p>

<p>Integrating from \\(0\\) to \\(z\\) yields:
\\[
\\log\\sin(\\pi z) = \\log(\\pi z) + \\sum_{n=1}^\\infty \\log\\Bigl(1 - \\frac{z^2}{n^2}\\Bigr),
\\]
recovering the Weierstrass product.</p>

<h3>The Gamma Function</h3>

<p>The Gamma function \\(\\Gamma(z)\\) is the unique meromorphic function satisfying:
<ul>
<li>\\(\\Gamma(z+1) = z\\,\\Gamma(z)\\)</li>
<li>\\(\\Gamma(1) = 1\\)</li>
<li>\\(\\log\\Gamma\\) is convex on \\((0,\\infty)\\) (Bohr-Mollerup)</li>
</ul></p>

<p>Its Weierstrass product representation:
\\[
\\frac{1}{\\Gamma(z)} = z e^{\\gamma z} \\prod_{n=1}^\\infty \\Bigl(1 + \\frac{z}{n}\\Bigr) e^{-z/n},
\\]
where \\(\\gamma = 0.5772\\ldots\\) is the Euler-Mascheroni constant. Thus \\(\\Gamma(z)\\) has simple poles at \\(z = 0, -1, -2, \\ldots\\) with
\\[
\\text{Res}_{z=-n} \\Gamma(z) = \\frac{(-1)^n}{n!}.
\\]</p>

<p>The Mittag-Leffler expansion for \\(1/\\Gamma\\) is entire (the poles cancel), while \\(\\Gamma\\) itself is meromorphic. The reflection formula ties \\(\\Gamma\\) to \\(\\sin\\):
\\[
\\Gamma(z)\\Gamma(1-z) = \\frac{\\pi}{\\sin(\\pi z)}.
\\]</p>

<div class="env-block theorem">
    <div class="env-title">Partial Fraction of \\(\\Gamma'/\\Gamma\\) (Digamma)</div>
    <div class="env-body">
        <p>The digamma function \\(\\psi(z) = \\Gamma'(z)/\\Gamma(z)\\) satisfies
        \\[
        \\psi(z) = -\\gamma - \\frac{1}{z} + \\sum_{n=1}^\\infty \\Bigl(\\frac{1}{n} - \\frac{1}{z+n}\\Bigr).
        \\]</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-gamma-function',
                    title: 'Domain Coloring of \\(\\Gamma(z)\\)',
                    description: 'Domain coloring reveals the poles of Gamma at 0, -1, -2, ... (bright singularities) and the function behavior in the right half-plane.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420,
                            originX: 280, originY: 210, scale: 55
                        });

                        // Lanczos approximation for Gamma(z), z = (re, im)
                        function gammaComplex(re, im) {
                            // Reflection formula for re < 0.5
                            if (re < 0.5) {
                                // Gamma(z)*Gamma(1-z) = pi/sin(pi*z)
                                var zr = 1 - re, zi = -im;
                                var gr = gammaLanczos(zr, zi);
                                // sin(pi*z) = sin(pi*re)*cosh(pi*im) + i*cos(pi*re)*sinh(pi*im)
                                var sinr = Math.sin(Math.PI * re) * Math.cosh(Math.PI * im);
                                var sini = Math.cos(Math.PI * re) * Math.sinh(Math.PI * im);
                                var denom = sinr * sinr + sini * sini;
                                if (denom < 1e-30) return [1e8, 0];
                                // pi / sin(pi*z)
                                var qr = Math.PI * sinr / denom;
                                var qi = -Math.PI * sini / denom;
                                // Gamma(z) = pi/(sin(pi*z)*Gamma(1-z)) = q / Gamma(1-z)
                                var d2 = gr[0]*gr[0] + gr[1]*gr[1];
                                if (d2 < 1e-30) return [1e8, 0];
                                return [(qr*gr[0] + qi*gr[1])/d2, (qi*gr[0] - qr*gr[1])/d2];
                            }
                            return gammaLanczos(re, im);
                        }

                        function gammaLanczos(re, im) {
                            // Lanczos g=7 coefficients
                            var g = 7;
                            var c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
                                     771.32342877765313, -176.61502916214059, 12.507343278686905,
                                     -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

                            // z -> z-1 for Lanczos
                            var zr = re - 1, zi = im;

                            var xr = c[0], xi = 0;
                            for (var i = 1; i < g + 2; i++) {
                                var dr = zr + i, di = zi;
                                var d2 = dr*dr + di*di;
                                if (d2 < 1e-30) { xr += 1e8; continue; }
                                xr += c[i] * dr / d2;
                                xi -= c[i] * di / d2;
                            }

                            // t = z + g - 0.5
                            var tr = zr + g - 0.5, ti = zi;

                            // sqrt(2*pi) * t^(z+0.5) * exp(-t) * x
                            var sqrt2pi = Math.sqrt(2 * Math.PI);

                            // t^(z+0.5): exp((z+0.5)*log(t))
                            var logtMag = 0.5 * Math.log(tr*tr + ti*ti);
                            var logtArg = Math.atan2(ti, tr);
                            var expRe = zr + 0.5, expIm = zi;
                            var logpowRe = expRe * logtMag - expIm * logtArg;
                            var logpowIm = expRe * logtArg + expIm * logtMag;
                            var powMag = Math.exp(logpowRe);
                            var tPowRe = powMag * Math.cos(logpowIm);
                            var tPowIm = powMag * Math.sin(logpowIm);

                            // exp(-t)
                            var expNegRe = Math.exp(-tr) * Math.cos(-ti);
                            var expNegIm = Math.exp(-tr) * Math.sin(-ti);

                            // result = sqrt2pi * tPow * expNeg * x
                            // tPow * expNeg
                            var a1r = tPowRe*expNegRe - tPowIm*expNegIm;
                            var a1i = tPowRe*expNegIm + tPowIm*expNegRe;
                            // * x
                            var a2r = a1r*xr - a1i*xi;
                            var a2i = a1r*xi + a1i*xr;
                            return [sqrt2pi * a2r, sqrt2pi * a2i];
                        }

                        var xRange = [-4, 4];
                        var yRange = [-3.8, 3.8];
                        viz.drawDomainColoring(gammaComplex, xRange, yRange);

                        // Axis lines overlay
                        viz.ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                        viz.ctx.lineWidth = 1;
                        viz.ctx.beginPath();
                        viz.ctx.moveTo(viz.originX, 0); viz.ctx.lineTo(viz.originX, viz.height); viz.ctx.stroke();
                        viz.ctx.beginPath();
                        viz.ctx.moveTo(0, viz.originY); viz.ctx.lineTo(viz.width, viz.originY); viz.ctx.stroke();

                        // Label poles
                        var ctx = viz.ctx;
                        ctx.font = '11px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        for (var n = 0; n >= -3; n--) {
                            var s = viz.toScreen(n, 0);
                            ctx.strokeStyle = 'rgba(255,255,255,0.6)';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(s[0], s[1], 5, 0, 2*Math.PI);
                            ctx.stroke();
                            ctx.fillStyle = 'rgba(255,255,255,0.7)';
                            ctx.fillText(n === 0 ? '0' : n.toString(), s[0], s[1] - 12);
                        }

                        viz.screenText('\u0393(z) — domain coloring (poles at 0,\u22121,\u22122,...)', viz.width / 2, 16, '#ffffffcc', 13);
                        viz.screenText('hue = arg, brightness = |f|', viz.width / 2, viz.height - 12, '#88888899', 11);

                        return viz;
                    }
                },
                {
                    id: 'viz-pi-cot',
                    title: 'Partial Fraction Convergence of \\(\\pi\\cot(\\pi z)\\)',
                    description: 'Add terms 1/(z-n) + 1/(z+n) one by one and watch convergence to pi*cot(pi*z) on the real axis.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 360,
                            originX: 280, originY: 180, scale: 40
                        });

                        var N = 1;
                        var animating = false;

                        VizEngine.createSlider(controls, 'N', 1, 12, 1, 1, function(v) {
                            N = Math.round(v); draw();
                        });
                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true; N = 1;
                            (function step() {
                                draw();
                                if (N < 12) { N++; setTimeout(step, 400); }
                                else animating = false;
                            })();
                        });

                        function partialCotReal(x, n) {
                            // 1/x + sum_{k=1}^{n} (1/(x-k) + 1/(x+k))
                            if (Math.abs(x) < 1e-8) return 1e10;
                            var s = 1 / x;
                            for (var k = 1; k <= n; k++) {
                                var d1 = x - k, d2 = x + k;
                                if (Math.abs(d1) < 1e-8 || Math.abs(d2) < 1e-8) return 1e10;
                                s += 1/d1 + 1/d2;
                            }
                            return s;
                        }

                        function piCotReal(x) {
                            if (Math.abs(x - Math.round(x)) < 1e-8) return 1e10;
                            return Math.PI / Math.tan(Math.PI * x);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var xMin = -4, xMax = 4, steps = 600;
                            var yClip = 6;

                            // True pi*cot
                            viz.ctx.strokeStyle = viz.colors.blue;
                            viz.ctx.lineWidth = 1.5;
                            viz.ctx.setLineDash([5, 3]);
                            viz.ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= steps; i++) {
                                var x = xMin + (xMax - xMin) * i / steps;
                                var y = piCotReal(x);
                                if (!isFinite(y) || Math.abs(y) > yClip) { started = false; continue; }
                                var s = viz.toScreen(x, y);
                                if (!started) { viz.ctx.moveTo(s[0], s[1]); started = true; }
                                else { viz.ctx.lineTo(s[0], s[1]); }
                            }
                            viz.ctx.stroke();
                            viz.ctx.setLineDash([]);

                            // Partial sum
                            viz.ctx.strokeStyle = viz.colors.orange;
                            viz.ctx.lineWidth = 2;
                            viz.ctx.beginPath();
                            started = false;
                            for (var i = 0; i <= steps; i++) {
                                var x = xMin + (xMax - xMin) * i / steps;
                                var y = partialCotReal(x, N);
                                if (!isFinite(y) || Math.abs(y) > yClip) { started = false; continue; }
                                var s = viz.toScreen(x, y);
                                if (!started) { viz.ctx.moveTo(s[0], s[1]); started = true; }
                                else { viz.ctx.lineTo(s[0], s[1]); }
                            }
                            viz.ctx.stroke();

                            viz.screenText('\u03c0 cot(\u03c0x) — Mittag-Leffler partial sums, N=' + N, viz.width / 2, 16, viz.colors.white, 13);

                            var ctx = viz.ctx;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath(); ctx.moveTo(20, 40); ctx.lineTo(45, 40); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.blue; ctx.textAlign = 'left';
                            ctx.fillText('\u03c0 cot(\u03c0x)', 50, 44);
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(20, 58); ctx.lineTo(45, 58); ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('1/x + \u03a3 (1/(x\u2212k)+1/(x+k))', 50, 62);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Derive the Wallis product \\(\\frac{\\pi}{2} = \\prod_{n=1}^\\infty \\frac{4n^2}{4n^2-1}\\) from the Weierstrass product for \\(\\sin(\\pi z)\\).',
                    hint: 'Evaluate the product at \\(z = 1/2\\) and simplify.',
                    solution: 'Setting \\(z=1/2\\) in \\(\\sin(\\pi z)=\\pi z\\prod_{n=1}^\\infty(1-z^2/n^2)\\): \\(1 = \\frac{\\pi}{2}\\prod_{n=1}^\\infty(1-\\frac{1}{4n^2}) = \\frac{\\pi}{2}\\prod_{n=1}^\\infty\\frac{4n^2-1}{4n^2}\\). Inverting: \\(\\frac{\\pi}{2}=\\prod_{n=1}^\\infty\\frac{4n^2}{4n^2-1}\\).'
                },
                {
                    question: 'Verify that \\(\\text{Res}_{z=-n}\\,\\Gamma(z) = (-1)^n/n!\\) for \\(n = 0, 1, 2, \\ldots\\)',
                    hint: 'Use the functional equation \\(\\Gamma(z+1) = z\\Gamma(z)\\) repeatedly to reduce to \\(\\Gamma(z)\\) near \\(z=0\\), where \\(\\text{Res}_{z=0}\\Gamma(z) = 1\\).',
                    solution: 'Near \\(z=-n\\), write \\(z = -n+\\varepsilon\\). Then \\(\\Gamma(z) = \\Gamma(\\varepsilon+1)/[z(z+1)\\cdots(z+n-1)] \\to \\Gamma(1)/[(-n)(-n+1)\\cdots(-1)\\varepsilon] = 1/((-1)^n n! \\varepsilon)\\). So \\(\\text{Res}=(-1)^n/n!\\). \\(\\square\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Connections & Looking Ahead',
            content: `
<h2>Connections and Looking Ahead</h2>

<h3>What We Have Built</h3>

<p>This chapter answered three fundamental questions about entire and meromorphic functions:</p>

<ol>
    <li><strong>Zeros prescribed:</strong> Weierstrass products give existence and the role of elementary factors \\(E_p\\).</li>
    <li><strong>Poles prescribed:</strong> Mittag-Leffler gives existence of meromorphic functions with any prescribed singularity structure.</li>
    <li><strong>Zeros + growth tightly linked:</strong> Hadamard's theorem says finite order \\(\\rho\\) forces both the Weierstrass exponent \\(p \\leq \\rho\\) and the degree of the exponential factor \\(\\leq \\rho\\).</li>
</ol>

<h3>The Riemann Zeta Function</h3>

<p>The completed zeta function \\(\\xi(s) = \\frac{1}{2}s(s-1)\\pi^{-s/2}\\Gamma(s/2)\\zeta(s)\\) is entire of order \\(1\\). Hadamard's theorem gives
\\[
\\xi(s) = e^{A+Bs} \\prod_\\rho \\Bigl(1 - \\frac{s}{\\rho}\\Bigr) e^{s/\\rho},
\\]
where the product is over nontrivial zeros \\(\\rho\\) of \\(\\zeta\\). The Riemann Hypothesis asserts all \\(\\rho\\) lie on the critical line \\(\\text{Re}(s) = 1/2\\).</p>

<div class="env-block remark">
    <div class="env-title">Prime Number Theorem</div>
    <div class="env-body">
        <p>Hadamard and de la Vall&eacute;e-Poussin proved (1896) that \\(\\zeta(s) \\neq 0\\) on \\(\\text{Re}(s)=1\\). The Weierstrass product for \\(\\xi\\) then implies there are no zeros on the boundary of the critical strip, and the prime number theorem \\(\\pi(x) \\sim x/\\log x\\) follows by a Tauberian argument.</p>
    </div>
</div>

<h3>Value Distribution Theory</h3>

<p>Picard's theorems (proved via the modular function or the Schwarz-Pick lemma) sharpen the growth picture:</p>
<ul>
    <li><strong>Little Picard:</strong> A non-constant entire function misses at most one value in \\(\\mathbb{C}\\).</li>
    <li><strong>Great Picard:</strong> In any punctured neighborhood of an essential singularity, \\(f\\) takes every complex value (with at most one exception) infinitely often.</li>
</ul>

<p>Nevanlinna theory (1920s) makes this quantitative: the characteristic function \\(T(r,f)\\) plays the role of \\(\\log M(r)\\), and the defect relation bounds how many values \\(f\\) can miss.</p>

<h3>Looking Ahead: Analytic Continuation</h3>

<p>Chapter 18 will use the Weierstrass and Mittag-Leffler frameworks to understand how entire and meromorphic functions extend across branch cuts. The Gamma function's functional equation \\(\\Gamma(z+1) = z\\Gamma(z)\\) and the zeta function's functional equation
\\[\\zeta(s) = 2^s \\pi^{s-1} \\sin(\\tfrac{\\pi s}{2})\\Gamma(1-s)\\zeta(1-s)\\]
are both forms of analytic continuation: they define the functions beyond their original domains using the identities proved here.</p>

<div class="env-block intuition">
    <div class="env-title">The Big Picture</div>
    <div class="env-body">
        <p>Entire functions are the analogue of polynomials in the world of analysis: they are globally defined, their zeros are their intrinsic data, and they factor accordingly. Meromorphic functions add controlled singularities, just as rational functions add poles to polynomials. The order \\(\\rho\\) is the analogue of degree, and Hadamard's theorem is the Fundamental Theorem of Algebra for entire functions of finite order.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Explain why an entire function of order \\(\\rho < 1\\) can have only finitely many zeros.',
                    hint: 'Use Jensen\'s formula: \\(n(r) \\leq C r^\\rho\\). What happens to \\(\\sum 1/|a_n|^{\\rho+\\varepsilon}\\)?',
                    solution: 'By Jensen, \\(n(r) = O(r^\\rho)\\). Integrating: \\(\\sum_{|a_n|\\leq r} \\log(r/|a_n|) = O(r^\\rho)\\). If \\(\\rho < 1\\), then \\(\\sum 1/|a_n| < \\infty\\) if there were infinitely many zeros, but the order formula implies \\(n(r)/r \\to 0\\), so actually the zeros cannot accumulate fast enough to be infinite. More precisely, \\(n(r)\\leq Cr^\\rho\\), and summing \\(\\sum_n 1/|a_n|^{1+\\varepsilon}\\) converges, but \\(\\sum_n 1/|a_n|\\) need not unless \\(\\rho < 1\\); for \\(\\rho < 1\\) the convergence exponent is \\(< 1\\), meaning \\(\\sum |a_n|^{-\\rho-\\varepsilon} < \\infty\\) for small \\(\\varepsilon > 0\\) with convergence exponent \\(\\leq \\rho < 1\\). Actually for \\(\\rho < 1/2\\) one can show only finitely many zeros; for \\(1/2 \\leq \\rho < 1\\) infinitely many zeros are possible (e.g., \\(\\cos\\sqrt{z}\\) has order \\(1/2\\) with zeros at \\(\\{(n+1/2)^2\\pi^2\\}\\)).'
                },
                {
                    question: 'Show that \\(\\Gamma(z)\\Gamma(1-z) = \\pi/\\sin(\\pi z)\\) by comparing Weierstrass products.',
                    hint: 'Write the products for \\(1/\\Gamma(z)\\) and \\(1/\\Gamma(1-z)\\), multiply, and compare with the product for \\(\\sin(\\pi z)/\\pi z\\).',
                    solution: 'We have \\(1/\\Gamma(z) = ze^{\\gamma z}\\prod_{n=1}^\\infty(1+z/n)e^{-z/n}\\) and \\(1/\\Gamma(1-z) = (1-z)e^{-\\gamma z}\\prod_{n=1}^\\infty(1-(z-1)/n)e^{(z-1)/n}\\). Multiplying: \\(1/(\\Gamma(z)\\Gamma(1-z)) = z(1-z)\\prod_{n=1}^\\infty(1-z^2/n^2)\\) after cancellation. But \\(\\sin(\\pi z)/(\\pi z) = \\prod_{n=1}^\\infty(1-z^2/n^2)\\), so \\(1/(\\Gamma(z)\\Gamma(1-z)) = z(1-z)\\cdot\\sin(\\pi z)/(\\pi z) = (1-z)\\sin(\\pi z)/\\pi = \\sin(\\pi z)/\\pi\\) (using \\(\\sin(\\pi z)/\\pi z\\) at \\(z\\neq 0\\) then both sides agree). Inverting: \\(\\Gamma(z)\\Gamma(1-z) = \\pi/\\sin(\\pi z)\\).'
                }
            ]
        }
    ]
});
