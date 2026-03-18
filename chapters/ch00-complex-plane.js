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
    <div class="env-title">The Unavoidable Square Root</div>
    <div class="env-body">
        <p>In 1545, Gerolamo Cardano published his formula for solving cubic equations \\(x^3 + px + q = 0\\). It worked beautifully for many cases. But for the equation \\(x^3 - 15x - 4 = 0\\), his formula produced intermediate terms involving \\(\\sqrt{-121}\\). The equation has three real solutions (\\(x = 4, -2 \\pm \\sqrt{3}\\)), yet the path to those solutions passes through "impossible" square roots. You cannot avoid them. This was the first hint that \\(\\sqrt{-1}\\) was not just a curiosity, but a necessity.</p>
    </div>
</div>

<p>The real numbers \\(\\mathbb{R}\\) are in many ways complete. They can represent any point on a line, any ratio, any limit of rationals. Yet one simple polynomial equation they cannot solve is \\(x^2 + 1 = 0\\). No real number squares to \\(-1\\).</p>

<p>This is not merely an inconvenience. The <em>Fundamental Theorem of Algebra</em> — a central theorem of this course — states that every polynomial of degree \\(n\\) with complex coefficients has exactly \\(n\\) roots in \\(\\mathbb{C}\\) (counting multiplicity). For this to hold, we need a number system larger than \\(\\mathbb{R}\\).</p>

<h3>The Cubic and the Birth of \\(i\\)</h3>

<p>Cardano's formula for \\(x^3 + px + q = 0\\) gives</p>
\\[
x = \\sqrt[3]{-\\tfrac{q}{2} + \\sqrt{\\tfrac{q^2}{4} + \\tfrac{p^3}{27}}} + \\sqrt[3]{-\\tfrac{q}{2} - \\sqrt{\\tfrac{q^2}{4} + \\tfrac{p^3}{27}}}.
\\]

