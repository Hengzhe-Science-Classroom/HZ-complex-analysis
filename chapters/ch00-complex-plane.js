window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'The Complex Plane',
    subtitle: 'Geometry meets algebra in two dimensions',
    sections: [
        // ================================================================
        // SECTION 1: Why Complex Numbers?
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Complex Numbers?',
            content: `
<h2>Why Complex Numbers?</h2>

<div class="env-block intuition">
    <div class="env-title">A Problem That Demands the Impossible</div>
    <div class="env-body">
        <p>Consider the cubic equation \\(x^3 = 15x + 4\\). In the sixteenth century, Gerolamo Cardano's formula for the cubic yields</p>
        \\[x = \\sqrt[3]{2 + \\sqrt{-121}} + \\sqrt[3]{2 - \\sqrt{-121}}.\\]
        <p>This expression involves the square root of a <em>negative number</em>, which has no meaning among real numbers. Yet the equation has the perfectly real solution \\(x = 4\\). Rafael Bombelli (1572) showed that if you simply <strong>trust the algebra</strong> and manipulate \\(\\sqrt{-121}\\) as if it were an honest number, you arrive at \\(x = 4\\). The "impossible" numbers cancel, leaving truth behind.</p>
        <p>Complex numbers were not invented for abstract pleasure. They were forced into existence by the demand that algebra work.</p>
    </div>
</div>

<p>The real number line \\(\\mathbb{R}\\) is algebraically incomplete: not every polynomial with real coefficients has a real root. The simplest offender is \\(x^2 + 1 = 0\\). We <strong>define</strong> a new number \\(i\\) satisfying \\(i^2 = -1\\) and build the complex numbers from there.</p>

<div class="env-block definition">
    <div class="env-title">Definition (The Complex Numbers)</div>
    <div class="env-body">
        <p>The set of <strong>complex numbers</strong> is</p>
        \\[\\mathbb{C} = \\{a + bi : a, b \\in \\mathbb{R}\\},\\]
        <p>where \\(i^2 = -1\\). For \\(z = a + bi\\), we call \\(a = \\operatorname{Re}(z)\\) the <strong>real part</strong> and \\(b = \\operatorname{Im}(z)\\) the <strong>imaginary part</strong>.</p>
    </div>
</div>

<p>The word "imaginary" is an unfortunate historical relic (coined by Descartes as a term of derision). Complex numbers are no less "real" than real numbers; both are mathematical constructions. The real numbers are the special case \\(b = 0\\).</p>

<h3>The Fundamental Theorem of Algebra</h3>

<p>The deepest justification for \\(\\mathbb{C}\\) is that it is <strong>algebraically closed</strong>: every non-constant polynomial with complex coefficients has a root in \\(\\mathbb{C}\\). This is the Fundamental Theorem of Algebra, first rigorously proved by Gauss (1799).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.1 (Fundamental Theorem of Algebra)</div>
    <div class="env-body">
        <p>Every polynomial \\(p(z) = a_n z^n + \\cdots + a_1 z + a_0\\) with \\(a_n \\neq 0\\) and \\(n \\geq 1\\) has at least one root in \\(\\mathbb{C}\\). Consequently, \\(p(z)\\) factors completely as</p>
        \\[p(z) = a_n(z - z_1)(z - z_2) \\cdots (z - z_n),\\]
        <p>where \\(z_1, \\ldots, z_n \\in \\mathbb{C}\\) (not necessarily distinct).</p>
    </div>
</div>

<p>We will prove this theorem later using complex analysis (specifically, Liouville's theorem). For now, it serves as motivation: \\(\\mathbb{C}\\) is the natural arena for polynomial algebra, and complex analysis is the study of functions on this arena.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Cardano published his <em>Ars Magna</em> in 1545, containing the cubic formula (actually discovered by Tartaglia). Bombelli's <em>L'Algebra</em> (1572) was the first systematic treatment of complex arithmetic. Euler introduced the notation \\(i\\) for \\(\\sqrt{-1}\\) in 1777, and Gauss coined the term "complex number" and gave \\(\\mathbb{C}\\) its geometric interpretation.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Verify Bombelli\'s claim: show that \\((2 + i)^3 = 2 + 11i\\) and \\((2 - i)^3 = 2 - 11i\\), and conclude that \\(\\sqrt[3]{2 + \\sqrt{-121}} + \\sqrt[3]{2 - \\sqrt{-121}} = 4\\).',
                    hint: 'Expand \\((2+i)^3\\) using the binomial theorem (or directly). Then note \\(\\sqrt{-121} = 11i\\).',
                    solution: '\\((2+i)^3 = 8 + 12i + 6i^2 + i^3 = 8 + 12i - 6 - i = 2 + 11i\\). Similarly \\((2-i)^3 = 2 - 11i\\). Since \\(\\sqrt{-121} = 11i\\), the cube roots are \\(2+i\\) and \\(2-i\\), and their sum is \\(4\\).'
                },
                {
                    question: 'Find all complex numbers \\(z\\) such that \\(z^2 = -5 + 12i\\).',
                    hint: 'Write \\(z = a + bi\\) and expand \\(z^2 = (a^2 - b^2) + 2abi\\). Match real and imaginary parts.',
                    solution: 'Setting \\(a^2 - b^2 = -5\\) and \\(2ab = 12\\), so \\(b = 6/a\\). Substituting: \\(a^2 - 36/a^2 = -5\\), giving \\(a^4 + 5a^2 - 36 = 0\\), so \\(a^2 = 4\\), hence \\(a = \\pm 2\\). Then \\(b = \\pm 3\\). The solutions are \\(z = 2 + 3i\\) and \\(z = -2 - 3i\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Algebra of Complex Numbers
        // ================================================================
        {
            id: 'sec-algebra',
            title: 'Algebra of Complex Numbers',
            content: `
<h2>Algebra of Complex Numbers</h2>

<div class="env-block intuition">
    <div class="env-title">Arithmetic as Coordinate Geometry</div>
    <div class="env-body">
        <p>Addition of complex numbers is just vector addition in \\(\\mathbb{R}^2\\). Multiplication is more interesting: it involves both scaling and rotation, as we will see in the next section. For now, the rule is simple: multiply out and use \\(i^2 = -1\\).</p>
    </div>
</div>

<h3>Basic Operations</h3>

<p>Let \\(z = a + bi\\) and \\(w = c + di\\). The arithmetic operations are:</p>

<div class="env-block definition">
    <div class="env-title">Definition (Complex Arithmetic)</div>
    <div class="env-body">
        <ul>
            <li><strong>Addition:</strong> \\(z + w = (a + c) + (b + d)i\\)</li>
            <li><strong>Multiplication:</strong> \\(zw = (ac - bd) + (ad + bc)i\\)</li>
            <li><strong>Conjugate:</strong> \\(\\bar{z} = a - bi\\)</li>
            <li><strong>Modulus:</strong> \\(|z| = \\sqrt{a^2 + b^2} = \\sqrt{z\\bar{z}}\\)</li>
            <li><strong>Division:</strong> \\(\\displaystyle\\frac{z}{w} = \\frac{z\\bar{w}}{|w|^2} = \\frac{(ac+bd) + (bc-ad)i}{c^2+d^2}\\) for \\(w \\neq 0\\)</li>
        </ul>
    </div>
</div>

<p>With these operations, \\(\\mathbb{C}\\) is a <strong>field</strong>: addition and multiplication satisfy all the usual laws (commutativity, associativity, distributivity), and every nonzero element has a multiplicative inverse.</p>

<h3>Properties of the Conjugate and Modulus</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.2 (Conjugate and Modulus Properties)</div>
    <div class="env-body">
        <p>For all \\(z, w \\in \\mathbb{C}\\):</p>
        <ol>
            <li>\\(\\overline{z + w} = \\bar{z} + \\bar{w}\\) and \\(\\overline{zw} = \\bar{z}\\bar{w}\\)</li>
            <li>\\(z\\bar{z} = |z|^2\\)</li>
            <li>\\(\\operatorname{Re}(z) = \\frac{z + \\bar{z}}{2}\\), \\(\\operatorname{Im}(z) = \\frac{z - \\bar{z}}{2i}\\)</li>
            <li>\\(|zw| = |z||w|\\) (multiplicativity)</li>
            <li>\\(\\bar{\\bar{z}} = z\\)</li>
            <li>\\(z \\in \\mathbb{R}\\) if and only if \\(z = \\bar{z}\\)</li>
        </ol>
    </div>
</div>

<h3>The Triangle Inequality</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.3 (Triangle Inequality)</div>
    <div class="env-body">
        <p>For all \\(z, w \\in \\mathbb{C}\\):</p>
        \\[|z + w| \\leq |z| + |w|.\\]
        <p>Equality holds if and only if one of \\(z, w\\) is a non-negative real multiple of the other.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>We have \\(|z + w|^2 = (z+w)\\overline{(z+w)} = (z+w)(\\bar{z}+\\bar{w}) = |z|^2 + z\\bar{w} + \\bar{z}w + |w|^2\\).</p>
        <p>Now \\(z\\bar{w} + \\bar{z}w = z\\bar{w} + \\overline{z\\bar{w}} = 2\\operatorname{Re}(z\\bar{w}) \\leq 2|z\\bar{w}| = 2|z||w|\\).</p>
        <p>Therefore \\(|z+w|^2 \\leq |z|^2 + 2|z||w| + |w|^2 = (|z| + |w|)^2\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<div class="env-block corollary">
    <div class="env-title">Corollary (Reverse Triangle Inequality)</div>
    <div class="env-body">
        <p>\\(\\big||z| - |w|\\big| \\leq |z - w|\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-complex-arithmetic"></div>
`,
            visualizations: [
                {
                    id: 'viz-complex-arithmetic',
                    title: 'Complex Arithmetic Explorer',
                    description: 'Drag z\u2081 and z\u2082 to see their sum and product in the complex plane. The sum follows the parallelogram law (vector addition). The product combines magnitudes and angles.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420, scale: 50
                        });

                        var z1 = viz.addDraggable('z1', 2, 1, viz.colors.blue);
                        var z2 = viz.addDraggable('z2', -1, 2, viz.colors.teal);

                        var mode = 'both';
                        VizEngine.createButton(controls, 'Sum', function() { mode = 'sum'; });
                        VizEngine.createButton(controls, 'Product', function() { mode = 'product'; });
                        VizEngine.createButton(controls, 'Both', function() { mode = 'both'; });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Label axes
                            viz.drawText('Re', (viz.width - viz.originX) / viz.scale - 0.3, -0.5, viz.colors.text, 12);
                            viz.drawText('Im', 0.4, (viz.originY) / viz.scale - 0.3, viz.colors.text, 12);

                            var a = z1.x, b = z1.y;
                            var c = z2.x, d = z2.y;

                            // Sum
                            var sx = a + c, sy = b + d;
                            // Product
                            var px = a * c - b * d, py = a * d + b * c;

                            // Draw z1 and z2
                            viz.drawVector(0, 0, a, b, viz.colors.blue, 'z\u2081');
                            viz.drawVector(0, 0, c, d, viz.colors.teal, 'z\u2082');

                            if (mode === 'sum' || mode === 'both') {
                                // Parallelogram for sum
                                viz.drawSegment(a, b, sx, sy, viz.colors.teal + '66', 1, true);
                                viz.drawSegment(c, d, sx, sy, viz.colors.blue + '66', 1, true);
                                viz.drawVector(0, 0, sx, sy, viz.colors.orange, 'z\u2081+z\u2082');
                                viz.drawPoint(sx, sy, viz.colors.orange, null, 4);
                            }

                            if (mode === 'product' || mode === 'both') {
                                viz.drawVector(0, 0, px, py, viz.colors.purple, 'z\u2081z\u2082');
                                viz.drawPoint(px, py, viz.colors.purple, null, 4);
                            }

                            viz.drawDraggables();

                            // Info panel
                            var infoY = 18;
                            var fmt = function(x, y) {
                                var sign = y >= 0 ? '+' : '\u2212';
                                return x.toFixed(2) + ' ' + sign + ' ' + Math.abs(y).toFixed(2) + 'i';
                            };
                            viz.screenText('z\u2081 = ' + fmt(a, b), 100, infoY, viz.colors.blue, 12, 'center');
                            viz.screenText('z\u2082 = ' + fmt(c, d), 280, infoY, viz.colors.teal, 12, 'center');

                            if (mode === 'sum' || mode === 'both') {
                                viz.screenText('z\u2081+z\u2082 = ' + fmt(sx, sy), 460, infoY, viz.colors.orange, 12, 'center');
                            }
                            if (mode === 'product' || mode === 'both') {
                                viz.screenText('z\u2081z\u2082 = ' + fmt(px, py), 460, infoY + 16, viz.colors.purple, 12, 'center');
                            }

                            // Show moduli
                            var m1 = Math.sqrt(a*a + b*b), m2 = Math.sqrt(c*c + d*d);
                            viz.screenText('|z\u2081| = ' + m1.toFixed(2) + ',  |z\u2082| = ' + m2.toFixed(2) + ',  |z\u2081||z\u2082| = ' + (m1*m2).toFixed(2), viz.width / 2, viz.height - 12, viz.colors.text, 11, 'center');
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Let \\(z = 3 + 4i\\). Compute \\(|z|\\), \\(\\bar{z}\\), \\(z\\bar{z}\\), and \\(1/z\\).',
                    hint: 'Recall \\(1/z = \\bar{z}/|z|^2\\).',
                    solution: '\\(|z| = \\sqrt{9+16} = 5\\). \\(\\bar{z} = 3 - 4i\\). \\(z\\bar{z} = |z|^2 = 25\\). \\(1/z = \\bar{z}/25 = (3-4i)/25 = 3/25 - 4i/25\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Geometric Interpretation
        // ================================================================
        {
            id: 'sec-geometry',
            title: 'Geometric Interpretation',
            content: `
<h2>Geometric Interpretation</h2>

<div class="env-block intuition">
    <div class="env-title">The Argand Plane</div>
    <div class="env-body">
        <p>Jean-Robert Argand (1806) and Caspar Wessel (1799, independently) realized that complex numbers are naturally represented as points in a plane: \\(z = a + bi\\) corresponds to the point \\((a, b)\\). The horizontal axis is the real axis, the vertical axis is the imaginary axis, and every complex number has a unique geometric address.</p>
    </div>
</div>

<h3>Polar Form</h3>

<p>Any nonzero \\(z \\in \\mathbb{C}\\) can be written in <strong>polar form</strong>:</p>

<div class="env-block definition">
    <div class="env-title">Definition (Polar Form)</div>
    <div class="env-body">
        \\[z = r(\\cos\\theta + i\\sin\\theta),\\]
        <p>where \\(r = |z|\\) is the <strong>modulus</strong> (distance from the origin) and \\(\\theta = \\arg(z)\\) is the <strong>argument</strong> (angle from the positive real axis, measured counterclockwise). The argument is determined up to multiples of \\(2\\pi\\); the <strong>principal argument</strong> \\(\\operatorname{Arg}(z) \\in (-\\pi, \\pi]\\) is the unique choice in that interval.</p>
    </div>
</div>

<h3>Multiplication as Rotation and Scaling</h3>

<p>The geometric meaning of multiplication becomes transparent in polar form. If \\(z_1 = r_1(\\cos\\theta_1 + i\\sin\\theta_1)\\) and \\(z_2 = r_2(\\cos\\theta_2 + i\\sin\\theta_2)\\), then</p>

\\[z_1 z_2 = r_1 r_2 \\big[\\cos(\\theta_1 + \\theta_2) + i\\sin(\\theta_1 + \\theta_2)\\big].\\]

<div class="env-block theorem">
    <div class="env-title">Theorem 0.4 (Geometric Interpretation of Multiplication)</div>
    <div class="env-body">
        <p>Multiplying by \\(w\\) is the geometric operation of:</p>
        <ol>
            <li><strong>Scaling</strong> distances by \\(|w|\\), and</li>
            <li><strong>Rotating</strong> by \\(\\arg(w)\\).</li>
        </ol>
        <p>In particular, multiplying by \\(i\\) rotates by \\(\\pi/2\\) counterclockwise.</p>
    </div>
</div>

<p>This is why complex multiplication is so geometrically rich: every multiplication is a <strong>spiral similarity</strong>, combining rotation with dilation. Conjugation \\(z \\mapsto \\bar{z}\\) is reflection across the real axis.</p>

<div class="env-block example">
    <div class="env-title">Example: Rotation by \\(\\pi/4\\)</div>
    <div class="env-body">
        <p>To rotate the point \\(z = 3 + i\\) by \\(\\pi/4\\) counterclockwise about the origin, multiply by \\(w = \\cos(\\pi/4) + i\\sin(\\pi/4) = \\frac{1+i}{\\sqrt{2}}\\):</p>
        \\[wz = \\frac{(1+i)(3+i)}{\\sqrt{2}} = \\frac{3 + i + 3i + i^2}{\\sqrt{2}} = \\frac{2 + 4i}{\\sqrt{2}} = \\sqrt{2} + 2\\sqrt{2}\\,i.\\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-polar-form"></div>
`,
            visualizations: [
                {
                    id: 'viz-polar-form',
                    title: 'Polar Form Explorer',
                    description: 'Drag z to see its Cartesian and polar representations simultaneously. The arc shows the argument; the radius shows the modulus.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420, scale: 50
                        });

                        var zd = viz.addDraggable('z', 2, 1.5, viz.colors.blue);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var x = zd.x, y = zd.y;
                            var r = Math.sqrt(x * x + y * y);
                            var theta = Math.atan2(y, x);

                            // Draw modulus line
                            viz.drawVector(0, 0, x, y, viz.colors.blue, 'z');

                            // Draw projections (dashed)
                            viz.drawSegment(x, 0, x, y, viz.colors.text + '55', 1, true);
                            viz.drawSegment(0, 0, x, 0, viz.colors.text + '55', 1, true);

                            // Draw angle arc
                            if (r > 0.1) {
                                var arcR = Math.min(30, r * viz.scale * 0.4);
                                var [ox, oy] = viz.toScreen(0, 0);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(ox, oy, arcR, -theta, 0); // screen coords: y is flipped
                                ctx.stroke();

                                // Angle label
                                var labelAngle = -theta / 2;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('\u03B8', ox + (arcR + 14) * Math.cos(labelAngle), oy + (arcR + 14) * Math.sin(labelAngle));
                            }

                            // Modulus label
                            if (r > 0.2) {
                                var mx = x / 2, my = y / 2;
                                var [smx, smy] = viz.toScreen(mx, my);
                                var perpAngle = theta + Math.PI / 2;
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('r = |z|', smx + 18 * Math.cos(perpAngle), smy - 18 * Math.sin(perpAngle));
                            }

                            viz.drawDraggables();

                            // Info
                            var sign = y >= 0 ? '+' : '\u2212';
                            var degVal = (theta * 180 / Math.PI);
                            viz.screenText('z = ' + x.toFixed(2) + ' ' + sign + ' ' + Math.abs(y).toFixed(2) + 'i', viz.width / 2, 16, viz.colors.white, 13, 'center');
                            viz.screenText('|z| = ' + r.toFixed(3) + '     arg(z) = ' + theta.toFixed(3) + ' rad (' + degVal.toFixed(1) + '\u00B0)', viz.width / 2, 36, viz.colors.teal, 12, 'center');
                            viz.screenText('z = ' + r.toFixed(3) + '(cos ' + theta.toFixed(3) + ' + i sin ' + theta.toFixed(3) + ')', viz.width / 2, viz.height - 12, viz.colors.orange, 11, 'center');
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Express \\(z = -1 + i\\) in polar form. What is \\(\\operatorname{Arg}(z)\\)?',
                    hint: 'Compute \\(|z|\\) and identify the quadrant to find the angle.',
                    solution: '\\(|z| = \\sqrt{1+1} = \\sqrt{2}\\). The point \\((-1,1)\\) is in the second quadrant, so \\(\\theta = \\pi - \\pi/4 = 3\\pi/4\\). Thus \\(z = \\sqrt{2}\\,(\\cos(3\\pi/4) + i\\sin(3\\pi/4))\\) and \\(\\operatorname{Arg}(z) = 3\\pi/4\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: The Exponential Form
        // ================================================================
        {
            id: 'sec-exponential',
            title: 'The Exponential Form',
            content: `
<h2>The Exponential Form</h2>

<div class="env-block intuition">
    <div class="env-title">Euler's Most Beautiful Formula</div>
    <div class="env-body">
        <p>Leonhard Euler (1748) discovered one of the most remarkable identities in all of mathematics: \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\). This links the exponential function (from calculus) to trigonometry (from geometry) through the imaginary unit (from algebra). Three seemingly unrelated branches of mathematics fused into a single formula.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Euler's Formula)</div>
    <div class="env-body">
        <p>For any real \\(\\theta\\):</p>
        \\[e^{i\\theta} = \\cos\\theta + i\\sin\\theta.\\]
        <p>Setting \\(\\theta = \\pi\\) yields <strong>Euler's identity</strong>: \\(e^{i\\pi} + 1 = 0\\).</p>
    </div>
</div>

<p>With Euler's formula, every complex number has an <strong>exponential form</strong>:</p>
\\[z = re^{i\\theta}, \\quad r = |z|, \\; \\theta = \\arg(z).\\]

<p>Multiplication becomes trivially clear: \\(r_1 e^{i\\theta_1} \\cdot r_2 e^{i\\theta_2} = r_1 r_2 \\, e^{i(\\theta_1 + \\theta_2)}\\). Moduli multiply; arguments add.</p>

<h3>De Moivre's Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.5 (De Moivre's Theorem)</div>
    <div class="env-body">
        <p>For any integer \\(n\\) and real \\(\\theta\\):</p>
        \\[(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta).\\]
        <p>Equivalently, \\((e^{i\\theta})^n = e^{in\\theta}\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>For positive \\(n\\), this is immediate from the multiplication rule for polar forms (induction on \\(n\\)). For \\(n = 0\\), both sides equal 1. For negative \\(n\\), use \\((e^{i\\theta})^{-1} = e^{-i\\theta}\\).</p>
    </div>
    <div class="qed">&marker;</div>
</div>

<h3>Roots of Unity</h3>

<p>De Moivre's theorem lets us find all \\(n\\)th roots of any complex number. The \\(n\\)th roots of <strong>unity</strong> (roots of \\(z^n = 1\\)) are especially important.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.6 (Roots of Unity)</div>
    <div class="env-body">
        <p>The \\(n\\)th roots of unity are</p>
        \\[\\omega_k = e^{2\\pi i k/n} = \\cos\\frac{2\\pi k}{n} + i\\sin\\frac{2\\pi k}{n}, \\quad k = 0, 1, \\ldots, n-1.\\]
        <p>They form the vertices of a regular \\(n\\)-gon inscribed in the unit circle. If \\(\\omega = e^{2\\pi i/n}\\) is a <strong>primitive</strong> \\(n\\)th root of unity, then the roots are \\(1, \\omega, \\omega^2, \\ldots, \\omega^{n-1}\\).</p>
    </div>
</div>

<div class="env-block corollary">
    <div class="env-title">Corollary (Sum of Roots of Unity)</div>
    <div class="env-body">
        <p>\\(\\displaystyle\\sum_{k=0}^{n-1} \\omega^k = 0\\) for \\(n \\geq 2\\). Geometrically, the vertices of a regular polygon centered at the origin balance out.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Cube Roots of \\(8i\\)</div>
    <div class="env-body">
        <p>Write \\(8i = 8e^{i\\pi/2}\\). The cube roots are \\(z_k = 2 e^{i(\\pi/6 + 2\\pi k/3)}\\) for \\(k = 0, 1, 2\\):</p>
        <ul>
            <li>\\(z_0 = 2e^{i\\pi/6} = \\sqrt{3} + i\\)</li>
            <li>\\(z_1 = 2e^{i5\\pi/6} = -\\sqrt{3} + i\\)</li>
            <li>\\(z_2 = 2e^{i3\\pi/2} = -2i\\)</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-euler-formula"></div>
<div class="viz-placeholder" data-viz="viz-roots-of-unity"></div>
<div class="viz-placeholder" data-viz="viz-de-moivre"></div>
`,
            visualizations: [
                {
                    id: 'viz-euler-formula',
                    title: 'Euler\'s Formula: e^{i\u03B8} Traces the Unit Circle',
                    description: 'As \u03B8 varies, e^{i\u03B8} traces the unit circle. The real part is cos\u03B8 and the imaginary part is sin\u03B8. Slide \u03B8 to see the connection.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420, scale: 80
                        });

                        var theta = 0.8;
                        VizEngine.createSlider(controls, '\u03B8', -3.14, 3.14, theta, 0.01, function(v) {
                            theta = v;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Unit circle
                            viz.drawCircle(0, 0, 1, null, viz.colors.text + '44', 1);

                            // The point e^{i*theta}
                            var x = Math.cos(theta), y = Math.sin(theta);

                            // Draw cos and sin projections
                            viz.drawSegment(x, 0, x, y, viz.colors.orange, 2, true);
                            viz.drawSegment(0, 0, x, 0, viz.colors.teal, 2);
                            viz.drawPoint(x, 0, viz.colors.teal, null, 3);

                            // Angle arc
                            var [ox, oy] = viz.toScreen(0, 0);
                            var arcR = 25;
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            if (theta >= 0) {
                                ctx.arc(ox, oy, arcR, 0, -theta, true);
                            } else {
                                ctx.arc(ox, oy, arcR, 0, -theta, false);
                            }
                            ctx.stroke();

                            // Radius vector
                            viz.drawVector(0, 0, x, y, viz.colors.blue);
                            viz.drawPoint(x, y, viz.colors.blue, null, 5);

                            // Trace the full path up to theta
                            ctx.strokeStyle = viz.colors.purple + '88';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var steps = Math.abs(Math.round(theta * 40));
                            for (var i = 0; i <= steps; i++) {
                                var t = theta * i / steps;
                                var [sx, sy] = viz.toScreen(Math.cos(t), Math.sin(t));
                                if (i === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Labels
                            viz.drawText('cos\u03B8', x / 2, -0.2, viz.colors.teal, 12);
                            viz.drawText('sin\u03B8', x + 0.25, y / 2, viz.colors.orange, 12);
                            viz.drawText('e^{i\u03B8}', x + 0.15, y + 0.18, viz.colors.blue, 13);

                            // Info
                            viz.screenText('\u03B8 = ' + theta.toFixed(2) + ' rad', viz.width / 2, 16, viz.colors.yellow, 13);
                            viz.screenText('e^{i\u03B8} = ' + x.toFixed(3) + ' + ' + y.toFixed(3) + 'i', viz.width / 2, 36, viz.colors.blue, 12);
                            viz.screenText('cos\u03B8 = ' + x.toFixed(3) + '     sin\u03B8 = ' + y.toFixed(3), viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-roots-of-unity',
                    title: 'Roots of Unity',
                    description: 'The nth roots of unity form a regular n-gon on the unit circle. Slide n to see the pattern. Notice: their sum is always 0 (the centroid is the origin).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420, scale: 100
                        });

                        var n = 5;
                        VizEngine.createSlider(controls, 'n', 2, 12, n, 1, function(v) {
                            n = Math.round(v);
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Unit circle
                            viz.drawCircle(0, 0, 1, null, viz.colors.text + '44', 1);

                            // Draw polygon
                            var points = [];
                            for (var k = 0; k < n; k++) {
                                var angle = 2 * Math.PI * k / n;
                                points.push([Math.cos(angle), Math.sin(angle)]);
                            }

                            // Draw polygon edges
                            for (var k = 0; k < n; k++) {
                                var next = (k + 1) % n;
                                viz.drawSegment(points[k][0], points[k][1], points[next][0], points[next][1], viz.colors.purple + '88', 1.5);
                            }

                            // Draw radii and points
                            var rootColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.green, viz.colors.purple, viz.colors.red, viz.colors.yellow, viz.colors.pink, viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.green];
                            for (var k = 0; k < n; k++) {
                                var x = points[k][0], y = points[k][1];
                                var col = rootColors[k % rootColors.length];
                                viz.drawSegment(0, 0, x, y, col + '55', 1, true);
                                viz.drawPoint(x, y, col, '\u03C9' + (k > 0 ? '\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079'.charAt(k) || k : '\u2070'), 5);
                            }

                            // Title
                            viz.screenText(n + 'th roots of unity: z' + '\u207F'.replace('\u207F', '') + ' = 1', viz.width / 2, 16, viz.colors.white, 14);

                            // Show sum = 0
                            var sumX = 0, sumY = 0;
                            for (var k = 0; k < n; k++) { sumX += points[k][0]; sumY += points[k][1]; }
                            viz.screenText('\u03A3 \u03C9\u1D4F = ' + sumX.toFixed(6) + ' + ' + sumY.toFixed(6) + 'i \u2248 0', viz.width / 2, viz.height - 12, viz.colors.teal, 11);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-de-moivre',
                    title: 'De Moivre\'s Theorem',
                    description: 'See how raising (cos\u03B8 + i sin\u03B8) to the nth power multiplies the angle by n. Adjust n and \u03B8 to explore.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420, scale: 80
                        });

                        var nVal = 3;
                        var theta = 0.5;

                        VizEngine.createSlider(controls, 'n', 1, 8, nVal, 1, function(v) { nVal = Math.round(v); });
                        VizEngine.createSlider(controls, '\u03B8', 0, 6.28, theta, 0.01, function(v) { theta = v; });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Unit circle
                            viz.drawCircle(0, 0, 1, null, viz.colors.text + '33', 1);

                            // Original point
                            var x1 = Math.cos(theta), y1 = Math.sin(theta);
                            viz.drawVector(0, 0, x1, y1, viz.colors.blue, 'z');

                            // Draw all intermediate powers
                            for (var k = 2; k <= nVal; k++) {
                                var xk = Math.cos(k * theta), yk = Math.sin(k * theta);
                                var alpha = 0.3 + 0.7 * (k / nVal);
                                var col = k === nVal ? viz.colors.orange : viz.colors.teal;
                                viz.drawSegment(0, 0, xk, yk, col + Math.round(alpha * 99).toString(16).padStart(2, '0'), 1.5, k < nVal);
                                viz.drawPoint(xk, yk, col, 'z' + '\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078'.charAt(k-1), 4);
                            }

                            // Angle arcs
                            var [ox, oy] = viz.toScreen(0, 0);
                            // Original angle
                            ctx.strokeStyle = viz.colors.blue + '88';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.arc(ox, oy, 20, 0, -theta, theta > 0);
                            ctx.stroke();

                            // Result angle
                            var nTheta = nVal * theta;
                            ctx.strokeStyle = viz.colors.orange + '88';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(ox, oy, 30, 0, -nTheta, nTheta > 0);
                            ctx.stroke();

                            // Info
                            viz.screenText('z = e^{i\u00B7' + theta.toFixed(2) + '}', 120, 16, viz.colors.blue, 13);
                            viz.screenText('z' + '\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078'.charAt(nVal-1) + ' = e^{i\u00B7' + (nVal * theta).toFixed(2) + '}', 400, 16, viz.colors.orange, 13);
                            viz.screenText('\u03B8 = ' + theta.toFixed(2) + ' rad     n\u03B8 = ' + (nVal * theta).toFixed(2) + ' rad', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use De Moivre\'s theorem to derive formulas for \\(\\cos(3\\theta)\\) and \\(\\sin(3\\theta)\\) in terms of \\(\\cos\\theta\\) and \\(\\sin\\theta\\).',
                    hint: 'Expand \\((\\cos\\theta + i\\sin\\theta)^3\\) using the binomial theorem, then match real and imaginary parts.',
                    solution: '\\((c + is)^3 = c^3 + 3c^2(is) + 3c(is)^2 + (is)^3 = (c^3 - 3cs^2) + i(3c^2s - s^3)\\) where \\(c = \\cos\\theta, s = \\sin\\theta\\). By De Moivre, this equals \\(\\cos(3\\theta) + i\\sin(3\\theta)\\). So \\(\\cos(3\\theta) = \\cos^3\\theta - 3\\cos\\theta\\sin^2\\theta = 4\\cos^3\\theta - 3\\cos\\theta\\) and \\(\\sin(3\\theta) = 3\\cos^2\\theta\\sin\\theta - \\sin^3\\theta = 3\\sin\\theta - 4\\sin^3\\theta\\).'
                },
                {
                    question: 'Find all five 5th roots of \\(-1\\).',
                    hint: 'Write \\(-1 = e^{i\\pi}\\) and find \\(z^5 = e^{i\\pi}\\).',
                    solution: 'The 5th roots are \\(z_k = e^{i(\\pi + 2\\pi k)/5}\\) for \\(k = 0,1,2,3,4\\), i.e., \\(e^{i\\pi/5}, e^{i3\\pi/5}, e^{i\\pi} = -1, e^{i7\\pi/5}, e^{i9\\pi/5}\\). These are 5 equally spaced points on the unit circle, rotated by \\(\\pi/5\\) from the standard 5th roots of unity.'
                },
                {
                    question: 'Show that \\(\\sum_{k=0}^{n-1} \\cos(2\\pi k/n) = 0\\) and \\(\\sum_{k=0}^{n-1} \\sin(2\\pi k/n) = 0\\) for \\(n \\geq 2\\).',
                    hint: 'These are the real and imaginary parts of \\(\\sum_{k=0}^{n-1} e^{2\\pi i k/n}\\). Use the geometric series formula.',
                    solution: 'Let \\(\\omega = e^{2\\pi i/n}\\). Then \\(\\sum_{k=0}^{n-1} \\omega^k = \\frac{\\omega^n - 1}{\\omega - 1} = \\frac{1-1}{\\omega-1} = 0\\) since \\(\\omega \\neq 1\\) for \\(n \\geq 2\\). Taking real and imaginary parts gives both sums equal to zero.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Topology of C
        // ================================================================
        {
            id: 'sec-topology',
            title: 'Topology of \u2102',
            content: `
<h2>Topology of \\(\\mathbb{C}\\)</h2>

<div class="env-block intuition">
    <div class="env-title">Why Topology?</div>
    <div class="env-body">
        <p>Complex analysis is not just algebra; it is profoundly geometric. The theorems of the subject (Cauchy's theorem, the residue theorem, analytic continuation) depend on the <em>shape</em> of the domains on which functions are defined. We need a precise language for "nearness," "openness," and "connectivity" in the plane.</p>
    </div>
</div>

<h3>Open and Closed Sets</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Open Disk)</div>
    <div class="env-body">
        <p>The <strong>open disk</strong> of radius \\(r > 0\\) centered at \\(z_0\\) is</p>
        \\[D(z_0, r) = \\{z \\in \\mathbb{C} : |z - z_0| < r\\}.\\]
        <p>The <strong>closed disk</strong> is \\(\\overline{D}(z_0, r) = \\{z : |z - z_0| \\leq r\\}\\), and the <strong>circle</strong> is \\(C(z_0, r) = \\{z : |z - z_0| = r\\}\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Open Set)</div>
    <div class="env-body">
        <p>A set \\(U \\subseteq \\mathbb{C}\\) is <strong>open</strong> if for every \\(z \\in U\\), there exists \\(\\varepsilon > 0\\) such that \\(D(z, \\varepsilon) \\subseteq U\\). Equivalently, every point of \\(U\\) is an interior point.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Closed Set, Boundary)</div>
    <div class="env-body">
        <p>A set \\(F \\subseteq \\mathbb{C}\\) is <strong>closed</strong> if its complement \\(\\mathbb{C} \\setminus F\\) is open. The <strong>boundary</strong> \\(\\partial U\\) of a set \\(U\\) is the set of points \\(z\\) such that every disk \\(D(z, \\varepsilon)\\) intersects both \\(U\\) and \\(\\mathbb{C} \\setminus U\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>The open disk \\(D(0, 1)\\) is open (as the name suggests). Its boundary is the unit circle \\(\\{|z| = 1\\}\\). The closed disk \\(\\overline{D}(0, 1)\\) is closed. The set \\(\\mathbb{C} \\setminus \\{0\\}\\) (the "punctured plane") is open.</p>
    </div>
</div>

<h3>Connected and Simply Connected Sets</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Connected)</div>
    <div class="env-body">
        <p>An open set \\(U\\) is <strong>connected</strong> if it cannot be written as the union of two disjoint nonempty open sets. Equivalently, any two points in \\(U\\) can be joined by a polygonal path lying entirely in \\(U\\).</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Simply Connected)</div>
    <div class="env-body">
        <p>A connected open set \\(U\\) is <strong>simply connected</strong> if every closed curve in \\(U\\) can be continuously shrunk to a point within \\(U\\). Informally, \\(U\\) has "no holes."</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition (Domain)</div>
    <div class="env-body">
        <p>A <strong>domain</strong> (or <strong>region</strong>) in \\(\\mathbb{C}\\) is a nonempty, connected, open set. Most theorems in complex analysis are stated for functions defined on domains.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Examples</div>
    <div class="env-body">
        <ul>
            <li>The open disk \\(D(0,1)\\) is simply connected.</li>
            <li>The annulus \\(\\{z : 1 < |z| < 2\\}\\) is connected but <strong>not</strong> simply connected (a loop around the origin cannot be shrunk to a point).</li>
            <li>\\(\\mathbb{C} \\setminus \\{0\\}\\) is connected but not simply connected.</li>
            <li>\\(\\mathbb{C} \\setminus (-\\infty, 0]\\) (the plane with the negative real axis removed) is simply connected.</li>
        </ul>
    </div>
</div>

<h3>Compact Sets</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Bounded, Compact)</div>
    <div class="env-body">
        <p>A set \\(S \\subseteq \\mathbb{C}\\) is <strong>bounded</strong> if \\(S \\subseteq D(0, R)\\) for some \\(R > 0\\). A set is <strong>compact</strong> if it is both closed and bounded. By the Heine-Borel theorem, a subset of \\(\\mathbb{C}\\) is compact if and only if every open cover has a finite subcover.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-topology-demo"></div>
