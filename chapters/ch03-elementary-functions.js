window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'Elementary Functions',
    subtitle: 'Exponential, logarithm, and trigonometric functions in the complex world',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Familiar Functions, Unfamiliar Behavior',
            content: `
<h2>Familiar Functions, Unfamiliar Behavior</h2>

<div class="env-block intuition">
    <div class="env-title">The Surprise</div>
    <div class="env-body">
        <p>You know \\(e^x\\), \\(\\ln x\\), \\(\\sin x\\) as real functions. They seem tame: \\(|\\sin x| \\le 1\\), \\(\\ln x\\) is only defined for \\(x > 0\\), \\(e^x > 0\\) always. Pass to the complex plane and every one of these "facts" breaks. \\(\\sin z\\) is unbounded. \\(\\ln z\\) takes infinitely many values. \\(e^z = 0\\) has no solution, yet \\(e^z\\) hits every other complex number infinitely often.</p>
    </div>
</div>

<p>The elementary functions of complex analysis are not exotic constructions. They are the <em>same</em> functions you already know, extended by the single rule that is forced on us by power series:</p>

\\[
e^z = \\sum_{n=0}^{\\infty} \\frac{z^n}{n!}, \\quad \\sin z = \\sum_{n=0}^{\\infty} \\frac{(-1)^n z^{2n+1}}{(2n+1)!}, \\quad \\cos z = \\sum_{n=0}^{\\infty} \\frac{(-1)^n z^{2n}}{(2n)!}.
\\]

<p>These series converge absolutely for every \\(z \\in \\mathbb{C}\\), so the extension is completely determined. The surprise is not in the definition — it is in what these extended functions do. Two phenomena dominate this chapter:</p>

<ol>
    <li><strong>Multi-valuedness.</strong> The logarithm and complex powers are not single-valued functions on \\(\\mathbb{C} \\setminus \\{0\\}\\). To get single-valued functions we must cut the plane and choose a branch.</li>
    <li><strong>Loss of familiar bounds.</strong> Boundedness, positivity, and periodicity in the real sense are replaced by richer complex-analytic structure: periodicity in \\(\\mathbb{C}\\), domain coloring patterns, and zeros that move into the complex plane.</li>
</ol>

<h3>Road Map</h3>

<p>We proceed in logical order: exponential first (single-valued, no cuts needed), then logarithm (multi-valued, introduces branch cuts), then powers (combine exponential and logarithm), then trigonometric and hyperbolic functions (reduce to exponential), and finally inverse trigonometric functions (reduce to logarithm).</p>

<div class="env-block remark">
    <div class="env-title">Graduate Perspective</div>
    <div class="env-body">
        <p>The branch-cut gymnastics of this chapter are not an obstacle to get past — they are the content. Every multi-valued function in complex analysis is eventually tamed by choosing a branch; the skill of choosing the right branch for a given contour integral or residue computation is one of the most important in the subject.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        },

        // ================================================================
        // SECTION 2: The Complex Exponential
        // ================================================================
        {
            id: 'sec-exponential',
            title: 'The Complex Exponential',
            content: `
<h2>The Complex Exponential</h2>

<div class="env-block definition">
    <div class="env-title">Definition 3.1 (Complex Exponential)</div>
    <div class="env-body">
        <p>For \\(z = x + iy \\in \\mathbb{C}\\), define</p>
        \\[e^z = e^x(\\cos y + i \\sin y).\\]
        <p>Equivalently, \\(e^z = \\sum_{n=0}^{\\infty} z^n / n!\\), which converges absolutely for all \\(z\\).</p>
    </div>
</div>

<p>The key formula \\(e^z = e^x(\\cos y + i \\sin y)\\) splits the exponential cleanly: the <em>real part</em> \\(x\\) controls the modulus \\(|e^z| = e^x\\), and the <em>imaginary part</em> \\(y\\) controls the argument \\(\\arg(e^z) = y\\).</p>

<h3>Euler's Formula</h3>

<p>Setting \\(x = 0\\) gives the most beautiful formula in mathematics:</p>

\\[e^{iy} = \\cos y + i \\sin y.\\]

<p>This is Euler's formula. At \\(y = \\pi\\): \\(e^{i\\pi} + 1 = 0\\). More usefully, it means that the map \\(y \\mapsto e^{iy}\\) parametrizes the unit circle \\(|z| = 1\\) at unit angular speed.</p>

<h3>Algebraic Properties</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.1 (Exponential Properties)</div>
    <div class="env-body">
        <ol>
            <li>\\(e^{z+w} = e^z e^w\\) for all \\(z, w \\in \\mathbb{C}\\).</li>
            <li>\\(|e^z| = e^{\\operatorname{Re}(z)}\\).</li>
            <li>\\(\\overline{e^z} = e^{\\bar{z}}\\).</li>
            <li>\\(e^z \\ne 0\\) for all \\(z \\in \\mathbb{C}\\).</li>
            <li>\\(e^z = 1 \\iff z = 2\\pi i k\\) for some \\(k \\in \\mathbb{Z}\\).</li>
        </ol>
    </div>
</div>

<h3>Periodicity</h3>

<p>The complex exponential is <strong>periodic with period \\(2\\pi i\\)</strong>:</p>
\\[e^{z + 2\\pi i} = e^z \\quad \\text{for all } z \\in \\mathbb{C}.\\]

<p>This is a purely complex-analytic phenomenon — the real exponential \\(e^x\\) has no period. The period \\(2\\pi i\\) is vertical: shifting \\(z\\) by \\(2\\pi i\\) (i.e., moving up by \\(2\\pi\\) in the imaginary direction) returns \\(e^z\\) to its original value.</p>

<p>Consequence: to understand \\(e^z\\) on all of \\(\\mathbb{C}\\), it suffices to understand it on one <strong>fundamental domain</strong>, say the horizontal strip \\(S = \\{z : -\\pi < \\operatorname{Im}(z) \\le \\pi\\}\\). The exponential maps \\(S\\) bijectively onto \\(\\mathbb{C} \\setminus \\{0\\}\\).</p>

<h3>Mapping Properties</h3>

<p>Under \\(w = e^z\\):</p>
<ul>
    <li>Horizontal lines \\(\\operatorname{Im}(z) = c\\) map to rays \\(\\arg(w) = c\\).</li>
    <li>Vertical lines \\(\\operatorname{Re}(z) = c\\) map to circles \\(|w| = e^c\\).</li>
    <li>Vertical strips \\(\\{a < \\operatorname{Re}(z) < b\\}\\) map to annuli \\(\\{e^a < |w| < e^b\\}\\).</li>
    <li>Horizontal strips \\(\\{c < \\operatorname{Im}(z) < d\\}\\) with \\(d - c < 2\\pi\\) map to angular sectors.</li>
</ul>