<p>When the discriminant \\(\\Delta = \\tfrac{q^2}{4} + \\tfrac{p^3}{27}\\) is negative (the "casus irreducibilis"), both cube-root terms involve square roots of negative numbers, yet the sum is real. Rafael Bombelli in 1572 showed how to make sense of this by treating \\(\\sqrt{-1}\\) as a formal symbol that obeys the usual rules of algebra, plus \\(i^2 = -1\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition 0.1 (Complex Numbers)</div>
    <div class="env-body">
        <p>The <strong>complex numbers</strong> \\(\\mathbb{C}\\) are expressions of the form</p>
        \\[z = a + bi, \\quad a, b \\in \\mathbb{R},\\]
        <p>where \\(i\\) is a symbol satisfying \\(i^2 = -1\\). We call \\(a = \\operatorname{Re}(z)\\) the <strong>real part</strong> and \\(b = \\operatorname{Im}(z)\\) the <strong>imaginary part</strong>. Two complex numbers are equal if and only if their real and imaginary parts are both equal.</p>
    </div>
</div>

<p>The word "imaginary" is historical and slightly unfortunate: complex numbers are no less real (in the philosophical sense) than negative numbers or irrationals. They are simply elements of a larger, two-dimensional number system.</p>

<h3>Why the Plane?</h3>

<p>Writing \\(z = a + bi\\) pairs a complex number with a point \\((a, b)\\) in the plane. This is not just a notational trick. Addition of complex numbers becomes vector addition in the plane. Multiplication introduces rotation and scaling. The geometry of the plane and the algebra of complex numbers become two languages describing the same structure.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note: The Argand Diagram</div>
    <div class="env-body">
        <p>The geometric interpretation was independently discovered by Caspar Wessel (1799), Jean-Robert Argand (1806), and Carl Friedrich Gauss (who used it extensively but published later). Gauss legitimized complex numbers by calling them <em>complex numbers of the second kind</em> and demonstrating their indispensability for number theory. The plane representation is still called the <em>Argand diagram</em>.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-complex-arithmetic"></div>
`,
            visualizations: [
                {
                    id: 'viz-complex-arithmetic',
                    title: 'Argand Diagram: Addition and Multiplication',
                    description: 'Drag z\u2081 (blue) and z\u2082 (teal) to explore. Toggle between addition (parallelogram law) and multiplication (rotation + scaling). The result is shown in orange.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });

                        var z1 = { x: 2, y: 1 };
                        var z2 = { x: 1, y: 2 };
                        var mode = 'add';

                        var modeBtn = VizEngine.createButton(controls, 'Mode: Addition', function() {
                            mode = (mode === 'add') ? 'mul' : 'add';
                            modeBtn.textContent = 'Mode: ' + (mode === 'add' ? 'Addition' : 'Multiplication');
                            draw();
                        });

                        var d1 = viz.addDraggable('z1', z1.x, z1.y, viz.colors.blue, 8, function(x, y) {
                            z1.x = x; z1.y = y; draw();
                        });
                        var d2 = viz.addDraggable('z2', z2.x, z2.y, viz.colors.teal, 8, function(x, y) {
                            z2.x = x; z2.y = y; draw();
                        });

                        function complexMul(a, b, c, d) { return [a*c - b*d, a*d + b*c]; }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var ax = d1.x, ay = d1.y;
                            var bx = d2.x, by = d2.y;

                            if (mode === 'add') {
                                // Parallelogram
                                var rx = ax + bx, ry = ay + by;
                                ctx.strokeStyle = viz.colors.blue + '33';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4,4]);
                                var [sx1,sy1] = viz.toScreen(ax,ay), [sx2,sy2] = viz.toScreen(bx,by);
                                var [srx,sry] = viz.toScreen(rx,ry);
                                ctx.beginPath(); ctx.moveTo(sx2,sy2); ctx.lineTo(srx,sry); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(sx1,sy1); ctx.lineTo(srx,sry); ctx.stroke();
                                ctx.setLineDash([]);

                                viz.drawVector(0, 0, ax, ay, viz.colors.blue, 'z\u2081', 2.5);
                                viz.drawVector(0, 0, bx, by, viz.colors.teal, 'z\u2082', 2.5);
                                viz.drawVector(0, 0, rx, ry, viz.colors.orange, 'z\u2081+z\u2082', 2.5);

                                viz.screenText(
                                    'z\u2081 = ' + ax.toFixed(2) + ' + ' + ay.toFixed(2) + 'i   ' +
                                    'z\u2082 = ' + bx.toFixed(2) + ' + ' + by.toFixed(2) + 'i   ' +
                                    'Sum = ' + rx.toFixed(2) + ' + ' + ry.toFixed(2) + 'i',
                                    viz.width/2, viz.height - 18, viz.colors.white, 11
                                );
                            } else {
                                var [rx2, ry2] = complexMul(ax, ay, bx, by);
                                var r1 = Math.sqrt(ax*ax+ay*ay), r2 = Math.sqrt(bx*bx+by*by);
                                var rr = r1*r2;
                                var arg1 = Math.atan2(ay,ax), arg2 = Math.atan2(by,bx);
                                var argr = arg1+arg2;

                                // Draw angle arcs
                                ctx.strokeStyle = viz.colors.blue + '55';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.arc(viz.originX, viz.originY, 28, -arg1, 0, arg1 < 0);
                                ctx.stroke();
                                ctx.strokeStyle = viz.colors.teal + '55';
                                ctx.beginPath();
                                ctx.arc(viz.originX, viz.originY, 20, -arg2, 0, arg2 < 0);
                                ctx.stroke();

                                viz.drawVector(0, 0, ax, ay, viz.colors.blue, 'z\u2081', 2.5);
                                viz.drawVector(0, 0, bx, by, viz.colors.teal, 'z\u2082', 2.5);
                                viz.drawVector(0, 0, rx2, ry2, viz.colors.orange, 'z\u2081\u00B7z\u2082', 2.5);

                                viz.screenText(
                                    '|z\u2081|=' + r1.toFixed(2) + '  |z\u2082|=' + r2.toFixed(2) + '  |product|=' + rr.toFixed(2) +
                                    '  \u2220z\u2081=' + (arg1*180/Math.PI).toFixed(1) + '\u00B0  \u2220z\u2082=' + (arg2*180/Math.PI).toFixed(1) + '\u00B0  \u2220product=' + (argr*180/Math.PI).toFixed(1) + '\u00B0',
                                    viz.width/2, viz.height - 18, viz.colors.white, 10
                                );
                            }

                            viz.drawDraggables();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify Cardano\'s formula for \\(x^3 - 15x - 4 = 0\\): the formula gives \\(x = \\sqrt[3]{2 + 11i} + \\sqrt[3]{2 - 11i}\\). Show that if \\(\\sqrt[3]{2+11i} = 2+i\\), then \\(x = 4\\) is a solution.',
                    hint: 'Compute \\((2+i)^3\\) directly. Then add \\((2+i) + (2-i)\\).',
                    solution: '\\((2+i)^3 = 8 + 12i + 6i^2 + i^3 = 8 + 12i - 6 - i = 2 + 11i\\). So \\(\\sqrt[3]{2+11i} = 2+i\\) and \\(\\sqrt[3]{2-11i} = 2-i\\). Their sum is \\((2+i)+(2-i) = 4\\). Check: \\(4^3 - 15(4) - 4 = 64 - 60 - 4 = 0\\). \\(\\checkmark\\)'
                },
                {
                    question: 'Are \\(3 + 4i\\) and \\(4 + 3i\\) equal? What is the real part and imaginary part of each?',
                    hint: 'Two complex numbers are equal iff both real and imaginary parts match.',
                    solution: 'No. \\(\\operatorname{Re}(3+4i) = 3\\), \\(\\operatorname{Im}(3+4i) = 4\\); \\(\\operatorname{Re}(4+3i) = 4\\), \\(\\operatorname{Im}(4+3i) = 3\\). Since the real parts differ, \\(3+4i \\ne 4+3i\\).'
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
    <div class="env-title">The Key Insight</div>
    <div class="env-body">
        <p>Complex arithmetic is just polynomial arithmetic with the single rule \\(i^2 = -1\\). You already know how to add, multiply, and factor polynomials. Apply those rules to expressions \\(a + bi\\), replace \\(i^2\\) by \\(-1\\) whenever it appears, and you have complex arithmetic. Nothing more is required.</p>
    </div>
</div>

<h3>Addition and Subtraction</h3>

<p>Addition is component-wise:</p>
\\[
(a+bi) + (c+di) = (a+c) + (b+d)i.
\\]

<p>Geometrically, this is vector addition in the plane: the sum \\(z_1 + z_2\\) is the fourth vertex of the parallelogram with adjacent sides \\(z_1\\) and \\(z_2\\).</p>

<h3>Multiplication</h3>

<p>Multiplication follows the distributive law with \\(i^2 = -1\\):</p>
\\[
(a+bi)(c+di) = ac + adi + bci + bdi^2 = (ac - bd) + (ad+bc)i.
\\]

<div class="env-block example">
    <div class="env-title">Example</div>
    <div class="env-body">
        <p>\\((2+3i)(1-i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i.\\)</p>
    </div>
</div>

<h3>Complex Conjugate</h3>

<div class="env-block definition">
    <div class="env-title">Definition 0.2 (Complex Conjugate)</div>
    <div class="env-body">
        <p>The <strong>complex conjugate</strong> of \\(z = a + bi\\) is \\(\\bar{z} = a - bi\\). It reflects \\(z\\) across the real axis.</p>
    </div>
</div>

<p>Key properties: \\(\\overline{z+w} = \\bar{z}+\\bar{w}\\), \\(\\overline{zw} = \\bar{z}\\bar{w}\\), \\(z+\\bar{z} = 2\\operatorname{Re}(z)\\), \\(z\\bar{z} = a^2+b^2 \\geq 0\\).</p>

<h3>Modulus (Absolute Value)</h3>

<div class="env-block definition">
    <div class="env-title">Definition 0.3 (Modulus)</div>
    <div class="env-body">
        <p>The <strong>modulus</strong> (or absolute value) of \\(z = a+bi\\) is</p>
        \\[|z| = \\sqrt{a^2 + b^2} = \\sqrt{z\\bar{z}}.\\]
        <p>It is the Euclidean distance from \\(z\\) to the origin.</p>
    </div>
</div>

<p>The modulus satisfies \\(|zw| = |z||w|\\) and \\(|z/w| = |z|/|w|\\) (for \\(w \\ne 0\\)).</p>

<h3>Division</h3>

<p>To divide, multiply numerator and denominator by the conjugate of the denominator:</p>
\\[
\\frac{a+bi}{c+di} = \\frac{(a+bi)(c-di)}{(c+di)(c-di)} = \\frac{(ac+bd) + (bc-ad)i}{c^2+d^2}.
\\]

<h3>Triangle Inequality</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.1 (Triangle Inequality)</div>
    <div class="env-body">
        <p>For any \\(z, w \\in \\mathbb{C}\\),</p>
        \\[|z + w| \\leq |z| + |w|.\\]
        <p>Equality holds if and only if \\(z\\) and \\(w\\) point in the same direction, i.e., \\(w = tz\\) for some \\(t \\geq 0\\).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof</div>
    <div class="env-body">
        <p>We have \\(|z+w|^2 = (z+w)\\overline{(z+w)} = z\\bar{z} + z\\bar{w} + \\bar{z}w + w\\bar{w} = |z|^2 + 2\\operatorname{Re}(z\\bar{w}) + |w|^2\\). Since \\(\\operatorname{Re}(\\xi) \\leq |\\xi|\\) for any \\(\\xi\\), we get \\(|z+w|^2 \\leq |z|^2 + 2|z\\bar{w}| + |w|^2 = (|z|+|w|)^2\\). Taking square roots gives the result. \\(\\square\\)</p>
    </div>
</div>

<p>A useful variant is the <em>reverse triangle inequality</em>: \\(\\big||z|-|w|\\big| \\leq |z-w|\\).</p>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Compute \\((3-2i)^2\\) and \\(\\frac{1+i}{1-i}\\).',
                    hint: 'For the quotient, multiply top and bottom by \\(1+i\\).',
                    solution: '\\((3-2i)^2 = 9 - 12i + 4i^2 = 9 - 12i - 4 = 5 - 12i\\). For the quotient: \\(\\frac{(1+i)^2}{(1-i)(1+i)} = \\frac{1+2i-1}{1+1} = \\frac{2i}{2} = i\\).'
                },
                {
                    question: 'Show that \\(|z_1 z_2| = |z_1||z_2|\\) for all \\(z_1, z_2 \\in \\mathbb{C}\\).',
                    hint: 'Use \\(|z|^2 = z\\bar{z}\\) and the property \\(\\overline{z_1 z_2} = \\bar{z}_1\\bar{z}_2\\).',
                    solution: '\\(|z_1 z_2|^2 = (z_1 z_2)\\overline{(z_1 z_2)} = z_1 z_2 \\bar{z}_1 \\bar{z}_2 = (z_1\\bar{z}_1)(z_2\\bar{z}_2) = |z_1|^2|z_2|^2\\). Taking square roots: \\(|z_1 z_2| = |z_1||z_2|\\). \\(\\square\\)'
                },
                {
                    question: 'Prove the reverse triangle inequality: \\(\\big||z|-|w|\\big| \\leq |z-w|\\).',
                    hint: 'Apply the triangle inequality to \\(z = (z-w) + w\\).',
                    solution: 'By the triangle inequality, \\(|z| = |(z-w)+w| \\leq |z-w|+|w|\\), so \\(|z|-|w| \\leq |z-w|\\). By symmetry (swap \\(z\\) and \\(w\\)), \\(|w|-|z| \\leq |w-z| = |z-w|\\). Combining: \\(\\big||z|-|w|\\big| \\leq |z-w|\\). \\(\\square\\)'
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
    <div class="env-title">Numbers as Points, Multiplication as Rotation</div>
    <div class="env-body">
        <p>Every complex number is a point in the plane. The real axis is the \\(x\\)-axis; the imaginary axis is the \\(y\\)-axis. But unlike ordinary coordinates, there is an algebraic structure on these points: multiplication by \\(i\\) rotates any point by \\(90^\\circ\\) counterclockwise. This single fact explains why complex numbers are tailor-made for studying angles and rotations.</p>
    </div>
</div>

<h3>The Argand Diagram</h3>

<p>We identify \\(z = a+bi\\) with the point \\((a,b)\\) in the <strong>complex plane</strong> (also called the <strong>Argand diagram</strong>). The horizontal axis is the <em>real axis</em> and the vertical axis is the <em>imaginary axis</em>.</p>

<h3>Polar Form</h3>

<p>Every nonzero complex number can be written in polar form using its distance from the origin (modulus) and its angle from the positive real axis (argument):</p>

<div class="env-block definition">
    <div class="env-title">Definition 0.4 (Polar Form)</div>
    <div class="env-body">
        <p>For \\(z = a+bi \\ne 0\\), write \\(a = r\\cos\\theta\\) and \\(b = r\\sin\\theta\\) where \\(r = |z| \\geq 0\\) and \\(\\theta = \\arg z\\). Then</p>
        \\[z = r(\\cos\\theta + i\\sin\\theta).\\]
        <p>The angle \\(\\theta\\) is determined up to multiples of \\(2\\pi\\). The <strong>principal argument</strong> \\(\\operatorname{Arg}(z)\\) takes values in \\((-\\pi, \\pi]\\).</p>
    </div>
</div>

<p>Polar form makes multiplication transparent:</p>
\\[
r_1(\\cos\\theta_1+i\\sin\\theta_1) \\cdot r_2(\\cos\\theta_2+i\\sin\\theta_2) = r_1 r_2 (\\cos(\\theta_1+\\theta_2)+i\\sin(\\theta_1+\\theta_2)).
\\]

<p>Multiplying two complex numbers: <strong>multiply the moduli, add the arguments</strong>. In particular, multiplying by \\(e^{i\\alpha}\\) (a unit complex number at angle \\(\\alpha\\)) is pure rotation by \\(\\alpha\\).</p>

<div class="viz-placeholder" data-viz="viz-polar-form"></div>
`,
            visualizations: [
                {
                    id: 'viz-polar-form',
                    title: 'Polar Form and Argument',
                    description: 'Drag z to any position. The visualization shows |z|, arg(z), and the polar decomposition. Watch the argument sweep as you move z around the origin.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });
                        var zpt = viz.addDraggable('z', 2, 1.5, viz.colors.blue, 9, function() { draw(); });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var x = zpt.x, y = zpt.y;
                            var r = Math.sqrt(x*x + y*y);
                            var theta = Math.atan2(y, x);
                            var deg = theta * 180 / Math.PI;

                            // Angle arc
                            if (r > 0.05) {
                                ctx.strokeStyle = viz.colors.yellow + 'aa';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(viz.originX, viz.originY, 34, -theta, 0, theta < 0);
                                ctx.stroke();

                                // Angle label
                                var midA = theta / 2;
                                var lx = viz.originX + 48 * Math.cos(midA);
                                var ly = viz.originY - 48 * Math.sin(midA);
                                viz.screenText('\u03b8', lx, ly, viz.colors.yellow, 13);
                            }

                            // Dashed lines for real and imaginary components
                            ctx.strokeStyle = viz.colors.blue + '55';
                            ctx.lineWidth = 1; ctx.setLineDash([4,3]);
                            var [sx, sy] = viz.toScreen(x, y);
                            var [sx0, sy0] = viz.toScreen(x, 0);
                            var [sx1, sy1] = viz.toScreen(0, y);
                            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx0, sy0); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx1, sy1); ctx.stroke();
                            ctx.setLineDash([]);

                            // Modulus line
                            viz.drawVector(0, 0, x, y, viz.colors.blue, 'z', 2.5);

                            // Labels on axes
                            viz.drawPoint(x, 0, viz.colors.teal, null, 4);
                            viz.drawText('a='+x.toFixed(2), x, -0.35, viz.colors.teal, 11);
                            viz.drawPoint(0, y, viz.colors.orange, null, 4);
                            ctx.fillStyle = viz.colors.orange; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            var [,slby] = viz.toScreen(0,y);
                            ctx.fillText('b='+y.toFixed(2), viz.originX + 6, slby);

                            viz.drawDraggables();

                            viz.screenText(
                                '|z| = ' + r.toFixed(3) + '   arg(z) = ' + deg.toFixed(1) + '\u00b0' +
                                '   z = ' + r.toFixed(2) + '(cos ' + deg.toFixed(1) + '\u00b0 + i\u00b7sin ' + deg.toFixed(1) + '\u00b0)',
                                viz.width/2, viz.height - 18, viz.colors.white, 11
                            );
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Convert \\(z = -1 + i\\) to polar form. What is \\(|z|\\) and \\(\\operatorname{Arg}(z)\\)?',
                    hint: 'Plot the point \\((-1,1)\\) and use \\(\\tan\\theta = b/a\\) carefully, noting which quadrant you are in.',
                    solution: '\\(|z| = \\sqrt{(-1)^2 + 1^2} = \\sqrt{2}\\). The point is in the second quadrant (negative real, positive imaginary), so \\(\\operatorname{Arg}(z) = \\pi - \\arctan(1) = \\pi - \\pi/4 = 3\\pi/4\\). Thus \\(z = \\sqrt{2}(\\cos(3\\pi/4) + i\\sin(3\\pi/4))\\).'
                },
                {
                    question: 'Use polar form to compute \\((1+i)^8\\).',
                    hint: 'First convert \\(1+i\\) to polar form, then raise modulus to the 8th power and multiply the argument by 8.',
                    solution: '\\(1+i = \\sqrt{2}\\,e^{i\\pi/4}\\). Then \\((1+i)^8 = (\\sqrt{2})^8 e^{i\\cdot 8\\cdot\\pi/4} = 16 e^{2\\pi i} = 16 \\cdot 1 = 16\\).'
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
    <div class="env-title">The Most Beautiful Formula in Mathematics</div>
    <div class="env-body">
        <p>Euler's formula \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\) unifies exponentials and trigonometry. At \\(\\theta = \\pi\\) it gives \\(e^{i\\pi} + 1 = 0\\), linking \\(e\\), \\(i\\), \\(\\pi\\), \\(0\\), and \\(1\\) in a single equation. But more practically: it turns the cumbersome rules for multiplying sines and cosines into a single, elegant rule for multiplying exponentials.</p>
    </div>
</div>

<h3>Euler's Formula</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.2 (Euler's Formula)</div>
    <div class="env-body">
        <p>For all \\(\\theta \\in \\mathbb{R}\\),</p>
        \\[e^{i\\theta} = \\cos\\theta + i\\sin\\theta.\\]
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Derivation (via Power Series)</div>
    <div class="env-body">
        <p>Define \\(e^z = \\sum_{n=0}^\\infty z^n/n!\\) for complex \\(z\\). Substituting \\(z = i\\theta\\) and separating real and imaginary parts using \\(i^{2k} = (-1)^k\\):</p>
        \\[e^{i\\theta} = \\sum_{k=0}^\\infty \\frac{(i\\theta)^n}{n!} = \\underbrace{\\sum_{k=0}^\\infty \\frac{(-1)^k \\theta^{2k}}{(2k)!}}_{\\cos\\theta} + i\\underbrace{\\sum_{k=0}^\\infty \\frac{(-1)^k \\theta^{2k+1}}{(2k+1)!}}_{\\sin\\theta}.\\]
    </div>
