window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch14',
    number: 14,
    title: 'Mobius Transformations',
    subtitle: 'The group of all circle-preserving transformations',
    sections: [

        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Motivation</h2>

<div class="env-block intuition">
    <div class="env-title">A Question About Circles</div>
    <div class="env-body">
        <p>Conformal maps preserve angles. Holomorphic functions give local angle-preservation. But which holomorphic maps preserve the <em>global</em> structure of circles and lines? The answer is a surprisingly small and elegant family: Mobius transformations.</p>
        <p>These transformations appear everywhere in complex analysis, hyperbolic geometry, string theory, and computer graphics. Understanding them unlocks a deep connection between geometry and algebra.</p>
    </div>
</div>

<p>We have already studied several classes of conformal maps: linear maps \\(z \\mapsto az + b\\), the squaring map \\(z \\mapsto z^2\\), the exponential. Each has a different geometric flavor. But there is one class that deserves special attention because of the richness of its structure.</p>

<p>Consider the map \\(z \\mapsto 1/z\\), inversion in the unit circle. It sends circles to circles (possibly through the point at infinity). What if we compose it with a linear map? We get</p>

\\[
T(z) = \\frac{az + b}{cz + d}.
\\]

<p>This is the general Mobius transformation (also called a linear fractional transformation or bilinear map). The conditions \\(ad - bc \\neq 0\\) ensures it is not constant. Despite having only four complex parameters, this family turns out to be exactly the group of all bijective conformal self-maps of the Riemann sphere \\(\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}\\).</p>

<h3>Why the Riemann Sphere?</h3>

<p>The map \\(z \\mapsto 1/z\\) sends \\(0\\) to \\(\\infty\\) and \\(\\infty\\) to \\(0\\). To make this rigorous, we work on the Riemann sphere, the one-point compactification of \\(\\mathbb{C}\\). Every Mobius transformation is then a bijection of \\(\\hat{\\mathbb{C}}\\) onto itself.</p>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>August Ferdinand Mobius (1790-1868) introduced these transformations in the context of projective geometry. They were studied extensively by Riemann, Schwarz, and Klein. Felix Klein's Erlangen program (1872) unified geometry by characterizing each geometry by its group of symmetries; Mobius transformations are precisely the symmetry group of the Riemann sphere.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-mobius-interactive"></div>
`,
            visualizations: [
                {
                    id: 'viz-mobius-interactive',
                    title: 'Interactive Mobius Transformation',
                    description: 'Adjust parameters a, b, c, d (real parts, for simplicity) and see the domain coloring of T(z) = (az+b)/(cz+d). The color encodes the argument of T(z) and brightness encodes the modulus.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 460 });

                        var params = { a: 1, b: 0, c: 0, d: 1 };

                        VizEngine.createSlider(controls, 'a', -3, 3, params.a, 0.1, function(v) { params.a = v; draw(); });
                        VizEngine.createSlider(controls, 'b', -3, 3, params.b, 0.1, function(v) { params.b = v; draw(); });
                        VizEngine.createSlider(controls, 'c', -3, 3, params.c, 0.1, function(v) { params.c = v; draw(); });
                        VizEngine.createSlider(controls, 'd', -3, 3, params.d, 0.1, function(v) { params.d = v; draw(); });

                        function mobiusApply(re, im, a, b, c, d) {
                            // T(z) = (az+b)/(cz+d) with a,b,c,d real
                            var numRe = a * re + b;
                            var numIm = a * im;
                            var denRe = c * re + d;
                            var denIm = c * im;
                            var denom = denRe * denRe + denIm * denIm;
                            if (denom < 1e-10) return [1e9, 1e9];
                            return [
                                (numRe * denRe + numIm * denIm) / denom,
                                (numIm * denRe - numRe * denIm) / denom
                            ];
                        }

                        function draw() {
                            var a = params.a, b = params.b, c = params.c, d = params.d;
                            var det = a * d - b * c;

                            viz.clear();

                            if (Math.abs(det) < 0.001) {
                                viz.screenText('Degenerate: ad - bc \u2248 0', viz.width / 2, viz.height / 2, viz.colors.red, 16);
                                viz.screenText('Not a Mobius transformation', viz.width / 2, viz.height / 2 + 24, viz.colors.text, 13);
                                return;
                            }

                            var xRange = [-3, 3];
                            var yRange = [-2.5, 2.5];
                            viz.drawDomainColoring(function(re, im) {
                                return mobiusApply(re, im, a, b, c, d);
                            }, xRange, yRange);

                            viz.drawAxes();

                            viz.screenText(
                                'T(z) = (' + a.toFixed(1) + 'z + ' + b.toFixed(1) + ') / (' + c.toFixed(1) + 'z + ' + d.toFixed(1) + ')',
                                viz.width / 2, 22, viz.colors.white, 14
                            );
                            viz.screenText(
                                'ad \u2212 bc = ' + det.toFixed(3),
                                viz.width / 2, 42, Math.abs(det) > 0.1 ? viz.colors.green : viz.colors.red, 12
                            );
                            if (Math.abs(c) > 0.001) {
                                viz.screenText('Pole at z = \u2212d/c = ' + (-d/c).toFixed(2), viz.width / 2, 60, viz.colors.orange, 12);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that every Mobius transformation \\(T(z) = (az+b)/(cz+d)\\) with \\(ad-bc \\neq 0\\) is injective on \\(\\hat{\\mathbb{C}}\\).',
                    hint: 'Suppose \\(T(z_1) = T(z_2)\\) and cross-multiply. Use \\(ad - bc \\neq 0\\).',
                    solution: 'If \\((az_1+b)/(cz_1+d) = (az_2+b)/(cz_2+d)\\), then \\((az_1+b)(cz_2+d) = (az_2+b)(cz_1+d)\\). Expanding: \\(acz_1z_2 + adz_1 + bcz_2 + bd = acz_1z_2 + adz_2 + bcz_1 + bd\\). Simplifying: \\(adz_1 + bcz_2 = adz_2 + bcz_1\\), so \\((ad-bc)(z_1 - z_2) = 0\\). Since \\(ad - bc \\neq 0\\), we get \\(z_1 = z_2\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Definition
        // ================================================================
        {
            id: 'sec-definition',
            title: 'Mobius Transformations',
            content: `
<h2>Mobius Transformations</h2>

<div class="env-block definition">
    <div class="env-title">Definition 14.1 (Mobius Transformation)</div>
    <div class="env-body">
        <p>A <strong>Mobius transformation</strong> (or <em>linear fractional transformation</em>) is a map of the form</p>
        \\[T(z) = \\frac{az + b}{cz + d}\\]
        <p>where \\(a, b, c, d \\in \\mathbb{C}\\) and \\(ad - bc \\neq 0\\). We extend \\(T\\) to the Riemann sphere \\(\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}\\) by setting</p>
        \\[T\\left(-\\frac{d}{c}\\right) = \\infty, \\qquad T(\\infty) = \\frac{a}{c} \\quad (c \\neq 0)\\]
        <p>and \\(T(\\infty) = \\infty\\) when \\(c = 0\\).</p>
    </div>
</div>

<h3>Matrix Representation</h3>

<p>There is a profound connection between Mobius transformations and \\(2 \\times 2\\) matrices. Associate to \\(T\\) the matrix</p>

\\[M_T = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\in GL_2(\\mathbb{C}).\\]

<p>The condition \\(ad - bc \\neq 0\\) is exactly \\(\\det(M_T) \\neq 0\\). Composition of transformations corresponds to matrix multiplication:</p>

\\[M_{T_1 \\circ T_2} = M_{T_1} \\cdot M_{T_2}.\\]

<p>However, the correspondence is not one-to-one: scaling all four entries by the same nonzero constant \\(\\lambda\\) gives the same transformation but a different matrix. So the group of Mobius transformations is isomorphic to \\(PGL_2(\\mathbb{C}) = GL_2(\\mathbb{C}) / \\{\\lambda I\\}\\), the projective general linear group.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.1 (Decomposition)</div>
    <div class="env-body">
        <p>Every Mobius transformation is a composition of at most four basic types:</p>
        <ol>
            <li><strong>Translation</strong>: \\(z \\mapsto z + b\\)</li>
            <li><strong>Scaling/rotation</strong>: \\(z \\mapsto az\\)</li>
            <li><strong>Inversion</strong>: \\(z \\mapsto 1/z\\)</li>
        </ol>
        <p>Specifically, if \\(c \\neq 0\\):</p>
        \\[T(z) = \\frac{az+b}{cz+d} = \\frac{a}{c} - \\frac{ad-bc}{c} \\cdot \\frac{1}{cz+d}.\\]
    </div>
</div>

<p><em>Proof.</em> Write \\(w = cz + d\\) (translation and scaling), then \\(1/w\\) (inversion), then scale and translate to get \\(T(z)\\). Each step is holomorphic away from its singularity. \\(\\square\\)</p>

