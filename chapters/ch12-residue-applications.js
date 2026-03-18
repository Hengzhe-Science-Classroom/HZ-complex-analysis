window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch12',
    number: 12,
    title: 'Applications of Residues',
    subtitle: 'Real integrals via complex detours',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Why Take a Detour Through C?',
            content: `
<h2>Why Take a Detour Through C?</h2>

<div class="env-block intuition">
    <div class="env-title">The Surprising Strategy</div>
    <div class="env-body">
        <p>Consider the integral \\(\\displaystyle\\int_{-\\infty}^{\\infty} \\frac{\\cos x}{1+x^2}\\,dx\\). Every real-variable technique &mdash; integration by parts, u-substitution, trigonometric substitution &mdash; runs into a wall. The integrand has no elementary antiderivative you can evaluate at \\(\\pm\\infty\\) without careful limit arguments.</p>
        <p>Complex analysis gives a completely different route: embed the real integral in the complex plane, close the contour, and collect residues. The answer, \\(\\pi e^{-1}\\), falls out in a few lines.</p>
    </div>
</div>

<p>The residue theorem says that the integral of a meromorphic function around a closed contour equals \\(2\\pi i\\) times the sum of enclosed residues. This is powerful for computing real integrals because:</p>
<ol>
    <li>Many real integrals can be recognized as part of a contour integral over \\(\\mathbb{C}\\).</li>
    <li>The "extra" portions of the contour (arcs at infinity, indentations around branch cuts or poles) often vanish or contribute known values.</li>
    <li>Residues are algebraically computable for rational functions, products with exponentials, and power functions.</li>
</ol>

<h3>The Residue Theorem (Recall)</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.1 (Residue Theorem)</div>
    <div class="env-body">
        <p>Let \\(f\\) be meromorphic inside and on a positively oriented simple closed contour \\(C\\), with poles at \\(z_1, \\ldots, z_n\\) inside \\(C\\). Then</p>
        \\[\\oint_C f(z)\\,dz = 2\\pi i \\sum_{k=1}^n \\operatorname{Res}(f, z_k).\\]
    </div>
</div>

<h3>Computing Residues</h3>

<p>For a simple pole at \\(z_0\\):</p>
\\[\\operatorname{Res}(f, z_0) = \\lim_{z \\to z_0} (z - z_0)f(z).\\]

<p>For a pole of order \\(m\\):</p>
\\[\\operatorname{Res}(f, z_0) = \\frac{1}{(m-1)!}\\lim_{z\\to z_0}\\frac{d^{m-1}}{dz^{m-1}}\\bigl[(z-z_0)^m f(z)\\bigr].\\]

<p>For \\(f = p/q\\) where \\(q\\) has a simple zero at \\(z_0\\) and \\(p(z_0) \\neq 0\\):</p>
\\[\\operatorname{Res}(f, z_0) = \\frac{p(z_0)}{q'(z_0)}.\\]

<h3>The Main Strategies</h3>

<div class="env-block definition">
    <div class="env-title">Contour Menu</div>
    <div class="env-body">
        <table style="width:100%;border-collapse:collapse;">
            <thead>
                <tr style="border-bottom:1px solid #30363d;">
                    <th style="text-align:left;padding:6px;">Integral type</th>
                    <th style="text-align:left;padding:6px;">Contour</th>
                    <th style="text-align:left;padding:6px;">Key lemma</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom:1px solid #1a1a40;">
                    <td style="padding:6px;">\\(\\int_0^{2\\pi} R(\\cos\\theta,\\sin\\theta)\\,d\\theta\\)</td>
                    <td style="padding:6px;">Unit circle</td>
                    <td style="padding:6px;">\\(z = e^{i\\theta}\\)</td>
                </tr>
                <tr style="border-bottom:1px solid #1a1a40;">
                    <td style="padding:6px;">\\(\\int_{-\\infty}^\\infty f(x)\\,dx\\)</td>
                    <td style="padding:6px;">Semicircle \\(C_R\\)</td>
                    <td style="padding:6px;">Estimation lemma</td>
                </tr>
                <tr style="border-bottom:1px solid #1a1a40;">
                    <td style="padding:6px;">\\(\\int_{-\\infty}^\\infty f(x)e^{iax}\\,dx\\)</td>
                    <td style="padding:6px;">Semicircle \\(C_R\\)</td>
                    <td style="padding:6px;">Jordan's lemma</td>
                </tr>
                <tr style="border-bottom:1px solid #1a1a40;">
                    <td style="padding:6px;">\\(\\int_0^\\infty x^{a-1} f(x)\\,dx\\)</td>
                    <td style="padding:6px;">Keyhole contour</td>
                    <td style="padding:6px;">Branch cut</td>
                </tr>
                <tr>
                    <td style="padding:6px;">PV integrals, poles on \\(\\mathbb{R}\\)</td>
                    <td style="padding:6px;">Indented contour</td>
                    <td style="padding:6px;">Small semicircle</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-integral-gallery"></div>
`,
            visualizations: [
                {
                    id: 'viz-integral-gallery',
                    title: 'Integral Gallery: Classic Results',
                    description: 'A gallery of the classic real integrals evaluable by residues. Select an integral to see its value and the residue computation.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 360, originX: 280, originY: 180, scale: 50 });

                        var integrals = [
                            {
                                name: '\\u222b dx/(1+x\u00b2)',
                                tex: '\u222b\u207b\u221e\u207a\u221e dx/(1+x\u00b2) = \u03c0',
                                residues: ['Pole at z=i: Res = 1/(2i)'],
                                value: Math.PI,
                                color: '#58a6ff'
                            },
                            {
                                name: '\\u222b cos(x)/(1+x\u00b2) dx',
                                tex: '\u222b\u207b\u221e\u207a\u221e cos(x)/(1+x\u00b2) dx = \u03c0/e',
                                residues: ['Pole at z=i: Res = e\u207b\u00b9/(2i)'],
                                value: Math.PI / Math.E,
                                color: '#3fb9a0'
                            },
                            {
                                name: '\\u222b dx/(1+x\u00b2)\u00b2',
                                tex: '\u222b\u207b\u221e\u207a\u221e dx/(1+x\u00b2)\u00b2 = \u03c0/2',
                                residues: ['Pole of order 2 at z=i: Res = -i/4'],
                                value: Math.PI / 2,
                                color: '#f0883e'
                            },
                            {
                                name: '\\u222b sin(x)/x dx',
                                tex: '\u222b\u207b\u221e\u207a\u221e sin(x)/x dx = \u03c0',
                                residues: ['Indented contour, no enclosed poles'],
                                value: Math.PI,
                                color: '#bc8cff'
                            },
                            {
                                name: '\\u222b x\u207b\u00bd/(1+x) dx',
                                tex: '\u222b\u2080\u207a\u221e x\u207b\u00bd/(1+x) dx = \u03c0',
                                residues: ['Keyhole contour, pole at z=-1'],
                                value: Math.PI,
                                color: '#f85149'
                            }
                        ];

                        var selected = 0;

                        var btnRow = document.createElement('div');
                        btnRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;';
                        integrals.forEach(function(itg, idx) {
                            var b = document.createElement('button');
                            b.style.cssText = 'padding:3px 10px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;cursor:pointer;';
                            b.textContent = itg.tex.split(' = ')[0];
                            b.addEventListener('click', function() { selected = idx; draw(); });
                            btnRow.appendChild(b);
                        });
                        controls.appendChild(btnRow);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var itg = integrals[selected];
                            var ctx = viz.ctx;

                            // Draw upper semicircle
                            var R = 2.5;
                            ctx.strokeStyle = itg.color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var sx0 = viz.toScreen(-R, 0)[0], sy0 = viz.toScreen(-R, 0)[1];
                            ctx.moveTo(sx0, sy0);
                            var sx1 = viz.toScreen(R, 0)[0], sy1 = viz.toScreen(R, 0)[1];
                            ctx.lineTo(sx1, sy1);
                            // Arc
                            var cxS = viz.toScreen(0, 0)[0], cyS = viz.toScreen(0, 0)[1];
                            ctx.arc(cxS, cyS, R * viz.scale, 0, Math.PI, true);
                            ctx.stroke();

                            // Residue dot at i
                            viz.drawPoint(0, 1, itg.color, 'z=i', 5);

                            // Labels
                            viz.screenText(itg.tex, viz.width / 2, 30, itg.color, 15);
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            itg.residues.forEach(function(r, i) {
                                ctx.fillStyle = itg.color;
                                ctx.fillText(r, 20, viz.height - 50 + i * 18);
                            });

                            // Value bar
                            var bx = viz.toScreen(-3, 0)[0];
                            var bxEnd = viz.toScreen(3, 0)[0];
                            var bw = bxEnd - bx;
                            var byFull = viz.toScreen(0, 0)[1];
                            var byVal = viz.toScreen(0, itg.value / Math.PI)[1];
                            ctx.fillStyle = itg.color + '33';
                            ctx.fillRect(viz.width - 60, byVal, 40, byFull - byVal);
                            ctx.strokeStyle = itg.color;
                            ctx.lineWidth = 1.5;
                            ctx.strokeRect(viz.width - 60, byVal, 40, byFull - byVal);
                            viz.screenText('= ' + itg.tex.split('= ')[1], viz.width - 40, byVal - 12, itg.color, 13);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'State the residue theorem and identify the three main ingredients needed to apply it to a real integral.',
                    hint: 'Think about: (1) what contour to close, (2) which poles are enclosed, (3) what happens on the extra arc.',
                    solution: 'The residue theorem states \\(\\oint_C f(z)\\,dz = 2\\pi i \\sum \\operatorname{Res}\\). To apply it to a real integral one needs: (1) a closed contour \\(C\\) in \\(\\mathbb{C}\\) containing the real integral as one segment; (2) computation of all residues of \\(f\\) inside \\(C\\); (3) a lemma (estimation, Jordan, or small-semicircle) showing the extra arc contributes 0 or a known value.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Trigonometric Integrals
        // ================================================================
        {
            id: 'sec-rational-trig',
            title: 'Trigonometric Integrals',
            content: `
<h2>Trigonometric Integrals</h2>

<div class="env-block intuition">
    <div class="env-title">The Unit Circle Substitution</div>
    <div class="env-body">
        <p>An integral \\(\\int_0^{2\\pi} R(\\cos\\theta,\\sin\\theta)\\,d\\theta\\) where \\(R\\) is a rational function of \\(\\cos\\theta\\) and \\(\\sin\\theta\\) looks purely real. But parameterize the unit circle by \\(z = e^{i\\theta}\\): then \\(dz = ie^{i\\theta}d\\theta = iz\\,d\\theta\\), so \\(d\\theta = dz/(iz)\\). And</p>
        \\[\\cos\\theta = \\frac{z + z^{-1}}{2}, \\qquad \\sin\\theta = \\frac{z - z^{-1}}{2i}.\\]
        <p>The integral over \\([0, 2\\pi]\\) becomes a contour integral over the unit circle \\(|z|=1\\).</p>
    </div>
</div>

<h3>Method</h3>

<div class="env-block definition">
    <div class="env-title">Algorithm (Trig Integral via Unit Circle)</div>
    <div class="env-body">
        <ol>
            <li>Substitute \\(z = e^{i\\theta}\\), \\(d\\theta = dz/(iz)\\), \\(\\cos\\theta = (z+z^{-1})/2\\), \\(\\sin\\theta = (z-z^{-1})/(2i)\\).</li>
            <li>Rewrite as \\(\\oint_{|z|=1} g(z)\\,dz\\) for some rational \\(g\\).</li>
            <li>Find poles of \\(g\\) strictly inside \\(|z| < 1\\).</li>
            <li>Apply the residue theorem: \\(I = 2\\pi i \\sum_{|z_k|<1} \\operatorname{Res}(g, z_k)\\).</li>
        </ol>
    </div>
</div>

<h3>Worked Example</h3>

<div class="env-block example">
    <div class="env-title">Example 12.1</div>
    <div class="env-body">
        <p>Compute \\(\\displaystyle I = \\int_0^{2\\pi} \\frac{d\\theta}{2 + \\cos\\theta}\\).</p>
        <p><strong>Substitution:</strong> \\(\\cos\\theta = (z + z^{-1})/2\\), \\(d\\theta = dz/(iz)\\):</p>
        \\[I = \\oint_{|z|=1} \\frac{1}{2 + (z+z^{-1})/2} \\cdot \\frac{dz}{iz} = \\oint_{|z|=1} \\frac{2\\,dz}{iz(4 + z + z^{-1})} = \\oint_{|z|=1} \\frac{2\\,dz}{i(z^2 + 4z + 1)}.\\]
        <p><strong>Poles:</strong> \\(z^2 + 4z + 1 = 0 \\Rightarrow z = -2 \\pm \\sqrt{3}\\). Only \\(z_1 = -2 + \\sqrt{3} \\approx -0.27\\) lies inside the unit disk.</p>
        <p><strong>Residue:</strong> \\(\\operatorname{Res} = \\frac{2/i}{2z_1 + 4} = \\frac{2/i}{2\\sqrt{3}} = \\frac{1}{i\\sqrt{3}}\\).</p>
        <p><strong>Result:</strong> \\(I = 2\\pi i \\cdot \\frac{1}{i\\sqrt{3}} = \\dfrac{2\\pi}{\\sqrt{3}}\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 12.2</div>
    <div class="env-body">
        <p>Compute \\(\\displaystyle \\int_0^{2\\pi} \\frac{\\cos 2\\theta}{5 - 4\\cos\\theta}\\,d\\theta\\).</p>
        <p>Write \\(\\cos 2\\theta = \\operatorname{Re}(z^2)\\) (since \\(z^2 = e^{2i\\theta}\\) on \\(|z|=1\\)). After the substitution the integrand becomes \\(\\operatorname{Re}\\) of a rational function; pick off the real part after applying residues. The result is \\(\\pi/6\\).</p>
    </div>
</div>

<h3>Key Observation</h3>

<p>This method works whenever \\(R(\\cos\\theta,\\sin\\theta)\\) has no poles on the unit circle (i.e., \\(R\\) is a well-defined integrand for all \\(\\theta\\)). The resulting rational function \\(g(z)\\) will have finitely many poles, all locatable by solving polynomial equations.</p>

<div class="viz-placeholder" data-viz="viz-trig-integral"></div>
`,
            visualizations: [
                {
                    id: 'viz-trig-integral',
                    title: 'Unit Circle Contour for Trig Integrals',
                    description: 'Watch the unit circle parameterization z = e^{i*theta} sweep out the contour as theta goes from 0 to 2pi. The pole inside the unit disk is marked; residue contributions are highlighted.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, originX: 200, originY: 190, scale: 80 });

                        var aVal = 2; // denominator constant: 1/(a + cos theta)

                        VizEngine.createSlider(controls, 'a (> 1)', 1.1, 4, aVal, 0.1, function(v) {
                            aVal = v;
                        });

                        var t = 0;
                        viz.animate(function(time) {
                            t = (time / 3000) % 1;
                            var theta = t * 2 * Math.PI;
                            var cosT = Math.cos(theta), sinT = Math.sin(theta);

                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Unit circle
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, 2 * Math.PI);
                            ctx.stroke();

                            // Poles of g(z) = 2/(i*(z^2 + 2a*z + 1))
                            // z = -a +/- sqrt(a^2-1)
                            var sq = Math.sqrt(aVal * aVal - 1);
                            var z_inner = -aVal + sq; // |z_inner| < 1 when a > 1
                            var z_outer = -aVal - sq;

                            // Draw inner pole (inside unit disk)
                            viz.drawPoint(z_inner, 0, viz.colors.orange, 'pole', 6);

                            // Draw outer pole (outside unit disk)
                            viz.drawPoint(z_outer, 0, viz.colors.red, null, 5);
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var [px, py] = viz.toScreen(z_outer, 0);
                            ctx.fillText('(outside)', px, py - 12);

                            // Rotating point on unit circle
                            viz.drawPoint(cosT, sinT, viz.colors.teal, null, 7);

                            // Line from origin to point
                            viz.drawSegment(0, 0, cosT, sinT, viz.colors.teal + '88', 1);

                            // Swept arc
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, -theta, true);
                            ctx.stroke();

                            // Angle label
                            viz.screenText('\u03b8 = ' + (theta * 180 / Math.PI).toFixed(0) + '\u00b0', viz.width - 100, 30, viz.colors.teal, 13);

                            // Info panel
                            var res = 1 / (Math.sqrt(aVal * aVal - 1));
                            var integral = 2 * Math.PI * res;
                            viz.screenText('a = ' + aVal.toFixed(2), viz.width - 120, 55, viz.colors.white, 12);
                            viz.screenText('Pole inside: z\u2080 = ' + z_inner.toFixed(3), viz.width - 120, 75, viz.colors.orange, 12);
                            viz.screenText('Res = 1/(i\u00b7' + (2 * Math.sqrt(aVal * aVal - 1)).toFixed(3) + ')', viz.width - 120, 95, viz.colors.orange, 12);
                            viz.screenText('\u222b = 2\u03c0/\u221a(a\u00b2-1) = ' + integral.toFixed(4), viz.width - 120, 115, viz.colors.green, 12);

                            viz.screenText('z = e^{i\u03b8}: cos\u03b8 = ' + cosT.toFixed(3) + ', sin\u03b8 = ' + sinT.toFixed(3), viz.width / 2 - 40, viz.height - 20, viz.colors.text, 11);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the unit circle method to compute \\(\\displaystyle\\int_0^{2\\pi} \\frac{d\\theta}{3 + \\sin\\theta}\\).',
                    hint: 'Write \\(\\sin\\theta = (z - z^{-1})/(2i)\\), substitute \\(d\\theta = dz/(iz)\\), and solve \\(z^2 + 6iz - 1 = 0\\) to find which root is inside \\(|z|<1\\).',
                    solution: 'After substitution, \\(I = \\oint_{|z|=1} \\frac{2\\,dz}{z^2 + 6iz - 1}\\). Roots: \\(z = (-6i \\pm \\sqrt{-36+4})/2 = i(-3 \\pm 2\\sqrt{2})\\). Only \\(z_0 = i(-3+2\\sqrt{2})\\) has \\(|z_0| = 3 - 2\\sqrt{2} < 1\\). Residue \\(= 2/(2z_0 + 6i) = 2/(4i\\sqrt{2}) = 1/(2i\\sqrt{2})\\). So \\(I = 2\\pi i \\cdot 1/(2i\\sqrt{2}) = \\pi/\\sqrt{2} = \\pi\\sqrt{2}/2\\).'
                },
                {
                    question: 'Compute \\(\\displaystyle\\int_0^{2\\pi} \\cos^2\\theta\\,d\\theta\\) using the residue method (even though elementary methods also work).',
                    hint: 'Write \\(\\cos^2\\theta = (z + z^{-1})^2/4\\) and expand. The integrand becomes a Laurent polynomial; only the \\(z^{-1}\\) term contributes a residue.',
                    solution: '\\(\\cos^2\\theta = (z^2 + 2 + z^{-2})/4\\). With \\(d\\theta = dz/(iz)\\), the integrand is \\((z^2+2+z^{-2})/(4iz)\\). Only the \\(z^0\\) term in the Laurent expansion (from \\(2 \\cdot z^{-1} \\cdot 1/(4i)\\)) gives a residue: \\(\\operatorname{Res}(g, 0) = 2/(4i) = 1/(2i)\\). Then \\(I = 2\\pi i \\cdot 1/(2i) = \\pi\\). Correct: \\(\\int_0^{2\\pi}\\cos^2\\theta\\,d\\theta = \\pi\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Improper Integrals
        // ================================================================
        {
            id: 'sec-improper',
            title: 'Improper Integrals',
            content: `
<h2>Improper Integrals via Semicircular Contours</h2>

<p>The most common application of residues is computing \\(\\displaystyle\\int_{-\\infty}^\\infty f(x)\\,dx\\) where \\(f\\) is rational and decays fast enough at infinity.</p>

<h3>Setup</h3>

<p>Let \\(C_R\\) be the upper semicircular contour: the segment \\([-R, R]\\) on the real axis, plus the arc \\(\\Gamma_R: z = Re^{i\\theta}\\), \\(\\theta \\in [0, \\pi]\\). Then:</p>
\\[\\oint_{C_R} f(z)\\,dz = \\int_{-R}^R f(x)\\,dx + \\int_{\\Gamma_R} f(z)\\,dz.\\]

<p>If the arc integral vanishes as \\(R \\to \\infty\\), we recover the real integral from residues.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.2 (Estimation Lemma / ML Inequality)</div>
    <div class="env-body">
        <p>If \\(|f(z)| \\leq M_R\\) for \\(|z| = R\\), and \\(\\Gamma_R\\) has length \\(L = \\pi R\\), then</p>
        \\[\\left|\\int_{\\Gamma_R} f(z)\\,dz\\right| \\leq M_R \\cdot \\pi R.\\]
        <p>For rational \\(f(x) = p(x)/q(x)\\) with \\(\\deg q \\geq \\deg p + 2\\), we have \\(|f(Re^{i\\theta})| = O(R^{-2})\\), so \\(M_R \\cdot \\pi R = O(R^{-1}) \\to 0\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 12.3</div>
    <div class="env-body">
        <p>Compute \\(\\displaystyle I = \\int_{-\\infty}^\\infty \\frac{dx}{1+x^2}\\).</p>
        <p>Poles of \\(1/(1+z^2)\\): at \\(z = \\pm i\\). Only \\(z = i\\) is in the upper half-plane.</p>
        <p>\\(\\operatorname{Res}(f, i) = \\lim_{z\\to i}(z-i)\\frac{1}{(z-i)(z+i)} = \\frac{1}{2i}\\).</p>
        <p>Arc integral \\(\\to 0\\) since \\(\\deg q - \\deg p = 2\\).</p>
        <p>\\(I = 2\\pi i \\cdot \\frac{1}{2i} = \\pi\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 12.4</div>
    <div class="env-body">
        <p>Compute \\(\\displaystyle I = \\int_{-\\infty}^\\infty \\frac{x^2\\,dx}{1+x^4}\\).</p>
        <p>Poles of \\(z^2/(1+z^4)\\): at \\(z^4 = -1\\), i.e., \\(z_k = e^{i\\pi(2k+1)/4}\\), \\(k = 0,1,2,3\\).</p>
        <p>Upper half-plane poles: \\(z_0 = e^{i\\pi/4} = (1+i)/\\sqrt{2}\\) and \\(z_1 = e^{3i\\pi/4} = (-1+i)/\\sqrt{2}\\).</p>
        <p>Since \\(q(z) = 1 + z^4\\) has simple zeros, \\(\\operatorname{Res}(f, z_k) = z_k^2 / (4z_k^3) = 1/(4z_k)\\).</p>
        <p>Sum of residues \\(= \\frac{1}{4}\\bigl(e^{-i\\pi/4} + e^{-3i\\pi/4}\\bigr) = \\frac{1}{4}\\bigl(\\frac{1-i}{\\sqrt{2}} + \\frac{-1-i}{\\sqrt{2}}\\bigr) = \\frac{1}{4}\\cdot\\frac{-2i}{\\sqrt{2}} = \\frac{-i}{2\\sqrt{2}}\\).</p>
        <p>\\(I = 2\\pi i \\cdot \\frac{-i}{2\\sqrt{2}} = \\dfrac{\\pi}{\\sqrt{2}}\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-semicircular"></div>
`,
            visualizations: [
                {
                    id: 'viz-semicircular',
                    title: 'Animated Semicircular Contour',
                    description: 'Watch the semicircular arc grow as R increases. The arc contribution decays to 0 while residues inside the contour are captured. Drag the slider to change R.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 360, originX: 280, originY: 300, scale: 55 });

                        var R = 2;
                        var animating = false;
                        var animT = 0;

                        VizEngine.createSlider(controls, 'R', 0.5, 4.5, R, 0.1, function(v) { R = v; });
                        VizEngine.createButton(controls, 'Animate R\u2192\u221e', function() {
                            animating = !animating;
                            if (animating) animT = 0;
                        });

                        viz.animate(function(time) {
                            if (animating) {
                                animT = (time / 4000) % 1;
                                R = 0.8 + animT * 3.7;
                            }

                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Real axis segment
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            var [sx1] = viz.toScreen(-R, 0);
                            var [sx2, sy2] = viz.toScreen(R, 0);
                            ctx.beginPath();
                            ctx.moveTo(sx1, sy2);
                            ctx.lineTo(sx2, sy2);
                            ctx.stroke();

                            // Arrow on segment
                            viz.drawVector(-R * 0.4, 0, R * 0.4, 0, viz.colors.blue, null, 2);

                            // Semicircular arc
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var [cxS, cyS] = viz.toScreen(0, 0);
                            ctx.arc(cxS, cyS, R * viz.scale, 0, Math.PI, true);
                            ctx.stroke();

                            // Arrow on arc (at top)
                            var arcTop = [0, R];
                            var arcDir = [-1, 0];
                            viz.drawVector(arcTop[0] + 0.4, arcTop[1], arcTop[0] - 0.4, arcTop[1], viz.colors.orange, null, 2);

                            // Poles at +i and -i (for 1/(1+z^2))
                            if (R > 1) {
                                viz.drawPoint(0, 1, viz.colors.red, 'i', 6);
                                // Residue annotation
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                var [px, py] = viz.toScreen(0.1, 1);
                                ctx.fillText('Res = 1/(2i)', px + 8, py);
                            }
                            viz.drawPoint(0, -1, viz.colors.text, '-i', 5);

                            // Labels
                            var [sxR, syR] = viz.toScreen(R + 0.1, 0);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('R = ' + R.toFixed(2), sxR, syR);

                            // Arc estimate
                            var arcEst = Math.PI * R / (R * R - 1);
                            if (R > 1.1) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('|\u222b\u0393| \u2264 \u03c0R/(R\u00b2-1) = ' + arcEst.toFixed(4) + ' \u2192 0', viz.width / 2, 25);
                            }

                            if (R > 1) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('\u222b = 2\u03c0i \u00b7 (1/2i) = \u03c0', viz.width / 2, 45);
                            }
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\displaystyle\\int_{-\\infty}^\\infty \\frac{dx}{(1+x^2)^2}\\).',
                    hint: 'The function \\(1/(1+z^2)^2\\) has a pole of order 2 at \\(z=i\\). Use the formula \\(\\operatorname{Res}(f, z_0) = \\lim_{z \\to z_0} \\frac{d}{dz}[(z-z_0)^2 f(z)]\\).',
                    solution: '\\(f(z) = 1/(z+i)^2(z-i)^2\\). At \\(z = i\\): \\(\\operatorname{Res} = \\frac{d}{dz}\\bigl[(z-i)^2 f(z)\\bigr]\\big|_{z=i} = \\frac{d}{dz}\\frac{1}{(z+i)^2}\\big|_{z=i} = \\frac{-2}{(z+i)^3}\\big|_{z=i} = \\frac{-2}{(2i)^3} = \\frac{-2}{-8i} = \\frac{1}{4i}\\). Arc integral vanishes (degree gap = 4). Thus \\(I = 2\\pi i/(4i) = \\pi/2\\).'
                },
                {
                    question: 'Why does the semicircular contour method fail for \\(\\displaystyle\\int_{-\\infty}^\\infty \\frac{x\\,dx}{1+x^2}\\)?',
                    hint: 'Check the degree difference between numerator and denominator and what happens to the arc integral.',
                    solution: 'The degree difference is only 1 (not \\(\\geq 2\\)), so \\(|f(Re^{i\\theta})| \\sim R^{-1}\\) and the arc integral estimate gives \\(M_R \\cdot \\pi R \\sim \\pi R^{-1} \\cdot \\pi R = \\pi\\), which does not go to 0. In fact the integral is 0 by symmetry (odd function), but the method requires showing the principal value exists separately.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Jordan's Lemma
        // ================================================================
        {
            id: 'sec-jordan',
            title: "Jordan's Lemma",
            content: `
<h2>Jordan's Lemma</h2>

<p>The estimation lemma is not strong enough when \\(f\\) contains oscillatory factors like \\(e^{iax}\\). Jordan's lemma handles exactly this case, and it is the key to computing Fourier-type integrals.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.3 (Jordan's Lemma)</div>
    <div class="env-body">
        <p>Let \\(\\Gamma_R\\) be the upper semicircular arc \\(z = Re^{i\\theta}\\), \\(\\theta \\in [0, \\pi]\\). If \\(f\\) is meromorphic with \\(\\max_{|z|=R} |f(z)| \\to 0\\) as \\(R \\to \\infty\\), then for any \\(a > 0\\):</p>
        \\[\\lim_{R \\to \\infty} \\int_{\\Gamma_R} f(z)e^{iaz}\\,dz = 0.\\]
        <p><em>Note:</em> This requires only \\(|f| \\to 0\\) on the arc, not \\(|f| = O(R^{-2})\\). For \\(a < 0\\), use the <em>lower</em> semicircle.</p>
    </div>
</div>

<h3>Why It Works</h3>

<p>On \\(\\Gamma_R\\), write \\(z = Re^{i\\theta}\\), so \\(e^{iaz} = e^{iaR(\\cos\\theta + i\\sin\\theta)} = e^{iaR\\cos\\theta} \\cdot e^{-aR\\sin\\theta}\\). Since \\(\\sin\\theta \\geq 0\\) for \\(\\theta \\in [0,\\pi]\\), we have \\(|e^{iaz}| = e^{-aR\\sin\\theta} \\leq 1\\). Jordan's inequality then gives:</p>
\\[\\int_0^\\pi e^{-aR\\sin\\theta}\\,d\\theta \\leq \\frac{\\pi}{aR} \\to 0.\\]

<div class="env-block example">
    <div class="env-title">Example 12.5</div>
    <div class="env-body">
        <p>Compute \\(\\displaystyle I = \\int_{-\\infty}^\\infty \\frac{\\cos x}{1+x^2}\\,dx\\).</p>
        <p>Write \\(\\cos x = \\operatorname{Re}(e^{ix})\\) and consider \\(\\displaystyle J = \\int_{-\\infty}^\\infty \\frac{e^{ix}}{1+x^2}\\,dx\\).</p>
        <p>Pole in upper half-plane: \\(z = i\\). \\(\\operatorname{Res}\\bigl(\\frac{e^{iz}}{1+z^2}, i\\bigr) = \\frac{e^{i \\cdot i}}{2i} = \\frac{e^{-1}}{2i}\\).</p>
        <p>By Jordan's lemma (\\(a=1>0\\)), the arc integral \\(\\to 0\\).</p>
        <p>\\(J = 2\\pi i \\cdot \\frac{e^{-1}}{2i} = \\frac{\\pi}{e}\\). Since \\(J\\) is real, \\(I = J = \\pi/e\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example 12.6</div>
    <div class="env-body">
        <p>Compute \\(\\displaystyle \\int_{-\\infty}^\\infty \\frac{x\\sin x}{1+x^2}\\,dx\\).</p>
        <p>Consider \\(\\displaystyle\\int_{-\\infty}^\\infty \\frac{ze^{iz}}{1+z^2}\\,dz\\). Pole at \\(z=i\\):</p>
        \\[\\operatorname{Res}\\Bigl(\\frac{ze^{iz}}{(z-i)(z+i)}, i\\Bigr) = \\frac{ie^{-1}}{2i} = \\frac{1}{2e}.\\]
        <p>So \\(\\int \\frac{ze^{ix}}{1+x^2}\\,dx = 2\\pi i \\cdot \\frac{1}{2e} = \\frac{\\pi i}{e}\\). Taking imaginary parts: \\(\\int \\frac{x\\sin x}{1+x^2}\\,dx = \\pi/e\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-jordan-lemma"></div>
`,
            visualizations: [
                {
                    id: 'viz-jordan-lemma',
                    title: "Jordan's Lemma: Exponential Decay on the Semicircle",
                    description: "Visualize |e^{iaz}| = e^{-aR sin(theta)} on the semicircular arc. As R grows, the exponential suppression forces the integral to zero even when |f| decays only like 1/R.",
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 360, originX: 100, originY: 180, scale: 1 });

                        var R = 2;
                        var a = 1;

                        VizEngine.createSlider(controls, 'R', 0.5, 5, R, 0.1, function(v) { R = v; });
                        VizEngine.createSlider(controls, 'a', 0.1, 3, a, 0.1, function(v) { a = v; });

                        viz.animate(function() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width - 120;
                            var H = viz.height - 60;
                            var left = 100, top = 30, bottom = top + H;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(left, top); ctx.lineTo(left, bottom); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(left, bottom); ctx.lineTo(left + W, bottom); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('\u03b8', left + W / 2, bottom + 20);
                            ctx.fillText('0', left, bottom + 15);
                            ctx.fillText('\u03c0', left + W, bottom + 15);
                            ctx.fillText('\u03c0/2', left + W / 2, bottom + 15);

                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('1', left - 5, top);
                            ctx.fillText('0', left - 5, bottom);

                            // Dashed horizontal at y=1
                            ctx.setLineDash([4, 4]);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(left, top); ctx.lineTo(left + W, top); ctx.stroke();
                            ctx.setLineDash([]);

                            // Plot e^{-aR sin(theta)}
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var steps = 200;
                            for (var i = 0; i <= steps; i++) {
                                var theta = i / steps * Math.PI;
                                var val = Math.exp(-a * R * Math.sin(theta));
                                var px = left + (theta / Math.PI) * W;
                                var py = bottom - val * H;
                                i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Jordan bound: pi/(aR)
                            var jordanBound = Math.min(1, Math.PI / (a * R));
                            var pyBound = bottom - jordanBound * H;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath(); ctx.moveTo(left, pyBound); ctx.lineTo(left + W, pyBound); ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('\u222b\u2080\u1d56 e^{-aR sin\u03b8}d\u03b8 \u2264 \u03c0/(aR) = ' + (Math.PI / (a * R)).toFixed(3), left + W * 0.5, pyBound - 8);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.textAlign = 'left';
                            ctx.fillText('|e^{iaz}| = e^{-aR sin\u03b8}', left + 10, top + 15);

                            ctx.fillStyle = viz.colors.white;
                            ctx.textAlign = 'center';
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('R = ' + R.toFixed(1) + ', a = ' + a.toFixed(1), left + W / 2, bottom + 40);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use Jordan\'s lemma to compute \\(\\displaystyle\\int_{-\\infty}^\\infty \\frac{\\sin x}{x(1+x^2)}\\,dx\\).',
                    hint: 'The integrand has a removable singularity at \\(x=0\\), so there is no problem there. Use the upper semicircle and note \\(\\sin x = \\operatorname{Im}(e^{ix})\\). Pole at \\(z=i\\).',
                    solution: 'Consider \\(f(z) = e^{iz}/(z(1+z^2))\\). The singularity at \\(z=0\\) is removable (\\(e^{iz}/z(1+z^2)\\) has limit \\(1\\) as \\(z\\to 0\\), wait: at 0 it is \\(e^{0}/(0 \\cdot 1) \\to \\infty\\) -- it is a simple pole). Actually use an indented contour (see Section 6) to handle the pole at 0. Alternatively: \\(\\sin x / (x(1+x^2)) = \\sin x / x - x\\sin x/(1+x^2)\\). The first gives \\(\\pi\\), the second gives \\(-\\pi/e\\) by Jordan. So \\(I = \\pi - \\pi/e = \\pi(1-e^{-1})\\).'
                },
                {
                    question: 'State precisely why Jordan\'s lemma requires \\(a > 0\\) for the upper semicircle, and what happens for \\(a < 0\\).',
                    hint: 'The decay factor is \\(e^{-aR\\sin\\theta}\\). What sign does \\(\\sin\\theta\\) have for \\(\\theta \\in [0,\\pi]\\)?',
                    solution: 'On the upper semicircle, \\(\\sin\\theta \\geq 0\\). So \\(e^{-aR\\sin\\theta} \\leq 1\\) only when \\(a > 0\\) (giving exponential suppression). For \\(a < 0\\), \\(e^{-aR\\sin\\theta} = e^{|a|R\\sin\\theta}\\) grows exponentially and the integral does not vanish. For \\(a < 0\\), one must close in the lower half-plane (\\(\\theta \\in [-\\pi, 0]\\), where \\(\\sin\\theta \\leq 0\\) and the decay is restored).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Branch Cut Integrals
        // ================================================================
        {
            id: 'sec-branch',
            title: 'Integrals with Branch Cuts',
            content: `
<h2>Integrals with Branch Cuts: the Keyhole Contour</h2>

<p>Integrals of the form \\(\\displaystyle\\int_0^\\infty x^{a-1} f(x)\\,dx\\) with \\(a \\notin \\mathbb{Z}\\) involve a multi-valued factor \\(x^{a-1}\\). To handle this in the complex plane, we work with the principal branch of \\(z^{a-1}\\) and avoid the branch cut along the positive real axis.</p>

<h3>The Keyhole Contour</h3>

<p>The keyhole contour \\(C_{R,\\epsilon}\\) consists of:</p>
<ul>
    <li>\\(\\Gamma_R\\): the large circle \\(|z| = R\\) traversed counterclockwise.</li>
    <li>\\(L^+\\): the segment just above the positive real axis, \\(z = xe^{i\\cdot 0^+}\\), \\(x \\in [\\epsilon, R]\\).</li>
    <li>\\(\\gamma_\\epsilon\\): the small circle \\(|z|=\\epsilon\\) traversed clockwise.</li>
    <li>\\(L^-\\): the segment just below the positive real axis, \\(z = xe^{2\\pi i}\\), \\(x \\in [\\epsilon, R]\\).</li>
</ul>

<p>On \\(L^+\\): \\(z^{a-1} = x^{a-1}\\). On \\(L^-\\): \\(z^{a-1} = x^{a-1}e^{2\\pi i(a-1)} = x^{a-1}e^{2\\pi ia}\\cdot e^{-2\\pi i}\\). After taking \\(R \\to \\infty\\), \\(\\epsilon \\to 0\\):</p>

\\[\\oint_{C_{R,\\epsilon}} z^{a-1} f(z)\\,dz = \\int_0^\\infty x^{a-1}f(x)\\,dx - e^{2\\pi ia}\\int_0^\\infty x^{a-1}f(x)\\,dx\\]

\\[= (1 - e^{2\\pi ia})\\int_0^\\infty x^{a-1}f(x)\\,dx.\\]

<p>Setting this equal to \\(2\\pi i \\sum \\operatorname{Res}\\) and solving gives \\(\\int_0^\\infty x^{a-1}f(x)\\,dx\\).</p>

<div class="env-block example">
    <div class="env-title">Example 12.7 (Beta Integral)</div>
    <div class="env-body">
        <p>Compute \\(\\displaystyle I(a) = \\int_0^\\infty \\frac{x^{a-1}}{1+x}\\,dx\\) for \\(0 < a < 1\\).</p>
        <p>Poles of \\(z^{a-1}/(1+z)\\): simple pole at \\(z = -1 = e^{i\\pi}\\).</p>
        <p>\\(\\operatorname{Res}\\bigl(z^{a-1}/(1+z), -1\\bigr) = (-1)^{a-1} = e^{i\\pi(a-1)}\\).</p>
        <p>Keyhole contour gives:
        \\[(1 - e^{2\\pi ia}) I(a) = 2\\pi i \\cdot e^{i\\pi(a-1)}.\\]</p>
        <p>\\[I(a) = \\frac{2\\pi i\\, e^{i\\pi(a-1)}}{1 - e^{2\\pi ia}} = \\frac{2\\pi i\\, e^{i\\pi(a-1)}}{-e^{i\\pi a}(e^{i\\pi a} - e^{-i\\pi a})} = \\frac{2\\pi i\\, e^{-i\\pi}}{-(2i\\sin\\pi a)} = \\frac{\\pi}{\\sin\\pi a}.\\]</p>
        <p>This is the reflection formula \\(\\Gamma(a)\\Gamma(1-a) = \\pi/\\sin(\\pi a)\\) with \\(\\Gamma(a)\\Gamma(1-a) = B(a,1-a) = I(a)\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-keyhole-contour"></div>
`,
            visualizations: [
                {
                    id: 'viz-keyhole-contour',
                    title: 'Animated Keyhole Contour',
                    description: 'The keyhole contour avoids the branch cut along the positive real axis. Watch the contour animate: outer circle, upper segment, inner circle, lower segment. The branch cut is shown in red.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, originX: 280, originY: 190, scale: 60 });

                        var R = 2.5;
                        var eps = 0.25;
                        var phase = 0;

                        VizEngine.createSlider(controls, 'R', 1, 4, R, 0.1, function(v) { R = v; });
                        VizEngine.createSlider(controls, '\u03b5', 0.05, 0.6, eps, 0.05, function(v) { eps = v; });

                        viz.animate(function(time) {
                            phase = (time / 6000) % 1;
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Branch cut: positive real axis (dashed red)
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([5, 4]);
                            var [sx0, sy0] = viz.toScreen(0, 0);
                            var [sxR] = viz.toScreen(R + 0.5, 0);
                            ctx.beginPath(); ctx.moveTo(sx0, sy0); ctx.lineTo(sxR, sy0); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('branch cut', viz.toScreen((R + 0.5) / 2, 0)[0], sy0 - 14);

                            // Pole at z = -1
                            viz.drawPoint(-1, 0, viz.colors.orange, 'pole at -1', 6);

                            var gap = 0.04; // gap above/below real axis

                            // Upper segment L+
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            var [sxEps] = viz.toScreen(eps, gap);
                            var [sxRp] = viz.toScreen(R, gap);
                            var sy_gap = viz.toScreen(0, gap)[1];
                            ctx.beginPath(); ctx.moveTo(sxEps, sy_gap); ctx.lineTo(sxRp, sy_gap); ctx.stroke();

                            // Arrow on upper segment
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            var midX = (sxEps + sxRp) / 2;
                            ctx.moveTo(midX + 8, sy_gap);
                            ctx.lineTo(midX - 6, sy_gap - 6);
                            ctx.lineTo(midX - 6, sy_gap + 6);
                            ctx.closePath(); ctx.fill();

                            // Large arc (nearly full circle, gap at start/end)
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var [cxS, cyS] = viz.toScreen(0, 0);
                            var gapAngle = 0.04;
                            ctx.arc(cxS, cyS, R * viz.scale, -gapAngle, Math.PI * 2 - gapAngle, false);
                            ctx.stroke();
                            // Arrow on large arc at top
                            var arcArrowAngle = Math.PI / 2;
                            var ax = cxS - R * viz.scale * Math.cos(arcArrowAngle + 0.15);
                            var ay = cyS - R * viz.scale * Math.sin(arcArrowAngle + 0.15);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.arc(cxS + R * viz.scale, cyS, 4, 0, 2 * Math.PI); ctx.fill();

                            // Lower segment L-
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2.5;
                            var sy_low = viz.toScreen(0, -gap)[1];
                            var [sxEpsL] = viz.toScreen(eps, -gap);
                            var [sxRL] = viz.toScreen(R, -gap);
                            ctx.beginPath(); ctx.moveTo(sxRL, sy_low); ctx.lineTo(sxEpsL, sy_low); ctx.stroke();
                            // Arrow on lower segment (going inward)
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath();
                            var midXL = (sxEpsL + sxRL) / 2;
                            ctx.moveTo(midXL - 8, sy_low);
                            ctx.lineTo(midXL + 6, sy_low - 6);
                            ctx.lineTo(midXL + 6, sy_low + 6);
                            ctx.closePath(); ctx.fill();

                            // Small arc (clockwise)
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cxS, cyS, eps * viz.scale, -gapAngle, Math.PI * 2 - gapAngle, true);
                            ctx.stroke();

                            // Legend
                            var legItems = [
                                [viz.colors.blue,   'L\u207a: upper segment'],
                                [viz.colors.teal,   '\u0393_R: large arc'],
                                [viz.colors.purple, 'L\u207b: lower segment (×e^{2\u03c0ia})'],
                                [viz.colors.green,  '\u03b3_\u03b5: small arc'],
                                [viz.colors.red,    'Branch cut']
                            ];
                            legItems.forEach(function(item, i) {
                                ctx.fillStyle = item[0];
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(item[1], 10, 20 + i * 17);
                            });
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the keyhole contour to compute \\(\\displaystyle\\int_0^\\infty \\frac{x^{1/3}}{1+x^2}\\,dx\\).',
                    hint: 'Here \\(a - 1 = 1/3\\), so \\(a = 4/3\\). Poles at \\(z = \\pm i\\). Compute residues using \\(z^{1/3} = |z|^{1/3}e^{i\\arg(z)/3}\\) with \\(\\arg(z) \\in (0, 2\\pi)\\). The factor becomes \\(1 - e^{8\\pi i/3}\\).',
                    solution: 'Poles at \\(z=i = e^{i\\pi/2}\\) and \\(z=-i = e^{3i\\pi/2}\\). With branch cut on positive real axis (arg \\(\\in (0,2\\pi)\\)): \\(i^{1/3} = e^{i\\pi/6}\\), \\((-i)^{1/3} = e^{i\\pi/2}\\). Residues: at \\(i\\): \\(e^{i\\pi/6}/(2i)\\); at \\(-i\\): \\(e^{i\\pi/2}/(-2i)\\). Sum \\(= (e^{i\\pi/6} - e^{i\\pi/2})/(2i)\\). Factor: \\(1 - e^{8\\pi i/3}\\). After algebra: \\(I = \\pi(\\sqrt{3}-1)/(\\sqrt{3}\\cdot 2) \\cdot \\text{(exact form depends on careful trig)}\\). Exact value: \\(\\pi/(2\\cos(\\pi/6)) \\cdot \\sin(5\\pi/6)/\\sin(\\pi/6)\\) -- exercise in careful bookkeeping of branch factors.'
                },
                {
                    question: 'Explain why we must place the branch cut along the positive real axis (rather than, say, the negative real axis) for \\(\\int_0^\\infty x^{a-1}f(x)\\,dx\\).',
                    hint: 'The integration path itself lies along the positive real axis. What happens to the branch if the cut passes through the integration path?',
                    solution: 'The integration path is \\((0,\\infty)\\). If the branch cut passes through this path, \\(z^{a-1}\\) is discontinuous along the very segment we want to integrate, making the integral undefined. Placing the cut on the positive real axis separates \\(L^+\\) (arg \\(= 0^+\\)) from \\(L^-\\) (arg \\(= 2\\pi^-\\)), giving a well-defined analytic function in the slit plane \\(\\mathbb{C} \\setminus [0,\\infty)\\). The key is that the two segments straddle the cut and the ratio \\(z^{a-1}|_{L^-}/z^{a-1}|_{L^+} = e^{2\\pi ia}\\) provides the needed cancellation factor.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Indented Contours
        // ================================================================
        {
            id: 'sec-indented',
            title: 'Indented Contours',
            content: `
<h2>Indented Contours and Poles on the Real Axis</h2>

<p>When the integrand has a pole on the real axis itself, we cannot include it in the standard semicircular contour. The solution is to <em>indent</em> the contour around the pole with a small semicircle of radius \\(\\epsilon\\), then let \\(\\epsilon \\to 0\\).</p>

<h3>The Small Semicircle Lemma</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.4 (Residue at a Pole on the Real Axis)</div>
    <div class="env-body">
        <p>If \\(f\\) has a simple pole at \\(x_0 \\in \\mathbb{R}\\) with residue \\(B = \\operatorname{Res}(f, x_0)\\), then the integral over the small semicircle \\(\\gamma_\\epsilon: z = x_0 + \\epsilon e^{i\\theta}\\), \\(\\theta \\in [0, \\pi]\\) (upper, counterclockwise) satisfies:</p>
        \\[\\lim_{\\epsilon \\to 0} \\int_{\\gamma_\\epsilon} f(z)\\,dz = \\pi i B.\\]
        <p><em>(For the clockwise lower semicircle, the limit is \\(-\\pi i B\\).</em>)</p>
    </div>
</div>

<h3>Cauchy Principal Value</h3>

<p>The principal value of a divergent integral is:</p>
\\[\\mathrm{P.V.}\\int_{-\\infty}^\\infty f(x)\\,dx = \\lim_{R\\to\\infty, \\epsilon\\to 0} \\left(\\int_{-R}^{x_0-\\epsilon} + \\int_{x_0+\\epsilon}^R\\right) f(x)\\,dx.\\]

<p>The indented contour method often gives the P.V. integral as a byproduct.</p>

<div class="env-block example">
    <div class="env-title">Example 12.8: The Sine Integral</div>
    <div class="env-body">
        <p>Compute \\(\\displaystyle\\int_0^\\infty \\frac{\\sin x}{x}\\,dx = \\frac{\\pi}{2}\\).</p>
        <p>Integrate \\(f(z) = e^{iz}/z\\) over the indented contour: \\([-R, -\\epsilon] \\cup \\gamma_\\epsilon^- \\cup [\\epsilon, R] \\cup \\Gamma_R\\), where \\(\\gamma_\\epsilon^-\\) is the small upper semicircle from \\(-\\epsilon\\) to \\(\\epsilon\\) traversed <em>clockwise</em> (indenting upward means we go from right to left below the pole, so in our upper contour the small semicircle is traversed clockwise around 0).</p>
        <p>Since \\(f\\) has no poles inside the contour (the pole at 0 is excluded by indentation and the contour has no other poles in the upper half-plane for \\(1/z\\)), the full integral is 0.</p>
        <p>Contributions:</p>
        <ul>
            <li>Large arc \\(\\Gamma_R\\): \\(\\to 0\\) by Jordan's lemma.</li>
            <li>Small arc \\(\\gamma_\\epsilon\\) (clockwise): \\(-\\pi i \\operatorname{Res}(e^{iz}/z, 0) = -\\pi i\\).</li>
            <li>Real axis segments: \\(\\mathrm{P.V.}\\int_{-\\infty}^\\infty \\frac{e^{ix}}{x}\\,dx\\).</li>
        </ul>
        <p>So: \\(\\mathrm{P.V.}\\int_{-\\infty}^\\infty \\frac{e^{ix}}{x}\\,dx - \\pi i = 0\\), giving \\(\\mathrm{P.V.}\\int_{-\\infty}^\\infty \\frac{e^{ix}}{x}\\,dx = \\pi i\\).</p>
        <p>Taking imaginary parts (the integrand \\(\\sin x/x\\) is even): \\(\\int_{-\\infty}^\\infty \\frac{\\sin x}{x}\\,dx = \\pi\\), so \\(\\int_0^\\infty \\frac{\\sin x}{x}\\,dx = \\pi/2\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-indented-contour"></div>
`,
            visualizations: [
                {
                    id: 'viz-indented-contour',
                    title: 'Indented Contour: Small Semicircle Around Pole on Real Axis',
                    description: 'Watch the contour indent around the pole at the origin. As epsilon decreases, the small semicircle contribution converges to pi*i*Residue. The main contour avoids the pole.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 360, originX: 280, originY: 240, scale: 55 });

                        var R = 3;
                        var eps = 0.4;

                        VizEngine.createSlider(controls, 'R', 1, 4, R, 0.1, function(v) { R = v; });
                        VizEngine.createSlider(controls, '\u03b5', 0.05, 0.8, eps, 0.05, function(v) { eps = v; });

                        viz.animate(function() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;
                            var [cxS, cyS] = viz.toScreen(0, 0);

                            // Pole marker at origin
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            var poleR = 5;
                            ctx.beginPath();
                            ctx.moveTo(cxS - poleR, cyS - poleR); ctx.lineTo(cxS + poleR, cyS + poleR); ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(cxS + poleR, cyS - poleR); ctx.lineTo(cxS - poleR, cyS + poleR); ctx.stroke();

                            // Left segment: [-R, -eps]
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            var [sxL1] = viz.toScreen(-R, 0);
                            var [sxL2, syAxis] = viz.toScreen(-eps, 0);
                            ctx.beginPath(); ctx.moveTo(sxL1, syAxis); ctx.lineTo(sxL2, syAxis); ctx.stroke();
                            // Arrow
                            ctx.fillStyle = viz.colors.blue;
                            var midL = (sxL1 + sxL2) / 2;
                            ctx.beginPath();
                            ctx.moveTo(midL + 8, syAxis);
                            ctx.lineTo(midL - 6, syAxis - 6);
                            ctx.lineTo(midL - 6, syAxis + 6);
                            ctx.closePath(); ctx.fill();

                            // Small semicircle: clockwise from -eps to +eps (upper half)
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.arc(cxS, cyS, eps * viz.scale, Math.PI, 0, false);
                            ctx.stroke();

                            // Right segment: [eps, R]
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            var [sxR1] = viz.toScreen(eps, 0);
                            var [sxR2] = viz.toScreen(R, 0);
                            ctx.beginPath(); ctx.moveTo(sxR1, syAxis); ctx.lineTo(sxR2, syAxis); ctx.stroke();
                            // Arrow
                            ctx.fillStyle = viz.colors.blue;
                            var midR = (sxR1 + sxR2) / 2;
                            ctx.beginPath();
                            ctx.moveTo(midR + 8, syAxis);
                            ctx.lineTo(midR - 6, syAxis - 6);
                            ctx.lineTo(midR - 6, syAxis + 6);
                            ctx.closePath(); ctx.fill();

                            // Large arc
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.arc(cxS, cyS, R * viz.scale, 0, Math.PI, true);
                            ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('pole at 0', cxS, cyS - 15);

                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('\u03b3_\u03b5 contributes \u03c0i\u00b7Res', cxS, cyS - eps * viz.scale - 15);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            var smallContrib = Math.PI;
                            ctx.fillText('\u03b5 = ' + eps.toFixed(2) + ', small arc \u2192 \u03c0i Res(f, 0)', viz.width / 2, 25);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('[         ] + [\u03b3_\u03b5] + [        ] + [\u0393_R] = 0 (no poles inside)', 20, viz.height - 20);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the indented contour to evaluate \\(\\displaystyle\\mathrm{P.V.}\\int_{-\\infty}^\\infty \\frac{\\cos x}{x}\\,dx\\).',
                    hint: 'Integrate \\(e^{iz}/z\\) over the standard indented contour. The real part gives the cosine integral, the imaginary part gives the sine integral.',
                    solution: 'From Example 12.8, \\(\\mathrm{P.V.}\\int_{-\\infty}^\\infty e^{ix}/x\\,dx = \\pi i\\). Taking real parts: \\(\\mathrm{P.V.}\\int_{-\\infty}^\\infty \\cos(x)/x\\,dx = 0\\). (This also follows from symmetry: \\(\\cos(x)/x\\) is an odd function, so its P.V. integral is 0.)'
                },
                {
                    question: 'Compute \\(\\displaystyle\\int_{-\\infty}^\\infty \\frac{\\sin^2 x}{x^2}\\,dx\\) using residues.',
                    hint: 'Write \\(\\sin^2 x = (1 - \\cos 2x)/2\\) and integrate \\((1 - e^{2iz})/(2z^2)\\) over the indented contour. The pole at 0 has order 2.',
                    solution: 'Let \\(g(z) = (1 - e^{2iz})/(2z^2)\\). Near \\(z = 0\\): \\(1 - e^{2iz} = -2iz + 2z^2 + \\ldots\\), so \\(g(z) \\approx (-2iz + 2z^2)/(2z^2) = -i/z + 1 + \\ldots\\). Thus \\(\\operatorname{Res}(g, 0) = -i\\). Small semicircle (clockwise) contributes \\(-\\pi i(-i) = -\\pi\\). Large arc \\(\\to 0\\). Total contour integral = 0 (no other poles in upper half-plane). So real integral \\(= \\pi\\). Hence \\(\\int_{-\\infty}^\\infty \\sin^2(x)/x^2\\,dx = \\pi\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridges to Further Theory',
            content: `
<h2>Bridges to Further Theory</h2>

<p>The residue method is not just a collection of tricks. It connects to some of the deepest structures in analysis, number theory, and mathematical physics.</p>

<h3>Connection to the Laplace and Fourier Transforms</h3>

<p>The Fourier transform \\(\\hat{f}(\\xi) = \\int_{-\\infty}^\\infty f(x)e^{-2\\pi i \\xi x}\\,dx\\) can often be inverted using residues. The inverse formula is a contour integral, and the poles of the Laplace transform \\(F(s) = \\int_0^\\infty f(t)e^{-st}\\,dt\\) in the left half-plane determine the long-time behavior of \\(f\\).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 12.5 (Fourier Inversion via Residues)</div>
    <div class="env-body">
        <p>If \\(F(s)\\) is the Laplace transform of \\(f(t)\\) and \\(F\\) is meromorphic with poles \\(s_1, \\ldots, s_n\\) all to the left of the Bromwich contour \\(\\operatorname{Re}(s) = c\\), then:</p>
        \\[f(t) = \\sum_k \\operatorname{Res}\\bigl(F(s)e^{st}, s_k\\bigr).\\]
    </div>
</div>

<h3>The Argument Principle and Rouche's Theorem</h3>

<p>Counting zeros and poles via residues leads to the argument principle: for meromorphic \\(f\\) inside \\(C\\),</p>
\\[\\frac{1}{2\\pi i}\\oint_C \\frac{f'(z)}{f(z)}\\,dz = Z - P\\]

<p>where \\(Z\\) and \\(P\\) count zeros and poles with multiplicity. From this follows Rouche's theorem, a powerful tool for locating zeros of polynomials and analytic functions.</p>

<h3>The Mittag-Leffler Theorem</h3>

<p>Residues are the building blocks of partial fraction decompositions in the complex setting. The Mittag-Leffler theorem reconstructs a meromorphic function from its poles and principal parts:</p>
\\[f(z) = f(0) + \\sum_n \\Bigl(\\frac{B_n}{z - z_n} + \\frac{B_n}{z_n}\\Bigr)\\]
<p>where \\(B_n = \\operatorname{Res}(f, z_n)\\). Applied to \\(\\pi\\cot(\\pi z)\\), whose poles at every integer have residue 1, this yields:</p>
\\[\\pi\\cot(\\pi z) = \\frac{1}{z} + \\sum_{n=1}^\\infty \\Bigl(\\frac{1}{z-n} + \\frac{1}{z+n}\\Bigr)\\]

<p>a formula Euler discovered by very different means.</p>

<h3>The Residue Method in Number Theory</h3>

<p>The prime number theorem is proved via complex analysis. The key ingredient is showing that the Riemann zeta function \\(\\zeta(s) = \\sum_{n=1}^\\infty n^{-s}\\) has no zeros on the line \\(\\operatorname{Re}(s) = 1\\), and using a Perron-type formula to extract the prime-counting function \\(\\pi(x)\\) as a contour integral whose main residue at \\(s=1\\) gives the \\(\\sim x/\\log x\\) asymptotic.</p>

<div class="env-block remark">
    <div class="env-title">What to Study Next</div>
    <div class="env-body">
        <ul>
            <li><strong>Argument principle and Rouche's theorem</strong> (Ch 13 in most texts): how winding numbers count zeros.</li>
            <li><strong>Entire and meromorphic functions</strong>: Hadamard factorization, infinite products, Weierstrass factors.</li>
            <li><strong>Analytic continuation</strong>: extending functions beyond their natural domain using the residue structure as a guide.</li>
            <li><strong>Automorphic forms</strong>: Eisenstein series are basically Mittag-Leffler sums for doubly periodic functions.</li>
        </ul>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-fourier-transform"></div>
`,
            visualizations: [
                {
                    id: 'viz-fourier-transform',
                    title: 'Connection to Fourier Transforms via Residues',
                    description: 'The Fourier transform of 1/(1+x^2) is pi*e^{-|xi|}. Verify: as a function of xi, it equals the sum of residue contributions at z=i (upper half) or z=-i (lower half) depending on sign of xi.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 360, originX: 280, originY: 200, scale: 50 });

                        var xi = 0.5;

                        VizEngine.createSlider(controls, '\u03be', -3, 3, xi, 0.05, function(v) { xi = v; });

                        viz.animate(function() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Draw the function 1/(1+x^2) on real line
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var started = false;
                            for (var i = -200; i <= 200; i++) {
                                var x = i * 0.03;
                                var y = 1 / (1 + x * x);
                                var [sx, sy] = viz.toScreen(x, y);
                                if (!started) { ctx.moveTo(sx, sy); started = true; } else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            // Draw the oscillatory factor e^{i*xi*x} real part
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            started = false;
                            for (var j = -200; j <= 200; j++) {
                                var x2 = j * 0.03;
                                var y2 = Math.cos(2 * Math.PI * xi * x2) * 0.4;
                                var [sx2, sy2] = viz.toScreen(x2, y2);
                                if (!started) { ctx.moveTo(sx2, sy2); started = true; } else ctx.lineTo(sx2, sy2);
                            }
                            ctx.stroke();

                            // Draw integrand product
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            started = false;
                            for (var k = -200; k <= 200; k++) {
                                var x3 = k * 0.03;
                                var y3 = Math.cos(2 * Math.PI * xi * x3) / (1 + x3 * x3);
                                var [sx3, sy3] = viz.toScreen(x3, y3);
                                if (!started) { ctx.moveTo(sx3, sy3); started = true; } else ctx.lineTo(sx3, sy3);
                            }
                            ctx.stroke();

                            // Exact Fourier transform value
                            var FT = Math.PI * Math.exp(-2 * Math.PI * Math.abs(xi));

                            // Contour: use upper half plane for xi > 0, lower for xi < 0
                            var useUpper = xi >= 0;
                            var poleY = useUpper ? 1 : -1;
                            var poleLabel = useUpper ? 'z=i (UHP)' : 'z=-i (LHP)';

                            viz.drawPoint(0, poleY, viz.colors.red, poleLabel, 6);

                            // Value display
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('\u03be = ' + xi.toFixed(2), 10, 30);
                            ctx.fillText('\u0191{1/(1+x\u00b2)}(\u03be) = \u03c0\u00b7e^{-2\u03c0|\u03be|} = ' + FT.toFixed(4), 10, 50);
                            ctx.fillText('Close in ' + (useUpper ? 'UHP' : 'LHP') + ' (e^{i(-2\u03c0\u03be)x} decays there)', 10, 70);
                            ctx.fillText('Residue at ' + poleLabel + ' gives \u03c0\u00b7e^{-2\u03c0|\u03be|}', 10, 90);

                            // Legend
                            var legY = viz.height - 55;
                            [
                                [viz.colors.blue,   '1/(1+x\u00b2)'],
                                [viz.colors.orange, 'cos(2\u03c0\u03bex)'],
                                [viz.colors.teal,   'integrand product']
                            ].forEach(function(item, i) {
                                ctx.fillStyle = item[0];
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText(item[1], 10 + i * 140, legY);
                                ctx.fillRect(10 + i * 140 - 15, legY - 2, 12, 10);
                            });
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'State the argument principle and explain how it follows from the residue theorem applied to \\(f\'(z)/f(z)\\).',
                    hint: 'Near a zero of order \\(m\\), \\(f(z) \\approx c(z-z_0)^m\\), so \\(f\'(z)/f(z) \\approx m/(z-z_0)\\). Near a pole of order \\(p\\), \\(f(z) \\approx c(z-z_0)^{-p}\\), so \\(f\'(z)/f(z) \\approx -p/(z-z_0)\\).',
                    solution: 'At a zero of order \\(m\\): \\(f = (z-z_0)^m h\\) with \\(h(z_0)\\neq 0\\), so \\(f\'/f = m/(z-z_0) + h\'/h\\), and \\(\\operatorname{Res}(f\'/f, z_0) = m\\). At a pole of order \\(p\\): \\(f = (z-z_0)^{-p}h\\), so \\(\\operatorname{Res}(f\'/f, z_0) = -p\\). The residue theorem then gives \\(\\frac{1}{2\\pi i}\\oint_C f\'(z)/f(z)\\,dz = \\sum m_k - \\sum p_j = Z - P\\). Geometrically, this equals the winding number of the image \\(f(C)\\) around 0.'
                },
                {
                    question: 'Use the Mittag-Leffler expansion of \\(\\pi\\cot(\\pi z)\\) to derive the sum \\(\\sum_{n=1}^\\infty 1/n^2 = \\pi^2/6\\).',
                    hint: 'Expand both sides as power series in \\(z\\) near 0. On the left, use \\(\\pi z \\cot(\\pi z) = 1 - \\pi^2 z^2/3 - \\ldots\\). On the right, each term \\(1/(z^2-n^2)\\) contributes \\(-2z^{-2n^{-2}}\\) at order \\(z^2\\). Compare coefficients.',
                    solution: '\\(\\pi\\cot(\\pi z) = 1/z + 2z\\sum_{n=1}^\\infty 1/(z^2-n^2)\\). Near \\(z=0\\): \\(\\pi\\cot(\\pi z) = 1/z - \\pi^2 z/3 - \\ldots\\). So \\(2z\\sum 1/(z^2-n^2) = -2z/z^2\\sum_{n=1}^\\infty 1/(1-z^2/n^2) \\cdot (-1/n^2)\\) -- taking coefficient of \\(z^1\\) on both sides: left side gives \\(-\\pi^2/3\\), right side gives \\(-2\\sum 1/n^2\\). Hence \\(\\sum 1/n^2 = \\pi^2/6\\).'
                }
            ]
        }
    ]
});