</div>

<p>With Euler's formula, every complex number writes as \\(z = re^{i\\theta}\\), and multiplication becomes:</p>
\\[r_1 e^{i\\theta_1} \\cdot r_2 e^{i\\theta_2} = r_1 r_2 \\, e^{i(\\theta_1+\\theta_2)}.\\]

<h3>De Moivre's Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 0.3 (De Moivre)</div>
    <div class="env-body">
        <p>For \\(n \\in \\mathbb{Z}\\) and \\(\\theta \\in \\mathbb{R}\\),</p>
        \\[(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta).\\]
    </div>
</div>

<p>This is immediate from Euler's formula: \\((e^{i\\theta})^n = e^{in\\theta}\\). It is a powerful tool for deriving trigonometric identities.</p>

<h3>Roots of Unity</h3>

<p>The equation \\(z^n = 1\\) has exactly \\(n\\) solutions in \\(\\mathbb{C}\\):</p>
\\[
z_k = e^{2\\pi i k/n} = \\cos\\frac{2\\pi k}{n} + i\\sin\\frac{2\\pi k}{n}, \\quad k = 0, 1, \\ldots, n-1.
\\]

<p>These are the <strong>\\(n\\)th roots of unity</strong>. They lie on the unit circle, equally spaced at angles \\(2\\pi/n\\) apart, forming a regular \\(n\\)-gon.</p>