`,
            visualizations: [
                {
                    id: 'viz-topology-demo',
                    title: 'Topology of the Complex Plane',
                    description: 'Explore open disks, annuli, and connectivity. Toggle between examples to see open sets, closed sets, boundaries, and the difference between simply connected and non-simply connected domains.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 420, scale: 70
                        });

                        var example = 0;
                        var examples = ['Open disk', 'Closed disk', 'Annulus', 'Punctured plane', 'Slit plane'];

                        VizEngine.createButton(controls, 'Open disk', function() { example = 0; });
                        VizEngine.createButton(controls, 'Closed disk', function() { example = 1; });
                        VizEngine.createButton(controls, 'Annulus', function() { example = 2; });
                        VizEngine.createButton(controls, 'Punctured plane', function() { example = 3; });
                        VizEngine.createButton(controls, 'Slit plane', function() { example = 4; });

                        var zd = viz.addDraggable('probe', 0.5, 0.5, viz.colors.yellow, 6);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            var zx = zd.x, zy = zd.y;
                            var dist = Math.sqrt(zx * zx + zy * zy);
                            var inside = false;
                            var label = '';
                            var props = '';

                            if (example === 0) {
                                // Open disk D(0, 2)
                                viz.drawCircle(0, 0, 2, viz.colors.blue + '22', viz.colors.blue, 2);
                                // Boundary is dashed
                                ctx.setLineDash([6, 4]);
                                var [ox, oy] = viz.toScreen(0, 0);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(ox, oy, 2 * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                // Re-fill interior
                                ctx.fillStyle = viz.colors.blue + '22';
                                ctx.beginPath();
                                ctx.arc(ox, oy, 2 * viz.scale, 0, Math.PI * 2);
                                ctx.fill();
                                inside = dist < 2;
                                label = 'D(0, 2) = {z : |z| < 2}';
                                props = 'Open, connected, simply connected, bounded';
                            } else if (example === 1) {
                                // Closed disk
                                viz.drawCircle(0, 0, 2, viz.colors.teal + '22', viz.colors.teal, 2);
                                inside = dist <= 2;
                                label = 'D\u0305(0, 2) = {z : |z| \u2264 2}';
                                props = 'Closed, connected, simply connected, compact';
                            } else if (example === 2) {
                                // Annulus
                                var [ox, oy] = viz.toScreen(0, 0);
                                // Outer boundary
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(ox, oy, 2 * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();
                                // Inner boundary
                                ctx.beginPath();
                                ctx.arc(ox, oy, 1 * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();
                                // Fill annulus region
                                ctx.fillStyle = viz.colors.purple + '22';
                                ctx.beginPath();
                                ctx.arc(ox, oy, 2 * viz.scale, 0, Math.PI * 2);
                                ctx.arc(ox, oy, 1 * viz.scale, 0, Math.PI * 2, true);
                                ctx.fill();
                                inside = dist > 1 && dist < 2;
                                label = '{z : 1 < |z| < 2}';
                                props = 'Open, connected, NOT simply connected';
                            } else if (example === 3) {
                                // Punctured plane: C \ {0}
                                ctx.fillStyle = viz.colors.green + '11';
                                ctx.fillRect(0, 0, viz.width, viz.height);
                                // Mark the puncture
                                var [ox, oy] = viz.toScreen(0, 0);
                                ctx.fillStyle = viz.colors.bg;
                                ctx.beginPath();
                                ctx.arc(ox, oy, 4, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(ox, oy, 5, 0, Math.PI * 2);
                                ctx.stroke();
                                inside = dist > 0.001;
                                label = '\u2102 \\ {0}';
                                props = 'Open, connected, NOT simply connected, unbounded';
                            } else if (example === 4) {
                                // Slit plane: C \ (-inf, 0]
                                ctx.fillStyle = viz.colors.orange + '11';
                                ctx.fillRect(0, 0, viz.width, viz.height);
                                // Draw the slit (negative real axis)
                                var [ox, oy] = viz.toScreen(0, 0);
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(0, oy);
                                ctx.lineTo(ox, oy);
                                ctx.stroke();
                                // Mark origin as removed
                                ctx.fillStyle = viz.colors.bg;
                                ctx.beginPath();
                                ctx.arc(ox, oy, 4, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(ox, oy, 5, 0, Math.PI * 2);
                                ctx.stroke();
                                inside = !(zx <= 0 && Math.abs(zy) < 0.001);
                                label = '\u2102 \\ (\u2212\u221E, 0]';
                                props = 'Open, connected, simply connected, unbounded';
                            }

                            // Probe point
                            viz.drawPoint(zx, zy, inside ? viz.colors.green : viz.colors.red, null, 6);

                            // If inside, show an epsilon disk around probe
                            if (inside && example <= 2) {
                                var eps;
                                if (example === 0) eps = Math.max(0.05, 2 - dist);
                                else if (example === 1) eps = Math.max(0.05, 2 - dist);
                                else eps = Math.max(0.05, Math.min(dist - 1, 2 - dist));
                                eps = Math.min(eps, 0.5);
                                viz.drawCircle(zx, zy, eps, viz.colors.yellow + '22', viz.colors.yellow + '66', 1);
                                viz.drawText('\u03B5', zx + eps + 0.08, zy + 0.08, viz.colors.yellow, 10);
                            }

                            viz.drawDraggables();

                            // Labels
                            viz.screenText(label, viz.width / 2, 16, viz.colors.white, 14);
                            viz.screenText(props, viz.width / 2, 36, viz.colors.teal, 11);

                            var statusText = inside ? 'Probe is INSIDE the set' : 'Probe is OUTSIDE the set';
                            var statusColor = inside ? viz.colors.green : viz.colors.red;
                            viz.screenText(statusText, viz.width / 2, viz.height - 30, statusColor, 12);
                            viz.screenText('|z| = ' + dist.toFixed(3), viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the union of any collection of open sets is open, and the intersection of finitely many open sets is open.',
                    hint: 'For the union: if \\(z\\) is in the union, it is in at least one open set. For the intersection: take the minimum of the finitely many \\(\\varepsilon\\) values.',
                    solution: 'Union: If \\(z \\in \\bigcup_\\alpha U_\\alpha\\), then \\(z \\in U_\\beta\\) for some \\(\\beta\\), so \\(D(z,\\varepsilon) \\subseteq U_\\beta \\subseteq \\bigcup_\\alpha U_\\alpha\\) for some \\(\\varepsilon > 0\\). Intersection: If \\(z \\in \\bigcap_{j=1}^n U_j\\), then for each \\(j\\) there exists \\(\\varepsilon_j > 0\\) with \\(D(z,\\varepsilon_j) \\subseteq U_j\\). Set \\(\\varepsilon = \\min(\\varepsilon_1,\\ldots,\\varepsilon_n) > 0\\); then \\(D(z,\\varepsilon) \\subseteq \\bigcap_j U_j\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: The Riemann Sphere
        // ================================================================
        {
            id: 'sec-riemann-sphere',
            title: 'The Riemann Sphere',
            content: `