<h3>Fixed Points</h3>

<p>The fixed points of \\(T\\) satisfy \\(T(z) = z\\), i.e., \\(cz^2 + (d-a)z - b = 0\\). For \\(c \\neq 0\\), this is a quadratic with at most two solutions in \\(\\hat{\\mathbb{C}}\\). This classification by fixed-point structure is key:</p>

<ul>
    <li><strong>Elliptic</strong>: one fixed point in \\(\\mathbb{C}\\), one at \\(\\infty\\) (or two fixed points in \\(\\hat{\\mathbb{C}}\\) with certain multiplier). Acts like a rotation.</li>
    <li><strong>Hyperbolic</strong>: two distinct real fixed points. Acts like a dilation along the real axis.</li>
    <li><strong>Loxodromic</strong>: two fixed points in general position. Combination of rotation and dilation.</li>
    <li><strong>Parabolic</strong>: exactly one fixed point (repeated root). Acts like a translation.</li>
</ul>

<div class="env-block example">
    <div class="env-title">Example: Inversion</div>
    <div class="env-body">
        <p>\\(T(z) = 1/z\\) corresponds to \\(a = 0, b = 1, c = 1, d = 0\\), so \\(ad - bc = -1 \\neq 0\\). Its matrix is \\(\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\). The fixed points satisfy \\(z^2 = 1\\), giving \\(z = \\pm 1\\). This is a hyperbolic transformation with fixed points \\(\\pm 1\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-circle-to-circle"></div>
`,
            visualizations: [
                {
                    id: 'viz-circle-to-circle',
                    title: 'Circles Map to Circles (or Lines)',
                    description: 'Draw a circle by dragging its center and radius point. The image under T(z) = (z-i)/(z+i) is shown in orange. Circles through the pole become lines; all others remain circles.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60 });

                        // Circle defined by center and radius draggable
                        var cx = 0, cy = 1, rx = 0.8, ry = 0;

                        var centerPt = viz.addDraggable('center', cx, cy, viz.colors.blue, 8, function(x, y) {
                            cx = x; cy = y; draw();
                        });
                        var radPt = viz.addDraggable('radius', cx + rx, cy + ry, viz.colors.teal, 8, function(x, y) {
                            rx = x - cx; ry = y - cy; draw();
                        });

                        // T(z) = (z - i) / (z + i)
                        function T(re, im) {
                            var nRe = re, nIm = im - 1;
                            var dRe = re, dIm = im + 1;
                            var denom = dRe * dRe + dIm * dIm;
                            if (denom < 1e-10) return null;
                            return [
                                (nRe * dRe + nIm * dIm) / denom,
                                (nIm * dRe - nRe * dIm) / denom
                            ];
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var r = Math.sqrt(rx * rx + ry * ry);
                            if (r < 0.05) r = 0.05;

                            // Update radius draggable to follow center
                            radPt.x = cx + rx;
                            radPt.y = cy + ry;

                            // Draw source circle
                            viz.drawCircle(cx, cy, r, null, viz.colors.blue, 2);
                            viz.drawPoint(cx, cy, viz.colors.blue, 'C', 4);

                            // Draw image curve by sampling
                            var steps = 300;
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var started = false;
                            var prevX, prevY;
                            for (var i = 0; i <= steps; i++) {
                                var theta = 2 * Math.PI * i / steps;
                                var zRe = cx + r * Math.cos(theta);
                                var zIm = cy + r * Math.sin(theta);
                                var w = T(zRe, zIm);
                                if (!w) { started = false; continue; }
                                var sx = viz.originX + w[0] * viz.scale;
                                var sy = viz.originY - w[1] * viz.scale;
                                if (!isFinite(sx) || !isFinite(sy) || Math.abs(sx) > 2000 || Math.abs(sy) > 2000) {
                                    started = false; continue;
                                }
                                // Detect large jumps (crossing through infinity)
                                if (started && (Math.abs(sx - prevX) > 200 || Math.abs(sy - prevY) > 200)) {
                                    started = false;
                                }
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else { ctx.lineTo(sx, sy); }
                                prevX = sx; prevY = sy;
                            }
                            ctx.stroke();

                            viz.drawDraggables();

                            viz.screenText('T(z) = (z \u2212 i) / (z + i)', viz.width / 2, 20, viz.colors.white, 13);
                            viz.screenText('Source circle (blue)', viz.width / 2, viz.height - 36, viz.colors.blue, 11);
                            viz.screenText('Image circle or line (orange)', viz.width / 2, viz.height - 18, viz.colors.orange, 11);
                            viz.screenText('Drag the center or edge point', viz.width / 2, viz.height - 54, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the image of the unit circle \\(|z| = 1\\) under the Mobius transformation \\(T(z) = (z+1)/(z-1)\\).',
                    hint: 'Parametrize the unit circle as \\(z = e^{i\\theta}\\) and compute \\(T(e^{i\\theta})\\). What is the real part of the result?',
                    solution: 'Write \\(z = e^{i\\theta}\\). Then \\(T(z) = (e^{i\\theta}+1)/(e^{i\\theta}-1) = (e^{i\\theta/2}(e^{i\\theta/2}+e^{-i\\theta/2}))/(e^{i\\theta/2}(e^{i\\theta/2}-e^{-i\\theta/2})) = \\cos(\\theta/2)/(i\\sin(\\theta/2)) = -i\\cot(\\theta/2)\\), which is purely imaginary. So the image is the imaginary axis (a line, which is a degenerate circle through \\(\\infty\\)).'
                },
                {
                    question: 'What is the image of the real axis under \\(T(z) = (z-i)/(z+i)\\)?',
                    hint: 'Substitute \\(z = x\\) (real) and compute \\(|T(x)|\\).',
                    solution: 'For real \\(x\\): \\(T(x) = (x-i)/(x+i)\\). We compute \\(|T(x)|^2 = |x-i|^2/|x+i|^2 = (x^2+1)/(x^2+1) = 1\\). So the image of the real axis is contained in the unit circle. Since \\(T\\) is injective and \\(T(\\infty) = 1\\), the image is the entire unit circle.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Properties
        // ================================================================
        {
            id: 'sec-properties',
            title: 'Properties',
            content: `
<h2>Properties</h2>

<h3>Circles to Circles</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.2 (Circle-Preserving Property)</div>
    <div class="env-body">
        <p>Every Mobius transformation maps circles and lines in \\(\\hat{\\mathbb{C}}\\) to circles and lines. (Lines are circles through \\(\\infty\\).)</p>
    </div>
</div>

<p><em>Proof sketch.</em> It suffices to check the four basic building blocks (translations, scalings, and inversion), since Mobius transformations are compositions of these. Translations and scalings clearly map circles to circles. For inversion \\(z \\mapsto 1/z\\):</p>

<p>A general circle or line in \\(\\mathbb{C}\\) has equation \\(A|z|^2 + Bz + \\bar{B}\\bar{z} + C = 0\\) with \\(A, C \\in \\mathbb{R}\\) and \\(B \\in \\mathbb{C}\\) (\\(A = 0\\) gives a line, \\(A \\neq 0\\) gives a circle). Substituting \\(z = 1/w\\) and multiplying through by \\(|w|^2\\) gives \\(C|w|^2 + Bw + \\bar{B}\\bar{w} + A = 0\\), another circle or line. \\(\\square\\)</p>

<h3>Triple Transitivity</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.3 (Triple Transitivity)</div>
    <div class="env-body">
        <p>Given any three distinct points \\(z_1, z_2, z_3 \\in \\hat{\\mathbb{C}}\\) and any three distinct points \\(w_1, w_2, w_3 \\in \\hat{\\mathbb{C}}\\), there exists a <strong>unique</strong> Mobius transformation \\(T\\) such that \\(T(z_k) = w_k\\) for \\(k = 1, 2, 3\\).</p>
    </div>
</div>

<p><em>Proof.</em> First construct the unique Mobius transformation sending \\(z_1 \\mapsto 0\\), \\(z_2 \\mapsto 1\\), \\(z_3 \\mapsto \\infty\\):</p>

\\[
S(z) = \\frac{(z - z_1)(z_2 - z_3)}{(z - z_3)(z_2 - z_1)}.
\\]

<p>Similarly construct \\(R\\) sending \\(w_1 \\mapsto 0\\), \\(w_2 \\mapsto 1\\), \\(w_3 \\mapsto \\infty\\). Then \\(T = R^{-1} \\circ S\\) does the job. Uniqueness follows because any two such maps differ by a Mobius transformation fixing \\(0, 1, \\infty\\), which must be the identity. \\(\\square\\)</p>

<h3>Group Structure</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.4 (Group of Symmetries)</div>
    <div class="env-body">
        <p>The set of all Mobius transformations forms a group under composition, denoted \\(\\text{Mob}(\\hat{\\mathbb{C}})\\). This group is isomorphic to \\(PSL_2(\\mathbb{C}) = SL_2(\\mathbb{C})/\\{\\pm I\\}\\).</p>
    </div>
</div>

<p>The group is non-abelian. The inverse of \\(T(z) = (az+b)/(cz+d)\\) is</p>

\\[
T^{-1}(z) = \\frac{dz - b}{-cz + a}.
\\]

<p>This corresponds to the matrix inverse \\(\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}\\), consistent with the matrix-product composition law.</p>