<div class="viz-placeholder" data-viz="viz-euler-formula"></div>
<div class="viz-placeholder" data-viz="viz-roots-of-unity"></div>
`,
            visualizations: [
                {
                    id: 'viz-euler-formula',
                    title: "Euler's Formula: e^{i\u03b8} on the Unit Circle",
                    description: 'Drag the \u03b8 slider. The point e^{i\u03b8} traces the unit circle. The real part (cos \u03b8) and imaginary part (sin \u03b8) are shown as projections.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 80 });
                        var theta = 0.8;

                        VizEngine.createSlider(controls, '\u03b8 (rad)', -Math.PI, Math.PI, theta, 0.01, function(v) {
                            theta = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var cx = Math.cos(theta), cy = Math.sin(theta);

                            // Unit circle
                            viz.drawCircle(0, 0, 1, null, viz.colors.axis + 'aa', 1.5);

                            // Filled arc
                            ctx.fillStyle = viz.colors.yellow + '22';
                            ctx.beginPath();
                            ctx.moveTo(viz.originX, viz.originY);
                            ctx.arc(viz.originX, viz.originY, viz.scale, -theta, 0, theta < 0);
                            ctx.closePath(); ctx.fill();

                            // cos/sin dashed lines
                            ctx.setLineDash([4,3]);
                            ctx.strokeStyle = viz.colors.teal + 'aa'; ctx.lineWidth = 1.5;
                            var [sx, sy] = viz.toScreen(cx, cy);
                            var [sx0, sy0] = viz.toScreen(cx, 0);
                            var [sx1, sy1] = viz.toScreen(0, cy);
                            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx0, sy0); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx1, sy1); ctx.stroke();
                            ctx.setLineDash([]);

                            // Projections on axes
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 3;
                            var [ox,oy] = viz.toScreen(0,0);
                            ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(sx0,sy0); ctx.stroke();
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(sx1,sy1); ctx.stroke();

                            // Labels
                            viz.screenText('cos\u03b8', (ox + sx0)/2, sy0 + 16, viz.colors.teal, 12);
                            viz.screenText('sin\u03b8', sx1 - 36, (oy + sy1)/2, viz.colors.orange, 12);

                            viz.drawVector(0, 0, cx, cy, viz.colors.blue, 'e^{i\u03b8}', 2.5);
                            viz.drawDraggables();

                            // Angle label
                            var midA = theta/2;
                            var lx = viz.originX + 50 * Math.cos(midA);
                            var ly = viz.originY - 50 * Math.sin(midA);
                            viz.screenText('\u03b8', lx, ly, viz.colors.yellow, 13);

                            viz.screenText(
                                '\u03b8 = ' + theta.toFixed(3) + ' rad = ' + (theta*180/Math.PI).toFixed(1) + '\u00b0' +
                                '   cos\u03b8 = ' + cx.toFixed(3) + '   sin\u03b8 = ' + cy.toFixed(3),
                                viz.width/2, viz.height - 18, viz.colors.white, 11
                            );
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-roots-of-unity',
                    title: 'nth Roots of Unity',
                    description: 'Adjust n to see the nth roots of unity. They lie evenly spaced on the unit circle, forming a regular n-gon.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 85 });
                        var n = 6;

                        VizEngine.createSlider(controls, 'n', 2, 12, n, 1, function(v) {
                            n = Math.round(v); draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            viz.drawCircle(0, 0, 1, null, viz.colors.axis + '88', 1.5);

                            var ctx = viz.ctx;
                            var pts = [];
                            for (var k = 0; k < n; k++) {
                                var ang = 2 * Math.PI * k / n;
                                pts.push([Math.cos(ang), Math.sin(ang)]);
                            }

                            // Polygon
                            ctx.strokeStyle = viz.colors.purple + '88'; ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            var [sx0,sy0] = viz.toScreen(pts[0][0], pts[0][1]);
                            ctx.moveTo(sx0,sy0);
                            for (var j = 1; j < n; j++) {
                                var [sxj, syj] = viz.toScreen(pts[j][0], pts[j][1]);
                                ctx.lineTo(sxj, syj);
                            }
                            ctx.closePath(); ctx.stroke();
                            ctx.fillStyle = viz.colors.purple + '18'; ctx.fill();

                            // Points and labels
                            for (var k = 0; k < n; k++) {
                                var ang = 2 * Math.PI * k / n;
                                var px = Math.cos(ang), py = Math.sin(ang);
                                viz.drawPoint(px, py, viz.colors.yellow, null, 5);
                                var lx = viz.originX + (viz.scale + 20) * Math.cos(ang);
                                var ly = viz.originY - (viz.scale + 20) * Math.sin(ang);
                                ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText('k=' + k, lx, ly);
                            }

                            viz.screenText(
                                'z^' + n + ' = 1   \u2192  ' + n + ' roots:  z_k = e^{2\u03c0ik/' + n + '}, k = 0,...,' + (n-1),
                                viz.width/2, viz.height - 18, viz.colors.white, 11
                            );
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use de Moivre\'s theorem to derive the double-angle formulas: \\(\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta\\) and \\(\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta\\).',
                    hint: 'Expand \\((\\cos\\theta + i\\sin\\theta)^2\\) directly and compare real and imaginary parts with \\(\\cos(2\\theta) + i\\sin(2\\theta)\\).',
                    solution: '\\((\\cos\\theta+i\\sin\\theta)^2 = \\cos^2\\theta + 2i\\cos\\theta\\sin\\theta + i^2\\sin^2\\theta = (\\cos^2\\theta - \\sin^2\\theta) + i(2\\sin\\theta\\cos\\theta)\\). By de Moivre, this equals \\(\\cos(2\\theta) + i\\sin(2\\theta)\\). Equating real and imaginary parts gives the formulas. \\(\\square\\)'
                },
                {
                    question: 'Find all cube roots of \\(-8\\).',
                    hint: 'Write \\(-8 = 8e^{i\\pi}\\) and find three values of \\(z = 2e^{i(\\pi + 2\\pi k)/3}\\) for \\(k=0,1,2\\).',
                    solution: 'We need \\(z^3 = -8 = 8e^{i\\pi}\\). So \\(z = 2e^{i(\\pi/3 + 2\\pi k/3)}\\) for \\(k=0,1,2\\). The three roots are: \\(k=0\\): \\(2e^{i\\pi/3} = 1+i\\sqrt{3}\\); \\(k=1\\): \\(2e^{i\\pi} = -2\\); \\(k=2\\): \\(2e^{i5\\pi/3} = 1-i\\sqrt{3}\\).'
                },
                {
                    question: 'Verify Euler\'s formula at \\(\\theta = \\pi/2\\) and \\(\\theta = \\pi\\).',
                    hint: 'Substitute into \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\) and evaluate.',
                    solution: 'At \\(\\theta=\\pi/2\\): \\(e^{i\\pi/2} = \\cos(\\pi/2)+i\\sin(\\pi/2) = 0 + i\\cdot 1 = i\\). Check: \\(i^2=-1=e^{i\\pi}\\). At \\(\\theta=\\pi\\): \\(e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1 + 0 = -1\\), giving the famous identity \\(e^{i\\pi}+1=0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Topology of the Complex Plane
        // ================================================================
        {
            id: 'sec-topology',
            title: 'Topology of the Complex Plane',
            content: `