<h2>The Riemann Sphere</h2>

<div class="env-block intuition">
    <div class="env-title">Taming Infinity</div>
    <div class="env-body">
        <p>In real analysis, \\(\\pm\\infty\\) are informal shorthands. In complex analysis, we can do something remarkable: add a single "point at infinity" \\(\\infty\\) to \\(\\mathbb{C}\\) and give the resulting set \\(\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}\\) a natural geometric structure. The key is <strong>stereographic projection</strong>, which identifies \\(\\hat{\\mathbb{C}}\\) with the unit sphere.</p>
    </div>
</div>

<h3>Stereographic Projection</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Stereographic Projection)</div>
    <div class="env-body">
        <p>Consider the unit sphere \\(S^2 = \\{(X, Y, Z) \\in \\mathbb{R}^3 : X^2 + Y^2 + Z^2 = 1\\}\\) and identify \\(\\mathbb{C}\\) with the plane \\(Z = 0\\) via \\(z = X + iY\\). The <strong>stereographic projection</strong> from the "north pole" \\(N = (0,0,1)\\) maps each point \\(P = (X,Y,Z) \\in S^2 \\setminus \\{N\\}\\) to the point \\(z \\in \\mathbb{C}\\) where the line \\(NP\\) intersects the plane \\(Z = 0\\):</p>
        \\[z = \\frac{X + iY}{1 - Z}.\\]
        <p>The inverse mapping is:</p>
        \\[(X, Y, Z) = \\left(\\frac{2\\operatorname{Re}(z)}{|z|^2+1}, \\frac{2\\operatorname{Im}(z)}{|z|^2+1}, \\frac{|z|^2-1}{|z|^2+1}\\right).\\]
    </div>