<div class="env-block remark">
    <div class="env-title">Why \\(PSL_2\\) Not \\(GL_2\\)</div>
    <div class="env-body">
        <p>We normalize by \\(\\det = 1\\) (using \\(SL_2\\)) and further quotient by \\(\\pm I\\) (since \\(T\\) and \\(-T\\) define the same map) to get \\(PSL_2(\\mathbb{C})\\). The group \\(PSL_2(\\mathbb{C})\\) has dimension 6 as a real Lie group.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the composition of two Mobius transformations is again a Mobius transformation by direct computation using the matrix representation.',
                    hint: 'Compute the product of two matrices \\(\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\begin{pmatrix}e&f\\\\g&h\\end{pmatrix}\\) and check that the determinant of the product is the product of the determinants.',
                    solution: 'The product is \\(\\begin{pmatrix}ae+bg & af+bh \\\\ ce+dg & cf+dh\\end{pmatrix}\\). Its determinant is \\((ae+bg)(cf+dh) - (af+bh)(ce+dg) = (ad-bc)(eh-fg) \\neq 0\\) since both factors are nonzero. The corresponding transformation is \\(T_1 \\circ T_2(z) = ((ae+bg)z+(af+bh))/((ce+dg)z+(cf+dh))\\), which is a Mobius transformation.'
                },
                {
                    question: 'Find the Mobius transformation sending \\(0 \\mapsto 1\\), \\(1 \\mapsto i\\), \\(\\infty \\mapsto -1\\).',
                    hint: 'Use the formula from Theorem 14.3. First find \\(S\\) sending \\(0,1,\\infty \\to 0,1,\\infty\\) and \\(R\\) sending \\(1,i,-1 \\to 0,1,\\infty\\), then compose.',
                    solution: 'We need \\(T(z) = (az+b)/(cz+d)\\). From \\(T(\\infty) = a/c = -1\\) we get \\(a = -c\\). From \\(T(0) = b/d = 1\\) we get \\(b = d\\). Then \\(T(1) = (a+b)/(c+d) = (-c+d)/(c+d) = i\\). This gives \\(-c+d = ic+id\\), so \\(d(1-i) = c(1+i)\\), hence \\(d/c = (1+i)/(1-i) = i\\). Taking \\(c = 1, d = i, a = -1, b = i\\): \\(T(z) = (-z+i)/(z+i)\\). Check: \\(T(0) = i/i = 1\\checkmark\\), \\(T(1) = (-1+i)/(1+i) = (-1+i)(1-i)/2 = (-1+i+i+1)/2 = i\\checkmark\\), \\(T(\\infty) = -1/1 = -1\\checkmark\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Cross Ratio
        // ================================================================
        {
            id: 'sec-cross-ratio',
            title: 'Cross Ratio',
            content: `
<h2>Cross Ratio</h2>

<div class="env-block definition">
    <div class="env-title">Definition 14.2 (Cross Ratio)</div>
    <div class="env-body">
        <p>The <strong>cross ratio</strong> of four distinct points \\(z_1, z_2, z_3, z_4 \\in \\hat{\\mathbb{C}}\\) is</p>
        \\[(z_1, z_2; z_3, z_4) = \\frac{(z_1 - z_3)(z_2 - z_4)}{(z_1 - z_4)(z_2 - z_3)}.\\]
        <p>If any \\(z_k = \\infty\\), the formula extends by taking the appropriate limit (canceling factors involving \\(\\infty\\)).</p>
    </div>
</div>

<p>The cross ratio is the fundamental invariant of Mobius geometry:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.5 (Invariance of Cross Ratio)</div>
    <div class="env-body">
        <p>If \\(T\\) is any Mobius transformation, then</p>
        \\[(T(z_1), T(z_2); T(z_3), T(z_4)) = (z_1, z_2; z_3, z_4).\\]
        <p>Conversely, the cross ratio is the <em>only</em> independent invariant: two quadruples of distinct points are related by a Mobius transformation if and only if their cross ratios are equal.</p>
    </div>
</div>

<p><em>Proof.</em> By Theorem 14.3, there exists a unique Mobius transformation \\(S\\) sending \\(z_1 \\mapsto 0\\), \\(z_2 \\mapsto \\infty\\), \\(z_3 \\mapsto 1\\). One computes that \\(S(z) = (z_1, z; z_3, z_2)\\) (where we use \\(z\\) in the second slot). For any Mobius \\(T\\), the transformation \\(S \\circ T^{-1}\\) sends \\(Tz_1 \\mapsto 0\\), \\(Tz_2 \\mapsto \\infty\\), \\(Tz_3 \\mapsto 1\\). So \\(S \\circ T^{-1}(w) = (Tz_1, w; Tz_3, Tz_2)\\), and substituting \\(w = T(z_4)\\) gives the result. \\(\\square\\)</p>

<h3>Circles and Cross Ratio</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.6 (Real Cross Ratio = Concyclicity)</div>
    <div class="env-body">
        <p>Four distinct points \\(z_1, z_2, z_3, z_4 \\in \\hat{\\mathbb{C}}\\) lie on a common circle or line if and only if their cross ratio \\((z_1, z_2; z_3, z_4)\\) is real.</p>
    </div>
</div>

<p>This elegant characterization says that Mobius geometry "sees" circles as the loci of constant (real) cross ratio. The cross ratio also measures the angle at which circles intersect.</p>

<div class="env-block example">
    <div class="env-title">Example: Unit Circle</div>
    <div class="env-body">
        <p>Take \\(z_1 = 1, z_2 = i, z_3 = -1\\) on the unit circle and a fourth point \\(z_4\\). Compute \\((1, i; -1, z_4)\\):</p>
        \\[(1, i; -1, z_4) = \\frac{(1-(-1))(i - z_4)}{(1 - z_4)(i - (-1))} = \\frac{2(i - z_4)}{(1 - z_4)(1+i)}.\\]
        <p>This is real if and only if \\(z_4\\) lies on the unit circle (or real axis). One can verify this by writing \\(z_4 = e^{i\\phi}\\) and checking the imaginary part vanishes.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-cross-ratio"></div>
`,
            visualizations: [
                {
                    id: 'viz-cross-ratio',
                    title: 'Cross Ratio: Four Draggable Points',
                    description: 'Drag any of the four points. The cross ratio (z1,z2;z3,z4) is computed in real time. When the four points are concyclic, the cross ratio is real (imaginary part = 0).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 70 });

                        var pts = [
                            { x: 1, y: 0, color: viz.colors.blue, label: 'z\u2081' },
                            { x: 0, y: 1, color: viz.colors.teal, label: 'z\u2082' },
                            { x: -1, y: 0, color: viz.colors.orange, label: 'z\u2083' },
                            { x: 0, y: -1, color: viz.colors.purple, label: 'z\u2084' }
                        ];

                        pts.forEach(function(p, i) {
                            viz.addDraggable('pt' + i, p.x, p.y, p.color, 9, function(x, y) {
                                p.x = x; p.y = y; draw();
                            });
                        });

                        function cmul(a, b) { return [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]]; }
                        function cdiv(a, b) {
                            var d = b[0]*b[0]+b[1]*b[1];
                            if (d < 1e-12) return [Infinity, Infinity];
                            return [(a[0]*b[0]+a[1]*b[1])/d, (a[1]*b[0]-a[0]*b[1])/d];
                        }
                        function csub(a, b) { return [a[0]-b[0], a[1]-b[1]]; }

                        function crossRatio(z1, z2, z3, z4) {
                            // (z1-z3)(z2-z4) / ((z1-z4)(z2-z3))
                            var num = cmul(csub(z1, z3), csub(z2, z4));
                            var den = cmul(csub(z1, z4), csub(z2, z3));
                            return cdiv(num, den);
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var z = pts.map(function(p) { return [p.x, p.y]; });
                            var cr = crossRatio(z[0], z[1], z[2], z[3]);

                            // Draw lines connecting consecutive points (as visual guide)
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            for (var i = 0; i < 4; i++) {
                                var [sx1, sy1] = viz.toScreen(pts[i].x, pts[i].y);
                                var [sx2, sy2] = viz.toScreen(pts[(i+1)%4].x, pts[(i+1)%4].y);
                                ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
                            }
                            ctx.setLineDash([]);

                            // Draw circumscribed circle hint when nearly real
                            var isReal = Math.abs(cr[1]) < 0.05 && isFinite(cr[0]);
                            if (isReal) {
                                // Fit circle through first three pts
                                var ax = pts[0].x, ay = pts[0].y;
                                var bx = pts[1].x, by = pts[1].y;
                                var cx2 = pts[2].x, cy2 = pts[2].y;
                                var D = 2*(ax*(by-cy2)+bx*(cy2-ay)+cx2*(ay-by));
                                if (Math.abs(D) > 0.001) {
                                    var ux = ((ax*ax+ay*ay)*(by-cy2)+(bx*bx+by*by)*(cy2-ay)+(cx2*cx2+cy2*cy2)*(ay-by))/D;
                                    var uy = ((ax*ax+ay*ay)*(cx2-bx)+(bx*bx+by*by)*(ax-cx2)+(cx2*cx2+cy2*cy2)*(bx-ax))/D;
                                    var r = Math.sqrt((ax-ux)*(ax-ux)+(ay-uy)*(ay-uy));
                                    viz.drawCircle(ux, uy, r, null, viz.colors.green + '66', 1.5);
                                }
                            }

                            // Draw draggable points
                            viz.drawDraggables();
                            pts.forEach(function(p) {
                                viz.screenText(p.label, viz.originX + p.x*viz.scale + 12, viz.originY - p.y*viz.scale - 12, p.color, 12);
                            });

                            // Display cross ratio
                            var reStr = cr[0].toFixed(4);
                            var imStr = (cr[1] >= 0 ? '+' : '') + cr[1].toFixed(4) + 'i';
                            var crStr = isFinite(cr[0]) ? reStr + ' ' + imStr : '\u221e';
                            var crColor = Math.abs(cr[1]) < 0.05 ? viz.colors.green : viz.colors.white;
                            viz.screenText('(z\u2081,z\u2082;z\u2083,z\u2084) = ' + crStr, viz.width / 2, 20, crColor, 14);

                            if (isReal) {
                                viz.screenText('REAL \u2014 four points are concyclic', viz.width / 2, 42, viz.colors.green, 11);
                            } else {
                                viz.screenText('Im \u2260 0 \u2014 points not concyclic', viz.width / 2, 42, viz.colors.text, 11);
                            }
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the cross ratio \\((0, 1; -1, \\infty)\\).',
                    hint: 'When \\(z_4 = \\infty\\), the cross ratio formula simplifies: the terms \\((z_k - \\infty)\\) cancel. The result is \\((z_1-z_3)/(z_2-z_3)\\).',
                    solution: 'Using the limit as \\(z_4 \\to \\infty\\): \\((z_1,z_2;z_3,\\infty) = (z_1-z_3)/(z_2-z_3)\\). So \\((0,1;-1,\\infty) = (0-(-1))/(1-(-1)) = 1/2\\). This is real, consistent with the fact that \\(0,1,-1,\\infty\\) all lie on the real axis (a circle through \\(\\infty\\)).'
                },
                {
                    question: 'Four points \\(1, i, -1, w\\) are concyclic (on the unit circle). Use the cross ratio to find \\(w\\).',
                    hint: 'The cross ratio must be real. Use \\((1, i; -1, w) \\in \\mathbb{R}\\) and parametrize \\(w = e^{i\\theta}\\).',
                    solution: 'Any point on the unit circle works. For instance, \\(w = -i\\) gives cross ratio \\((1,i;-1,-i) = (1-(-1))(i-(-i)) / ((1-(-i))(i-(-1))) = 2 \\cdot 2i / ((1+i)(1+i)) = 4i/(2i) = 2\\), which is real. More generally, the concyclicity condition uniquely determines the circle (the unit circle) through any three of the four points; the fourth must lie on it too.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Special Mobius Maps
        // ================================================================
        {
            id: 'sec-special',
            title: 'Special Mobius Maps',
            content: `
<h2>Special Mobius Maps</h2>

<h3>Automorphisms of the Unit Disk</h3>

<p>Let \\(\\mathbb{D} = \\{z : |z| < 1\\}\\) denote the open unit disk. A biholomorphic map \\(\\mathbb{D} \\to \\mathbb{D\\) is called an automorphism of the disk. What does \\(\\text{Aut}(\\mathbb{D})\\) look like?</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.7 (Disk Automorphisms)</div>
    <div class="env-body">
        <p>Every automorphism of \\(\\mathbb{D}\\) has the form</p>
        \\[T(z) = e^{i\\theta} \\frac{z - a}{1 - \\bar{a}z}\\]
        <p>for some \\(\\theta \\in \\mathbb{R}\\) and \\(a \\in \\mathbb{D}\\). These are called <strong>Blaschke factors</strong> (times a rotation). The group \\(\\text{Aut}(\\mathbb{D})\\) is isomorphic to \\(PSU(1,1)\\).</p>
    </div>
</div>

<p><em>Proof sketch.</em> By the Schwarz-Pick lemma, any automorphism \\(T\\) with \\(T(a) = 0\\) satisfies \\(|T(z)| \\leq |\\varphi_a(z)|\\) where \\(\\varphi_a(z) = (z-a)/(1-\\bar{a}z)\\). Applying the same argument to \\(T^{-1}\\) shows \\(T = e^{i\\theta}\\varphi_a\\). \\(\\square\\)</p>

<p>The Blaschke factor \\(\\varphi_a(z) = (z-a)/(1-\\bar{a}z)\\) maps \\(a \\mapsto 0\\), sends the unit circle to itself (since \\(|z|=1 \\Rightarrow |\\varphi_a(z)| = 1\\)), and is its own inverse: \\(\\varphi_a \\circ \\varphi_a = \\text{id}\\).</p>

<h3>The Cayley Transform</h3>

<div class="env-block definition">
    <div class="env-title">Definition 14.3 (Cayley Transform)</div>
    <div class="env-body">
        <p>The <strong>Cayley transform</strong> is the Mobius transformation</p>
        \\[C(z) = \\frac{z - i}{z + i}.\\]
        <p>It maps the upper half-plane \\(\\mathbb{H} = \\{z : \\text{Im}(z) > 0\\}\\) biholomorphically onto the unit disk \\(\\mathbb{D}\\), with inverse</p>
        \\[C^{-1}(w) = i \\frac{1 + w}{1 - w}.\\]
    </div>
</div>

<p>The Cayley transform is used to transfer results between the half-plane and the disk models. For instance, the automorphisms of \\(\\mathbb{H}\\) (which are Mobius maps preserving the real axis and the upper half-plane) correspond to automorphisms of \\(\\mathbb{D}\\) under conjugation by \\(C\\).</p>

<p>The automorphisms of the upper half-plane are:</p>

\\[
T(z) = \\frac{az + b}{cz + d}, \\quad a, b, c, d \\in \\mathbb{R},\ ad - bc > 0.
\\]

<p>This group is \\(PSL_2(\\mathbb{R})\\), a three-dimensional real Lie group.</p>

<div class="env-block example">
    <div class="env-title">Example: Where Does the Real Axis Go?</div>
    <div class="env-body">
        <p>Under \\(C(z) = (z-i)/(z+i)\\):</p>
        <ul>
            <li>\\(z = 0 \\mapsto -i/i = -1\\)</li>
            <li>\\(z = 1 \\mapsto (1-i)/(1+i) = -i\\) (check: \\(|-i|=1\\checkmark\\))</li>
            <li>\\(z = -1 \\mapsto (-1-i)/(-1+i) = i\\)</li>
            <li>\\(z = \\infty \\mapsto 1\\)</li>
        </ul>
        <p>The real axis maps to the unit circle, and the upper half-plane maps to the unit disk.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-disk-automorphism"></div>
<div class="viz-placeholder" data-viz="viz-cayley-transform"></div>
`,
            visualizations: [
                {
                    id: 'viz-disk-automorphism',
                    title: 'Disk Automorphisms: Blaschke Factors',
                    description: 'Drag the point "a" inside the unit disk. The Blaschke factor T(z) = (z-a)/(1-conj(a)*z) is applied to a grid of circles. Notice the unit circle maps to itself.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 540, height: 420, scale: 140 });

                        var ax = 0.3, ay = 0.2;
                        var thetaVal = 0;

                        VizEngine.createSlider(controls, '\u03b8 (rotation)', 0, 6.28, 0, 0.05, function(v) {
                            thetaVal = v; draw();
                        });

                        viz.addDraggable('a', ax, ay, viz.colors.orange, 8, function(x, y) {
                            var r = Math.sqrt(x*x + y*y);
                            if (r >= 0.95) { x *= 0.9/r; y *= 0.9/r; }
                            ax = x; ay = y; draw();
                        });

                        function blaschke(zr, zi, ar, ai) {
                            // (z - a) / (1 - conj(a)*z)
                            var nr = zr - ar, ni = zi - ai;
                            // conj(a)*z = (ar - i*ai)*(zr + i*zi) = ar*zr + ai*zi + i*(ar*zi - ai*zr)
                            var dr = 1 - (ar*zr + ai*zi);
                            var di = -(ar*zi - ai*zr);
                            var denom = dr*dr + di*di;
                            if (denom < 1e-10) return null;
                            return [(nr*dr + ni*di)/denom, (ni*dr - nr*di)/denom];
                        }

                        function applyRotBlascke(zr, zi) {
                            var w = blaschke(zr, zi, ax, ay);
                            if (!w) return null;
                            var cos = Math.cos(thetaVal), sin = Math.sin(thetaVal);
                            return [cos*w[0] - sin*w[1], sin*w[0] + cos*w[1]];
                        }

                        function drawMappedCurve(paramFn, nSteps, color) {
                            var ctx = viz.ctx;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= nSteps; i++) {
                                var t = i / nSteps;
                                var [zr, zi] = paramFn(t);
                                var w = applyRotBlascke(zr, zi);
                                if (!w) { started = false; continue; }
                                var sx = viz.originX + w[0]*viz.scale;
                                var sy = viz.originY - w[1]*viz.scale;
                                if (!isFinite(sx) || Math.abs(sx) > 2000) { started = false; continue; }
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw unit disk boundary (source)
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, Math.PI*2);
                            ctx.stroke();

                            // Grid of concentric circles inside the disk
                            var radii = [0.2, 0.4, 0.6, 0.8];
                            radii.forEach(function(r) {
                                drawMappedCurve(function(t) {
                                    return [r*Math.cos(2*Math.PI*t), r*Math.sin(2*Math.PI*t)];
                                }, 120, viz.colors.blue + '88');
                            });

                            // Grid of radial lines
                            var angles = [0, Math.PI/4, Math.PI/2, 3*Math.PI/4];
                            angles.forEach(function(ang) {
                                drawMappedCurve(function(t) {
                                    return [t*0.95*Math.cos(ang), t*0.95*Math.sin(ang)];
                                }, 60, viz.colors.teal + '88');
                                drawMappedCurve(function(t) {
                                    return [t*0.95*Math.cos(ang+Math.PI), t*0.95*Math.sin(ang+Math.PI)];
                                }, 60, viz.colors.teal + '88');
                            });

                            // Unit circle image (should stay unit circle)
                            drawMappedCurve(function(t) {
                                return [Math.cos(2*Math.PI*t), Math.sin(2*Math.PI*t)];
                            }, 200, viz.colors.white);

                            viz.drawDraggables();

                            // Mark the image of the origin (should be -a with rotation)
                            var img0 = applyRotBlascke(0, 0);
                            if (img0) viz.drawPoint(img0[0], img0[1], viz.colors.green, 'T(0)', 5);

                            viz.screenText('T(z) = e^{i\u03b8} (z\u2212a)/(1\u2212\u0101z)', viz.width/2, 18, viz.colors.white, 13);
                            viz.screenText('a = (' + ax.toFixed(2) + ', ' + ay.toFixed(2) + 'i)', viz.width/2, 36, viz.colors.orange, 11);
                            viz.screenText('Unit circle maps to itself', viz.width/2, viz.height - 16, viz.colors.text, 10);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-cayley-transform',
                    title: 'Cayley Transform: Half-Plane to Disk',
                    description: 'The Cayley transform C(z)=(z-i)/(z+i) maps the upper half-plane to the unit disk. Horizontal lines map to circles through 1; vertical lines map to circles through -1. Toggle the animation to see the continuous interpolation.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 55 });
                        var t = 0, animating = false;

                        var btn = VizEngine.createButton(controls, 'Animate', function() {
                            animating = !animating;
                            btn.textContent = animating ? 'Stop' : 'Animate';
                            if (animating) viz.animate(function() { t = (t + 0.01) % 1; draw(t); });
                            else viz.stopAnimation();
                        });

                        function cayley(zr, zi) {
                            // C(z) = (z - i)/(z + i)
                            var nr = zr, ni = zi - 1;
                            var dr = zr, di = zi + 1;
                            var d = dr*dr + di*di;
                            if (d < 1e-10) return null;
                            return [(nr*dr + ni*di)/d, (ni*dr - nr*di)/d];
                        }

                        function lerp(a, b, t) { return a + (b-a)*t; }

                        // Map a curve in the half-plane at interpolation t
                        function drawCurveInterp(paramFn, nSteps, color, tInterp) {
                            var ctx = viz.ctx;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i <= nSteps; i++) {
                                var s = i / nSteps;
                                var [zr, zi] = paramFn(s);
                                // Interpolate between identity and Cayley
                                var w = cayley(zr, zi);
                                if (!w) { started = false; continue; }
                                var wr = lerp(zr, w[0], tInterp);
                                var wi = lerp(zi, w[1], tInterp);
                                var sx = viz.originX + wr*viz.scale;
                                var sy = viz.originY - wi*viz.scale;
                                if (!isFinite(sx) || Math.abs(sx) > 1500 || Math.abs(sy) > 1500) { started = false; continue; }
                                if (!started) { ctx.moveTo(sx, sy); started = true; }
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                        }

                        function draw(tInterp) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            // Horizontal lines in upper half-plane
                            var heights = [0.3, 0.6, 1.0, 1.5, 2.5];
                            heights.forEach(function(h, idx) {
                                var col = idx % 2 === 0 ? viz.colors.blue : viz.colors.teal;
                                drawCurveInterp(function(s) {
                                    return [lerp(-5, 5, s), h];
                                }, 200, col + 'aa', tInterp);
                            });

                            // Vertical lines in upper half-plane
                            var xs = [-3, -2, -1, 0, 1, 2, 3];
                            xs.forEach(function(x, idx) {
                                var col = idx % 2 === 0 ? viz.colors.orange : viz.colors.purple;
                                drawCurveInterp(function(s) {
                                    return [x, lerp(0.05, 4, s)];
                                }, 100, col + 'aa', tInterp);
                            });

                            // Draw unit circle (target)
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, Math.PI*2);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            viz.screenText('C(z) = (z \u2212 i)/(z + i)', viz.width/2, 18, viz.colors.white, 13);
                            var pct = Math.round(tInterp * 100);
                            viz.screenText('Interpolation: ' + pct + '%  (' + (tInterp < 0.1 ? 'half-plane' : tInterp > 0.9 ? 'disk' : 'in between') + ')',
                                viz.width/2, viz.height - 16, viz.colors.text, 11);
                        }
                        draw(0);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the Blaschke factor \\(\\varphi_a(z) = (z-a)/(1-\\bar{a}z)\\) maps the unit circle to itself for any \\(a \\in \\mathbb{D}\\).',
                    hint: 'Let \\(|z| = 1\\), i.e., \\(z\\bar{z} = 1\\). Compute \\(|\\varphi_a(z)|^2\\).',
                    solution: 'For \\(|z|=1\\): \\(|\\varphi_a(z)|^2 = |z-a|^2/|1-\\bar{a}z|^2\\). Now \\(|z-a|^2 = (z-a)(\\bar{z}-\\bar{a}) = 1 - a\\bar{z} - \\bar{a}z + |a|^2\\). And \\(|1-\\bar{a}z|^2 = (1-\\bar{a}z)(1-a\\bar{z}) = 1 - a\\bar{z} - \\bar{a}z + |a|^2\\). These are equal, so \\(|\\varphi_a(z)| = 1\\).'
                },
                {
                    question: 'Find the inverse of the Cayley transform: given \\(w = (z-i)/(z+i)\\), express \\(z\\) in terms of \\(w\\).',
                    hint: 'Solve \\(w(z+i) = z-i\\) for \\(z\\).',
                    solution: 'From \\(w(z+i) = z-i\\): \\(wz + wi = z - i\\), so \\(z(w-1) = -i - wi = -i(1+w)\\), giving \\(z = -i(1+w)/(w-1) = i(1+w)/(1-w)\\). So \\(C^{-1}(w) = i(1+w)/(1-w)\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Hyperbolic Geometry
        // ================================================================
        {
            id: 'sec-geometry',
            title: 'Hyperbolic Geometry',
            content: `
<h2>Hyperbolic Geometry</h2>

<div class="env-block intuition">
    <div class="env-title">Geometry from Symmetry Groups</div>
    <div class="env-body">
        <p>Klein's Erlangen program characterizes geometries by their symmetry groups. Euclidean geometry has rigid motions (translations, rotations, reflections). What geometry has the disk automorphisms as its symmetry group? The answer is non-Euclidean (hyperbolic) geometry, discovered independently by Bolyai and Lobachevsky in the 1830s.</p>
    </div>
</div>

<h3>The Poincare Disk Model</h3>

<p>The <strong>Poincare disk model</strong> of the hyperbolic plane is the unit disk \\(\\mathbb{D}\\) equipped with the Riemannian metric</p>

\\[
ds^2 = \\frac{4(dx^2 + dy^2)}{(1 - |z|^2)^2} = \\frac{4|dz|^2}{(1-|z|^2)^2}.
\\]

<p>Under this metric:</p>
<ul>
    <li>The boundary circle \\(|z| = 1\\) is "at infinity": any path approaching it has infinite hyperbolic length.</li>
    <li>Straight lines (geodesics) are arcs of circles orthogonal to the boundary, plus diameters.</li>
    <li>Disk automorphisms (Blaschke factors times rotations) are exactly the isometries.</li>
</ul>

<div class="env-block theorem">
    <div class="env-title">Theorem 14.8 (Hyperbolic Distance)</div>
    <div class="env-body">
        <p>The hyperbolic distance between two points \\(z, w \\in \\mathbb{D}\\) is</p>
        \\[d_{\mathbb{H}}(z, w) = 2 \\tanh^{-1}\\left|\\frac{z - w}{1 - \\bar{w}z}\\right| = \\ln \\frac{1 + \\left|\\frac{z-w}{1-\\bar{w}z}\\right|}{1 - \\left|\\frac{z-w}{1-\\bar{w}z}\\right|}.\\]
        <p>The expression \\(\\left|(z-w)/(1-\\bar{w}z)\\right|\\) is the absolute value of the Blaschke factor \\(\\varphi_w(z)\\).</p>
    </div>
</div>

<p>This shows that Blaschke factors are not just conformal automorphisms of the disk; they are the isometries of hyperbolic space. The formula has a beautiful invariance: if \\(T\\) is any disk automorphism, then \\(d_{\\mathbb{H}}(T(z), T(w)) = d_{\\mathbb{H}}(z,w)\\).</p>

<h3>Geodesics</h3>

<p>Geodesics in the Poincare disk are precisely the arcs of circles that meet the boundary unit circle at right angles (90 degrees), together with diameters (which are the special case where the geodesic circle has infinite radius).</p>

<p>Given two points \\(z_1, z_2 \\in \\mathbb{D}\\), the unique geodesic through them is found by applying a disk automorphism to map one point to the origin, then the geodesic is a diameter, and mapping back.</p>

<div class="env-block remark">
    <div class="env-title">Parallel Postulate Violated</div>
    <div class="env-body">
        <p>Euclid's fifth postulate says: through a point not on a line, there is exactly one parallel line. In the Poincare disk, through any point not on a geodesic, there are infinitely many geodesics that do not intersect the given one. This is the hallmark of hyperbolic geometry.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-poincare-disk"></div>
`,
            visualizations: [
                {
                    id: 'viz-poincare-disk',
                    title: 'Poincare Disk: Hyperbolic Geometry',
                    description: 'Drag the two orange points inside the unit disk. The geodesic (hyperbolic straight line) connecting them is drawn as a circular arc orthogonal to the boundary. Multiple parallel geodesics through the green point are shown.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 460, scale: 170 });

                        var p1 = { x: -0.4, y: 0.2 };
                        var p2 = { x: 0.5, y: -0.3 };

                        viz.addDraggable('p1', p1.x, p1.y, viz.colors.orange, 8, function(x, y) {
                            var r = Math.sqrt(x*x+y*y);
                            if (r >= 0.95) { x *= 0.9/r; y *= 0.9/r; }
                            p1.x = x; p1.y = y; draw();
                        });
                        viz.addDraggable('p2', p2.x, p2.y, viz.colors.teal, 8, function(x, y) {
                            var r = Math.sqrt(x*x+y*y);
                            if (r >= 0.95) { x *= 0.9/r; y *= 0.9/r; }
                            p2.x = x; p2.y = y; draw();
                        });

                        // Find circle orthogonal to unit circle through two points
                        // A circle orthogonal to |z|=1 has center on the line through z and 1/conj(z) pole
                        function geodesicArc(z1r, z1i, z2r, z2i, ctx, color) {
                            // If both points are collinear with origin: draw diameter
                            var cross = z1r * z2i - z1i * z2r;
                            if (Math.abs(cross) < 1e-4) {
                                // Diameter
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(viz.originX - viz.scale, viz.originY);
                                ctx.lineTo(viz.originX + viz.scale, viz.originY);
                                if (Math.abs(z1r) < 1e-4) {
                                    ctx.moveTo(viz.originX, viz.originY - viz.scale);
                                    ctx.lineTo(viz.originX, viz.originY + viz.scale);
                                }
                                ctx.stroke();
                                return;
                            }

                            // Find the unique circle through z1, z2 and their inversions 1/conj(z)
                            // Using the formula: center is intersection of perpendicular bisectors
                            // of (z1, inv(z1)) and (z2, inv(z2))
                            // inv(z) = z/|z|^2 (inversion in unit circle = complex conjugate reciprocal)
                            // For orthogonality, we need center c, radius r: |c|^2 = r^2 + 1
                            // The orthogonal circle passes through z1 and z2; its center c is real if z1,z2 symmetric,
                            // but in general we find c from the two equations |c - z1|^2 = |c - z2|^2 = r^2
                            // combined with |c|^2 - r^2 = 1 (orthogonality)

                            // |c - z1|^2 = r^2  =>  |c|^2 - 2Re(c*conj(z1)) + |z1|^2 = r^2
                            // Using |c|^2 = r^2 + 1:  1 - 2Re(c*conj(z1)) + |z1|^2 = 0
                            // => Re(c*conj(z1)) = (1 + |z1|^2)/2
                            // Similarly Re(c*conj(z2)) = (1 + |z2|^2)/2
                            // This is a 2x2 linear system for (Re(c), Im(c)):
                            // [z1r, z1i] [cr]   [(1+|z1|^2)/2]
                            // [z2r, z2i] [ci] = [(1+|z2|^2)/2]

                            var b1 = (1 + z1r*z1r + z1i*z1i) / 2;
                            var b2 = (1 + z2r*z2r + z2i*z2i) / 2;
                            var det = z1r*z2i - z1i*z2r;
                            if (Math.abs(det) < 1e-8) return;
                            var cr = (b1*z2i - b2*z1i) / det;
                            var ci = (z1r*b2 - z2r*b1) / det;
                            var r2 = cr*cr + ci*ci - 1;
                            if (r2 <= 0) return;
                            var r = Math.sqrt(r2);

                            // Find arc angles from center to p1 and p2
                            var ang1 = Math.atan2(z1i - ci, z1r - cr);
                            var ang2 = Math.atan2(z2i - ci, z2r - cr);

                            // Draw arc
                            var scx = viz.originX + cr * viz.scale;
                            var scy = viz.originY - ci * viz.scale;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            // Draw arc in the direction that stays inside unit disk
                            // Use the shorter arc
                            var diff = ang2 - ang1;
                            while (diff > Math.PI) diff -= 2*Math.PI;
                            while (diff < -Math.PI) diff += 2*Math.PI;
                            ctx.arc(scx, scy, r * viz.scale, ang1, ang2, diff < 0);
                            ctx.stroke();
                        }

                        function hyperbolicDist(z1r, z1i, z2r, z2i) {
                            var nr = z1r - z2r, ni = z1i - z2i;
                            var dr = 1 - (z2r*z1r + z2i*z1i);
                            var di = -(z2r*z1i - z2i*z1r);
                            // Wait, 1 - conj(w)*z where w=z2:
                            // conj(z2)*z1 = (z2r - i*z2i)*(z1r + i*z1i) = z2r*z1r + z2i*z1i + i*(z2r*z1i - z2i*z1r)
                            dr = 1 - (z2r*z1r + z2i*z1i);
                            di = -(z2r*z1i - z2i*z1r);
                            var num = Math.sqrt(nr*nr + ni*ni);
                            var denom = Math.sqrt(dr*dr + di*di);
                            if (denom < 1e-10) return Infinity;
                            var ratio = num / denom;
                            if (ratio >= 1) return Infinity;
                            return 2 * Math.atanh(ratio);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw unit disk
                            ctx.fillStyle = '#0c1020';
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, Math.PI*2);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(viz.originX, viz.originY, viz.scale, 0, Math.PI*2);
                            ctx.stroke();

                            // Draw several geodesics through p2 that don't intersect geodesic p1-p2 (parallels)
                            var parallelAngles = [0.3, 0.6, 1.0, 1.4, 1.8, 2.2, 2.6];
                            parallelAngles.forEach(function(ang) {
                                var qx = p2.x + 0.35*Math.cos(ang + Math.PI/2);
                                var qy = p2.y + 0.35*Math.sin(ang + Math.PI/2);
                                var r = Math.sqrt(qx*qx + qy*qy);
                                if (r > 0.85) { qx *= 0.85/r; qy *= 0.85/r; }
                                geodesicArc(p2.x, p2.y, qx, qy, ctx, viz.colors.purple + '55');
                            });

                            // Main geodesic between p1 and p2
                            geodesicArc(p1.x, p1.y, p2.x, p2.y, ctx, viz.colors.blue);

                            viz.drawDraggables();
                            viz.screenText('z\u2081', viz.originX + p1.x*viz.scale + 12, viz.originY - p1.y*viz.scale - 10, viz.colors.orange, 12);
                            viz.screenText('z\u2082', viz.originX + p2.x*viz.scale + 12, viz.originY - p2.y*viz.scale - 10, viz.colors.teal, 12);

                            var dist = hyperbolicDist(p1.x, p1.y, p2.x, p2.y);
                            viz.screenText('Hyperbolic distance: ' + (isFinite(dist) ? dist.toFixed(4) : '\u221e'), viz.width/2, 18, viz.colors.white, 13);
                            viz.screenText('Blue: geodesic through z\u2081, z\u2082', viz.width/2, viz.height - 36, viz.colors.blue, 11);
                            viz.screenText('Purple: parallel geodesics through z\u2082', viz.width/2, viz.height - 18, viz.colors.purple, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the Poincare disk metric \\(ds^2 = 4|dz|^2/(1-|z|^2)^2\\) is preserved by Blaschke factors \\(\\varphi_a(z) = (z-a)/(1-\\bar{a}z)\\).',
                    hint: 'Compute \\(|\\varphi_a\'(z)|\\) and show that \\(1 - |\\varphi_a(z)|^2 = |\\varphi_a\'(z)|(1-|z|^2)\\).',
                    solution: '\\(\\varphi_a\'(z) = (1-\\bar{a}z-\\bar{a}(z-a))/(1-\\bar{a}z)^2\\cdot(1-\\bar{a}z) = (1-|a|^2)/(1-\\bar{a}z)^2\\). Also \\(1-|\\varphi_a(z)|^2 = 1 - |z-a|^2/|1-\\bar{a}z|^2 = (|1-\\bar{a}z|^2 - |z-a|^2)/|1-\\bar{a}z|^2 = (1-|a|^2)(1-|z|^2)/|1-\\bar{a}z|^2\\). The pullback metric is \\(4|\\varphi_a\'(z)|^2|dz|^2/(1-|\\varphi_a(z)|^2)^2 = 4 \\cdot (1-|a|^2)^2/|1-\\bar{a}z|^4 \\cdot |dz|^2 / ((1-|a|^2)^2(1-|z|^2)^2/|1-\\bar{a}z|^4) = 4|dz|^2/(1-|z|^2)^2\\).'
                },
                {
                    question: 'In the upper half-plane model, geodesics are semicircles orthogonal to the real axis and vertical rays. What is the geodesic connecting \\(i\\) and \\(2i\\)? What is their hyperbolic distance?',
                    hint: 'Both points lie on the imaginary axis. The geodesic is the vertical ray \\(\\{iy : y > 0\\}\\). Use \\(d_{\\mathbb{H}}(iy_1, iy_2) = |\\ln(y_2/y_1)|\\).',
                    solution: 'The geodesic is the positive imaginary axis. The hyperbolic distance is \\(d_{\\mathbb{H}}(i, 2i) = |\\ln(2/1)| = \\ln 2 \\approx 0.693\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Bridge
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Connections and Further Directions',
            content: `
<h2>Connections and Further Directions</h2>

<p>Mobius transformations sit at an intersection of several major areas of mathematics. Here we trace those connections to help orient further study.</p>

<h3>Riemann Mapping Theorem</h3>

<p>We proved that disk automorphisms are exactly the Mobius transformations that preserve the disk. The Riemann mapping theorem says that any simply connected proper subdomain of \\(\\mathbb{C}\\) is biholomorphic to the disk. So once we have any one conformal equivalence \\(f: \\Omega \\to \\mathbb{D}\\), the full group of automorphisms of \\(\\Omega\\) is \\(f^{-1} \\circ \\text{Aut}(\\mathbb{D}) \\circ f\\), which is again a group of Mobius transformations conjugated by \\(f\\).</p>

<h3>Uniformization Theorem</h3>

<p>Every simply connected Riemann surface is conformally equivalent to exactly one of: the Riemann sphere \\(\\hat{\\mathbb{C}}\\), the complex plane \\(\\mathbb{C}\\), or the unit disk \\(\\mathbb{D}\\). The automorphism groups are \\(\\text{Mob}(\\hat{\\mathbb{C}})\\), affine maps \\(z \\mapsto az+b\\), and \\(\\text{Aut}(\\mathbb{D}) \\cong PSU(1,1)\\) respectively.</p>

<h3>Schwarz-Christoffel Formula</h3>

<p>The Schwarz-Christoffel formula maps the upper half-plane to polygonal domains. It starts with the Cayley transform (half-plane to disk) and then applies an explicit integral formula. Mobius transformations handle the preliminary normalization step.</p>

<h3>Number Theory: Modular Group</h3>

<p>The <strong>modular group</strong> \\(PSL_2(\\mathbb{Z}) = \\{(az+b)/(cz+d) : a,b,c,d \\in \\mathbb{Z}, ad-bc=1\\}\\) is a discrete subgroup of \\(PSL_2(\\mathbb{R})\\). It acts on the upper half-plane and its fundamental domain is the region \\(\\{|z|>1, |\\text{Re}(z)| < 1/2\\}\\). Modular forms are functions invariant (up to a character) under this action. They appear in the theory of elliptic curves, the proof of Fermat's Last Theorem, and the theory of partitions.</p>

<h3>Kleinian Groups and 3-Manifolds</h3>

<p>Discrete subgroups of \\(PSL_2(\\mathbb{C})\\) acting on \\(\\hat{\\mathbb{C}}\\) are called <strong>Kleinian groups</strong>. They uniformize hyperbolic 3-manifolds (the upper half-space model). Thurston's geometrization program, completed by Perelman in 2003, shows that 3-manifolds are built from eight model geometries, of which hyperbolic geometry (governed by \\(PSL_2(\\mathbb{C})\\)) is the richest and most prevalent.</p>

<div class="env-block remark">
    <div class="env-title">Summary of Key Results</div>
    <div class="env-body">
        <ul>
            <li>Mobius transformations are exactly the bijective conformal self-maps of \\(\\hat{\\mathbb{C}}\\).</li>
            <li>They form the group \\(PSL_2(\\mathbb{C})\\) and act triply transitively on \\(\\hat{\\mathbb{C}}\\).</li>
            <li>They preserve the cross ratio, which characterizes concyclicity.</li>
            <li>Disk automorphisms (Blaschke factors) are the isometries of the Poincare disk model of hyperbolic geometry.</li>
            <li>The Cayley transform \\(C(z) = (z-i)/(z+i)\\) bridges the half-plane and disk models.</li>
        </ul>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-three-points',
                    title: 'Three-Point Uniqueness: Determine a Mobius Map',
                    description: 'Drag three source points (filled) and three target points (hollow). The unique Mobius transformation sending each source to its matching target is computed and applied to a grid, showing the transformed plane.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 55 });

                        var srcs = [
                            { x: 1, y: 0, color: viz.colors.blue },
                            { x: 0, y: 1, color: viz.colors.teal },
                            { x: -1, y: 0, color: viz.colors.orange }
                        ];
                        var tgts = [
                            { x: 0, y: 0, color: viz.colors.blue },
                            { x: 2, y: 0, color: viz.colors.teal },
                            { x: 1, y: 1, color: viz.colors.orange }
                        ];

                        srcs.forEach(function(p, i) {
                            viz.addDraggable('s'+i, p.x, p.y, p.color, 8, function(x,y){p.x=x;p.y=y;draw();});
                        });
                        tgts.forEach(function(p, i) {
                            viz.addDraggable('t'+i, p.x, p.y, p.color, 8, function(x,y){p.x=x;p.y=y;draw();});
                        });

                        // Compute Mobius map sending z1->w1, z2->w2, z3->w3
                        // Using cross-ratio: (T(z),w1;w2,w3) = (z,z1;z2,z3)
                        // => T(z) is determined by cross ratio invariance
                        // We compute a,b,c,d directly from the 3 constraints

                        function cmul(a,b){return[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];}
                        function cdiv(a,b){var d=b[0]*b[0]+b[1]*b[1];if(d<1e-12)return[1e9,0];return[(a[0]*b[0]+a[1]*b[1])/d,(a[1]*b[0]-a[0]*b[1])/d];}
                        function cadd(a,b){return[a[0]+b[0],a[1]+b[1]];}
                        function csub(a,b){return[a[0]-b[0],a[1]-b[1]];}

                        function computeMobius(z1,z2,z3,w1,w2,w3) {
                            // Map z1->0, z2->1, z3->inf
                            // S(z) = (z-z1)(z2-z3) / ((z-z3)(z2-z1))
                            // Map w1->0, w2->1, w3->inf
                            // R(w) = (w-w1)(w2-w3) / ((w-w3)(w2-w1))
                            // T = R^{-1} o S
                            // So T(z) = R^{-1}(S(z))
                            // S is a Mobius: S(z) = (A z + B)/(C z + D)
                            // (z-z1)(z2-z3)/((z-z3)(z2-z1))
                            // = (z(z2-z3) - z1(z2-z3)) / (z(z2-z1) - z3(z2-z1))
                            var dz23=csub(z2,z3), dz21=csub(z2,z1);
                            var SA=dz23, SB=cmul([-z1[0],-z1[1]],dz23);
                            var SC=dz21, SD=cmul([-z3[0],-z3[1]],dz21);

                            var dw23=csub(w2,w3), dw21=csub(w2,w1);
                            var RA=dw23, RB=cmul([-w1[0],-w1[1]],dw23);
                            var RC=dw21, RD=cmul([-w3[0],-w3[1]],dw21);

                            // R^{-1}(u) = (D u - B)/(-C u + A)
                            // T(z) = R^{-1}(S(z)) where S(z)=(SA*z+SB)/(SC*z+SD)
                            // R^{-1}(S(z)) = (RD*(SA*z+SB) - RB*(SC*z+SD)) / (-RC*(SA*z+SB) + RA*(SC*z+SD))
                            // Numerator: z*(RD*SA - RB*SC) + (RD*SB - RB*SD)
                            // Denominator: z*(-RC*SA + RA*SC) + (-RC*SB + RA*SD)
                            var a=csub(cmul(RD,SA),cmul(RB,SC));
                            var b2=csub(cmul(RD,SB),cmul(RB,SD));
                            var c=cadd(cmul([-RC[0],-RC[1]],SA),cmul(RA,SC));
                            var d=cadd(cmul([-RC[0],-RC[1]],SB),cmul(RA,SD));
                            return {a,b:b2,c,d};
                        }

                        function applyMobius(M, zr, zi) {
                            var z=[zr,zi];
                            var num=cadd(cmul(M.a,z),M.b);
                            var den=cadd(cmul(M.c,z),M.d);
                            return cdiv(num,den);
                        }

                        function drawGrid(M, color) {
                            var ctx=viz.ctx;
                            ctx.strokeStyle=color; ctx.lineWidth=1;
                            // Horizontal lines
                            [-2,-1,0,1,2].forEach(function(y){
                                ctx.beginPath();
                                var started=false;
                                for(var i=0;i<=100;i++){
                                    var x=-3+6*i/100;
                                    var w=applyMobius(M,x,y);
                                    if(!isFinite(w[0])||Math.abs(w[0])>8){started=false;continue;}
                                    var sx=viz.originX+w[0]*viz.scale;
                                    var sy=viz.originY-w[1]*viz.scale;
                                    if(Math.abs(sx)>1500||Math.abs(sy)>1500){started=false;continue;}
                                    if(!started){ctx.moveTo(sx,sy);started=true;}else ctx.lineTo(sx,sy);
                                }
                                ctx.stroke();
                            });
                            // Vertical lines
                            [-2,-1,0,1,2].forEach(function(x){
                                ctx.beginPath();
                                var started=false;
                                for(var i=0;i<=100;i++){
                                    var y=-3+6*i/100;
                                    var w=applyMobius(M,x,y);
                                    if(!isFinite(w[0])||Math.abs(w[0])>8){started=false;continue;}
                                    var sx=viz.originX+w[0]*viz.scale;
                                    var sy=viz.originY-w[1]*viz.scale;
                                    if(Math.abs(sx)>1500||Math.abs(sy)>1500){started=false;continue;}
                                    if(!started){ctx.moveTo(sx,sy);started=true;}else ctx.lineTo(sx,sy);
                                }
                                ctx.stroke();
                            });
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var z=[srcs[0],srcs[1],srcs[2]].map(function(p){return[p.x,p.y];});
                            var w=[tgts[0],tgts[1],tgts[2]].map(function(p){return[p.x,p.y];});

                            try {
                                var M=computeMobius(z[0],z[1],z[2],w[0],w[1],w[2]);
                                drawGrid(M, viz.colors.blue+'55');

                                // Verify: draw images of source points
                                srcs.forEach(function(p,i){
                                    var img=applyMobius(M,p.x,p.y);
                                    viz.drawPoint(img[0],img[1],p.color,null,5);
                                });
                            } catch(e) {}

                            // Draw source points (filled)
                            srcs.forEach(function(p,i){
                                viz.drawPoint(p.x,p.y,p.color,'z'+(i+1),7);
                            });
                            // Draw target points (hollow ring)
                            var ctx=viz.ctx;
                            tgts.forEach(function(p,i){
                                var [sx,sy]=viz.toScreen(p.x,p.y);
                                ctx.strokeStyle=p.color; ctx.lineWidth=2;
                                ctx.beginPath(); ctx.arc(sx,sy,7,0,Math.PI*2); ctx.stroke();
                                viz.screenText('w'+(i+1),sx+12,sy-10,p.color,11);
                            });

                            viz.drawDraggables();
                            viz.screenText('Drag filled (source) or hollow (target) points', viz.width/2, 18, viz.colors.text, 11);
                            viz.screenText('Grid shows transformed plane', viz.width/2, 34, viz.colors.blue, 11);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the three-point characterization (Theorem 14.3) to find the unique Mobius transformation sending \\(1 \\mapsto 0\\), \\(-1 \\mapsto \\infty\\), \\(i \\mapsto 1\\).',
                    hint: 'The map sending \\(z_1 \\mapsto 0\\), \\(z_2 \\mapsto \\infty\\), \\(z_3 \\mapsto 1\\) is \\(S(z) = (z-z_1)(z_3-z_2)/((z-z_2)(z_3-z_1))\\).',
                    solution: 'Use \\(S(z) = (z-1)(i-(-1))/((z-(-1))(i-1)) = (z-1)(1+i)/((z+1)(i-1))\\). Simplify: \\((1+i)/(i-1) = (1+i)/(-1+i) = (1+i)(-1-i)/((-1)^2+1^2) = (-1-i-i-i^2)/2 = (-1-2i+1)/2 = -i\\). So \\(T(z) = -i(z-1)/(z+1)\\). Check: \\(T(1)=0\\checkmark\\), \\(T(-1)=\\infty\\checkmark\\), \\(T(i)=-i(i-1)/(i+1) = -i(i-1)(i-1)/((i+1)(i-1)) = -i(i-1)^2/(-2) = i(i-1)^2/2 = i(i^2-2i+1)/2 = i(-1-2i+1)/2 = i(-2i)/2 = 1\\checkmark\\).'
                },
                {
                    question: 'The modular group \\(\\Gamma = PSL_2(\\mathbb{Z})\\) is generated by \\(T(z) = z+1\\) and \\(S(z) = -1/z\\). Show \\(S^2 = \\text{id}\\) and \\((ST)^3 = \\text{id}\\) in \\(PSL_2(\\mathbb{Z})\\).',
                    hint: 'Compute \\(S(S(z))\\) and then \\(S(T(S(T(S(T(z))))))\\). Also check using the matrix representation.',
                    solution: '\\(S^2(z) = S(-1/z) = -1/(-1/z) = z\\checkmark\\). For \\((ST)^3\\): \\(ST(z) = S(z+1) = -1/(z+1)\\). \\((ST)^2(z) = ST(-1/(z+1)) = -1/(-1/(z+1)+1) = -1/((z+1-1)/(z+1)) = -(z+1)/z\\). \\((ST)^3(z) = ST(-(z+1)/z) = -1/(-(z+1)/z+1) = -1/((-z-1+z)/z) = -1/(-1/z) = z\\checkmark\\). In matrix form: \\(S = \\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}\\), \\(T = \\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}\\), \\(ST = \\begin{pmatrix}0&-1\\\\1&1\\end{pmatrix}\\), \\((ST)^3 = -I\\), which equals \\(I\\) in \\(PSL_2\\checkmark\\).'
                },
                {
                    question: 'Prove that the cross ratio is real if and only if the four points are concyclic (Theorem 14.6).',
                    hint: 'Use the fact that four points are concyclic iff the Mobius transformation sending \\(z_1 \\mapsto 0, z_2 \\mapsto 1, z_3 \\mapsto \\infty\\) also sends \\(z_4\\) to a real number (since the real line is the image of the circle \\(0, 1, \\infty\\) under this map).',
                    solution: 'The unique Mobius transformation \\(T\\) with \\(T(z_1)=0\\), \\(T(z_2)=1\\), \\(T(z_3)=\\infty\\) satisfies \\(T(z) = (z,z_2;z_1,z_3)\\) (cross ratio with \\(z_1,z_3\\) swapped — adjust notation as needed). Since Mobius maps send circles to circles, and \\(0,1,\\infty\\) lie on the extended real line, the preimage of the real line under \\(T\\) is the unique circle through \\(z_1,z_2,z_3\\). Hence \\(z_4\\) is on this circle iff \\(T(z_4) \\in \\mathbb{R}\\), i.e., iff \\((z_1,z_2;z_3,z_4) \\in \\mathbb{R}\\).'
                }
            ]
        }

    ]
});