<h2>Topology of the Complex Plane</h2>

<div class="env-block intuition">
    <div class="env-title">Why Topology?</div>
    <div class="env-body">
        <p>Complex analysis is profoundly sensitive to the shape of the domain. A function that is analytic on a disk behaves very differently from one analytic on an annulus. Contour integration depends on whether a closed curve can be contracted to a point. Before studying functions, we must understand what kinds of regions they live on. Topology gives us the vocabulary: open, closed, connected, simply connected.</p>
    </div>
</div>

<h3>Open Disks and Neighborhoods</h3>

<div class="env-block definition">
    <div class="env-title">Definition 0.5 (Open Disk)</div>
    <div class="env-body">
        <p>The <strong>open disk</strong> of radius \\(r > 0\\) centered at \\(z_0\\) is</p>
        \\[D(z_0, r) = \\{z \\in \\mathbb{C} : |z - z_0| < r\\}.\\]
        <p>It is also called the <strong>\\(r\\)-neighborhood</strong> of \\(z_0\\).</p>
    </div>
</div>

<h3>Open and Closed Sets</h3>

<div class="env-block definition">
    <div class="env-title">Definition 0.6 (Open and Closed Sets)</div>
    <div class="env-body">
        <p>A set \\(U \\subseteq \\mathbb{C}\\) is <strong>open</strong> if for every \\(z \\in U\\) there exists \\(r > 0\\) such that \\(D(z, r) \\subseteq U\\). Every point of an open set has an entire neighborhood contained in the set.</p>
        <p>A set \\(F\\) is <strong>closed</strong> if its complement \\(\\mathbb{C} \\setminus F\\) is open, equivalently, if \\(F\\) contains all its limit points.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Examples</div>
    <div class="env-body">
        <ul>
            <li>\\(D(z_0, r)\\) (open disk) is open.</li>
            <li>\\(\\bar{D}(z_0, r) = \\{z : |z-z_0| \\leq r\\}\\) (closed disk) is closed.</li>
            <li>The upper half-plane \\(\\{z : \\operatorname{Im}(z) > 0\\}\\) is open.</li>
            <li>\\(\\mathbb{C}\\) itself and \\(\\emptyset\\) are both open and closed ("clopen").</li>
        </ul>
    </div>
</div>

<h3>Boundary, Interior, Closure</h3>

<p>The <strong>interior</strong> of a set \\(S\\) is the largest open set contained in \\(S\\). The <strong>closure</strong> \\(\\overline{S}\\) is the smallest closed set containing \\(S\\) (equivalently, \\(S\\) together with all its limit points). The <strong>boundary</strong> \\(\\partial S = \\overline{S} \\setminus \\operatorname{int}(S)\\).</p>

<h3>Connected and Simply Connected Sets</h3>

<div class="env-block definition">
    <div class="env-title">Definition 0.7 (Connected and Simply Connected)</div>
    <div class="env-body">
        <p>An open set \\(U\\) is <strong>connected</strong> if it cannot be written as the disjoint union of two nonempty open sets. Equivalently, any two points in \\(U\\) can be joined by a polygonal path lying entirely in \\(U\\).</p>
        <p>A connected open set \\(U\\) is <strong>simply connected</strong> if every closed curve in \\(U\\) can be continuously deformed (within \\(U\\)) to a point. Informally: \\(U\\) has no holes.</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Why Simple Connectivity Matters</div>
    <div class="env-body">
        <p>Cauchy's theorem (Chapter 4) will state that for an analytic function \\(f\\), \\(\\oint_\\gamma f(z)\\,dz = 0\\) for every closed curve \\(\\gamma\\) in a simply connected domain. This fails on an annulus (which has a hole): the integral of \\(1/z\\) around the unit circle is \\(2\\pi i \\ne 0\\). The topology of the domain controls the integration theory.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 0.8 (Domain)</div>
    <div class="env-body">
        <p>A <strong>domain</strong> in complex analysis is a nonempty, connected, open subset of \\(\\mathbb{C}\\). Most functions we study will be defined on domains.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-topology-demo"></div>
