window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'Complex Integration',
    subtitle: 'Integrating along curves in the complex plane',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Complex Integration?</h2>

<div class="env-block intuition">
    <div class="env-title">From Real to Complex</div>
    <div class="env-body">
        <p>In single-variable calculus, \\(\\int_a^b f(x)\\,dx\\) integrates along a line segment on \\(\\mathbb{R}\\). But in \\(\\mathbb{C}\\), between two points \\(z_0\\) and \\(z_1\\) there are infinitely many paths. The integral may depend on which path we choose. This dependence (or independence) on the path is the central drama of complex integration, and resolving it leads to the deepest theorems in analysis.</p>
    </div>
</div>

<p>Real integrals compute areas under curves. Complex integrals compute something subtler: they accumulate the values of a complex function \\(f(z)\\) weighted by the infinitesimal displacement \\(dz\\) along a curve \\(\\gamma\\). Since both \\(f(z)\\) and \\(dz\\) are complex numbers, the integral is itself a complex number. There is no "area under a curve" interpretation; instead, think of adding up tiny complex contributions as you trace along a path.</p>

<p>Three facts make complex integration remarkable:</p>
<ol>
    <li><strong>Path dependence.</strong> For general functions, the value of the integral depends on the choice of curve. But for analytic functions on simply connected domains, it does not (Chapter 5).</li>
    <li><strong>The integral of \\(1/z\\) around a closed loop enclosing the origin is \\(2\\pi i\\).</strong> This non-zero value is the seed from which the residue theorem grows.</li>
    <li><strong>Cauchy's integral formula</strong> (Chapter 6) expresses the value of an analytic function at a point in terms of a contour integral, linking local values to global behavior.</li>
</ol>

<p>This chapter develops the mechanics: how to parameterize curves, how to define the integral, and what basic properties it satisfies. The payoff comes in subsequent chapters.</p>

<h3>A Preview</h3>

<p>Consider the function \\(f(z) = z^2\\). If we integrate along a straight line from \\(0\\) to \\(1+i\\), and also along a path that first goes to \\(1\\) then up to \\(1+i\\), we get the same answer: \\(\\frac{2}{3}(1+i)^3 / 3\\). For \\(f(z) = 1/z\\), the story changes. Along a closed curve around the origin, the integral is \\(2\\pi i\\), but along a closed curve that avoids the origin, it is \\(0\\). The singularity at \\(z=0\\) makes all the difference.</p>

<div class="viz-placeholder" data-viz="viz-contour-integral"></div>
`,
            visualizations: [
                {
                    id: 'viz-contour-integral',
                    title: 'Contour Integration: Tracing a Path',
                    description: 'A point traces a contour \\(\\gamma\\) in the complex plane. At each point, the arrow shows \\(f(z)\\). The running total (accumulator) displays the integral value as it builds up along the path.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 400,
                            scale: 60
                        });

                        var t = 0;
                        var speed = 0.3;
                        var funcChoice = 0; // 0 = z^2, 1 = 1/z

                        VizEngine.createSlider(controls, 'Speed', 0.1, 1.0, speed, 0.1, function(v) {
                            speed = v;
                        });

                        var funcBtn = VizEngine.createButton(controls, 'f(z) = z\u00B2', function() {
                            funcChoice = (funcChoice + 1) % 2;
                            funcBtn.textContent = funcChoice === 0 ? 'f(z) = z\u00B2' : 'f(z) = 1/z';
                            t = 0;
                        });

                        VizEngine.createButton(controls, 'Reset', function() { t = 0; });

                        // Contour: unit circle
                        function gamma(s) {
                            var angle = 2 * Math.PI * s;
                            return [Math.cos(angle), Math.sin(angle)];
                        }
                        function gammaPrime(s) {
                            var angle = 2 * Math.PI * s;
                            return [-2 * Math.PI * Math.sin(angle), 2 * Math.PI * Math.cos(angle)];
                        }

                        function f(x, y) {
                            if (funcChoice === 0) {
                                // z^2 = (x+iy)^2 = x^2-y^2 + 2xyi
                                return [x * x - y * y, 2 * x * y];
                            } else {
                                // 1/z = conj(z)/|z|^2
                                var r2 = x * x + y * y;
                                if (r2 < 1e-10) return [0, 0];
                                return [x / r2, -y / r2];
                            }
                        }

                        viz.animate(function(time) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Draw full contour
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i <= 200; i++) {
                                var s = i / 200;
                                var pt = gamma(s);
                                var scr = viz.toScreen(pt[0], pt[1]);
                                i === 0 ? ctx.moveTo(scr[0], scr[1]) : ctx.lineTo(scr[0], scr[1]);
                            }
                            ctx.stroke();

                            // Advance t
                            t += speed * 0.004;
                            if (t > 1) t = 0;

                            // Draw traced portion
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var steps = Math.floor(t * 200);
                            for (var j = 0; j <= steps; j++) {
                                var s2 = j / 200;
                                var pt2 = gamma(s2);
                                var scr2 = viz.toScreen(pt2[0], pt2[1]);
                                j === 0 ? ctx.moveTo(scr2[0], scr2[1]) : ctx.lineTo(scr2[0], scr2[1]);
                            }
                            ctx.stroke();

                            // Current point
                            var cur = gamma(t);
                            viz.drawPoint(cur[0], cur[1], viz.colors.white, null, 6);

                            // f(z) arrow at current point
                            var fv = f(cur[0], cur[1]);
                            var arrowScale = 0.3;
                            viz.drawVector(cur[0], cur[1],
                                cur[0] + fv[0] * arrowScale,
                                cur[1] + fv[1] * arrowScale,
                                viz.colors.orange, 'f(z)');

                            // Compute integral via Riemann sum
                            var intRe = 0, intIm = 0;
                            var N = Math.max(1, Math.floor(t * 500));
                            var ds = t / N;
                            for (var k = 0; k < N; k++) {
                                var sk = k * ds;
                                var gk = gamma(sk);
                                var gpk = gammaPrime(sk);
                                var fk = f(gk[0], gk[1]);
                                // f(z) * gamma'(t) * dt
                                // (a+bi)(c+di) = ac-bd + (ad+bc)i
                                intRe += (fk[0] * gpk[0] - fk[1] * gpk[1]) * ds;
                                intIm += (fk[0] * gpk[1] + fk[1] * gpk[0]) * ds;
                            }

                            // Display accumulator
                            var sign = intIm >= 0 ? '+' : '-';
                            var label = '\\u222B = ' + intRe.toFixed(3) + ' ' + sign + ' ' + Math.abs(intIm).toFixed(3) + 'i';
                            viz.screenText(label, viz.width - 10, 25, viz.colors.teal, 14, 'right');
                            viz.screenText('t = ' + t.toFixed(2), viz.width - 10, 45, viz.colors.text, 12, 'right');

                            // Labels
                            viz.screenText('Re', viz.width - 10, viz.originY + 15, viz.colors.text, 11, 'right');
                            viz.screenText('Im', viz.originX + 12, 10, viz.colors.text, 11, 'left');

                            // Direction arrow on contour
                            if (steps > 5) {
                                var pt_a = gamma((steps - 3) / 200);
                                var pt_b = gamma(steps / 200);
                                var dx = pt_b[0] - pt_a[0], dy = pt_b[1] - pt_a[1];
                                var len = Math.sqrt(dx * dx + dy * dy);
                                if (len > 0.001) {
                                    var sa = viz.toScreen(pt_b[0], pt_b[1]);
                                    var ang = Math.atan2(-dy, dx); // screen coords
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath();
                                    ctx.moveTo(sa[0] + 8 * Math.cos(-ang), sa[1] + 8 * Math.sin(-ang));
                                    ctx.lineTo(sa[0] - 6 * Math.cos(-ang - 0.5), sa[1] - 6 * Math.sin(-ang - 0.5));
                                    ctx.lineTo(sa[0] - 6 * Math.cos(-ang + 0.5), sa[1] - 6 * Math.sin(-ang + 0.5));
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }
                        });
                        return viz;
                    }
                }
            ],
            exercises: []
        },

        // ================================================================
        // SECTION 2: Contours and Parameterization
        // ================================================================
        {
            id: 'sec-contours',
            title: 'Contours',
            content: `
<h2>Contours and Parameterization</h2>

