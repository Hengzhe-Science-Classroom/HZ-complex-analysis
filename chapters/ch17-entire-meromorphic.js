window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'Entire & Meromorphic Functions',
    subtitle: 'Weierstrass products, Mittag-Leffler, and the order of growth',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Entire & Meromorphic Functions?',
            content: `
<h2>Why Entire & Meromorphic Functions?</h2>

<div class="env-block intuition">
    <div class="env-title">The Guiding Questions</div>
    <div class="env-body">
        <p>Consider \\(\\sin(\\pi z)\\). It vanishes at every integer \\(n \\in \\mathbb{Z}\\). Can we write it as an infinite product over its zeros, the way a polynomial factors over its roots? And can we do this for <em>any</em> entire function with prescribed zeros?</p>
        <p>Dually, \\(\\pi\\cot(\\pi z)\\) has a simple pole at every integer. Can we decompose it as a sum of its principal parts, one per pole, the way partial fractions decompose a rational function?</p>
        <p>This chapter answers both questions affirmatively, and then asks: how fast must an entire function grow to support infinitely many zeros?</p>
    </div>
</div>

<p>Polynomials are determined (up to a constant) by their zeros. For entire functions, the situation is richer: zeros alone do not determine the function, but they constrain its growth. The three pillars of this chapter are:</p>

<ol>
    <li><strong>Weierstrass Product Theorem:</strong> construct an entire function with any prescribed zero set.</li>
    <li><strong>Mittag-Leffler Theorem:</strong> construct a meromorphic function with any prescribed principal parts.</li>
    <li><strong>Hadamard Factorization:</strong> for functions of finite order, the product representation takes a precise form.</li>
</ol>

<p>Together they show that the "algebra" of entire and meromorphic functions is as flexible as one could hope, while the "analysis" (growth rates) imposes rigid constraints on the structure.</p>

<h3>Polynomials vs. Entire Functions</h3>

<p>A polynomial \\(p(z) = c(z - a_1)\\cdots(z - a_n)\\) of degree \\(n\\) has exactly \\(n\\) zeros (counted with multiplicity) and grows like \\(|z|^n\\). An entire function can have infinitely many zeros, but then it must grow <em>at least</em> as fast as the density of its zeros requires. Making this precise leads to the concept of <strong>order of growth</strong>.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Weierstrass published his product theorem in 1876, providing the first rigorous construction of entire functions with prescribed zeros. Mittag-Leffler's companion result (1876-1884) handles prescribed poles. Hadamard's factorization theorem (1893), building on earlier work by Borel, connected the order of growth to the genus of the canonical product, yielding one of the deepest structural results in classical function theory.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Weierstrass Products
        // ================================================================
        {
            id: 'sec-weierstrass',
            title: 'Weierstrass Products',
            content: `
<h2>Weierstrass Products</h2>

<div class="env-block intuition">
    <div class="env-title">The Challenge of Infinite Products</div>
    <div class="env-body">
        <p>For a polynomial, \\(p(z) = c \\prod_{k=1}^{n}(z - a_k)\\) converges trivially (finite product). If the zeros \\(\\{a_k\\}\\) form an infinite sequence with \\(|a_k| \\to \\infty\\), the naive product \\(\\prod(1 - z/a_k)\\) may diverge. The Weierstrass trick: multiply each factor by a convergence-producing exponential.</p>
    </div>
</div>

<h3>Elementary Factors</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Elementary Factors)</div>
    <div class="env-body">
        <p>For \\(p \\geq 0\\), the <strong>elementary factor</strong> of order \\(p\\) is</p>
        \\[E_p(z) = (1 - z)\\exp\\!\\left(z + \\frac{z^2}{2} + \\cdots + \\frac{z^p}{p}\\right).\\]
        <p>In particular, \\(E_0(z) = 1 - z\\). The exponential factor is chosen so that \\(E_p(z) = 1 + O(z^{p+1})\\) near \\(z = 0\\), which accelerates convergence of the product.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Lemma (Elementary Factor Estimate)</div>
    <div class="env-body">
        <p>For \\(|z| \\leq 1\\) and \\(p \\geq 0\\):</p>
        \\[|1 - E_p(z)| \\leq |z|^{p+1}.\\]
        <p>This is the key estimate ensuring convergence of Weierstrass products.</p>
    </div>
</div>

<h3>The Weierstrass Product Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.1 (Weierstrass Product)</div>
    <div class="env-body">
        <p>Let \\(\\{a_n\\}_{n=1}^{\\infty}\\) be a sequence of nonzero complex numbers with \\(|a_n| \\to \\infty\\), and let \\(m \\geq 0\\) be the order of the zero at the origin. If \\(\\{p_n\\}\\) is any sequence of non-negative integers such that</p>
        \\[\\sum_{n=1}^{\\infty} \\left(\\frac{r}{|a_n|}\\right)^{p_n + 1} < \\infty \\quad \\text{for all } r > 0,\\]
        <p>then the product</p>
        \\[f(z) = z^m \\prod_{n=1}^{\\infty} E_{p_n}\\!\\left(\\frac{z}{a_n}\\right)\\]
        <p>converges uniformly on compact subsets of \\(\\mathbb{C}\\) to an entire function whose zero set is \\(\\{a_n\\}\\) (with multiplicity) together with a zero of order \\(m\\) at the origin.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Sketch</div>
    <div class="env-body">
        <p>On \\(|z| \\leq R\\), for \\(n\\) large enough that \\(|a_n| > R\\), we have \\(|z/a_n| < 1\\), so</p>
        \\[|1 - E_{p_n}(z/a_n)| \\leq |z/a_n|^{p_n+1} \\leq (R/|a_n|)^{p_n+1}.\\]
        <p>The convergence condition ensures \\(\\sum |1 - E_{p_n}(z/a_n)| < \\infty\\), so the product converges absolutely and uniformly on \\(|z| \\leq R\\). Since \\(R\\) is arbitrary, the product defines an entire function. Each factor \\(E_{p_n}(z/a_n)\\) vanishes precisely at \\(z = a_n\\), and no other factors vanish there.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Canonical Product)</div>
    <div class="env-body">
        <p>When \\(p_n = p\\) is constant for all \\(n\\), the product is called the <strong>canonical product of genus \\(p\\)</strong>:</p>
        \\[P(z) = \\prod_{n=1}^{\\infty} E_p\\!\\left(\\frac{z}{a_n}\\right).\\]
        <p>The smallest such \\(p\\) for which the product converges is the <strong>genus</strong> of the zero sequence.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(\\sin(\\pi z)\\) as a Weierstrass Product</div>
    <div class="env-body">
        <p>The zeros of \\(\\sin(\\pi z)\\) are at \\(z = n\\) for \\(n \\in \\mathbb{Z}\\). Since \\(\\sum |n|^{-2} < \\infty\\), we can use elementary factors of order \\(p = 1\\):</p>
        \\[\\sin(\\pi z) = \\pi z \\prod_{n=1}^{\\infty}\\left(1 - \\frac{z^2}{n^2}\\right) = \\pi z \\prod_{n=1}^{\\infty} E_1\\!\\left(\\frac{z}{n}\\right) E_1\\!\\left(\\frac{z}{-n}\\right).\\]
        <p>Pairing the \\(n\\) and \\(-n\\) factors cancels the linear exponential terms, yielding the classical Euler product.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-weierstrass-product"></div>