</div>

<p>Under this identification, the north pole corresponds to \\(\\infty\\). Points near \\(N\\) correspond to points with large \\(|z|\\), while points near the south pole correspond to points near \\(z = 0\\).</p>

<h3>The Extended Complex Plane</h3>

<div class="env-block definition">
    <div class="env-title">Definition (Extended Complex Plane)</div>
    <div class="env-body">
        <p>The <strong>extended complex plane</strong> (or <strong>Riemann sphere</strong>) is \\(\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}\\), equipped with the topology inherited from \\(S^2\\) via stereographic projection. A neighborhood of \\(\\infty\\) is any set containing \\(\\{z : |z| > R\\} \\cup \\{\\infty\\}\\) for some \\(R > 0\\).</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.7 (Properties of Stereographic Projection)</div>
    <div class="env-body">
        <ol>
            <li>Stereographic projection is a <strong>conformal</strong> (angle-preserving) map.</li>
            <li>Circles and lines in \\(\\mathbb{C}\\) correspond to circles on \\(S^2\\). (Lines are "circles through \\(\\infty\\).")</li>
            <li>The chordal metric \\(d(z, w) = \\frac{2|z-w|}{\\sqrt{1+|z|^2}\\sqrt{1+|w|^2}}\\) extends to \\(\\hat{\\mathbb{C}}\\) with \\(d(z, \\infty) = \\frac{2}{\\sqrt{1+|z|^2}}\\).</li>
        </ol>
    </div>