<div class="viz-placeholder" data-viz="viz-exp-domain-coloring"></div>
`,
            visualizations: [
                {
                    id: 'viz-exp-domain-coloring',
                    title: 'Domain Coloring of e^z',
                    description: 'Hue encodes argument, brightness encodes modulus. The vertical repetition of color bands shows the 2\u03C0i periodicity: the function repeats in vertical strips of height 2\u03C0. The horizontal strips map to the full plane minus the origin.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 40 });

                        var showGrid = true;
                        VizEngine.createButton(controls, 'Toggle Grid Lines', function() {
                            showGrid = !showGrid;
                            draw();
                        });

                        function draw() {
                            // Domain coloring of e^z
                            var xR = [-4, 4], yR = [-4, 4];
                            viz.drawDomainColoring(function(re, im) {
                                // e^z = e^x*(cos y + i sin y)
                                var ex = Math.exp(re);
                                return [ex * Math.cos(im), ex * Math.sin(im)];
                            }, xR, yR);

                            if (showGrid) {
                                var ctx = viz.ctx;
                                // Draw horizontal period lines at y = n*pi
                                ctx.strokeStyle = 'rgba(255,255,255,0.35)';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([5, 4]);
                                for (var k = -2; k <= 2; k++) {
                                    var yVal = k * Math.PI;
                                    var sy = viz.originY - yVal * viz.scale;
                                    if (sy < 0 || sy > viz.height) continue;
                                    ctx.beginPath();
                                    ctx.moveTo(0, sy);
                                    ctx.lineTo(viz.width, sy);
                                    ctx.stroke();
                                    ctx.fillStyle = 'rgba(255,255,255,0.7)';
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.textBaseline = 'bottom';
                                    ctx.fillText(k === 0 ? 'y=0' : 'y=' + k + '\u03C0', 4, sy - 2);
                                }
                                ctx.setLineDash([]);
                            }

                            // Axis labels
                            viz.screenText('Re(z)', viz.width - 28, viz.originY - 14, '#aaa', 11);
                            viz.screenText('Im(z)', viz.originX + 6, 14, '#aaa', 11);

                            // Period annotation
                            viz.screenText('Period: 2\u03C0i (vertical)', viz.width / 2, viz.height - 10, 'rgba(255,255,255,0.6)', 11);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find all \\(z \\in \\mathbb{C}\\) satisfying \\(e^z = 1 + i\\).',
                    hint: 'Write \\(1 + i\\) in polar form. Then match \\(|e^z| = e^{\\operatorname{Re}(z)}\\) and \\(\\arg(e^z) = \\operatorname{Im}(z)\\).',
                    solution: '\\(|1+i| = \\sqrt{2}\\) so \\(\\operatorname{Re}(z) = \\ln\\sqrt{2} = \\frac{1}{2}\\ln 2\\). Also \\(\\arg(1+i) = \\pi/4 + 2\\pi k\\) so \\(\\operatorname{Im}(z) = \\pi/4 + 2\\pi k\\), \\(k \\in \\mathbb{Z}\\). Thus \\(z = \\frac{\\ln 2}{2} + i\\left(\\frac{\\pi}{4} + 2\\pi k\\right)\\), \\(k \\in \\mathbb{Z}\\).'
                },
                {
                    question: 'Show that \\(e^z\\) maps the vertical strip \\(\\{z : 0 < \\operatorname{Re}(z) < 1\\}\\) onto the annulus \\(\\{w : 1 < |w| < e\\}\\).',
                    hint: 'Use the fact that \\(|e^z| = e^{\\operatorname{Re}(z)}\\).',
                    solution: 'For \\(z\\) in the strip, \\(0 < \\operatorname{Re}(z) < 1\\), so \\(e^0 < e^{\\operatorname{Re}(z)} < e^1\\), i.e., \\(1 < |e^z| < e\\). Every modulus value in \\((1, e)\\) and every argument is attained (take \\(\\operatorname{Im}(z)\\) to be any value), so the image is exactly the open annulus \\(\\{w : 1 < |w| < e\\}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Complex Logarithm
        // ================================================================
        {
            id: 'sec-logarithm',
            title: 'The Complex Logarithm',
            content: `
<h2>The Complex Logarithm</h2>

<p>We want \\(\\log z\\) to be an inverse of \\(e^z\\). Since \\(e^z\\) is \\(2\\pi i\\)-periodic, inverting it forces multi-valuedness.</p>

<div class="env-block definition">
    <div class="env-title">Definition 3.2 (Complex Logarithm)</div>
    <div class="env-body">
        <p>For \\(z \\ne 0\\), define the <em>multi-valued logarithm</em>:</p>
        \\[\\log z = \\ln|z| + i\\arg(z)\\]
        <p>where \\(\\arg(z)\\) ranges over all values \\(\\theta + 2\\pi k\\), \\(k \\in \\mathbb{Z}\\), for any argument \\(\\theta\\) of \\(z\\). The result is a set of values, not a single number.</p>
    </div>
</div>

<h3>Why Multi-Valued?</h3>

<p>Walk a small circle around the origin. As \\(z\\) returns to its starting value, \\(\\arg(z)\\) has increased by \\(2\\pi\\). So \\(\\log z\\) has shifted by \\(2\\pi i\\). Any attempt to define \\(\\log z\\) as a continuous single-valued function near \\(0\\) fails.</p>

<p>More precisely: there is no continuous function \\(f : U \\to \\mathbb{C}\\) on any neighborhood \\(U\\) of \\(0\\) satisfying \\(e^{f(z)} = z\\). This is because \\(0\\) is a <em>branch point</em> of \\(\\log z\\).</p>

<h3>Principal Branch</h3>

<div class="env-block definition">
    <div class="env-title">Definition 3.3 (Principal Branch)</div>
    <div class="env-body">
        <p>The <em>principal branch</em> of the logarithm is</p>
        \\[\\operatorname{Log} z = \\ln|z| + i\\operatorname{Arg}(z),\\]
        <p>where \\(\\operatorname{Arg}(z) \\in (-\\pi, \\pi]\\) is the principal argument. This defines a single-valued analytic function on \\(\\mathbb{C} \\setminus (-\\infty, 0]\\).</p>
    </div>
</div>

<p>The set \\((-\\infty, 0]\\) is called the <strong>branch cut</strong>. Crossing it produces a jump of \\(2\\pi i\\) in the value of \\(\\operatorname{Log}\\).</p>

<div class="env-block example">
    <div class="env-title">Example 3.1</div>
    <div class="env-body">
        <ul>
            <li>\\(\\operatorname{Log}(1) = 0\\)</li>
            <li>\\(\\operatorname{Log}(-1) = i\\pi\\)</li>
            <li>\\(\\operatorname{Log}(i) = i\\pi/2\\)</li>
            <li>\\(\\operatorname{Log}(-i) = -i\\pi/2\\)</li>
            <li>\\(\\log(-1) = i\\pi(2k+1)\\), \\(k \\in \\mathbb{Z}\\) (all values)</li>
        </ul>
    </div>
</div>

<h3>Other Branches</h3>

<p>Any ray from the origin can serve as a branch cut. If we require \\(\\arg(z) \\in (\\alpha, \\alpha + 2\\pi]\\) for some \\(\\alpha\\), we get a branch \\(\\log_\\alpha z\\) that is analytic on \\(\\mathbb{C}\\) minus the ray at angle \\(\\alpha\\). The principal branch corresponds to \\(\\alpha = -\\pi\\).</p>

