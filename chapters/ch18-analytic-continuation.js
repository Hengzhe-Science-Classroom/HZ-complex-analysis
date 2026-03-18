window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch18',
    number: 18,
    title: 'Analytic Continuation',
    subtitle: 'Extending functions beyond their original domain',
    sections: [

        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Motivation: Functions That Want to Grow</h2>

<div class="env-block intuition">
    <div class="env-title">A Familiar Mystery</div>
    <div class="env-body">
        <p>The geometric series \\(\\sum_{n=0}^{\\infty} z^n\\) converges to \\(\\frac{1}{1-z}\\) only for \\(|z| < 1\\). Yet the formula \\(\\frac{1}{1-z}\\) is perfectly meaningful for \\(z = 2, z = -5, z = 1 + i\\). The series "stops," but the function it represents does not. Analytic continuation is the theory that makes this precise.</p>
    </div>
</div>

<p>Every power series \\(\\sum_{n=0}^{\\infty} a_n (z - z_0)^n\\) converges in an open disk of radius \\(R\\) (its radius of convergence). Inside that disk it defines an analytic function \\(f\\). But \\(f\\) may extend analytically to a much larger region, even to the entire complex plane minus a small exceptional set.</p>

<h3>The Bernhard Riemann Zeta Function</h3>

<p>The most famous example: Euler defined</p>
\\[\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s}\\]
<p>for real \\(s > 1\\). The series diverges for \\(\\text{Re}(s) \\le 1\\). But Riemann showed in 1859 that \\(\\zeta\\) extends to a meromorphic function on all of \\(\\mathbb{C}\\), with a single simple pole at \\(s=1\\). The zeros of this continuation encode the distribution of prime numbers. Analytic continuation is what makes the Riemann Hypothesis meaningful.</p>

<h3>The Gamma Function</h3>

<p>Euler's integral \\(\\Gamma(z) = \\int_0^\\infty t^{z-1} e^{-t}\\, dt\\) converges for \\(\\text{Re}(z) > 0\\). The continuation to all of \\(\\mathbb{C}\\) (with poles at \\(0, -1, -2, \\ldots\\)) arises from the functional equation \\(\\Gamma(z+1) = z\\,\\Gamma(z)\\), which defines \\(\\Gamma\\) for \\(\\text{Re}(z) > -1\\) given its values for \\(\\text{Re}(z) > 0\\), then for \\(\\text{Re}(z) > -2\\), and so on indefinitely.</p>

<h3>Multi-Valued Functions</h3>

<p>The function \\(\\log z\\) is defined and analytic on \\(\\mathbb{C} \\setminus (-\\infty, 0]\\) by the principal branch. If you continue it analytically around the origin, you return with a different value: the argument has increased by \\(2\\pi\\). Analytic continuation reveals that \\(\\log\\) is intrinsically multi-valued, living naturally on a Riemann surface, not the complex plane.</p>

<div class="env-block remark">
    <div class="env-title">Why This Matters</div>
    <div class="env-body">
        <p>Analytic continuation is not a trick or convention. It is forced on us by the identity theorem: if two analytic functions agree on any set with a limit point, they agree everywhere on their common domain. An analytic function defined in a small disk carries the seeds of its global behavior. The continuation, when it exists, is unique.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-chain-of-disks"></div>
`,
            visualizations: [
                {
                    id: 'viz-chain-of-disks',
                    title: 'Chain of Overlapping Disks',
                    description: 'Analytic continuation proceeds by a chain of overlapping disks. A function defined in disk D\u2080 extends to D\u2081 by matching on the overlap, then to D\u2082, and so on. Drag the slider to animate the chain propagating along a path.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 60, originX: 280, originY: 200 });
                        var t = 0;
                        var slider = VizEngine.createSlider(controls, 'Progress', 0, 1, 0, 0.01, function(v) {
                            t = v; draw();
                        });

                        // Path: goes from z=1 (inside |z|<1.5) around counterclockwise to z=-1
                        // Arc from angle 0 to angle pi, radius 1.5
                        function pathPoint(s) {
                            var angle = s * Math.PI;
                            return [1.5 * Math.cos(angle), 1.5 * Math.sin(angle)];
                        }

                        var nDisks = 7;
                        var diskR = 0.55; // radius of each continuation disk (in math units)

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Draw the path arc faintly
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            for (var i = 0; i <= 80; i++) {
                                var pt = pathPoint(i / 80);
                                var sc = viz.toScreen(pt[0], pt[1]);
                                i === 0 ? ctx.moveTo(sc[0], sc[1]) : ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw disks up to current t
                            var nActive = Math.max(1, Math.ceil(t * nDisks));
                            for (var k = 0; k < nDisks; k++) {
                                var s = k / (nDisks - 1);
                                var center = pathPoint(s);
                                var alpha = k < nActive ? 1 : 0.15;
                                var isHead = k === nActive - 1;

                                // Fill
                                var screenCenter = viz.toScreen(center[0], center[1]);
                                var screenR = diskR * viz.scale;
                                ctx.globalAlpha = alpha * 0.18;
                                ctx.fillStyle = isHead ? viz.colors.orange : viz.colors.blue;
                                ctx.beginPath();
                                ctx.arc(screenCenter[0], screenCenter[1], screenR, 0, Math.PI * 2);
                                ctx.fill();

                                // Border
                                ctx.globalAlpha = alpha;
                                ctx.strokeStyle = isHead ? viz.colors.orange : viz.colors.blue;
                                ctx.lineWidth = isHead ? 2.5 : 1.5;
                                ctx.beginPath();
                                ctx.arc(screenCenter[0], screenCenter[1], screenR, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.globalAlpha = 1;

                                // Label
                                ctx.fillStyle = isHead ? viz.colors.orange : viz.colors.blue;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('D\u2080'.replace('0', k.toString()), screenCenter[0], screenCenter[1]);
                            }

                            // Labels
                            viz.screenText('Start: z = 1.5', viz.toScreen(1.5, 0)[0] + 5, viz.toScreen(1.5, 0)[1] - 14, viz.colors.teal, 11, 'left');
                            viz.screenText('Chain of disks: each f agrees with predecessor on overlap', viz.width / 2, 24, viz.colors.white, 12);
                            viz.screenText('Active disks: ' + nActive + ' / ' + nDisks, viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The geometric series \\(\\sum_{n=0}^\\infty z^n\\) converges for \\(|z| < 1\\). (a) To what function does it converge? (b) What is the analytic continuation of this function to \\(\\mathbb{C} \\setminus \\{1\\}\\)? (c) Why does the original series diverge at \\(z = -1\\) even though the continuation is finite there?',
                    hint: 'Convergence of a series and analyticity of its sum are different things. A series can stop converging without the function it defines ceasing to exist.',
                    solution: '(a) The series converges to \\(f(z) = \\frac{1}{1-z}\\) for \\(|z| < 1\\). (b) The analytic continuation is \\(\\frac{1}{1-z}\\) itself, defined on all of \\(\\mathbb{C} \\setminus \\{1\\}\\). (c) At \\(z = -1\\) the partial sums \\(1 - 1 + 1 - 1 + \\cdots\\) oscillate and do not converge, but the rational function \\(\\frac{1}{1-(-1)} = \\frac{1}{2}\\) is perfectly finite. Series convergence fails before the function does.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: The Principle of Analytic Continuation
        // ================================================================
        {
            id: 'sec-principle',
            title: 'The Principle of Analytic Continuation',
            content: `