</div>

<p>The Riemann sphere is the natural setting for meromorphic functions and Mobius transformations, which we will study in later chapters.</p>

<div class="viz-placeholder" data-viz="viz-stereographic"></div>
`,
            visualizations: [
                {
                    id: 'viz-stereographic',
                    title: 'Stereographic Projection',
                    description: 'Drag a point on the complex plane and see where it maps to on the Riemann sphere. The north pole corresponds to infinity. Points far from the origin cluster near the top of the sphere.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 460, scale: 50,
                            originX: 280, originY: 340
                        });

                        var zd = viz.addDraggable('z', 1.5, 1.0, viz.colors.blue);

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw the plane (horizontal line at bottom)
                            var planeY = 340;
                            var sphereCenterX = 280, sphereCenterY = 170;
                            var sphereR = 120;

                            // Draw the sphere (circle, side view)
                            ctx.strokeStyle = viz.colors.text + '66';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.arc(sphereCenterX, sphereCenterY, sphereR, 0, Math.PI * 2);
                            ctx.stroke();

                            // Draw equator (ellipse)
                            ctx.strokeStyle = viz.colors.text + '33';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.ellipse(sphereCenterX, sphereCenterY, sphereR, sphereR * 0.25, 0, 0, Math.PI * 2);
                            ctx.stroke();

                            // South and North pole
                            var southPoleY = sphereCenterY + sphereR;
                            var northPoleY = sphereCenterY - sphereR;

                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.arc(sphereCenterX, northPoleY, 5, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('N = \u221E', sphereCenterX + 15, northPoleY - 5, viz.colors.red, 11, 'left');

                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.arc(sphereCenterX, southPoleY, 4, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('S = 0', sphereCenterX + 12, southPoleY + 2, viz.colors.teal, 11, 'left');

                            // Draw the complex plane line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(30, planeY);
                            ctx.lineTo(530, planeY);
                            ctx.stroke();

                            // Axis ticks
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var t = -4; t <= 4; t++) {
                                var tx = sphereCenterX + t * viz.scale;
                                ctx.beginPath(); ctx.moveTo(tx, planeY - 3); ctx.lineTo(tx, planeY + 3); ctx.stroke();
                                if (t !== 0) ctx.fillText(t, tx, planeY + 5);
                            }

                            // Map z to sphere point
                            var zx = zd.x, zy = zd.y;
                            var rr = zx * zx + zy * zy;
                            // Stereographic: (X, Y, Z) = (2Re/(|z|^2+1), 2Im/(|z|^2+1), (|z|^2-1)/(|z|^2+1))
                            var SX = 2 * zx / (rr + 1);
                            var SY = 2 * zy / (rr + 1);
                            var SZ = (rr - 1) / (rr + 1);

                            // Side view of sphere: we project (SX, SY, SZ) onto a 2D view.
                            // Use a simple view: x-axis horizontal, z-axis vertical
                            // The "horizontal" component on screen is SX (real direction)
                            // We also tilt slightly to show depth via SY
                            var viewX = sphereCenterX + SX * sphereR + SY * sphereR * 0.15;
                            var viewY = sphereCenterY - SZ * sphereR;

                            // Draw the projection line from N through sphere point to plane
                            var planeScreenX = sphereCenterX + zx * viz.scale;
                            ctx.strokeStyle = viz.colors.yellow + '66';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.moveTo(sphereCenterX, northPoleY);
                            ctx.lineTo(planeScreenX, planeY);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Point on sphere
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath();
                            ctx.arc(viewX, viewY, 6, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('P', viewX + 10, viewY - 5, viz.colors.purple, 11, 'left');

                            // Point on plane
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(planeScreenX, planeY, 6, 0, Math.PI * 2);
                            ctx.fill();

                            viz.drawDraggables();

                            // Info
                            var sign = zy >= 0 ? '+' : '\u2212';
                            viz.screenText('z = ' + zx.toFixed(2) + ' ' + sign + ' ' + Math.abs(zy).toFixed(2) + 'i     |z| = ' + Math.sqrt(rr).toFixed(3), viz.width / 2, 16, viz.colors.blue, 13);
                            viz.screenText('Sphere: (' + SX.toFixed(3) + ', ' + SY.toFixed(3) + ', ' + SZ.toFixed(3) + ')', viz.width / 2, 36, viz.colors.purple, 12);

                            // Chordal distance to infinity
                            var chordalInf = 2 / Math.sqrt(1 + rr);
                            viz.screenText('d(z, \u221E) = ' + chordalInf.toFixed(3), viz.width / 2, viz.height - 12, viz.colors.text, 11);
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the stereographic projection formula \\(z = (X+iY)/(1-Z)\\) and its inverse are consistent: substitute the inverse into the forward formula and check you get \\(z\\) back.',
                    hint: 'Substitute \\(X = 2\\operatorname{Re}(z)/(|z|^2+1)\\), etc., into \\((X+iY)/(1-Z)\\).',
                    solution: 'Substituting: \\(X + iY = 2z/(|z|^2+1)\\) and \\(1 - Z = 1 - (|z|^2-1)/(|z|^2+1) = 2/(|z|^2+1)\\). So \\((X+iY)/(1-Z) = [2z/(|z|^2+1)] / [2/(|z|^2+1)] = z\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Under stereographic projection, where does the unit circle \\(|z| = 1\\) map to on the sphere?',
                    hint: 'Compute \\(Z\\) when \\(|z| = 1\\).',
                    solution: 'When \\(|z| = 1\\), \\(Z = (|z|^2-1)/(|z|^2+1) = 0\\). So the unit circle maps to the equator of the sphere, \\(\\{(X,Y,0) : X^2 + Y^2 = 1\\}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead</h2>

<p>We have assembled the foundations. \\(\\mathbb{C}\\) is a field with a rich geometry: addition is translation, multiplication is rotation-with-scaling, and the complex plane carries a natural topology. The Riemann sphere \\(\\hat{\\mathbb{C}}\\) gives us a compact setting in which "infinity" is a point like any other.</p>

<p>What comes next is the heart of the subject: <strong>holomorphic functions</strong>, the complex-differentiable functions on domains in \\(\\mathbb{C}\\). The remarkable fact, which has no analogue in real analysis, is that complex differentiability is an extremely strong condition. A single complex derivative implies:</p>

<ul>
    <li>The function is infinitely differentiable (smooth).</li>
    <li>The function is analytic (equals its Taylor series locally).</li>
    <li>The function satisfies the Cauchy-Riemann equations, linking the real and imaginary parts.</li>
    <li>The function is determined (up to constants) by its values on any curve.</li>
</ul>

<p>This rigidity makes complex analysis simultaneously more powerful and more surprising than real analysis. In the next chapter, we begin with limits and continuity in \\(\\mathbb{C}\\), building toward the definition of the complex derivative.</p>

<div class="env-block remark">
    <div class="env-title">A Taste of What Is to Come</div>
    <div class="env-body">
        <p>Consider the function \\(f(z) = z^2\\). In Cartesian form, \\(f(x+iy) = (x^2 - y^2) + 2xyi\\). The real part \\(u = x^2 - y^2\\) and imaginary part \\(v = 2xy\\) satisfy</p>
        \\[\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y} = 2x, \\qquad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x} = -2y.\\]
        <p>These are the <strong>Cauchy-Riemann equations</strong>. Every complex-differentiable function satisfies them, and the consequences are profound.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: []
        }
    ]
});