<div class="viz-placeholder" data-viz="viz-log-branches"></div>
<div class="viz-placeholder" data-viz="viz-log-riemann-surface"></div>
`,
            visualizations: [
                {
                    id: 'viz-log-branches',
                    title: 'Domain Coloring of Log z — Branch Cut',
                    description: 'The discontinuity (color jump) along the negative real axis is the branch cut of the principal logarithm. Drag the slider to rotate the branch cut to any angle. The analytic function is continuous everywhere except on that ray.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });

                        var cutAngle = Math.PI; // angle of branch cut in radians
                        VizEngine.createSlider(controls, 'Cut angle (\u03B1)', -Math.PI, Math.PI, cutAngle, 0.05, function(v) {
                            cutAngle = v;
                            draw();
                        });

                        function draw() {
                            var xR = [-3, 3], yR = [-3, 3];
                            viz.drawDomainColoring(function(re, im) {
                                if (re === 0 && im === 0) return [0, 0];
                                // Log z with branch cut at cutAngle
                                // arg in (cutAngle - 2pi, cutAngle]
                                var theta = Math.atan2(im, re);
                                // adjust theta so it falls in (cutAngle - 2pi, cutAngle]
                                while (theta > cutAngle) theta -= 2 * Math.PI;
                                while (theta <= cutAngle - 2 * Math.PI) theta += 2 * Math.PI;
                                var logR = 0.5 * Math.log(re * re + im * im);
                                return [logR, theta];
                            }, xR, yR);

                            // Draw branch cut ray
                            var ctx = viz.ctx;
                            ctx.strokeStyle = 'rgba(255,80,80,0.9)';
                            ctx.lineWidth = 2;
                            ctx.setLineDash([6, 3]);
                            ctx.beginPath();
                            ctx.moveTo(viz.originX, viz.originY);
                            // ray direction
                            var dx = Math.cos(cutAngle + Math.PI); // opposite of cut direction
                            var dy = -Math.sin(cutAngle + Math.PI);
                            var ext = Math.max(viz.width, viz.height);
                            ctx.lineTo(viz.originX + dx * ext, viz.originY + dy * ext);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Label
                            var labelAngle = cutAngle + Math.PI;
                            var lx = viz.originX + Math.cos(labelAngle) * 110;
                            var ly = viz.originY - Math.sin(labelAngle) * 110;
                            ctx.fillStyle = 'rgba(255,120,120,0.95)';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('branch cut', lx, ly);

                            // Mark origin
                            ctx.fillStyle = '#fff';
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, 4, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = '#aaa';
                            ctx.textAlign = 'left';
                            ctx.fillText('branch point (0)', viz.originX + 7, viz.originY - 6);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-log-riemann-surface',
                    title: 'Riemann Surface of log z (Stacked Sheets)',
                    description: 'Each horizontal band represents one branch of log z. Going around the origin once moves you to the next sheet (shift by 2\u03C0i). The animated red dot traces a circle in the z-plane; its image in log z spirals upward through the sheets.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 1 });

                        var animating = false;
                        var t = 0;
                        var animId = null;
                        var showN = 4; // number of sheets

                        VizEngine.createSlider(controls, 'Sheets', 2, 7, showN, 1, function(v) {
                            showN = Math.round(v);
                            if (!animating) draw(t);
                        });

                        var btn = VizEngine.createButton(controls, 'Animate Spiral', function() {
                            animating = !animating;
                            btn.textContent = animating ? 'Pause' : 'Animate Spiral';
                            if (animating) {
                                var last = null;
                                function frame(ts) {
                                    if (!last) last = ts;
                                    t += (ts - last) * 0.0005;
                                    last = ts;
                                    draw(t);
                                    if (animating) animId = requestAnimationFrame(frame);
                                }
                                animId = requestAnimationFrame(frame);
                            } else {
                                if (animId) cancelAnimationFrame(animId);
                            }
                        });

                        function draw(time) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var sheetH = (H - 60) / showN;
                            var sheetW = W - 80;
                            var leftMargin = 50;

                            // Sheet colors
                            var sheetColors = ['#1a1a5a', '#1a3a5a', '#1a5a4a', '#3a5a1a', '#5a4a1a', '#5a1a3a', '#4a1a5a'];

                            for (var k = 0; k < showN; k++) {
                                var sy = 30 + k * sheetH;
                                // Background
                                ctx.fillStyle = sheetColors[k % sheetColors.length];
                                ctx.fillRect(leftMargin, sy, sheetW, sheetH - 4);
                                ctx.strokeStyle = '#4a6a9a';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(leftMargin, sy, sheetW, sheetH - 4);

                                // Label
                                ctx.fillStyle = '#8ab4f8';
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                var branchLabel = k === 0 ? 'k=0 (principal)' : 'k=' + k;
                                ctx.fillText(branchLabel, leftMargin - 4, sy + sheetH / 2 - 2);

                                // Im axis label
                                var imLow = (-1 + 2 * k) * Math.PI;
                                var imHigh = (1 + 2 * k) * Math.PI;
                                ctx.fillStyle = '#666';
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('Im=' + ((-1 + 2*k) >= 0 ? '' : '') + ((-1+2*k)*1).toFixed(1) + '\u03C0', leftMargin + 2, sy + 10);
                                ctx.fillText('Im=' + ((1 + 2*k)).toFixed(0) + '\u03C0', leftMargin + 2, sy + sheetH - 8);

                                // Real axis label range
                                ctx.textAlign = 'center';
                                ctx.fillStyle = '#555';
                                ctx.fillText('Re(log z)', leftMargin + sheetW / 2, sy + sheetH - 8);
                            }

                            // Animate the path of log z as z circles the origin
                            var angle = time * 2 * Math.PI; // total angle traversed
                            // For each angle in [0, angle], plot log(e^{i*theta}) = i*theta
                            // In our stacked-sheet display: Re(log(e^{i*theta})) = 0 (|z|=1)
                            // Im(log) = theta  (unbounded)
                            // Map Im to sheet + vertical position within sheet
                            // Sheet k covers Im in [(2k-1)pi, (2k+1)pi]
                            // But we start from k=0: Im in (-pi, pi], k=0, etc.

                            var totalAngle = Math.min(angle, showN * 2 * Math.PI - 0.01);
                            var steps = Math.max(2, Math.floor(totalAngle / (2 * Math.PI) * 120));
                            var prevPx = null, prevPy = null;

                            for (var s = 0; s <= steps; s++) {
                                var theta = (s / steps) * totalAngle;
                                var imVal = theta; // Im(log z) = theta for |z|=1
                                var reVal = 0; // Re(log z) = 0

                                // Which sheet?
                                var sheetIdx = Math.floor(imVal / (2 * Math.PI));
                                if (sheetIdx >= showN) sheetIdx = showN - 1;
                                var fracWithin = (imVal - sheetIdx * 2 * Math.PI) / (2 * Math.PI);

                                var sy = 30 + sheetIdx * sheetH;
                                // Re: map 0 to center of sheet width
                                var px = leftMargin + sheetW / 2 + (reVal / 3) * sheetW;
                                var py = sy + (1 - fracWithin) * (sheetH - 4);

                                // Color gradient based on sheet
                                ctx.strokeStyle = ['#58a6ff', '#3fb9a0', '#f0883e', '#bc8cff', '#f85149', '#d29922', '#f778ba'][sheetIdx % 7];
                                ctx.lineWidth = 2;

                                if (prevPx !== null && sheetIdx === prevSheet) {
                                    ctx.beginPath();
                                    ctx.moveTo(prevPx, prevPy);
                                    ctx.lineTo(px, py);
                                    ctx.stroke();
                                }
                                prevPx = px; prevPy = py;
                                var prevSheet = sheetIdx;
                            }

                            // Current position dot
                            if (totalAngle > 0) {
                                var thetaEnd = totalAngle;
                                var sheetFinal = Math.min(Math.floor(thetaEnd / (2 * Math.PI)), showN - 1);
                                var fracFinal = (thetaEnd - sheetFinal * 2 * Math.PI) / (2 * Math.PI);
                                var syF = 30 + sheetFinal * sheetH;
                                var pxF = leftMargin + sheetW / 2;
                                var pyF = syF + (1 - fracFinal) * (sheetH - 4);
                                ctx.fillStyle = '#f85149';
                                ctx.beginPath();
                                ctx.arc(pxF, pyF, 6, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Title
                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Sheets of log z  (|z|=1, tracing the unit circle)', W / 2, 16);
                        }

                        draw(0);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\operatorname{Log}(-1)\\), \\(\\operatorname{Log}(i)\\), and \\(\\operatorname{Log}(-i)\\). Then find all values of \\(\\log(-1)\\).',
                    hint: 'Use \\(\\operatorname{Log}(z) = \\ln|z| + i\\operatorname{Arg}(z)\\) with \\(\\operatorname{Arg} \\in (-\\pi, \\pi]\\).',
                    solution: '\\(\\operatorname{Log}(-1) = \\ln 1 + i\\pi = i\\pi\\). \\(\\operatorname{Log}(i) = 0 + i\\pi/2 = i\\pi/2\\). \\(\\operatorname{Log}(-i) = 0 - i\\pi/2 = -i\\pi/2\\). All values of \\(\\log(-1)\\): since \\(\\arg(-1) = \\pi + 2\\pi k\\), we get \\(\\log(-1) = i\\pi(2k+1)\\), \\(k \\in \\mathbb{Z}\\).'
                },
                {
                    question: 'Show that \\(\\operatorname{Log}(z_1 z_2) = \\operatorname{Log}(z_1) + \\operatorname{Log}(z_2)\\) is NOT always true for the principal branch. Give a counterexample.',
                    hint: 'Try \\(z_1 = z_2 = e^{i(3\\pi/4)}\\). What is \\(\\operatorname{Arg}(z_1 z_2)\\)?',
                    solution: 'Take \\(z_1 = z_2 = e^{3\\pi i/4}\\), so \\(|z_j|=1\\), \\(\\operatorname{Arg}(z_j) = 3\\pi/4\\). Then \\(z_1 z_2 = e^{3\\pi i/2}\\) and \\(\\operatorname{Arg}(z_1 z_2) = \\operatorname{Arg}(e^{3\\pi i/2}) = -\\pi/2\\) (since we reduce to \\((-\\pi,\\pi]\\)). Thus \\(\\operatorname{Log}(z_1 z_2) = -i\\pi/2\\), while \\(\\operatorname{Log}(z_1)+\\operatorname{Log}(z_2) = 3\\pi i/4 + 3\\pi i/4 = 3\\pi i/2\\). These differ by \\(2\\pi i\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Complex Powers
        // ================================================================
        {
            id: 'sec-power',
            title: 'Complex Powers',
            content: `