`,
            visualizations: [
                {
                    id: 'viz-topology-demo',
                    title: 'Topology Demo: Open Disks and Connectedness',
                    description: 'Click to place open disks (neighborhoods). Toggle mode to see connected vs. disconnected regions. Use Clear to reset.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 50 });
                        var disks = [];
                        var showConnected = false;

                        VizEngine.createButton(controls, 'Toggle Connected', function() {
                            showConnected = !showConnected; draw();
                        });
                        VizEngine.createButton(controls, 'Clear', function() {
                            disks = []; draw();
                        });

                        viz.canvas.addEventListener('click', function(e) {
                            var r = viz.canvas.getBoundingClientRect();
                            var cx = e.clientX - r.left, cy = e.clientY - r.top;
                            var [mx, my] = viz.toMath(cx, cy);
                            disks.push({ x: mx, y: my, r: 0.7 });
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            for (var k = 0; k < disks.length; k++) {
                                var d = disks[k];
                                // Dashed boundary circle
                                ctx.strokeStyle = viz.colors.blue + 'cc';
                                ctx.lineWidth = 1.5; ctx.setLineDash([5,3]);
                                ctx.beginPath();
                                var [scx,scy] = viz.toScreen(d.x, d.y);
                                ctx.arc(scx, scy, d.r * viz.scale, 0, Math.PI*2);
                                ctx.stroke(); ctx.setLineDash([]);

                                ctx.fillStyle = viz.colors.blue + '22';
                                ctx.beginPath();
                                ctx.arc(scx, scy, d.r * viz.scale, 0, Math.PI*2);
                                ctx.fill();

                                // Center point (open = no filled center)
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(scx, scy, 4, 0, Math.PI*2);
                                ctx.stroke();

                                ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                                ctx.fillText('D(' + d.x.toFixed(1) + '+' + d.y.toFixed(1) + 'i, 0.7)', scx, scy - 8);
                            }

                            if (showConnected && disks.length > 1) {
                                // Check pairwise overlap and draw connecting lines
                                for (var a = 0; a < disks.length; a++) {
                                    for (var b = a+1; b < disks.length; b++) {
                                        var da = disks[a], db = disks[b];
                                        var dist = Math.sqrt((da.x-db.x)**2 + (da.y-db.y)**2);
                                        if (dist < da.r + db.r) {
                                            var [sax,say] = viz.toScreen(da.x,da.y);
                                            var [sbx,sby] = viz.toScreen(db.x,db.y);
                                            ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                            ctx.beginPath(); ctx.moveTo(sax,say); ctx.lineTo(sbx,sby); ctx.stroke();
                                        }
                                    }
                                }
                                viz.screenText('Green lines = overlapping disks (connected region)', viz.width/2, viz.height-18, viz.colors.green, 11);
                            } else {
                                viz.screenText('Click to place open disks. Toggle to check connectivity.', viz.width/2, viz.height-18, viz.colors.text, 11);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Is the set \\(\\{z \\in \\mathbb{C} : 1 < |z| < 2\\}\\) (an open annulus) open? Connected? Simply connected?',
                    hint: 'For any point in the annulus, can you find a small open disk contained in the annulus? Can every closed curve be contracted to a point?',
                    solution: 'Open: yes, for any point \\(z\\) with \\(1 < |z| < 2\\), take \\(r = \\min(|z|-1, 2-|z|)/2 > 0\\); then \\(D(z,r)\\) lies in the annulus. Connected: yes, any two points can be joined by a path staying between the two circles. Simply connected: no. The curve \\(\\gamma(t) = 1.5 e^{it}\\) (a circle of radius 1.5) cannot be contracted to a point while staying in the annulus, because the origin (a hole) is excluded.'
                },
                {
                    question: 'Describe the boundary and closure of \\(D(0,1) = \\{z : |z| < 1\\}\\).',
                    hint: 'A point is a limit point of \\(D(0,1)\\) if every neighborhood of it intersects \\(D(0,1)\\).',
                    solution: 'The closure is \\(\\bar{D}(0,1) = \\{z : |z| \\leq 1\\}\\) (the closed unit disk). The boundary is \\(\\partial D(0,1) = \\{z : |z| = 1\\}\\) (the unit circle). Every point on the unit circle is a limit point of the open disk, since any neighborhood of such a point contains points both inside and outside the disk.'
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
    <div class="env-title">Compactifying the Plane</div>
    <div class="env-body">
        <p>The complex plane has a defect: it has no "point at infinity." Sequences like \\(z_n = n\\) diverge, but they go "off the edge" of the plane in a perfectly definite direction. It would be geometrically cleaner to wrap the plane up into a sphere and declare that all sequences diverging to infinity converge to a single point, the <em>north pole</em>. This is the Riemann sphere, and it makes the extended complex plane into a compact space with no boundary.</p>
    </div>
</div>

<h3>Stereographic Projection</h3>

<p>Take the unit sphere \\(S^2 = \\{(X,Y,Z) \\in \\mathbb{R}^3 : X^2+Y^2+Z^2 = 1\\}\\). Place the complex plane as the equatorial plane \\(Z = 0\\), identifying \\(z = x+iy\\) with \\((x,y,0)\\). The <strong>north pole</strong> is \\(N = (0,0,1)\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition 0.9 (Stereographic Projection)</div>
    <div class="env-body">
        <p>For \\(z \\in \\mathbb{C}\\), the stereographic projection \\(\\phi: \\mathbb{C} \\to S^2 \\setminus \\{N\\}\\) maps \\(z = x+iy\\) to the unique point where the line through \\(N\\) and \\((x,y,0)\\) intersects the sphere:</p>
        \\[
        \\phi(z) = \\left(\\frac{2x}{|z|^2+1},\\ \\frac{2y}{|z|^2+1},\\ \\frac{|z|^2-1}{|z|^2+1}\\right).
        \\]
        <p>The inverse sends \\((X,Y,Z) \\mapsto \\frac{X+iY}{1-Z}\\) for \\(Z \\ne 1\\).</p>
    </div>
</div>

<p>As \\(|z| \\to \\infty\\), \\(\\phi(z) \\to N = (0,0,1)\\). This motivates:</p>

<div class="env-block definition">
    <div class="env-title">Definition 0.10 (Extended Complex Plane)</div>
    <div class="env-body">
        <p>The <strong>extended complex plane</strong> (or <strong>Riemann sphere</strong>) is \\(\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}\\), where \\(\\infty\\) corresponds to the north pole \\(N\\). It is homeomorphic to \\(S^2\\).</p>
    </div>
</div>

<h3>Properties of the Riemann Sphere</h3>

<ul>
    <li><strong>Compact:</strong> \\(\\hat{\\mathbb{C}}\\) has no boundary and every sequence has a convergent subsequence.</li>
    <li><strong>Circles go to circles:</strong> Stereographic projection sends circles and lines in \\(\\mathbb{C}\\) to circles on \\(S^2\\) (lines in \\(\\mathbb{C}\\) are circles through \\(\\infty\\)).</li>
    <li><strong>Conformal:</strong> Stereographic projection preserves angles.</li>
    <li><strong>Symmetry:</strong> The antipodal point to \\(z\\) on the sphere corresponds to \\(-1/\\bar{z}\\) in \\(\\hat{\\mathbb{C}}\\).</li>
</ul>

<div class="env-block remark">
    <div class="env-title">Role in Complex Analysis</div>
    <div class="env-body">
        <p>The Riemann sphere is the natural domain for Mobius transformations (Chapter 2), which are bijections \\(\\hat{\\mathbb{C}} \\to \\hat{\\mathbb{C}}\\). It also clarifies the behavior of functions "at infinity": the function \\(f(z) = 1/z\\) extends continuously to \\(\\hat{\\mathbb{C}}\\) by setting \\(f(0) = \\infty\\) and \\(f(\\infty) = 0\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-stereographic"></div>
`,
            visualizations: [
                {
                    id: 'viz-stereographic',
                    title: 'Stereographic Projection',
                    description: 'Drag the point z on the complex plane (bottom). Its image on the Riemann sphere (wireframe) is shown. Points far from the origin map near the north pole.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 1 });
                        var zx = 1.2, zy = 0.8;

                        var dz = viz.addDraggable('z', zx, zy, viz.colors.blue, 8, function(x,y) {
                            zx = x; zy = y; draw();
                        });

                        // We'll do a 2D side-view approximation:
                        // Sphere center at screen (280, 180), radius 100px
                        // Plane at y=360 (screen), center at (280, 360), scale 60px/unit
                        var SC = { x: 280, y: 170, r: 100 };
                        var PL = { y: 370, cx: 280, scale: 55 };

                        // Override draggable bounds to plane region
                        viz.draggables = [];
                        var planeDrag = { id:'z', x: zx, y: 0, screenX: PL.cx + zx*PL.scale, screenY: PL.y, color: viz.colors.blue, radius: 9, onDrag: null };

                        viz.canvas.addEventListener('mousedown', function(e) {
                            var r = viz.canvas.getBoundingClientRect();
                            var px = e.clientX - r.left, py = e.clientY - r.top;
                            if (Math.abs(py - PL.y) < 20) {
                                viz._planeDragging = true;
                                zx = (px - PL.cx) / PL.scale;
                                draw();
                            }
                        });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!viz._planeDragging) return;
                            var r = viz.canvas.getBoundingClientRect();
                            var px = e.clientX - r.left;
                            zx = (px - PL.cx) / PL.scale;
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { viz._planeDragging = false; });
                        viz.canvas.addEventListener('mouseleave', function() { viz._planeDragging = false; });

                        function draw() {
                            var ctx = viz.ctx;
                            ctx.fillStyle = viz.colors.bg;
                            ctx.fillRect(0,0,viz.width,viz.height);

                            // Draw sphere wireframe (circle)
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.arc(SC.x, SC.y, SC.r, 0, Math.PI*2); ctx.stroke();

                            // Equator (dashed)
                            ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 1; ctx.setLineDash([4,3]);
                            ctx.beginPath(); ctx.ellipse(SC.x, SC.y, SC.r, SC.r*0.25, 0, 0, Math.PI*2); ctx.stroke();
                            ctx.setLineDash([]);

                            // North pole
                            var Nx = SC.x, Ny = SC.y - SC.r;
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath(); ctx.arc(Nx, Ny, 5, 0, Math.PI*2); ctx.fill();
                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText('N = \u221e', Nx, Ny - 6);

                            // Complex plane line
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(0, PL.y); ctx.lineTo(viz.width, PL.y); ctx.stroke();

                            // Tick marks on plane
                            ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var t = -4; t <= 4; t++) {
                                var tx = PL.cx + t * PL.scale;
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(tx, PL.y-4); ctx.lineTo(tx, PL.y+4); ctx.stroke();
                                if (t !== 0) ctx.fillText(t, tx, PL.y + 6);
                            }
                            ctx.fillText('Re(z)', viz.width - 25, PL.y + 6);

                            // Plane label
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            ctx.fillText('\u2102  (complex plane)', 8, PL.y - 12);

                            // z on plane
                            var zpx = PL.cx + zx * PL.scale, zpy = PL.y;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(zpx, zpy, 8, 0, Math.PI*2); ctx.fill();
                            ctx.fillStyle = viz.colors.blue; ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText('z = ' + zx.toFixed(2), zpx, zpy - 10);

                            // Stereographic map (side view, Im=0 for simplicity)
                            // phi(x) = (2x/(x^2+1), 0, (x^2-1)/(x^2+1))
                            var rr2 = zx*zx;
                            var sX = 2*zx/(rr2+1);
                            var sZ = (rr2-1)/(rr2+1);
                            // Map sphere coords to screen
                            var spx = SC.x + sX * SC.r;
                            var spy = SC.y - sZ * SC.r;

                            // Line from N through z to sphere
                            ctx.strokeStyle = viz.colors.yellow + 'aa'; ctx.lineWidth = 1.5; ctx.setLineDash([5,3]);
                            ctx.beginPath(); ctx.moveTo(Nx, Ny); ctx.lineTo(zpx, zpy); ctx.stroke();
                            ctx.setLineDash([]);

                            // Sphere point
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(spx, spy, 6, 0, Math.PI*2); ctx.fill();
                            ctx.fillStyle = viz.colors.orange; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            ctx.fillText('\u03c6(z)', spx + 9, spy);

                            ctx.fillStyle = viz.colors.white; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText(
                                '|z| = ' + Math.abs(zx).toFixed(2) + '   \u03c6(z) = (' + sX.toFixed(2) + ', 0, ' + sZ.toFixed(2) + ')   [Im(z)=0 shown]',
                                viz.width/2, viz.height - 22
                            );
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'What is the stereographic projection of \\(z = 0\\)? Of \\(z = i\\)? What happens as \\(|z| \\to \\infty\\)?',
                    hint: 'Substitute directly into the formula \\(\\phi(z) = \\left(\\frac{2x}{|z|^2+1}, \\frac{2y}{|z|^2+1}, \\frac{|z|^2-1}{|z|^2+1}\\right)\\).',
                    solution: '\\(z=0\\): \\(\\phi(0) = (0, 0, -1)\\), the south pole. \\(z=i\\) (so \\(x=0, y=1, |z|^2=1\\)): \\(\\phi(i) = (0, 1, 0)\\), a point on the equator. As \\(|z| \\to \\infty\\): all components approach \\((0, 0, 1)\\), the north pole \\(N\\). This confirms that \\(\\infty\\) maps to the north pole.'
                },
                {
                    question: 'Show that the unit circle \\(|z| = 1\\) maps to the equator \\(Z = 0\\) under stereographic projection.',
                    hint: 'For \\(|z|=1\\), what is \\(|z|^2\\)?',
                    solution: 'If \\(|z|^2 = x^2+y^2 = 1\\), then the \\(Z\\)-coordinate of \\(\\phi(z)\\) is \\(\\frac{|z|^2-1}{|z|^2+1} = \\frac{1-1}{1+1} = 0\\). So every point on the unit circle maps to the equator \\(Z = 0\\). \\(\\square\\)'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Functions on the Plane (Bridge to Ch 1)
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Functions on the Plane',
            content: `
<h2>Functions on the Plane</h2>

<div class="env-block intuition">
    <div class="env-title">Looking Ahead</div>
    <div class="env-body">
        <p>We now know what the complex plane is. The central question of complex analysis is: what does it mean for a function \\(f: \\mathbb{C} \\to \\mathbb{C}\\) to be differentiable? The answer, and its extraordinary consequences, will occupy the rest of this course. This section sets up the vocabulary and highlights how profoundly different complex differentiability is from real differentiability.</p>
    </div>
</div>

<h3>Complex-Valued Functions</h3>

<p>A function \\(f: U \\to \\mathbb{C}\\) on a domain \\(U \\subseteq \\mathbb{C}\\) can always be split into real and imaginary parts:</p>
\\[
f(z) = f(x+iy) = u(x,y) + iv(x,y),
\\]
<p>where \\(u, v: U \\to \\mathbb{R}\\) are real-valued functions of two real variables. This decomposition connects complex analysis to the theory of harmonic functions and partial differential equations.</p>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = z^2\\)</div>
    <div class="env-body">
        <p>\\(f(z) = (x+iy)^2 = x^2-y^2 + 2xyi\\). So \\(u(x,y) = x^2-y^2\\) and \\(v(x,y) = 2xy\\).</p>
    </div>
</div>

<h3>Limits and Continuity</h3>

<p>Limits and continuity for complex functions are defined exactly as for real functions, using \\(|{\\cdot}|\\) as the metric on \\(\\mathbb{C}\\):</p>
\\[
\\lim_{z \\to z_0} f(z) = L \\iff \\forall \\varepsilon > 0\\ \\exists \\delta > 0 : 0 < |z - z_0| < \\delta \\Rightarrow |f(z) - L| < \\varepsilon.
\\]

<p>The crucial difference from real analysis: in \\(\\mathbb{C}\\), \\(z\\) can approach \\(z_0\\) from infinitely many directions, not just left or right. This makes complex limits harder to satisfy, and complex differentiability a much stronger condition.</p>

<h3>What Is Complex Differentiability?</h3>

<p>The derivative of \\(f\\) at \\(z_0\\) is defined by the same limit as in real calculus:</p>
\\[
f'(z_0) = \\lim_{h \\to 0} \\frac{f(z_0+h) - f(z_0)}{h}, \\quad h \\in \\mathbb{C}.
\\]

<p>But since \\(h\\) can approach \\(0\\) from any direction, this limit is far more stringent than the real derivative. A function that is complex-differentiable at every point of a domain is called <em>analytic</em> (or <em>holomorphic</em>). Analytic functions have remarkable properties that real-differentiable functions never need to satisfy:</p>

<ul>
    <li>Being once complex-differentiable implies being infinitely differentiable.</li>
    <li>An analytic function has a convergent power series expansion at every point.</li>
    <li>An analytic function is entirely determined by its values on any curve in its domain.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">The Cauchy-Riemann Equations (Preview)</div>
    <div class="env-body">
        <p>Writing \\(f = u+iv\\), complex differentiability at \\(z_0\\) is equivalent to \\(u\\) and \\(v\\) being real-differentiable and satisfying the <strong>Cauchy-Riemann equations</strong>:</p>
        \\[\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\qquad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}.\\]
        <p>These two scalar equations encode the one complex equation \\(f'(z_0) \\text{ exists}\\). We will derive and explore this in Chapter 1.</p>
    </div>
</div>

<h3>Domain Coloring: Visualizing Complex Functions</h3>

<p>Visualizing \\(f: \\mathbb{C} \\to \\mathbb{C}\\) is nontrivial: it maps a 2D space to a 2D space, requiring 4 real dimensions to graph. <strong>Domain coloring</strong> solves this by coloring each input \\(z\\) by the argument (hue) and modulus (brightness) of \\(f(z)\\). Zeros of \\(f\\) appear as points where all colors converge; poles appear where the function blows up.</p>

<div class="env-block theorem">
    <div class="env-title">Fundamental Theorem of Algebra (Preview)</div>
    <div class="env-body">
        <p>Every non-constant polynomial \\(p(z) = a_n z^n + \\cdots + a_0\\) with \\(a_n \\ne 0\\) has exactly \\(n\\) roots in \\(\\mathbb{C}\\) (counted with multiplicity). This is why \\(\\mathbb{C}\\) is the "right" setting for polynomial equations: it is <em>algebraically closed</em>.</p>
    </div>
</div>

<div class="env-block intuition">
    <div class="env-title">What Comes Next</div>
    <div class="env-body">
        <p><strong>Chapter 1</strong> develops complex differentiability rigorously, derives the Cauchy-Riemann equations, and begins the theory of analytic functions. The definitions introduced in this chapter, open sets, domains, modulus, argument, will be used constantly from this point on.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Write \\(f(z) = z^3\\) in the form \\(u(x,y) + iv(x,y)\\). What are \\(u\\) and \\(v\\)?',
                    hint: 'Expand \\((x+iy)^3\\) using the binomial theorem.',
                    solution: '\\((x+iy)^3 = x^3 + 3x^2(iy) + 3x(iy)^2 + (iy)^3 = x^3 + 3ix^2y - 3xy^2 - iy^3 = (x^3 - 3xy^2) + i(3x^2y - y^3)\\). So \\(u(x,y) = x^3 - 3xy^2\\) and \\(v(x,y) = 3x^2y - y^3\\).'
                },
                {
                    question: 'Verify that the Cauchy-Riemann equations hold for \\(f(z) = z^2\\), i.e., for \\(u = x^2-y^2\\) and \\(v = 2xy\\).',
                    hint: 'Compute \\(\\partial u/\\partial x\\), \\(\\partial v/\\partial y\\), \\(\\partial u/\\partial y\\), \\(\\partial v/\\partial x\\) and check the two equalities.',
                    solution: '\\(\\partial u/\\partial x = 2x\\), \\(\\partial v/\\partial y = 2x\\). \\(\\checkmark\\) \\(\\partial u/\\partial y = -2y\\), \\(\\partial v/\\partial x = 2y\\), so \\(\\partial u/\\partial y = -\\partial v/\\partial x\\). \\(\\checkmark\\) Both Cauchy-Riemann equations are satisfied everywhere, confirming that \\(f(z) = z^2\\) is entire (analytic on all of \\(\\mathbb{C}\\)).'
                },
                {
                    question: 'Does \\(f(z) = \\bar{z}\\) satisfy the Cauchy-Riemann equations? Is it complex-differentiable anywhere?',
                    hint: 'Write \\(f(z) = x - iy\\), so \\(u = x\\), \\(v = -y\\). Check the Cauchy-Riemann equations.',
                    solution: '\\(\\partial u/\\partial x = 1\\), \\(\\partial v/\\partial y = -1\\). The first CR equation requires \\(1 = -1\\), which fails everywhere. So \\(f(z) = \\bar{z}\\) is nowhere complex-differentiable, despite being a perfectly smooth real function. This illustrates how much stronger complex differentiability is than real differentiability.'
                }
            ]
        }
    ]
});
