window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: 'The Riemann Mapping Theorem',
    subtitle: 'Every simply connected domain is conformally equivalent to the disk',
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
    <div class="env-title">The Central Question</div>
    <div class="env-body">
        <p>Suppose you are given two regions in the plane: a crescent-shaped domain and a triangular one. Can you find a holomorphic bijection between them? This question seems to depend on the precise shapes, but one of the deepest theorems in complex analysis says: <em>shape doesn't matter, only topology does</em>.</p>
    </div>
</div>

<p>A conformal map between two domains is a bijective holomorphic function whose inverse is also holomorphic. Such maps preserve angles locally, turning infinitesimal squares into infinitesimal squares (though possibly rotated and scaled). The question of which domains are conformally equivalent is one of the central problems of geometric function theory.</p>

<p>For simply connected domains (those with no holes), the answer is beautifully complete:</p>

<div class="env-block theorem">
    <div class="env-title">Informal Statement</div>
    <div class="env-body">
        <p>Every simply connected proper subdomain of \\(\\mathbb{C}\\) can be mapped conformally onto the open unit disk \\(\\mathbb{D} = \\{z : |z| < 1\\}\\).</p>
    </div>
</div>

<p>This is remarkable. A disk, a half-plane, a crescent, a polygon, an infinite strip — all are conformally equivalent to one another. In the conformal world, there is essentially <em>one</em> simply connected domain (up to the trivial exception of \\(\\mathbb{C}\\) itself, which is conformally distinct by Liouville's theorem).</p>

<h3>Why Conformal Equivalence Matters</h3>

<p>Conformal maps are a powerful problem-solving tool. Many problems in physics and engineering — electrostatics, fluid flow, heat conduction — are governed by Laplace's equation \\(\\Delta u = 0\\). Harmonic functions pull back under conformal maps: if \\(u\\) is harmonic on \\(\\Omega\\) and \\(f : \\mathbb{D} \\to \\Omega\\) is conformal, then \\(u \\circ f\\) is harmonic on \\(\\mathbb{D}\\). Solving a boundary value problem on a complicated domain reduces to solving it on the disk, where everything is explicit via the Poisson kernel.</p>

<p>This is the practical power of the Riemann Mapping Theorem: it guarantees such a simplifying map always exists, even when we cannot write it down in closed form.</p>

<h3>Historical Context</h3>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Riemann stated the theorem in his 1851 doctoral dissertation without a complete proof. He relied on the Dirichlet principle — minimizing an energy integral — which was later criticized by Weierstrass for lacking rigorous justification. The first complete proof was given by Osgood in 1900, followed by a cleaner treatment by Koebe in 1907. The modern proof, via normal families and the extremal function, is due to Fejér and Riesz (around 1922). It is this proof we present here.</p>
    </div>
</div>

<p>The theorem sits at the intersection of topology, analysis, and geometry. Its proof draws on Montel's theorem (compactness), Hurwitz's theorem (preservation of injectivity), and an elegant extremal principle.</p>
`,
            visualizations: [
                {
                    id: 'viz-riemann-mapping-gallery',
                    title: 'Conformal Maps to the Disk: A Gallery',
                    description: 'Four simply connected domains, each conformally mapped to the unit disk. Toggle "Animate Grid" to watch a coordinate grid deform continuously into the disk. Each domain\'s grid lines map to orthogonal curves in the disk.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 400, scale: 1 });
                        var t = 0;
                        var animating = false;
                        var animId = null;

                        var domainIdx = 0;
                        var domains = ['Half-Plane', 'Strip', 'L-shape', 'Triangle'];

                        // Domain selector
                        var sel = document.createElement('select');
                        sel.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;margin-right:8px;';
                        domains.forEach(function(d, i) {
                            var opt = document.createElement('option');
                            opt.value = i; opt.textContent = d; sel.appendChild(opt);
                        });
                        sel.addEventListener('change', function() { domainIdx = parseInt(sel.value); t = 0; draw(0); });
                        controls.appendChild(sel);

                        var btnAnim = VizEngine.createButton(controls, 'Animate Grid', function() {
                            animating = !animating;
                            btnAnim.textContent = animating ? 'Stop' : 'Animate Grid';
                            if (animating) {
                                var start = performance.now();
                                function loop(now) {
                                    t = ((now - start) / 3000) % 1;
                                    draw(t);
                                    if (animating) animId = requestAnimationFrame(loop);
                                }
                                animId = requestAnimationFrame(loop);
                            } else {
                                if (animId) cancelAnimationFrame(animId);
                                draw(t);
                            }
                        });

                        // Complex arithmetic helpers
                        function cadd(a, b) { return [a[0]+b[0], a[1]+b[1]]; }
                        function csub(a, b) { return [a[0]-b[0], a[1]-b[1]]; }
                        function cmul(a, b) { return [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]]; }
                        function cdiv(a, b) {
                            var d = b[0]*b[0]+b[1]*b[1];
                            if (d < 1e-12) return [0,0];
                            return [(a[0]*b[0]+a[1]*b[1])/d, (a[1]*b[0]-a[0]*b[1])/d];
                        }
                        function cexp(z) {
                            var er = Math.exp(z[0]);
                            return [er*Math.cos(z[1]), er*Math.sin(z[1])];
                        }
                        function cabs(z) { return Math.sqrt(z[0]*z[0]+z[1]*z[1]); }
                        function cpow(z, alpha) {
                            var r = cabs(z);
                            if (r < 1e-12) return [0,0];
                            var arg = Math.atan2(z[1], z[0]);
                            var rA = Math.pow(r, alpha);
                            return [rA*Math.cos(alpha*arg), rA*Math.sin(alpha*arg)];
                        }

                        // Maps: domain -> disk
                        // 0: upper half-plane H -> D via Cayley: (z-i)/(z+i)
                        function mapHalfPlane(z) {
                            return cdiv(csub(z,[0,1]), cadd(z,[0,1]));
                        }
                        // 1: strip {0 < Im(z) < pi} -> D via exp then Cayley
                        function mapStrip(z) {
                            // exp: strip -> right half-plane, then Cayley variant
                            var w = cexp(z);       // maps strip to upper half-plane...
                            // Actually strip {0<Im<pi} via exp -> upper half-plane, then Cayley
                            return mapHalfPlane(w);
                        }
                        // 2: L-shape approx (use half-plane with shifted grid)
                        function mapLshape(z) {
                            // Approximate: treat as slightly deformed half-plane
                            var w = cmul(z, [0.5, 0]);
                            return mapHalfPlane(cadd(w, [0, 0.5]));
                        }
                        // 3: sector of angle pi/2 -> D via z^2 then Cayley
                        function mapTriangle(z) {
                            var w = cmul(z, z); // z^2 maps sector of angle pi/2 to half-plane
                            return mapHalfPlane(w);
                        }

                        var mapFns = [mapHalfPlane, mapStrip, mapLshape, mapTriangle];

                        // Grid lines for each domain
                        function getDomainGrid(idx) {
                            var lines = { h: [], v: [] };
                            if (idx === 0) {
                                // Upper half-plane: vertical lines x=const, horizontal y=const (y>0)
                                for (var x = -2; x <= 2; x += 0.5) {
                                    var pts = [];
                                    for (var s = 0; s <= 40; s++) { pts.push([x, 0.1 + s * 0.1]); }
                                    lines.v.push(pts);
                                }
                                for (var y = 0.2; y <= 2.5; y += 0.4) {
                                    var pts2 = [];
                                    for (var s2 = 0; s2 <= 40; s2++) { pts2.push([-2 + s2 * 0.1, y]); }
                                    lines.h.push(pts2);
                                }
                            } else if (idx === 1) {
                                // Strip 0 < Im < pi, -3 < Re < 3
                                for (var x2 = -2.5; x2 <= 2.5; x2 += 0.5) {
                                    var pts3 = [];
                                    for (var s3 = 1; s3 <= 29; s3++) { pts3.push([x2, s3 * Math.PI / 30]); }
                                    lines.v.push(pts3);
                                }
                                for (var y2 = 0.3; y2 < Math.PI; y2 += 0.4) {
                                    var pts4 = [];
                                    for (var s4 = 0; s4 <= 40; s4++) { pts4.push([-2.5 + s4 * 0.125, y2]); }
                                    lines.h.push(pts4);
                                }
                            } else if (idx === 2) {
                                // Approximate L-shape in first quadrant upper region
                                for (var x3 = 0.1; x3 <= 1.9; x3 += 0.3) {
                                    var pts5 = [];
                                    for (var s5 = 0; s5 <= 30; s5++) { pts5.push([x3, 0.1 + s5 * 0.09]); }
                                    lines.v.push(pts5);
                                }
                                for (var y3 = 0.2; y3 <= 2.5; y3 += 0.4) {
                                    var pts6 = [];
                                    for (var s6 = 0; s6 <= 30; s6++) { pts6.push([0.1 + s6 * 0.06, y3]); }
                                    lines.h.push(pts6);
                                }
                            } else {
                                // Sector of angle pi/2
                                for (var th = 0.1; th < Math.PI/2 - 0.1; th += 0.15) {
                                    var pts7 = [];
                                    for (var s7 = 1; s7 <= 30; s7++) {
                                        var r7 = s7 * 0.08;
                                        pts7.push([r7 * Math.cos(th), r7 * Math.sin(th)]);
                                    }
                                    lines.v.push(pts7);
                                }
                                for (var r8 = 0.3; r8 <= 2.2; r8 += 0.35) {
                                    var pts8 = [];
                                    for (var s8 = 0; s8 <= 30; s8++) {
                                        var th2 = 0.05 + s8 * (Math.PI/2 - 0.1) / 30;
                                        pts8.push([r8 * Math.cos(th2), r8 * Math.sin(th2)]);
                                    }
                                    lines.h.push(pts8);
                                }
                            }
                            return lines;
                        }

                        function draw(tt) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var panelW = W / 2 - 10;

                            // Left panel: domain
                            var cx0 = panelW / 2 + 5, cy0 = H / 2;
                            var sc0 = 60;

                            // Right panel: disk
                            var cx1 = W / 2 + panelW / 2 + 5, cy1 = H / 2;
                            var sc1 = Math.min(panelW, H) / 2 - 20;

                            // Divider
                            ctx.strokeStyle = '#2a2a50'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(W/2, 20); ctx.lineTo(W/2, H-20); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText(domains[domainIdx], cx0, 8);
                            ctx.fillText('Unit Disk \u{1D53B}', cx1, 8);

                            // Draw unit circle on right
                            ctx.strokeStyle = viz.colors.blue + '88'; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.arc(cx1, cy1, sc1, 0, Math.PI*2); ctx.stroke();

                            // Get grid
                            var grid = getDomainGrid(domainIdx);
                            var mapFn = mapFns[domainIdx];

                            function interpPt(raw, mapped, t2) {
                                // raw: [x,y] in domain coords, mapped: [u,v] in disk
                                // left panel coord:
                                var lx = cx0 + raw[0] * sc0 * 0.7;
                                var ly = cy0 - raw[1] * sc0 * 0.7;
                                // right panel coord:
                                var rx = cx1 + mapped[0] * sc1;
                                var ry = cy1 - mapped[1] * sc1;
                                return [lx + (rx - lx) * t2, ly + (ry - ly) * t2];
                            }

                            function drawGridLines(lines, color) {
                                ctx.strokeStyle = color; ctx.lineWidth = 1;
                                lines.forEach(function(line) {
                                    ctx.beginPath();
                                    var started = false;
                                    line.forEach(function(pt) {
                                        var mapped = mapFn(pt);
                                        if (cabs(mapped) > 0.99) { started = false; return; }
                                        var scr = interpPt(pt, mapped, tt);
                                        if (!started) { ctx.moveTo(scr[0], scr[1]); started = true; }
                                        else { ctx.lineTo(scr[0], scr[1]); }
                                    });
                                    ctx.stroke();
                                });
                            }

                            drawGridLines(grid.v, viz.colors.teal + 'aa');
                            drawGridLines(grid.h, viz.colors.orange + 'aa');

                            // Draw domain boundary hint on left
                            if (tt < 0.5) {
                                ctx.globalAlpha = 1 - tt * 2;
                                ctx.strokeStyle = viz.colors.white + '66'; ctx.lineWidth = 1;
                                if (domainIdx === 0) {
                                    // x-axis
                                    ctx.beginPath(); ctx.moveTo(cx0 - panelW/2+10, cy0); ctx.lineTo(cx0 + panelW/2-10, cy0); ctx.stroke();
                                } else if (domainIdx === 1) {
                                    // Two horizontal lines
                                    ctx.beginPath(); ctx.moveTo(cx0 - panelW/2+10, cy0 - 0.05*sc0*0.7); ctx.lineTo(cx0 + panelW/2-10, cy0 - 0.05*sc0*0.7); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(cx0 - panelW/2+10, cy0 - Math.PI*sc0*0.7); ctx.lineTo(cx0 + panelW/2-10, cy0 - Math.PI*sc0*0.7); ctx.stroke();
                                }
                                ctx.globalAlpha = 1;
                            }

                            // Arrow in middle
                            if (tt > 0.1 && tt < 0.9) {
                                ctx.globalAlpha = Math.min(1, Math.min(tt, 1-tt) * 5);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.font = '20px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                                ctx.fillText('f', W/2, H/2 - 12);
                                ctx.fillStyle = viz.colors.yellow + '88';
                                ctx.fillText('\u2192', W/2, H/2 + 8);
                                ctx.globalAlpha = 1;
                            }

                            // t label
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
                            ctx.fillText('interpolation t = ' + tt.toFixed(2), W - 8, H - 4);
                        }

                        draw(0);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the Cayley map \\(f(z) = \\frac{z - i}{z + i}\\) sends the upper half-plane to the unit disk. What does it do to the real axis?',
                    hint: 'For \\(z = x \\in \\mathbb{R}\\), compute \\(|f(x)|\\). For \\(z = x + iy\\) with \\(y > 0\\), show \\(|f(z)| < 1\\).',
                    solution: 'For \\(z = x + iy\\), \\(|f(z)|^2 = \\frac{x^2 + (y-1)^2}{x^2 + (y+1)^2}\\). When \\(y > 0\\), the numerator is smaller than the denominator, so \\(|f(z)| < 1\\). When \\(y = 0\\), they are equal, so \\(|f(z)| = 1\\). The real axis maps to the unit circle.'
                }
            ]
        },

        // ================================================================
        // SECTION 2: The Theorem
        // ================================================================
        {
            id: 'sec-statement',
            title: 'The Theorem',
            content: `
<h2>The Theorem</h2>

<p>We first pin down the terminology precisely.</p>

<div class="env-block definition">
    <div class="env-title">Definition (Simply Connected)</div>
    <div class="env-body">
        <p>A domain \\(\\Omega \\subseteq \\mathbb{C}\\) is <strong>simply connected</strong> if it is connected and every closed curve in \\(\\Omega\\) is contractible to a point within \\(\\Omega\\). Equivalently, \\(\\Omega\\) has no holes: its complement \\(\\mathbb{C} \\setminus \\Omega\\) is connected in the Riemann sphere \\(\\hat{\\mathbb{C}}\\).</p>
    </div>
</div>

<p>Examples: the disk \\(\\mathbb{D}\\), the upper half-plane \\(\\mathbb{H}\\), any convex domain, the complement of a ray. Non-examples: the punctured disk \\(\\mathbb{D} \\setminus \\{0\\}\\), the annulus, \\(\\mathbb{C} \\setminus \\{0\\}\\).</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 15.1 (Riemann Mapping Theorem)</div>
    <div class="env-body">
        <p>Let \\(\\Omega \\subsetneq \\mathbb{C}\\) be a simply connected domain. Then there exists a bijective holomorphic map \\(f : \\Omega \\to \\mathbb{D}\\), where \\(\\mathbb{D} = \\{z : |z| < 1\\}\\) is the open unit disk. Such a map is called a <strong>Riemann map</strong> or <strong>uniformization</strong> of \\(\\Omega\\).</p>
    </div>
</div>

<h3>Significance</h3>

<p>The theorem says that from the perspective of complex analysis, there is essentially one simply connected domain other than \\(\\mathbb{C}\\). This is in sharp contrast to real analysis, where no such classification exists: \\((0,1)\\) and \\((0,1)^2\\) are homeomorphic but not diffeomorphic in a way that respects their analytic structure.</p>

<p>The exclusion of \\(\\Omega = \\mathbb{C}\\) is necessary. By Liouville's theorem, any bounded entire function is constant, so no bijection \\(\\mathbb{C} \\to \\mathbb{D}\\) can be holomorphic. More precisely, \\(\\mathbb{C}\\) and \\(\\mathbb{D}\\) are not conformally equivalent: their automorphism groups have different structures.</p>

<h3>Uniqueness via Normalization</h3>

<p>The Riemann map is far from unique: if \\(f : \\Omega \\to \\mathbb{D}\\) is one, then \\(\\phi \\circ f\\) is another for any automorphism \\(\\phi\\) of \\(\\mathbb{D}\\). The automorphisms of \\(\\mathbb{D}\\) are the Mobius transformations</p>

\\[
\\phi_{a,\\theta}(z) = e^{i\\theta} \\frac{z - a}{1 - \\bar{a} z}, \\quad |a| < 1,\\; \\theta \\in \\mathbb{R}.
\\]

<p>This three-real-parameter family is exactly the freedom in choosing a Riemann map. We can fix it by imposing a normalization condition:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 15.2 (Uniqueness)</div>
    <div class="env-body">
        <p>Given \\(z_0 \\in \\Omega\\), there exists a <strong>unique</strong> Riemann map \\(f : \\Omega \\to \\mathbb{D}\\) satisfying \\(f(z_0) = 0\\) and \\(f'(z_0) > 0\\). Here "\\(f'(z_0) > 0\\)" means the derivative is a positive real number, fixing the rotation.</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof of Uniqueness</div>
    <div class="env-body">
        <p>Suppose \\(f, g : \\Omega \\to \\mathbb{D}\\) are both Riemann maps with \\(f(z_0) = g(z_0) = 0\\) and positive real derivatives at \\(z_0\\). Then \\(h = g \\circ f^{-1} : \\mathbb{D} \\to \\mathbb{D}\\) is a conformal automorphism of \\(\\mathbb{D}\\) fixing \\(0\\). By the Schwarz lemma, \\(h(z) = e^{i\\theta} z\\) for some \\(\\theta\\). Since \\(h'(0) = g'(z_0)/(f'(z_0)) > 0\\), we get \\(e^{i\\theta} = 1\\), so \\(h = \\mathrm{id}\\) and \\(f = g\\). \\(\\square\\)</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">The Two Exceptional Domains</div>
    <div class="env-body">
        <p>By the uniformization theorem (a much deeper result), every simply connected Riemann surface is conformally equivalent to exactly one of: the Riemann sphere \\(\\hat{\\mathbb{C}}\\), the complex plane \\(\\mathbb{C}\\), or the unit disk \\(\\mathbb{D}\\). The Riemann Mapping Theorem handles the "disk" case for planar domains.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-extremal-function',
                    title: 'The Extremal Function: Maximizing |f\'(z₀)|',
                    description: 'The proof finds the Riemann map by maximizing |f\'(z₀)| over all injective maps from Ω into the disk. This visualization shows the extremal principle: among functions mapping a half-plane into the disk with f(i)=0, increasing |f\'(i)| makes the map "fill" the disk more tightly.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 660, height: 360, scale: 1 });
                        var derMag = 0.5;

                        VizEngine.createSlider(controls, "|f'(i)|", 0.1, 2.0, derMag, 0.05, function(v) {
                            derMag = v; draw();
                        });

                        function cadd(a,b){return[a[0]+b[0],a[1]+b[1]];}
                        function csub(a,b){return[a[0]-b[0],a[1]-b[1]];}
                        function cdiv(a,b){var d=b[0]*b[0]+b[1]*b[1];if(d<1e-12)return[0,0];return[(a[0]*b[0]+a[1]*b[1])/d,(a[1]*b[0]-a[0]*b[1])/d];}
                        function cmul(a,b){return[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];}
                        function cabs(z){return Math.sqrt(z[0]*z[0]+z[1]*z[1]);}

                        // Cayley + scaling: f_s(z) = s * (z-i)/(z+i), normalized so f_s(i)=0 and |f_s'(i)|=s/2
                        // The true Riemann map has |f'(i)| = 1/(2) for Cayley, extremal = 1/2
                        function fMap(z, s) {
                            // Cayley scaled by s
                            var w = cdiv(csub(z,[0,1]),cadd(z,[0,1]));
                            return cmul([s,0], w);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var midX = W/2, sc = 100;

                            // Left panel: upper half-plane
                            var lCX = W/4, lCY = H * 0.65;
                            // Right panel: disk
                            var rCX = 3*W/4, rCY = H/2;
                            var diskR = Math.min(W/4 - 20, H/2 - 30);

                            ctx.fillStyle = viz.colors.text; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Upper half-plane \u210D', lCX, 8);
                            ctx.fillText('Image in disk \u{1D53B}', rCX, 8);

                            // Divider
                            ctx.strokeStyle = '#2a2a50'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(midX, 20); ctx.lineTo(midX, H-20); ctx.stroke();

                            // Draw unit circle
                            ctx.strokeStyle = viz.colors.blue + '66'; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.arc(rCX, rCY, diskR, 0, Math.PI*2); ctx.stroke();

                            // Draw image of half-plane under f_s
                            var s = derMag;
                            // The image of the upper half-plane under s*(z-i)/(z+i) is the disk of radius s
                            var imgR = Math.min(s, 1.0) * diskR;
                            var isExtremal = Math.abs(s - 1.0) < 0.06;
                            ctx.fillStyle = isExtremal ? viz.colors.teal + '44' : viz.colors.orange + '33';
                            ctx.beginPath(); ctx.arc(rCX, rCY, imgR, 0, Math.PI*2); ctx.fill();
                            ctx.strokeStyle = isExtremal ? viz.colors.teal : viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(rCX, rCY, imgR, 0, Math.PI*2); ctx.stroke();

                            // Draw the base point image: f(i) = 0
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.arc(rCX, rCY, 6, 0, Math.PI*2); ctx.fill();

                            // Derivative arrow near origin
                            ctx.strokeStyle = viz.colors.yellow; ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(rCX, rCY);
                            ctx.lineTo(rCX + s * diskR * 0.35, rCY);
                            ctx.stroke();
                            // arrowhead
                            var ax = rCX + s * diskR * 0.35;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.moveTo(ax, rCY); ctx.lineTo(ax-7, rCY-4); ctx.lineTo(ax-7, rCY+4); ctx.closePath(); ctx.fill();

                            // Label
                            ctx.fillStyle = viz.colors.yellow; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
                            ctx.fillText("|f'(i)| = " + s.toFixed(2), rCX + s*diskR*0.35 + 4, rCY - 4);

                            // In left panel: draw half-plane schematic
                            // x-axis
                            ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(lCX - W/4 + 10, lCY); ctx.lineTo(lCX + W/4 - 20, lCY); ctx.stroke();
                            // shade upper half
                            ctx.fillStyle = (isExtremal ? viz.colors.teal : viz.colors.orange) + '22';
                            ctx.fillRect(lCX - W/4 + 10, 30, W/2 - 30, lCY - 30);

                            // Mark z0 = i
                            var z0x = lCX, z0y = lCY - 55;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.arc(z0x, z0y, 5, 0, Math.PI*2); ctx.fill();
                            ctx.fillStyle = viz.colors.yellow; ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            ctx.fillText('z\u2080 = i', z0x + 8, z0y);

                            // Status
                            var msg, col;
                            if (s < 0.99) {
                                msg = 'f maps into disk but misses some of it'; col = viz.colors.orange;
                            } else if (isExtremal) {
                                msg = 'Extremal! f fills the disk exactly = Riemann map'; col = viz.colors.teal;
                            } else {
                                msg = 'Image exceeds unit disk: not valid (|f| > 1)'; col = viz.colors.red;
                            }
                            ctx.fillStyle = col; ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText(msg, W/2, H - 6);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the entire plane \\(\\mathbb{C}\\) cannot be mapped conformally onto the unit disk.',
                    hint: 'If \\(f : \\mathbb{C} \\to \\mathbb{D}\\) were holomorphic and bijective, what would Liouville\'s theorem say?',
                    solution: 'Any such \\(f\\) would be an entire function bounded by 1 in modulus. By Liouville\'s theorem, \\(f\\) would be constant, contradicting bijectivity. Hence no conformal map \\(\\mathbb{C} \\to \\mathbb{D}\\) exists.'
                },
                {
                    question: 'The punctured disk \\(\\mathbb{D}^* = \\mathbb{D} \\setminus \\{0\\}\\) is not simply connected. Which aspect of the Riemann Mapping Theorem\'s proof would fail for \\(\\mathbb{D}^*\\)?',
                    hint: 'Think about whether every holomorphic function on \\(\\mathbb{D}^*\\) has a square root.',
                    solution: 'A key step in the proof uses simple connectivity to define \\(\\sqrt{f(z)}\\) as a single-valued branch. On \\(\\mathbb{D}^*\\), the function \\(z\\) has no holomorphic square root (winding number around 0 is 1, not even). Without a square root, the symmetrization trick fails and the extremal function need not exist in the right class.'
                }
            ]
        },

        // ================================================================
        // SECTION 3: Proof Sketch
        // ================================================================
        {
            id: 'sec-proof',
            title: 'Proof Sketch',
            content: `
<h2>Proof Sketch</h2>

<p>We sketch the modern proof via normal families and the extremal function. The argument has four clean steps.</p>

<h3>Step 1: The Family \\(\\mathcal{F}\\)</h3>

<p>Fix \\(z_0 \\in \\Omega\\). Let \\(\\mathcal{F}\\) be the collection of all injective (univalent) holomorphic functions \\(f : \\Omega \\to \\mathbb{D}\\) with \\(f(z_0) = 0\\). We first show \\(\\mathcal{F}\\) is nonempty.</p>

<p>Since \\(\\Omega \\neq \\mathbb{C}\\), there exists some \\(a \\notin \\Omega\\). Because \\(\\Omega\\) is simply connected, the function \\(z - a\\) has no zeros in \\(\\Omega\\), so we can define a holomorphic branch \\(g(z) = \\sqrt{z - a}\\) on \\(\\Omega\\). This \\(g\\) is injective (if \\(g(z_1) = g(z_2)\\) then \\(z_1 - a = z_2 - a\\)). The image \\(g(\\Omega)\\) and \\(-g(\\Omega)\\) are disjoint (if both \\(w_0, -w_0 \\in g(\\Omega)\\) we get a contradiction with injectivity). Hence \\(g(\\Omega)\\) avoids a disk of radius \\(\\epsilon > 0\\). A suitable Mobius transformation then maps \\(g(\\Omega)\\) into \\(\\mathbb{D}\\) injectively, landing \\(z_0\\) at \\(0\\). So \\(\\mathcal{F} \\neq \\emptyset\\).</p>

<h3>Step 2: The Extremal Problem</h3>

<p>Set</p>
\\[
M = \\sup_{f \\in \\mathcal{F}} |f'(z_0)|.
\\]

<p>Since every \\(f \\in \\mathcal{F}\\) maps into \\(\\mathbb{D}\\), the Cauchy formula gives \\(|f'(z_0)| \\leq 1/r\\) for any disk of radius \\(r\\) centered at \\(z_0\\) contained in \\(\\Omega\\). So \\(M < \\infty\\). We pick a sequence \\(f_n \\in \\mathcal{F}\\) with \\(|f_n'(z_0)| \\to M\\).</p>

<h3>Step 3: Normal Families and Convergence (Montel's Theorem)</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem (Montel)</div>
    <div class="env-body">
        <p>A family \\(\\mathcal{F}\\) of holomorphic functions on a domain \\(\\Omega\\), uniformly bounded on compact sets, is <strong>normal</strong>: every sequence in \\(\\mathcal{F}\\) has a subsequence converging uniformly on compact sets to a holomorphic function.</p>
    </div>
</div>

<p>Our sequence \\((f_n)\\) is uniformly bounded by 1 (since each \\(f_n : \\Omega \\to \\mathbb{D}\\)). By Montel's theorem, a subsequence converges uniformly on compact sets to some holomorphic \\(F : \\Omega \\to \\overline{\\mathbb{D}}\\) with \\(F(z_0) = 0\\) and \\(|F'(z_0)| = M > 0\\).</p>

<p>Since \\(|F'(z_0)| > 0\\), \\(F\\) is non-constant, so by the maximum modulus principle \\(F : \\Omega \\to \\mathbb{D}\\) (open disk, not closed). By Hurwitz's theorem (the uniform limit of injective maps on a domain is either injective or constant), \\(F\\) is injective. Thus \\(F \\in \\mathcal{F}\\).</p>

<h3>Step 4: The Extremal Function is Surjective</h3>

<p>We show \\(F\\) maps <em>onto</em> \\(\\mathbb{D}\\). Suppose not: some \\(w_0 \\in \\mathbb{D}\\) is not in the image. Consider</p>
\\[
G = \\phi_{w_0} \\circ F, \\quad \\text{where } \\phi_{w_0}(z) = \\frac{z - w_0}{1 - \\bar{w}_0 z}.
\\]
<p>Then \\(G : \\Omega \\to \\mathbb{D}\\) and \\(G(z_0) = \\phi_{w_0}(0) = -w_0 \\neq 0\\). To fix \\(G(z_0) = 0\\), define</p>
\\[
H = \\phi_{-w_0} \\circ G.
\\]
<p>Then \\(H \\in \\mathcal{F}\\). A computation using the square root trick (factor out the missing value, take a square root, compose with another automorphism) shows \\(|H'(z_0)| > |F'(z_0)| = M\\), contradicting the maximality of \\(M\\). Therefore \\(F\\) is surjective, completing the proof that \\(F : \\Omega \\xrightarrow{\\sim} \\mathbb{D}\\). \\(\\square\\)</p>

<div class="env-block remark">
    <div class="env-title">Why Simple Connectivity is Essential</div>
    <div class="env-body">
        <p>Simple connectivity is used twice: once to construct a holomorphic square root of \\(z - a\\) (Step 1), and implicitly in ensuring the extremal problem has a solution in the right class. For the annulus \\(1 < |z| < R\\), the analogous extremal problem yields not a map to the disk but reveals the conformal invariant (the modulus \\(\\log R\\)) that distinguishes different annuli.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Let \\(\\Omega\\) be a simply connected domain, \\(a \\notin \\Omega\\), and \\(g(z) = \\sqrt{z-a}\\) a holomorphic branch on \\(\\Omega\\). Explain why \\(g(\\Omega)\\) and \\(-g(\\Omega)\\) must be disjoint.',
                    hint: 'Suppose \\(w_0 \\in g(\\Omega) \\cap (-g(\\Omega))\\). What does that mean for the preimages?',
                    solution: 'If \\(w_0 \\in g(\\Omega) \\cap (-g(\\Omega))\\), then \\(g(z_1) = w_0\\) and \\(g(z_2) = -w_0\\) for some \\(z_1, z_2 \\in \\Omega\\). Then \\(z_1 - a = w_0^2 = z_2 - a\\), so \\(z_1 = z_2\\) but \\(g(z_1) = -g(z_1)\\), giving \\(w_0 = 0\\), i.e., \\(a \\in \\Omega\\), a contradiction.'
                },
                {
                    question: 'State Hurwitz\'s theorem and explain how it guarantees the limit function \\(F\\) in the proof is injective.',
                    hint: 'Hurwitz says a uniform limit of injective functions is either injective or constant.',
                    solution: 'Hurwitz\'s theorem: if \\(f_n \\to f\\) uniformly on compact sets, each \\(f_n\\) is injective on \\(\\Omega\\), and \\(f\\) is non-constant, then \\(f\\) is injective. In our proof, \\(|F\'(z_0)| = M > 0\\) implies \\(F\\) is non-constant. Since each \\(f_n\\) is injective, Hurwitz gives \\(F\\) injective.'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Explicit Riemann Maps
        // ================================================================
        {
            id: 'sec-examples',
            title: 'Explicit Riemann Maps',
            content: `
<h2>Explicit Riemann Maps</h2>

<p>The proof guarantees existence but is non-constructive. For many standard domains, explicit formulas are known. These are the building blocks for more complicated domains.</p>

<h3>Half-Plane to Disk</h3>

<p>The <strong>Cayley transform</strong> maps the upper half-plane \\(\\mathbb{H} = \\{\\mathrm{Im}(z) > 0\\}\\) to \\(\\mathbb{D}\\):</p>
\\[
f(z) = \\frac{z - i}{z + i}.
\\]
<p>This is a Mobius transformation sending \\(0 \\mapsto -1\\), \\(1 \\mapsto -i\\), \\(\\infty \\mapsto 1\\), and \\(i \\mapsto 0\\). The normalized version (with \\(f(i) = 0\\) and \\(f'(i) > 0\\)) is exactly this map.</p>

<h3>Infinite Strip to Disk</h3>

<p>The strip \\(S = \\{0 < \\mathrm{Im}(z) < \\pi\\}\\) is mapped to \\(\\mathbb{D}\\) by composing two steps:</p>
\\[
z \\xrightarrow{e^z} \\mathbb{H} \\xrightarrow{\\text{Cayley}} \\mathbb{D}.
\\]
<p>The exponential \\(w = e^z\\) maps \\(S\\) bijectively onto \\(\\mathbb{H}\\) (horizontal lines \\(\\mathrm{Im}(z) = c\\) map to rays from the origin; the boundaries \\(\\mathrm{Im}(z) = 0\\) and \\(\\mathrm{Im}(z) = \\pi\\) map to the positive and negative real axes). The full map is:</p>
\\[
f(z) = \\frac{e^z - i}{e^z + i}.
\\]

<h3>Sector to Disk</h3>

<p>The sector \\(W_\\alpha = \\{0 < \\arg(z) < \\alpha\\}\\) (angle \\(\\alpha \\in (0, 2\\pi)\\)) is mapped to \\(\\mathbb{D}\\) by:</p>
\\[
z \\xrightarrow{z^{\\pi/\\alpha}} \\mathbb{H} \\xrightarrow{\\text{Cayley}} \\mathbb{D}.
\\]
<p>The power map \\(z^{\\pi/\\alpha}\\) sends the sector of angle \\(\\alpha\\) to the upper half-plane (stretching the angular opening from \\(\\alpha\\) to \\(\\pi\\)).</p>

<h3>Polygon: The Schwarz-Christoffel Formula</h3>

<p>For polygonal domains, the Schwarz-Christoffel formula gives the Riemann map explicitly (up to integration). If \\(\\Omega\\) is a polygon with vertices \\(w_1, \\ldots, w_n\\) and interior angles \\(\\alpha_k \\pi\\), the map from \\(\\mathbb{H}\\) to \\(\\Omega\\) has the form</p>
\\[
f(z) = A \\int_0^z \\prod_{k=1}^n (\\zeta - x_k)^{\\alpha_k - 1} \\, d\\zeta + B,
\\]
<p>where \\(x_1 < \\cdots < x_n\\) are the real preimages of the vertices. The constraint \\(\\sum_k (1 - \\alpha_k) = 2\\) ensures the map closes up.</p>

<div class="env-block example">
    <div class="env-title">Example: Square</div>
    <div class="env-body">
        <p>For the unit square (four right angles, each \\(\\alpha_k = 1/2\\)), the Schwarz-Christoffel formula gives an elliptic integral. The Riemann map involves the Jacobi elliptic function \\(\\mathrm{sn}\\) — not elementary, but perfectly explicit.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-strip-to-disk',
                    title: 'Strip to Disk: Step-by-Step',
                    description: 'The infinite strip {0 < Im(z) < π} maps to the disk in two stages. Use the slider to animate: t=0 shows the strip grid, t=0.5 shows the intermediate half-plane after applying exp, t=1 shows the final disk image after the Cayley map.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 340, scale: 1 });
                        var t = 0;
                        var animating = false;
                        var animId = null;

                        var sliderEl = VizEngine.createSlider(controls, 't', 0, 1, 0, 0.01, function(v) {
                            t = v; if (!animating) draw();
                        });

                        var btnAnim = VizEngine.createButton(controls, 'Animate', function() {
                            animating = !animating;
                            btnAnim.textContent = animating ? 'Stop' : 'Animate';
                            if (animating) {
                                var start = performance.now();
                                function loop(now) {
                                    t = ((now - start) / 4000) % 1;
                                    sliderEl.value = t;
                                    draw();
                                    if (animating) animId = requestAnimationFrame(loop);
                                }
                                animId = requestAnimationFrame(loop);
                            } else {
                                if (animId) cancelAnimationFrame(animId);
                            }
                        });

                        function cexp(z){var er=Math.exp(z[0]);return[er*Math.cos(z[1]),er*Math.sin(z[1])];}
                        function cadd(a,b){return[a[0]+b[0],a[1]+b[1]];}
                        function csub(a,b){return[a[0]-b[0],a[1]-b[1]];}
                        function cdiv(a,b){var d=b[0]*b[0]+b[1]*b[1];if(d<1e-12)return[0,0];return[(a[0]*b[0]+a[1]*b[1])/d,(a[1]*b[0]-a[0]*b[1])/d];}
                        function cabs(z){return Math.sqrt(z[0]*z[0]+z[1]*z[1]);}

                        function cayley(z){return cdiv(csub(z,[0,1]),cadd(z,[0,1]));}

                        // Panel layout: three panels
                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var pW = W/3;

                            // Panel centers
                            var c0 = pW/2, c1 = pW + pW/2, c2 = 2*pW + pW/2;
                            var cY = H/2;

                            // Dividers
                            ctx.strokeStyle = '#2a2a50'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(pW, 15); ctx.lineTo(pW, H-15); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(2*pW, 15); ctx.lineTo(2*pW, H-15); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Strip S', c0, 4);
                            ctx.fillText('\u2192 exp(z) \u2192', c1, 4);
                            ctx.fillText('\u2192 Cayley \u2192 \u{1D53B}', c2, 4);

                            // Build grid in strip: vertical and horizontal lines
                            var gridLines = [];
                            // Horizontal lines at y = k*pi/6
                            for (var k = 1; k <= 5; k++) {
                                var line = {pts:[], color: viz.colors.teal + 'cc'};
                                for (var s = 0; s <= 60; s++) {
                                    line.pts.push([-3 + s*0.1, k * Math.PI / 6]);
                                }
                                gridLines.push(line);
                            }
                            // Vertical lines
                            for (var x = -2.5; x <= 2.5; x += 0.5) {
                                var line2 = {pts:[], color: viz.colors.orange + 'cc'};
                                for (var s2 = 1; s2 <= 29; s2++) {
                                    line2.pts.push([x, s2 * Math.PI / 30]);
                                }
                                gridLines.push(line2);
                            }

                            function interp3(raw, mid, final, tt) {
                                // tt in [0,1]: 0=strip, 0.5=halfplane, 1=disk
                                var sc0 = 35, sc1 = 45, sc2 = 60;
                                var rawS = [c0 + raw[0]*sc0*0.8, cY - (raw[1] - Math.PI/2)*sc0*1.5];
                                var midS = [c1 + (mid[0]-0.2)*sc1, cY - mid[1]*sc1];
                                var finS = [c2 + final[0]*sc2, cY - final[1]*sc2];

                                var stage, alpha;
                                if (tt < 0.5) {
                                    stage = 0; alpha = tt * 2;
                                    return [rawS[0]*(1-alpha)+midS[0]*alpha, rawS[1]*(1-alpha)+midS[1]*alpha];
                                } else {
                                    stage = 1; alpha = (tt - 0.5) * 2;
                                    return [midS[0]*(1-alpha)+finS[0]*alpha, midS[1]*(1-alpha)+finS[1]*alpha];
                                }
                            }

                            gridLines.forEach(function(line) {
                                ctx.strokeStyle = line.color; ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                line.pts.forEach(function(raw) {
                                    var mid = cexp(raw);
                                    var fin = cayley(mid);
                                    if (cabs(fin) > 0.98) { started = false; return; }
                                    if (!isFinite(mid[0]) || !isFinite(mid[1])) { started = false; return; }
                                    var scr = interp3(raw, mid, fin, t);
                                    if (!started) { ctx.moveTo(scr[0], scr[1]); started = true; }
                                    else { ctx.lineTo(scr[0], scr[1]); }
                                });
                                ctx.stroke();
                            });

                            // Draw disk outline on right panel
                            ctx.strokeStyle = viz.colors.blue + '55'; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.arc(c2, cY, 60, 0, Math.PI*2); ctx.stroke();

                            // Draw real axis on middle panel
                            ctx.strokeStyle = viz.colors.axis + '66'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(pW+5, cY); ctx.lineTo(2*pW-5, cY); ctx.stroke();

                            // Formula display
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            if (t < 0.5) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('applying e\u1D4C', W/2, H - 4);
                            } else {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('applying Cayley: (w\u2212i)/(w+i)', W/2, H - 4);
                            }
                        }

                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-sector-to-disk',
                    title: 'Sector to Disk: Power Map + Cayley',
                    description: 'A sector of angle α maps to the disk via z^(π/α) followed by the Cayley transform. Adjust α to change the sector angle and watch the grid deformation animate.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 660, height: 360, scale: 1 });
                        var alpha = Math.PI / 2;
                        var t = 0;
                        var animating = false;
                        var animId = null;

                        VizEngine.createSlider(controls, '\u03b1 (sector angle)', 0.3, 5.8, Math.PI/2, 0.05, function(v) {
                            alpha = v; if (!animating) draw(0);
                        });

                        var btnAnim = VizEngine.createButton(controls, 'Animate', function() {
                            animating = !animating;
                            btnAnim.textContent = animating ? 'Stop' : 'Animate';
                            if (animating) {
                                var start = performance.now();
                                function loop(now) {
                                    t = ((now - start) / 3500) % 1;
                                    draw(t);
                                    if (animating) animId = requestAnimationFrame(loop);
                                }
                                animId = requestAnimationFrame(loop);
                            } else {
                                if (animId) cancelAnimationFrame(animId);
                                draw(t);
                            }
                        });

                        function cadd(a,b){return[a[0]+b[0],a[1]+b[1]];}
                        function csub(a,b){return[a[0]-b[0],a[1]-b[1]];}
                        function cdiv(a,b){var d=b[0]*b[0]+b[1]*b[1];if(d<1e-12)return[0,0];return[(a[0]*b[0]+a[1]*b[1])/d,(a[1]*b[0]-a[0]*b[1])/d];}
                        function cabs(z){return Math.sqrt(z[0]*z[0]+z[1]*z[1]);}
                        function cpow(z, p){
                            var r=cabs(z); if(r<1e-9)return[0,0];
                            var arg=Math.atan2(z[1],z[0]);
                            return[Math.pow(r,p)*Math.cos(p*arg), Math.pow(r,p)*Math.sin(p*arg)];
                        }
                        function cayley(z){return cdiv(csub(z,[0,1]),cadd(z,[0,1]));}

                        function draw(tt) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var midX = W/2;
                            var lCX = W/4, rCX = 3*W/4, cY = H/2;
                            var sc = 80, diskR = 100;

                            ctx.strokeStyle = '#2a2a50'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(midX,15); ctx.lineTo(midX,H-15); ctx.stroke();

                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Sector (angle \u03b1 = ' + alpha.toFixed(2) + ')', lCX, 4);
                            ctx.fillText('Unit disk \u{1D53B}', rCX, 4);

                            ctx.strokeStyle = viz.colors.blue + '44'; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.arc(rCX, cY, diskR, 0, Math.PI*2); ctx.stroke();

                            var gridLines = [];
                            // Rays
                            for (var thI = 1; thI <= 8; thI++) {
                                var th0 = thI * alpha / 9;
                                var ray = {pts:[], color: viz.colors.orange + 'bb'};
                                for (var ri = 1; ri <= 25; ri++) {
                                    ray.pts.push([ri * 0.1 * Math.cos(th0), ri * 0.1 * Math.sin(th0)]);
                                }
                                gridLines.push(ray);
                            }
                            // Arcs
                            for (var ri2 = 3; ri2 <= 18; ri2 += 3) {
                                var arc = {pts:[], color: viz.colors.teal + 'bb'};
                                for (var thi = 0; thi <= 30; thi++) {
                                    var th3 = thi * alpha / 30;
                                    arc.pts.push([ri2 * 0.1 * Math.cos(th3), ri2 * 0.1 * Math.sin(th3)]);
                                }
                                gridLines.push(arc);
                            }

                            var exponent = Math.PI / alpha;
                            gridLines.forEach(function(line) {
                                ctx.strokeStyle = line.color; ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                line.pts.forEach(function(raw) {
                                    var mapped = cayley(cpow(raw, exponent));
                                    if (!isFinite(mapped[0]) || !isFinite(mapped[1])) { started = false; return; }
                                    if (cabs(mapped) > 0.99) { started = false; return; }
                                    var lx = lCX + raw[0]*sc, ly = cY - raw[1]*sc;
                                    var rx = rCX + mapped[0]*diskR, ry = cY - mapped[1]*diskR;
                                    var sx = lx*(1-tt) + rx*tt, sy = ly*(1-tt) + ry*tt;
                                    if (!started) { ctx.moveTo(sx,sy); started=true; }
                                    else { ctx.lineTo(sx,sy); }
                                });
                                ctx.stroke();
                            });

                            // Draw sector boundary
                            if (tt < 0.7) {
                                ctx.globalAlpha = 1 - tt/0.7;
                                ctx.strokeStyle = viz.colors.white + '55'; ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(lCX, cY);
                                ctx.lineTo(lCX + 2*sc, cY);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(lCX, cY);
                                ctx.lineTo(lCX + 2*sc*Math.cos(alpha), cY - 2*sc*Math.sin(alpha));
                                ctx.stroke();
                                // arc
                                ctx.beginPath();
                                ctx.arc(lCX, cY, 1.8*sc, -alpha, 0);
                                ctx.stroke();
                                ctx.globalAlpha = 1;
                            }

                            // Formula
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText('f(z) = Cayley(z^(\u03c0/\u03b1)),  \u03c0/\u03b1 = ' + exponent.toFixed(2), W/2, H - 4);
                        }

                        draw(0);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find a conformal map from the right half-plane \\(\\{\\mathrm{Re}(z) > 0\\}\\) to the unit disk, normalized so that \\(1 \\mapsto 0\\).',
                    hint: 'First rotate the half-plane by \\(i\\) to get the upper half-plane, then apply the Cayley transform.',
                    solution: 'Multiply by \\(i\\) to rotate: \\(iz\\) maps the right half-plane to the upper half-plane (since \\(\\mathrm{Re}(z) > 0 \\Leftrightarrow \\mathrm{Im}(iz) > 0\\)). Then apply Cayley: \\(f(z) = \\frac{iz - i}{iz + i} = \\frac{z - 1}{z + 1}\\). Check: \\(f(1) = 0\\), \\(f\'(1) = 2/(1+1)^2 = 1/2 > 0\\). This is the Riemann map normalized at \\(z_0 = 1\\).'
                },
                {
                    question: 'The map \\(f(z) = z^2\\) takes the first quadrant \\(Q = \\{\\mathrm{Re}(z) > 0, \\mathrm{Im}(z) > 0\\}\\) to the upper half-plane. Compose with the Cayley transform to get a conformal map from \\(Q\\) to \\(\\mathbb{D}\\). Where does \\(1 + i\\) go?',
                    hint: 'First compute \\((1+i)^2\\), then apply \\(\\frac{w-i}{w+i}\\).',
                    solution: '\\((1+i)^2 = 2i \\in \\mathbb{H}\\). Then \\(f(2i) = \\frac{2i - i}{2i + i} = \\frac{i}{3i} = \\frac{1}{3}\\). So \\(1 + i\\) maps to \\(1/3 \\in (0,1) \\subset \\mathbb{D}\\).'
                },
                {
                    question: 'For the Schwarz-Christoffel formula, what sum condition do the angles \\(\\alpha_k\\) satisfy, and why?',
                    hint: 'The total exterior turning of a closed polygon must equal \\(2\\pi\\).',
                    solution: 'The exterior angle at each vertex is \\((1 - \\alpha_k)\\pi\\). For a simple closed polygon, the total exterior turning is \\(2\\pi\\), so \\(\\sum_k (1 - \\alpha_k)\\pi = 2\\pi\\), giving \\(\\sum_k (1 - \\alpha_k) = 2\\). This appears in the Schwarz-Christoffel exponents summing correctly.'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Boundary Behavior
        // ================================================================
        {
            id: 'sec-boundary',
            title: 'Boundary Behavior',
            content: `
<h2>Boundary Behavior</h2>

<p>The Riemann Mapping Theorem gives a conformal map \\(f : \\Omega \\to \\mathbb{D}\\) on the interior. A natural question: does \\(f\\) extend continuously to the boundary \\(\\partial \\Omega\\)?</p>

<h3>Caratheodory's Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem (Caratheodory, 1913)</div>
    <div class="env-body">
        <p>Let \\(\\Omega\\) be a simply connected domain bounded by a Jordan curve (a continuous, injective image of the circle). Then the Riemann map \\(f : \\Omega \\to \\mathbb{D}\\) extends to a homeomorphism \\(\\bar{f} : \\overline{\\Omega} \\to \\overline{\\mathbb{D}}\\). In particular, the boundary \\(\\partial\\Omega\\) maps homeomorphically onto the unit circle \\(\\mathbb{T}\\).</p>
    </div>
</div>

<p>The theorem requires only a Jordan curve boundary, which can be quite wild (like the Koch snowflake). No smoothness is assumed.</p>

<h3>Smooth and Analytic Boundaries</h3>

<p>With more regularity on \\(\\partial \\Omega\\), we get more regularity of the extension.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem (Kellogg–Warschawski)</div>
    <div class="env-body">
        <p>If \\(\\partial \\Omega\\) is a \\(C^n\\) curve (\\(n \\geq 1\\)), then the Riemann map \\(f\\) extends to a \\(C^n\\) diffeomorphism on \\(\\overline{\\Omega}\\). If \\(\\partial\\Omega\\) is real-analytic, then \\(f\\) extends to a biholomorphism across \\(\\partial \\Omega\\).</p>
    </div>
</div>

<p>In the real-analytic case, \\(f\\) can be continued to a neighborhood of \\(\\overline{\\Omega}\\) by the Schwarz reflection principle. This is what makes conformal mapping such a powerful tool in boundary value problems.</p>

<h3>What Can Go Wrong: Cornered Domains</h3>

<p>When \\(\\partial \\Omega\\) has corners, the map still extends continuously but the derivative behaves badly at the corner preimage. At a corner of angle \\(\\alpha\\pi\\), the derivative of the Riemann map behaves like \\(|f'(z)| \\sim C|z - z_*|^{1/\\alpha - 1}\\). For \\(\\alpha < 1\\) (a convex corner), \\(f'\\) blows up; for \\(\\alpha > 1\\) (a reentrant corner), \\(f' \\to 0\\). This is exactly what the Schwarz-Christoffel formula encodes.</p>

<div class="env-block example">
    <div class="env-title">Example: Square</div>
    <div class="env-body">
        <p>At each corner of the square (interior angle \\(\\pi/2\\), so \\(\\alpha = 1/2\\)), the Riemann map has \\(|f'| \\sim C|z - z_*|^{1/2 - 1} = C|z - z_*|^{-1/2} \\to \\infty\\). The map "opens up" the corners, compressing angles by a factor of 2.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-boundary-correspondence',
                    title: 'Boundary Correspondence',
                    description: 'A point traces the boundary of a domain; its image traces the unit circle. Click "Trace" to animate the boundary correspondence. Use the domain selector to switch shapes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 660, height: 360, scale: 1 });
                        var domainType = 0;
                        var tracing = false;
                        var traceT = 0;
                        var animId = null;
                        var trail = [];

                        var sel = document.createElement('select');
                        sel.style.cssText = 'padding:4px 8px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;margin-right:8px;';
                        ['Half-disk', 'Triangle', 'Rectangle'].forEach(function(d, i) {
                            var opt = document.createElement('option'); opt.value = i; opt.textContent = d; sel.appendChild(opt);
                        });
                        sel.addEventListener('change', function() { domainType = parseInt(sel.value); trail=[]; traceT=0; draw(); });
                        controls.appendChild(sel);

                        var btnTrace = VizEngine.createButton(controls, 'Trace', function() {
                            tracing = !tracing;
                            btnTrace.textContent = tracing ? 'Stop' : 'Trace';
                            trail = []; traceT = 0;
                            if (tracing) {
                                var start = performance.now();
                                function loop(now) {
                                    traceT = ((now - start) / 5000) % 1;
                                    draw();
                                    if (tracing) animId = requestAnimationFrame(loop);
                                }
                                animId = requestAnimationFrame(loop);
                            } else {
                                if (animId) cancelAnimationFrame(animId);
                            }
                        });

                        function cadd(a,b){return[a[0]+b[0],a[1]+b[1]];}
                        function csub(a,b){return[a[0]-b[0],a[1]-b[1]];}
                        function cdiv(a,b){var d=b[0]*b[0]+b[1]*b[1];if(d<1e-12)return[0,0];return[(a[0]*b[0]+a[1]*b[1])/d,(a[1]*b[0]-a[0]*b[1])/d];}
                        function cmul(a,b){return[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];}
                        function cexp(z){var er=Math.exp(z[0]);return[er*Math.cos(z[1]),er*Math.sin(z[1])];}
                        function cabs(z){return Math.sqrt(z[0]*z[0]+z[1]*z[1]);}
                        function cayley(z){return cdiv(csub(z,[0,1]),cadd(z,[0,1]));}
                        function cpow(z,p){var r=cabs(z);if(r<1e-9)return[0,0];var arg=Math.atan2(z[1],z[0]);return[Math.pow(r,p)*Math.cos(p*arg),Math.pow(r,p)*Math.sin(p*arg)];}

                        // Boundary parameterizations
                        function getBoundaryPoint(type, t) {
                            if (type === 0) {
                                // Half-disk: semicircle [0,pi] then diameter [-1,1]
                                if (t < 0.5) {
                                    var ang = t * 2 * Math.PI;
                                    return [Math.cos(ang), Math.sin(ang)];
                                } else {
                                    var s = 1 - (t - 0.5) * 4;
                                    return [s, 0];
                                }
                            } else if (type === 1) {
                                // Triangle: vertices at 0, 1, i
                                if (t < 1/3) { var s2=t*3; return [1-s2, s2]; }
                                else if (t < 2/3) { var s3=(t-1/3)*3; return [s3*0, 1-s3]; }
                                else { var s4=(t-2/3)*3; return [s4, 0]; }
                            } else {
                                // Rectangle: -1.5 to 1.5 x 0 to 1
                                var perim = 2*(3+1), pos = t * perim;
                                if (pos < 3) return [-1.5 + pos, 0];
                                else if (pos < 4) return [1.5, pos-3];
                                else if (pos < 7) return [1.5-(pos-4), 1];
                                else return [-1.5, 1-(pos-7)];
                            }
                        }

                        // Approximate conformal map for each domain
                        function getImagePoint(type, z) {
                            if (type === 0) {
                                // Half-disk to disk: z -> z^2 maps half-disk to disk
                                return cpow(z, 2);
                            } else if (type === 1) {
                                // Triangle [0,1,i]: approximate via composition
                                // Affine to move to a half-plane, then Cayley
                                var w = cmul(z, [2,-2]); // stretch
                                w = cadd(w, [-1,0]);      // shift
                                return cayley(cadd(w, [0,0.5]));
                            } else {
                                // Rectangle: use exp-like approximation
                                var w2 = cmul(z, [Math.PI/3, 0]);
                                return cayley(cexp(w2));
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var lCX = W/4, rCX = 3*W/4, cY = H/2 + 10;
                            var sc = 85, diskR = 110;

                            ctx.strokeStyle = '#2a2a50'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(W/2, 15); ctx.lineTo(W/2, H-10); ctx.stroke();

                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText(['Half-disk','Triangle','Rectangle'][domainType], lCX, 4);
                            ctx.fillText('Unit circle \u{1D53B}', rCX, 4);

                            // Draw unit circle
                            ctx.strokeStyle = viz.colors.blue + '55'; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.arc(rCX, cY, diskR, 0, Math.PI*2); ctx.stroke();

                            // Draw domain boundary
                            ctx.strokeStyle = viz.colors.blue + '88'; ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var k = 0; k <= 100; k++) {
                                var bpt = getBoundaryPoint(domainType, k/100);
                                var sx = lCX + bpt[0]*sc, sy = cY - bpt[1]*sc;
                                k === 0 ? ctx.moveTo(sx,sy) : ctx.lineTo(sx,sy);
                            }
                            ctx.closePath(); ctx.stroke();

                            // Trail
                            if (trail.length > 1) {
                                ctx.strokeStyle = viz.colors.teal + '88'; ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                trail.forEach(function(pt, i) {
                                    var sx = lCX + pt[0]*sc, sy = cY - pt[1]*sc;
                                    i===0 ? ctx.moveTo(sx,sy) : ctx.lineTo(sx,sy);
                                });
                                ctx.stroke();

                                ctx.strokeStyle = viz.colors.orange + '88'; ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                trail.forEach(function(pt, i) {
                                    var img = getImagePoint(domainType, pt);
                                    var rx = rCX + img[0]*diskR, ry = cY - img[1]*diskR;
                                    i===0 ? ctx.moveTo(rx,ry) : ctx.lineTo(rx,ry);
                                });
                                ctx.stroke();
                            }

                            // Current point
                            var bpt = getBoundaryPoint(domainType, traceT);
                            trail.push([bpt[0], bpt[1]]);
                            if (trail.length > 300) trail.shift();

                            var lx = lCX + bpt[0]*sc, ly = cY - bpt[1]*sc;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.arc(lx, ly, 6, 0, Math.PI*2); ctx.fill();

                            var img = getImagePoint(domainType, bpt);
                            var rx = rCX + img[0]*diskR, ry = cY - img[1]*diskR;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath(); ctx.arc(rx, ry, 6, 0, Math.PI*2); ctx.fill();

                            // Connecting dashed line
                            ctx.strokeStyle = viz.colors.yellow + '44'; ctx.lineWidth = 1;
                            ctx.setLineDash([4,4]);
                            ctx.beginPath(); ctx.moveTo(lx,ly); ctx.lineTo(rx,ry); ctx.stroke();
                            ctx.setLineDash([]);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Does the Riemann map from the open upper half-plane \\(\\mathbb{H}\\) to \\(\\mathbb{D}\\) (the Cayley transform) extend continuously to the real line? If so, where does \\(\\infty\\) go?',
                    hint: 'The Cayley transform is a Mobius transformation, which extends to the Riemann sphere. Check the boundary behavior as \\(x \\in \\mathbb{R}\\).',
                    solution: 'Yes. For \\(x \\in \\mathbb{R}\\), \\(f(x) = (x-i)/(x+i)\\) has \\(|f(x)| = 1\\), so the real axis maps to the unit circle. As \\(x \\to \\infty\\), \\(f(x) \\to 1\\). The extended Cayley map is a homeomorphism \\(\\hat{\\mathbb{R}} \\to \\mathbb{T}\\), where \\(\\hat{\\mathbb{R}} = \\mathbb{R} \\cup \\{\\infty\\}\\).'
                },
                {
                    question: 'State what Caratheodory\'s theorem guarantees for the Riemann map of a square domain. Does it guarantee the extension is smooth at the corners?',
                    hint: 'Caratheodory requires only Jordan curve boundary. Smoothness requires a smoother boundary.',
                    solution: 'Caratheodory guarantees the Riemann map of the square extends to a homeomorphism on the closed square. However, it does not guarantee smoothness at corners. At each corner (interior angle \\(\\pi/2\\)), the derivative \\(f\'\\) blows up like \\(|z - z_*|^{-1/2}\\). The extension is continuous but not differentiable at the four corner preimages.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge — Non-Simply Connected Domains
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Bridge: Non-Simply Connected Domains',
            content: `
<h2>Bridge: Non-Simply Connected Domains</h2>

<p>The Riemann Mapping Theorem is sharp: it fails for domains with holes. The obstruction is a quantitative conformal invariant.</p>

<h3>The Annulus: An Obstruction</h3>

<p>An <strong>annulus</strong> is a domain of the form \\(A(r,R) = \\{r < |z| < R\\}\\) for \\(0 \\leq r < R \\leq \\infty\\). It is not simply connected: the curve \\(|z| = \\sqrt{rR}\\) is not contractible.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem (Conformal Classification of Annuli)</div>
    <div class="env-body">
        <p>Two annuli \\(A(r_1, R_1)\\) and \\(A(r_2, R_2)\\) are conformally equivalent if and only if they have the same <strong>modulus</strong>:</p>
        \\[
        \\mathrm{mod}(A) = \\frac{1}{2\\pi} \\log\\frac{R}{r}.
        \\]
        <p>In particular, no annulus is conformally equivalent to the disk (which has modulus \\(+\\infty\\)).</p>
    </div>
</div>

<h3>Why the Disk Argument Fails</h3>

<p>The proof of the Riemann Mapping Theorem uses simple connectivity at two critical points:</p>
<ol>
    <li><strong>Square root construction</strong>: On the annulus \\(\\mathbb{D}^* = \\mathbb{D} \\setminus \\{0\\}\\), the function \\(z\\) has no holomorphic square root. The winding number of \\(z\\) around 0 is 1, not even, so \\(\\sqrt{z}\\) cannot be defined globally. The proof would break at Step 1.</li>
    <li><strong>Extremal problem</strong>: Even if we consider all injective maps \\(A \\to \\mathbb{D}\\), the supremum of \\(|f'(z_0)|\\) over such maps might not be attained by a surjective map, because the image must miss the inner disk.</li>
</ol>

<h3>Higher Connectivity: Koebe's Uniformization</h3>

<p>The general uniformization result for multiply connected domains is more complex:</p>
<ul>
    <li>A domain with \\(n\\) holes (connectivity \\(n+1\\)) can be mapped conformally to a disk with \\(n\\) circular arcs removed (a "circular slit domain"), or to an annulus with \\(n-1\\) concentric circular arcs.</li>
    <li>The conformal equivalence class of a domain of connectivity \\(n+1\\) is characterized by \\(3n - 3\\) real parameters (for \\(n \\geq 2\\)) — the <em>moduli</em> of the domain.</li>
</ul>

<p>This moduli problem is the entry point to Teichmuller theory, which studies the space of all conformal structures on a surface of given topology.</p>

<h3>Looking Ahead</h3>

<p>The Riemann Mapping Theorem is foundational for:</p>
<ul>
    <li><strong>Chapter 16</strong>: The Schwarz-Christoffel formula in detail — explicit maps for polygons.</li>
    <li><strong>Chapter 17</strong>: The Dirichlet problem via conformal mapping — solving \\(\\Delta u = 0\\) on arbitrary simply connected domains.</li>
    <li><strong>Chapter 18</strong>: Schlicht functions and the Bieberbach conjecture (de Branges' theorem).</li>
</ul>
`,
            visualizations: [
                {
                    id: 'viz-non-simply-connected',
                    title: 'Annulus Cannot Map to Disk: The Modulus Obstruction',
                    description: 'Two annuli with different moduli log(R/r)/2π are not conformally equivalent. An annulus also cannot map to the disk (infinite modulus). This visualization shows how the modulus — the conformal invariant — measures the "width" of the annulus and prevents disk uniformization.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 680, height: 380, scale: 1 });
                        var rInner = 0.4;
                        var rOuter = 1.0;

                        VizEngine.createSlider(controls, 'r (inner radius)', 0.05, 0.9, 0.4, 0.01, function(v) {
                            rInner = v; if (rInner >= rOuter - 0.05) rInner = rOuter - 0.05; draw();
                        });
                        VizEngine.createSlider(controls, 'R (outer radius)', 0.5, 2.0, 1.0, 0.05, function(v) {
                            rOuter = v; if (rInner >= rOuter - 0.05) rInner = rOuter - 0.05; draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var W = viz.width, H = viz.height;
                            var lCX = W/3, rCX = 2*W/3 + 20, cY = H/2 + 10;
                            var sc = 80, diskR = 100;

                            ctx.strokeStyle = '#2a2a50'; ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(W/2+10, 20); ctx.lineTo(W/2+10, H-10); ctx.stroke();

                            // Left: annulus
                            ctx.fillStyle = viz.colors.text; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('Annulus A(r, R)', lCX, 4);
                            ctx.fillText('Unit disk \u{1D53B}', rCX, 4);

                            var innerR = rInner * sc, outerR = rOuter * sc;
                            // Fill annulus
                            ctx.fillStyle = viz.colors.teal + '22';
                            ctx.beginPath(); ctx.arc(lCX, cY, outerR, 0, Math.PI*2); ctx.fill();
                            ctx.fillStyle = viz.colors.bg;
                            ctx.beginPath(); ctx.arc(lCX, cY, innerR, 0, Math.PI*2); ctx.fill();

                            // Outer circle
                            ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(lCX, cY, outerR, 0, Math.PI*2); ctx.stroke();
                            // Inner circle
                            ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(lCX, cY, innerR, 0, Math.PI*2); ctx.stroke();

                            // Labels on annulus
                            ctx.fillStyle = viz.colors.teal; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
                            ctx.fillText('R = ' + rOuter.toFixed(2), lCX + outerR + 4, cY - 8);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('r = ' + rInner.toFixed(2), lCX + innerR + 4, cY + 8);

                            // Modulus
                            var mod = Math.log(rOuter / rInner) / (2 * Math.PI);
                            ctx.fillStyle = viz.colors.yellow; ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText('mod(A) = log(R/r)/2\u03c0 = ' + mod.toFixed(3), lCX, H - 8);

                            // Right: unit disk with inner "ghost" circle (obstruction)
                            ctx.strokeStyle = viz.colors.blue + '55'; ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.arc(rCX, cY, diskR, 0, Math.PI*2); ctx.stroke();

                            // Show that annulus maps to an annulus in disk (not all of disk)
                            var mappedInner = (rInner / rOuter) * diskR;
                            // Fill the "missing" inner part
                            ctx.fillStyle = viz.colors.bg;
                            ctx.beginPath(); ctx.arc(rCX, cY, mappedInner, 0, Math.PI*2); ctx.fill();
                            ctx.fillStyle = viz.colors.teal + '22';
                            ctx.beginPath();
                            ctx.arc(rCX, cY, diskR, 0, Math.PI*2);
                            ctx.arc(rCX, cY, mappedInner, Math.PI*2, 0, true);
                            ctx.fill();

                            ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2;
                            ctx.setLineDash([5,4]);
                            ctx.beginPath(); ctx.arc(rCX, cY, mappedInner, 0, Math.PI*2); ctx.stroke();
                            ctx.setLineDash([]);

                            // X mark
                            ctx.fillStyle = viz.colors.red; ctx.font = 'bold 22px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                            ctx.fillText('\u2717', rCX, cY);

                            ctx.fillStyle = viz.colors.red; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Cannot fill this hole \u2014 topological obstruction', rCX, H - 8);

                            // Modulus comparison note
                            ctx.fillStyle = viz.colors.text; ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('disk mod = \u221e \u2260 ' + mod.toFixed(3) + ' \u21d2 not conformally equivalent', rCX, 25);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Are the annuli \\(A(1, 3)\\) and \\(A(2, 18)\\) conformally equivalent?',
                    hint: 'Compute the modulus \\(\\log(R/r) / (2\\pi)\\) for each.',
                    solution: '\\(\\mathrm{mod}(A(1,3)) = \\log(3)/(2\\pi)\\). \\(\\mathrm{mod}(A(2,18)) = \\log(9)/(2\\pi) = 2\\log(3)/(2\\pi)\\). Since \\(\\log 3 \\neq 2\\log 3\\), the moduli differ and the annuli are not conformally equivalent.'
                },
                {
                    question: 'The punctured disk \\(\\mathbb{D}^*\\) can be thought of as an annulus \\(A(0,1)\\). What is its modulus? What does this tell you?',
                    hint: 'Let the inner radius approach 0.',
                    solution: 'The modulus is \\(\\lim_{r \\to 0} \\log(1/r)/(2\\pi) = +\\infty\\). A modulus of \\(\\infty\\) corresponds to an extreme case. In fact, \\(\\mathbb{D}^*\\) is not conformally equivalent to any genuine annulus \\(A(r,R)\\) with \\(r > 0\\). Its universal cover is the disk, and the covering map is \\(e^z\\) from the left half-plane. The punctured disk is conformally distinct from both \\(\\mathbb{D}\\) and from annuli with finite modulus.'
                },
                {
                    question: 'Give an example of two simply connected domains (other than \\(\\mathbb{C}\\)) that are NOT equal as sets but ARE conformally equivalent. Give an example of two connected domains that are homeomorphic but not conformally equivalent.',
                    hint: 'For the first, any two proper simply connected subdomains of \\(\\mathbb{C}\\) work. For the second, think about annuli.',
                    solution: 'Conformally equivalent: the upper half-plane \\(\\mathbb{H}\\) and the unit disk \\(\\mathbb{D}\\) (via the Cayley transform). They are different sets but biholomorphic. Not conformally equivalent despite homeomorphism: \\(A(1,2)\\) and \\(A(1,4)\\). Both are topological annuli (homeomorphic), but \\(\\mathrm{mod}(A(1,2)) = \\log 2/(2\\pi)\\) while \\(\\mathrm{mod}(A(1,4)) = \\log 4/(2\\pi) = 2\\log 2/(2\\pi)\\). Different moduli, so no conformal equivalence.'
                }
            ]
        }

    ]   // end sections
});