<h2>Complex Powers</h2>

<p>Having defined \\(\\log z\\), we can now define \\(z^\\alpha\\) for any \\(\\alpha \\in \\mathbb{C}\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition 3.4 (Complex Power)</div>
    <div class="env-body">
        <p>For \\(z \\ne 0\\) and \\(\\alpha \\in \\mathbb{C}\\), the <em>multi-valued power</em> is</p>
        \\[z^\\alpha = e^{\\alpha \\log z}.\\]
        <p>The <em>principal value</em> is</p>
        \\[\\operatorname{pv}(z^\\alpha) = e^{\\alpha \\operatorname{Log} z}.\\]
    </div>
</div>

<p>This definition reduces powers to the exponential and logarithm. The multi-valuedness of \\(z^\\alpha\\) is inherited from \\(\\log z\\):</p>
\\[z^\\alpha = e^{\\alpha(\\operatorname{Log} z + 2\\pi i k)} = e^{\\alpha \\operatorname{Log} z} \\cdot e^{2\\pi i k \\alpha}, \\quad k \\in \\mathbb{Z}.\\]

<p>How many distinct values does \\(z^\\alpha\\) take?</p>
<ul>
    <li>If \\(\\alpha = p/q\\) (rational, in lowest terms): exactly \\(q\\) distinct values (\\(q\\)-th roots of \\(z^p\\)).</li>
    <li>If \\(\\alpha\\) is irrational: infinitely many distinct values.</li>
    <li>If \\(\\alpha\\) is an integer: only one value (consistent with the usual integer power).</li>
</ul>

<h3>Examples</h3>

<div class="env-block example">
    <div class="env-title">Example 3.2 (i^i)</div>
    <div class="env-body">
        <p>The principal value of \\(i^i\\):</p>
        \\[i^i = e^{i \\operatorname{Log}(i)} = e^{i \\cdot i\\pi/2} = e^{-\\pi/2} \\approx 0.2079.\\]
        <p>Remarkably, \\(i^i\\) is a real number (for the principal value)! All values: \\(e^{-\\pi/2 - 2\\pi k}\\), \\(k \\in \\mathbb{Z}\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 3.3 (Square root)</div>
    <div class="env-body">
        <p>\\(z^{1/2} = e^{\\frac{1}{2}\\log z}\\) has two values: \\(e^{\\frac{1}{2}\\operatorname{Log} z}\\) and \\(-e^{\\frac{1}{2}\\operatorname{Log} z}\\). These are exactly the two square roots of \\(z\\).</p>
    </div>
</div>

<h3>Branch Cuts for Powers</h3>

<p>The principal value \\(z^\\alpha = e^{\\alpha \\operatorname{Log} z}\\) inherits the branch cut of \\(\\operatorname{Log}\\): it is analytic on \\(\\mathbb{C} \\setminus (-\\infty, 0]\\).</p>

<p>For \\(\\alpha \\notin \\mathbb{Z}\\), the function \\(z \\mapsto z^\\alpha\\) has a branch point at \\(0\\) and \\(\\infty\\). Choosing different branch cuts changes the function's behavior.</p>

<div class="viz-placeholder" data-viz="viz-complex-power"></div>
`,
            visualizations: [
                {
                    id: 'viz-complex-power',
                    title: 'Domain Coloring of z^\u03B1',
                    description: 'Vary \u03B1 with the slider. For integer values, z^\u03B1 is single-valued (no branch cut). For non-integer values, a branch cut appears on the negative real axis. Notice how the color pattern wraps \u03B1 times around the origin for real \u03B1.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });
                        var alpha = 1.5;

                        VizEngine.createSlider(controls, '\u03B1', 0.25, 3.0, alpha, 0.25, function(v) {
                            alpha = v;
                            draw();
                        });

                        function draw() {
                            var xR = [-3, 3], yR = [-3, 3];
                            viz.drawDomainColoring(function(re, im) {
                                if (re === 0 && im === 0) return [0, 0];
                                // z^alpha = e^(alpha * Log z)
                                var logR = 0.5 * Math.log(re * re + im * im);
                                var theta = Math.atan2(im, re); // in (-pi, pi]
                                // Log z = logR + i*theta
                                // alpha * Log z = alpha*logR + i*alpha*theta
                                var newR = alpha * logR;
                                var newTheta = alpha * theta;
                                // e^(newR + i*newTheta)
                                var mag = Math.exp(newR);
                                return [mag * Math.cos(newTheta), mag * Math.sin(newTheta)];
                            }, xR, yR);

                            // Mark branch cut on negative real axis if non-integer
                            var isInt = Math.abs(alpha - Math.round(alpha)) < 0.01;
                            if (!isInt) {
                                var ctx = viz.ctx;
                                ctx.strokeStyle = 'rgba(255,80,80,0.85)';
                                ctx.lineWidth = 2;
                                ctx.setLineDash([5, 4]);
                                ctx.beginPath();
                                ctx.moveTo(viz.originX, viz.originY);
                                ctx.lineTo(0, viz.originY);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = 'rgba(255,120,120,0.9)';
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('branch cut', viz.originX / 2, viz.originY - 8);
                            }

                            // Title
                            viz.screenText(
                                'z^' + alpha.toFixed(2) + (isInt ? '  (integer: single-valued)' : '  (non-integer: branch cut on (-\u221E,0])'),
                                viz.width / 2, viz.height - 10, 'rgba(255,255,255,0.65)', 11
                            );
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the principal value of \\(i^i\\) and verify it is real.',
                    hint: 'Use \\(\\operatorname{Log}(i) = i\\pi/2\\), then \\(i^i = e^{i \\cdot i\\pi/2} = e^{-\\pi/2}\\).',
                    solution: '\\(\\operatorname{Log}(i) = i\\pi/2\\) (since \\(|i|=1\\) and \\(\\operatorname{Arg}(i)=\\pi/2\\)). So \\(i^i = e^{i \\cdot (i\\pi/2)} = e^{-\\pi/2} \\approx 0.2079\\). This is real and positive. All values are \\(e^{-\\pi/2 - 2\\pi k}\\), \\(k \\in \\mathbb{Z}\\) — all real and positive.'
                },
                {
                    question: 'Find all values of \\((1+i)^{1/3}\\) (the three cube roots of \\(1+i\\)).',
                    hint: 'Write \\(1+i = \\sqrt{2}\\, e^{i\\pi/4}\\). The three cube roots have modulus \\(2^{1/6}\\) and arguments \\(\\pi/12 + 2\\pi k/3\\) for \\(k=0,1,2\\).',
                    solution: '\\(1+i = \\sqrt{2}\\,e^{i\\pi/4}\\). Using \\(z^{1/3} = e^{\\frac{1}{3}\\log z}\\) with all branches: \\(\\log(1+i) = \\frac{1}{2}\\ln 2 + i(\\pi/4 + 2\\pi k)\\). So \\((1+i)^{1/3} = 2^{1/6}\\exp(i(\\pi/12 + 2\\pi k/3))\\) for \\(k=0,1,2\\). Three distinct values with modulus \\(2^{1/6}\\approx 1.122\\) and arguments \\(\\pi/12\\), \\(3\\pi/4\\), \\(17\\pi/12\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Trigonometric & Hyperbolic Functions
        // ================================================================
        {
            id: 'sec-trig',
            title: 'Trigonometric & Hyperbolic Functions',
            content: `
<h2>Trigonometric and Hyperbolic Functions</h2>

<p>With the complex exponential in hand, the complex trigonometric functions are defined by exact analogy with Euler's formula:</p>

<div class="env-block definition">
    <div class="env-title">Definition 3.5 (Complex Trig)</div>
    <div class="env-body">
        \\[\\cos z = \\frac{e^{iz} + e^{-iz}}{2}, \\quad \\sin z = \\frac{e^{iz} - e^{-iz}}{2i}.\\]
    </div>
</div>

<p>These are entire functions (analytic everywhere). The familiar identities all hold: \\(\\sin^2 z + \\cos^2 z = 1\\), \\(\\sin(z + w) = \\sin z \\cos w + \\cos z \\sin w\\), etc.</p>

<h3>Zeros</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.2 (Zeros of sin and cos)</div>
    <div class="env-body">
        <p>\\(\\sin z = 0 \\iff z = n\\pi\\), \\(n \\in \\mathbb{Z}\\).</p>
        <p>\\(\\cos z = 0 \\iff z = \\frac{\\pi}{2} + n\\pi\\), \\(n \\in \\mathbb{Z}\\).</p>
        <p>In both cases, the zeros are <em>real</em> and simple.</p>
    </div>
</div>

<h3>Unboundedness</h3>

<p>Unlike the real case, \\(\\sin z\\) and \\(\\cos z\\) are <strong>unbounded</strong> on \\(\\mathbb{C}\\). To see this, take \\(z = iy\\) (purely imaginary):</p>
\\[\\sin(iy) = \\frac{e^{i(iy)} - e^{-i(iy)}}{2i} = \\frac{e^{-y} - e^{y}}{2i} = i\\sinh y.\\]

<p>So \\(|\\sin(iy)| = |\\sinh y| \\to \\infty\\) as \\(|y| \\to \\infty\\). This is inevitable by Liouville's theorem: a bounded entire function must be constant.</p>

<h3>Hyperbolic Functions</h3>

<div class="env-block definition">
    <div class="env-title">Definition 3.6 (Hyperbolic)</div>
    <div class="env-body">
        \\[\\cosh z = \\frac{e^z + e^{-z}}{2}, \\quad \\sinh z = \\frac{e^z - e^{-z}}{2}.\\]
    </div>
</div>

<p>The key connection between circular and hyperbolic functions is:</p>
\\[\\cos(iz) = \\cosh z, \\quad \\sin(iz) = i\\sinh z.\\]

<p>This means the trigonometric and hyperbolic functions are related by a \\(90^\\circ\\) rotation in the argument. In the complex plane they are the same family of functions, viewed from different angles.</p>

<div class="viz-placeholder" data-viz="viz-sin-domain-coloring"></div>
<div class="viz-placeholder" data-viz="viz-cosh-sinh"></div>
`,
            visualizations: [
                {
                    id: 'viz-sin-domain-coloring',
                    title: 'Domain Coloring of sin(z)',
                    description: 'Zeros of sin(z) appear as black points at z = n\u03C0 on the real axis. The color pattern grows intense near the imaginary axis showing that |sin(z)| is large there — confirming unboundedness. Compare to the bounded real sin function.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 45 });

                        var showZeros = true;
                        VizEngine.createButton(controls, 'Toggle Zero Markers', function() {
                            showZeros = !showZeros;
                            draw();
                        });

                        function draw() {
                            var xR = [-5, 5], yR = [-4, 4];
                            viz.drawDomainColoring(function(re, im) {
                                // sin z = (e^{iz} - e^{-iz}) / 2i
                                // iz = -im + i*re, so e^{iz} = e^{-im}*(cos(re)+i*sin(re))
                                var eiz_re = Math.exp(-im) * Math.cos(re);
                                var eiz_im = Math.exp(-im) * Math.sin(re);
                                var emiz_re = Math.exp(im) * Math.cos(re);
                                var emiz_im = -Math.exp(im) * Math.sin(re);
                                // (e^iz - e^{-iz}) / 2i: divide by 2i = multiply by -i/2
                                var diff_re = eiz_re - emiz_re;
                                var diff_im = eiz_im - emiz_im;
                                // divide by 2i: (a+bi)/(2i) = b/2 - ai/2
                                return [diff_im / 2, -diff_re / 2];
                            }, xR, yR);

                            if (showZeros) {
                                var ctx = viz.ctx;
                                for (var n = -5; n <= 5; n++) {
                                    var zeroX = n * Math.PI;
                                    var sx = viz.originX + zeroX * viz.scale;
                                    if (sx < 0 || sx > viz.width) continue;
                                    ctx.fillStyle = '#ffffff';
                                    ctx.beginPath();
                                    ctx.arc(sx, viz.originY, 5, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.fillStyle = '#000';
                                    ctx.beginPath();
                                    ctx.arc(sx, viz.originY, 3, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Zeros at z = n\u03C0  (white circles)', viz.width / 2, viz.height - 10);
                            } else {
                                viz.screenText('sin(z)  [zeros hidden]', viz.width / 2, viz.height - 10, 'rgba(255,255,255,0.5)', 11);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-cosh-sinh',
                    title: 'Domain Coloring: cosh(z) and sinh(z)',
                    description: 'Toggle between cosh and sinh. Note the structural similarity to cos and sin under the substitution z \u2192 iz. Zeros of sinh(z) are at z = n\u03C0i (on the imaginary axis); zeros of cosh(z) are at z = (n+\u00BD)\u03C0i.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 45 });
                        var mode = 'cosh';

                        VizEngine.createButton(controls, 'Toggle cosh/sinh', function() {
                            mode = mode === 'cosh' ? 'sinh' : 'cosh';
                            draw();
                        });

                        function draw() {
                            var xR = [-4, 4], yR = [-4, 4];
                            viz.drawDomainColoring(function(re, im) {
                                // cosh z = (e^z + e^{-z})/2, sinh z = (e^z - e^{-z})/2
                                var ez_re = Math.exp(re) * Math.cos(im);
                                var ez_im = Math.exp(re) * Math.sin(im);
                                var emz_re = Math.exp(-re) * Math.cos(-im);
                                var emz_im = Math.exp(-re) * Math.sin(-im);
                                if (mode === 'cosh') {
                                    return [(ez_re + emz_re) / 2, (ez_im + emz_im) / 2];
                                } else {
                                    return [(ez_re - emz_re) / 2, (ez_im - emz_im) / 2];
                                }
                            }, xR, yR);

                            var ctx = viz.ctx;
                            // Mark zeros
                            var zeros = [];
                            if (mode === 'sinh') {
                                // zeros at n*pi*i
                                for (var n = -3; n <= 3; n++) zeros.push([0, n * Math.PI]);
                            } else {
                                // zeros at (n+1/2)*pi*i
                                for (var n = -3; n <= 3; n++) zeros.push([0, (n + 0.5) * Math.PI]);
                            }
                            zeros.forEach(function(z) {
                                var sx = viz.originX + z[0] * viz.scale;
                                var sy = viz.originY - z[1] * viz.scale;
                                if (sx < 0 || sx > viz.width || sy < 0 || sy > viz.height) return;
                                ctx.fillStyle = '#fff';
                                ctx.beginPath();
                                ctx.arc(sx, sy, 5, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = '#000';
                                ctx.beginPath();
                                ctx.arc(sx, sy, 3, 0, Math.PI * 2);
                                ctx.fill();
                            });

                            viz.screenText(
                                mode === 'cosh' ? 'cosh(z)  zeros at z=(n+\u00BD)\u03C0i' : 'sinh(z)  zeros at z=n\u03C0i',
                                viz.width / 2, viz.height - 10, 'rgba(255,255,255,0.7)', 11
                            );
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find all zeros of \\(\\cos z\\) in \\(\\mathbb{C}\\) and verify there are no non-real zeros.',
                    hint: 'Write \\(\\cos z = 0\\) as \\(e^{iz} + e^{-iz} = 0\\), i.e., \\(e^{2iz} = -1\\). Then take the logarithm.',
                    solution: '\\(e^{2iz} = -1 = e^{i\\pi(2k+1)}\\). So \\(2iz = i\\pi(2k+1)\\), giving \\(z = \\pi(2k+1)/2 = \\pi/2 + k\\pi\\). These are all real, \\(k \\in \\mathbb{Z}\\). There are no non-real zeros.'
                },
                {
                    question: 'Show that \\(|\\sin z|\\) can be arbitrarily large by computing \\(|\\sin(iy)|\\) explicitly.',
                    hint: 'Use the definition \\(\\sin z = (e^{iz}-e^{-iz})/(2i)\\) and substitute \\(z=iy\\).',
                    solution: '\\(\\sin(iy) = (e^{i(iy)} - e^{-i(iy)})/(2i) = (e^{-y} - e^y)/(2i) = i(e^y - e^{-y})/2 = i\\sinh y\\). So \\(|\\sin(iy)| = |\\sinh y| = (e^{|y|} - e^{-|y|})/2 \\to \\infty\\) as \\(|y| \\to \\infty\\). Hence \\(\\sin z\\) is unbounded on \\(\\mathbb{C}\\).'
                },
                {
                    question: 'Verify the identity \\(\\cos(iz) = \\cosh z\\) using the definitions.',
                    hint: 'Substitute \\(iz\\) into the definition \\(\\cos w = (e^{iw}+e^{-iw})/2\\) and simplify.',
                    solution: '\\(\\cos(iz) = (e^{i(iz)}+e^{-i(iz)})/2 = (e^{-z}+e^z)/2 = \\cosh z\\). Similarly \\(\\sin(iz) = (e^{i(iz)}-e^{-i(iz)})/(2i) = (e^{-z}-e^z)/(2i) = (e^z-e^{-z})/2 \\cdot i/i^2$... more directly: \\((e^{-z}-e^z)/(2i) = i(e^z-e^{-z})/2 = i\\sinh z\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Inverse Trigonometric Functions
        // ================================================================
        {
            id: 'sec-inverse-trig',
            title: 'Inverse Trigonometric Functions',
            content: `
<h2>Inverse Trigonometric Functions</h2>

<p>The inverse trig functions reduce to the logarithm, and therefore inherit its multi-valuedness.</p>

<h3>Arcsin</h3>

<p>We want \\(w = \\arcsin z\\) meaning \\(\\sin w = z\\). Using \\(\\sin w = (e^{iw}-e^{-iw})/(2i) = z\\), set \\(u = e^{iw}\\):</p>
\\[u - u^{-1} = 2iz \\implies u^2 - 2iz u - 1 = 0 \\implies u = iz + (1-z^2)^{1/2}.\\]
<p>Then \\(w = -i \\log u\\), so:</p>

<div class="env-block definition">
    <div class="env-title">Definition 3.7 (Arcsin)</div>
    <div class="env-body">
        \\[\\arcsin z = -i \\log\\bigl(iz + (1-z^2)^{1/2}\\bigr).\\]
    </div>
</div>

<p>This is a multi-valued function: \\((1-z^2)^{1/2}\\) has two values, and \\(\\log\\) is multi-valued. The branch points of \\(\\arcsin z\\) occur at \\(z = \\pm 1\\) (where \\(1-z^2 = 0\\)) and \\(z = \\infty\\).</p>

<h3>Arccos and Arctan</h3>

<p>By similar derivations:</p>
\\[\\arccos z = -i \\log\\bigl(z + i(1-z^2)^{1/2}\\bigr),\\]
\\[\\arctan z = \\frac{i}{2} \\log\\frac{1-iz}{1+iz} = \\frac{i}{2}(\\log(1-iz) - \\log(1+iz)).\\]

<p>For \\(\\arctan z\\), the branch points are at \\(z = \\pm i\\) (where \\(1 \\pm iz = 0\\)), which explains why the <em>real</em> function \\(\\arctan x\\) is smooth for all real \\(x\\) — the branch points \\(z = \\pm i\\) are off the real axis.</p>

<div class="env-block remark">
    <div class="env-title">Connection to Integrals</div>
    <div class="env-body">
        <p>These formulas anticipate a key theme of Chapter 4. The identity \\(\\frac{d}{dz}\\arctan z = \\frac{1}{1+z^2}\\) holds in \\(\\mathbb{C}\\). The branch points \\(\\pm i\\) of \\(\\arctan z\\) correspond exactly to the poles of \\(1/(1+z^2)\\). This connection between antiderivatives, poles, and branch points is the start of the residue calculus.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-branch-cut-animation"></div>
`,
            visualizations: [
                {
                    id: 'viz-branch-cut-animation',
                    title: 'Branch Cut Discontinuity: Tracing z Around the Origin',
                    description: 'Left panel: a point z moves counterclockwise around the origin. Right panel: its image under Log(z) moves continuously — until z crosses the branch cut (negative real axis), where Log(z) jumps by 2\u03C0i. The discontinuity is not a flaw; it is the price of single-valuedness.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 360, scale: 1 });
                        var angle = 0;
                        var animating = false;
                        var animId = null;
                        var radius = 1.2;

                        var btn = VizEngine.createButton(controls, 'Animate', function() {
                            animating = !animating;
                            btn.textContent = animating ? 'Pause' : 'Animate';
                            if (animating) {
                                var last = null;
                                function frame(ts) {
                                    if (!last) last = ts;
                                    angle += (ts - last) * 0.0008;
                                    last = ts;
                                    draw();
                                    if (animating) animId = requestAnimationFrame(frame);
                                }
                                animId = requestAnimationFrame(frame);
                            } else {
                                if (animId) cancelAnimationFrame(animId);
                            }
                        });

                        VizEngine.createSlider(controls, 'Speed', 0.2, 3, 1, 0.1, function(v) {
                            // speed applied in frame function via closure not ideal; reset instead
                            // We'll just use a module-level speed
                            window._ch03_speed = v;
                        });
                        window._ch03_speed = 1;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;

                            // Two panels
                            var lW = W / 2 - 10, rW = W / 2 - 10;
                            var lX = 10, rX = W / 2 + 10;
                            var panH = H - 30;
                            var cx = lX + lW / 2;
                            var cy = 20 + panH / 2;
                            var scaleL = 70; // pixels per unit in z-plane

                            // Panel backgrounds
                            ctx.fillStyle = '#0e0e24';
                            ctx.fillRect(lX, 20, lW, panH);
                            ctx.fillRect(rX, 20, rW, panH);
                            ctx.strokeStyle = '#2a2a5a';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(lX, 20, lW, panH);
                            ctx.strokeRect(rX, 20, rW, panH);

                            // Panel titles
                            ctx.fillStyle = '#8ab4f8';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('z-plane', cx, 15);
                            ctx.fillText('w = Log(z)', rX + rW / 2, 15);

                            // Left panel: z-plane
                            // Grid
                            ctx.strokeStyle = '#1a1a38';
                            ctx.lineWidth = 0.5;
                            for (var x = -3; x <= 3; x++) {
                                var sx = cx + x * scaleL;
                                if (sx < lX || sx > lX + lW) continue;
                                ctx.beginPath(); ctx.moveTo(sx, 20); ctx.lineTo(sx, 20 + panH); ctx.stroke();
                            }
                            for (var y = -2; y <= 2; y++) {
                                var sy = cy - y * scaleL;
                                if (sy < 20 || sy > 20 + panH) continue;
                                ctx.beginPath(); ctx.moveTo(lX, sy); ctx.lineTo(lX + lW, sy); ctx.stroke();
                            }
                            // Axes
                            ctx.strokeStyle = '#3a3a6a';
                            ctx.lineWidth = 1.2;
                            ctx.beginPath(); ctx.moveTo(lX, cy); ctx.lineTo(lX + lW, cy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, 20 + panH); ctx.stroke();

                            // Branch cut: negative real axis
                            ctx.strokeStyle = 'rgba(255,80,80,0.85)';
                            ctx.lineWidth = 2;
                            ctx.setLineDash([5, 4]);
                            ctx.beginPath();
                            ctx.moveTo(cx, cy);
                            ctx.lineTo(lX, cy);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = 'rgba(255,100,100,0.8)';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('branch cut', cx - 50, cy - 6);

                            // Circle path
                            ctx.strokeStyle = 'rgba(100,180,255,0.4)';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(cx, cy, radius * scaleL, 0, Math.PI * 2);
                            ctx.stroke();

                            // Current z
                            var zAngle = angle % (2 * Math.PI);
                            var zx = radius * Math.cos(zAngle);
                            var zy = radius * Math.sin(zAngle);
                            var zsx = cx + zx * scaleL;
                            var zsy = cy - zy * scaleL;

                            ctx.fillStyle = '#f85149';
                            ctx.beginPath();
                            ctx.arc(zsx, zsy, 6, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = '#f8a1a0';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('z', zsx + 8, zsy - 4);

                            // Right panel: Log(z) path
                            var rcx = rX + rW / 2;
                            var rcy = 20 + panH / 2;
                            var scaleR = 30;

                            // Grid in w-plane
                            ctx.strokeStyle = '#1a1a38';
                            ctx.lineWidth = 0.5;
                            for (var x = -4; x <= 4; x++) {
                                var sx = rcx + x * scaleR;
                                if (sx < rX || sx > rX + rW) continue;
                                ctx.beginPath(); ctx.moveTo(sx, 20); ctx.lineTo(sx, 20 + panH); ctx.stroke();
                            }
                            for (var y = -5; y <= 5; y++) {
                                var sy = rcy - y * scaleR;
                                if (sy < 20 || sy > 20 + panH) continue;
                                ctx.beginPath(); ctx.moveTo(rX, sy); ctx.lineTo(rX + rW, sy); ctx.stroke();
                            }
                            ctx.strokeStyle = '#3a3a6a';
                            ctx.lineWidth = 1.2;
                            ctx.beginPath(); ctx.moveTo(rX, rcy); ctx.lineTo(rX + rW, rcy); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(rcx, 20); ctx.lineTo(rcx, 20 + panH); ctx.stroke();

                            // pi labels on right panel
                            ctx.fillStyle = '#555';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('\u03C0', rX + rW - 24, rcy - Math.PI * scaleR - 2);
                            ctx.fillText('-\u03C0', rX + rW - 28, rcy + Math.PI * scaleR + 10);

                            // Draw path of Log(z) as angle goes from 0 to current
                            var steps = 300;
                            var maxA = Math.min(angle, 2 * Math.PI - 0.001);
                            ctx.strokeStyle = '#58a6ff';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var s = 0; s <= steps; s++) {
                                var a = (s / steps) * maxA;
                                var zxs = radius * Math.cos(a);
                                var zys = radius * Math.sin(a);
                                // Principal arg: atan2 gives (-pi, pi]
                                var arg = Math.atan2(zys, zxs);
                                var logR = Math.log(Math.sqrt(zxs * zxs + zys * zys));
                                var pwx = rcx + logR * scaleR;
                                var pwy = rcy - arg * scaleR;
                                if (pwx < rX || pwx > rX + rW || pwy < 20 || pwy > 20 + panH) { started = false; continue; }
                                if (!started) { ctx.moveTo(pwx, pwy); started = true; }
                                else ctx.lineTo(pwx, pwy);
                            }
                            ctx.stroke();

                            // Draw the discontinuity if angle >= pi
                            if (angle >= Math.PI - 0.05) {
                                // The jump: Log(z just above branch cut) -> Log(z just below)
                                // At angle just below pi: Log ~ ln(r) + i*pi
                                // At angle just above pi (= crossing to negative side): Log ~ ln(r) - i*pi
                                var jumpX = rcx + Math.log(radius) * scaleR;
                                var jumpYtop = rcy - Math.PI * scaleR;
                                var jumpYbot = rcy + Math.PI * scaleR;
                                ctx.strokeStyle = 'rgba(255,80,80,0.7)';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(jumpX, jumpYtop);
                                ctx.lineTo(jumpX, jumpYbot);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = 'rgba(255,120,120,0.9)';
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('jump: 2\u03C0i', jumpX + 18, (jumpYtop + jumpYbot) / 2);
                            }

                            // Current w = Log(z)
                            var carg = Math.atan2(zy, zx);
                            var clogR = Math.log(Math.sqrt(zx * zx + zy * zy));
                            var cwx = rcx + clogR * scaleR;
                            var cwy = rcy - carg * scaleR;
                            ctx.fillStyle = '#f85149';
                            ctx.beginPath();
                            ctx.arc(cwx, cwy, 6, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = '#f8a1a0';
                            ctx.textAlign = 'left';
                            ctx.fillText('Log(z)', cwx + 8, cwy - 4);

                            // Info
                            ctx.fillStyle = '#aaa';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('arg(z) = ' + (zAngle * 180 / Math.PI).toFixed(1) + '\u00B0', lX + 4, 20 + panH - 4);
                            ctx.textAlign = 'right';
                            ctx.fillText('Log(z) = ' + clogR.toFixed(2) + ' + ' + carg.toFixed(2) + 'i', rX + rW - 4, 20 + panH - 4);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify the formula \\(\\arctan z = \\frac{i}{2}\\log\\frac{1-iz}{1+iz}\\) by differentiating both sides.',
                    hint: 'Differentiate \\(\\frac{i}{2}\\log((1-iz)/(1+iz))\\) using the chain rule. You should get \\(1/(1+z^2)\\), which is the derivative of \\(\\arctan z\\).',
                    solution: 'Let \\(f = \\frac{i}{2}(\\log(1-iz) - \\log(1+iz))\\). Then \\(f\' = \\frac{i}{2}\\left(\\frac{-i}{1-iz} - \\frac{i}{1+iz}\\right) = \\frac{i}{2} \\cdot \\frac{-i(1+iz) - i(1-iz)}{(1-iz)(1+iz)} = \\frac{i}{2} \\cdot \\frac{-2i}{1+z^2} = \\frac{1}{1+z^2}\\). This confirms the formula (up to an additive constant).'
                },
                {
                    question: 'Where are the branch points of \\(\\arcsin z\\)? What happens to the function near \\(z = 1\\)?',
                    hint: 'Branch points occur where \\(1 - z^2 = 0\\) (i.e., \\(z = \\pm 1\\)) and at the branch points of the logarithm in the formula.',
                    solution: 'The branch points are at \\(z = \\pm 1\\) (zeros of \\(1-z^2\\)) and at \\(z = \\infty\\). Near \\(z = 1\\): write \\(z = 1 + \\epsilon\\), then \\(1-z^2 \\approx -2\\epsilon\\), so \\((1-z^2)^{1/2} \\approx i\\sqrt{2\\epsilon}\\). The function \\(\\arcsin z\\) has a branch-point singularity of type \\(\\sqrt{z-1}\\) (i.e., square-root type) at \\(z=1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Integration
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Integration Awaits',
            content: `
<h2>Integration Awaits</h2>

<p>We now have a full toolkit of complex elementary functions. The table below summarizes what we know:</p>

<table style="width:100%;border-collapse:collapse;font-size:0.9rem;margin:1em 0;">
  <thead>
    <tr style="border-bottom:1px solid #30363d;">
      <th style="text-align:left;padding:6px 10px;">Function</th>
      <th style="text-align:left;padding:6px 10px;">Single-valued?</th>
      <th style="text-align:left;padding:6px 10px;">Branch points</th>
      <th style="text-align:left;padding:6px 10px;">Zeros</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:6px 10px;">\\(e^z\\)</td>
      <td style="padding:6px 10px;">Yes</td>
      <td style="padding:6px 10px;">None</td>
      <td style="padding:6px 10px;">None</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:6px 10px;">\\(\\log z\\)</td>
      <td style="padding:6px 10px;">No (after cut: yes)</td>
      <td style="padding:6px 10px;">\\(0\\), \\(\\infty\\)</td>
      <td style="padding:6px 10px;">\\(z=1\\)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:6px 10px;">\\(z^\\alpha\\) (\\(\\alpha \\notin \\mathbb{Z}\\))</td>
      <td style="padding:6px 10px;">No (after cut: yes)</td>
      <td style="padding:6px 10px;">\\(0\\), \\(\\infty\\)</td>
      <td style="padding:6px 10px;">\\(z=0\\) (if \\(\\operatorname{Re}\\alpha > 0\\))</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:6px 10px;">\\(\\sin z\\), \\(\\cos z\\)</td>
      <td style="padding:6px 10px;">Yes (entire)</td>
      <td style="padding:6px 10px;">None</td>
      <td style="padding:6px 10px;">\\(n\\pi\\) or \\(\\frac{\\pi}{2}+n\\pi\\)</td>
    </tr>
    <tr style="border-bottom:1px solid #21262d;">
      <td style="padding:6px 10px;">\\(\\arcsin z\\)</td>
      <td style="padding:6px 10px;">No (after cut: yes)</td>
      <td style="padding:6px 10px;">\\(\\pm 1\\), \\(\\infty\\)</td>
      <td style="padding:6px 10px;">\\(z = n\\pi\\)</td>
    </tr>
    <tr>
      <td style="padding:6px 10px;">\\(\\arctan z\\)</td>
      <td style="padding:6px 10px;">No (after cut: yes)</td>
      <td style="padding:6px 10px;">\\(\\pm i\\)</td>
      <td style="padding:6px 10px;">\\(z = 0\\)</td>
    </tr>
  </tbody>
</table>

<h3>Three Themes That Lead into Chapter 4</h3>

<p><strong>1. Antiderivatives and branch cuts.</strong> On the cut plane \\(\\mathbb{C} \\setminus (-\\infty, 0]\\), the function \\(1/z\\) has antiderivative \\(\\operatorname{Log} z\\). But on any domain that encircles the origin, \\(1/z\\) has no single-valued antiderivative. This is why:</p>
\\[\\oint_{|z|=1} \\frac{1}{z}\\,dz = 2\\pi i \\ne 0.\\]

<p><strong>2. Residues from poles.</strong> Every pole of a meromorphic function contributes a residue term to a contour integral. The poles of \\(1/(1+z^2)\\) at \\(z = \\pm i\\) compute \\(\\int_{-\\infty}^{\\infty} dx/(1+x^2) = \\pi\\) by the residue theorem.</p>

<p><strong>3. Branch integrals.</strong> Integrals of functions with branch points (like \\(z^{-1/2}\\) or \\(\\log z\\)) require keyhole contours that wrap around the branch cut. The elementary functions of this chapter provide all the building blocks.</p>

<div class="env-block intuition">
    <div class="env-title">The Punchline</div>
    <div class="env-body">
        <p>Complex analysis is, at its heart, about what happens when you integrate analytic functions. The structure of these elementary functions — their poles, zeros, branch points, and periods — determines everything about those integrals. Chapter 4 will show you how.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Looking Ahead</div>
    <div class="env-body">
        <ul>
            <li><strong>Ch 4:</strong> Contour integrals and the fundamental theorem for analytic functions.</li>
            <li><strong>Ch 5:</strong> Cauchy's theorem: integrals of analytic functions over closed curves vanish.</li>
            <li><strong>Ch 6:</strong> Cauchy's integral formula: values of analytic functions encoded in boundary integrals.</li>
            <li><strong>Ch 10:</strong> Laurent series, where the coefficient of \\(1/z\\) is exactly the residue.</li>
        </ul>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Using the formula \\(\\oint_{|z|=1} z^n\\,dz\\) for \\(n \\in \\mathbb{Z}\\), which value of \\(n\\) gives a nonzero integral, and what is its value? Why is this related to the logarithm?',
                    hint: 'Parametrize \\(z = e^{i\\theta}\\), \\(\\theta \\in [0, 2\\pi)\\), and compute the integral directly for various \\(n\\).',
                    solution: 'For \\(n \\ne -1\\): \\(z^n\\) has antiderivative \\(z^{n+1}/(n+1)\\), single-valued on \\(\\mathbb{C}\\setminus\\{0\\}\\), so the integral vanishes. For \\(n = -1\\): parametrize \\(z = e^{i\\theta}\\), \\(dz = ie^{i\\theta}d\\theta\\), integral \\(= \\int_0^{2\\pi} e^{-i\\theta} \\cdot ie^{i\\theta}d\\theta = i\\cdot 2\\pi = 2\\pi i\\). The nonzero result is exactly because \\(1/z\\) has no single-valued antiderivative — the antiderivative would be \\(\\log z\\), which gains \\(2\\pi i\\) after one full loop around \\(0\\).'
                },
                {
                    question: 'The function \\(f(z) = \\tan z = \\sin z / \\cos z\\) is meromorphic. Locate all poles of \\(\\tan z\\) in the strip \\(|\\operatorname{Re}(z)| < 2\\pi\\) and determine their order.',
                    hint: 'Poles of \\(\\tan z\\) are at zeros of \\(\\cos z\\). Check the order using \\(\\sin(\\pi/2 + k\\pi) \\ne 0\\).',
                    solution: 'Zeros of \\(\\cos z\\) are at \\(z_k = \\pi/2 + k\\pi\\), \\(k \\in \\mathbb{Z}\\). In the strip \\(|\\operatorname{Re}(z)| < 2\\pi\\): \\(k = -2, -1, 0, 1\\), giving poles at \\(-3\\pi/2, -\\pi/2, \\pi/2, 3\\pi/2\\). Since \\((\\cos z)\' = -\\sin z\\) and \\(-\\sin(\\pi/2+k\\pi) = \\mp 1 \\ne 0\\), each zero of \\(\\cos z\\) is simple, so each pole of \\(\\tan z\\) is simple. Residue at each: \\(\\sin(z_k)/(-\\sin(z_k)) = -1\\).'
                }
            ]
        }
    ]
});