<h2>The Principle of Analytic Continuation</h2>

<p>Analytic continuation is grounded in one of the deepest facts of complex analysis: an analytic function cannot be "patched together" arbitrarily. It is either consistent everywhere or it is not analytic.</p>

<h3>The Identity Theorem (Recalled)</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 18.1 (Identity Theorem)</div>
    <div class="env-body">
        <p>Let \\(f\\) and \\(g\\) be analytic on a connected open set \\(D\\). If \\(f(z) = g(z)\\) for all \\(z\\) in a set \\(E \\subset D\\) that has a limit point in \\(D\\), then \\(f \\equiv g\\) on all of \\(D\\).</p>
    </div>
</div>

<p>This immediately implies <em>uniqueness</em> of analytic continuation: there can be at most one way to extend \\(f\\) from a smaller domain to a larger connected domain.</p>

<h3>Direct Analytic Continuation</h3>

<div class="env-block definition">
    <div class="env-title">Definition 18.1 (Direct Continuation)</div>
    <div class="env-body">
        <p>Let \\(f_1\\) be analytic on a disk \\(D_1\\) and \\(f_2\\) analytic on a disk \\(D_2\\), with \\(D_1 \\cap D_2 \\neq \\emptyset\\). We say \\(f_2\\) is a <strong>direct analytic continuation</strong> of \\(f_1\\) if \\(f_1(z) = f_2(z)\\) for all \\(z \\in D_1 \\cap D_2\\).</p>
    </div>
</div>

<p>By the identity theorem, if such \\(f_2\\) exists it is unique. The pair \\((D_1 \\cup D_2, F)\\) where \\(F = f_1\\) on \\(D_1\\) and \\(F = f_2\\) on \\(D_2\\) is then a single analytic function on the larger domain \\(D_1 \\cup D_2\\).</p>

<h3>Continuation Along a Path</h3>

<div class="env-block definition">
    <div class="env-title">Definition 18.2 (Continuation Along a Path)</div>
    <div class="env-body">
        <p>Let \\(\\gamma: [0,1] \\to \\mathbb{C}\\) be a path. A <strong>continuation of \\(f_0\\) along \\(\\gamma\\)</strong> is a family \\(\\{(D_t, f_t)\\}_{t \\in [0,1]}\\) where:</p>
        <ul>
            <li>each \\(D_t\\) is an open disk containing \\(\\gamma(t)\\),</li>
            <li>each \\(f_t\\) is analytic on \\(D_t\\),</li>
            <li>for each \\(t\\), there exists \\(\\varepsilon > 0\\) such that \\(f_s = f_t\\) on \\(D_s \\cap D_t\\) whenever \\(|s - t| < \\varepsilon\\).</li>
        </ul>
        <p>The result of the continuation is the germ \\((D_1, f_1)\\) at \\(\\gamma(1)\\).</p>
    </div>
</div>

<h3>Practical Construction via Power Series</h3>

<p>Given \\(f\\) analytic in disk \\(D_0\\) centered at \\(z_0\\), choose a new center \\(z_1 \\in D_0\\). Expand \\(f\\) in a Taylor series at \\(z_1\\):</p>
\\[f(z) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(z_1)}{n!}(z - z_1)^n.\\]
<p>This new series converges in a disk \\(D_1\\) centered at \\(z_1\\) whose radius is at least \\(d(z_1, \\partial D_0)\\). If \\(D_1\\) extends beyond \\(D_0\\), we have continued \\(f\\) to new territory. Repeating this process along any path yields continuation along that path.</p>