`,
            visualizations: [
                {
                    id: 'viz-weierstrass-product',
                    title: 'sin(z) as a Weierstrass Product',
                    description: 'Watch the partial products converge to sin(pi*z). Each factor (1 - z^2/n^2) introduces a new pair of zeros. The blue curve is the partial product; the dashed orange curve is sin(pi*z).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 200, scale: 55
                        });

                        var nTerms = 3;
                        var animating = false;
                        var animFrame = 0;

                        VizEngine.createSlider(controls, 'N terms', 1, 20, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        VizEngine.createButton(controls, 'Animate', function() {
                            if (animating) return;
                            animating = true;
                            nTerms = 1;
                            animFrame = 0;
                            function step() {
                                if (nTerms > 20) { animating = false; return; }
                                draw();
                                nTerms++;
                                setTimeout(step, 400);
                            }
                            step();
                        });

                        function partialProduct(x, N) {
                            var result = Math.PI * x;
                            for (var n = 1; n <= N; n++) {
                                result *= (1 - (x * x) / (n * n));
                            }
                            return result;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw sin(pi*z) as reference
                            ctx.setLineDash([6, 4]);
                            viz.drawFunction(function(x) { return Math.sin(Math.PI * x); }, -4.5, 4.5, viz.colors.orange, 2, 500);
                            ctx.setLineDash([]);

                            // Draw partial product
                            viz.drawFunction(function(x) { return partialProduct(x, nTerms); }, -4.5, 4.5, viz.colors.blue, 2.5, 500);

                            // Mark zeros
                            for (var k = -nTerms; k <= nTerms; k++) {
                                viz.drawPoint(k, 0, viz.colors.teal, null, 4);
                            }

                            // Labels
                            viz.screenText('N = ' + nTerms + ' factors', viz.width / 2, 20, viz.colors.white, 14);

                            // Legend
                            ctx.setLineDash([6, 4]);
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(20, viz.height - 30); ctx.lineTo(50, viz.height - 30); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('sin(\u03C0z)', 85, viz.height - 30, viz.colors.orange, 11, 'left');

                            ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                            ctx.beginPath(); ctx.moveTo(20, viz.height - 14); ctx.lineTo(50, viz.height - 14); ctx.stroke();
                            viz.screenText('\u03C0z \u220F(1 - z\u00B2/n\u00B2)', 85, viz.height - 14, viz.colors.blue, 11, 'left');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify the elementary factor estimate \\(|1 - E_1(z)| \\leq |z|^2\\) for \\(|z| \\leq 1\\) by writing \\(E_1(z) = (1-z)e^z\\) and expanding.',
                    hint: 'Expand \\(\\log E_1(z) = \\log(1-z) + z = -z^2/2 - z^3/3 - \\cdots\\) and use \\(|e^w - 1| \\leq |w|e^{|w|}\\).',
                    solution: 'We have \\(\\log E_1(z) = \\log(1-z) + z = -\\sum_{k=2}^{\\infty} z^k/k\\). For \\(|z| \\leq 1\\), \\(|\\log E_1(z)| \\leq |z|^2 \\sum_{k=0}^{\\infty} |z|^k/(k+2) \\leq |z|^2\\). Then \\(|1 - E_1(z)| = |1 - e^{\\log E_1(z)}| \\leq |\\log E_1(z)| \\cdot e^{|\\log E_1(z)|} \\leq |z|^2 \\cdot e^{|z|^2} \\leq e|z|^2\\). A refined argument gives the sharp bound \\(|z|^2\\).'
                },
                {
                    question: 'The zeros of \\(\\cos(\\pi z)\\) are at \\(z = n + 1/2\\) for \\(n \\in \\mathbb{Z}\\). Write down a Weierstrass product for \\(\\cos(\\pi z)\\).',
                    hint: 'Pair the zeros at \\(n + 1/2\\) and \\(-(n+1/2)\\) to get factors \\((1 - z^2/(n+1/2)^2)\\). Compare with the product for \\(\\sin\\).',
                    solution: '\\(\\cos(\\pi z) = \\prod_{n=0}^{\\infty} \\left(1 - \\frac{z^2}{(n + 1/2)^2}\\right) = \\prod_{n=0}^{\\infty}\\left(1 - \\frac{4z^2}{(2n+1)^2}\\right)\\). This converges since \\(\\sum 1/(2n+1)^2 < \\infty\\). The product needs no extra exponential factors (genus 1 with pairing).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Mittag-Leffler Theorem
        // ================================================================
        {
            id: 'sec-mittag-leffler',
            title: 'The Mittag-Leffler Theorem',
            content: `
