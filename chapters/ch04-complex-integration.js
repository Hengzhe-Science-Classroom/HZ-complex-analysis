window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'Complex Integration',
    subtitle: 'Integrating along curves in the complex plane',
    sections: [

        // ================================================================
        // SECTION 1: Why Contour Integrals?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Contour Integrals?',
            content: `
<h2>Why Contour Integrals?</h2>

<div class="env-block intuition">
    <div class="env-title">The Core Shift</div>
    <div class="env-body">
        <p>In real analysis, you integrate a function over an <em>interval</em> \\([a, b]\\) on the number line. In complex analysis, you integrate over a <em>curve</em> in the plane. This is not a trivial generalization: it unleashes an entirely new set of tools, from residue calculus to Fourier inversion, that are unavailable on the real line alone.</p>
    </div>
</div>

<p>Let us first recall the real situation. For a continuous function \\(f: [a,b] \\to \\mathbb{R}\\), the Riemann integral
\\[\\int_a^b f(x)\\, dx\\]
sums up infinitesimal contributions \\(f(x)\\, dx\\) as \\(x\\) moves from \\(a\\) to \\(b\\) along the <em>unique</em> path between two real numbers.</p>

<p>In the complex plane \\(\\mathbb{C}\\), the situation is richer. Given two points \\(z_0\\) and \\(z_1\\), there are <strong>infinitely many curves</strong> connecting them. A contour integral integrates \\(f(z)\\, dz\\) along a chosen curve \\(\\gamma\\). The value may depend on which curve you pick &mdash; or it may not, depending on the function. This dependence (or independence) on path is one of the deepest facts in the subject.</p>

<h3>What Makes This Powerful?</h3>

<p>Contour integration unlocks several major tools:</p>
<ul>
    <li><strong>Cauchy's theorem</strong> (Ch. 5): if \\(f\\) is analytic inside a closed curve, the integral around it is zero.</li>
    <li><strong>Cauchy's integral formula</strong>: the value of an analytic function at any interior point is determined by its values on the boundary.</li>
    <li><strong>Residue theorem</strong>: complicated real integrals (including Fourier and Laplace transforms) become algebraic computations via singularities.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">A Taste of the Payoff</div>
    <div class="env-body">
        <p>The seemingly uncomputable real integral
        \\[\\int_{-\\infty}^{\\infty} \\frac{dx}{1 + x^2} = \\pi\\]
        follows immediately from contour integration in two lines, once you know the residue theorem. This chapter builds the foundation you need.</p>
    </div>
</div>

<h3>The Plan</h3>

<p>We proceed in logical order:</p>
<ol>
    <li>Define what a contour is (curves in \\(\\mathbb{C}\\)).</li>
    <li>Define the integral \\(\\int_\\gamma f(z)\\,dz\\) and show how to compute it.</li>
    <li>Establish key properties: linearity, reversal, and the ML inequality.</li>
    <li>Study antiderivatives and path independence.</li>
    <li>Work through the two key examples that underpin everything.</li>
    <li>Preview Cauchy's theorem.</li>
</ol>
`,
            visualizations: [
                {
                    id: 'viz-contour-integral',
                    title: 'Contour Integration: Accumulation along a Curve',
                    description: 'A point traces a contour \\(\\gamma\\) in the complex plane. At each position z, the function value f(z) is shown as an arrow. Watch the real and imaginary parts of the accumulated integral grow.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 70, originX: 200, originY: 200 });

                        var running = true;
                        var tVal = 0;
                        var speed = 0.4;
                        var contourType = 0; // 0=circle, 1=line, 2=figure-eight

                        VizEngine.createSlider(controls, 'Speed', 0.1, 1.5, speed, 0.1, function(v) { speed = v; });

                        var btnLabel = ['Circle', 'Line Segment', 'Semicircle'];
                        var typeBtn = VizEngine.createButton(controls, 'Contour: Circle', function() {
                            contourType = (contourType + 1) % 3;
                            typeBtn.textContent = 'Contour: ' + btnLabel[contourType];
                            tVal = 0;
                        });

                        VizEngine.createButton(controls, 'Reset', function() { tVal = 0; });

                        // Contours: return {z, dz_dt} at parameter t in [0,1]
                        function getContour(type, t) {
                            if (type === 0) { // unit circle
                                var theta = 2 * Math.PI * t;
                                return { re: Math.cos(theta), im: Math.sin(theta),
                                         dre: -2*Math.PI*Math.sin(theta), dim: 2*Math.PI*Math.cos(theta) };
                            } else if (type === 1) { // line from -1 to 1+i
                                return { re: -1 + 2*t, im: t,
                                         dre: 2, dim: 1 };
                            } else { // semicircle from -1 to 1 via upper half
                                var phi = Math.PI * t;
                                return { re: Math.cos(phi), im: Math.sin(phi),
                                         dre: -Math.PI*Math.sin(phi), dim: Math.PI*Math.cos(phi) };
                            }
                        }

                        // f(z) = z^2 (simple analytic function)
                        function f(re, im) {
                            return { re: re*re - im*im, im: 2*re*im };
                        }

                        // Numerically integrate up to parameter t0
                        function integrate(type, t0, steps) {
                            var dt = t0 / steps;
                            var sumRe = 0, sumIm = 0;
                            for (var k = 0; k < steps; k++) {
                                var tc = (k + 0.5) * dt;
                                var c = getContour(type, tc);
                                var fv = f(c.re, c.im);
                                // f(z) dz: (fRe + i fIm)(dRe + i dIm) dt
                                sumRe += (fv.re * c.dre - fv.im * c.dim) * dt;
                                sumIm += (fv.re * c.dim + fv.im * c.dre) * dt;
                            }
                            return { re: sumRe, im: sumIm };
                        }

                        var lastT = 0;
                        viz.animate(function(timestamp) {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Axis labels
                            viz.screenText('Re', viz.width - 18, viz.originY + 14, viz.colors.text, 11);
                            viz.screenText('Im', viz.originX + 10, 12, viz.colors.text, 11);

                            tVal = (tVal + speed * 0.004) % 1;

                            // Draw full contour faintly
                            var nSteps = 120;
                            viz.ctx.strokeStyle = viz.colors.grid;
                            viz.ctx.lineWidth = 1.5;
                            viz.ctx.beginPath();
                            for (var k = 0; k <= nSteps; k++) {
                                var c = getContour(contourType, k / nSteps);
                                var sc = viz.toScreen(c.re, c.im);
                                k === 0 ? viz.ctx.moveTo(sc[0], sc[1]) : viz.ctx.lineTo(sc[0], sc[1]);
                            }
                            viz.ctx.stroke();

                            // Draw traversed portion
                            viz.ctx.strokeStyle = viz.colors.blue;
                            viz.ctx.lineWidth = 2.5;
                            viz.ctx.beginPath();
                            var nTraced = Math.floor(tVal * nSteps);
                            for (var k = 0; k <= nTraced; k++) {
                                var c = getContour(contourType, k / nSteps);
                                var sc = viz.toScreen(c.re, c.im);
                                k === 0 ? viz.ctx.moveTo(sc[0], sc[1]) : viz.ctx.lineTo(sc[0], sc[1]);
                            }
                            viz.ctx.stroke();

                            // Current point
                            var cur = getContour(contourType, tVal);
                            viz.drawPoint(cur.re, cur.im, viz.colors.yellow, null, 6);

                            // f(z) arrow at current point
                            var fv = f(cur.re, cur.im);
                            var scale = 0.25;
                            viz.drawVector(cur.re, cur.im, cur.re + fv.re * scale, cur.im + fv.im * scale, viz.colors.orange, 'f(z)', 2);

                            // Accumulated integral
                            var intVal = integrate(contourType, tVal, 80);

                            // Readout panel on right
                            var px = viz.width - 155, py = 30;
                            viz.ctx.fillStyle = '#1a1a40cc';
                            viz.ctx.fillRect(px - 8, py - 8, 160, 120);
                            viz.screenText('Accumulated Integral', px + 72, py + 6, viz.colors.text, 11, 'center');
                            viz.screenText('Re \u222b f dz', px + 8, py + 30, viz.colors.blue, 12, 'left');
                            viz.screenText(intVal.re.toFixed(4), px + 100, py + 30, viz.colors.white, 12, 'right');
                            viz.screenText('Im \u222b f dz', px + 8, py + 50, viz.colors.teal, 12, 'left');
                            viz.screenText(intVal.im.toFixed(4), px + 100, py + 50, viz.colors.white, 12, 'right');
                            viz.screenText('t = ' + tVal.toFixed(3), px + 8, py + 75, viz.colors.text, 11, 'left');
                            viz.screenText('f(z) = z\u00B2', px + 8, py + 95, viz.colors.orange, 11, 'left');

                            // Label contour
                            var labelC = getContour(contourType, 0.5);
                            var contourNames = ['\u03b3: unit circle', '\u03b3: line segment', '\u03b3: semicircle'];
                            viz.drawText(contourNames[contourType], labelC.re + 0.1, labelC.im + 0.2, viz.colors.blue, 12);

                            return viz;
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain in your own words: why does integrating a complex function over a <em>curve</em> yield more information than integrating a real function over an interval?',
                    hint: 'Think about what choices you have in each setting, and what happens when the function has singularities.',
                    solution: 'Over a real interval, there is only one path from \\(a\\) to \\(b\\). In the complex plane, infinitely many curves connect two points. The integral can depend on which curve is chosen, especially when the function has singularities inside a closed loop. This path-dependence (or independence) encodes deep information about the analytic structure of the function.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Contours and Curves
        // ================================================================
        {
            id: 'sec-contours',
            title: 'Contours and Curves',
            content: `
<h2>Contours and Curves</h2>

<div class="env-block definition">
    <div class="env-title">Definition 4.1 (Smooth Curve)</div>
    <div class="env-body">
        <p>A <strong>smooth curve</strong> in \\(\\mathbb{C}\\) is a function \\(z: [a, b] \\to \\mathbb{C}\\) of the form \\(z(t) = x(t) + iy(t)\\) where \\(x, y: [a, b] \\to \\mathbb{R}\\) are continuously differentiable and \\(z'(t) \\neq 0\\) for all \\(t \\in [a, b]\\). The curve is <strong>closed</strong> if \\(z(a) = z(b)\\), and <strong>simple</strong> (Jordan) if it does not cross itself.</p>
    </div>
</div>

<p>The condition \\(z'(t) \\neq 0\\) ensures the curve has a well-defined tangent direction everywhere, so we can speak of the "direction of travel" at each point. It also prevents the parameterization from "stopping and restarting."</p>

<div class="env-block definition">
    <div class="env-title">Definition 4.2 (Piecewise Smooth Curve / Contour)</div>
    <div class="env-body">
        <p>A <strong>contour</strong> \\(\\gamma\\) is a curve that can be decomposed into finitely many smooth pieces \\(\\gamma_1, \\gamma_2, \\ldots, \\gamma_n\\) where the endpoint of each piece is the start of the next. We write \\(\\gamma = \\gamma_1 + \\gamma_2 + \\cdots + \\gamma_n\\).</p>
    </div>
</div>

<p>Contours are the natural domain for integration because they allow corners (where the derivative changes direction) while remaining integrable.</p>

<h3>The Role of Orientation</h3>

<p>A curve carries an <strong>orientation</strong>: the direction it is traversed. If \\(\\gamma\\) goes from \\(z_0\\) to \\(z_1\\), then \\(-\\gamma\\) denotes the same set of points traversed in the opposite direction (from \\(z_1\\) to \\(z_0\\)). For closed curves, the standard orientation is <strong>counterclockwise</strong> (positive orientation), consistent with the boundary orientation of a simply connected domain.</p>

<h3>Key Examples</h3>

<div class="env-block example">
    <div class="env-title">Example: Line Segment</div>
    <div class="env-body">
        <p>The line segment from \\(z_0\\) to \\(z_1\\) is parameterized by
        \\[z(t) = (1 - t)z_0 + t z_1, \\quad t \\in [0, 1].\\]
        Here \\(z'(t) = z_1 - z_0\\), which is constant and nonzero (assuming \\(z_0 \\neq z_1\\)).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Circle</div>
    <div class="env-body">
        <p>The circle of radius \\(r\\) centered at \\(z_0\\), traversed counterclockwise, is
        \\[z(t) = z_0 + r e^{it} = z_0 + r\\cos t + ir\\sin t, \\quad t \\in [0, 2\\pi].\\]
        Then \\(z'(t) = ire^{it}\\), which has modulus \\(r > 0\\) everywhere.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 4.3 (Arc Length)</div>
    <div class="env-body">
        <p>The <strong>length</strong> of a smooth curve \\(z: [a,b] \\to \\mathbb{C}\\) is
        \\[L(\\gamma) = \\int_a^b |z'(t)|\\, dt.\\]
        For a circle of radius \\(r\\), \\(|z'(t)| = r\\) and \\(L = 2\\pi r\\), as expected.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Parameterization Independence</div>
    <div class="env-body">
        <p>The integral \\(\\int_\\gamma f(z)\\,dz\\) (defined in the next section) does <em>not</em> depend on the choice of parameterization of \\(\\gamma\\), as long as the orientation is preserved. This is the complex analogue of the substitution rule for real integrals.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-parameterization',
                    title: 'Parameterization of Contours',
                    description: 'Select a contour type and watch z(t) trace it. The speed |z\'(t)| is shown as a color intensity: brighter means faster. The arc length accumulates on the right.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 70, originX: 200, originY: 200 });

                        var contourType = 0;
                        var tMax = 0;
                        var animating = true;

                        var names = ['Line Segment', 'Unit Circle', 'Semicircle'];
                        var typeBtn = VizEngine.createButton(controls, 'Shape: ' + names[0], function() {
                            contourType = (contourType + 1) % 3;
                            typeBtn.textContent = 'Shape: ' + names[contourType];
                            tMax = 0;
                        });
                        VizEngine.createButton(controls, 'Reset', function() { tMax = 0; });

                        function getContour(type, t) {
                            if (type === 0) { // line segment from -1 to 1+i
                                return { re: -1 + 2*t, im: t, dre: 2, dim: 1 };
                            } else if (type === 1) { // circle
                                var theta = 2*Math.PI*t;
                                return { re: Math.cos(theta), im: Math.sin(theta),
                                         dre: -2*Math.PI*Math.sin(theta), dim: 2*Math.PI*Math.cos(theta) };
                            } else { // semicircle upper
                                var phi = Math.PI*t;
                                return { re: Math.cos(phi), im: Math.sin(phi),
                                         dre: -Math.PI*Math.sin(phi), dim: Math.PI*Math.cos(phi) };
                            }
                        }

                        function getTRange(type) { return 1.0; }

                        viz.animate(function(ts) {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            viz.screenText('Re', viz.width - 18, viz.originY + 14, viz.colors.text, 11);
                            viz.screenText('Im', viz.originX + 10, 12, viz.colors.text, 11);

                            var tRange = getTRange(contourType);
                            tMax = Math.min(tMax + 0.006, tRange);

                            // Draw full contour faint
                            viz.ctx.strokeStyle = viz.colors.grid;
                            viz.ctx.lineWidth = 1.5;
                            viz.ctx.beginPath();
                            for (var k = 0; k <= 100; k++) {
                                var c = getContour(contourType, k / 100 * tRange);
                                var sc = viz.toScreen(c.re, c.im);
                                k === 0 ? viz.ctx.moveTo(sc[0], sc[1]) : viz.ctx.lineTo(sc[0], sc[1]);
                            }
                            viz.ctx.stroke();

                            // Draw traced portion with speed-colored segments
                            var nDraw = 200;
                            for (var k = 0; k < nDraw; k++) {
                                var t1 = (k / nDraw) * tMax;
                                var t2 = ((k + 1) / nDraw) * tMax;
                                if (t2 > tMax) break;
                                var c1 = getContour(contourType, t1);
                                var c2 = getContour(contourType, t2);
                                var speed = Math.sqrt(c1.dre*c1.dre + c1.dim*c1.dim);
                                var maxSpeed = contourType === 0 ? 2.5 : contourType === 1 ? 7 : 3.5;
                                var bright = Math.min(1, speed / maxSpeed);
                                viz.ctx.strokeStyle = 'hsl(' + Math.round(180 + bright*60) + ',80%,' + Math.round(40 + bright*30) + '%)';
                                viz.ctx.lineWidth = 2.5;
                                viz.ctx.beginPath();
                                var sc1 = viz.toScreen(c1.re, c1.im);
                                var sc2 = viz.toScreen(c2.re, c2.im);
                                viz.ctx.moveTo(sc1[0], sc1[1]);
                                viz.ctx.lineTo(sc2[0], sc2[1]);
                                viz.ctx.stroke();
                            }

                            // Current point
                            var cur = getContour(contourType, tMax);
                            var tangMag = Math.sqrt(cur.dre*cur.dre + cur.dim*cur.dim);
                            viz.drawPoint(cur.re, cur.im, viz.colors.yellow, 'z(t)', 6);

                            // Tangent arrow
                            if (tangMag > 0.01) {
                                var tScale = 0.25;
                                viz.drawVector(cur.re, cur.im, cur.re + cur.dre/tangMag*tScale, cur.im + cur.dim/tangMag*tScale, viz.colors.orange, "z'", 2);
                            }

                            // Arc length
                            var arcLen = 0;
                            var nArc = 200;
                            for (var k = 0; k < nArc; k++) {
                                var tc = (k / nArc) * tMax;
                                var c = getContour(contourType, tc);
                                arcLen += Math.sqrt(c.dre*c.dre + c.dim*c.dim) * (tMax / nArc);
                            }

                            // Info panel
                            var px = viz.width - 165, py = 20;
                            viz.ctx.fillStyle = '#1a1a40cc';
                            viz.ctx.fillRect(px - 8, py - 8, 165, 115);
                            viz.screenText('Current position', px + 72, py + 6, viz.colors.text, 11, 'center');
                            viz.screenText('Re z(t) = ' + cur.re.toFixed(3), px + 8, py + 28, viz.colors.blue, 11, 'left');
                            viz.screenText('Im z(t) = ' + cur.im.toFixed(3), px + 8, py + 46, viz.colors.teal, 11, 'left');
                            viz.screenText("|z'(t)| = " + tangMag.toFixed(3), px + 8, py + 64, viz.colors.orange, 11, 'left');
                            viz.screenText('Arc length = ' + arcLen.toFixed(3), px + 8, py + 82, viz.colors.green, 11, 'left');
                            viz.screenText('t = ' + tMax.toFixed(3) + ' / ' + tRange.toFixed(1), px + 8, py + 100, viz.colors.text, 10, 'left');

                            if (tMax >= tRange - 0.001) tMax = 0; // loop
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Parameterize the line segment from \\(z_0 = 1 + i\\) to \\(z_1 = 3 - 2i\\). What is \\(z\'(t)\\)? What is the arc length?',
                    hint: 'Use the standard linear parameterization \\(z(t) = (1-t)z_0 + tz_1\\) for \\(t \\in [0,1]\\).',
                    solution: '\\(z(t) = (1+i)(1-t) + (3-2i)t = 1+i + (2-3i)t\\). So \\(z\'(t) = 2-3i\\). The arc length is \\(\\int_0^1 |z\'(t)|\\,dt = |2-3i| = \\sqrt{4+9} = \\sqrt{13}\\).'
                },
                {
                    question: 'Write down a parameterization for the circle of radius 2 centered at \\(1 + i\\), traversed counterclockwise. Verify that \\(|z\'(t)|\\) equals the expected constant.',
                    hint: 'Start from the standard circle parameterization and translate the center.',
                    solution: '\\(z(t) = (1+i) + 2e^{it}\\) for \\(t \\in [0, 2\\pi]\\). Then \\(z\'(t) = 2ie^{it}\\), so \\(|z\'(t)| = 2\\). The arc length is \\(\\int_0^{2\\pi} 2\\,dt = 4\\pi\\), which is the circumference of a circle of radius 2, as expected.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Contour Integral
        // ================================================================
        {
            id: 'sec-definition',
            title: 'The Contour Integral',
            content: `
<h2>The Contour Integral</h2>

<div class="env-block definition">
    <div class="env-title">Definition 4.4 (Contour Integral)</div>
    <div class="env-body">
        <p>Let \\(\\gamma: [a, b] \\to \\mathbb{C}\\) be a smooth contour and let \\(f\\) be continuous on \\(\\gamma\\). The <strong>contour integral</strong> of \\(f\\) along \\(\\gamma\\) is
        \\[\\int_\\gamma f(z)\\, dz = \\int_a^b f(z(t))\\, z'(t)\\, dt.\\]
        For a piecewise smooth contour \\(\\gamma = \\gamma_1 + \\cdots + \\gamma_n\\), the integral is the sum of the integrals over each smooth piece.</p>
    </div>
</div>

<p>This definition reduces the complex integral to an ordinary real integral. Since \\(f(z(t))\\) and \\(z'(t)\\) are both complex-valued functions of the real variable \\(t\\), the product \\(f(z(t))z'(t)\\) is complex-valued, and we integrate its real and imaginary parts separately.</p>

<h3>Expanding the Definition</h3>

<p>Write \\(f(z) = u(x,y) + iv(x,y)\\) and \\(dz = dx + i\\,dy\\). Then formally,
\\[\\int_\\gamma f(z)\\,dz = \\int_\\gamma (u + iv)(dx + i\\,dy) = \\int_\\gamma (u\\,dx - v\\,dy) + i\\int_\\gamma (v\\,dx + u\\,dy).\\]
This shows that one contour integral is equivalent to two real line integrals of the type studied in multivariable calculus.</p>

<div class="env-block example">
    <div class="env-title">Example 4.1: Integral of \\(f(z) = z\\) along a Line Segment</div>
    <div class="env-body">
        <p>Integrate \\(f(z) = z\\) along \\(\\gamma\\): the line segment from \\(0\\) to \\(1 + i\\).</p>
        <p><strong>Parameterize:</strong> \\(z(t) = (1+i)t\\) for \\(t \\in [0,1]\\), so \\(z'(t) = 1+i\\).</p>
        <p><strong>Compute:</strong>
        \\[\\int_\\gamma z\\,dz = \\int_0^1 (1+i)t \\cdot (1+i)\\,dt = (1+i)^2 \\int_0^1 t\\,dt = 2i \\cdot \\frac{1}{2} = i.\\]</p>
        <p><strong>Check by antiderivative:</strong> An antiderivative of \\(z\\) is \\(F(z) = z^2/2\\). The fundamental theorem (Section 4.5) gives \\(F(1+i) - F(0) = \\frac{(1+i)^2}{2} = \\frac{2i}{2} = i\\). \\(\\checkmark\\)</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 4.2: Integral of \\(\\bar{z}\\) along the Same Segment</div>
    <div class="env-body">
        <p>Now integrate \\(f(z) = \\bar{z}\\) along the same path.</p>
        <p>\\(f(z(t)) = \\overline{(1+i)t} = (1-i)t\\), \\(z'(t) = 1+i\\).</p>
        <p>\\[\\int_\\gamma \\bar{z}\\,dz = \\int_0^1 (1-i)t(1+i)\\,dt = \\int_0^1 2t\\,dt = 1.\\]</p>
        <p>Note: \\(\\bar{z}\\) is not analytic, and indeed this result differs from what you would get along a different path from \\(0\\) to \\(1+i\\). Path independence fails.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Proposition 4.5 (Existence)</div>
    <div class="env-body">
        <p>If \\(f\\) is continuous on a smooth contour \\(\\gamma\\), then \\(\\int_\\gamma f(z)\\,dz\\) exists.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Compute \\(\\int_\\gamma z^2\\,dz\\) where \\(\\gamma\\) is the line segment from \\(0\\) to \\(2i\\).',
                    hint: 'Parameterize as \\(z(t) = 2it\\) for \\(t \\in [0,1]\\), so \\(z\'(t) = 2i\\).',
                    solution: '\\(z(t) = 2it\\), \\(z\'(t) = 2i\\). Then \\(z(t)^2 = -4t^2\\). So \\(\\int_0^1 (-4t^2)(2i)\\,dt = -8i\\int_0^1 t^2\\,dt = -8i/3\\).'
                },
                {
                    question: 'Compute \\(\\int_\\gamma \\text{Re}(z)\\,dz\\) where \\(\\gamma\\) is the unit circle traversed counterclockwise.',
                    hint: 'Use \\(z(t) = e^{it}\\) so \\(\\text{Re}(z(t)) = \\cos t\\) and \\(z\'(t) = ie^{it}\\).',
                    solution: '\\(\\int_0^{2\\pi} \\cos(t) \\cdot ie^{it}\\,dt = i\\int_0^{2\\pi}\\cos(t)(\\cos t + i\\sin t)\\,dt = i\\int_0^{2\\pi}\\cos^2 t\\,dt + i^2\\int_0^{2\\pi}\\cos t\\sin t\\,dt = i\\pi - 0 = i\\pi\\).'
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

<p>Contour integrals share the basic algebraic properties of real integrals, plus two properties that are special to the complex setting.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.6 (Basic Properties)</div>
    <div class="env-body">
        <p>Let \\(f, g\\) be continuous on a contour \\(\\gamma\\), and let \\(c \\in \\mathbb{C}\\). Then:</p>
        <ol>
            <li><strong>Linearity:</strong> \\(\\displaystyle\\int_\\gamma (cf + g)\\,dz = c\\int_\\gamma f\\,dz + \\int_\\gamma g\\,dz.\\)</li>
            <li><strong>Reversal:</strong> \\(\\displaystyle\\int_{-\\gamma} f\\,dz = -\\int_\\gamma f\\,dz.\\)</li>
            <li><strong>Concatenation:</strong> \\(\\displaystyle\\int_{\\gamma_1 + \\gamma_2} f\\,dz = \\int_{\\gamma_1} f\\,dz + \\int_{\\gamma_2} f\\,dz.\\)</li>
        </ol>
    </div>
</div>

<h3>The ML Inequality (Estimation Lemma)</h3>

<p>The most important <em>estimate</em> for contour integrals is the ML inequality. It provides an upper bound without requiring explicit computation, and it is indispensable in convergence arguments and in proving Cauchy's theorem.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.7 (ML Inequality)</div>
    <div class="env-body">
        <p>Let \\(f\\) be continuous on a contour \\(\\gamma\\) of length \\(L\\). Suppose \\(|f(z)| \\leq M\\) for all \\(z\\) on \\(\\gamma\\). Then
        \\[\\left|\\int_\\gamma f(z)\\,dz\\right| \\leq ML.\\]</p>
    </div>
</div>

<p><em>Proof sketch.</em> From the definition,
\\[\\left|\\int_\\gamma f(z)\\,dz\\right| = \\left|\\int_a^b f(z(t))z'(t)\\,dt\\right| \\leq \\int_a^b |f(z(t))||z'(t)|\\,dt \\leq M\\int_a^b |z'(t)|\\,dt = ML.\\]
The first inequality uses the modulus inequality \\(|\\int h| \\leq \\int |h|\\) for complex-valued integrals. \\(\\square\\)</p>

<div class="env-block example">
    <div class="env-title">Example 4.3: Using the ML Inequality</div>
    <div class="env-body">
        <p>Estimate \\(\\left|\\int_{\\gamma_R} \\frac{e^{iz}}{z}\\,dz\\right|\\) where \\(\\gamma_R\\) is the semicircle \\(|z| = R\\) in the upper half-plane.</p>
        <p>On \\(\\gamma_R\\), \\(|z| = R\\), so \\(|f(z)| = |e^{iz}|/R\\). For \\(z = Re^{i\\theta}\\) with \\(\\theta \\in [0, \\pi]\\), \\(|e^{iz}| = e^{-R\\sin\\theta} \\leq 1\\). Thus \\(M = 1/R\\). The length is \\(L = \\pi R\\). So \\(\\left|\\int_{\\gamma_R}\\right| \\leq \\pi\\). A sharper estimate using Jordan's lemma gives the bound \\(\\to 0\\) as \\(R \\to \\infty\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Why ML Is Useful</div>
    <div class="env-body">
        <p>In applications, we often need to show that an integral over a large arc vanishes as the radius \\(R \\to \\infty\\). If \\(|f(z)| \\leq C/R^\\alpha\\) for some \\(\\alpha > 1\\) on \\(|z| = R\\), then \\(ML \\leq (C/R^\\alpha)(2\\pi R) = 2\\pi C/R^{\\alpha-1} \\to 0\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-ml-inequality',
                    title: 'ML Inequality: Bounding Integrals',
                    description: 'The orange region shows M (maximum |f(z)| on the curve). The blue arc has length L. The product ML gives an upper bound for |integral|. Adjust the exponent n in f(z) = z^n to see how M and L interact.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 65, originX: 200, originY: 220 });

                        var nExp = 1;
                        var radius = 1.0;

                        VizEngine.createSlider(controls, 'Exponent n', -2, 3, nExp, 1, function(v) { nExp = Math.round(v); });
                        VizEngine.createSlider(controls, 'Radius r', 0.5, 2.0, radius, 0.1, function(v) { radius = v; });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            viz.screenText('Re', viz.width - 18, viz.originY + 14, viz.colors.text, 11);
                            viz.screenText('Im', viz.originX + 10, 12, viz.colors.text, 11);

                            var L = Math.PI * radius; // semicircle length
                            var M = 0;
                            var nSamp = 200;
                            var actualInt = { re: 0, im: 0 };

                            // Compute M and the actual integral
                            for (var k = 0; k <= nSamp; k++) {
                                var theta = Math.PI * k / nSamp;
                                var re = radius * Math.cos(theta);
                                var im = radius * Math.sin(theta);
                                var rn = Math.pow(radius, nExp);
                                // |z^n| = r^n
                                if (nExp !== 0 || radius > 0.01) {
                                    var mag = (nExp === 0) ? 1 : Math.pow(radius, Math.abs(nExp));
                                    if (nExp < 0) mag = 1 / Math.pow(radius, -nExp);
                                    else mag = Math.pow(radius, nExp);
                                    if (isFinite(mag)) M = Math.max(M, mag);
                                }
                            }

                            // Numerically integrate z^n dz over semicircle
                            for (var k = 0; k < nSamp; k++) {
                                var t1 = Math.PI * k / nSamp;
                                var t2 = Math.PI * (k + 1) / nSamp;
                                var tm = (t1 + t2) / 2;
                                var re = radius * Math.cos(tm);
                                var im = radius * Math.sin(tm);
                                // z^n
                                var r = radius;
                                var angle = nExp * tm;
                                var fn_re = Math.pow(r, nExp) * Math.cos(angle);
                                var fn_im = Math.pow(r, nExp) * Math.sin(angle);
                                if (!isFinite(fn_re) || !isFinite(fn_im)) continue;
                                // dz = i*r*e^{it} dt
                                var dz_re = -radius * Math.sin(tm) * (t2 - t1);
                                var dz_im = radius * Math.cos(tm) * (t2 - t1);
                                actualInt.re += fn_re * dz_re - fn_im * dz_im;
                                actualInt.im += fn_re * dz_im + fn_im * dz_re;
                            }

                            var bound = M * L;
                            var actual = Math.sqrt(actualInt.re*actualInt.re + actualInt.im*actualInt.im);

                            // Draw semicircle filled with M-shaded region
                            viz.ctx.fillStyle = viz.colors.orange + '22';
                            viz.ctx.beginPath();
                            viz.ctx.arc(viz.originX, viz.originY, radius * viz.scale, Math.PI, 0, false);
                            var [sx0] = viz.toScreen(-radius, 0);
                            var [sx1] = viz.toScreen(radius, 0);
                            viz.ctx.lineTo(sx1, viz.originY);
                            viz.ctx.lineTo(sx0, viz.originY);
                            viz.ctx.closePath();
                            viz.ctx.fill();

                            // Draw semicircle
                            viz.ctx.strokeStyle = viz.colors.blue;
                            viz.ctx.lineWidth = 3;
                            viz.ctx.beginPath();
                            viz.ctx.arc(viz.originX, viz.originY, radius * viz.scale, Math.PI, 0, false);
                            viz.ctx.stroke();

                            // Draw diameter
                            viz.drawSegment(-radius, 0, radius, 0, viz.colors.blue, 2, true);

                            // Annotations
                            viz.drawText('\u03b3 (semicircle)', 0, radius + 0.25, viz.colors.blue, 12);
                            viz.drawText('L = \u03c0r = ' + L.toFixed(2), 0, -0.35, viz.colors.text, 11);

                            // Info panel
                            var px = viz.width - 200, py = 20;
                            viz.ctx.fillStyle = '#1a1a40ee';
                            viz.ctx.fillRect(px - 8, py - 8, 200, 150);
                            viz.screenText('ML Inequality', px + 88, py + 8, viz.colors.white, 13, 'center');
                            viz.screenText('f(z) = z\u207F, n = ' + nExp, px + 8, py + 30, viz.colors.text, 11, 'left');
                            viz.screenText('r = ' + radius.toFixed(2), px + 8, py + 48, viz.colors.text, 11, 'left');
                            viz.screenText('M = max|f| = ' + M.toFixed(3), px + 8, py + 66, viz.colors.orange, 11, 'left');
                            viz.screenText('L = \u03c0r = ' + L.toFixed(3), px + 8, py + 84, viz.colors.blue, 11, 'left');
                            viz.screenText('Bound ML = ' + bound.toFixed(3), px + 8, py + 102, viz.colors.yellow, 12, 'left');
                            viz.screenText('|\u222b f dz| = ' + actual.toFixed(3), px + 8, py + 122, viz.colors.green, 12, 'left');
                            var ratio = bound > 0.001 ? (actual / bound * 100).toFixed(1) : '0';
                            viz.screenText('Tightness: ' + ratio + '%', px + 8, py + 140, viz.colors.text, 10, 'left');
                        }

                        draw();
                        document.addEventListener('input', draw); // React to slider changes
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the ML inequality to show that \\(\\left|\\int_\\gamma \\frac{1}{z^2+1}\\,dz\\right| \\leq \\frac{\\pi R}{R^2 - 1}\\) where \\(\\gamma\\) is the semicircle \\(|z| = R > 1\\) in the upper half-plane.',
                    hint: 'On \\(|z| = R\\), use the reverse triangle inequality to bound \\(|z^2 + 1| \\geq |z|^2 - 1 = R^2 - 1\\). The length of the semicircle is \\(\\pi R\\).',
                    solution: 'On \\(\\gamma\\), \\(|z^2 + 1| \\geq |z^2| - 1 = R^2 - 1 > 0\\). So \\(|f(z)| = |1/(z^2+1)| \\leq 1/(R^2-1) = M\\). The length \\(L = \\pi R\\). By ML: \\(|\\int_\\gamma f\\,dz| \\leq ML = \\pi R/(R^2-1)\\). As \\(R \\to \\infty\\), this \\(\\to 0\\).'
                },
                {
                    question: 'If \\(\\gamma\\) is any contour from \\(0\\) to \\(1\\) of length \\(L\\), and \\(|f(z)| \\leq 5\\) on \\(\\gamma\\), what is the best upper bound on \\(|\\int_\\gamma f\\,dz|\\) that the ML inequality gives?',
                    hint: 'Apply the theorem directly with \\(M = 5\\).',
                    solution: 'By the ML inequality, \\(|\\int_\\gamma f\\,dz| \\leq M \\cdot L = 5L\\). The bound depends on the length of the specific contour; shorter contours give tighter bounds.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Antiderivatives
        // ================================================================
        {
            id: 'sec-antiderivatives',
            title: 'Antiderivatives',
            content: `
<h2>Antiderivatives and Path Independence</h2>

<p>For real integrals, the fundamental theorem of calculus says: if \\(F' = f\\), then \\(\\int_a^b f = F(b) - F(a)\\). A perfect analogue holds for complex integrals, with an important twist: it implies path independence.</p>

<div class="env-block definition">
    <div class="env-title">Definition 4.8 (Antiderivative)</div>
    <div class="env-body">
        <p>A function \\(F\\) is an <strong>antiderivative</strong> of \\(f\\) on a domain \\(D\\) if \\(F\\) is analytic on \\(D\\) and \\(F'(z) = f(z)\\) for all \\(z \\in D\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.9 (Fundamental Theorem of Contour Integrals)</div>
    <div class="env-body">
        <p>Let \\(f\\) be continuous on a domain \\(D\\) and suppose \\(F\\) is an antiderivative of \\(f\\) on \\(D\\). Then for any contour \\(\\gamma\\) in \\(D\\) from \\(z_0\\) to \\(z_1\\),
        \\[\\int_\\gamma f(z)\\,dz = F(z_1) - F(z_0).\\]
        In particular, the integral depends only on the endpoints, not on the path.</p>
    </div>
</div>

<p><em>Proof.</em> Let \\(\\gamma: [a,b] \\to D\\). By the chain rule, \\(\\frac{d}{dt}F(z(t)) = F'(z(t))z'(t) = f(z(t))z'(t)\\). Integrating both sides:
\\[\\int_\\gamma f(z)\\,dz = \\int_a^b f(z(t))z'(t)\\,dt = \\int_a^b \\frac{d}{dt}F(z(t))\\,dt = F(z(b)) - F(z(a)) = F(z_1) - F(z_0). \\quad \\square\\]</p>

<div class="env-block corollary">
    <div class="env-title">Corollary 4.10</div>
    <div class="env-body">
        <p>If \\(f\\) has an antiderivative on \\(D\\), then \\(\\int_\\gamma f(z)\\,dz = 0\\) for every closed contour \\(\\gamma\\) in \\(D\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 4.4: Path Independence for \\(z^n\\)</div>
    <div class="env-body">
        <p>For any integer \\(n \\neq -1\\), the function \\(f(z) = z^n\\) has antiderivative \\(F(z) = z^{n+1}/(n+1)\\) on \\(\\mathbb{C} \\setminus \\{0\\}\\) (and on all of \\(\\mathbb{C}\\) for \\(n \\geq 0\\)). So
        \\[\\int_\\gamma z^n\\,dz = \\frac{z_1^{n+1}}{n+1} - \\frac{z_0^{n+1}}{n+1}\\]
        for any path from \\(z_0\\) to \\(z_1\\). For a <em>closed</em> path (\\(z_0 = z_1\\)), the integral is zero.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">When Does \\(f\\) Have an Antiderivative?</div>
    <div class="env-body">
        <p>Not every analytic function has an antiderivative on its domain. The function \\(f(z) = 1/z\\) is analytic on \\(\\mathbb{C} \\setminus \\{0\\}\\) but has no single-valued antiderivative there (its "antiderivative" \\(\\log z\\) is multi-valued). We will see in the next section that \\(\\int_{|z|=1} 1/z\\,dz = 2\\pi i \\neq 0\\), confirming that no antiderivative exists on this punctured domain.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-path-independence',
                    title: 'Path Independence vs. Path Dependence',
                    description: 'Two paths connect A to B. For f(z) = z (analytic, has antiderivative), both paths give the same integral. For f(z) = 1/z around the origin, the paths can give different results. Toggle the function and drag the paths.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 70, originX: 200, originY: 200 });

                        var funcType = 0; // 0 = z^2, 1 = 1/z
                        var funcNames = ['f(z) = z\u00B2 (analytic)', 'f(z) = 1/z (not analytic at 0)'];
                        var funcBtn = VizEngine.createButton(controls, funcNames[0], function() {
                            funcType = 1 - funcType;
                            funcBtn.textContent = funcNames[funcType];
                        });

                        // Points A and B
                        var A = { re: -1.2, im: -0.8 };
                        var B = { re: 1.2, im: 0.8 };

                        // Path 1: straight line
                        // Path 2: arc going around origin
                        function getPath(which, t) {
                            if (which === 0) { // straight line
                                return { re: A.re + (B.re - A.re)*t, im: A.im + (B.im - A.im)*t,
                                         dre: B.re - A.re, dim: B.im - A.im };
                            } else { // arc: go from A to B via upper half
                                // Parameterize as angle from A to B going through top
                                var rA = Math.sqrt(A.re*A.re + A.im*A.im);
                                var rB = Math.sqrt(B.re*B.re + B.im*B.im);
                                var thetaA = Math.atan2(A.im, A.re);
                                var thetaB = Math.atan2(B.im, B.re) + 2*Math.PI; // go counterclockwise
                                var theta = thetaA + (thetaB - thetaA)*t;
                                var r = rA + (rB - rA)*t;
                                var dtheta = thetaB - thetaA;
                                var dr = rB - rA;
                                return { re: r*Math.cos(theta), im: r*Math.sin(theta),
                                         dre: dr*Math.cos(theta) - r*dtheta*Math.sin(theta),
                                         dim: dr*Math.sin(theta) + r*dtheta*Math.cos(theta) };
                            }
                        }

                        function computeIntegral(pathIdx, fType) {
                            var nSteps = 500;
                            var re = 0, im = 0;
                            for (var k = 0; k < nSteps; k++) {
                                var t = (k + 0.5) / nSteps;
                                var p = getPath(pathIdx, t);
                                var dt = 1.0 / nSteps;
                                var fr, fi;
                                if (fType === 0) { // z^2
                                    fr = p.re*p.re - p.im*p.im;
                                    fi = 2*p.re*p.im;
                                } else { // 1/z
                                    var d = p.re*p.re + p.im*p.im;
                                    if (d < 1e-10) continue;
                                    fr = p.re/d; fi = -p.im/d;
                                }
                                re += (fr*p.dre - fi*p.dim)*dt;
                                im += (fr*p.dim + fi*p.dre)*dt;
                            }
                            return { re, im };
                        }

                        function drawPath(which, color) {
                            var nDraw = 100;
                            viz.ctx.strokeStyle = color;
                            viz.ctx.lineWidth = 2.5;
                            viz.ctx.beginPath();
                            for (var k = 0; k <= nDraw; k++) {
                                var p = getPath(which, k/nDraw);
                                var sc = viz.toScreen(p.re, p.im);
                                k === 0 ? viz.ctx.moveTo(sc[0], sc[1]) : viz.ctx.lineTo(sc[0], sc[1]);
                            }
                            viz.ctx.stroke();
                            // Arrowhead near midpoint
                            var pm = getPath(which, 0.55);
                            var pm2 = getPath(which, 0.56);
                            viz.drawVector(pm.re, pm.im, pm2.re, pm2.im, color, null, 2);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            viz.screenText('Re', viz.width - 18, viz.originY + 14, viz.colors.text, 11);
                            viz.screenText('Im', viz.originX + 10, 12, viz.colors.text, 11);

                            // Origin marker (singularity for 1/z)
                            if (funcType === 1) {
                                viz.ctx.fillStyle = viz.colors.red + '33';
                                viz.ctx.beginPath();
                                viz.ctx.arc(viz.originX, viz.originY, 12, 0, Math.PI*2);
                                viz.ctx.fill();
                                viz.drawText('pole', 0, 0.3, viz.colors.red, 11);
                            }

                            drawPath(0, viz.colors.blue);
                            drawPath(1, viz.colors.teal);

                            viz.drawPoint(A.re, A.im, viz.colors.white, 'A', 6);
                            viz.drawPoint(B.re, B.im, viz.colors.white, 'B', 6);

                            var int0 = computeIntegral(0, funcType);
                            var int1 = computeIntegral(1, funcType);

                            var px = viz.width - 210, py = 20;
                            viz.ctx.fillStyle = '#1a1a40ee';
                            viz.ctx.fillRect(px - 8, py - 8, 210, 155);
                            viz.screenText(funcNames[funcType], px + 95, py + 8, viz.colors.white, 11, 'center');

                            viz.screenText('Path 1 (straight):', px + 8, py + 28, viz.colors.blue, 11, 'left');
                            viz.screenText(int0.re.toFixed(4) + ' + ' + int0.im.toFixed(4) + 'i', px + 8, py + 46, viz.colors.blue, 11, 'left');

                            viz.screenText('Path 2 (arc via top):', px + 8, py + 68, viz.colors.teal, 11, 'left');
                            viz.screenText(int1.re.toFixed(4) + ' + ' + int1.im.toFixed(4) + 'i', px + 8, py + 86, viz.colors.teal, 11, 'left');

                            var dRe = Math.abs(int0.re - int1.re);
                            var dIm = Math.abs(int0.im - int1.im);
                            var same = dRe < 0.01 && dIm < 0.01;
                            viz.screenText('Difference:', px + 8, py + 108, viz.colors.text, 11, 'left');
                            viz.screenText((int0.re - int1.re).toFixed(4) + ' + ' + (int0.im - int1.im).toFixed(4) + 'i', px + 8, py + 126, same ? viz.colors.green : viz.colors.red, 11, 'left');
                            viz.screenText(same ? 'Path independent \u2713' : 'Path DEPENDENT \u2717', px + 105, py + 144, same ? viz.colors.green : viz.colors.red, 12, 'center');
                        }

                        draw();
                        // Redraw on button click (handled by button event already calling draw via funcBtn closure)
                        funcBtn.addEventListener('click', draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\int_\\gamma z^3\\,dz\\) where \\(\\gamma\\) is any contour from \\(i\\) to \\(2-i\\). Explain why the path does not matter.',
                    hint: 'Find an antiderivative \\(F(z) = z^4/4\\) and apply the fundamental theorem.',
                    solution: '\\(F(z) = z^4/4\\). At the endpoints: \\(F(2-i) = (2-i)^4/4\\). Note \\((2-i)^2 = 3-4i\\), \\((2-i)^4 = (3-4i)^2 = -7-24i\\). So \\(F(2-i) = (-7-24i)/4\\). And \\(F(i) = i^4/4 = 1/4\\). The integral is \\((-7-24i)/4 - 1/4 = (-8-24i)/4 = -2 - 6i\\). The path does not matter because \\(z^3\\) is entire (analytic everywhere) with antiderivative \\(z^4/4\\).'
                },
                {
                    question: 'Show that \\(\\int_\\gamma \\cos(z)\\,dz = 0\\) for any closed contour \\(\\gamma\\).',
                    hint: 'Find an antiderivative and apply the corollary.',
                    solution: '\\(\\cos(z)\\) has antiderivative \\(F(z) = \\sin(z)\\) on all of \\(\\mathbb{C}\\) (since \\(\\sin\'(z) = \\cos(z)\\) in the complex sense). By the corollary to Theorem 4.9, any integral of \\(\\cos(z)\\) over a closed path equals \\(F(z_0) - F(z_0) = 0\\).'
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
<h2>Key Examples: \\(z^n\\) and \\(1/z\\)</h2>

<p>Two families of integrals are the cornerstone of complex analysis. They determine the behavior of all Laurent series and residue computations.</p>

<h3>Integral of \\(z^n\\) Around a Circle</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 4.11</div>
    <div class="env-body">
        <p>Let \\(\\gamma\\) be any simple closed counterclockwise contour surrounding the origin. Then
        \\[\\oint_\\gamma z^n\\,dz = \\begin{cases} 0 & \\text{if } n \\neq -1, \\\\ 2\\pi i & \\text{if } n = -1, \\end{cases}\\]
        for all integers \\(n\\).</p>
    </div>
</div>

<p><em>Proof for the circle \\(|z| = r\\).</em> Parameterize \\(z(t) = re^{it}\\) for \\(t \\in [0, 2\\pi]\\), so \\(dz = ire^{it}\\,dt\\).</p>

<p><strong>Case \\(n \\neq -1\\):</strong>
\\[\\oint_{|z|=r} z^n\\,dz = \\int_0^{2\\pi} r^n e^{int} \\cdot ire^{it}\\,dt = ir^{n+1}\\int_0^{2\\pi} e^{i(n+1)t}\\,dt.\\]
For \\(n \\neq -1\\) we have \\(n+1 \\neq 0\\), so \\(\\int_0^{2\\pi} e^{i(n+1)t}\\,dt = \\left[\\frac{e^{i(n+1)t}}{i(n+1)}\\right]_0^{2\\pi} = 0\\) (since \\(e^{i(n+1)2\\pi} = 1\\)).</p>

<p><strong>Case \\(n = -1\\):</strong>
\\[\\oint_{|z|=r} \\frac{1}{z}\\,dz = \\int_0^{2\\pi} \\frac{1}{re^{it}} \\cdot ire^{it}\\,dt = \\int_0^{2\\pi} i\\,dt = 2\\pi i. \\quad \\square\\]</p>

<div class="env-block remark">
    <div class="env-title">Why \\(n = -1\\) Is Special</div>
    <div class="env-body">
        <p>For \\(n \\neq -1\\), \\(z^n\\) has an antiderivative \\(z^{n+1}/(n+1)\\) on the punctured plane, so any closed integral vanishes. For \\(n = -1\\), the "antiderivative" is \\(\\log z\\), which is multi-valued: each time we loop counterclockwise around the origin, \\(\\log z\\) increases by \\(2\\pi i\\). This is the topological obstruction that makes \\(1/z\\) special.</p>
    </div>
</div>

<h3>Why This Controls Everything</h3>

<p>For any function with a Laurent series \\(f(z) = \\sum_{n=-\\infty}^{\\infty} a_n (z - z_0)^n\\), integrating term by term around a small circle centered at \\(z_0\\):
\\[\\oint_{|z-z_0|=r} f(z)\\,dz = \\sum_n a_n \\oint (z-z_0)^n\\,dz = a_{-1} \\cdot 2\\pi i.\\]
Only the \\(n = -1\\) term survives. This is the <strong>residue</strong> \\(a_{-1}\\), and computing contour integrals reduces to finding residues.</p>
`,
            visualizations: [
                {
                    id: 'viz-1-over-z',
                    title: 'Integral of 1/z: Always 2\u03c0i',
                    description: 'Animate the integration of 1/z around circles of any radius centered at 0. The accumulated imaginary part always reaches 2\u03c0 after one full loop, regardless of radius.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 65, originX: 200, originY: 210 });

                        var radius = 1.0;
                        var tVal = 0;
                        VizEngine.createSlider(controls, 'Radius r', 0.3, 2.5, radius, 0.1, function(v) { radius = v; tVal = 0; });
                        VizEngine.createButton(controls, 'Reset', function() { tVal = 0; });

                        viz.animate(function(ts) {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            viz.screenText('Re', viz.width - 18, viz.originY + 14, viz.colors.text, 11);
                            viz.screenText('Im', viz.originX + 10, 12, viz.colors.text, 11);

                            tVal = (tVal + 0.005) % 1.0;
                            var theta = 2 * Math.PI * tVal;

                            // Full circle (faint)
                            viz.ctx.strokeStyle = viz.colors.grid;
                            viz.ctx.lineWidth = 1.5;
                            viz.ctx.beginPath();
                            viz.ctx.arc(viz.originX, viz.originY, radius * viz.scale, 0, Math.PI * 2);
                            viz.ctx.stroke();

                            // Traversed arc
                            viz.ctx.strokeStyle = viz.colors.blue;
                            viz.ctx.lineWidth = 3;
                            viz.ctx.beginPath();
                            viz.ctx.arc(viz.originX, viz.originY, radius * viz.scale, -Math.PI/2, -Math.PI/2 + theta, false);
                            viz.ctx.stroke();

                            // Starting point
                            viz.drawPoint(0, radius, viz.colors.green, 'start', 5);

                            // Current point z(t)
                            var curRe = radius * Math.cos(theta - Math.PI/2);
                            var curIm = radius * Math.sin(theta - Math.PI/2);
                            viz.drawPoint(curRe, curIm, viz.colors.yellow, 'z(t)', 6);

                            // f(z) = 1/z arrow
                            var d = curRe*curRe + curIm*curIm;
                            var fRe = curRe/d, fIm = -curIm/d;
                            viz.drawVector(curRe, curIm, curRe + fRe*0.3, curIm + fIm*0.3, viz.colors.orange, '1/z', 2);

                            // Numerical accumulated integral
                            var nSteps = 300;
                            var accRe = 0, accIm = 0;
                            var tCur = tVal;
                            for (var k = 0; k < nSteps; k++) {
                                var t = (k + 0.5) / nSteps * tCur;
                                var th = 2 * Math.PI * t - Math.PI/2;
                                var zRe = radius * Math.cos(th);
                                var zIm = radius * Math.sin(th);
                                var denom = zRe*zRe + zIm*zIm;
                                var invRe = zRe/denom, invIm = -zIm/denom;
                                // dz = i*r*e^{it} dt; angle relative to start
                                var dTheta = 2*Math.PI*tCur/nSteps;
                                var dzRe = -radius * Math.sin(th) * dTheta;
                                var dzIm = radius * Math.cos(th) * dTheta;
                                accRe += invRe*dzRe - invIm*dzIm;
                                accIm += invRe*dzIm + invIm*dzRe;
                            }

                            // Progress arc in small diagram at right
                            var px = viz.width - 160, py = 30;
                            viz.ctx.fillStyle = '#1a1a40ee';
                            viz.ctx.fillRect(px - 8, py - 8, 160, 175);
                            viz.screenText('\u222b 1/z dz progress', px + 72, py + 8, viz.colors.white, 11, 'center');
                            viz.screenText('t = ' + (tVal * 100).toFixed(1) + '% of loop', px + 8, py + 28, viz.colors.text, 10, 'left');
                            viz.screenText('r = ' + radius.toFixed(2) + ' (any!)', px + 8, py + 46, viz.colors.text, 10, 'left');

                            viz.screenText('Re \u222b = ' + accRe.toFixed(4), px + 8, py + 68, viz.colors.blue, 11, 'left');
                            viz.screenText('Im \u222b = ' + accIm.toFixed(4), px + 8, py + 88, viz.colors.teal, 11, 'left');

                            var target = 2 * Math.PI * tVal;
                            viz.screenText('Expected Im: ' + target.toFixed(4), px + 8, py + 108, viz.colors.text, 10, 'left');

                            if (tVal > 0.98) {
                                viz.screenText('RESULT: 2\u03c0i', px + 72, py + 135, viz.colors.green, 14, 'center');
                                viz.screenText('= ' + (2*Math.PI).toFixed(5) + ' i', px + 72, py + 155, viz.colors.green, 12, 'center');
                            } else {
                                viz.screenText('Final: 2\u03c0i \u2248 ' + (2*Math.PI).toFixed(3) + 'i', px + 72, py + 140, viz.colors.yellow, 11, 'center');
                            }
                        });
                        return viz;
                    }
                },
                {
                    id: 'viz-z-to-n',
                    title: 'Integral of z^n Around Unit Circle',
                    description: 'Slide n (integer) and watch the integral of z^n around the unit circle. The result is 0 for all n except n = -1, where it equals 2\u03c0i.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 65, originX: 200, originY: 210 });

                        var nExp = 1;
                        var tVal = 0;

                        VizEngine.createSlider(controls, 'n', -4, 4, nExp, 1, function(v) {
                            nExp = Math.round(v);
                            tVal = 0;
                        });
                        VizEngine.createButton(controls, 'Reset', function() { tVal = 0; });

                        viz.animate(function(ts) {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            viz.screenText('Re', viz.width - 18, viz.originY + 14, viz.colors.text, 11);
                            viz.screenText('Im', viz.originX + 10, 12, viz.colors.text, 11);

                            tVal = (tVal + 0.004) % 1.0;
                            var theta = 2 * Math.PI * tVal;

                            // Unit circle
                            viz.ctx.strokeStyle = viz.colors.grid;
                            viz.ctx.lineWidth = 1.5;
                            viz.ctx.beginPath();
                            viz.ctx.arc(viz.originX, viz.originY, viz.scale, 0, Math.PI * 2);
                            viz.ctx.stroke();

                            // Traversed arc
                            viz.ctx.strokeStyle = viz.colors.blue;
                            viz.ctx.lineWidth = 3;
                            viz.ctx.beginPath();
                            viz.ctx.arc(viz.originX, viz.originY, viz.scale, 0, theta, false);
                            viz.ctx.stroke();

                            // Current point z = e^{it}
                            var zRe = Math.cos(theta);
                            var zIm = Math.sin(theta);
                            viz.drawPoint(zRe, zIm, viz.colors.yellow, null, 6);

                            // f(z) = z^n value at current point
                            var fRe, fIm;
                            if (nExp >= 0) {
                                fRe = Math.cos(nExp * theta);
                                fIm = Math.sin(nExp * theta);
                            } else {
                                fRe = Math.cos(nExp * theta);
                                fIm = Math.sin(nExp * theta);
                            }
                            viz.drawVector(zRe, zIm, zRe + fRe * 0.3, zIm + fIm * 0.3, viz.colors.orange, 'z\u207F', 2);

                            // Accumulate integral numerically
                            var nSteps = 500;
                            var accRe = 0, accIm = 0;
                            for (var k = 0; k < nSteps; k++) {
                                var t = (k + 0.5) / nSteps * tVal;
                                var th = 2 * Math.PI * t;
                                var znRe = Math.cos(nExp * th);
                                var znIm = Math.sin(nExp * th);
                                var dTheta = 2 * Math.PI * tVal / nSteps;
                                var dzRe = -Math.sin(th) * dTheta;
                                var dzIm = Math.cos(th) * dTheta;
                                accRe += znRe * dzRe - znIm * dzIm;
                                accIm += znRe * dzIm + znIm * dzRe;
                            }

                            // Panel
                            var px = viz.width - 175, py = 20;
                            viz.ctx.fillStyle = '#1a1a40ee';
                            viz.ctx.fillRect(px - 8, py - 8, 175, 185);
                            viz.screenText('\u222b z\u207F dz on |z|=1', px + 78, py + 8, viz.colors.white, 12, 'center');
                            viz.screenText('n = ' + nExp, px + 8, py + 30, viz.colors.yellow, 14, 'left');
                            viz.screenText('Re \u222b = ' + accRe.toFixed(5), px + 8, py + 54, viz.colors.blue, 11, 'left');
                            viz.screenText('Im \u222b = ' + accIm.toFixed(5), px + 8, py + 72, viz.colors.teal, 11, 'left');

                            var done = tVal > 0.99;
                            if (done) {
                                var resRe = accRe, resIm = accIm;
                                var isSpecial = nExp === -1;
                                var resultStr = isSpecial ? 'Result: 2\u03c0i' : 'Result: 0';
                                viz.screenText(resultStr, px + 78, py + 100, isSpecial ? viz.colors.green : viz.colors.teal, 14, 'center');
                                viz.screenText(isSpecial ? '(only n=\u22121 survives!)' : '(antiderivative exists)', px + 78, py + 122, viz.colors.text, 10, 'center');
                            }

                            // Theoretical reminder
                            viz.screenText('Theorem: \u222b\u1D67 z\u207F dz = 0 (n\u2260\u22121)', px + 78, py + 145, viz.colors.text, 10, 'center');
                            viz.screenText('             = 2\u03c0i (n=\u22121)', px + 78, py + 163, viz.colors.text, 10, 'center');
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\oint_{|z|=2} z^{-3}\\,dz\\). Justify using both the formula and the antiderivative argument.',
                    hint: 'Since \\(n = -3 \\neq -1\\), the theorem gives 0. For the antiderivative argument, note \\(z^{-3}\\) has antiderivative \\(z^{-2}/(-2)\\) away from the origin.',
                    solution: 'By Theorem 4.11 with \\(n = -3\\), \\(\\oint z^{-3}\\,dz = 0\\). Alternatively, \\(F(z) = z^{-2}/(-2)\\) satisfies \\(F\'(z) = z^{-3}\\) on \\(\\mathbb{C}\\setminus\\{0\\}\\). For any closed contour not passing through 0, \\(\\oint F\'(z)\\,dz = F(z_0) - F(z_0) = 0\\).'
                },
                {
                    question: 'Compute \\(\\oint_{|z-1|=3} \\frac{1}{z}\\,dz\\). Note: the contour is centered at 1 with radius 3, so it encloses the origin.',
                    hint: 'You can deform the contour to \\(|z|=1\\) without crossing any singularity (all of \\(1/z\\)\'s singularity is at 0, which is enclosed). The integral is invariant under this deformation.',
                    solution: 'The only singularity of \\(1/z\\) is at \\(z = 0\\). Since \\(|1-0| = 1 < 3\\), the origin lies inside \\(|z-1|=3\\). By Cauchy\'s theorem (to be proved in Ch. 5), the integral over any simple closed counterclockwise curve enclosing 0 equals \\(2\\pi i\\).'
                },
                {
                    question: 'What is \\(\\oint_{|z|=1} \\left(z^3 + \\frac{2}{z} - \\frac{5}{z^2}\\right) dz\\)?',
                    hint: 'Use linearity and apply the formula for each term separately.',
                    solution: 'By linearity and Theorem 4.11: \\(\\oint z^3\\,dz = 0\\) (\\(n=3\\)); \\(\\oint 2/z\\,dz = 2 \\cdot 2\\pi i = 4\\pi i\\) (\\(n=-1\\)); \\(\\oint -5/z^2\\,dz = -5 \\cdot 0 = 0\\) (\\(n=-2\\)). Total: \\(4\\pi i\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge to Cauchy's Theorem
        // ================================================================
        {
            id: 'sec-bridge',
            title: "Cauchy's Theorem",
            content: `
<h2>Bridge: Cauchy's Theorem</h2>

<p>We have now seen that:</p>
<ul>
    <li>For \\(f(z) = z^n\\) with \\(n \\neq -1\\), the integral around any closed curve is zero.</li>
    <li>For \\(f(z) = 1/z\\), the integral around a curve enclosing the origin is \\(2\\pi i\\).</li>
</ul>

<p>The key distinction is whether \\(f\\) has an antiderivative on the relevant domain. Is there a more fundamental reason that analytic functions tend to have zero closed integrals?</p>

<div class="env-block theorem">
    <div class="env-title">Cauchy's Theorem (Preview)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic on a simply connected domain \\(D\\). Then for every closed contour \\(\\gamma\\) in \\(D\\),
        \\[\\oint_\\gamma f(z)\\,dz = 0.\\]</p>
    </div>
</div>

<p>This is the central theorem of complex analysis, proved rigorously in Chapter 5. Let us see why it makes geometric sense.</p>

<h3>Intuition via Green's Theorem</h3>

<p>Recall that a contour integral can be written as two real line integrals:
\\[\\oint_\\gamma f\\,dz = \\oint_\\gamma (u\\,dx - v\\,dy) + i\\oint_\\gamma (v\\,dx + u\\,dy).\\]
By Green's theorem, these line integrals over a closed curve equal double integrals:
\\[\\oint_\\gamma u\\,dx - v\\,dy = -\\iint_R \\left(\\frac{\\partial v}{\\partial x} + \\frac{\\partial u}{\\partial y}\\right)\\,dA, \\quad \\oint_\\gamma v\\,dx + u\\,dy = \\iint_R \\left(\\frac{\\partial u}{\\partial x} - \\frac{\\partial v}{\\partial y}\\right)\\,dA.\\]
But analyticity means the Cauchy-Riemann equations hold: \\(u_x = v_y\\) and \\(u_y = -v_x\\). Substituting, both integrands are identically zero! This is the crux.</p>

<div class="env-block remark">
    <div class="env-title">The Converse: Morera's Theorem</div>
    <div class="env-body">
        <p>Remarkably, the converse is also true (Morera's theorem): if \\(f\\) is continuous on a domain \\(D\\) and \\(\\int_\\gamma f\\,dz = 0\\) for every closed triangle in \\(D\\), then \\(f\\) is analytic on \\(D\\). The vanishing of closed integrals is equivalent to analyticity.</p>
    </div>
</div>

<h3>Contour Deformation</h3>

<p>A powerful consequence of Cauchy's theorem is that we can <em>deform contours</em>. If \\(f\\) is analytic in the region between two contours \\(\\gamma_1\\) and \\(\\gamma_2\\) with the same endpoints (or both closed), then
\\[\\int_{\\gamma_1} f\\,dz = \\int_{\\gamma_2} f\\,dz.\\]
This allows us to replace a complicated path with a simple one (like a circle), as long as we do not cross a singularity in the process.</p>

<div class="env-block example">
    <div class="env-title">Example 4.5: Deformation in Practice</div>
    <div class="env-body">
        <p>To compute \\(\\oint_{|z-3|=5} \\frac{1}{z}\\,dz\\) (a large circle centered at 3), note that \\(1/z\\) is analytic everywhere except \\(z = 0\\), which lies inside the contour (since \\(|0 - 3| = 3 < 5\\)). We can deform to the small circle \\(|z| = 1\\) without crossing the singularity:
        \\[\\oint_{|z-3|=5} \\frac{1}{z}\\,dz = \\oint_{|z|=1} \\frac{1}{z}\\,dz = 2\\pi i.\\]</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-deformation',
                    title: 'Contour Deformation',
                    description: 'Watch a contour morph continuously. If f is analytic inside the region swept, the integral stays the same. A singularity at the origin blocks deformation: crossing it changes the integral.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 65, originX: 200, originY: 210 });

                        var morphT = 0;
                        var hasSing = false;
                        var animating = true;

                        VizEngine.createButton(controls, 'Toggle Singularity at 0', function() { hasSing = !hasSing; morphT = 0; });
                        VizEngine.createButton(controls, 'Reset', function() { morphT = 0; });

                        // Two contours: gamma1 = circle radius 0.6, gamma2 = circle radius 1.8
                        // We morph between them
                        function getRadius(t) { return 0.6 + 1.2 * t; }

                        function computeCircleIntegral(r, fType) {
                            var nSteps = 400;
                            var accRe = 0, accIm = 0;
                            for (var k = 0; k < nSteps; k++) {
                                var theta = 2 * Math.PI * (k + 0.5) / nSteps;
                                var zRe = r * Math.cos(theta);
                                var zIm = r * Math.sin(theta);
                                var dTheta = 2 * Math.PI / nSteps;
                                var dzRe = -r * Math.sin(theta) * dTheta;
                                var dzIm = r * Math.cos(theta) * dTheta;
                                var fRe, fIm;
                                if (!fType) { // analytic: f(z) = z
                                    fRe = zRe; fIm = zIm;
                                } else { // 1/z
                                    var d = zRe*zRe + zIm*zIm;
                                    fRe = zRe/d; fIm = -zIm/d;
                                }
                                accRe += fRe*dzRe - fIm*dzIm;
                                accIm += fRe*dzIm + fIm*dzRe;
                            }
                            return { re: accRe, im: accIm };
                        }

                        viz.animate(function(ts) {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();
                            viz.screenText('Re', viz.width - 18, viz.originY + 14, viz.colors.text, 11);
                            viz.screenText('Im', viz.originX + 10, 12, viz.colors.text, 11);

                            morphT = (morphT + 0.004) % 1.0;

                            var r1 = 0.6, r2 = 1.8;
                            var rCur = r1 + (r2 - r1) * morphT;

                            // Draw swept region (shaded)
                            viz.ctx.fillStyle = viz.colors.teal + '15';
                            viz.ctx.beginPath();
                            viz.ctx.arc(viz.originX, viz.originY, r2 * viz.scale, 0, Math.PI * 2);
                            viz.ctx.arc(viz.originX, viz.originY, r1 * viz.scale, 0, Math.PI * 2, true);
                            viz.ctx.fill();

                            // Draw starting contour (faint)
                            viz.ctx.strokeStyle = viz.colors.blue + '44';
                            viz.ctx.lineWidth = 1.5;
                            viz.ctx.beginPath();
                            viz.ctx.arc(viz.originX, viz.originY, r1 * viz.scale, 0, Math.PI * 2);
                            viz.ctx.stroke();

                            // Draw ending contour (faint)
                            viz.ctx.strokeStyle = viz.colors.teal + '44';
                            viz.ctx.lineWidth = 1.5;
                            viz.ctx.beginPath();
                            viz.ctx.arc(viz.originX, viz.originY, r2 * viz.scale, 0, Math.PI * 2);
                            viz.ctx.stroke();

                            // Draw current (morphed) contour
                            viz.ctx.strokeStyle = viz.colors.yellow;
                            viz.ctx.lineWidth = 3;
                            viz.ctx.beginPath();
                            viz.ctx.arc(viz.originX, viz.originY, rCur * viz.scale, 0, Math.PI * 2);
                            viz.ctx.stroke();

                            // Singularity at origin
                            if (hasSing) {
                                viz.ctx.fillStyle = viz.colors.red + '66';
                                viz.ctx.beginPath();
                                viz.ctx.arc(viz.originX, viz.originY, 10, 0, Math.PI * 2);
                                viz.ctx.fill();
                                viz.drawText('\u00d7', 0, 0, viz.colors.red, 18);
                                viz.drawText('pole', 0.35, 0.2, viz.colors.red, 11);
                            }

                            var int1 = computeCircleIntegral(r1, hasSing);
                            var int2 = computeCircleIntegral(r2, hasSing);
                            var intCur = computeCircleIntegral(rCur, hasSing);

                            var px = viz.width - 195, py = 20;
                            viz.ctx.fillStyle = '#1a1a40ee';
                            viz.ctx.fillRect(px - 8, py - 8, 195, 200);

                            var fname = hasSing ? 'f(z) = 1/z' : 'f(z) = z';
                            viz.screenText(fname, px + 88, py + 8, viz.colors.white, 12, 'center');
                            viz.screenText('Contour r = ' + rCur.toFixed(2), px + 88, py + 28, viz.colors.yellow, 11, 'center');

                            viz.screenText('r = ' + r1.toFixed(1) + ' (start):', px + 8, py + 52, viz.colors.blue, 10, 'left');
                            viz.screenText(int1.re.toFixed(3) + '+' + int1.im.toFixed(3) + 'i', px + 8, py + 68, viz.colors.blue, 10, 'left');

                            viz.screenText('r = ' + r2.toFixed(1) + ' (end):', px + 8, py + 90, viz.colors.teal, 10, 'left');
                            viz.screenText(int2.re.toFixed(3) + '+' + int2.im.toFixed(3) + 'i', px + 8, py + 106, viz.colors.teal, 10, 'left');

                            viz.screenText('Current:', px + 8, py + 128, viz.colors.yellow, 10, 'left');
                            viz.screenText(intCur.re.toFixed(3) + '+' + intCur.im.toFixed(3) + 'i', px + 8, py + 144, viz.colors.yellow, 10, 'left');

                            var diff = Math.sqrt((int1.re - int2.re)**2 + (int1.im - int2.im)**2);
                            var invariant = diff < 0.05;
                            viz.screenText(invariant ? 'Integral invariant \u2713' : 'Integral changes \u2717', px + 88, py + 172, invariant ? viz.colors.green : viz.colors.red, 12, 'center');
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\oint_{|z-2|=3} \\frac{1}{z}\\,dz\\). Does the contour enclose the singularity at the origin?',
                    hint: 'Check whether \\(|0 - 2| < 3\\). If yes, deform to the circle \\(|z|=1\\).',
                    solution: 'Since \\(|0 - 2| = 2 < 3\\), the origin is inside the contour \\(|z-2|=3\\). By contour deformation (the singularity at 0 is inside, and \\(1/z\\) is analytic in the annular region), the integral equals \\(\\oint_{|z|=1} 1/z\\,dz = 2\\pi i\\).'
                },
                {
                    question: 'Let \\(\\gamma_1\\) be the straight line from \\(-1\\) to \\(1\\) and \\(\\gamma_2\\) be the semicircle from \\(-1\\) to \\(1\\) through the upper half-plane. Compute \\(\\int_{\\gamma_1} z^2\\,dz\\) and \\(\\int_{\\gamma_2} z^2\\,dz\\). Are they equal? Why?',
                    hint: 'Use the antiderivative \\(F(z) = z^3/3\\). Since \\(z^2\\) is entire, path independence holds.',
                    solution: 'Both equal \\(F(1) - F(-1) = 1/3 - (-1/3) = 2/3\\). Since \\(z^2\\) is analytic everywhere (entire) with antiderivative \\(z^3/3\\), path independence holds and both paths give the same result. This is a direct application of the fundamental theorem of contour integrals.'
                },
                {
                    question: 'Use Cauchy\'s theorem to explain why \\(\\oint_{|z|=1} e^z\\,dz = 0\\) without computing the integral directly.',
                    hint: 'Is \\(e^z\\) analytic? What does Cauchy\'s theorem say about the integral of an analytic function over a closed curve in a simply connected domain?',
                    solution: '\\(e^z\\) is entire (analytic on all of \\(\\mathbb{C}\\)). The closed disk \\(|z| \\leq 1\\) is a simply connected domain. By Cauchy\'s theorem, the integral of any analytic function over any closed contour in a simply connected domain is zero. Therefore \\(\\oint_{|z|=1} e^z\\,dz = 0\\) without any computation.'
                },
                {
                    question: 'A contour \\(\\gamma\\) consists of: (i) the segment from \\(0\\) to \\(1\\), (ii) the segment from \\(1\\) to \\(1+i\\), (iii) the segment from \\(1+i\\) to \\(i\\), and (iv) the segment from \\(i\\) to \\(0\\) (a unit square). Compute \\(\\oint_\\gamma z^2\\,dz\\).',
                    hint: 'This is a closed contour. Does \\(z^2\\) have an antiderivative?',
                    solution: 'Since \\(z^2\\) is entire with antiderivative \\(F(z) = z^3/3\\), the integral over any closed contour is \\(F(z_0) - F(z_0) = 0\\). Alternatively, by Cauchy\'s theorem applied to the square. Result: \\(0\\).'
                }
            ]
        }

    ] // end sections
}); // end chapter push