<div class="env-block example">
    <div class="env-title">Example: Continuing \\(1/(1+z^2)\\) Past Its Singularity</div>
    <div class="env-body">
        <p>The Taylor series of \\(f(z) = 1/(1+z^2)\\) at \\(z = 0\\) has radius of convergence 1 (the distance to the nearest singularity at \\(z = \\pm i\\)). Reexpanding at \\(z = 0.8\\), the new series converges in a disk of radius \\(|0.8 - i| \\approx 1.28\\), which extends past the original boundary \\(|z| = 1\\). The analytic continuation is simply \\(1/(1+z^2)\\) itself, now known to be analytic everywhere except \\(z = \\pm i\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">What Prevents Continuation</div>
    <div class="env-body">
        <p>If every point on the boundary \\(|z| = R\\) of the disk of convergence is a singularity, then no continuation is possible across that boundary. The boundary is then a <em>natural boundary</em> for the function. This happens for certain lacunary series; we will see a dramatic example in Section 5.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(f\\) be analytic on \\(\\{|z| < 2\\}\\) and \\(g\\) be analytic on \\(\\{|z - 3| < 2\\}\\). Suppose \\(f = g\\) on the real segment \\((1, 2)\\). Does \\(g\\) determine \\(f\\) on the overlap uniquely? What can you conclude about \\(f\\) and \\(g\\) together?',
                    hint: 'Apply the identity theorem: if two analytic functions agree on a set with a limit point in their common domain, they agree everywhere on that domain.',
                    solution: 'Yes. The segment \\((1,2)\\) lies in the overlap \\(\\{1 < |z| < 2\\} \\cap \\{|z-3|<2\\}\\) and has limit points there. By the identity theorem, \\(f\\) and \\(g\\) agree on the entire connected overlap region. Together they define a single analytic function on \\(\\{|z|<2\\} \\cup \\{|z-3|<2\\}\\), the direct analytic continuation of either to the union. The continuation is unique.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Monodromy Theorem
        // ================================================================
        {
            id: 'sec-monodromy',
            title: 'Monodromy Theorem',
            content: `
<h2>Monodromy Theorem</h2>

<p>When does the result of continuation along a path depend on the path? This is the central question of monodromy.</p>

<div class="env-block example">
    <div class="env-title">The Problem with \\(\\log z\\)</div>
    <div class="env-body">
        <p>Start at \\(z = 1\\) with \\(\\log 1 = 0\\). Continue the principal branch of \\(\\log\\) counterclockwise around the origin, returning to \\(z = 1\\). As \\(z\\) traverses the unit circle once, \\(\\arg(z)\\) increases from \\(0\\) to \\(2\\pi\\). The continuation arrives at \\(\\log 1 = 2\\pi i\\), not \\(0\\). Continuation along the loop gave a different germ than the one we started with.</p>
    </div>
</div>

<p>This failure is due to the fact that the loop is not contractible in \\(\\mathbb{C} \\setminus \\{0\\}\\). The Monodromy Theorem says this is the only obstruction.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 18.2 (Monodromy Theorem)</div>
    <div class="env-body">
        <p>Let \\(D\\) be a simply connected domain and let \\(f\\) be a function element at \\(z_0 \\in D\\) that can be analytically continued along every path in \\(D\\). Then all continuations along paths from \\(z_0\\) to any \\(z_1 \\in D\\) give the same result. In particular, \\(f\\) extends to a single-valued analytic function on all of \\(D\\).</p>
    </div>
</div>

<p><em>The key condition is simple connectivity</em>: every loop in \\(D\\) is contractible to a point. If the domain has "holes," loops around those holes may produce different values upon continuation.</p>

<h3>Proof Sketch</h3>

<p>Let \\(\\gamma_0, \\gamma_1: [0,1] \\to D\\) be two paths from \\(z_0\\) to \\(z_1\\) that are homotopic with fixed endpoints, i.e., there is a continuous \\(H: [0,1]^2 \\to D\\) with \\(H(s, 0) = \\gamma_0(s)\\) and \\(H(s, 1) = \\gamma_1(s)\\), \\(H(0, t) = z_0\\), \\(H(1, t) = z_1\\). One shows that the result of continuation is a continuous function of \\(t\\). But the result is a germ (a discrete object, an analytic function in a disk), so it is locally constant in \\(t\\), hence constant. Homotopic paths give the same continuation.</p>
<p>In a simply connected domain, any two paths are homotopic, so the result is always the same.</p>

<div class="env-block definition">
    <div class="env-title">Definition 18.3 (Monodromy Group)</div>
    <div class="env-body">
        <p>Let \\(D^* = D \\setminus \\{p_1, \\ldots, p_k\\}\\) be a punctured domain and fix a basepoint \\(z_0\\). The <strong>monodromy group</strong> of \\(f\\) at \\(z_0\\) is the group of all analytic continuations of \\(f\\) along loops based at \\(z_0\\), under composition. Each puncture \\(p_j\\) contributes a generator.</p>
    </div>
</div>

<p>For \\(\\log z\\) with a single puncture at \\(0\\), the monodromy group is \\(\\mathbb{Z}\\): going around the origin \\(n\\) times adds \\(2\\pi n i\\). For \\(\\sqrt{z}\\), going around twice returns to the start, so the group is \\(\\mathbb{Z}/2\\mathbb{Z}\\).</p>

<div class="viz-placeholder" data-viz="viz-monodromy"></div>
`,
            visualizations: [
                {
                    id: 'viz-monodromy',
                    title: 'Monodromy of log(z): Going Around the Origin',
                    description: 'Drag the slider to continue log(z) along a counterclockwise loop around the origin. Watch how the imaginary part (argument) accumulates, returning to z = 1 with a value 2\u03c0i higher than where it started.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 80, originX: 200, originY: 200 });
                        var angle = 0;
                        VizEngine.createSlider(controls, 'Angle (turns)', 0, 1.5, 0, 0.01, function(v) {
                            angle = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var theta = angle * 2 * Math.PI;
                            var pathR = 1.2;

                            // Draw full circle path (dashed)
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, pathR * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw traversed arc (solid blue)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, pathR * viz.scale, 0, -theta, false);
                            ctx.stroke();

                            // Branch cut: negative real axis (dashed red)
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            ctx.beginPath();
                            var leftEdge = viz.toScreen(-2.5, 0);
                            ctx.moveTo(viz.originX, viz.originY);
                            ctx.lineTo(leftEdge[0], leftEdge[1]);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('branch cut', leftEdge[0] + 8, leftEdge[1] - 10, viz.colors.red, 10, 'left');

                            // Current position on path
                            var zx = pathR * Math.cos(theta);
                            var zy = pathR * Math.sin(theta);
                            var logRe = Math.log(pathR);
                            var logIm = theta; // continuous argument

                            viz.drawPoint(zx, zy, viz.colors.orange, null, 6);

                            // Arrow on arc
                            var arrowTheta = theta * 0.5;
                            var ax = pathR * Math.cos(arrowTheta);
                            var ay = pathR * Math.sin(arrowTheta);
                            var tax = -Math.sin(arrowTheta) * 0.2;
                            var tay = Math.cos(arrowTheta) * 0.2;
                            viz.drawVector(ax, ay, ax + tax, ay + tay, viz.colors.blue, null, 1.5);

                            // Right panel: log value display
                            var panelX = 340;
                            viz.screenText('log(z) value', panelX + 60, 30, viz.colors.white, 13, 'center');
                            viz.screenText('z = ' + (zx.toFixed(3)) + ' + ' + (zy.toFixed(3)) + 'i', panelX + 60, 56, viz.colors.orange, 11, 'center');
                            viz.screenText('Re log z = ln|z| = ' + logRe.toFixed(3), panelX + 60, 80, viz.colors.teal, 11, 'center');
                            viz.screenText('Im log z = arg z = ' + logIm.toFixed(3), panelX + 60, 100, viz.colors.yellow, 11, 'center');
                            viz.screenText('= ' + (angle.toFixed(2)) + ' \u00d7 2\u03c0', panelX + 60, 118, viz.colors.yellow, 11, 'center');

                            var warning = angle >= 1.0 ? 'After one full turn: Im log = 2\u03c0i \u2260 0!' : '';
                            if (warning) viz.screenText(warning, panelX + 60, 150, viz.colors.red, 11, 'center');

                            // Origin marker
                            viz.drawPoint(0, 0, viz.colors.red, '0', 4);

                            viz.screenText('Start: z=1, log=0', viz.toScreen(1.2, 0)[0] + 5, viz.toScreen(1.2, 0)[1] + 14, viz.colors.green, 10, 'left');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(f(z) = \\sqrt{z}\\) with \\(f(1) = 1\\). (a) Continue \\(f\\) counterclockwise around the origin once. What is the value at \\(z = 1\\) after continuation? (b) What is the monodromy group of \\(\\sqrt{z}\\) around the origin? (c) How does this differ from the monodromy group of \\(\\log z\\)?',
                    hint: 'Write \\(z = re^{i\\theta}\\) and track \\(\\sqrt{z} = \\sqrt{r}\\, e^{i\\theta/2}\\) as \\(\\theta\\) goes from \\(0\\) to \\(2\\pi\\).',
                    solution: '(a) Starting with \\(f(1) = e^{0} = 1\\), after one counterclockwise loop \\(\\theta: 0 \\to 2\\pi\\), we get \\(f(1) = e^{i\\pi} = -1\\). (b) After two loops the function returns to its starting value (\\(e^{i\\cdot 2\\pi/2 \\cdot 2} = e^{2\\pi i} = 1\\)), so the monodromy group is \\(\\mathbb{Z}/2\\mathbb{Z} = \\{\\pm 1\\}\\). (c) For \\(\\log z\\) each loop adds \\(2\\pi i\\) and the process never repeats, giving monodromy group \\(\\mathbb{Z}\\). The Riemann surface for \\(\\sqrt{z}\\) has 2 sheets; for \\(\\log z\\) it has infinitely many.'
                },
                {
                    question: 'Suppose \\(f\\) is a function element at \\(z_0\\) in \\(D = \\mathbb{C} \\setminus \\{0, 1\\}\\) that can be continued along every path in \\(D\\). Explain why monodromy may give a non-trivial group even though each individual continuation is unique.',
                    hint: 'How many independent generators does \\(\\pi_1(D, z_0)\\) have?',
                    solution: 'The fundamental group \\(\\pi_1(\\mathbb{C} \\setminus \\{0,1\\}, z_0)\\) is the free group on two generators: a loop \\(\\gamma_0\\) around \\(0\\) and a loop \\(\\gamma_1\\) around \\(1\\). Continuation along \\(\\gamma_0\\) and \\(\\gamma_1\\) may each multiply the value by a different factor (or permute branches). The monodromy group is the image of \\(\\pi_1\\) under the continuation representation. Even though each individual path gives a unique result (by the identity theorem), different loops may give different results, and the group of all such transformations can be non-abelian.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Riemann Surfaces
        // ================================================================
        {
            id: 'sec-riemann-surfaces',
            title: 'Riemann Surfaces',
            content: `
<h2>Riemann Surfaces</h2>

<p>Multi-valued functions are not flaws to be patched. They are symptoms of a richer geometry. Riemann's insight was to build a surface on which the function becomes single-valued.</p>

<h3>The Idea</h3>

<p>Consider \\(w = \\sqrt{z}\\). For each \\(z \\neq 0\\) there are two values. Instead of choosing one, we create two copies of \\(\\mathbb{C}\\), called <em>sheets</em>, and glue them together in a way that makes \\(\\sqrt{z}\\) single-valued on the resulting surface.</p>

<p>The two sheets are cut along \\((-\\infty, 0]\\). On the upper sheet, \\(\\sqrt{z}\\) has positive real part (argument in \\((-\\pi/2, \\ \\pi/2)\\)); on the lower sheet it has negative real part. The gluing rule: the upper edge of the cut on sheet 1 is glued to the lower edge on sheet 2, and vice versa. Walking around the origin on the resulting surface transitions you from one sheet to the other.</p>

<div class="env-block definition">
    <div class="env-title">Definition 18.4 (Riemann Surface)</div>
    <div class="env-body">
        <p>A <strong>Riemann surface</strong> is a connected one-complex-dimensional complex manifold: a Hausdorff topological space \\(S\\) with an atlas of charts \\(\\{(U_\\alpha, \\phi_\\alpha)\\}\\) where each \\(\\phi_\\alpha: U_\\alpha \\to \\mathbb{C}\\) is a homeomorphism, and the transition maps \\(\\phi_\\beta \\circ \\phi_\\alpha^{-1}\\) are biholomorphic on \\(\\phi_\\alpha(U_\\alpha \\cap U_\\beta)\\).</p>
    </div>
</div>

<h3>Examples</h3>

<p><strong>The Riemann sphere \\(\\hat{\\mathbb{C}}\\).</strong> \\(\\mathbb{C}\\) plus the point at infinity, with two charts: \\(z\\) and \\(1/z\\). The function \\(1/z\\) is single-valued on \\(\\hat{\\mathbb{C}}\\) (it maps \\(\\infty\\) to \\(0\\) and vice versa).</p>

<p><strong>The surface for \\(\\sqrt{z}\\).</strong> Two sheets, two branch points at \\(0\\) and \\(\\infty\\), genus 0. Topologically a sphere.</p>

<p><strong>The surface for \\(\\log z\\).</strong> Infinitely many sheets, each a copy of \\(\\mathbb{C} \\setminus (-\\infty, 0]\\), stacked in a helical staircase. The sheet \\(n\\) satisfies \\((2n-1)\\pi < \\text{Im}(\\log z) \\le (2n+1)\\pi\\).</p>

<p><strong>The surface for \\(\\sqrt{(z-a)(z-b)(z-c)(z-d)}\\).)</strong> Four branch points give genus 1: a torus. Elliptic integrals live on such surfaces.</p>

<h3>The Universal Covering</h3>

<p>For a domain \\(D \\subset \\mathbb{C}\\), the Riemann surface on which all analytic continuations of a function \\(f\\) on \\(D\\) live is related to the universal cover \\(\\tilde{D}\\) of \\(D\\). A function element that can be analytically continued along every path in \\(D\\) defines a single-valued analytic function on \\(\\tilde{D}\\). The monodromy group is the deck transformation group \\(\\pi_1(D)\\) acting on \\(\\tilde{D}\\).</p>

<div class="viz-placeholder" data-viz="viz-sqrt-riemann-surface"></div>
<div class="viz-placeholder" data-viz="viz-log-riemann-surface"></div>
`,
            visualizations: [
                {
                    id: 'viz-sqrt-riemann-surface',
                    title: 'Two-Sheeted Riemann Surface for \u221az',
                    description: 'The two branches of \u221az live on two sheets glued along the branch cut [0, \u221e). Drag the slider to animate the construction: watch the sheets separate and the gluing along the cut become visible.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 1, originX: 0, originY: 0 });
                        var separation = 0;
                        VizEngine.createSlider(controls, 'Sheet separation', 0, 1, 0, 0.01, function(v) {
                            separation = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = viz.width / 2;
                            var cy = viz.height / 2;

                            // We draw a 2D schematic of two disks (sheets) separating
                            var r = 100;
                            var sep = separation * 60;

                            // Sheet 1 (top)
                            var y1 = cy - sep;
                            // Sheet 2 (bottom)
                            var y2 = cy + sep;

                            // Sheet fills
                            ctx.globalAlpha = 0.35;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(cx - 30, y1, r, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(cx - 30, y2, r, 0, Math.PI * 2); ctx.fill();
                            ctx.globalAlpha = 1;

                            // Sheet borders
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(cx - 30, y1, r, 0, Math.PI * 2); ctx.stroke();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.beginPath(); ctx.arc(cx - 30, y2, r, 0, Math.PI * 2); ctx.stroke();

                            // Branch cut on each sheet (positive real axis from center rightward)
                            var cutLeft = cx - 30;
                            var cutRight = cx - 30 + r;
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2.5;
                            ctx.setLineDash([6, 3]);
                            ctx.beginPath(); ctx.moveTo(cutLeft, y1); ctx.lineTo(cutRight, y1); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(cutLeft, y2); ctx.lineTo(cutRight, y2); ctx.stroke();
                            ctx.setLineDash([]);

                            // Branch point at origin
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(cutLeft, y1, 5, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(cutLeft, y2, 5, 0, Math.PI * 2); ctx.fill();

                            // Gluing arrows when separated
                            if (separation > 0.1) {
                                var alpha = Math.min(1, (separation - 0.1) / 0.4);
                                ctx.globalAlpha = alpha;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                // Upper edge of cut 2 glues to lower edge of cut 1
                                for (var xi = 0; xi <= 4; xi++) {
                                    var xp = cutLeft + (xi / 4) * (cutRight - cutLeft);
                                    ctx.beginPath();
                                    ctx.moveTo(xp, y2 - 2);
                                    ctx.bezierCurveTo(xp, y2 - 18, xp, y1 + 18, xp, y1 + 2);
                                    ctx.stroke();
                                }
                                ctx.globalAlpha = 1;
                                viz.screenText('glue upper edge of sheet 2 to lower edge of sheet 1', cx - 30, (y1 + y2) / 2, viz.colors.orange, 10, 'center');
                            }

                            // Labels
                            viz.screenText('Sheet 1:  \u221az (arg \u2208 (-\u03c0, \u03c0))', cx - 30, y1 - r - 14, viz.colors.blue, 12, 'center');
                            viz.screenText('Sheet 2:  \u221az (arg \u2208 (\u03c0, 3\u03c0))', cx - 30, y2 + r + 18, viz.colors.teal, 12, 'center');
                            viz.screenText('branch cut [0,\u221e)', cutRight + 6, y1 - 8, viz.colors.red, 10, 'left');

                            // Value label panel
                            var px = cx + 110;
                            viz.screenText('On Sheet 1:', px, 80, viz.colors.white, 11, 'left');
                            viz.screenText('\u221a4 = +2', px, 98, viz.colors.blue, 11, 'left');
                            viz.screenText('On Sheet 2:', px, 126, viz.colors.white, 11, 'left');
                            viz.screenText('\u221a4 = -2', px, 144, viz.colors.teal, 11, 'left');
                            viz.screenText('Together: one', px, 178, viz.colors.white, 11, 'left');
                            viz.screenText('single-valued', px, 196, viz.colors.white, 11, 'left');
                            viz.screenText('function on S', px, 214, viz.colors.orange, 11, 'left');
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-log-riemann-surface',
                    title: 'Infinite Spiral Staircase for log(z)',
                    description: 'log(z) has infinitely many branches. Each sheet covers arg(z) over a 2\u03c0 interval. Moving around the origin ascends one step of the staircase. Drag the slider to scroll through the sheets.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 1, originX: 0, originY: 0 });
                        var scroll = 0;
                        VizEngine.createSlider(controls, 'Sheet (Im log / 2\u03c0)', -3, 3, 0, 0.1, function(v) {
                            scroll = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = 280, cy = 210;
                            var sheetW = 120, sheetH = 50, sheetRx = 60, offsetY = 55;

                            // Draw 7 sheets in a staircase
                            var nSheets = 7;
                            var focusSheet = Math.round(scroll); // highlighted sheet

                            for (var k = 3; k >= -3; k--) {
                                var relK = k - scroll;
                                var sx = cx + relK * 18;
                                var sy = cy - relK * offsetY;
                                var isActive = (k === focusSheet);

                                // Draw sheet as a parallelogram
                                var dx = sheetW / 2;
                                var dy = 12;
                                ctx.beginPath();
                                ctx.moveTo(sx - dx, sy);
                                ctx.lineTo(sx, sy - dy);
                                ctx.lineTo(sx + dx, sy - dy);
                                ctx.lineTo(sx + dx, sy);
                                ctx.lineTo(sx, sy + dy);
                                ctx.closePath();

                                ctx.globalAlpha = isActive ? 0.5 : 0.18;
                                ctx.fillStyle = isActive ? viz.colors.orange : viz.colors.blue;
                                ctx.fill();
                                ctx.globalAlpha = 1;
                                ctx.strokeStyle = isActive ? viz.colors.orange : viz.colors.blue;
                                ctx.lineWidth = isActive ? 2.5 : 1;
                                ctx.stroke();

                                // Label
                                ctx.fillStyle = isActive ? viz.colors.orange : viz.colors.text;
                                ctx.font = (isActive ? 'bold ' : '') + '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                var label = 'Im log \u2208 [' + ((k * 2 - 1) + '\u03c0,') + ' ' + ((k * 2 + 1) + '\u03c0)');
                                ctx.fillText(label, sx, sy);
                            }

                            // Staircase connecting arrows
                            for (var j = -3; j < 3; j++) {
                                var relJ = j - scroll;
                                var relJ1 = (j + 1) - scroll;
                                var x1 = cx + relJ * 18 + 60;
                                var y1 = cy - relJ * offsetY;
                                var x2 = cx + relJ1 * 18 + 60;
                                var y2 = cy - relJ1 * offsetY;
                                ctx.strokeStyle = viz.colors.purple + '88';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(x1, y1);
                                ctx.lineTo(x2, y2);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Title
                            viz.screenText('Riemann surface for log(z): infinite staircase', cx, 24, viz.colors.white, 13, 'center');
                            viz.screenText('Each loop around origin ascends one sheet', cx, 44, viz.colors.text, 11, 'center');
                            viz.screenText('Current: log(z) branch with Im \u2208 [' + ((focusSheet*2-1) + '\u03c0, ') + (focusSheet*2+1) + '\u03c0)', cx, viz.height - 16, viz.colors.orange, 11, 'center');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The Riemann surface for \\(\\sqrt{z}\\) has two sheets. (a) Identify the branch points (where sheets are connected). (b) Show that the surface is topologically a sphere (genus 0). (c) How many branch points and sheets does the surface for \\(\\sqrt[3]{z}\\) have, and what is its topological type?',
                    hint: 'Use the Riemann-Hurwitz formula: \\(2g - 2 = n(2\\tilde g - 2) + \\sum_p (e_p - 1)\\) where \\(n\\) is the degree, \\(e_p\\) is the ramification index, and \\(g, \\tilde g\\) are genera.',
                    solution: '(a) The branch points of \\(\\sqrt{z}\\) are \\(0\\) and \\(\\infty\\) (where the two sheets meet). (b) Riemann-Hurwitz: \\(n=2\\), \\(\\tilde g=0\\) (sphere), two branch points each with \\(e_p=2\\). So \\(2g-2 = 2(0-2) + 2(2-1) = -4+2 = -2\\), giving \\(g=0\\): a sphere. (c) \\(\\sqrt[3]{z}\\) has 3 sheets and branch points at \\(0\\) and \\(\\infty\\) (each with \\(e_p=3\\)). Riemann-Hurwitz: \\(2g-2 = 3(-2)+2(2) = -6+4=-2\\), \\(g=0\\): also a sphere.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Natural Boundaries
        // ================================================================
        {
            id: 'sec-natural-boundary',
            title: 'Natural Boundaries',
            content: `
<h2>Natural Boundaries</h2>

<p>Not every function can be analytically continued beyond its initial domain. Sometimes the boundary of convergence is simultaneously a wall of singularities, impenetrable in every direction.</p>

<div class="env-block definition">
    <div class="env-title">Definition 18.5 (Natural Boundary)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic in a domain \\(D\\). A point \\(p \\in \\partial D\\) is a <strong>regular point</strong> if \\(f\\) has an analytic continuation to some open neighborhood of \\(p\\). The <strong>natural boundary</strong> of \\(f\\) is the set of all irregular (non-regular) points on \\(\\partial D\\). If every boundary point is irregular, \\(\\partial D\\) itself is the natural boundary.</p>
    </div>
</div>

<h3>Lacunary Series</h3>

<p>A power series with "gaps" (lacunae) can fail to continue past its circle of convergence. The prototypical example:</p>
\\[f(z) = \\sum_{n=0}^{\\infty} z^{2^n} = z + z^2 + z^4 + z^8 + z^{16} + \\cdots\\]

<p>The exponents \\(1, 2, 4, 8, 16, \\ldots\\) grow exponentially. The radius of convergence is \\(1\\). The key observation: for any \\(2^k\\)-th root of unity \\(\\zeta\\) (i.e., \\(\\zeta^{2^k} = 1\\)), we have \\(\\zeta^{2^n} = 1\\) for all \\(n \\ge k\\), so the tail of the series diverges. Every root of unity lies on \\(|z|=1\\) and is a singularity. These roots are dense in \\(|z|=1\\), so no arc of the circle is singularity-free. The unit circle is a natural boundary.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 18.3 (Hadamard's Gap Theorem)</div>
    <div class="env-body">
        <p>Let \\(f(z) = \\sum_{k=0}^\\infty a_k z^{n_k}\\) where the exponents \\(n_k\\) satisfy \\(n_{k+1}/n_k \\ge \\lambda > 1\\) for all \\(k\\) (the <em>Hadamard gap condition</em>). If the radius of convergence is 1, then the unit circle \\(|z| = 1\\) is a natural boundary for \\(f\\).</p>
    </div>
</div>

<h3>Other Natural Boundaries</h3>

<p>Natural boundaries are not exotic. Several important functions have them:</p>
<ul>
    <li><strong>Modular forms:</strong> \\(q = e^{2\\pi i \\tau}\\) for \\(\\text{Im}(\\tau) > 0\\) gives \\(|q| < 1\\). Functions like \\(\\sum q^{n^2}\\) (theta functions) do continue past \\(|q|=1\\) but only by using the modular symmetry; the real axis \\(\\text{Im}(\\tau) = 0\\) is a natural boundary in the \\(q\\)-disk.</li>
    <li><strong>Boundary value problems:</strong> Conformal maps from a disk to a domain with a fractal boundary typically cannot be continued past the unit circle.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">Physical Interpretation</div>
    <div class="env-body">
        <p>Natural boundaries arise in statistical mechanics as phase transitions. The partition function of certain models, expressed as a power series in the fugacity or temperature, has a natural boundary at the circle where a phase transition occurs. The impossibility of analytic continuation is the mathematical signature of the transition.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-natural-boundary"></div>
`,
            visualizations: [
                {
                    id: 'viz-natural-boundary',
                    title: 'Natural Boundary: Lacunary Series \u03a3z^{2^n}',
                    description: 'Domain coloring of the partial sums of \u03a3z^{2^n}. Inside |z|<1 the function is analytic; the unit circle is a wall of singularities. Increase the number of terms to see the boundary sharpen.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 90, originX: 280, originY: 200 });
                        var nTerms = 8;
                        VizEngine.createSlider(controls, 'Terms (N)', 1, 16, 8, 1, function(v) {
                            nTerms = Math.round(v);
                            drawDomain();
                        });

                        // Compute partial sum of z^{2^n} for n=0..N-1
                        function lacunarySum(re, im, N) {
                            var sr = 0, si = 0;
                            var pr = re, pi = im; // z^1
                            for (var n = 0; n < N; n++) {
                                // current term: z^{2^n} = (pr, pi)
                                sr += pr; si += pi;
                                if (Math.sqrt(sr*sr+si*si) > 1e4) return [sr, si]; // early exit
                                // next: z^{2^{n+1}} = (z^{2^n})^2
                                var nr = pr*pr - pi*pi;
                                var ni = 2*pr*pi;
                                pr = nr; pi = ni;
                            }
                            return [sr, si];
                        }

                        function drawDomain() {
                            var xRange = [-1.6, 1.6], yRange = [-1.6, 1.6];
                            viz.drawDomainColoring(function(re, im) {
                                return lacunarySum(re, im, nTerms);
                            }, xRange, yRange);

                            var ctx = viz.ctx;
                            // Draw unit circle overlay
                            ctx.strokeStyle = '#ffffff88';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, Math.PI * 2);
                            ctx.stroke();

                            viz.screenText('|z| = 1  (natural boundary)', viz.width / 2, 22, '#ffffff', 12, 'center');
                            viz.screenText('N = ' + nTerms + ' terms: \u03a3z^{2^n}, n=0..' + (nTerms-1), viz.width/2, viz.height - 14, '#cccccc', 11, 'center');
                        }
                        drawDomain();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Consider \\(f(z) = \\sum_{n=1}^\\infty z^{n!}\\). (a) Show the radius of convergence is 1. (b) Show that for any root of unity \\(\\zeta = e^{2\\pi i p/q}\\), the series has an isolated singularity at \\(\\zeta\\). (c) Conclude that \\(|z| = 1\\) is a natural boundary. (d) Compare the "density" of singularities with the lacunary series \\(\\sum z^{2^n}\\).',
                    hint: 'For part (b), note that \\(n! \\ge q\\) for all sufficiently large \\(n\\), so \\(\\zeta^{n!} = 1\\) for large \\(n\\).',
                    solution: '(a) The terms \\(z^{n!}\\) have \\(|z^{n!}| = |z|^{n!}\\). By the ratio test the radius of convergence is 1. (b) For \\(\\zeta = e^{2\\pi ip/q}\\) with \\(p,q\\) integers, once \\(n \\ge q\\) we have \\(q | n!\\) so \\(\\zeta^{n!} = e^{2\\pi i p \\cdot n!/q} = 1\\). Thus for large \\(n\\) each term equals 1, the tail of the series diverges, and \\(\\zeta\\) is a singularity. (c) The \\(q\\)-th roots of unity for all \\(q \\ge 1\\) are dense in \\(|z|=1\\), so every arc contains singularities and the circle is a natural boundary. (d) The exponents \\(n!\\) grow much faster than \\(2^n\\), satisfying the Hadamard gap condition even more strongly; the singularities are even "more densely packed" in a sense, but topologically both series exhibit the same natural boundary phenomenon.'
                },
                {
                    question: 'A power series \\(f(z) = \\sum a_n z^n\\) has radius of convergence \\(R\\). Suppose \\(f\\) extends analytically to a neighborhood of some point \\(z_0\\) with \\(|z_0| = R\\). Prove that the radius of convergence of the Taylor series of \\(f\\) centered at any interior point \\(z_1\\) near \\(z_0\\) is strictly greater than \\(R - |z_1|\\).',
                    hint: 'The radius of convergence of the Taylor series at \\(z_1\\) is the distance from \\(z_1\\) to the nearest singularity of the analytic continuation.',
                    solution: 'Since \\(f\\) extends analytically to a neighborhood \\(U\\) of \\(z_0\\), \\(z_0\\) is a regular (non-singular) point. Pick \\(z_1\\) in the disk \\(|z| < R\\) close to \\(z_0\\). The Taylor series of \\(f\\) at \\(z_1\\) converges in the largest disk about \\(z_1\\) that is free of singularities of the continuation. Since \\(z_0\\) is regular, there is a disk of radius \\(r > 0\\) about \\(z_0\\) free of singularities. The distance from \\(z_1\\) to the nearest singularity is at least \\(R - |z_1| + r\\) (the disk around \\(z_0\\) pushes the singularity wall away by \\(r\\)). So the radius of convergence at \\(z_1\\) is strictly greater than \\(R - |z_1\\)|.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Connections & Further Directions',
            content: `
<h2>Connections and Further Directions</h2>

<p>Analytic continuation is not an isolated topic. It is the thread that ties together the deepest results of complex analysis and connects to algebraic geometry, number theory, and mathematical physics.</p>

<h3>The Schwarz Reflection Principle</h3>

<p>If \\(f\\) is analytic in the upper half-plane, continuous on the real axis, and real-valued there, then \\(f\\) extends analytically to the lower half-plane by \\(f(\\bar z) = \\overline{f(z)}\\). This is direct analytic continuation across the real axis, exploiting the symmetry of the configuration. It is fundamental to studying functions defined by integrals over the real line.</p>

<h3>Analytic Continuation and the Gamma Function</h3>

<p>The functional equation \\(\\Gamma(z+1) = z\\,\\Gamma(z)\\) is an analytic continuation mechanism. Given \\(\\Gamma\\) for \\(\\text{Re}(z) > 0\\), we continue leftward strip by strip: \\(\\Gamma(z) = \\Gamma(z+1)/z\\) is meromorphic for \\(\\text{Re}(z) > -1\\) (pole at \\(z=0\\)), then for \\(\\text{Re}(z) > -2\\) (poles at \\(0,-1\\)), and so on. The completed function is meromorphic on \\(\\mathbb{C}\\) with simple poles at the non-positive integers. This is the canonical example of continuation by functional equation.</p>

<h3>The Riemann Zeta Function</h3>

<p>Riemann's 1859 paper showed that \\(\\zeta(s)\\) continues to all of \\(\\mathbb{C} \\setminus \\{1\\}\\) and satisfies the functional equation</p>
\\[\\xi(s) = \\xi(1-s), \\quad \\xi(s) = \\tfrac{1}{2}s(s-1)\\pi^{-s/2}\\Gamma(s/2)\\zeta(s).\\]
<p>The non-trivial zeros of \\(\\zeta\\) are the zeros of \\(\\xi\\) and, by the functional equation, come in pairs \\((s, 1-s)\\). The Riemann Hypothesis asserts they all lie on \\(\\text{Re}(s) = 1/2\\). Without analytic continuation, this statement cannot even be formulated.</p>

<h3>Sheaves and the Language of Modern Geometry</h3>

<p>The modern formulation of analytic continuation uses the language of <em>sheaves</em>. The sheaf of analytic functions on \\(\\mathbb{C}\\) assigns to each open set \\(U\\) the ring \\(\\mathcal{O}(U)\\) of analytic functions on \\(U\\), with restriction maps. A "function element" is a germ in the stalk \\(\\mathcal{O}_{z_0}\\). Analytic continuation is the process of moving a section of the sheaf along a path. Riemann surfaces are precisely the spaces over which a multi-valued function becomes a sheaf section, i.e., single-valued.</p>

<h3>D-Modules and Differential Equations</h3>

<p>Solutions to linear ODEs with analytic coefficients can be analytically continued along any path avoiding the singularities of the coefficients. The monodromy group of the ODE (the group of linear transformations undergone by a basis of solutions as one loops around singular points) is a central invariant, studied through Fuchsian theory, the Riemann-Hilbert problem, and D-modules.</p>

<div class="viz-placeholder" data-viz="viz-zeta-continuation"></div>

<div class="env-block remark">
    <div class="env-title">Looking Ahead</div>
    <div class="env-body">
        <p>Chapter 19 takes up special functions: the Gamma function, Beta function, and elliptic functions. Each is defined initially by a convergent integral or series, then extended by analytic continuation to a meromorphic function on \\(\\mathbb{C}\\) or on a Riemann surface. The techniques of this chapter are the foundation for that enterprise.</p>
        <p>In the companion Analytic Number Theory course, the analytic continuation of \\(\\zeta(s)\\) to \\(\\text{Re}(s) > 0\\) (using the alternating series) and then to all of \\(\\mathbb{C}\\) (using the functional equation) is the central technical achievement from which the prime number theorem flows.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-zeta-continuation',
                    title: 'Riemann Zeta: From Series to Continuation',
                    description: 'Domain coloring of \u03b6(s). For Re(s)>1 the Euler series converges; the continuation fills the rest of the plane with a single pole at s=1. Compare the series approximation with the true continuation as you vary the number of terms.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60, originX: 160, originY: 210 });
                        var useContinu = false;
                        var nTerms = 30;

                        VizEngine.createButton(controls, 'Toggle: Series / Continuation', function() {
                            useContinu = !useContinu;
                            drawZeta();
                        });
                        VizEngine.createSlider(controls, 'Series terms', 5, 100, 30, 1, function(v) {
                            nTerms = Math.round(v);
                            if (!useContinu) drawZeta();
                        });

                        // Euler-Maclaurin / alternating-series approximation for zeta
                        // For Re(s)>1 use partial sum. For 0<Re(s)<=1 use eta(s)/(1-2^{1-s}) where eta = alternating series
                        function zetaApprox(sr, si, N) {
                            // Partial sum of 1/n^s, n=1..N
                            var reS = 0, imS = 0;
                            for (var n = 1; n <= N; n++) {
                                // n^{-s} = exp(-s log n) = exp(-(sr+i*si)*log n)
                                var ln = Math.log(n);
                                var mag = Math.exp(-sr * ln);
                                var arg = -si * ln;
                                reS += mag * Math.cos(arg);
                                imS += mag * Math.sin(arg);
                            }
                            return [reS, imS];
                        }

                        // Analytic continuation via eta function (Dirichlet eta = alternating zeta)
                        // eta(s) = sum (-1)^{n-1}/n^s = (1-2^{1-s}) zeta(s)
                        // so zeta(s) = eta(s) / (1-2^{1-s}), converges for Re(s) > 0 (except s=1)
                        function zetaContinued(sr, si, N) {
                            // eta partial sum
                            var reE = 0, imE = 0;
                            for (var n = 1; n <= N; n++) {
                                var sign = (n % 2 === 1) ? 1 : -1;
                                var ln = Math.log(n);
                                var mag = Math.exp(-sr * ln);
                                var arg = -si * ln;
                                reE += sign * mag * Math.cos(arg);
                                imE += sign * mag * Math.sin(arg);
                            }
                            // denominator: 1 - 2^{1-s} = 1 - 2*exp(-s*log2)
                            var l2 = Math.log(2);
                            var dmag = 2 * Math.exp(-sr * l2);
                            var darg = -si * l2;
                            var dre = 1 - dmag * Math.cos(darg);
                            var dim = -(-dmag * Math.sin(darg));
                            // actually 1 - 2^{1-s}: re = 1 - 2^{1-sr}*cos((1-s)*log2...
                            // simpler: 1-2^{1-s} with 1-s = (1-sr) - i*si
                            var exponent_re = (1 - sr) * l2;
                            var exponent_im = -si * l2;
                            var pow2_re = Math.exp(exponent_re) * Math.cos(exponent_im);
                            var pow2_im = Math.exp(exponent_re) * Math.sin(exponent_im);
                            dre = 1 - pow2_re;
                            dim = -pow2_im;
                            // zeta = eta / (1 - 2^{1-s})
                            var denom2 = dre * dre + dim * dim;
                            if (denom2 < 1e-8) return [1e4, 0]; // pole near s=1
                            var zre = (reE * dre + imE * dim) / denom2;
                            var zim = (imE * dre - reE * dim) / denom2;
                            return [zre, zim];
                        }

                        function drawZeta() {
                            var xRange = [-2.5, 3.5], yRange = [-3.5, 3.5];
                            var fn = useContinu
                                ? function(re, im) { return zetaContinued(re, im, nTerms); }
                                : function(re, im) { return zetaApprox(re, im, nTerms); };
                            viz.drawDomainColoring(fn, xRange, yRange);

                            var ctx = viz.ctx;
                            // Critical line Re(s) = 1/2
                            ctx.strokeStyle = '#ffffff66';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([5, 3]);
                            var cl = viz.toScreen(0.5, 0);
                            ctx.beginPath();
                            ctx.moveTo(cl[0], 0);
                            ctx.lineTo(cl[0], viz.height);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Re(s)=1 vertical line
                            ctx.strokeStyle = '#ffffff33';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([3, 3]);
                            var v1 = viz.toScreen(1, 0);
                            ctx.beginPath();
                            ctx.moveTo(v1[0], 0);
                            ctx.lineTo(v1[0], viz.height);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Pole marker at s=1
                            viz.drawPoint(1, 0, viz.colors.red, 's=1 (pole)', 5);

                            // Known zeros on critical line
                            var zeros = [14.135, 21.022, 25.011, 30.425];
                            for (var z of zeros) {
                                viz.drawPoint(0.5, z, viz.colors.yellow, null, 3);
                                viz.drawPoint(0.5, -z, viz.colors.yellow, null, 3);
                            }

                            viz.screenText(useContinu ? 'Analytic continuation (eta method)' : 'Euler series (N=' + nTerms + ')', viz.width / 2, 18, viz.colors.white, 12, 'center');
                            viz.screenText('Re(s)=1/2 (critical line, dashed)', viz.width / 2, viz.height - 28, '#ffffff88', 10, 'center');
                            viz.screenText('Yellow dots: non-trivial zeros', viz.width / 2, viz.height - 14, viz.colors.yellow, 10, 'center');
                        }
                        drawZeta();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: '(Schwarz Reflection) Let \\(f\\) be analytic in \\(\\{\\text{Im}(z) > 0\\}\\), continuous on the real axis, and real-valued on \\(\\mathbb{R}\\). Define \\(g(z) = \\overline{f(\\bar z)}\\) for \\(\\text{Im}(z) < 0\\). (a) Show \\(g\\) is analytic. (b) Show that \\(f\\) and \\(g\\) together with their common values on \\(\\mathbb{R}\\) form a single analytic function on \\(\\mathbb{C}\\). (c) Why does the condition "real-valued on \\(\\mathbb{R}\\)" matter?',
                    hint: 'For (a), check the Cauchy-Riemann equations for \\(g\\). For (c), consider \\(f(z) = iz\\).',
                    solution: '(a) Write \\(f(z) = u(x,y) + iv(x,y)\\). Then \\(g(z) = \\overline{f(x-iy)} = u(x,-y) - iv(x,-y)\\). Let \\(U = u(x,-y)\\), \\(V = -v(x,-y)\\). The C-R equations for \\(f\\) give \\(u_x = v_y\\), \\(u_y = -v_x\\). Substituting: \\(U_x = u_x(x,-y) = v_y(x,-y) = V_y\\) (using \\(V_y = -v_y(x,-y)\\cdot(-1) = v_y(x,-y)\\)). Similarly \\(U_y = -V_x\\). So \\(g\\) satisfies C-R and is analytic. (b) On \\(\\mathbb{R}\\), \\(g(x) = \\overline{f(x)} = \\overline{u(x,0)} = u(x,0) = f(x)\\) (using real-valuedness). The combined function is continuous everywhere and analytic away from \\(\\mathbb{R}\\); by the removable singularity theorem (or Morera) it is analytic on \\(\\mathbb{R}\\) too. (c) If \\(f(z) = iz\\) then \\(f(x) = ix\\), which is purely imaginary, not real. Then \\(g(z) = \\overline{i\\bar z} = \\overline{-iz} = i\\bar z\\cdot(-1)\\)... specifically \\(g\\) does not agree with \\(f\\) on \\(\\mathbb{R}\\) and no analytic continuation across \\(\\mathbb{R}\\) is obtained.',
                },
                {
                    question: 'Use the functional equation \\(\\Gamma(z+1) = z\\,\\Gamma(z)\\) to continue \\(\\Gamma\\) to \\(\\{\\text{Re}(z) > -3\\}\\). Identify all poles and compute their residues.',
                    hint: 'Apply the functional equation repeatedly, rearranging to give \\(\\Gamma(z) = \\Gamma(z+n)/(z(z+1)\\cdots(z+n-1))\\) for appropriate \\(n\\).',
                    solution: 'For \\(-1 < \\text{Re}(z) \\le 0\\): \\(\\Gamma(z) = \\Gamma(z+1)/z\\). This is meromorphic, with a simple pole at \\(z=0\\). The residue at \\(z=0\\) is \\(\\lim_{z \\to 0} z \\cdot \\Gamma(z) = \\Gamma(1) = 1\\). For \\(-2 < \\text{Re}(z) \\le -1\\): \\(\\Gamma(z) = \\Gamma(z+2)/(z(z+1))\\). Simple pole at \\(z=-1\\) with residue \\(\\lim_{z \\to -1}(z+1)\\Gamma(z) = \\Gamma(1)/(-1) = -1\\). For \\(-3 < \\text{Re}(z) \\le -2\\): \\(\\Gamma(z) = \\Gamma(z+3)/(z(z+1)(z+2))\\). Simple pole at \\(z = -2\\) with residue \\(\\lim_{z \\to -2}(z+2)\\Gamma(z) = \\Gamma(1)/((-2)(-1)) = 1/2\\). In general, the residue at \\(z = -n\\) is \\((-1)^n/n!\\).',
                },
                {
                    question: '(Functional equation for \\(\\zeta\\)) Using the Mellin transform and theta function, Riemann showed \\(\\xi(s) = \\xi(1-s)\\) where \\(\\xi(s) = \\frac{1}{2}s(s-1)\\pi^{-s/2}\\Gamma(s/2)\\zeta(s)\\). (a) Use this to show that the non-trivial zeros come in pairs \\(\\rho, 1-\\rho\\). (b) If additionally the zeros are symmetric about the real axis (i.e., \\(\\rho \\Rightarrow \\bar\\rho\\)), show the zeros come in quadruples \\(\\rho, 1-\\rho, \\bar\\rho, 1-\\bar\\rho\\). (c) On the critical line \\(\\text{Re}(\\rho) = 1/2\\), how many elements does each "quadruple" have?',
                    hint: 'A zero on the critical line satisfies both \\(1 - \\rho = \\bar\\rho\\) and the pairing from (a).',
                    solution: '(a) If \\(\\xi(\\rho) = 0\\) then \\(\\xi(1-\\rho) = \\xi(\\rho) = 0\\), so \\(1-\\rho\\) is also a zero. (b) Since \\(\\zeta(\\bar s) = \\overline{\\zeta(s)}\\) (reflection principle, as \\(\\zeta\\) is real on the real axis), if \\(\\rho\\) is a zero then \\(\\bar\\rho\\) is too. Combined with (a): \\(\\rho, 1-\\rho, \\bar\\rho, 1-\\bar\\rho\\) are all zeros. These are four distinct points in general. (c) On the critical line \\(\\text{Re}(\\rho) = 1/2\\): write \\(\\rho = 1/2 + it\\). Then \\(1-\\rho = 1/2 - it = \\bar\\rho\\). So the pair from (a) equals the pair from the reflection, and the "quadruple" collapses to a pair \\(\\{1/2 + it, 1/2 - it\\}\\). This is why the Riemann Hypothesis, if true, reduces the four-fold symmetry to two-fold.'
                }
            ]
        }

    ] // end sections
}); // end chapter push