<h2>The Mittag-Leffler Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">Partial Fractions for Meromorphic Functions</div>
    <div class="env-body">
        <p>A rational function can be decomposed into partial fractions. The Mittag-Leffler theorem generalizes this to meromorphic functions with infinitely many poles: given any sequence of points and any "principal parts" at those points, there exists a meromorphic function with exactly those singularities. The catch: we may need to subtract polynomial "correction terms" to ensure convergence of the sum.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Principal Part)</div>
    <div class="env-body">
        <p>If \\(f\\) has a pole of order \\(m\\) at \\(z = a\\), its <strong>principal part</strong> at \\(a\\) is the negative-power portion of the Laurent series:</p>
        \\[S_a(z) = \\frac{c_{-m}}{(z-a)^m} + \\frac{c_{-m+1}}{(z-a)^{m-1}} + \\cdots + \\frac{c_{-1}}{z-a}.\\]
        <p>The function \\(f(z) - S_a(z)\\) is analytic in a neighborhood of \\(a\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.2 (Mittag-Leffler)</div>
    <div class="env-body">
        <p>Let \\(\\{a_n\\}\\) be a sequence of distinct complex numbers with \\(|a_n| \\to \\infty\\), and let \\(S_n(z)\\) be a polynomial in \\(1/(z - a_n)\\) (the prescribed principal part at \\(a_n\\)). Then there exists a meromorphic function \\(f\\) on \\(\\mathbb{C}\\) whose poles are exactly the \\(a_n\\) and whose principal part at each \\(a_n\\) is \\(S_n\\).</p>
        <p>More precisely, there exist polynomials \\(P_n(z)\\) such that</p>
        \\[f(z) = \\sum_{n=1}^{\\infty} \\bigl[S_n(z) - P_n(z)\\bigr]\\]
        <p>converges uniformly on compact subsets of \\(\\mathbb{C} \\setminus \\{a_n\\}\\). The polynomials \\(P_n\\) are the initial segments of the Taylor expansion of \\(S_n\\) about the origin, chosen to ensure convergence.</p>
        <p>Any two such functions differ by an entire function.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof Idea</div>
    <div class="env-body">
        <p>Each \\(S_n(z)\\) is analytic on \\(|z| < |a_n|\\) and can be expanded in a Taylor series there. Let \\(P_n(z)\\) be the Taylor polynomial of \\(S_n\\) of sufficiently high degree \\(d_n\\). Then \\(S_n(z) - P_n(z) = O(|z/a_n|^{d_n+1})\\) on \\(|z| \\leq R < |a_n|\\). By choosing \\(d_n\\) large enough (e.g., \\(d_n = n\\)), the tails \\(|z/a_n|^{n+1}\\) are summable, giving uniform convergence on compact sets.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(\\pi\\cot(\\pi z)\\)</div>
    <div class="env-body">
        <p>\\(\\pi\\cot(\\pi z)\\) has simple poles at every integer \\(n\\) with residue 1. Its Mittag-Leffler expansion is:</p>
        \\[\\pi\\cot(\\pi z) = \\frac{1}{z} + \\sum_{n=1}^{\\infty}\\left(\\frac{1}{z - n} + \\frac{1}{z + n}\\right) = \\frac{1}{z} + \\sum_{n=1}^{\\infty} \\frac{2z}{z^2 - n^2}.\\]
        <p>The correction polynomials \\(P_n(z) = -1/n\\) and \\(P_{-n}(z) = 1/n\\) cancel when we pair the \\(n\\) and \\(-n\\) terms, yielding the clean formula above.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(\\pi^2/\\sin^2(\\pi z)\\)</div>
    <div class="env-body">
        <p>Differentiating the partial fraction for \\(\\pi\\cot(\\pi z)\\) gives:</p>
        \\[\\frac{\\pi^2}{\\sin^2(\\pi z)} = \\sum_{n=-\\infty}^{\\infty} \\frac{1}{(z-n)^2}.\\]
        <p>Setting \\(z = 1/2\\) yields \\(\\pi^2 = \\sum_{n=-\\infty}^{\\infty} \\frac{1}{(n + 1/2)^2} = 4\\sum_{n=0}^{\\infty}\\frac{1}{(2n+1)^2}\\), which gives \\(\\sum_{n=0}^{\\infty}\\frac{1}{(2n+1)^2} = \\pi^2/8\\) and hence \\(\\sum_{n=1}^{\\infty} 1/n^2 = \\pi^2/6\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-mittag-leffler"></div>
`,
            visualizations: [
                {
                    id: 'viz-mittag-leffler',
                    title: 'Mittag-Leffler: Adding Principal Parts',
                    description: 'Build pi*cot(pi*z) by summing principal parts 1/(z-n). Watch the partial sum converge as N grows. The blue curve is the partial sum; the orange dashed curve is pi*cot(pi*z).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 30
                        });

                        var nTerms = 3;

                        VizEngine.createSlider(controls, 'N terms', 1, 30, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        function piCot(x) {
                            if (Math.abs(x - Math.round(x)) < 0.01) return NaN;
                            return Math.PI * Math.cos(Math.PI * x) / Math.sin(Math.PI * x);
                        }

                        function partialMittagLeffler(x, N) {
                            if (Math.abs(x) < 1e-10) return NaN;
                            var sum = 1 / x;
                            for (var n = 1; n <= N; n++) {
                                var dn1 = x - n;
                                var dn2 = x + n;
                                if (Math.abs(dn1) < 0.01 || Math.abs(dn2) < 0.01) return NaN;
                                sum += 1 / dn1 + 1 / dn2;
                            }
                            return sum;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Reference: pi*cot(pi*z)
                            ctx.setLineDash([5, 4]);
                            viz.drawFunction(piCot, -4.5, 4.5, viz.colors.orange, 1.5, 800);
                            ctx.setLineDash([]);

                            // Partial sum
                            viz.drawFunction(function(x) { return partialMittagLeffler(x, nTerms); }, -4.5, 4.5, viz.colors.blue, 2.5, 800);

                            // Mark poles
                            for (var k = -nTerms; k <= nTerms; k++) {
                                ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                var sx = viz.toScreen(k, 0)[0];
                                ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, viz.height); ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            viz.screenText('N = ' + nTerms, viz.width / 2, 18, viz.colors.white, 14);
                            viz.screenText('1/z + \u03A3 (1/(z-n) + 1/(z+n))', viz.width / 2, viz.height - 14, viz.colors.blue, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Derive the partial fraction expansion of \\(\\pi/\\sin(\\pi z)\\).',
                    hint: 'The poles of \\(1/\\sin(\\pi z)\\) are at \\(z = n\\) with residues \\((-1)^n/\\pi\\). Pair the \\(n\\) and \\(-n\\) terms.',
                    solution: '\\(\\frac{\\pi}{\\sin(\\pi z)} = \\frac{1}{z} + \\sum_{n=1}^{\\infty} (-1)^n \\left(\\frac{1}{z-n} + \\frac{1}{z+n}\\right) = \\frac{1}{z} + \\sum_{n=1}^{\\infty} \\frac{(-1)^n 2z}{z^2 - n^2}\\). The residue at \\(z = n\\) is \\(\\lim_{z \\to n}(z-n) \\pi/\\sin(\\pi z) = \\pi \\cdot 1/(\\pi \\cos(\\pi n)) = (-1)^n\\).'
                },
                {
                    question: 'Use the Mittag-Leffler expansion of \\(\\pi^2/\\sin^2(\\pi z)\\) to compute \\(\\sum_{n=1}^{\\infty} 1/n^2\\).',
                    hint: 'Set \\(z = 0\\) in the derivative of \\(\\pi\\cot(\\pi z)\\), or set \\(z = 1/2\\) in the expansion of \\(\\pi^2/\\sin^2(\\pi z)\\).',
                    solution: 'From \\(\\pi^2/\\sin^2(\\pi z) = \\sum_{n=-\\infty}^{\\infty} 1/(z-n)^2\\), set \\(z = 1/2\\): \\(\\pi^2/1 = \\sum_{n=-\\infty}^{\\infty} 1/(1/2 - n)^2 = 4\\sum_{n=0}^{\\infty} 1/(2n+1)^2\\). So \\(\\sum 1/(2n+1)^2 = \\pi^2/8\\). Since \\(\\sum 1/n^2 = \\sum 1/(2k)^2 + \\sum 1/(2k+1)^2 = (1/4)\\sum 1/k^2 + \\pi^2/8\\), we get \\((3/4)\\sum 1/n^2 = \\pi^2/8\\), hence \\(\\sum 1/n^2 = \\pi^2/6\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Order of Growth
        // ================================================================
        {
            id: 'sec-order',
            title: 'Order of Growth',
            content: `
<h2>Order of Growth</h2>

<div class="env-block intuition">
    <div class="env-title">How Fast Can Entire Functions Grow?</div>
    <div class="env-body">
        <p>A polynomial of degree \\(d\\) satisfies \\(|p(z)| \\leq C|z|^d\\) for large \\(|z|\\). Entire functions can grow faster: \\(e^z\\) grows like \\(e^r\\) on the positive real axis. The "order" measures this growth on a logarithmic scale. An entire function of order \\(\\rho\\) grows roughly like \\(e^{|z|^\\rho}\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Order of an Entire Function)</div>
    <div class="env-body">
        <p>Let \\(f\\) be a non-constant entire function. Define</p>
        \\[M(r) = \\max_{|z|=r} |f(z)|.\\]
        <p>The <strong>order</strong> of \\(f\\) is</p>
        \\[\\rho = \\limsup_{r \\to \\infty} \\frac{\\log\\log M(r)}{\\log r}.\\]
        <p>Equivalently, \\(\\rho\\) is the infimum of all \\(\\alpha > 0\\) such that \\(M(r) \\leq e^{r^\\alpha}\\) for all sufficiently large \\(r\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Examples of Order</div>
    <div class="env-body">
        <table style="width:100%; border-collapse:collapse; margin:12px 0; font-size:0.9em;">
            <tr style="border-bottom:2px solid var(--border-default);">
                <th style="padding:8px; text-align:left;">Function</th>
                <th style="padding:8px; text-align:center;">Growth</th>
                <th style="padding:8px; text-align:center;">Order \\(\\rho\\)</th>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;">Polynomial \\(p(z)\\)</td>
                <td style="padding:8px; text-align:center;">\\(|z|^d\\)</td>
                <td style="padding:8px; text-align:center;">0</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;">\\(e^z\\)</td>
                <td style="padding:8px; text-align:center;">\\(e^r\\)</td>
                <td style="padding:8px; text-align:center;">1</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;">\\(\\sin(\\pi z)\\)</td>
                <td style="padding:8px; text-align:center;">\\(\\sim e^{\\pi r}/2\\)</td>
                <td style="padding:8px; text-align:center;">1</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;">\\(e^{z^2}\\)</td>
                <td style="padding:8px; text-align:center;">\\(e^{r^2}\\)</td>
                <td style="padding:8px; text-align:center;">2</td>
            </tr>
            <tr>
                <td style="padding:8px;">\\(e^{e^z}\\)</td>
                <td style="padding:8px; text-align:center;">\\(e^{e^r}\\)</td>
                <td style="padding:8px; text-align:center;">\\(\\infty\\)</td>
            </tr>
        </table>
    </div>
</div>

<h3>The Exponent of Convergence</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Exponent of Convergence)</div>
    <div class="env-body">
        <p>Given the zeros \\(\\{a_n\\}\\) of an entire function (listed with multiplicity, \\(a_n \\neq 0\\)), the <strong>exponent of convergence</strong> is</p>
        \\[\\lambda = \\inf\\left\\{\\alpha > 0 : \\sum_{n=1}^{\\infty} \\frac{1}{|a_n|^\\alpha} < \\infty\\right\\}.\\]
        <p>Equivalently, \\(\\lambda = \\limsup_{r \\to \\infty} \\frac{\\log n(r)}{\\log r}\\), where \\(n(r)\\) counts the number of zeros in \\(|z| \\leq r\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div name="env-title">Theorem 17.3 (Order-Exponent Inequality)</div>
    <div class="env-body">
        <p>If \\(f\\) is entire of order \\(\\rho\\) with exponent of convergence \\(\\lambda\\), then \\(\\lambda \\leq \\rho\\).</p>
        <p>Equality \\(\\lambda = \\rho\\) holds when the growth of \\(f\\) is "entirely due to its zeros" (more precisely, when the canonical product has the same order as \\(f\\)).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-order-growth"></div>
`,
            visualizations: [
                {
                    id: 'viz-order-growth',
                    title: 'Comparing Growth Rates',
                    description: 'Compare log log M(r) / log r for different entire functions as r grows, illustrating how the order captures the growth rate.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 70, originY: 340, scale: 1
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var chartL = 70, chartR = 530, chartT = 40, chartB = 330;
                            var chartW = chartR - chartL, chartH = chartB - chartT;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(chartL, chartB); ctx.lineTo(chartR, chartB); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(chartL, chartB); ctx.lineTo(chartL, chartT); ctx.stroke();

                            viz.screenText('r', chartR + 10, chartB, viz.colors.text, 12);
                            viz.screenText('log log M(r) / log r', chartL - 10, chartT - 12, viz.colors.text, 10, 'center');

                            var rMax = 10;
                            var yMax = 3.5;

                            // Grid
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                            for (var gy = 0; gy <= 3; gy++) {
                                var sy = chartB - (gy / yMax) * chartH;
                                ctx.beginPath(); ctx.moveTo(chartL, sy); ctx.lineTo(chartR, sy); ctx.stroke();
                                ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                                ctx.fillText(gy.toString(), chartL - 6, sy);
                            }

                            // Functions: log log M(r) / log r
                            var funcs = [
                                { name: 'e^z (\u03C1=1)', color: viz.colors.blue, fn: function(r) { return r > 0.5 ? Math.log(Math.log(Math.exp(r))) / Math.log(r) : 0; } },
                                { name: 'sin(\u03C0z) (\u03C1=1)', color: viz.colors.teal, fn: function(r) { var M = Math.exp(Math.PI * r) / 2; return r > 1 ? Math.log(Math.log(Math.max(M, 2))) / Math.log(r) : 0; } },
                                { name: 'e^{z\u00B2} (\u03C1=2)', color: viz.colors.orange, fn: function(r) { return r > 0.5 ? Math.log(Math.log(Math.exp(r * r))) / Math.log(r) : 0; } },
                                { name: 'e^{z\u00B3} (\u03C1=3)', color: viz.colors.purple, fn: function(r) { return r > 0.5 ? Math.log(Math.log(Math.exp(r * r * r))) / Math.log(r) : 0; } }
                            ];

                            for (var fi = 0; fi < funcs.length; fi++) {
                                var f = funcs[fi];
                                ctx.strokeStyle = f.color; ctx.lineWidth = 2;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= 300; i++) {
                                    var r = 0.5 + (rMax - 0.5) * i / 300;
                                    var y = f.fn(r);
                                    if (!isFinite(y) || y < 0 || y > yMax * 1.2) { started = false; continue; }
                                    var sx = chartL + ((r - 0) / rMax) * chartW;
                                    var sy = chartB - (y / yMax) * chartH;
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();

                                // Legend
                                ctx.fillStyle = f.color;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(f.name, chartR - 140, chartT + 16 + fi * 18);
                                ctx.fillRect(chartR - 155, chartT + 10 + fi * 18, 10, 10);
                            }

                            // Dashed reference lines at y=1,2,3
                            ctx.setLineDash([4, 4]);
                            for (var ref = 1; ref <= 3; ref++) {
                                var ry = chartB - (ref / yMax) * chartH;
                                ctx.strokeStyle = viz.colors.text + '44'; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(chartL, ry); ctx.lineTo(chartR, ry); ctx.stroke();
                            }
                            ctx.setLineDash([]);

                            viz.screenText('Order of Growth Comparison', viz.width / 2, 18, viz.colors.white, 14);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the order of \\(f(z) = \\sum_{n=0}^{\\infty} z^n / (n!)^2\\).',
                    hint: 'Use the Hadamard formula \\(1/R = \\limsup |c_n|^{1/n}\\) for the radius (which is \\(\\infty\\)), then estimate \\(M(r)\\) using \\(|c_n| = 1/(n!)^2\\). Apply Stirling.',
                    solution: 'By Stirling, \\(|c_n|^{1/n} = 1/(n!)^{2/n} \\sim e^2/n^2 \\to 0\\), so \\(R = \\infty\\). For \\(M(r)\\), the dominant term in \\(\\sum r^n/(n!)^2\\) is at \\(n \\approx \\sqrt{r}\\), giving \\(\\log M(r) \\sim 2\\sqrt{r}\\). Thus \\(\\rho = \\limsup \\log\\log M(r)/\\log r = \\limsup \\log(2\\sqrt{r})/\\log r = 1/2\\). The order is \\(1/2\\). (This function is related to the Bessel function \\(I_0(2\\sqrt{z})\\).)'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Hadamard Factorization
        // ================================================================
        {
            id: 'sec-hadamard',
            title: 'Hadamard Factorization',
            content: `
<h2>Hadamard's Factorization Theorem</h2>

<div class="env-block intuition">
    <div class="env-title">Structure of Finite-Order Entire Functions</div>
    <div class="env-body">
        <p>Weierstrass tells us that an entire function <em>can</em> be written as a product over its zeros times an exponential. Hadamard sharpens this for functions of finite order: the exponential factor must be a polynomial, and its degree is controlled by the order. This is a remarkably rigid constraint.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Genus)</div>
    <div class="env-body">
        <p>An entire function \\(f\\) of finite order \\(\\rho\\) has <strong>genus</strong> \\(\\mu\\) if it can be written as</p>
        \\[f(z) = z^m e^{Q(z)} \\prod_{n=1}^{\\infty} E_p\\!\\left(\\frac{z}{a_n}\\right),\\]
        <p>where \\(Q\\) is a polynomial of degree \\(q\\) and \\(p\\) is the genus of the canonical product. The genus is \\(\\mu = \\max(p, q)\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.4 (Hadamard Factorization)</div>
    <div class="env-body">
        <p>Let \\(f\\) be an entire function of finite order \\(\\rho\\), with zeros \\(\\{a_n\\}\\) (\\(a_n \\neq 0\\)) of exponent of convergence \\(\\lambda\\). Let \\(p = \\lfloor \\lambda \\rfloor\\) if \\(\\sum |a_n|^{-\\lambda}\\) diverges, and \\(p = \\lceil \\lambda \\rceil - 1\\) if it converges. Then</p>
        \\[f(z) = z^m e^{Q(z)} \\prod_{n=1}^{\\infty} E_p\\!\\left(\\frac{z}{a_n}\\right),\\]
        <p>where \\(Q(z)\\) is a polynomial of degree \\(\\leq \\lfloor \\rho \\rfloor\\), and the genus satisfies \\(\\mu \\leq \\lfloor \\rho \\rfloor\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Hadamard Factorization of \\(\\sin(\\pi z)\\)</div>
    <div class="env-body">
        <p>\\(\\sin(\\pi z)\\) has order \\(\\rho = 1\\). Its zeros are \\(a_n = n\\) for \\(n \\in \\mathbb{Z} \\setminus \\{0\\}\\), with exponent of convergence \\(\\lambda = 1\\) (since \\(\\sum |n|^{-1}\\) diverges but \\(\\sum |n|^{-2}\\) converges). The genus is \\(p = 1\\). By Hadamard:</p>
        \\[\\sin(\\pi z) = z \\cdot e^{Q(z)} \\prod_{n \\neq 0} E_1(z/n) = z \\cdot e^{Q(z)} \\prod_{n=1}^{\\infty}\\left(1 - \\frac{z^2}{n^2}\\right),\\]
        <p>where \\(Q(z)\\) has degree \\(\\leq 1\\). Comparing with \\(\\sin(\\pi z)/z \\to \\pi\\) as \\(z \\to 0\\), we find \\(e^{Q(0)} = \\pi\\). By symmetry \\(\\sin(\\pi z)\\) is odd, so \\(Q(z) = \\log \\pi\\) (constant). Thus \\(\\sin(\\pi z) = \\pi z \\prod_{n=1}^{\\infty}(1 - z^2/n^2)\\).</p>
    </div>
</div>

<div class="env-block corollary">
    <div class="env-title">Corollary (Zeros Determine Order-1 Functions)</div>
    <div class="env-body">
        <p>If \\(f\\) is entire of order \\(< 1\\), then \\(Q\\) is a constant and \\(f\\) is determined (up to a multiplicative constant) by its zeros alone:</p>
        \\[f(z) = c z^m \\prod_{n=1}^{\\infty} \\left(1 - \\frac{z}{a_n}\\right).\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-hadamard"></div>
`,
            visualizations: [
                {
                    id: 'viz-hadamard',
                    title: 'Hadamard Factorization of sin(pi*z)',
                    description: 'See how the canonical product pi*z * prod(1 - z^2/n^2) converges to sin(pi*z). The convergence is rapid because the elementary factors of order 1 eliminate the leading error terms.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 55
                        });

                        var nTerms = 5;

                        VizEngine.createSlider(controls, 'N factors', 1, 30, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        function partialProduct(x, N) {
                            var result = Math.PI * x;
                            for (var n = 1; n <= N; n++) {
                                result *= (1 - (x * x) / (n * n));
                            }
                            return result;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // sin(pi*z) reference
                            ctx.setLineDash([5, 4]);
                            viz.drawFunction(function(x) { return Math.sin(Math.PI * x); }, -4.5, 4.5, viz.colors.orange, 1.5, 500);
                            ctx.setLineDash([]);

                            // Partial product
                            viz.drawFunction(function(x) { return partialProduct(x, nTerms); }, -4.5, 4.5, viz.colors.blue, 2.5, 500);

                            // Error plot at bottom
                            var errH = 60, errBot = viz.height - 10, errTop = errBot - errH;
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0, errTop - 5, viz.width, errH + 15);
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.5;
                            ctx.beginPath(); ctx.moveTo(30, errTop + errH / 2); ctx.lineTo(viz.width - 30, errTop + errH / 2); ctx.stroke();

                            // Plot |error| in the error strip
                            ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            var started = false;
                            var maxErr = 0;
                            for (var i = 0; i <= 400; i++) {
                                var x = -4 + 8 * i / 400;
                                var err = Math.abs(Math.sin(Math.PI * x) - partialProduct(x, nTerms));
                                if (err > maxErr) maxErr = err;
                            }
                            if (maxErr < 1e-10) maxErr = 1;
                            for (var j = 0; j <= 400; j++) {
                                var xx = -4 + 8 * j / 400;
                                var e = Math.abs(Math.sin(Math.PI * xx) - partialProduct(xx, nTerms));
                                var sx = 30 + (viz.width - 60) * j / 400;
                                var sy = errTop + errH / 2 - (e / maxErr) * (errH / 2 - 2);
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            viz.screenText('|error|', 16, errTop + errH / 2, viz.colors.red, 9, 'left');
                            viz.screenText('max |err| = ' + maxErr.toExponential(2), viz.width - 16, errTop + 8, viz.colors.red, 9, 'right');

                            viz.screenText('N = ' + nTerms + ' factors, genus p = 1', viz.width / 2, 18, viz.colors.white, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the Hadamard factorization of \\(\\cos(\\pi z)\\).',
                    hint: 'The order is 1. The zeros are at \\(z = (2n+1)/2\\). There is no zero at the origin. What is \\(Q(z)\\)?',
                    solution: 'Order \\(\\rho = 1\\), zeros at \\(a_n = (2n+1)/2\\) for \\(n \\in \\mathbb{Z}\\), exponent of convergence \\(\\lambda = 1\\). By Hadamard: \\(\\cos(\\pi z) = e^{Q(z)} \\prod_{n=0}^{\\infty}(1 - 4z^2/(2n+1)^2)\\) with \\(\\deg Q \\leq 1\\). Since \\(\\cos(\\pi z)\\) is even, \\(Q(z)\\) must be constant. Setting \\(z = 0\\): \\(1 = e^{Q(0)} \\cdot 1\\), so \\(Q = 0\\). Thus \\(\\cos(\\pi z) = \\prod_{n=0}^{\\infty}(1 - 4z^2/(2n+1)^2)\\).'
                },
                {
                    question: 'Prove that an entire function of order \\(\\rho < 1/2\\) with no zeros must be a constant.',
                    hint: 'By Hadamard, \\(f(z) = e^{Q(z)}\\) with \\(\\deg Q \\leq \\lfloor \\rho \\rfloor = 0\\).',
                    solution: 'Since \\(\\rho < 1/2 < 1\\), \\(\\lfloor \\rho \\rfloor = 0\\), so \\(Q\\) has degree 0, meaning \\(Q\\) is a constant. Then \\(f(z) = e^c\\), a constant. (Note: this argument fails at \\(\\rho = 1\\); \\(e^z\\) has order 1 and no zeros.)'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Meromorphic Functions
        // ================================================================
        {
            id: 'sec-meromorphic',
            title: 'Meromorphic Functions on C',
            content: `
<h2>Meromorphic Functions on \\(\\mathbb{C}\\)</h2>

<div class="env-block intuition">
    <div class="env-title">Ratios and Beyond</div>
    <div class="env-body">
        <p>A meromorphic function on \\(\\mathbb{C}\\) is a ratio of two entire functions (with the denominator not identically zero). Alternatively, it is a function that is analytic everywhere except for isolated poles. Classic examples include \\(\\pi\\cot(\\pi z)\\) and the Gamma function \\(1/\\Gamma(z)\\). Both Weierstrass and Mittag-Leffler give us tools to construct and decompose these functions.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Meromorphic Function)</div>
    <div class="env-body">
        <p>A function \\(f\\) is <strong>meromorphic on \\(\\mathbb{C}\\)</strong> if it is holomorphic on \\(\\mathbb{C}\\) except for a set of isolated points \\(\\{a_n\\}\\) where \\(f\\) has poles. Equivalently, \\(f = g/h\\) where \\(g, h\\) are entire and \\(h \\not\\equiv 0\\).</p>
    </div>
</div>

<h3>\\(\\pi\\cot(\\pi z)\\): A Complete Portrait</h3>

<p>Combining Weierstrass and Mittag-Leffler gives a beautiful relationship. Taking the logarithmic derivative of the Weierstrass product for \\(\\sin(\\pi z)\\):</p>

\\[\\frac{d}{dz}\\log\\sin(\\pi z) = \\pi\\cot(\\pi z) = \\frac{\\pi\\cos(\\pi z)}{\\sin(\\pi z)}.\\]

<p>The Weierstrass product \\(\\sin(\\pi z) = \\pi z\\prod_{n=1}^{\\infty}(1 - z^2/n^2)\\) gives</p>

\\[\\pi\\cot(\\pi z) = \\frac{1}{z} + \\sum_{n=1}^{\\infty}\\left(\\frac{1}{z-n} + \\frac{1}{z+n}\\right) = \\frac{1}{z} + \\sum_{n=1}^{\\infty}\\frac{2z}{z^2 - n^2}.\\]

<p>This is simultaneously a Mittag-Leffler expansion and the logarithmic derivative of a Weierstrass product, connecting the two fundamental theorems.</p>

<h3>The Gamma Function</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Gamma Function via Weierstrass)</div>
    <div class="env-body">
        <p>The <strong>Gamma function</strong> can be defined via the Weierstrass product for \\(1/\\Gamma(z)\\):</p>
        \\[\\frac{1}{\\Gamma(z)} = z e^{\\gamma z} \\prod_{n=1}^{\\infty}\\left(1 + \\frac{z}{n}\\right)e^{-z/n},\\]
        <p>where \\(\\gamma = \\lim_{n \\to \\infty}(1 + 1/2 + \\cdots + 1/n - \\log n) \\approx 0.5772\\) is the Euler-Mascheroni constant.</p>
        <p>Thus \\(1/\\Gamma(z)\\) is entire of order 1, with simple zeros at \\(z = 0, -1, -2, \\ldots\\), and \\(\\Gamma(z)\\) is meromorphic with simple poles at \\(z = 0, -1, -2, \\ldots\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 17.5 (Euler's Reflection Formula)</div>
    <div class="env-body">
        <p>For all \\(z \\notin \\mathbb{Z}\\):</p>
        \\[\\Gamma(z)\\Gamma(1-z) = \\frac{\\pi}{\\sin(\\pi z)}.\\]
        <p>This follows directly from comparing the Weierstrass products of \\(1/\\Gamma(z)\\), \\(1/\\Gamma(1-z)\\), and \\(\\sin(\\pi z)\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-gamma-function"></div>
<div class="viz-placeholder" data-viz="viz-pi-cot"></div>
`,
            visualizations: [
                {
                    id: 'viz-gamma-function',
                    title: 'The Gamma Function: Domain Coloring',
                    description: 'Domain coloring of the Gamma function on the complex plane. The hue encodes the argument of Gamma(z), and brightness encodes the modulus. Poles at 0, -1, -2, ... appear as bright spots with all colors swirling around them.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 350, originY: 190, scale: 50
                        });

                        // Lanczos approximation for Gamma
                        function gammaComplex(re, im) {
                            // Reflection for Re(z) < 0.5
                            if (re < 0.5) {
                                // Gamma(z) = pi / (sin(pi*z) * Gamma(1-z))
                                var gr = gammaComplex(1 - re, -im);
                                // sin(pi*z)
                                var sinRe = Math.sin(Math.PI * re) * Math.cosh(Math.PI * im);
                                var sinIm = Math.cos(Math.PI * re) * Math.sinh(Math.PI * im);
                                // pi / (sin * gamma(1-z))
                                // complex division: pi / (sin * gr)
                                var pRe = sinRe * gr[0] - sinIm * gr[1];
                                var pIm = sinRe * gr[1] + sinIm * gr[0];
                                var denom = pRe * pRe + pIm * pIm;
                                if (denom < 1e-30) return [1e10, 0];
                                return [Math.PI * pRe / denom, -Math.PI * pIm / denom];
                            }

                            // Lanczos coefficients (g=7)
                            var g = 7;
                            var c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
                                     771.32342877765313, -176.61502916214059, 12.507343278686905,
                                     -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

                            var zr = re - 1, zi = im;
                            var xr = c[0], xi = 0;
                            for (var i = 1; i < 9; i++) {
                                var dr = zr + i, di = zi;
                                var d2 = dr * dr + di * di;
                                if (d2 < 1e-30) d2 = 1e-30;
                                xr += c[i] * dr / d2;
                                xi += -c[i] * di / d2;
                            }

                            var tr = zr + g + 0.5, ti = zi;
                            // (t)^(z+0.5) * exp(-t) * x * sqrt(2*pi)
                            // log(t) = log|t| + i*arg(t)
                            var logMagT = 0.5 * Math.log(tr * tr + ti * ti);
                            var argT = Math.atan2(ti, tr);

                            // (z+0.5)*log(t)
                            var pr = (zr + 0.5) * logMagT - zi * argT;
                            var pi2 = (zr + 0.5) * argT + zi * logMagT;

                            // subtract t
                            pr -= tr;
                            pi2 -= ti;

                            // exp(p) * x * sqrt(2pi)
                            var expR = Math.exp(pr);
                            var eRe = expR * Math.cos(pi2);
                            var eIm = expR * Math.sin(pi2);

                            var sq2pi = Math.sqrt(2 * Math.PI);
                            // multiply by x
                            var rRe = eRe * xr - eIm * xi;
                            var rIm = eRe * xi + eIm * xr;

                            return [rRe * sq2pi, rIm * sq2pi];
                        }

                        function draw() {
                            viz.drawDomainColoring(
                                function(re, im) { return gammaComplex(re, im); },
                                [-5.5, 3.5], [-3.5, 3.5]
                            );
                            var ctx = viz.ctx;

                            // Draw axes overlay
                            ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
                            var ox = viz.toScreen(0, 0)[0], oy = viz.toScreen(0, 0)[1];
                            ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(viz.width, oy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, viz.height); ctx.stroke();

                            // Mark poles
                            for (var n = 0; n >= -5; n--) {
                                var sp = viz.toScreen(n, 0);
                                ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(sp[0] - 5, sp[1] - 5); ctx.lineTo(sp[0] + 5, sp[1] + 5); ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(sp[0] + 5, sp[1] - 5); ctx.lineTo(sp[0] - 5, sp[1] + 5); ctx.stroke();
                            }

                            viz.screenText('\u0393(z) Domain Coloring', viz.width / 2, 16, '#ffffffcc', 14);
                            viz.screenText('Poles at z = 0, -1, -2, ...', viz.width / 2, viz.height - 12, '#ffffffaa', 11);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-pi-cot',
                    title: '\u03C0 cot(\u03C0z): Partial Fraction Convergence',
                    description: 'The domain coloring of pi*cot(pi*z) compared with its partial fraction approximation. Slide N to see how many pole-pairs are included.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            originX: 280, originY: 190, scale: 40
                        });

                        var nTerms = 5;
                        var showExact = true;

                        VizEngine.createSlider(controls, 'N poles', 1, 20, nTerms, 1, function(v) {
                            nTerms = Math.round(v);
                            draw();
                        });

                        VizEngine.createButton(controls, 'Toggle Exact/Approx', function() {
                            showExact = !showExact;
                            draw();
                        });

                        function draw() {
                            if (showExact) {
                                // Domain coloring of pi*cot(pi*z)
                                viz.drawDomainColoring(function(re, im) {
                                    // pi*cot(pi*z) = pi*cos(pi*z)/sin(pi*z)
                                    var sinRe = Math.sin(Math.PI * re) * Math.cosh(Math.PI * im);
                                    var sinIm = Math.cos(Math.PI * re) * Math.sinh(Math.PI * im);
                                    var cosRe = Math.cos(Math.PI * re) * Math.cosh(Math.PI * im);
                                    var cosIm = -Math.sin(Math.PI * re) * Math.sinh(Math.PI * im);
                                    var d2 = sinRe * sinRe + sinIm * sinIm;
                                    if (d2 < 1e-20) return [1e6, 0];
                                    var qr = (cosRe * sinRe + cosIm * sinIm) / d2;
                                    var qi = (cosIm * sinRe - cosRe * sinIm) / d2;
                                    return [Math.PI * qr, Math.PI * qi];
                                }, [-6, 6], [-4, 4]);
                                viz.screenText('\u03C0 cot(\u03C0z) - exact', viz.width / 2, 16, '#ffffffcc', 14);
                            } else {
                                // Domain coloring of partial fraction
                                viz.drawDomainColoring(function(re, im) {
                                    // 1/z + sum_{n=1}^{N} (1/(z-n) + 1/(z+n))
                                    var d2 = re * re + im * im;
                                    if (d2 < 1e-20) return [1e6, 0];
                                    var sr = re / d2, si = -im / d2;
                                    for (var n = 1; n <= nTerms; n++) {
                                        // 1/(z-n)
                                        var d1r = re - n, d1i = im;
                                        var dd1 = d1r * d1r + d1i * d1i;
                                        if (dd1 < 1e-20) return [1e6, 0];
                                        sr += d1r / dd1;
                                        si += -d1i / dd1;
                                        // 1/(z+n)
                                        var d2r = re + n, d2i = im;
                                        var dd2 = d2r * d2r + d2i * d2i;
                                        if (dd2 < 1e-20) return [1e6, 0];
                                        sr += d2r / dd2;
                                        si += -d2i / dd2;
                                    }
                                    return [sr, si];
                                }, [-6, 6], [-4, 4]);
                                viz.screenText('Partial fraction, N = ' + nTerms, viz.width / 2, 16, '#ffffffcc', 14);
                            }

                            // Mark integer poles
                            var ctx = viz.ctx;
                            var limit = showExact ? 5 : nTerms;
                            for (var k = -limit; k <= limit; k++) {
                                var sp = viz.toScreen(k, 0);
                                if (sp[0] > 10 && sp[0] < viz.width - 10) {
                                    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.arc(sp[0], sp[1], 4, 0, Math.PI * 2);
                                    ctx.stroke();
                                }
                            }

                            viz.screenText(showExact ? 'Click Toggle for partial fraction' : 'Click Toggle for exact function',
                                viz.width / 2, viz.height - 12, '#ffffff88', 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Derive Euler\'s reflection formula \\(\\Gamma(z)\\Gamma(1-z) = \\pi/\\sin(\\pi z)\\) from the Weierstrass product definitions.',
                    hint: 'Write the Weierstrass products for \\(1/\\Gamma(z)\\) and \\(1/\\Gamma(1-z)\\), multiply them, and compare with the Weierstrass product for \\(\\sin(\\pi z)/\\pi\\).',
                    solution: '\\(\\frac{1}{\\Gamma(z)\\Gamma(1-z)} = z e^{\\gamma z}\\prod_{n=1}^{\\infty}(1+z/n)e^{-z/n} \\cdot (-z)e^{-\\gamma z} \\cdot \\prod_{n=1}^{\\infty}(1 - z/n + 1/n)e^{z/n - 1/n}\\cdots\\). After careful simplification using \\((1-z) \\to z\\) substitution and product cancellations, one obtains \\(1/(\\Gamma(z)\\Gamma(1-z)) = \\sin(\\pi z)/\\pi\\), giving the reflection formula.'
                },
                {
                    question: 'Show that \\(\\Gamma(z)\\) has no zeros in \\(\\mathbb{C}\\).',
                    hint: 'Use the fact that \\(1/\\Gamma(z)\\) is entire. If \\(\\Gamma(z_0) = 0\\), what does that mean for \\(1/\\Gamma\\)?',
                    solution: 'If \\(\\Gamma(z_0) = 0\\), then \\(1/\\Gamma(z_0) = \\infty\\), contradicting the fact that \\(1/\\Gamma\\) is entire (hence finite everywhere). Therefore \\(\\Gamma(z) \\neq 0\\) for all \\(z \\in \\mathbb{C}\\). (At \\(z = 0, -1, -2, \\ldots\\), \\(\\Gamma\\) has poles, not zeros; and \\(1/\\Gamma\\) has zeros there.)'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Next Chapter
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: Analytic Continuation</h2>

<div class="env-block intuition">
    <div class="env-title">From Construction to Continuation</div>
    <div class="env-body">
        <p>In this chapter, we built entire and meromorphic functions "from scratch": prescribing zeros (Weierstrass), prescribing poles (Mittag-Leffler), and constraining the result by growth (Hadamard). These are <em>constructive</em> theorems: given specifications, they produce functions.</p>
        <p>The next chapter asks a different question: given a function defined on a small domain, can we <em>extend</em> it to a larger one? This is the theory of <strong>analytic continuation</strong>, and it leads to the Riemann surface viewpoint, multi-valued functions, and ultimately the Riemann zeta function.</p>
    </div>
</div>

<h3>Key Ideas to Carry Forward</h3>

<ul>
    <li><strong>The Weierstrass product for \\(\\Gamma\\)</strong> defines it on \\(\\mathbb{C}\\) minus the non-positive integers, but the functional equation \\(\\Gamma(z+1) = z\\Gamma(z)\\) can extend it. Analytic continuation makes this process systematic.</li>
    <li><strong>The Riemann zeta function</strong> \\(\\zeta(s) = \\sum n^{-s}\\) converges only for \\(\\operatorname{Re}(s) > 1\\), but it has a meromorphic continuation to all of \\(\\mathbb{C}\\) (with a single pole at \\(s = 1\\)). Proving this uses the Gamma function and Mittag-Leffler ideas.</li>
    <li><strong>Order of growth</strong> connects to the distribution of zeros of \\(\\zeta(s)\\) and other L-functions. The Hadamard product for \\(\\xi(s)\\) (the completed zeta function) is a central tool in analytic number theory.</li>
</ul>

<h3>Summary of Main Results</h3>

<div class="env-block definition">
    <div class="env-title">Chapter 17 at a Glance</div>
    <div class="env-body">
        <table style="width:100%; border-collapse:collapse; margin:12px 0; font-size:0.9em;">
            <tr style="border-bottom:2px solid var(--border-default);">
                <th style="padding:8px; text-align:left;">Theorem</th>
                <th style="padding:8px; text-align:left;">What it does</th>
                <th style="padding:8px; text-align:left;">Key formula</th>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;">Weierstrass</td>
                <td style="padding:8px;">Prescribes zeros of an entire function</td>
                <td style="padding:8px;">\\(f = z^m \\prod E_{p_n}(z/a_n)\\)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;">Mittag-Leffler</td>
                <td style="padding:8px;">Prescribes poles of a meromorphic function</td>
                <td style="padding:8px;">\\(f = \\sum [S_n(z) - P_n(z)]\\)</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-subtle);">
                <td style="padding:8px;">Hadamard</td>
                <td style="padding:8px;">Factors finite-order entire functions</td>
                <td style="padding:8px;">\\(f = z^m e^{Q(z)} \\prod E_p(z/a_n)\\)</td>
            </tr>
            <tr>
                <td style="padding:8px;">Order & Genus</td>
                <td style="padding:8px;">Connects growth to zero distribution</td>
                <td style="padding:8px;">\\(\\lambda \\leq \\rho\\), \\(\\mu \\leq \\lfloor\\rho\\rfloor\\)</td>
            </tr>
        </table>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">The Big Picture</div>
    <div class="env-body">
        <p>The Weierstrass and Mittag-Leffler theorems are "existence" results: they show the algebra of meromorphic functions is rich enough to accommodate any prescribed zero/pole data. Hadamard's theorem adds "rigidity": finite growth constrains the factorization. Together, they form the foundation for much of modern complex analysis, from value distribution theory (Nevanlinna theory) to the study of L-functions in number theory.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Explain why the Weierstrass and Mittag-Leffler theorems can be viewed as "duals" of each other.',
                    hint: 'One prescribes zeros (where the function vanishes), the other prescribes poles (where it blows up). Think about how logarithmic differentiation connects products and sums.',
                    solution: 'Weierstrass constructs an entire function \\(f\\) with prescribed zeros via a product. Mittag-Leffler constructs a meromorphic function with prescribed poles via a sum. Logarithmic differentiation converts products to sums: if \\(f = \\prod E_p(z/a_n)\\), then \\(f\'/f = \\sum\\) (principal parts at the \\(a_n\\)). So the logarithmic derivative of a Weierstrass product is a Mittag-Leffler expansion. This is exactly what happens with \\(\\sin(\\pi z)\\) and \\(\\pi\\cot(\\pi z)\\).'
                }
            ]
        }
    ]
});