<div class="env-block definition">
    <div class="env-title">Definition 4.1 (Smooth Curve)</div>
    <div class="env-body">
        <p>A <strong>smooth curve</strong> (or smooth arc) in the complex plane is a function \\(\\gamma: [a,b] \\to \\mathbb{C}\\) such that:</p>
        <ol>
            <li>\\(\\gamma\\) is continuous on \\([a,b]\\),</li>
            <li>\\(\\gamma'(t)\\) exists and is continuous on \\([a,b]\\),</li>
            <li>\\(\\gamma'(t) \\neq 0\\) for all \\(t \\in [a,b]\\).</li>
        </ol>
        <p>The condition \\(\\gamma'(t) \\neq 0\\) ensures the curve has a well-defined tangent direction at every point (no cusps or stalling).</p>
    </div>
</div>

<p>We write \\(\\gamma(t) = x(t) + iy(t)\\), so \\(\\gamma'(t) = x'(t) + iy'(t)\\). The <strong>trace</strong> (or image) of \\(\\gamma\\) is the set \\(\\{\\gamma(t) : t \\in [a,b]\\} \\subset \\mathbb{C}\\).</p>

<div class="env-block example">
    <div class="env-title">Example: Common Parameterizations</div>
    <div class="env-body">
        <p><strong>Line segment</strong> from \\(z_0\\) to \\(z_1\\):</p>
        \\[\\gamma(t) = (1-t)z_0 + tz_1, \\quad t \\in [0,1].\\]
        <p>Then \\(\\gamma'(t) = z_1 - z_0\\), which is constant and nonzero (provided \\(z_0 \\neq z_1\\)).</p>

        <p><strong>Circle</strong> of radius \\(R\\) centered at \\(z_0\\), traversed counterclockwise:</p>
        \\[\\gamma(t) = z_0 + Re^{it}, \\quad t \\in [0, 2\\pi].\\]
        <p>Then \\(\\gamma'(t) = iRe^{it}\\), which is never zero.</p>

        <p><strong>Semicircular arc</strong> in the upper half-plane:</p>
        \\[\\gamma(t) = Re^{it}, \\quad t \\in [0, \\pi].\\]
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 4.2 (Piecewise Smooth Curve / Contour)</div>
    <div class="env-body">
        <p>A <strong>piecewise smooth curve</strong> (or <strong>contour</strong>) is a finite concatenation of smooth curves \\(\\gamma_1, \\gamma_2, \\ldots, \\gamma_n\\) where the endpoint of \\(\\gamma_k\\) equals the starting point of \\(\\gamma_{k+1}\\):</p>
        \\[\\gamma = \\gamma_1 + \\gamma_2 + \\cdots + \\gamma_n.\\]
        <p>A contour \\(\\gamma\\) is <strong>closed</strong> if \\(\\gamma(a) = \\gamma(b)\\), i.e., the starting and ending points coincide.</p>
        <p>A contour is <strong>simple</strong> if it does not cross itself: \\(\\gamma(t_1) \\neq \\gamma(t_2)\\) for \\(t_1 \\neq t_2\\), except possibly \\(\\gamma(a) = \\gamma(b)\\) for a closed contour.</p>
    </div>
</div>

<p>The standard example of a contour that is piecewise smooth but not smooth is a square path: each side is smooth, but the tangent direction jumps at the corners.</p>

<div class="env-block definition">
    <div class="env-title">Definition 4.3 (Length of a Contour)</div>
    <div class="env-body">
        <p>The <strong>length</strong> of a smooth curve \\(\\gamma: [a,b] \\to \\mathbb{C}\\) is</p>
        \\[L(\\gamma) = \\int_a^b |\\gamma'(t)|\\,dt.\\]
        <p>For a piecewise smooth contour \\(\\gamma = \\gamma_1 + \\cdots + \\gamma_n\\), the length is \\(L(\\gamma) = L(\\gamma_1) + \\cdots + L(\\gamma_n)\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Length of a Circle</div>
    <div class="env-body">
        <p>For the circle \\(\\gamma(t) = Re^{it}\\), \\(t \\in [0, 2\\pi]\\):</p>
        \\[L(\\gamma) = \\int_0^{2\\pi} |iRe^{it}|\\,dt = \\int_0^{2\\pi} R\\,dt = 2\\pi R.\\]
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Reparameterization</div>
    <div class="env-body">
        <p>A curve can be parameterized in many ways. If \\(\\phi: [c,d] \\to [a,b]\\) is a smooth, strictly increasing bijection, then \\(\\tilde{\\gamma}(s) = \\gamma(\\phi(s))\\) traces the same set of points in the same direction. The contour integral (defined in the next section) is invariant under orientation-preserving reparameterization.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-parameterization"></div>
`,
            visualizations: [
                {
                    id: 'viz-parameterization',
                    title: 'Curve Parameterization',
                    description: 'See how different parameterizations trace the same curve. The parameter \\(t\\) runs from 0 to 1, and the point \\(\\gamma(t)\\) moves along the curve. The tangent vector \\(\\gamma\'(t)\\) is shown at the current position.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 55
                        });

                        var curveType = 0; // 0=line, 1=circle, 2=square
                        var tParam = 0.5;

                        var curveBtn = VizEngine.createButton(controls, 'Line segment', function() {
                            curveType = (curveType + 1) % 3;
                            var names = ['Line segment', 'Circle', 'Square contour'];
                            curveBtn.textContent = names[curveType];
                            draw();
                        });

                        VizEngine.createSlider(controls, 't', 0, 1, tParam, 0.01, function(v) {
                            tParam = v;
                            draw();
                        });

                        function getPoint(t) {
                            if (curveType === 0) {
                                // line from -2-i to 2+i
                                return [-2 + 4 * t, -1 + 2 * t];
                            } else if (curveType === 1) {
                                // circle radius 2
                                var angle = 2 * Math.PI * t;
                                return [2 * Math.cos(angle), 2 * Math.sin(angle)];
                            } else {
                                // square contour: 4 sides
                                if (t < 0.25) {
                                    var s = t / 0.25;
                                    return [-2 + 4 * s, -2];
                                } else if (t < 0.5) {
                                    var s = (t - 0.25) / 0.25;
                                    return [2, -2 + 4 * s];
                                } else if (t < 0.75) {
                                    var s = (t - 0.5) / 0.25;
                                    return [2 - 4 * s, 2];
                                } else {
                                    var s = (t - 0.75) / 0.25;
                                    return [-2, 2 - 4 * s];
                                }
                            }
                        }

                        function getTangent(t) {
                            var dt = 0.001;
                            var p1 = getPoint(Math.max(0, t - dt));
                            var p2 = getPoint(Math.min(1 - 1e-9, t + dt));
                            return [(p2[0] - p1[0]) / (2 * dt), (p2[1] - p1[1]) / (2 * dt)];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Draw full curve
                            ctx.strokeStyle = viz.colors.blue + '55';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i <= 300; i++) {
                                var s = i / 300;
                                var pt = getPoint(s);
                                var scr = viz.toScreen(pt[0], pt[1]);
                                i === 0 ? ctx.moveTo(scr[0], scr[1]) : ctx.lineTo(scr[0], scr[1]);
                            }
                            ctx.stroke();

                            // Draw traced portion
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var steps = Math.floor(tParam * 300);
                            for (var j = 0; j <= steps; j++) {
                                var s2 = j / 300;
                                var pt2 = getPoint(s2);
                                var scr2 = viz.toScreen(pt2[0], pt2[1]);
                                j === 0 ? ctx.moveTo(scr2[0], scr2[1]) : ctx.lineTo(scr2[0], scr2[1]);
                            }
                            ctx.stroke();

                            // Current point
                            var cur = getPoint(tParam);
                            viz.drawPoint(cur[0], cur[1], viz.colors.white, '\u03B3(t)', 6);

                            // Tangent vector
                            var tang = getTangent(tParam);
                            var tlen = Math.sqrt(tang[0] * tang[0] + tang[1] * tang[1]);
                            if (tlen > 0.01) {
                                var sc = 0.15;
                                viz.drawVector(cur[0], cur[1],
                                    cur[0] + tang[0] * sc,
                                    cur[1] + tang[1] * sc,
                                    viz.colors.orange, "\u03B3'(t)");
                            }

                            // Start/end markers
                            var start = getPoint(0);
                            var end = getPoint(0.999);
                            viz.drawPoint(start[0], start[1], viz.colors.green, 'start', 4);
                            if (curveType !== 1) {
                                viz.drawPoint(end[0], end[1], viz.colors.red, 'end', 4);
                            }

                            // Info
                            viz.screenText('\u03B3(t) = (' + cur[0].toFixed(2) + ', ' + cur[1].toFixed(2) + ')',
                                viz.width / 2, viz.height - 15, viz.colors.white, 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Parameterize the line segment from \\(1+i\\) to \\(3-2i\\). Compute its length.',
                    hint: 'Use \\(\\gamma(t) = (1-t)(1+i) + t(3-2i)\\) for \\(t \\in [0,1]\\). The length is \\(|z_1 - z_0|\\).',
                    solution: '\\(\\gamma(t) = (1+2t) + (1-3t)i\\), \\(t \\in [0,1]\\). Then \\(\\gamma\'(t) = 2 - 3i\\), so \\(L = \\int_0^1 |2-3i|\\,dt = \\sqrt{4+9} = \\sqrt{13}\\).'
                },
                {
                    question: 'Parameterize the upper semicircle of radius 3 centered at \\(1\\), traversed from \\(4\\) to \\(-2\\).',
                    hint: 'The circle centered at 1 of radius 3 is \\(1 + 3e^{it}\\). The upper semicircle goes from angle \\(0\\) to angle \\(\\pi\\).',
                    solution: '\\(\\gamma(t) = 1 + 3e^{it}\\), \\(t \\in [0, \\pi]\\). At \\(t=0\\), \\(\\gamma = 4\\); at \\(t=\\pi\\), \\(\\gamma = -2\\). Length: \\(\\int_0^{\\pi} 3\\,dt = 3\\pi\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Definition
        // ================================================================
        {
            id: 'sec-definition',
            title: 'The Contour Integral',
            content: `
<h2>The Contour Integral</h2>

<div class="env-block intuition">
    <div class="env-title">Building Up the Integral</div>
    <div class="env-body">
        <p>Just as the real integral \\(\\int_a^b f(x)\\,dx\\) is a limit of Riemann sums \\(\\sum f(x_k)\\Delta x_k\\), the contour integral is a limit of sums \\(\\sum f(z_k)\\Delta z_k\\), where \\(\\Delta z_k = z_{k+1} - z_k\\) are complex increments along the curve. The key difference: \\(\\Delta z_k\\) is a complex number, so the sum involves both the magnitude and direction of each step.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 4.4 (Contour Integral)</div>
    <div class="env-body">
        <p>Let \\(\\gamma: [a,b] \\to \\mathbb{C}\\) be a smooth curve and let \\(f\\) be continuous on the trace of \\(\\gamma\\). The <strong>contour integral</strong> (or <strong>line integral</strong>) of \\(f\\) along \\(\\gamma\\) is</p>
        \\[\\int_\\gamma f(z)\\,dz = \\int_a^b f(\\gamma(t))\\,\\gamma'(t)\\,dt.\\]
        <p>For a piecewise smooth contour \\(\\gamma = \\gamma_1 + \\cdots + \\gamma_n\\):</p>
        \\[\\int_\\gamma f(z)\\,dz = \\sum_{k=1}^n \\int_{\\gamma_k} f(z)\\,dz.\\]
    </div>
</div>

<p>The formula \\(dz = \\gamma'(t)\\,dt\\) is the formal substitution: the complex differential \\(dz\\) along the curve equals \\(\\gamma'(t)\\,dt\\). The product \\(f(\\gamma(t))\\,\\gamma'(t)\\) is a complex-valued function of the real variable \\(t\\), so the integral on the right is an ordinary (Riemann) integral of real and imaginary parts:</p>

\\[\\int_a^b f(\\gamma(t))\\,\\gamma'(t)\\,dt = \\int_a^b \\operatorname{Re}[f(\\gamma(t))\\gamma'(t)]\\,dt + i\\int_a^b \\operatorname{Im}[f(\\gamma(t))\\gamma'(t)]\\,dt.\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 4.1 (Parameterization Independence)</div>
    <div class="env-body">
        <p>The contour integral is invariant under orientation-preserving reparameterization. If \\(\\phi: [c,d] \\to [a,b]\\) is smooth, strictly increasing, and onto, then</p>
        \\[\\int_{\\gamma \\circ \\phi} f(z)\\,dz = \\int_\\gamma f(z)\\,dz.\\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Integrating \\(f(z) = \\bar{z}\\) Along a Line</div>
    <div class="env-body">
        <p>Let \\(\\gamma(t) = t + it\\) for \\(t \\in [0,1]\\) (line from \\(0\\) to \\(1+i\\)). Then \\(\\gamma'(t) = 1+i\\) and \\(f(\\gamma(t)) = \\overline{t+it} = t - it\\).</p>
        \\[\\int_\\gamma \\bar{z}\\,dz = \\int_0^1 (t-it)(1+i)\\,dt = \\int_0^1 (t-it+it-i^2t)\\,dt = \\int_0^1 (t + t)\\,dt = \\int_0^1 2t\\,dt = 1.\\]
        <p>Note that \\(\\bar{z}\\) is not analytic, yet we can still compute the integral along any specified contour.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Integrating \\(f(z) = z^2\\) Along the Unit Circle</div>
    <div class="env-body">
        <p>Let \\(\\gamma(t) = e^{it}\\), \\(t \\in [0, 2\\pi]\\). Then \\(\\gamma'(t) = ie^{it}\\) and \\(f(\\gamma(t)) = e^{2it}\\).</p>
        \\[\\int_\\gamma z^2\\,dz = \\int_0^{2\\pi} e^{2it} \\cdot ie^{it}\\,dt = i\\int_0^{2\\pi} e^{3it}\\,dt = i \\left[\\frac{e^{3it}}{3i}\\right]_0^{2\\pi} = \\frac{1}{3}(e^{6\\pi i} - 1) = 0.\\]
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Compute \\(\\int_\\gamma z\\,dz\\) where \\(\\gamma(t) = t + it^2\\) for \\(t \\in [0,1]\\).',
                    hint: 'Use the definition: \\(\\gamma\'(t) = 1 + 2it\\) and \\(f(\\gamma(t)) = t + it^2\\). Expand the product and integrate real and imaginary parts.',
                    solution: '\\(\\int_0^1 (t+it^2)(1+2it)\\,dt = \\int_0^1 [(t - 2t^3) + i(t^2 + 2t^2)]\\,dt = \\int_0^1 (t-2t^3)\\,dt + i\\int_0^1 3t^2\\,dt = (\\frac{1}{2} - \\frac{1}{2}) + i \\cdot 1 = i\\).'
                },
                {
                    question: 'Compute \\(\\int_\\gamma \\text{Re}(z)\\,dz\\) along the line segment from \\(0\\) to \\(1+i\\).',
                    hint: 'Parameterize: \\(\\gamma(t) = t(1+i)\\), so \\(\\text{Re}(\\gamma(t)) = t\\) and \\(\\gamma\'(t) = 1+i\\).',
                    solution: '\\(\\int_0^1 t(1+i)\\,dt = (1+i)\\frac{1}{2} = \\frac{1}{2} + \\frac{i}{2}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Properties
        // ================================================================
        {
            id: 'sec-properties',
            title: 'Properties',
            content: `
<h2>Properties of Contour Integrals</h2>

<p>The contour integral inherits many properties from the ordinary Riemann integral.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.2 (Linearity)</div>
    <div class="env-body">
        <p>For functions \\(f, g\\) continuous on the trace of \\(\\gamma\\) and constants \\(\\alpha, \\beta \\in \\mathbb{C}\\):</p>
        \\[\\int_\\gamma [\\alpha f(z) + \\beta g(z)]\\,dz = \\alpha \\int_\\gamma f(z)\\,dz + \\beta \\int_\\gamma g(z)\\,dz.\\]
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.3 (Reversal of Orientation)</div>
    <div class="env-body">
        <p>Let \\(-\\gamma\\) denote the curve \\(\\gamma\\) traversed in the opposite direction. Then</p>
        \\[\\int_{-\\gamma} f(z)\\,dz = -\\int_\\gamma f(z)\\,dz.\\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>If \\(\\gamma: [a,b] \\to \\mathbb{C}\\), then \\(-\\gamma\\) can be parameterized as \\(\\tilde{\\gamma}(t) = \\gamma(a + b - t)\\). We have \\(\\tilde{\\gamma}'(t) = -\\gamma'(a+b-t)\\), so</p>
        \\[\\int_{-\\gamma} f(z)\\,dz = \\int_a^b f(\\gamma(a+b-t))(-\\gamma'(a+b-t))\\,dt = -\\int_a^b f(\\gamma(s))\\gamma'(s)\\,ds = -\\int_\\gamma f(z)\\,dz\\]
        <p>where we substituted \\(s = a + b - t\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.4 (Concatenation)</div>
    <div class="env-body">
        <p>If \\(\\gamma = \\gamma_1 + \\gamma_2\\) (the endpoint of \\(\\gamma_1\\) is the starting point of \\(\\gamma_2\\)), then</p>
        \\[\\int_\\gamma f(z)\\,dz = \\int_{\\gamma_1} f(z)\\,dz + \\int_{\\gamma_2} f(z)\\,dz.\\]
    </div>
</div>

<h3>The ML Inequality</h3>

<p>The most important estimation tool for contour integrals is the <strong>ML inequality</strong>. It bounds the modulus of an integral by the maximum of \\(|f|\\) times the length of the contour.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.5 (ML Inequality)</div>
    <div class="env-body">
        <p>If \\(f\\) is continuous on the trace of a contour \\(\\gamma\\) with length \\(L\\), and \\(|f(z)| \\leq M\\) for all \\(z\\) on \\(\\gamma\\), then</p>
        \\[\\left|\\int_\\gamma f(z)\\,dz\\right| \\leq ML.\\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Using the standard inequality \\(|\\int_a^b g(t)\\,dt| \\leq \\int_a^b |g(t)|\\,dt\\) for complex-valued functions:</p>
        \\[\\left|\\int_\\gamma f(z)\\,dz\\right| = \\left|\\int_a^b f(\\gamma(t))\\gamma'(t)\\,dt\\right| \\leq \\int_a^b |f(\\gamma(t))| \\cdot |\\gamma'(t)|\\,dt \\leq M \\int_a^b |\\gamma'(t)|\\,dt = ML.\\]
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Bounding an Integral</div>
    <div class="env-body">
        <p>Estimate \\(\\left|\\int_\\gamma \\frac{dz}{z^2+1}\\right|\\) where \\(\\gamma\\) is the upper semicircle of radius \\(R > 1\\).</p>
        <p>On \\(\\gamma\\), \\(|z| = R\\), so \\(|z^2+1| \\geq |z|^2 - 1 = R^2 - 1\\). Thus \\(M = 1/(R^2 - 1)\\) and \\(L = \\pi R\\), giving</p>
        \\[\\left|\\int_\\gamma \\frac{dz}{z^2+1}\\right| \\leq \\frac{\\pi R}{R^2 - 1} \\to 0 \\text{ as } R \\to \\infty.\\]
        <p>This vanishing is exactly what makes the residue calculus for real improper integrals work (Chapter 12).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-ml-inequality"></div>
`,
            visualizations: [
                {
                    id: 'viz-ml-inequality',
                    title: 'The ML Inequality',
                    description: 'The ML bound \\(ML\\) provides an upper estimate for \\(|\\int_\\gamma f(z)\\,dz|\\). Drag the radius \\(R\\) to see how the bound changes for \\(f(z) = 1/(z^2+1)\\) on a semicircular contour.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 40
                        });

                        var R = 2.0;
                        VizEngine.createSlider(controls, 'R', 1.2, 6, R, 0.1, function(v) {
                            R = v;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Draw poles at +i and -i
                            viz.drawPoint(0, 1, viz.colors.red, 'i', 5);
                            viz.drawPoint(0, -1, viz.colors.red, '-i', 5);

                            // Draw semicircular contour
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 100; i++) {
                                var angle = Math.PI * i / 100;
                                var x = R * Math.cos(angle);
                                var y = R * Math.sin(angle);
                                var scr = viz.toScreen(x, y);
                                i === 0 ? ctx.moveTo(scr[0], scr[1]) : ctx.lineTo(scr[0], scr[1]);
                            }
                            ctx.stroke();

                            // Draw line segment on real axis
                            viz.drawSegment(-R, 0, R, 0, viz.colors.blue, 2.5);

                            // Arrow on semicircle
                            var midAng = Math.PI / 2;
                            var mx = R * Math.cos(midAng);
                            var my = R * Math.sin(midAng);
                            var ms = viz.toScreen(mx, my);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(ms[0] - 7, ms[1] - 3);
                            ctx.lineTo(ms[0] + 2, ms[1]);
                            ctx.lineTo(ms[0] - 7, ms[1] + 3);
                            ctx.closePath();
                            ctx.fill();

                            // Show |f(z)| on the contour via color intensity
                            for (var j = 0; j <= 100; j++) {
                                var ang = Math.PI * j / 100;
                                var zx = R * Math.cos(ang);
                                var zy = R * Math.sin(ang);
                                var mag2 = (zx * zx - zy * zy + 1) * (zx * zx - zy * zy + 1) + (2 * zx * zy) * (2 * zx * zy);
                                var fMag = 1 / Math.sqrt(mag2);
                                var dotR = 2 + fMag * 8;
                                var alpha = Math.min(1, fMag * 2);
                                ctx.fillStyle = 'rgba(240,136,62,' + alpha.toFixed(2) + ')';
                                var ds = viz.toScreen(zx, zy);
                                ctx.beginPath();
                                ctx.arc(ds[0], ds[1], dotR, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Compute ML bound
                            var M = 1 / (R * R - 1);
                            var L = Math.PI * R;
                            var ML = M * L;

                            // Compute actual integral numerically (just semicircular part)
                            var intRe = 0, intIm = 0;
                            var N = 1000;
                            for (var k = 0; k < N; k++) {
                                var tk = Math.PI * k / N;
                                var dt = Math.PI / N;
                                var gx = R * Math.cos(tk);
                                var gy = R * Math.sin(tk);
                                var gpx = -R * Math.sin(tk);
                                var gpy = R * Math.cos(tk);
                                // 1/(z^2+1): z^2+1 = (gx^2-gy^2+1) + 2*gx*gy*i
                                var denRe = gx * gx - gy * gy + 1;
                                var denIm = 2 * gx * gy;
                                var denMag2 = denRe * denRe + denIm * denIm;
                                var fRe = denRe / denMag2;
                                var fIm = -denIm / denMag2;
                                // f * gamma'
                                var prodRe = fRe * gpx - fIm * gpy;
                                var prodIm = fRe * gpy + fIm * gpx;
                                intRe += prodRe * dt;
                                intIm += prodIm * dt;
                            }
                            var actualMag = Math.sqrt(intRe * intRe + intIm * intIm);

                            // Display info
                            viz.screenText('M = 1/(R\u00B2-1) = ' + M.toFixed(3), 10, 20, viz.colors.orange, 12, 'left');
                            viz.screenText('L = \u03C0R = ' + L.toFixed(2), 10, 38, viz.colors.blue, 12, 'left');
                            viz.screenText('ML = ' + ML.toFixed(3), 10, 56, viz.colors.teal, 13, 'left');
                            viz.screenText('|\u222B| = ' + actualMag.toFixed(3), 10, 74, viz.colors.white, 13, 'left');
                            viz.screenText('Ratio |\u222B|/ML = ' + (actualMag / ML).toFixed(3), 10, 92, viz.colors.purple, 12, 'left');

                            viz.screenText('R = ' + R.toFixed(1), viz.width - 10, 20, viz.colors.white, 13, 'right');
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(\\left|\\int_\\gamma e^z\\,dz\\right| \\leq e^R \\cdot 2\\pi R\\) when \\(\\gamma\\) is the circle \\(|z| = R\\).',
                    hint: 'On \\(|z| = R\\), write \\(z = x + iy\\) with \\(x^2 + y^2 = R^2\\). Then \\(|e^z| = e^x \\leq e^R\\).',
                    solution: 'On \\(|z|=R\\), \\(|e^z| = e^{\\text{Re}(z)} \\leq e^R\\). The length of \\(\\gamma\\) is \\(2\\pi R\\). By the ML inequality, \\(|\\int_\\gamma e^z\\,dz| \\leq e^R \\cdot 2\\pi R\\).'
                },
                {
                    question: 'Prove that \\(\\int_{-\\gamma} f(z)\\,dz = -\\int_\\gamma f(z)\\,dz\\) directly from the definition, using the substitution \\(s = a + b - t\\).',
                    hint: 'Parameterize \\(-\\gamma(t) = \\gamma(a+b-t)\\). Compute the derivative and substitute.',
                    solution: 'Set \\(\\tilde{\\gamma}(t) = \\gamma(a+b-t)\\). Then \\(\\tilde{\\gamma}\'(t) = -\\gamma\'(a+b-t)\\). Substituting \\(s = a+b-t\\), \\(ds = -dt\\): \\(\\int_a^b f(\\gamma(a+b-t))(-\\gamma\'(a+b-t))\\,dt = -\\int_b^a f(\\gamma(s))\\gamma\'(s)(-ds) = -\\int_a^b f(\\gamma(s))\\gamma\'(s)\\,ds\\).'
                },
                {
                    question: 'Estimate \\(\\left|\\int_\\gamma \\frac{z}{z^4+1}\\,dz\\right|\\) where \\(\\gamma\\) is the circle \\(|z| = 2\\).',
                    hint: 'On \\(|z|=2\\): \\(|z|=2\\), \\(|z^4+1| \\geq |z|^4 - 1 = 15\\), so \\(|f(z)| \\leq 2/15\\). The length is \\(4\\pi\\).',
                    solution: '\\(M = \\frac{|z|}{|z^4+1|} \\leq \\frac{2}{2^4 - 1} = \\frac{2}{15}\\). \\(L = 2\\pi \\cdot 2 = 4\\pi\\). ML bound: \\(\\frac{2}{15} \\cdot 4\\pi = \\frac{8\\pi}{15} \\approx 1.676\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Antiderivatives and Path Independence
        // ================================================================
        {
            id: 'sec-antiderivatives',
            title: 'Antiderivatives',
            content: `
<h2>Antiderivatives and Path Independence</h2>

<div class="env-block intuition">
    <div class="env-title">The Complex Fundamental Theorem</div>
    <div class="env-body">
        <p>In single-variable calculus, if \\(F' = f\\) then \\(\\int_a^b f(x)\\,dx = F(b) - F(a)\\), independent of how you "travel" from \\(a\\) to \\(b\\) (there is only one way on the real line). In \\(\\mathbb{C}\\), the same is true if \\(f\\) has an antiderivative: the integral depends only on the endpoints, not on the path. This is path independence.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 4.5 (Antiderivative)</div>
    <div class="env-body">
        <p>Let \\(f\\) be continuous on a domain \\(D \\subseteq \\mathbb{C}\\). A function \\(F\\) analytic on \\(D\\) is an <strong>antiderivative</strong> (or <strong>primitive</strong>) of \\(f\\) on \\(D\\) if \\(F'(z) = f(z)\\) for all \\(z \\in D\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.6 (Fundamental Theorem of Contour Integration)</div>
    <div class="env-body">
        <p>If \\(f\\) is continuous on a domain \\(D\\) and has an antiderivative \\(F\\) on \\(D\\), then for any contour \\(\\gamma\\) in \\(D\\) from \\(z_0\\) to \\(z_1\\):</p>
        \\[\\int_\\gamma f(z)\\,dz = F(z_1) - F(z_0).\\]
        <p>In particular:</p>
        <ol>
            <li>The integral is <strong>path-independent</strong>: it depends only on the endpoints.</li>
            <li>If \\(\\gamma\\) is closed (\\(z_0 = z_1\\)), then \\(\\int_\\gamma f(z)\\,dz = 0\\).</li>
        </ol>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>By the chain rule for complex derivatives:</p>
        \\[\\frac{d}{dt}F(\\gamma(t)) = F'(\\gamma(t))\\gamma'(t) = f(\\gamma(t))\\gamma'(t).\\]
        <p>Therefore</p>
        \\[\\int_\\gamma f(z)\\,dz = \\int_a^b f(\\gamma(t))\\gamma'(t)\\,dt = \\int_a^b \\frac{d}{dt}F(\\gamma(t))\\,dt = F(\\gamma(b)) - F(\\gamma(a)) = F(z_1) - F(z_0).\\]
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Path Independence for \\(z^2\\)</div>
    <div class="env-body">
        <p>Since \\(\\frac{d}{dz}\\frac{z^3}{3} = z^2\\), the function \\(f(z) = z^2\\) has antiderivative \\(F(z) = z^3/3\\) on all of \\(\\mathbb{C}\\). For any contour from \\(0\\) to \\(1+i\\):</p>
        \\[\\int_\\gamma z^2\\,dz = \\frac{(1+i)^3}{3} = \\frac{1 + 3i + 3i^2 + i^3}{3} = \\frac{1 + 3i - 3 - i}{3} = \\frac{-2 + 2i}{3}.\\]
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">When Does an Antiderivative Exist?</div>
    <div class="env-body">
        <p>The function \\(f(z) = 1/z\\) does <em>not</em> have an antiderivative on \\(\\mathbb{C} \\setminus \\{0\\}\\). The "natural" candidate \\(\\log z\\) is multi-valued. On any simply connected subdomain not containing the origin (e.g., \\(\\mathbb{C}\\) minus the negative real axis), a branch of \\(\\log z\\) serves as an antiderivative. But on the punctured plane, no single-valued antiderivative exists, which is why \\(\\oint_{|z|=1} \\frac{dz}{z} \\neq 0\\).</p>
        <p>Cauchy's theorem (Chapter 5) will show that every analytic function on a simply connected domain has an antiderivative.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-path-independence"></div>
`,
            visualizations: [
                {
                    id: 'viz-path-independence',
                    title: 'Path Independence',
                    description: 'Compare integrals of \\(f(z) = z^2\\) along different paths from \\(0\\) to a target point. All paths give the same value because \\(z^2\\) has an antiderivative. Drag the target point to see the integral change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 55
                        });

                        var target = viz.addDraggable('target', 2, 1.5, viz.colors.teal, 8);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var tx = target.x, ty = target.y;

                            // Path 1: straight line from 0 to target
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var s1 = viz.toScreen(0, 0);
                            var s2 = viz.toScreen(tx, ty);
                            ctx.moveTo(s1[0], s1[1]);
                            ctx.lineTo(s2[0], s2[1]);
                            ctx.stroke();

                            // Path 2: go right then up
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(s1[0], s1[1]);
                            var s3 = viz.toScreen(tx, 0);
                            ctx.lineTo(s3[0], s3[1]);
                            ctx.lineTo(s2[0], s2[1]);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Path 3: curved path
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath();
                            for (var i = 0; i <= 100; i++) {
                                var t = i / 100;
                                var px = tx * t;
                                var py = ty * t + 0.8 * Math.sin(Math.PI * t);
                                var scr = viz.toScreen(px, py);
                                i === 0 ? ctx.moveTo(scr[0], scr[1]) : ctx.lineTo(scr[0], scr[1]);
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Compute exact answer: (z1)^3/3 where z1 = tx + i*ty
                            // (tx + i*ty)^3 = tx^3 - 3*tx*ty^2 + i*(3*tx^2*ty - ty^3)
                            var re3 = tx * tx * tx - 3 * tx * ty * ty;
                            var im3 = 3 * tx * tx * ty - ty * ty * ty;
                            var intRe = re3 / 3;
                            var intIm = im3 / 3;

                            // Numerical integrals along each path
                            function numericalIntegral(pathFn) {
                                var sumRe = 0, sumIm = 0;
                                var N = 500;
                                for (var k = 0; k < N; k++) {
                                    var t1 = k / N, t2 = (k + 1) / N;
                                    var p1 = pathFn(t1), p2 = pathFn(t2);
                                    var dzRe = p2[0] - p1[0], dzIm = p2[1] - p1[1];
                                    var midx = (p1[0] + p2[0]) / 2, midy = (p1[1] + p2[1]) / 2;
                                    // f(z) = z^2 = (x+iy)^2 = x^2-y^2 + 2xyi
                                    var fRe = midx * midx - midy * midy;
                                    var fIm = 2 * midx * midy;
                                    sumRe += fRe * dzRe - fIm * dzIm;
                                    sumIm += fRe * dzIm + fIm * dzRe;
                                }
                                return [sumRe, sumIm];
                            }

                            var r1 = numericalIntegral(function(t) { return [tx * t, ty * t]; });
                            var r2 = numericalIntegral(function(t) {
                                if (t < 0.5) return [tx * 2 * t, 0];
                                return [tx, ty * (2 * t - 1)];
                            });
                            var r3 = numericalIntegral(function(t) {
                                return [tx * t, ty * t + 0.8 * Math.sin(Math.PI * t)];
                            });

                            // Markers
                            viz.drawPoint(0, 0, viz.colors.green, '0', 5);
                            viz.drawDraggables();

                            // Display results
                            var sign = intIm >= 0 ? '+' : '-';
                            viz.screenText('F(z\u2081) - F(0) = z\u2081\u00B3/3 = ' + intRe.toFixed(2) + ' ' + sign + ' ' + Math.abs(intIm).toFixed(2) + 'i',
                                viz.width / 2, 20, viz.colors.white, 13);

                            function fmtC(r) {
                                var s = r[1] >= 0 ? '+' : '-';
                                return r[0].toFixed(2) + s + Math.abs(r[1]).toFixed(2) + 'i';
                            }
                            viz.screenText('Path 1 (line): ' + fmtC(r1), 10, viz.height - 55, viz.colors.blue, 11, 'left');
                            viz.screenText('Path 2 (L-shape): ' + fmtC(r2), 10, viz.height - 38, viz.colors.orange, 11, 'left');
                            viz.screenText('Path 3 (curve): ' + fmtC(r3), 10, viz.height - 21, viz.colors.purple, 11, 'left');
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\int_\\gamma z^3\\,dz\\) along any path from \\(-1\\) to \\(1+2i\\).',
                    hint: 'An antiderivative of \\(z^3\\) is \\(z^4/4\\).',
                    solution: '\\(\\int_\\gamma z^3\\,dz = \\frac{(1+2i)^4}{4} - \\frac{(-1)^4}{4}\\). Now \\((1+2i)^2 = -3+4i\\), so \\((1+2i)^4 = (-3+4i)^2 = 9 - 24i - 16 = -7 - 24i\\). Answer: \\(\\frac{-7-24i}{4} - \\frac{1}{4} = -2 - 6i\\).'
                },
                {
                    question: 'Explain why \\(f(z) = \\bar{z}\\) cannot have an antiderivative on any open set.',
                    hint: 'If \\(F\'(z) = \\bar{z}\\), then \\(F\\) would be analytic and \\(\\bar{z}\\) would be analytic. But \\(\\bar{z}\\) fails the Cauchy-Riemann equations.',
                    solution: 'If \\(F\'(z) = \\bar{z}\\) with \\(F\\) analytic, then \\(\\bar{z}\\) would be analytic. But \\(\\bar{z} = x - iy\\) has \\(u = x, v = -y\\), so \\(u_x = 1 \\neq v_y = -1\\). The Cauchy-Riemann equations fail, so \\(\\bar{z}\\) is not analytic and cannot be the derivative of an analytic function.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Key Examples
        // ================================================================
        {
            id: 'sec-examples',
            title: 'Key Examples',
            content: `
<h2>Key Examples</h2>

<p>Two integrals are fundamental to everything that follows in complex analysis. They concern the functions \\(z^n\\) and \\(1/z\\) integrated around circles.</p>

<h3>The Integral of \\(z^n\\) Around a Circle</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.7</div>
    <div class="env-body">
        <p>Let \\(\\gamma\\) be the circle \\(|z - z_0| = R\\) traversed counterclockwise, and let \\(n\\) be an integer. Then</p>
        \\[\\oint_\\gamma (z - z_0)^n\\,dz = \\begin{cases} 2\\pi i & \\text{if } n = -1, \\\\ 0 & \\text{if } n \\neq -1. \\end{cases}\\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>Parameterize: \\(\\gamma(t) = z_0 + Re^{it}\\), \\(t \\in [0, 2\\pi]\\). Then \\(\\gamma'(t) = iRe^{it}\\) and \\((\\gamma(t) - z_0)^n = R^n e^{int}\\).</p>
        \\[\\oint_\\gamma (z-z_0)^n\\,dz = \\int_0^{2\\pi} R^n e^{int} \\cdot iR e^{it}\\,dt = iR^{n+1} \\int_0^{2\\pi} e^{i(n+1)t}\\,dt.\\]
        <p><strong>Case \\(n \\neq -1\\):</strong></p>
        \\[\\int_0^{2\\pi} e^{i(n+1)t}\\,dt = \\left[\\frac{e^{i(n+1)t}}{i(n+1)}\\right]_0^{2\\pi} = \\frac{e^{2\\pi i(n+1)} - 1}{i(n+1)} = 0\\]
        <p>since \\(e^{2\\pi i(n+1)} = 1\\) for any integer \\(n+1 \\neq 0\\).</p>
        <p><strong>Case \\(n = -1\\):</strong></p>
        \\[\\int_0^{2\\pi} e^{i \\cdot 0 \\cdot t}\\,dt = \\int_0^{2\\pi} 1\\,dt = 2\\pi.\\]
        <p>So the integral equals \\(iR^0 \\cdot 2\\pi = 2\\pi i\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block remark">
    <div class="env-title">Why \\(n = -1\\) is Special</div>
    <div class="env-body">
        <p>For \\(n \\neq -1\\), the function \\((z - z_0)^n\\) has an antiderivative \\(\\frac{(z-z_0)^{n+1}}{n+1}\\), so the integral around any closed curve is zero. For \\(n = -1\\), the "antiderivative" would be \\(\\log(z - z_0)\\), which is multi-valued. The integral measures the failure of \\(\\log\\) to be single-valued: going once around \\(z_0\\), the argument increases by \\(2\\pi\\), contributing \\(2\\pi i\\).</p>
    </div>
</div>

<h3>The Winding Number</h3>

<p>For a closed curve \\(\\gamma\\) not passing through a point \\(z_0\\), the quantity</p>
\\[n(\\gamma, z_0) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{dz}{z - z_0}\\]
<p>is always an integer, called the <strong>winding number</strong> of \\(\\gamma\\) about \\(z_0\\). It counts how many times \\(\\gamma\\) winds around \\(z_0\\) counterclockwise. The result \\(2\\pi i\\) for the unit circle corresponds to winding number \\(1\\).</p>

<div class="viz-placeholder" data-viz="viz-1-over-z"></div>
<div class="viz-placeholder" data-viz="viz-z-to-n"></div>
`,
            visualizations: [
                {
                    id: 'viz-1-over-z',
                    title: 'Integrating 1/z Around the Origin',
                    description: 'The integral of \\(1/z\\) around any closed contour enclosing the origin equals \\(2\\pi i\\), regardless of the shape. Watch the integral accumulate as the point traces different contours.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 55
                        });

                        var t = 0;
                        var shapeIdx = 0;
                        var shapes = ['Circle', 'Ellipse', 'Square'];

                        var shapeBtn = VizEngine.createButton(controls, 'Circle', function() {
                            shapeIdx = (shapeIdx + 1) % 3;
                            shapeBtn.textContent = shapes[shapeIdx];
                            t = 0;
                        });

                        VizEngine.createButton(controls, 'Reset', function() { t = 0; });

                        function getContourPoint(s) {
                            var angle = 2 * Math.PI * s;
                            if (shapeIdx === 0) {
                                return [1.5 * Math.cos(angle), 1.5 * Math.sin(angle)];
                            } else if (shapeIdx === 1) {
                                return [2.5 * Math.cos(angle), 1.2 * Math.sin(angle)];
                            } else {
                                // Square
                                var side = s * 4;
                                if (side < 1) return [-2 + 4 * side, -2];
                                else if (side < 2) return [2, -2 + 4 * (side - 1)];
                                else if (side < 3) return [2 - 4 * (side - 2), 2];
                                else return [-2, 2 - 4 * (side - 3)];
                            }
                        }

                        viz.animate(function(time) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Mark origin
                            viz.drawPoint(0, 0, viz.colors.red, '0', 5);

                            // Draw full contour
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i <= 400; i++) {
                                var s = i / 400;
                                var pt = getContourPoint(s);
                                var scr = viz.toScreen(pt[0], pt[1]);
                                i === 0 ? ctx.moveTo(scr[0], scr[1]) : ctx.lineTo(scr[0], scr[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();

                            // Advance
                            t += 0.003;
                            if (t > 1) t = 0;

                            // Draw traced portion
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var steps = Math.floor(t * 400);
                            for (var j = 0; j <= steps; j++) {
                                var s2 = j / 400;
                                var pt2 = getContourPoint(s2);
                                var scr2 = viz.toScreen(pt2[0], pt2[1]);
                                j === 0 ? ctx.moveTo(scr2[0], scr2[1]) : ctx.lineTo(scr2[0], scr2[1]);
                            }
                            ctx.stroke();

                            // Current point
                            var cur = getContourPoint(t);
                            viz.drawPoint(cur[0], cur[1], viz.colors.white, null, 6);

                            // Compute integral numerically
                            var intRe = 0, intIm = 0;
                            var N = Math.max(1, Math.floor(t * 1000));
                            var ds = t / N;
                            for (var k = 0; k < N; k++) {
                                var sk = k * ds;
                                var sk1 = (k + 1) * ds;
                                var gk = getContourPoint(sk);
                                var gk1 = getContourPoint(sk1);
                                var dzRe = gk1[0] - gk[0];
                                var dzIm = gk1[1] - gk[1];
                                var mx = (gk[0] + gk1[0]) / 2;
                                var my = (gk[1] + gk1[1]) / 2;
                                // 1/z = conj(z)/|z|^2
                                var r2 = mx * mx + my * my;
                                if (r2 < 1e-10) continue;
                                var fRe = mx / r2;
                                var fIm = -my / r2;
                                intRe += fRe * dzRe - fIm * dzIm;
                                intIm += fRe * dzIm + fIm * dzRe;
                            }

                            // Display
                            var sign = intIm >= 0 ? '+' : '-';
                            viz.screenText('\u222B 1/z dz = ' + intRe.toFixed(3) + ' ' + sign + ' ' + Math.abs(intIm).toFixed(3) + 'i',
                                viz.width / 2, 20, viz.colors.teal, 14);
                            viz.screenText('2\u03C0i \u2248 0 + 6.283i', viz.width / 2, 40, viz.colors.text, 12);

                            // Progress bar
                            var barW = 200;
                            var barX = (viz.width - barW) / 2;
                            var barY = viz.height - 20;
                            ctx.fillStyle = viz.colors.grid;
                            ctx.fillRect(barX, barY, barW, 8);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(barX, barY, barW * t, 8);
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-z-to-n',
                    title: 'Integral of \\((z-z_0)^n\\) Around a Circle',
                    description: 'Use the slider to change \\(n\\). The integral is \\(2\\pi i\\) when \\(n = -1\\) and \\(0\\) for all other integer values of \\(n\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 55
                        });

                        var nVal = -1;
                        var t = 0;

                        VizEngine.createSlider(controls, 'n', -5, 5, nVal, 1, function(v) {
                            nVal = Math.round(v);
                            t = 0;
                        });

                        VizEngine.createButton(controls, 'Reset', function() { t = 0; });

                        viz.animate(function(time) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var R = 1.5;

                            // Draw circle
                            viz.drawCircle(0, 0, R, null, viz.colors.blue + '44', 2);

                            // Advance
                            t += 0.003;
                            if (t > 1) t = 0;

                            // Draw traced portion
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var steps = Math.floor(t * 300);
                            for (var j = 0; j <= steps; j++) {
                                var angle = 2 * Math.PI * j / 300;
                                var x = R * Math.cos(angle);
                                var y = R * Math.sin(angle);
                                var scr = viz.toScreen(x, y);
                                j === 0 ? ctx.moveTo(scr[0], scr[1]) : ctx.lineTo(scr[0], scr[1]);
                            }
                            ctx.stroke();

                            // Current point
                            var curAngle = 2 * Math.PI * t;
                            var cx = R * Math.cos(curAngle);
                            var cy = R * Math.sin(curAngle);
                            viz.drawPoint(cx, cy, viz.colors.white, null, 5);

                            // Mark center
                            viz.drawPoint(0, 0, viz.colors.red, 'z\u2080', 4);

                            // Show f(z) = z^n value as vector at current point
                            // z = R*e^(it), z^n = R^n * e^(int)
                            var fMag = Math.pow(R, nVal);
                            var fAngle = nVal * curAngle;
                            if (isFinite(fMag) && fMag < 100) {
                                var sc = Math.min(0.3, 0.3 / Math.max(1, fMag));
                                var fx = fMag * Math.cos(fAngle) * sc;
                                var fy = fMag * Math.sin(fAngle) * sc;
                                viz.drawVector(cx, cy, cx + fx, cy + fy, viz.colors.orange);
                            }

                            // Compute integral numerically
                            var intRe = 0, intIm = 0;
                            var N = Math.max(1, Math.floor(t * 1000));
                            var ds = t / N;
                            for (var k = 0; k < N; k++) {
                                var a1 = 2 * Math.PI * k * ds;
                                var a2 = 2 * Math.PI * (k + 1) * ds;
                                var z1x = R * Math.cos(a1), z1y = R * Math.sin(a1);
                                var z2x = R * Math.cos(a2), z2y = R * Math.sin(a2);
                                var dzRe = z2x - z1x, dzIm = z2y - z1y;
                                var mx = (z1x + z2x) / 2, my = (z1y + z2y) / 2;
                                // z^n where z = mx + i*my
                                var zr = mx, zi = my;
                                var pr = 1, pi = 0;
                                if (nVal >= 0) {
                                    for (var m = 0; m < nVal; m++) {
                                        var nr = pr * zr - pi * zi;
                                        var ni = pr * zi + pi * zr;
                                        pr = nr; pi = ni;
                                    }
                                } else {
                                    // z^(-|n|) = 1/z^|n|
                                    for (var m = 0; m < -nVal; m++) {
                                        var nr = pr * zr - pi * zi;
                                        var ni = pr * zi + pi * zr;
                                        pr = nr; pi = ni;
                                    }
                                    var mag2 = pr * pr + pi * pi;
                                    if (mag2 > 1e-20) { pr = pr / mag2; pi = -pi / mag2; }
                                }
                                intRe += pr * dzRe - pi * dzIm;
                                intIm += pr * dzIm + pi * dzRe;
                            }

                            // Display
                            var signI = intIm >= 0 ? '+' : '-';
                            viz.screenText('n = ' + nVal, 10, 20, viz.colors.white, 16, 'left');
                            viz.screenText('\u222B z\u207F dz = ' + intRe.toFixed(3) + ' ' + signI + ' ' + Math.abs(intIm).toFixed(3) + 'i',
                                viz.width / 2, 20, viz.colors.teal, 14);

                            var expected = (nVal === -1) ? '2\u03C0i \u2248 6.283i' : '0';
                            viz.screenText('Expected: ' + expected, viz.width / 2, 40, viz.colors.text, 12);

                            if (nVal === -1) {
                                viz.screenText('n = -1: The special case!', viz.width / 2, viz.height - 15, viz.colors.orange, 13);
                            } else {
                                viz.screenText('n \u2260 -1: Antiderivative exists, integral = 0', viz.width / 2, viz.height - 15, viz.colors.text, 12);
                            }
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\oint_{|z|=2} \\frac{dz}{z}\\) and \\(\\oint_{|z|=2} \\frac{dz}{z^2}\\).',
                    hint: 'These are the cases \\(n = -1\\) and \\(n = -2\\) of Theorem 4.7 (with \\(z_0 = 0\\)).',
                    solution: 'By Theorem 4.7: \\(\\oint_{|z|=2} z^{-1}\\,dz = 2\\pi i\\) and \\(\\oint_{|z|=2} z^{-2}\\,dz = 0\\).'
                },
                {
                    question: 'Compute \\(\\oint_{|z-1|=1} \\frac{dz}{z-1}\\).',
                    hint: 'This is the case \\(n = -1\\) of Theorem 4.7 with \\(z_0 = 1\\) and \\(R = 1\\).',
                    solution: 'Since the contour is the circle \\(|z-1| = 1\\) centered at \\(z_0 = 1\\), by Theorem 4.7 with \\(n = -1\\): \\(\\oint_{|z-1|=1} \\frac{dz}{z-1} = 2\\pi i\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Cauchy's Theorem
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Bridge to Cauchy's Theorem</h2>

<p>This chapter has established the mechanics of complex integration: how to parameterize contours, compute integrals, estimate their size, and use antiderivatives. We now have two fundamental results to reflect on:</p>

<ol>
    <li>If \\(f\\) has an antiderivative, then \\(\\oint_\\gamma f(z)\\,dz = 0\\) for every closed contour.</li>
    <li>The function \\(1/z\\), which does not have a single-valued antiderivative on the punctured plane, gives \\(\\oint_{|z|=1} \\frac{dz}{z} = 2\\pi i\\).</li>
</ol>

<h3>What Comes Next</h3>

<p>Cauchy's theorem (Chapter 5) is the grand generalization of observation (1). It says:</p>

<div class="env-block theorem">
    <div class="env-title">Preview: Cauchy's Theorem</div>
    <div class="env-body">
        <p>If \\(f\\) is analytic on a simply connected domain \\(D\\), then for every closed contour \\(\\gamma\\) in \\(D\\):</p>
        \\[\\oint_\\gamma f(z)\\,dz = 0.\\]
    </div>
</div>

<p>The key hypothesis is <strong>simply connected</strong>: the domain has no "holes." The punctured plane \\(\\mathbb{C} \\setminus \\{0\\}\\) is not simply connected (it has a hole at the origin), which is why \\(\\oint 1/z\\,dz \\neq 0\\).</p>

<p>From Cauchy's theorem flows Cauchy's integral formula (Chapter 6): the remarkable fact that the value of an analytic function at any interior point is completely determined by its values on the boundary. This leads to:</p>
<ul>
    <li>Analytic functions are infinitely differentiable</li>
    <li>Liouville's theorem: bounded entire functions are constant</li>
    <li>The fundamental theorem of algebra</li>
    <li>Power series representations (Taylor and Laurent)</li>
    <li>The residue theorem and its applications to definite integrals</li>
</ul>

<h3>Contour Deformation</h3>

<p>One of the most powerful ideas in complex analysis is <strong>contour deformation</strong>: if \\(f\\) is analytic in a region between two contours, then the integrals along the two contours are equal. Intuitively, you can "push" the contour continuously without changing the integral, as long as you do not cross a singularity.</p>

<div class="env-block example">
    <div class="env-title">Example: Deforming Around a Singularity</div>
    <div class="env-body">
        <p>Consider \\(f(z) = 1/z\\) and a large circle \\(|z| = R\\) around the origin. We can deform this to any other simple closed curve around the origin, and the integral remains \\(2\\pi i\\). The integral "sees" only the topology: does the curve wind around the singularity or not?</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-deformation"></div>
`,
            visualizations: [
                {
                    id: 'viz-deformation',
                    title: 'Contour Deformation',
                    description: 'Watch a contour smoothly deform while the integral of \\(1/z\\) stays constant at \\(2\\pi i\\). The integral only changes when the contour crosses a singularity.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380,
                            scale: 45
                        });

                        var morphT = 0;
                        var autoMorph = true;

                        VizEngine.createSlider(controls, 'Deform', 0, 1, 0, 0.01, function(v) {
                            morphT = v;
                            autoMorph = false;
                        });

                        VizEngine.createButton(controls, 'Animate', function() {
                            autoMorph = true;
                            morphT = 0;
                        });

                        function circlePoint(angle, r) {
                            return [r * Math.cos(angle), r * Math.sin(angle)];
                        }

                        // Shape 1: circle radius 1.5
                        // Shape 2: wobbly shape radius ~2
                        // Shape 3: ellipse
                        function getContourPoint(s, morph) {
                            var angle = 2 * Math.PI * s;
                            // Circle
                            var cx = 1.5 * Math.cos(angle);
                            var cy = 1.5 * Math.sin(angle);
                            // Wobbly
                            var wr = 1.5 + 0.8 * Math.sin(3 * angle) + 0.4 * Math.cos(5 * angle);
                            var wx = wr * Math.cos(angle);
                            var wy = wr * Math.sin(angle);

                            return [
                                cx + morph * (wx - cx),
                                cy + morph * (wy - cy)
                            ];
                        }

                        viz.animate(function(time) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            if (autoMorph) {
                                morphT = 0.5 + 0.5 * Math.sin(time * 0.001);
                            }

                            // Mark origin
                            viz.drawPoint(0, 0, viz.colors.red, '0', 5);

                            // Draw contour
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 300; i++) {
                                var s = i / 300;
                                var pt = getContourPoint(s, morphT);
                                var scr = viz.toScreen(pt[0], pt[1]);
                                i === 0 ? ctx.moveTo(scr[0], scr[1]) : ctx.lineTo(scr[0], scr[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();

                            // Fill interior lightly
                            ctx.fillStyle = viz.colors.blue + '11';
                            ctx.fill();

                            // Direction arrow at top
                            var topPt = getContourPoint(0.25, morphT);
                            var topPt2 = getContourPoint(0.255, morphT);
                            var dx = topPt2[0] - topPt[0], dy = topPt2[1] - topPt[1];
                            var sa = viz.toScreen(topPt[0], topPt[1]);
                            var ang = Math.atan2(-dy, dx);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(sa[0] + 8 * Math.cos(-ang), sa[1] + 8 * Math.sin(-ang));
                            ctx.lineTo(sa[0] - 6 * Math.cos(-ang - 0.5), sa[1] - 6 * Math.sin(-ang - 0.5));
                            ctx.lineTo(sa[0] - 6 * Math.cos(-ang + 0.5), sa[1] - 6 * Math.sin(-ang + 0.5));
                            ctx.closePath();
                            ctx.fill();

                            // Compute integral numerically
                            var intRe = 0, intIm = 0;
                            var N = 1000;
                            for (var k = 0; k < N; k++) {
                                var s1 = k / N, s2 = (k + 1) / N;
                                var p1 = getContourPoint(s1, morphT);
                                var p2 = getContourPoint(s2, morphT);
                                var dzRe = p2[0] - p1[0], dzIm = p2[1] - p1[1];
                                var mx = (p1[0] + p2[0]) / 2;
                                var my = (p1[1] + p2[1]) / 2;
                                var r2 = mx * mx + my * my;
                                if (r2 < 1e-10) continue;
                                var fRe = mx / r2, fIm = -my / r2;
                                intRe += fRe * dzRe - fIm * dzIm;
                                intIm += fRe * dzIm + fIm * dzRe;
                            }

                            // Display
                            viz.screenText('\u222E 1/z dz = ' + intRe.toFixed(3) + ' + ' + intIm.toFixed(3) + 'i',
                                viz.width / 2, 20, viz.colors.teal, 14);
                            viz.screenText('Always 2\u03C0i \u2248 6.283i as long as contour encloses 0',
                                viz.width / 2, 40, viz.colors.text, 11);

                            viz.screenText('Deformation: ' + (morphT * 100).toFixed(0) + '%',
                                viz.width - 10, viz.height - 15, viz.colors.text, 11, 'right');
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(\\gamma\\) be a simple closed contour enclosing both \\(0\\) and \\(1\\). Find \\(\\oint_\\gamma \\left(\\frac{1}{z} + \\frac{1}{z-1}\\right)\\,dz\\).',
                    hint: 'Use linearity and the fact that each term integrates to \\(2\\pi i\\) around a contour enclosing its singularity.',
                    solution: 'By linearity, \\(\\oint_\\gamma \\frac{dz}{z} + \\oint_\\gamma \\frac{dz}{z-1} = 2\\pi i + 2\\pi i = 4\\pi i\\).'
                },
                {
                    question: 'Why does \\(\\oint_{|z|=2} \\frac{dz}{z-5} = 0\\)?',
                    hint: 'Where is the singularity relative to the contour? Does \\(1/(z-5)\\) have an antiderivative on the region enclosed by \\(|z|=2\\)?',
                    solution: 'The singularity of \\(1/(z-5)\\) is at \\(z = 5\\), which lies outside \\(|z| = 2\\). On the disk \\(|z| < 3\\), \\(1/(z-5)\\) is analytic, so it has an antiderivative there (a branch of \\(\\log(z-5)\\) is single-valued since the disk is simply connected and does not contain 5). By the fundamental theorem, the closed contour integral is 0.'
                },
                {
                    question: 'Explain intuitively why contour deformation preserves the integral of an analytic function.',
                    hint: 'Think of Green\'s theorem / Stokes\' theorem. The integral over the boundary of a region where \\(f\\) is analytic is zero.',
                    solution: 'If \\(f\\) is analytic between two contours \\(\\gamma_1\\) and \\(\\gamma_2\\), then the integral over the boundary of the region between them is 0 (by Cauchy\'s theorem applied to this annular region). The boundary consists of \\(\\gamma_2\\) (positive) and \\(-\\gamma_1\\) (negative), so \\(\\int_{\\gamma_2} f\\,dz - \\int_{\\gamma_1} f\\,dz = 0\\), i.e., the integrals are equal.'
                }
            ]
        }
    ]
});
