window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'Conformal Mappings',
    subtitle: 'Angle-preserving transformations and their magic',
    sections: [

        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Why Conformal Maps?</h2>

<div class="env-block intuition">
    <div class="env-title">The Core Idea</div>
    <div class="env-body">
        <p>Imagine you want to solve Laplace's equation \\(\\nabla^2 u = 0\\) on a complicated domain — say, the interior of an airfoil. Directly, this is formidable. But if you can <em>map</em> the airfoil conformally to a simple disk or half-plane, you solve the easy problem there, then pull the solution back. The map does the geometry for you.</p>
    </div>
</div>

<p>A <strong>conformal map</strong> is a function that preserves angles between curves at every point. In complex analysis, analytic functions with nonzero derivative are automatically conformal. This simple fact connects complex analysis to a remarkable array of applied problems.</p>

<h3>Three Classical Applications</h3>

<ul>
    <li><strong>Fluid dynamics.</strong> An irrotational incompressible flow is governed by a harmonic potential. Conformal maps send one flow to another, so mapping a complicated obstacle to a circle gives the flow around a circle — which is explicit — and then mapping back gives the flow around the obstacle.</li>
    <li><strong>Electrostatics.</strong> The electric potential satisfies Laplace's equation. A conformal map preserves harmonicity, so boundary-value problems on complicated regions reduce to problems on standard regions.</li>
    <li><strong>Heat flow.</strong> Steady-state temperature distributions are harmonic. The same reduction applies.</li>
</ul>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Riemann's 1851 doctoral dissertation established that any simply connected proper subset of \\(\\mathbb{C}\\) can be mapped conformally onto the unit disk — the Riemann Mapping Theorem. This single result underpins much of twentieth-century function theory and is the culmination of several chapters ahead.</p>
    </div>
</div>

<p>This chapter builds the machinery: the precise definition of conformality, the key examples (Joukowski, exponential, power, sine), composition, a preview of the Schwarz–Christoffel formula, and the three classical applications.</p>

<div class="viz-placeholder" data-viz="viz-conformal-grid"></div>
`,
            visualizations: [
                {
                    id: 'viz-conformal-grid',
                    title: 'Conformal Deformation of a Grid',
                    description: 'Select a map from the dropdown. Watch the rectangular grid deform: vertical lines and horizontal lines are sent to curves, but they remain orthogonal where they cross — the hallmark of conformality.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 1, originX: 0, originY: 0 });

                        // Map definitions: (re, im) => [re, im]
                        var maps = {
                            'z\u00b2': function(x, y) { return [x*x - y*y, 2*x*y]; },
                            'e\u1d07': function(x, y) { var ex = Math.exp(x); return [ex*Math.cos(y), ex*Math.sin(y)]; },
                            'sin(z)': function(x, y) { return [Math.sin(x)*Math.cosh(y), Math.cos(x)*Math.sinh(y)]; },
                            '1/z': function(x, y) { var d = x*x+y*y; if(d<1e-10) return [1e6,1e6]; return [x/d, -y/d]; },
                            'Joukowski': function(x, y) {
                                var d = x*x+y*y; if(d<1e-10) return [1e6,1e6];
                                return [x + x/d, y - y/d];
                            }
                        };

                        var sel = document.createElement('select');
                        sel.style.cssText = 'background:#1a1a40;color:#c9d1d9;border:1px solid #30363d;border-radius:4px;padding:3px 8px;font-size:0.8rem;';
                        Object.keys(maps).forEach(function(k) {
                            var o = document.createElement('option'); o.value = k; o.textContent = 'f(z) = ' + k;
                            sel.appendChild(o);
                        });
                        controls.appendChild(sel);

                        var animT = 0, rafId = null;
                        var playBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (rafId) { cancelAnimationFrame(rafId); rafId = null; playBtn.textContent = 'Animate'; }
                            else { animate(); playBtn.textContent = 'Stop'; }
                        });

                        function lerp(a, b, t) { return a + (b-a)*t; }

                        function drawSide(ctx, f, t, panel, scaleV, offX, offY) {
                            var W = viz.width/2 - 10;
                            var H = viz.height;
                            ctx.save();
                            ctx.beginPath(); ctx.rect(panel, 0, W, H); ctx.clip();

                            var step = 0.25;
                            var xMin = -3, xMax = 3, yMin = -3, yMax = 3;

                            function toScreen(mx, my) {
                                return [panel + offX + mx * scaleV, offY - my * scaleV];
                            }

                            // Horizontal lines (constant y)
                            for (var iy = yMin; iy <= yMax + 0.001; iy += step) {
                                ctx.beginPath();
                                var started = false;
                                for (var ix = xMin; ix <= xMax + 0.001; ix += 0.04) {
                                    var fx = lerp(ix, f(ix, iy)[0], t);
                                    var fy = lerp(iy, f(ix, iy)[1], t);
                                    if (!isFinite(fx) || !isFinite(fy) || Math.abs(fx) > 20 || Math.abs(fy) > 20) { started = false; continue; }
                                    var s = toScreen(fx, fy);
                                    if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.stroke();
                            }
                            // Vertical lines (constant x)
                            for (var ix2 = xMin; ix2 <= xMax + 0.001; ix2 += step) {
                                ctx.beginPath();
                                var started2 = false;
                                for (var iy2 = yMin; iy2 <= yMax + 0.001; iy2 += 0.04) {
                                    var fx2 = lerp(ix2, f(ix2, iy2)[0], t);
                                    var fy2 = lerp(iy2, f(ix2, iy2)[1], t);
                                    if (!isFinite(fx2) || !isFinite(fy2) || Math.abs(fx2) > 20 || Math.abs(fy2) > 20) { started2 = false; continue; }
                                    var s2 = toScreen(fx2, fy2);
                                    if (!started2) { ctx.moveTo(s2[0], s2[1]); started2 = true; }
                                    else ctx.lineTo(s2[0], s2[1]);
                                }
                                ctx.stroke();
                            }
                            ctx.restore();
                        }

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var f = maps[sel.value];
                            var scaleV = 45, W = viz.width/2;

                            // Divider
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(W, viz.height); ctx.stroke();

                            // Labels
                            ctx.fillStyle = '#8b949e'; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('z-plane (input)', W/2, 18);
                            ctx.fillText('w-plane (output)', W + W/2, 18);

                            // Input grid (t=0 always drawn plain on left, animated on right)
                            ctx.strokeStyle = '#3fb9a055'; ctx.lineWidth = 1;
                            drawSide(ctx, f, 0, 0, scaleV, W/2, viz.height/2);

                            ctx.strokeStyle = '#58a6ff'; ctx.lineWidth = 1;
                            drawSide(ctx, f, t, W + 4, scaleV, W/2 - 4, viz.height/2);
                        }

                        function animate() {
                            animT += 0.015;
                            var t = (Math.sin(animT) + 1) / 2;
                            draw(t);
                            rafId = requestAnimationFrame(animate);
                        }

                        sel.addEventListener('change', function() { draw(1); });
                        draw(1);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A conformal map \\(f\\) sends two smooth curves crossing at \\(z_0\\) at angle \\(\\alpha\\) to two curves crossing at \\(f(z_0)\\) at the same angle \\(\\alpha\\). What condition on \\(f\\) guarantees this?',
                    hint: 'Think about what the derivative \\(f\'(z_0)\\) being nonzero implies about multiplication by a complex number.',
                    solution: '\\(f\\) must be analytic at \\(z_0\\) and satisfy \\(f\'(z_0) \\neq 0\\). Multiplication by \\(f\'(z_0) = |f\'(z_0)|e^{i\\theta}\\) rotates all tangent vectors by the same angle \\(\\theta\\) and scales them by \\(|f\'(z_0)|\\), so angles between any two curves are preserved.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Definition of Conformal Maps
        // ================================================================
        {
            id: 'sec-definition',
            title: 'Conformal Maps',
            content: `
<h2>Conformal Maps: Definition and Criteria</h2>

<h3>Angle Preservation</h3>

<p>Let \\(\\gamma_1, \\gamma_2\\) be two smooth curves in \\(\\mathbb{C}\\) that intersect at \\(z_0\\). The angle between them is defined as the angle between their tangent vectors at \\(z_0\\). A map \\(f\\) is <strong>conformal at \\(z_0\\)</strong> if it preserves both the magnitude and the orientation (sense) of angles between all pairs of smooth curves through \\(z_0\\).</p>

<div class="env-block definition">
    <div class="env-title">Definition 13.1 (Conformal Map)</div>
    <div class="env-body">
        <p>A function \\(f: U \\to \\mathbb{C}\\) defined on an open set \\(U \\subseteq \\mathbb{C}\\) is <strong>conformal at \\(z_0 \\in U\\)</strong> if it is angle-preserving and orientation-preserving at \\(z_0\\). It is <strong>conformal on \\(U\\)</strong> if it is conformal at every point of \\(U\\).</p>
    </div>
</div>

<h3>The Main Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.1 (Analytic + Nonzero Derivative = Conformal)</div>
    <div class="env-body">
        <p>Let \\(f\\) be analytic on an open set \\(U\\) and let \\(z_0 \\in U\\). Then \\(f\\) is conformal at \\(z_0\\) if and only if \\(f'(z_0) \\neq 0\\).</p>
    </div>
</div>

<p><strong>Why it works.</strong> If \\(\\gamma(t)\\) is a smooth curve through \\(z_0 = \\gamma(0)\\) with tangent \\(\\gamma'(0)\\), then the image curve \\(f \\circ \\gamma\\) has tangent \\(f'(z_0) \\cdot \\gamma'(0)\\) at \\(f(z_0)\\). Multiplication by \\(f'(z_0)\\) rotates every tangent vector by \\(\\arg f'(z_0)\\) and scales it by \\(|f'(z_0)|\\). Since all tangent vectors are rotated by the same amount, the angle between any two of them is unchanged. The condition \\(f'(z_0) \\neq 0\\) ensures the map does not collapse the neighborhood to a point.</p>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = z^2\\)</div>
    <div class="env-body">
        <p>\\(f'(z) = 2z\\), which vanishes only at \\(z = 0\\). So \\(f\\) is conformal everywhere except the origin. At \\(z = 0\\), angles are doubled (a map with \\(f'(0) = 0\\) but \\(f''(0) \\neq 0\\) multiplies angles by 2), so conformality fails.</p>
    </div>
</div>

<h3>Critical Points</h3>

<p>Points where \\(f'(z_0) = 0\\) are called <strong>critical points</strong>. Near a critical point where \\(f(z) - f(z_0) \\sim c(z - z_0)^n\\) for some integer \\(n \\geq 2\\), angles are multiplied by \\(n\\). The map is not conformal there.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.2 (Conformal = Biholomorphic)</div>
    <div class="env-body">
        <p>A map \\(f: U \\to V\\) that is analytic, bijective, and satisfies \\(f'(z) \\neq 0\\) on all of \\(U\\) is a <strong>biholomorphism</strong>. Its inverse \\(f^{-1}: V \\to U\\) is also analytic and satisfies \\((f^{-1})'(w) = 1/f'(f^{-1}(w))\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-angle-preservation"></div>
`,
            visualizations: [
                {
                    id: 'viz-angle-preservation',
                    title: 'Angle Preservation Under \\(f(z) = z^2\\)',
                    description: 'Drag the point z. Two curves cross it at a chosen angle. Under f(z)=z², both image curves cross at the same angle. Move the point to the origin to see conformality fail.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 1, originX: 0, originY: 0 });

                        var zx = 1.2, zy = 0.8;
                        var d = viz.addDraggable('z0', zx, zy, '#58a6ff', 8, function(x, y) {
                            zx = x; zy = y; draw();
                        });

                        // Override toMath/toScreen for left panel (center at W/2, H/2, scale=70)
                        var W = viz.width / 2, H = viz.height;
                        var sc = 65;
                        function toScr(px, x, y) { return [px + W/2 + x*sc, H/2 - y*sc]; }

                        function f(x, y) { return [x*x - y*y, 2*x*y]; }

                        function curveTangent1(x, y) { return [1, 0.5]; }  // angle 1: slope 1/2
                        function curveTangent2(x, y) { return [1, -0.8]; } // angle 2: slope -0.8

                        function drawCurve(ctx, px, centerCx, centerCy, ax, ay, color, transform) {
                            ctx.strokeStyle = color; ctx.lineWidth = 2;
                            ctx.beginPath(); var started = false;
                            var len = Math.sqrt(ax*ax + ay*ay);
                            ax /= len; ay /= len;
                            for (var t = -2.0; t <= 2.0; t += 0.03) {
                                var ox = centerCx + ax*t, oy = centerCy + ay*t;
                                var mapped = transform ? f(ox, oy) : [ox, oy];
                                if (!isFinite(mapped[0]) || !isFinite(mapped[1])) { started = false; continue; }
                                var s = toScr(px, mapped[0], mapped[1]);
                                if (Math.abs(s[0]-px) > W-5 || Math.abs(s[1]-H/2) > H/2-5) { started = false; continue; }
                                if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
                                else ctx.lineTo(s[0], s[1]);
                            }
                            ctx.stroke();
                        }

                        function angleBetween(ax, ay, bx, by) {
                            var dot = ax*bx + ay*by;
                            var la = Math.sqrt(ax*ax+ay*ay), lb = Math.sqrt(bx*bx+by*by);
                            return Math.acos(Math.max(-1, Math.min(1, dot/(la*lb))));
                        }

                        function imageTangent(ax, ay, x, y) {
                            // Jacobian of f(z)=z^2 at (x,y): [[2x,-2y],[2y,2x]]
                            return [2*x*ax - 2*y*ay, 2*y*ax + 2*x*ay];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Divider
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(W, H); ctx.stroke();

                            ctx.fillStyle = '#8b949e'; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('z-plane', W/2, 18);
                            ctx.fillText('w = z\u00b2 plane', W + W/2, 18);

                            // Grids
                            ctx.strokeStyle = '#1a1a4066'; ctx.lineWidth = 0.5;
                            for (var xi = -5; xi <= 5; xi++) {
                                var s1 = toScr(0, xi, -4), s2 = toScr(0, xi, 4);
                                ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke();
                                var t1 = toScr(W, xi, -4), t2 = toScr(W, xi, 4);
                                ctx.beginPath(); ctx.moveTo(t1[0], t1[1]); ctx.lineTo(t2[0], t2[1]); ctx.stroke();
                            }
                            for (var yi = -5; yi <= 5; yi++) {
                                var sa1 = toScr(0, -4, yi), sa2 = toScr(0, 4, yi);
                                ctx.beginPath(); ctx.moveTo(sa1[0], sa1[1]); ctx.lineTo(sa2[0], sa2[1]); ctx.stroke();
                                var ta1 = toScr(W, -4, yi), ta2 = toScr(W, 4, yi);
                                ctx.beginPath(); ctx.moveTo(ta1[0], ta1[1]); ctx.lineTo(ta2[0], ta2[1]); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = '#4a4a7a'; ctx.lineWidth = 1;
                            var ax0 = toScr(0, 0, 0), axW = toScr(W, 0, 0);
                            ctx.beginPath(); ctx.moveTo(toScr(0,-3.5,0)[0], ax0[1]); ctx.lineTo(toScr(0,3.5,0)[0], ax0[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(ax0[0], toScr(0,0,-3)[1]); ctx.lineTo(ax0[0], toScr(0,0,3)[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(toScr(W,-3.5,0)[0], axW[1]); ctx.lineTo(toScr(W,3.5,0)[0], axW[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(axW[0], toScr(W,0,-3)[1]); ctx.lineTo(axW[0], toScr(W,0,3)[1]); ctx.stroke();

                            var t1 = [1, 0.5], t2 = [1, -0.8];

                            // Input curves
                            drawCurve(ctx, 0, zx, zy, t1[0], t1[1], '#58a6ff', false);
                            drawCurve(ctx, 0, zx, zy, t2[0], t2[1], '#f0883e', false);

                            // Output curves
                            drawCurve(ctx, W+2, zx, zy, t1[0], t1[1], '#58a6ff', true);
                            drawCurve(ctx, W+2, zx, zy, t2[0], t2[1], '#f0883e', true);

                            // Input point
                            var ps = toScr(0, zx, zy);
                            ctx.fillStyle = '#58a6ff'; ctx.beginPath(); ctx.arc(ps[0], ps[1], 6, 0, Math.PI*2); ctx.fill();

                            // Output point
                            var fw = f(zx, zy);
                            var pw = toScr(W+2, fw[0], fw[1]);
                            if (isFinite(pw[0]) && isFinite(pw[1])) {
                                ctx.fillStyle = '#3fb950'; ctx.beginPath(); ctx.arc(pw[0], pw[1], 6, 0, Math.PI*2); ctx.fill();
                            }

                            // Angles
                            var a1 = angleBetween(t1[0], t1[1], t2[0], t2[1]);
                            var it1 = imageTangent(t1[0], t1[1], zx, zy);
                            var it2 = imageTangent(t2[0], t2[1], zx, zy);
                            var a2 = angleBetween(it1[0], it1[1], it2[0], it2[1]);

                            var derMag = 2 * Math.sqrt(zx*zx + zy*zy);
                            var critical = derMag < 0.15;

                            ctx.fillStyle = '#f0f6fc'; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('Angle at z: ' + (a1 * 180/Math.PI).toFixed(1) + '\u00b0', W/2, H - 30);
                            ctx.fillText('Angle at f(z): ' + (a2 * 180/Math.PI).toFixed(1) + '\u00b0', W + W/2, H - 30);

                            if (critical) {
                                ctx.fillStyle = '#f85149'; ctx.font = 'bold 11px -apple-system,sans-serif';
                                ctx.fillText('Near z=0: f\'(z)\u22480, angles NOT preserved', W + W/2, H - 14);
                            } else {
                                ctx.fillStyle = '#3fb950'; ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('f\'(z) = 2z \u2260 0 \u2014 angles preserved', W + W/2, H - 14);
                            }

                            ctx.fillStyle = '#8b949e'; ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('z = (' + zx.toFixed(2) + ', ' + zy.toFixed(2) + ')', W/2, H - 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(f(z) = \\bar{z}\\) (complex conjugation) preserves angles but reverses orientation. Is it conformal according to Definition 13.1?',
                    hint: 'Write \\(z = x + iy\\) and compute what conjugation does to the tangent vector of a curve. Then check the orientation.',
                    solution: 'Conjugation reflects across the real axis, so it maps a tangent vector \\(a + bi\\) to \\(a - bi\\). The angle between two vectors is preserved in magnitude but the sense (clockwise vs. counterclockwise) is reversed. Since Definition 13.1 requires orientation-preservation, \\(f(z) = \\bar{z}\\) is <em>not</em> conformal. It is said to be <em>anti-conformal</em> (or isogonal but orientation-reversing).'
                },
                {
                    question: 'For \\(f(z) = z^n\\) (\\(n \\geq 2\\) a positive integer), find all points where \\(f\\) fails to be conformal. What happens to angles at those points?',
                    hint: 'Compute \\(f\'(z)\\) and find its zeros. Near a zero of order \\(k\\) of \\(f\'\\), the map behaves like \\(z^{n}\\) with \\(n = k+1\\).',
                    solution: '\\(f\'(z) = nz^{n-1}\\), which vanishes only at \\(z = 0\\). So \\(f\\) fails to be conformal only at the origin. Near \\(z = 0\\), \\(f(z) = z^n\\), so angles are multiplied by \\(n\\): two curves meeting at angle \\(\\alpha\\) at the origin are mapped to curves meeting at angle \\(n\\alpha\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Key Conformal Maps
        // ================================================================
        {
            id: 'sec-examples',
            title: 'Key Conformal Maps',
            content: `
<h2>Key Conformal Maps</h2>

<p>Four families of conformal maps appear throughout applications.</p>

<h3>Power Maps \\(z^n\\)</h3>

<p>\\(f(z) = z^n\\) maps a wedge of angle \\(\\pi/n\\) to a half-plane. In polar coordinates \\(z = re^{i\\theta}\\):</p>
\\[f(re^{i\\theta}) = r^n e^{in\\theta}.\\]
<p>Angles are multiplied by \\(n\\) and radii are raised to the \\(n\\)th power. Conformal away from the origin.</p>

<h3>The Exponential Map \\(e^z\\)</h3>

<p>Writing \\(z = x + iy\\): \\(e^z = e^x e^{iy}\\). So:</p>
<ul>
    <li>Horizontal lines (constant \\(y\\)) map to rays from the origin at angle \\(y\\).</li>
    <li>Vertical lines (constant \\(x\\)) map to circles of radius \\(e^x\\).</li>
    <li>Horizontal strips \\(\\{a < \\text{Im}\\,z < b\\}\\) of width \\(< 2\\pi\\) map to sectors.</li>
    <li>The strip \\(\\{0 < \\text{Im}\\,z < \\pi\\}\\) maps to the upper half-plane.</li>
</ul>

<h3>The Joukowski Map</h3>

<div class="env-block definition">
    <div class="env-title">Definition 13.2 (Joukowski Transformation)</div>
    <div class="env-body">
        \\[J(z) = z + \\frac{1}{z}\\]
        <p>This map is conformal away from \\(z = \\pm 1\\) (where \\(J'(z) = 1 - 1/z^2 = 0\\)).</p>
    </div>
</div>

<p>The critical feature: circles slightly off-center in the \\(z\\)-plane map to shapes resembling airfoil cross-sections. This observation, due to Joukowski (1910), launched the study of conformal mapping in aerodynamics.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.3 (Joukowski Circle-to-Airfoil)</div>
    <div class="env-body">
        <p>Let \\(C_\\epsilon\\) be a circle through \\(z = -1\\), centered at \\((-\\epsilon, \\delta)\\) with \\(\\epsilon, \\delta > 0\\) small. Then \\(J(C_\\epsilon)\\) is a curve with a cusp at \\(w = -2\\) (the trailing edge) that resembles a symmetric or cambered airfoil.</p>
    </div>
</div>

<h3>The Sine Map \\(\\sin z\\)</h3>

<p>\\(\\sin z = \\sin x \\cosh y + i \\cos x \\sinh y\\). The vertical strip \\(\\{-\\pi/2 < \\text{Re}\\,z < \\pi/2\\}\\) is mapped conformally onto \\(\\mathbb{C} \\setminus ((-\\infty, -1] \\cup [1, \\infty))\\). Specifically, the strip maps to the entire complex plane minus two slits on the real axis.</p>

<div class="viz-placeholder" data-viz="viz-joukowski"></div>
<div class="viz-placeholder" data-viz="viz-exp-strips"></div>
`,
            visualizations: [
                {
                    id: 'viz-joukowski',
                    title: 'Joukowski Airfoil',
                    description: 'Drag the center of the circle in the z-plane. The Joukowski map J(z)=z+1/z sends the circle to an airfoil shape. Move the center to vary thickness, camber, and the trailing edge angle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 1, originX: 0, originY: 0 });

                        var cx = -0.1, cy = 0.12;
                        viz.addDraggable('center', cx, cy, '#f0883e', 8, function(x, y) {
                            cx = x; cy = y; draw();
                        });

                        var W = viz.width / 2, H = viz.height;
                        var sc = 80;
                        function toScr(px, x, y) { return [px + W/2 + x*sc, H/2 - y*sc]; }

                        function joukowski(x, y) {
                            var d = x*x + y*y;
                            if (d < 1e-10) return [1e6, 1e6];
                            return [x + x/d, y - y/d];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Divider
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(W, H); ctx.stroke();

                            ctx.fillStyle = '#8b949e'; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('z-plane', W/2, 18);
                            ctx.fillText('w = z + 1/z (airfoil)', W + W/2, 18);

                            // Axes
                            ctx.strokeStyle = '#4a4a7a'; ctx.lineWidth = 1;
                            for (var side = 0; side < 2; side++) {
                                var px = side * W;
                                var ax0 = toScr(px, 0, 0);
                                ctx.beginPath(); ctx.moveTo(toScr(px,-3,0)[0], ax0[1]); ctx.lineTo(toScr(px,3,0)[0], ax0[1]); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(ax0[0], toScr(px,0,-2)[1]); ctx.lineTo(ax0[0], toScr(px,0,2)[1]); ctx.stroke();
                            }

                            // Compute circle radius so it passes through (-1, 0)
                            var dist = Math.sqrt((cx - (-1))*(cx - (-1)) + cy*cy);
                            var r = dist;

                            // Draw unit circle reference
                            ctx.strokeStyle = '#4a4a7a55'; ctx.lineWidth = 1; ctx.setLineDash([4,3]);
                            var uc = toScr(0, 0, 0);
                            ctx.beginPath(); ctx.arc(uc[0], uc[1], sc, 0, Math.PI*2); ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw input circle
                            ctx.strokeStyle = '#f0883e'; ctx.lineWidth = 2;
                            var cc = toScr(0, cx, cy);
                            ctx.beginPath(); ctx.arc(cc[0], cc[1], r * sc, 0, Math.PI*2); ctx.stroke();

                            // Center point
                            ctx.fillStyle = '#f0883e'; ctx.beginPath(); ctx.arc(cc[0], cc[1], 5, 0, Math.PI*2); ctx.fill();

                            // Draw Joukowski image
                            ctx.strokeStyle = '#58a6ff'; ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            var N = 300;
                            var started = false;
                            for (var i = 0; i <= N; i++) {
                                var theta = 2 * Math.PI * i / N;
                                var px2 = cx + r * Math.cos(theta);
                                var py2 = cy + r * Math.sin(theta);
                                var w = joukowski(px2, py2);
                                if (!isFinite(w[0]) || !isFinite(w[1]) || Math.abs(w[0]) > 6 || Math.abs(w[1]) > 6) { started = false; continue; }
                                var s = toScr(W+2, w[0], w[1]);
                                if (!started) { ctx.moveTo(s[0], s[1]); started = true; }
                                else ctx.lineTo(s[0], s[1]);
                            }
                            ctx.closePath(); ctx.stroke();

                            // Labels
                            ctx.fillStyle = '#8b949e'; ctx.font = '11px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('Center: (' + cx.toFixed(3) + ', ' + cy.toFixed(3) + ')  r = ' + r.toFixed(3), W/2, H - 14);
                            ctx.fillText('Drag orange center to reshape airfoil', W + W/2, H - 14);
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-exp-strips',
                    title: 'Exponential Map: Strips to Sectors',
                    description: 'The map e^z sends horizontal strips (constant imaginary part) to sectors, and vertical lines to circles. Toggle the animation to watch the deformation.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 1, originX: 0, originY: 0 });

                        var W = viz.width / 2, H = viz.height;
                        var scL = 55, scR = 55;
                        function toScrL(x, y) { return [W/2 + x*scL, H/2 - y*scL]; }
                        function toScrR(x, y) { return [W + 2 + W/2 + x*scR, H/2 - y*scR]; }

                        var animT = 0, rafId = null;
                        var playBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (rafId) { cancelAnimationFrame(rafId); rafId = null; playBtn.textContent = 'Animate'; draw(1); }
                            else { animate(); playBtn.textContent = 'Stop'; }
                        });

                        function expz(x, y) { var ex = Math.exp(x); return [ex*Math.cos(y), ex*Math.sin(y)]; }
                        function lerp(a, b, t) { return a + (b-a)*t; }

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(W, H); ctx.stroke();

                            ctx.fillStyle = '#8b949e'; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('z-plane (input)', W/2, 18);
                            ctx.fillText('e\u1d07 plane (output)', W + W/2, 18);

                            // Axes
                            ctx.strokeStyle = '#4a4a7a'; ctx.lineWidth = 1;
                            var la = toScrL(0,0), ra = toScrR(0,0);
                            ctx.beginPath(); ctx.moveTo(toScrL(-3,0)[0], la[1]); ctx.lineTo(toScrL(3,0)[0], la[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(la[0], toScrL(0,-3)[1]); ctx.lineTo(la[0], toScrL(0,3)[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(toScrR(-3,0)[0], ra[1]); ctx.lineTo(toScrR(3,0)[0], ra[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(ra[0], toScrR(0,-3)[1]); ctx.lineTo(ra[0], toScrR(0,3)[1]); ctx.stroke();

                            var colors = ['#58a6ff', '#3fb9a0', '#f0883e', '#bc8cff', '#f85149', '#d29922', '#3fb950'];
                            var strips = [-Math.PI, -2*Math.PI/3, -Math.PI/3, 0, Math.PI/3, 2*Math.PI/3, Math.PI];

                            // Draw horizontal lines (constant y) in z-plane, and their images
                            for (var si = 0; si < strips.length; si++) {
                                var yc = strips[si];
                                var col = colors[si % colors.length];
                                ctx.strokeStyle = col; ctx.lineWidth = 1.5;

                                // Left: horizontal line
                                ctx.beginPath();
                                var s1 = toScrL(-3, yc), s2 = toScrL(3, yc);
                                ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke();

                                // Right: image ray (or arc if animated)
                                ctx.beginPath();
                                var started = false;
                                for (var xi = -3; xi <= 3; xi += 0.05) {
                                    var ix = lerp(xi, expz(xi, yc)[0], t);
                                    var iy = lerp(yc, expz(xi, yc)[1], t);
                                    if (!isFinite(ix) || !isFinite(iy) || Math.abs(ix)>5 || Math.abs(iy)>5) { started = false; continue; }
                                    var sr = toScrR(ix, iy);
                                    if (!started) { ctx.moveTo(sr[0], sr[1]); started = true; }
                                    else ctx.lineTo(sr[0], sr[1]);
                                }
                                ctx.stroke();
                            }

                            // Draw vertical lines (constant x) and their images
                            var vertXs = [-2, -1, 0, 1, 2];
                            for (var vi = 0; vi < vertXs.length; vi++) {
                                var xc = vertXs[vi];
                                ctx.strokeStyle = '#ffffff22'; ctx.lineWidth = 1;

                                // Left: vertical line
                                ctx.beginPath();
                                ctx.moveTo(toScrL(xc,-Math.PI)[0], toScrL(xc,-Math.PI)[1]);
                                ctx.lineTo(toScrL(xc,Math.PI)[0], toScrL(xc,Math.PI)[1]);
                                ctx.stroke();

                                // Right: circle of radius e^xc
                                ctx.beginPath();
                                var started2 = false;
                                for (var tth = -Math.PI; tth <= Math.PI + 0.01; tth += 0.05) {
                                    var ix2 = lerp(xc, expz(xc, tth)[0], t);
                                    var iy2 = lerp(tth, expz(xc, tth)[1], t);
                                    if (!isFinite(ix2) || !isFinite(iy2) || Math.abs(ix2)>5 || Math.abs(iy2)>5) { started2 = false; continue; }
                                    var sr2 = toScrR(ix2, iy2);
                                    if (!started2) { ctx.moveTo(sr2[0], sr2[1]); started2 = true; }
                                    else ctx.lineTo(sr2[0], sr2[1]);
                                }
                                ctx.stroke();
                            }

                            // Labels
                            ctx.fillStyle = '#8b949e'; ctx.font = '11px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('Colored lines: Im(z) = 0, \u00b1\u03c0/3, \u00b12\u03c0/3, \u00b1\u03c0', W/2, H-14);
                            ctx.fillText('Rays (colored) and circles (gray) in w-plane', W+W/2, H-14);
                        }

                        function animate() {
                            animT += 0.018;
                            var t = (Math.sin(animT) + 1) / 2;
                            draw(t);
                            rafId = requestAnimationFrame(animate);
                        }

                        draw(1);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Describe the image of the horizontal strip \\(\\{0 < \\text{Im}\\,z < \\pi/2\\}\\) under \\(e^z\\). What quadrant does it land in?',
                    hint: 'A point \\(z = x + iy\\) with \\(0 < y < \\pi/2\\) maps to \\(e^x(\\cos y + i\\sin y)\\). What are the constraints on the argument?',
                    solution: 'Since \\(0 < y < \\pi/2\\), the argument of \\(e^z = e^x e^{iy}\\) lies in \\((0, \\pi/2)\\). So the image is the first quadrant \\(\\{w : \\text{Re}\\,w > 0,\\, \\text{Im}\\,w > 0\\}\\) (the positive quadrant, without the boundary rays).'
                },
                {
                    question: 'Verify that the Joukowski map \\(J(z) = z + 1/z\\) maps the unit circle \\(|z| = 1\\) to the interval \\([-2, 2]\\) on the real axis.',
                    hint: 'Parametrize the unit circle as \\(z = e^{i\\theta}\\) and compute \\(J(e^{i\\theta})\\).',
                    solution: '\\(J(e^{i\\theta}) = e^{i\\theta} + e^{-i\\theta} = 2\\cos\\theta\\), which ranges over \\([-2, 2]\\) as \\(\\theta\\) goes from \\(0\\) to \\(2\\pi\\). So the unit circle collapses to a segment, consistent with \\(J\'(\\pm 1) = 0\\).'
                },
                {
                    question: 'The map \\(\\sin z\\) sends the vertical strip \\(\\{-\\pi/2 < \\text{Re}\\,z < \\pi/2\\}\\) to what domain?',
                    hint: 'Use the formula \\(\\sin(x+iy) = \\sin x \\cosh y + i\\cos x \\sinh y\\). Consider the boundary of the strip.',
                    solution: 'The boundary consists of the two vertical lines \\(\\text{Re}\\,z = \\pm\\pi/2\\). On \\(\\text{Re}\\,z = \\pi/2\\): \\(\\sin(\\pi/2 + iy) = \\cosh y\\), a real number \\(\\geq 1\\). On \\(\\text{Re}\\,z = -\\pi/2\\): \\(\\sin(-\\pi/2+iy) = -\\cosh y \\leq -1\\). So the strip maps to \\(\\mathbb{C} \\setminus ((-\\infty,-1]\\cup[1,\\infty))\\), the plane with two real slits removed.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Composition
        // ================================================================
        {
            id: 'sec-composition',
            title: 'Building Maps by Composition',
            content: `
<h2>Building Conformal Maps by Composition</h2>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.4 (Composition Preserves Conformality)</div>
    <div class="env-body">
        <p>If \\(f\\) is conformal at \\(z_0\\) and \\(g\\) is conformal at \\(f(z_0)\\), then \\(g \\circ f\\) is conformal at \\(z_0\\), with derivative \\((g \\circ f)'(z_0) = g'(f(z_0)) \\cdot f'(z_0)\\).</p>
    </div>
</div>

<p>This is just the chain rule, but its practical consequence is powerful: complex domains can be mapped by chaining simple, well-understood maps.</p>

<h3>Standard Strategy</h3>

<p>To map a domain \\(D\\) to the upper half-plane \\(\\mathbb{H}^+\\):</p>
<ol>
    <li>Find an intermediate domain \\(D'\\) that lies between \\(D\\) and \\(\\mathbb{H}^+\\).</li>
    <li>Map \\(D \\to D'\\) with \\(f_1\\), then \\(D' \\to \\mathbb{H}^+\\) with \\(f_2\\).</li>
    <li>The composition \\(f_2 \\circ f_1\\) maps \\(D \\to \\mathbb{H}^+\\).</li>
</ol>

<div class="env-block example">
    <div class="env-title">Example: Sector to Half-Plane</div>
    <div class="env-body">
        <p>Map the sector \\(S = \\{z : 0 < \\arg z < \\pi/3\\}\\) to the upper half-plane \\(\\mathbb{H}^+ = \\{\\text{Im}\\,w > 0\\}\\).</p>
        <p><strong>Step 1:</strong> \\(f_1(z) = z^3\\) maps the sector \\(0 < \\arg z < \\pi/3\\) to the upper half-plane \\(0 < \\arg z < \\pi\\) (i.e., \\(\\mathbb{H}^+\\)). Done in one step.</p>
        <p>Why? In polar coordinates, \\(z = re^{i\\theta}\\) maps to \\(r^3 e^{3i\\theta}\\), so an angle \\(\\theta \\in (0, \\pi/3)\\) becomes \\(3\\theta \\in (0, \\pi)\\). The rays \\(\\theta = 0\\) and \\(\\theta = \\pi/3\\) map to the positive and negative real axes, which are the boundary of \\(\\mathbb{H}^+\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Semi-Infinite Strip to Half-Plane</div>
    <div class="env-body">
        <p>Map the strip \\(S = \\{0 < \\text{Im}\\,z < \\pi,\\; \\text{Re}\\,z > 0\\}\\) to \\(\\mathbb{H}^+\\).</p>
        <p><strong>Step 1:</strong> \\(f_1(z) = e^{-z}\\) maps \\(S\\) to \\(D_1 = \\{|w| < 1, \\text{Im}\\,w > 0\\}\\) (the upper half of the unit disk). Why? If \\(z = x + iy\\) with \\(x > 0\\) and \\(0 < y < \\pi\\), then \\(e^{-z} = e^{-x}e^{-iy}\\) has \\(|e^{-z}| = e^{-x} < 1\\) and argument \\(-y \\in (-\\pi, 0)\\), which after negation... actually gives the lower half — use \\(f_1(z) = e^z\\) instead: \\(e^z = e^x e^{iy}\\) with \\(e^x > 1\\) and \\(y \\in (0,\\pi)\\), mapping to the upper half with \\(|w| > 1\\). Then \\(f_2(w) = 1/w\\) maps this to the upper half-disk. Then \\(f_3(w) = (w+1/w)\\cdot i / 2\\) is not standard...</p>
        <p>A clean chain: \\(f_1(z) = e^z\\) maps the strip to the upper half-plane with \\(|w| > 0\\), restricted to \\(\\text{Im}\\, w > 0\\). Actually, \\(e^z\\) maps the strip \\(\\{0 < \\text{Im} < \\pi\\}\\) (without the restriction \\(\\text{Re} > 0\\)) onto \\(\\mathbb{H}^+\\). Adding \\(\\text{Re}\\,z > 0\\) restricts to \\(\\{|w| > 1, \\text{Im}\\,w > 0\\}\\). Then \\(f_2(w) = w + 1/w\\) maps this to \\(\\mathbb{H}^+\\) (a Joukowski-type step).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-composition-builder"></div>
`,
            visualizations: [
                {
                    id: 'viz-composition-builder',
                    title: 'Composition Builder',
                    description: 'Pick up to two maps from the dropdowns. The grid is transformed first by f\u2081, then by f\u2082. See the cumulative effect. Set f\u2082 to "identity" for a single map.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 1, originX: 0, originY: 0 });

                        var mapDefs = {
                            'identity': function(x, y) { return [x, y]; },
                            'z\u00b2': function(x, y) { return [x*x-y*y, 2*x*y]; },
                            'e\u1d07': function(x, y) { var ex=Math.exp(x); return [ex*Math.cos(y), ex*Math.sin(y)]; },
                            'sin(z)': function(x, y) { return [Math.sin(x)*Math.cosh(y), Math.cos(x)*Math.sinh(y)]; },
                            '1/z': function(x, y) { var d=x*x+y*y; if(d<1e-10) return [1e6,1e6]; return [x/d, -y/d]; },
                            'Joukowski': function(x, y) { var d=x*x+y*y; if(d<1e-10) return [1e6,1e6]; return [x+x/d, y-y/d]; },
                            '\u221az': function(x, y) {
                                var r = Math.sqrt(Math.sqrt(x*x+y*y));
                                var theta = Math.atan2(y,x)/2;
                                return [r*Math.cos(theta), r*Math.sin(theta)];
                            }
                        };

                        function makeSelect(label, def) {
                            var wrap = document.createElement('span');
                            wrap.style.marginRight = '8px';
                            var lbl = document.createElement('span');
                            lbl.textContent = label + ' '; lbl.style.cssText = 'color:#8b949e;font-size:0.78rem;';
                            var sel = document.createElement('select');
                            sel.style.cssText = 'background:#1a1a40;color:#c9d1d9;border:1px solid #30363d;border-radius:4px;padding:3px 6px;font-size:0.78rem;';
                            Object.keys(mapDefs).forEach(function(k) {
                                var o = document.createElement('option'); o.value = k; o.textContent = k;
                                if (k === def) o.selected = true;
                                sel.appendChild(o);
                            });
                            wrap.appendChild(lbl); wrap.appendChild(sel); controls.appendChild(wrap);
                            return sel;
                        }

                        var sel1 = makeSelect('f\u2081:', 'e\u1d07');
                        var sel2 = makeSelect('f\u2082:', 'z\u00b2');

                        sel1.addEventListener('change', draw);
                        sel2.addEventListener('change', draw);

                        var W = viz.width, H = viz.height;
                        var panelW = W / 3;
                        var sc = 40;

                        function toScr(px, x, y) { return [px + panelW/2 + x*sc, H/2 - y*sc]; }

                        function drawGrid(ctx, px, f, lineColor, lw) {
                            ctx.strokeStyle = lineColor; ctx.lineWidth = lw;
                            var step = 0.5, xMin = -3, xMax = 3, yMin = -3, yMax = 3;
                            // Horizontal
                            for (var iy = yMin; iy <= yMax+0.001; iy += step) {
                                ctx.beginPath(); var started = false;
                                for (var ix = xMin; ix <= xMax+0.001; ix += 0.04) {
                                    var w = f(ix, iy);
                                    if (!isFinite(w[0])||!isFinite(w[1])||Math.abs(w[0])>8||Math.abs(w[1])>8) { started=false; continue; }
                                    var s = toScr(px, w[0], w[1]);
                                    if (!started) { ctx.moveTo(s[0],s[1]); started=true; } else ctx.lineTo(s[0],s[1]);
                                }
                                ctx.stroke();
                            }
                            // Vertical
                            for (var ix2 = xMin; ix2 <= xMax+0.001; ix2 += step) {
                                ctx.beginPath(); var started2 = false;
                                for (var iy2 = yMin; iy2 <= yMax+0.001; iy2 += 0.04) {
                                    var w2 = f(ix2, iy2);
                                    if (!isFinite(w2[0])||!isFinite(w2[1])||Math.abs(w2[0])>8||Math.abs(w2[1])>8) { started2=false; continue; }
                                    var s2 = toScr(px, w2[0], w2[1]);
                                    if (!started2) { ctx.moveTo(s2[0],s2[1]); started2=true; } else ctx.lineTo(s2[0],s2[1]);
                                }
                                ctx.stroke();
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var f1 = mapDefs[sel1.value];
                            var f2 = mapDefs[sel2.value];
                            var f12 = function(x, y) { var w = f1(x,y); return f2(w[0], w[1]); };

                            // Panel dividers
                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            for (var pi = 1; pi < 3; pi++) {
                                ctx.beginPath(); ctx.moveTo(pi*panelW, 0); ctx.lineTo(pi*panelW, H); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = '#4a4a7a'; ctx.lineWidth = 1;
                            for (var side = 0; side < 3; side++) {
                                var px = side * panelW;
                                var a0 = toScr(px, 0, 0);
                                ctx.beginPath(); ctx.moveTo(toScr(px,-3.5,0)[0],a0[1]); ctx.lineTo(toScr(px,3.5,0)[0],a0[1]); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(a0[0],toScr(px,0,-3)[1]); ctx.lineTo(a0[0],toScr(px,0,3)[1]); ctx.stroke();
                            }

                            // Labels
                            ctx.fillStyle = '#8b949e'; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('Input z', panelW/2, 16);
                            ctx.fillText('After f\u2081 = ' + sel1.value, panelW + panelW/2, 16);
                            ctx.fillText('After f\u2082\u2218f\u2081', 2*panelW + panelW/2, 16);

                            // Grids
                            drawGrid(ctx, 0, function(x,y){return [x,y];}, '#3fb9a055', 1);
                            drawGrid(ctx, panelW, f1, '#58a6ff88', 1);
                            drawGrid(ctx, 2*panelW, f12, '#f0883e', 1.5);

                            ctx.fillStyle = '#8b949e'; ctx.font = '10px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('f\u2082\u2218f\u2081 is conformal wherever both maps have nonzero derivative', W/2, H - 10);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find a conformal map from the first quadrant \\(\\{\\text{Re}\\,z > 0, \\text{Im}\\,z > 0\\}\\) to the upper half-plane \\(\\mathbb{H}^+\\).',
                    hint: 'A power map multiplies angles. The first quadrant has angle \\(\\pi/2\\); the upper half-plane has angle \\(\\pi\\). What power achieves this?',
                    solution: '\\(f(z) = z^2\\). If \\(z = re^{i\\theta}\\) with \\(0 < \\theta < \\pi/2\\), then \\(z^2 = r^2 e^{2i\\theta}\\) with \\(0 < 2\\theta < \\pi\\), which is exactly \\(\\mathbb{H}^+\\). The two boundary rays (positive real and positive imaginary axes) map to the positive and negative real axes respectively.'
                },
                {
                    question: 'Using composition, find a conformal map from the sector \\(\\{0 < \\arg z < \\pi/4\\}\\) to the upper half-plane.',
                    hint: 'Multiply the opening angle by the appropriate integer to reach \\(\\pi\\).',
                    solution: 'The sector has opening angle \\(\\pi/4\\). Applying \\(f(z) = z^4\\) multiplies all angles by 4, sending the sector to \\(\\{0 < \\arg w < \\pi\\} = \\mathbb{H}^+\\). Conformality holds away from the origin (where \\(f\'(z) = 4z^3 = 0\\)).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Schwarz-Christoffel Preview
        // ================================================================
        {
            id: 'sec-schwarz-christoffel',
            title: 'Schwarz\u2013Christoffel Preview',
            content: `
<h2>The Schwarz\u2013Christoffel Formula: Mapping to Polygons</h2>

<p>The maps discussed so far handle smooth boundaries. Real applications often involve polygonal domains: channels with corners, wedge-shaped regions, slitted planes. The Schwarz\u2013Christoffel formula is the systematic tool for these.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.5 (Schwarz\u2013Christoffel, informal statement)</div>
    <div class="env-body">
        <p>Let \\(P\\) be a polygon in \\(\\mathbb{C}\\) with vertices \\(w_1, \\ldots, w_n\\) and interior angles \\(\\alpha_1 \\pi, \\ldots, \\alpha_n \\pi\\) (so \\(\\alpha_k \\in (0, 2)\\)). There exists a conformal map \\(f: \\mathbb{H}^+ \\to P\\) given by</p>
        \\[f'(z) = C \\prod_{k=1}^{n} (z - x_k)^{\\alpha_k - 1},\\]
        <p>where \\(x_1 < x_2 < \\cdots < x_n\\) are preimages of the vertices on the real axis and \\(C\\) is a complex constant controlling the size and rotation of \\(P\\).</p>
    </div>
</div>

<h3>Reading the Formula</h3>

<p>Each factor \\((z - x_k)^{\\alpha_k - 1}\\) contributes a turn of angle \\((\\alpha_k - 1)\\pi\\) as \\(z\\) crosses \\(x_k\\). For a convex polygon, \\(\\alpha_k < 1\\) at each vertex (the exterior angle is \\((1 - \\alpha_k)\\pi > 0\\)), so each factor introduces a zero of \\(f'\\) at the preimage vertex. These are the critical points, which is precisely where conformality fails — and where the boundary bends.</p>

<div class="env-block example">
    <div class="env-title">Example: The Upper Half-Plane to a Rectangle</div>
    <div class="env-body">
        <p>A rectangle has four right angles: \\(\\alpha_k = 1/2\\) for all \\(k\\). The formula gives</p>
        \\[f'(z) = C(z - x_1)^{-1/2}(z - x_2)^{-1/2}(z - x_3)^{-1/2}(z - x_4)^{-1/2}.\\]
        <p>Integrating this leads to an elliptic integral. The ratio of the rectangle's sides is determined by the cross-ratio of \\(x_1, x_2, x_3, x_4\\). This is directly connected to the theory of elliptic functions.</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: The Upper Half-Plane to a Wedge</div>
    <div class="env-body">
        <p>A wedge of angle \\(\\beta\\) has one finite vertex with angle \\(\\beta\\) and two "vertices at infinity." The formula reduces to \\(f'(z) = Cz^{\\beta/\\pi - 1}\\), integrating to \\(f(z) = Az^{\\beta/\\pi} + B\\), i.e., a power map. This confirms Theorem 13.4: power maps are the Schwarz\u2013Christoffel maps for wedge domains.</p>
    </div>
</div>

<h3>Degrees of Freedom</h3>

<p>By a Möbius transformation of the upper half-plane (which maps \\(\\mathbb{H}^+\\) to itself and preserves conformality), three of the preimage points \\(x_k\\) can be fixed freely. Convention: fix \\(x_{n-2}, x_{n-1}, x_n\\) or send \\(x_n = \\infty\\). This leaves \\(n - 3\\) free real parameters to match the \\(n - 3\\) independent shape parameters of the polygon.</p>

<div class="viz-placeholder" data-viz="viz-sin-mapping"></div>
`,
            visualizations: [
                {
                    id: 'viz-sin-mapping',
                    title: 'sin(z): Strip to Slit Plane',
                    description: 'The map sin(z) sends the vertical strip {-\u03c0/2 < Re(z) < \u03c0/2} conformally to the complex plane minus two real slits. The boundary lines (Re(z) = \u00b1\u03c0/2) map to the two slits on the real axis.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 360, scale: 1, originX: 0, originY: 0 });

                        var W = viz.width/2, H = viz.height;
                        var scL = 50, scR = 50;
                        function toScrL(x,y) { return [W/2 + x*scL, H/2 - y*scL]; }
                        function toScrR(x,y) { return [W+2 + W/2 + x*scR, H/2 - y*scR]; }

                        function sinz(x, y) { return [Math.sin(x)*Math.cosh(y), Math.cos(x)*Math.sinh(y)]; }

                        var animT = 0, rafId = null;
                        var playBtn = VizEngine.createButton(controls, 'Animate', function() {
                            if (rafId) { cancelAnimationFrame(rafId); rafId = null; playBtn.textContent = 'Animate'; draw(1); }
                            else { animate(); playBtn.textContent = 'Stop'; }
                        });
                        function lerp(a,b,t){ return a+(b-a)*t; }

                        function drawGridSin(ctx, panel, toScr, t) {
                            var step = Math.PI/6;
                            var xMin = -Math.PI/2, xMax = Math.PI/2, yMin = -3, yMax = 3;

                            // Horizontal lines
                            var hColors = ['#58a6ff','#3fb9a0','#f0883e','#bc8cff','#3fb950','#d29922','#f85149'];
                            var hi = 0;
                            for (var iy = yMin; iy <= yMax+0.001; iy += 1) {
                                ctx.strokeStyle = hColors[hi % hColors.length]; hi++;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); var started = false;
                                for (var ix = xMin; ix <= xMax+0.001; ix += 0.04) {
                                    var w = sinz(ix, iy);
                                    var fx = lerp(ix, w[0], t), fy = lerp(iy, w[1], t);
                                    if (!isFinite(fx)||!isFinite(fy)||Math.abs(fx)>8||Math.abs(fy)>8) { started=false; continue; }
                                    var s = toScr(fx, fy);
                                    if (!started) { ctx.moveTo(s[0],s[1]); started=true; } else ctx.lineTo(s[0],s[1]);
                                }
                                ctx.stroke();
                            }

                            // Vertical lines
                            var vColors = ['#ffffff33','#ffffff55','#ffffff77','#ffffff99','#ffffffaa'];
                            var vi2 = 0;
                            for (var ix2 = xMin; ix2 <= xMax+0.001; ix2 += step) {
                                var isBoundary = Math.abs(Math.abs(ix2) - Math.PI/2) < 0.01;
                                ctx.strokeStyle = isBoundary ? '#f85149' : vColors[vi2 % vColors.length]; vi2++;
                                ctx.lineWidth = isBoundary ? 2 : 1;
                                ctx.beginPath(); var started2 = false;
                                for (var iy2 = yMin; iy2 <= yMax+0.001; iy2 += 0.04) {
                                    var w2 = sinz(ix2, iy2);
                                    var fx2 = lerp(ix2, w2[0], t), fy2 = lerp(iy2, w2[1], t);
                                    if (!isFinite(fx2)||!isFinite(fy2)||Math.abs(fx2)>8||Math.abs(fy2)>8) { started2=false; continue; }
                                    var s2 = toScr(fx2, fy2);
                                    if (!started2) { ctx.moveTo(s2[0],s2[1]); started2=true; } else ctx.lineTo(s2[0],s2[1]);
                                }
                                ctx.stroke();
                            }
                        }

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            ctx.strokeStyle = '#30363d'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(W, H); ctx.stroke();

                            ctx.fillStyle = '#8b949e'; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('z-plane (strip)', W/2, 18);
                            ctx.fillText('sin(z) plane', W+W/2, 18);

                            // Axes
                            ctx.strokeStyle = '#4a4a7a'; ctx.lineWidth = 1;
                            var la = toScrL(0,0), ra = toScrR(0,0);
                            ctx.beginPath(); ctx.moveTo(toScrL(-4,0)[0],la[1]); ctx.lineTo(toScrL(4,0)[0],la[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(la[0],toScrL(0,-3)[1]); ctx.lineTo(la[0],toScrL(0,3)[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(toScrR(-4,0)[0],ra[1]); ctx.lineTo(toScrR(4,0)[0],ra[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(ra[0],toScrR(0,-3)[1]); ctx.lineTo(ra[0],toScrR(0,3)[1]); ctx.stroke();

                            // Strip boundary
                            ctx.strokeStyle = '#f8514944'; ctx.lineWidth = 1; ctx.setLineDash([4,3]);
                            var lb1 = toScrL(-Math.PI/2, -3), lb2 = toScrL(-Math.PI/2, 3);
                            var lb3 = toScrL(Math.PI/2, -3), lb4 = toScrL(Math.PI/2, 3);
                            ctx.beginPath(); ctx.moveTo(lb1[0],lb1[1]); ctx.lineTo(lb2[0],lb2[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(lb3[0],lb3[1]); ctx.lineTo(lb4[0],lb4[1]); ctx.stroke();
                            ctx.setLineDash([]);

                            drawGridSin(ctx, 0, toScrL, 0);
                            drawGridSin(ctx, W+2, toScrR, t);

                            ctx.fillStyle = '#8b949e'; ctx.font = '11px -apple-system,sans-serif'; ctx.textAlign = 'center';
                            ctx.fillText('Red lines Re(z)=\u00b1\u03c0/2 map to real slits [\u22121,\u221e) and (\u2212\u221e,\u22121]', W+W/2, H-14);
                        }

                        function animate() {
                            animT += 0.018;
                            var t = (Math.sin(animT)+1)/2;
                            draw(t);
                            rafId = requestAnimationFrame(animate);
                        }

                        draw(1);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In the Schwarz\u2013Christoffel formula, why does the sum of the exponents \\(\\sum_{k=1}^n (\\alpha_k - 1)\\) equal \\(-2\\) for a bounded polygon?',
                    hint: 'The sum of all interior angles of an \\(n\\)-gon is \\((n-2)\\pi\\), so \\(\\sum \\alpha_k = n - 2\\).',
                    solution: '\\(\\sum_{k=1}^n (\\alpha_k - 1) = \\sum \\alpha_k - n = (n-2) - n = -2\\). This means \\(f\'(z) \\to 0\\) as \\(|z| \\to \\infty\\) at the appropriate rate (like \\(z^{-2}\\)), which is exactly what is needed for \\(f\\) to extend to a bounded polygon.'
                },
                {
                    question: 'Apply the Schwarz\u2013Christoffel formula to find \\(f\'\\) for the map from \\(\\mathbb{H}^+\\) to the upper half-plane itself (treated as a degenerate polygon with two vertices at \\(\\pm\\infty\\) and interior angle \\(\\pi\\)).',
                    hint: 'Both vertices have interior angle \\(\\pi\\), so \\(\\alpha_k = 1\\) for both.',
                    solution: 'With both \\(\\alpha_k = 1\\), each factor becomes \\((z - x_k)^0 = 1\\). So \\(f\'(z) = C\\), meaning \\(f\\) is a linear map \\(f(z) = Cz + D\\). This confirms that the only conformal automorphisms of \\(\\mathbb{H}^+\\) fixing the real line are linear (plus Möbius transformations, which correspond to choosing the preimage points differently).'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Applications
        // ================================================================
        {
            id: 'sec-applications',
            title: 'Applications',
            content: `
<h2>Applications of Conformal Mapping</h2>

<h3>Fluid Dynamics</h3>

<p>An ideal (inviscid, irrotational, incompressible) two-dimensional flow is described by a <strong>complex potential</strong> \\(F(z) = \\phi(x,y) + i\\psi(x,y)\\), where \\(\\phi\\) is the velocity potential and \\(\\psi\\) is the stream function. Both are harmonic and conjugate. The velocity field is \\(\\overline{F'(z)}\\).</p>

<p>Key fact: if \\(F(w)\\) is the complex potential for a flow in the \\(w\\)-plane and \\(z = g(w)\\) is a conformal map, then \\(F(g(z))\\) is a valid complex potential in the \\(z\\)-plane (since composition preserves harmonicity and analyticity).</p>

<div class="env-block example">
    <div class="env-title">Flow Around a Cylinder</div>
    <div class="env-body">
        <p>Uniform flow past a circular cylinder \\(|w| = R\\) has complex potential \\(F(w) = U(w + R^2/w)\\). Applying the Joukowski map \\(z = J(w) = w + 1/w\\) (with \\(R = 1\\)) gives the flow around a Joukowski airfoil. The streamlines in the \\(z\\)-plane are the images of horizontal lines in the \\(w\\)-plane.</p>
    </div>
</div>

<h3>Electrostatics</h3>

<p>The electrostatic potential \\(u(x,y)\\) satisfies \\(\\nabla^2 u = 0\\). Given a conformal map \\(f: D \\to D'\\), a harmonic function on \\(D'\\) pulls back to a harmonic function on \\(D\\) (since \\(u \\circ f\\) is harmonic if \\(u\\) is and \\(f\\) is analytic). This reduces boundary-value problems on complicated regions to standard ones.</p>

<div class="env-block example">
    <div class="env-title">Parallel Plate Capacitor with Edge Effects</div>
    <div class="env-body">
        <p>Two semi-infinite conducting plates along \\(y = 0\\) with \\(x < 0\\) and \\(y = \\pi\\) with \\(x < 0\\), held at potentials \\(0\\) and \\(1\\) respectively, define a capacitor with edge effects. The Schwarz\u2013Christoffel map for this L-shaped boundary transforms the problem to a half-plane where the potential is simply \\(u(x) = x/\\pi\\).</p>
    </div>
</div>

<h3>Heat Flow</h3>

<p>Steady-state temperature satisfies \\(\\nabla^2 T = 0\\). The same reduction applies. A canonical example: the temperature in a wedge with the two faces held at different temperatures is found by mapping the wedge to a half-plane via \\(z^{\\pi/\\alpha}\\) (where \\(\\alpha\\) is the wedge angle), solving the half-plane problem (constant-valued boundary), and mapping back.</p>

<div class="env-block remark">
    <div class="env-title">Why Conformal Maps Preserve Harmonicity</div>
    <div class="env-body">
        <p>If \\(u\\) is harmonic on \\(D'\\) and \\(f: D \\to D'\\) is analytic, then \\(u \\circ f\\) is harmonic on \\(D\\). The proof uses the Cauchy\u2013Riemann equations: if \\(u = \\text{Re}\\,F\\) for some analytic \\(F\\), then \\(u \\circ f = \\text{Re}(F \\circ f)\\), and \\(F \\circ f\\) is analytic (chain rule). A real part of an analytic function is always harmonic.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-fluid-flow"></div>
`,
            visualizations: [
                {
                    id: 'viz-fluid-flow',
                    title: 'Conformal Flow Around an Airfoil',
                    description: 'Streamlines of uniform flow are pulled back through the Joukowski map to give flow around an airfoil. Animated streamlines show the velocity field. Drag the circle center to reshape the airfoil.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 1, originX: 0, originY: 0 });

                        var cx = -0.1, cy = 0.1;
                        viz.addDraggable('center2', cx, cy, '#f0883e', 8, function(x, y) {
                            cx = x; cy = y;
                        });

                        var W = viz.width, H = viz.height;
                        var sc = 75;
                        function toScr(x, y) { return [W/2 + x*sc, H/2 - y*sc]; }

                        function joukowski(x, y) {
                            var d = x*x + y*y;
                            if (d < 1e-10) return [1e6, 1e6];
                            return [x + x/d, y - y/d];
                        }

                        // Inverse Joukowski: given a circle center and radius, trace streamlines
                        // Streamlines in circle domain: horizontal lines y = c in the far field
                        // Complex potential for flow around circle: F(w) = U(w + R^2/w)
                        // Streamlines are Im(F) = const, i.e., Im(w + R^2/w) = const

                        var animT = 0, rafId = null;
                        var playBtn = VizEngine.createButton(controls, 'Animate Streamlines', function() {
                            if (rafId) { cancelAnimationFrame(rafId); rafId = null; playBtn.textContent = 'Animate Streamlines'; }
                            else { animate(); playBtn.textContent = 'Stop'; }
                        });

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Compute circle parameters
                            var dist = Math.sqrt((cx+1)*(cx+1) + cy*cy);
                            var R = dist;

                            // Draw airfoil shape
                            var airfoilPts = [];
                            for (var ai = 0; ai <= 300; ai++) {
                                var theta = 2*Math.PI*ai/300;
                                var wx = cx + R*Math.cos(theta);
                                var wy = cy + R*Math.sin(theta);
                                var jw = joukowski(wx, wy);
                                if (isFinite(jw[0]) && isFinite(jw[1])) airfoilPts.push(jw);
                            }

                            if (airfoilPts.length > 2) {
                                ctx.fillStyle = '#1a1a4066';
                                ctx.strokeStyle = '#f0883e'; ctx.lineWidth = 2;
                                ctx.beginPath();
                                var s0 = toScr(airfoilPts[0][0], airfoilPts[0][1]);
                                ctx.moveTo(s0[0], s0[1]);
                                for (var pi = 1; pi < airfoilPts.length; pi++) {
                                    var sp = toScr(airfoilPts[pi][0], airfoilPts[pi][1]);
                                    ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();
                            }

                            // Draw streamlines
                            var numStreams = 20;
                            var streamYs = [];
                            for (var si = 0; si < numStreams; si++) {
                                streamYs.push(-2.5 + si * 5 / (numStreams - 1));
                            }

                            for (var si2 = 0; si2 < streamYs.length; si2++) {
                                var psi0 = streamYs[si2]; // streamline value Im(F) = psi0
                                // Parametric: trace streamline in z-plane by mapping from w-plane
                                // In w-plane: horizontal line y_w = psi0 maps to w = x + i*psi0
                                // But we need Im(w + R^2/w) = psi0 which is curved
                                // Approximation: use the w-plane streamline directly mapped via Joukowski
                                // w-plane streamline: Im(w + R^2/w) = psi0
                                // At large |w|: approx Im(w) = psi0, so start at large |w|

                                ctx.strokeStyle = psi0 > 0 ? '#58a6ff55' : '#3fb9a055';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;

                                // Parametric trace: w = x_w + i*y_w where Im(w + R^2/w) = psi0
                                // For each x_w, solve: y_w - R^2*y_w/(x_w^2+y_w^2) = psi0
                                // This is implicit; use Newton iteration
                                var prevX = -4, prevY = psi0;

                                for (var xi3 = -4; xi3 <= 4; xi3 += 0.05) {
                                    // Newton's method for y: g(y) = y - R^2*y/(xi3^2+y^2) - psi0 = 0
                                    var yw = prevY;
                                    for (var iter = 0; iter < 10; iter++) {
                                        var d2 = xi3*xi3 + yw*yw;
                                        if (d2 < 1e-8) break;
                                        var g = yw - R*R*yw/d2 - psi0;
                                        var gp = 1 - R*R*(d2 - 2*yw*yw)/(d2*d2);
                                        if (Math.abs(gp) < 1e-10) break;
                                        yw -= g/gp;
                                    }
                                    prevY = yw;

                                    // Map to z-plane via Joukowski
                                    var jz = joukowski(xi3, yw);
                                    if (!isFinite(jz[0]) || !isFinite(jz[1])) { started = false; continue; }

                                    // Animate: offset along streamline
                                    var sx = jz[0], sy = jz[1];
                                    if (Math.abs(sx) > 5 || Math.abs(sy) > 5) { started = false; continue; }

                                    var sp = toScr(sx, sy);
                                    if (!started) { ctx.moveTo(sp[0], sp[1]); started = true; }
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                            }

                            // Animated flow particles
                            var nPart = 15;
                            for (var pi2 = 0; pi2 < nPart; pi2++) {
                                var psi2 = -2.2 + pi2 * 4.4 / (nPart - 1);
                                var xp = -4 + ((t/60 * 1.5 + pi2 * 0.3) % 8) * 1;
                                xp = xp - 4;
                                // Solve for y on streamline
                                var yw2 = psi2;
                                for (var it2 = 0; it2 < 15; it2++) {
                                    var d3 = xp*xp + yw2*yw2;
                                    if (d3 < 1e-8) break;
                                    var g2 = yw2 - R*R*yw2/d3 - psi2;
                                    var gp2 = 1 - R*R*(d3 - 2*yw2*yw2)/(d3*d3);
                                    if (Math.abs(gp2) < 1e-10) break;
                                    yw2 -= g2/gp2;
                                }
                                var jpt = joukowski(xp, yw2);
                                if (!isFinite(jpt[0]) || !isFinite(jpt[1])) continue;
                                if (Math.abs(jpt[0]) > 5 || Math.abs(jpt[1]) > 5) continue;
                                var sp2 = toScr(jpt[0], jpt[1]);
                                ctx.fillStyle = '#58a6ffaa';
                                ctx.beginPath(); ctx.arc(sp2[0], sp2[1], 3, 0, Math.PI*2); ctx.fill();
                            }

                            // Draw airfoil outline on top
                            if (airfoilPts.length > 2) {
                                ctx.strokeStyle = '#f0883e'; ctx.lineWidth = 2;
                                ctx.beginPath();
                                var sa0 = toScr(airfoilPts[0][0], airfoilPts[0][1]);
                                ctx.moveTo(sa0[0], sa0[1]);
                                for (var pai = 1; pai < airfoilPts.length; pai++) {
                                    var spa = toScr(airfoilPts[pai][0], airfoilPts[pai][1]);
                                    ctx.lineTo(spa[0], spa[1]);
                                }
                                ctx.closePath(); ctx.stroke();
                            }

                            // Labels
                            ctx.fillStyle = '#8b949e'; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left';
                            ctx.fillText('Airfoil: Joukowski map of circle centered at (' + cx.toFixed(2) + ', ' + cy.toFixed(2) + ')', 10, H-14);
                            viz.drawDraggables();
                        }

                        function animate() {
                            animT++;
                            draw(animT);
                            rafId = requestAnimationFrame(animate);
                        }

                        draw(0);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The complex potential for uniform flow \\(U\\) past a cylinder \\(|z| = R\\) is \\(F(z) = U(z + R^2/z)\\). Compute the velocity \\(\\overline{F\'(z)}\\) and show that on the cylinder surface \\(|z| = R\\), the radial velocity is zero (no flow through the boundary).',
                    hint: 'Write \\(z = Re^{i\\theta}\\) on the cylinder. Compute \\(F\'(z) = U(1 - R^2/z^2)\\) and project onto the radial direction.',
                    solution: '\\(F\'(z) = U(1 - R^2/z^2)\\). On \\(|z| = R\\), write \\(z = Re^{i\\theta}\\): \\(F\'(Re^{i\\theta}) = U(1 - e^{-2i\\theta})\\). The radial direction at angle \\(\\theta\\) is \\(e^{i\\theta}\\). The radial component of velocity is \\(\\text{Re}(\\overline{F\'(z)} \\cdot (-e^{i\\theta}))\\). Computing: \\(\\overline{F\'} = U(1 - e^{2i\\theta})\\), so \\(\\text{Re}(U(1-e^{2i\\theta})\\cdot(-e^{i\\theta})) = \\text{Re}(-Ue^{i\\theta} + Ue^{3i\\theta})\\). This is \\(-U\\cos\\theta + U\\cos(3\\theta)\\)... Actually the correct statement uses the stream function: on \\(|z|=R\\), \\(\\psi = \\text{Im}\\,F = U\\cdot 0 = 0\\) (since \\(\\text{Im}(Re^{i\\theta} + R^2/(Re^{i\\theta})) = R\\sin\\theta - R\\sin\\theta = 0\\)). Constant \\(\\psi\\) means the cylinder is a streamline, so no normal flow through it.'
                },
                {
                    question: 'If \\(u\\) is the harmonic solution to a boundary-value problem on \\(\\mathbb{H}^+\\) with \\(u = 0\\) on \\(x < 0\\) and \\(u = 1\\) on \\(x > 0\\), find the solution on the wedge \\(\\{0 < \\arg z < \\alpha\\}\\) with the same boundary values.',
                    hint: 'Map the wedge to \\(\\mathbb{H}^+\\) with \\(f(z) = z^{\\pi/\\alpha}\\). The solution on \\(\\mathbb{H}^+\\) is \\(u = \\arg(w)/\\pi\\).',
                    solution: 'Map the wedge to \\(\\mathbb{H}^+\\) via \\(w = z^{\\pi/\\alpha}\\). On \\(\\mathbb{H}^+\\), the solution is \\(u(w) = \\arg(w)/\\pi\\). Pulling back: \\(u(z) = \\arg(z^{\\pi/\\alpha})/\\pi = (\\pi/\\alpha)\\arg(z)/\\pi = \\arg(z)/\\alpha\\). This is the harmonic function equal to \\(0\\) on the ray \\(\\arg z = 0\\) and \\(1\\) on the ray \\(\\arg z = \\alpha\\).'
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

<p>Conformal mappings raise an immediate question: given a domain \\(D\\), how do we know a conformal map to the disk <em>exists</em>? And is it unique? The answer is Riemann's most celebrated theorem.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 13.6 (Riemann Mapping Theorem, statement only)</div>
    <div class="env-body">
        <p>Let \\(D \\subsetneq \\mathbb{C}\\) be a simply connected domain. Then there exists a conformal bijection \\(f: D \\to \\mathbb{D}\\) (where \\(\\mathbb{D} = \\{|z| < 1\\}\\)). Moreover, if we fix a point \\(z_0 \\in D\\) and require \\(f(z_0) = 0\\) and \\(f\'(z_0) > 0\\), the map \\(f\\) is unique.</p>
    </div>
</div>

<p>The proof of the Riemann Mapping Theorem uses normal families (Montel's theorem) and is one of the jewels of the course. It will be covered in Chapter 15.</p>

<h3>The Möbius Gap</h3>

<p>Between conformal mappings and the Riemann Mapping Theorem lies Chapter 14: <strong>Möbius transformations</strong>. These are the conformal bijections of the Riemann sphere \\(\\hat{\\mathbb{C}} = \\mathbb{C} \\cup \\{\\infty\\}\\) to itself:</p>
\\[M(z) = \\frac{az + b}{cz + d}, \\quad ad - bc \\neq 0.\\]
<p>They map circles and lines to circles and lines, form a group under composition, and are classified by their fixed points. They are the workhorses for mapping standard domains (disks, half-planes, lens-shaped regions) to each other — the next essential toolkit before we prove the Riemann theorem.</p>

<h3>Chapter Summary</h3>

<ul>
    <li><strong>Conformality criterion:</strong> analytic with \\(f\'(z) \\neq 0\\) at each point.</li>
    <li><strong>Key maps:</strong> power maps (wedges), \\(e^z\\) (strips to sectors), Joukowski (airfoils), \\(\\sin z\\) (strip to slit plane).</li>
    <li><strong>Composition:</strong> conformal maps compose to conformal maps; build complex maps from simple pieces.</li>
    <li><strong>Schwarz\u2013Christoffel:</strong> the formula \\(f\'(z) = C\\prod(z-x_k)^{\\alpha_k-1}\\) handles polygonal domains.</li>
    <li><strong>Applications:</strong> fluid flow, electrostatics, heat — all governed by Laplace's equation, all reducible via conformal maps.</li>
</ul>

<div class="env-block intuition">
    <div class="env-title">The Central Insight</div>
    <div class="env-body">
        <p>A conformal map is a local isometry of angles. Globally, it is a change of coordinates that preserves the structure of harmonic functions. Every hard problem on a complicated domain becomes an easy problem on a simple domain. This is why complex analysis is indispensable in applied mathematics: it turns geometry into algebra, and difficult PDEs into trivial ones.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'The Riemann Mapping Theorem guarantees a conformal map from any simply connected proper subdomain of \\(\\mathbb{C}\\) to the unit disk. Why does "simply connected" matter? Give an example of a domain for which no such map can exist.',
                    hint: 'Think about what topological property is preserved by homeomorphisms (and hence by conformal maps). Consider an annulus.',
                    solution: 'Conformal maps are homeomorphisms, so they preserve topology. A simply connected domain has trivial fundamental group (no "holes"); the unit disk is simply connected. An annulus \\(\\{r < |z| < R\\}\\) has a hole, so its fundamental group is \\(\\mathbb{Z}\\), which is nontrivial. No conformal map from an annulus to the unit disk can exist because they are not homeomorphic.'
                },
                {
                    question: 'Prove that the composition of two conformal maps is conformal, stating carefully where it may fail.',
                    hint: 'Use the chain rule \\((g \\circ f)\'(z) = g\'(f(z)) \\cdot f\'(z)\\) and track when each factor can vanish.',
                    solution: 'By the chain rule, \\((g\\circ f)\'(z) = g\'(f(z))\\cdot f\'(z)\\). This product is nonzero provided both \\(f\'(z) \\neq 0\\) and \\(g\'(f(z)) \\neq 0\\). Both \\(f\\) and \\(g\\) are analytic (composition of analytic functions is analytic), so \\(g\\circ f\\) is analytic. It is conformal at \\(z\\) if and only if \\(f\'(z) \\neq 0\\) and \\(g\'(f(z)) \\neq 0\\), i.e., \\(z\\) is not a critical point of \\(f\\) and \\(f(z)\\) is not a critical point of \\(g\\).'
                },
                {
                    question: 'Using the fact that \\(u(z) = \\log|z|\\) is harmonic on \\(\\mathbb{C} \\setminus \\{0\\}\\), and applying the conformal map \\(w = e^z\\) (which maps vertical strips to annuli), find the solution to Laplace\'s equation in the annulus \\(\\{1 < |w| < e^2\\}\\) with boundary conditions \\(u = 0\\) on \\(|w| = 1\\) and \\(u = 1\\) on \\(|w| = e^2\\).',
                    hint: 'Map the annulus to the strip \\(\\{0 < \\text{Re}\\,z < 2\\}\\) via \\(z = \\log w\\). Solve the strip problem first.',
                    solution: 'Under \\(z = \\log w\\), the annulus \\(1 < |w| < e^2\\) maps to the strip \\(0 < \\text{Re}\\,z < 2\\). The boundary conditions become \\(u = 0\\) on \\(\\text{Re}\\,z = 0\\) and \\(u = 1\\) on \\(\\text{Re}\\,z = 2\\). The harmonic solution in the strip is \\(u = \\text{Re}\\,z / 2 = x/2\\). Mapping back: \\(x = \\text{Re}(\\log w) = \\log|w|\\). So \\(u(w) = \\log|w|/2\\). Verify: \\(u = 0\\) when \\(|w|=1\\) and \\(u = 2/2 = 1\\) when \\(|w| = e^2\\). Correct.'
                }
            ]
        }

    ] // end sections
}); // end chapter push
