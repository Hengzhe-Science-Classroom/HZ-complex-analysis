window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch11',
    number: 11,
    title: 'The Residue Theorem',
    subtitle: 'The crown jewel of complex integration',
    sections: [
        // ================================================================
        // SECTION 1: Motivation
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'Motivation',
            content: `
<h2>Motivation: Why Residues?</h2>

<div class="env-block intuition">
    <div class="env-title">A Surprising Calculation</div>
    <div class="env-body">
        <p>Consider the real integral \\(\\displaystyle\\int_{-\\infty}^{\\infty} \\frac{1}{1+x^2}\\,dx\\). You can compute this by trigonometric substitution and get \\(\\pi\\). But there is a faster route: view the integrand as the restriction of \\(f(z) = 1/(1+z^2)\\) to the real line, close the contour in the upper half-plane, and extract a single complex number called the <em>residue</em> at \\(z = i\\). That one number gives the entire integral.</p>
        <p>The Residue Theorem turns every contour integral of a meromorphic function into pure algebra: identify the singularities inside the contour, compute a residue at each one, add them up, and multiply by \\(2\\pi i\\).</p>
    </div>
</div>

<p>The journey from Cauchy's Theorem to the Residue Theorem is conceptually short but technically powerful. Recall:</p>
<ul>
    <li><strong>Cauchy's Theorem</strong>: if \\(f\\) is analytic on and inside a simple closed contour \\(\\gamma\\), then \\(\\oint_\\gamma f(z)\\,dz = 0\\).</li>
    <li><strong>Cauchy's Integral Formula</strong>: if \\(f\\) is analytic and \\(z_0\\) is inside \\(\\gamma\\), then \\(\\oint_\\gamma \\frac{f(z)}{z - z_0}\\,dz = 2\\pi i\\, f(z_0)\\).</li>
</ul>
<p>What happens when \\(f\\) itself has isolated singularities inside \\(\\gamma\\)? The integral is no longer zero, but it is not arbitrary either. It is exactly \\(2\\pi i\\) times the sum of the <em>residues</em>.</p>

<h3>The Laurent Series Connection</h3>

<p>Near an isolated singularity \\(z_0\\), every meromorphic function has a Laurent expansion:</p>
\\[
f(z) = \\sum_{n=-\\infty}^{\\infty} a_n (z-z_0)^n = \\cdots + \\frac{a_{-2}}{(z-z_0)^2} + \\frac{a_{-1}}{z-z_0} + a_0 + a_1(z-z_0) + \\cdots
\\]
<p>Integrate term by term around a small circle centered at \\(z_0\\). Every term \\((z-z_0)^n\\) with \\(n \\neq -1\\) integrates to zero (it has an antiderivative). The sole survivor is the \\(n = -1\\) term:</p>
\\[
\\oint_{|z-z_0|=r} (z-z_0)^{-1}\\,dz = 2\\pi i.
\\]
<p>Therefore \\(\\oint f(z)\\,dz = 2\\pi i \\cdot a_{-1}\\). The coefficient \\(a_{-1}\\) is the residue, and it completely controls the integral around that singularity.</p>

<div class="env-block remark">
    <div class="env-title">Why Only \\(n = -1\\) Survives</div>
    <div class="env-body">
        <p>For \\(n \\neq -1\\), the function \\((z-z_0)^n\\) has the antiderivative \\((z-z_0)^{n+1}/(n+1)\\), which is single-valued. Integrating around a closed loop returns to the start, so the integral is zero. But \\((z-z_0)^{-1}\\) is the derivative of \\(\\log(z-z_0)\\), which is <em>not</em> single-valued: it gains \\(2\\pi i\\) each time you wind around \\(z_0\\). That \\(2\\pi i\\) is precisely what the residue captures.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-residue-theorem"></div>
`,
            visualizations: [
                {
                    id: 'viz-residue-theorem',
                    title: 'Contour Integral = 2\u03c0i \u00d7 Sum of Residues',
                    description: 'A closed contour encloses multiple singularities. The integral equals 2\u03c0i times the sum of residues inside. Toggle singularities in/out to see the integral update.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 70, originX: 280, originY: 210 });

                        // Three singularities with their residues
                        var poles = [
                            { x: 0.8, y: 0.6, res: 1, label: 'z\u2081', color: viz.colors.blue, inside: true },
                            { x: -0.7, y: 0.3, res: 2, label: 'z\u2082', color: viz.colors.teal, inside: true },
                            { x: 0.1, y: -0.8, res: -1, label: 'z\u2083', color: viz.colors.orange, inside: true },
                            { x: 1.8, y: 0.2, res: 3, label: 'z\u2084', color: viz.colors.purple, inside: false }
                        ];

                        var t = 0;

                        function draw(ts) {
                            t = ts / 1000;
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();

                            var ctx = viz.ctx;

                            // Draw contour (animated large oval)
                            var rx = 1.4, ry = 1.3;
                            ctx.save();
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2.5;
                            ctx.setLineDash([]);
                            ctx.beginPath();
                            for (var k = 0; k <= 120; k++) {
                                var ang = (k / 120) * 2 * Math.PI;
                                var zx = rx * Math.cos(ang);
                                var zy = ry * Math.sin(ang);
                                var sc = viz.toScreen(zx, zy);
                                if (k === 0) ctx.moveTo(sc[0], sc[1]);
                                else ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();

                            // Arrow on contour (CCW)
                            var arrAngle = t * 0.4 % (2 * Math.PI);
                            var ax = rx * Math.cos(arrAngle);
                            var ay = ry * Math.sin(arrAngle);
                            var ax2 = rx * Math.cos(arrAngle + 0.05);
                            var ay2 = ry * Math.sin(arrAngle + 0.05);
                            var sc1 = viz.toScreen(ax, ay);
                            var sc2 = viz.toScreen(ax2, ay2);
                            var da = Math.atan2(sc2[1] - sc1[1], sc2[0] - sc1[0]);
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.moveTo(sc1[0], sc1[1]);
                            ctx.lineTo(sc1[0] - 12 * Math.cos(da - Math.PI/6), sc1[1] - 12 * Math.sin(da - Math.PI/6));
                            ctx.lineTo(sc1[0] - 12 * Math.cos(da + Math.PI/6), sc1[1] - 12 * Math.sin(da + Math.PI/6));
                            ctx.closePath();
                            ctx.fill();
                            ctx.restore();

                            // Gamma label
                            viz.drawText('\u03b3', rx + 0.15, 0, viz.colors.white, 16);

                            // Draw singularities
                            poles.forEach(function(p) {
                                var sc = viz.toScreen(p.x, p.y);
                                // X mark
                                ctx.strokeStyle = p.color;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(sc[0]-7, sc[1]-7); ctx.lineTo(sc[0]+7, sc[1]+7);
                                ctx.moveTo(sc[0]+7, sc[1]-7); ctx.lineTo(sc[0]-7, sc[1]+7);
                                ctx.stroke();

                                var resStr = p.res > 0 ? '+' + p.res : String(p.res);
                                ctx.fillStyle = p.color;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(p.label + ' (Res=' + resStr + ')', sc[0] + 9, sc[1] - 2);

                                // Pulsing ring if inside
                                if (p.inside) {
                                    var pulse = 0.4 + 0.3 * Math.sin(t * 2 + p.x);
                                    ctx.strokeStyle = p.color + Math.round(pulse * 255).toString(16).padStart(2, '0');
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.arc(sc[0], sc[1], 14 + 6 * Math.sin(t * 1.5 + p.y), 0, 2 * Math.PI);
                                    ctx.stroke();
                                }
                            });

                            // Dashed boundary for outside pole
                            var p4 = poles[3];
                            var sc4 = viz.toScreen(p4.x, p4.y);
                            ctx.setLineDash([5, 4]);
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(sc4[0], sc4[1], 18, 0, 2 * Math.PI);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('outside \u03b3', sc4[0] + 9, sc4[1] - 2);

                            // Compute sum of residues inside
                            var sumRes = poles.filter(function(p) { return p.inside; })
                                             .reduce(function(s, p) { return s + p.res; }, 0);

                            // Result panel
                            ctx.fillStyle = '#ffffff11';
                            ctx.beginPath();
                            ctx.roundRect(12, viz.height - 90, viz.width - 24, 78, 8);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.stroke();

                            viz.screenText('\u222e\u03b3 f(z) dz  =  2\u03c0i \u00d7 (Res at z\u2081 + Res at z\u2082 + Res at z\u2083)', viz.width/2, viz.height - 72, viz.colors.text, 12);
                            viz.screenText('= 2\u03c0i \u00d7 (' + poles[0].res + ' + ' + poles[1].res + ' + (' + poles[2].res + '))', viz.width/2, viz.height - 52, viz.colors.text, 12);
                            viz.screenText('= 2\u03c0i \u00d7 ' + sumRes + '  =  ' + (2 * sumRes) + '\u03c0i', viz.width/2, viz.height - 30, viz.colors.white, 14);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain in your own words why \\(\\oint_{|z|=1} z^n\\,dz = 0\\) for every integer \\(n \\neq -1\\), but \\(\\oint_{|z|=1} z^{-1}\\,dz = 2\\pi i\\).',
                    hint: 'For \\(n \\neq -1\\), find an antiderivative. For \\(n = -1\\), parametrize \\(z = e^{i\\theta}\\) and compute directly.',
                    solution: 'For \\(n \\neq -1\\), the function \\(z^n\\) has the antiderivative \\(z^{n+1}/(n+1)\\) which is analytic everywhere except possibly the origin. On a closed curve, a single-valued antiderivative gives zero net change, so the integral is zero. For \\(n = -1\\): parametrize \\(z = e^{i\\theta}\\), \\(dz = ie^{i\\theta}\\,d\\theta\\). Then \\(\\oint z^{-1}\\,dz = \\int_0^{2\\pi} e^{-i\\theta} \\cdot ie^{i\\theta}\\,d\\theta = \\int_0^{2\\pi} i\\,d\\theta = 2\\pi i\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 2: Residues
        // ================================================================
        {
            id: 'sec-residue',
            title: 'Residues',
            content: `
<h2>Residues</h2>

<h3>Definition</h3>

<div class="env-block definition">
    <div class="env-title">Definition 11.1 (Residue)</div>
    <div class="env-body">
        <p>Let \\(f\\) have an isolated singularity at \\(z_0\\). The <strong>residue</strong> of \\(f\\) at \\(z_0\\) is</p>
        \\[
        \\operatorname{Res}(f, z_0) = a_{-1},
        \\]
        <p>the coefficient of \\((z - z_0)^{-1}\\) in the Laurent expansion of \\(f\\) in a punctured disk \\(0 < |z - z_0| < r\\). Equivalently,</p>
        \\[
        \\operatorname{Res}(f, z_0) = \\frac{1}{2\\pi i} \\oint_{|z - z_0| = \\varepsilon} f(z)\\,dz
        \\]
        <p>for any sufficiently small \\(\\varepsilon > 0\\).</p>
    </div>
</div>

<h3>Computation Techniques</h3>

<p>Computing residues directly from the Laurent expansion is correct but often slow. The following formulas speed things up considerably.</p>

<h4>Technique 1: Simple Poles (Laurent Method)</h4>
<div class="env-block theorem">
    <div class="env-title">Formula 11.1 (Simple Pole)</div>
    <div class="env-body">
        <p>If \\(z_0\\) is a <strong>simple pole</strong> of \\(f\\) (i.e., a pole of order 1), then</p>
        \\[
        \\operatorname{Res}(f, z_0) = \\lim_{z \\to z_0} (z - z_0)\\, f(z).
        \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = 1/(z^2+1)\\)</div>
    <div class="env-body">
        <p>The poles are at \\(z = \\pm i\\). At \\(z = i\\) (simple pole):</p>
        \\[
        \\operatorname{Res}\\!\\left(\\frac{1}{z^2+1},\\, i\\right) = \\lim_{z \\to i} (z-i)\\cdot\\frac{1}{(z-i)(z+i)} = \\frac{1}{2i} = -\\frac{i}{2}.
        \\]
        <p>At \\(z = -i\\): similarly \\(\\operatorname{Res} = 1/(-2i) = i/2\\).</p>
    </div>
</div>

<h4>Technique 2: Quotient Formula for Simple Poles</h4>
<div class="env-block theorem">
    <div class="env-title">Formula 11.2 (Quotient Rule)</div>
    <div class="env-body">
        <p>If \\(f(z) = p(z)/q(z)\\) where \\(p(z_0) \\neq 0\\) and \\(z_0\\) is a simple zero of \\(q\\), then</p>
        \\[
        \\operatorname{Res}(f, z_0) = \\frac{p(z_0)}{q'(z_0)}.
        \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = e^z / \\sin z\\) at \\(z = 0\\)</div>
    <div class="env-body">
        <p>Here \\(p(z) = e^z\\), \\(q(z) = \\sin z\\). Since \\(q'(z) = \\cos z\\),</p>
        \\[
        \\operatorname{Res}\\!\\left(\\frac{e^z}{\\sin z},\\, 0\\right) = \\frac{e^0}{\\cos 0} = 1.
        \\]
    </div>
</div>

<h4>Technique 3: Higher-Order Poles (Derivative Formula)</h4>
<div class="env-block theorem">
    <div class="env-title">Formula 11.3 (Pole of Order m)</div>
    <div class="env-body">
        <p>If \\(z_0\\) is a pole of order \\(m\\) of \\(f\\), then</p>
        \\[
        \\operatorname{Res}(f, z_0) = \\frac{1}{(m-1)!} \\lim_{z \\to z_0} \\frac{d^{m-1}}{dz^{m-1}}\\!\\left[(z - z_0)^m f(z)\\right].
        \\]
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = e^z / z^3\\) at \\(z = 0\\)</div>
    <div class="env-body">
        <p>Pole of order 3, so \\(m = 3\\):</p>
        \\[
        \\operatorname{Res}\\!\\left(\\frac{e^z}{z^3},\\, 0\\right) = \\frac{1}{2!}\\lim_{z \\to 0}\\frac{d^2}{dz^2} e^z = \\frac{1}{2} \\cdot 1 = \\frac{1}{2}.
        \\]
        <p>Check via Laurent: \\(e^z/z^3 = (1 + z + z^2/2 + \\cdots)/z^3 = z^{-3} + z^{-2} + \\tfrac{1}{2}z^{-1} + \\cdots\\). Indeed \\(a_{-1} = 1/2\\). \\(\\checkmark\\)</p>
    </div>
</div>

<h4>Essential Singularities</h4>
<p>For an essential singularity, none of the above formulas apply. You must compute the Laurent expansion directly.</p>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = e^{1/z}\\) at \\(z = 0\\)</div>
    <div class="env-body">
        <p>The Laurent expansion is \\(e^{1/z} = \\sum_{n=0}^\\infty \\frac{1}{n! z^n} = 1 + z^{-1} + \\frac{1}{2}z^{-2} + \\cdots\\). The \\(n=1\\) term gives \\(a_{-1} = 1\\), so \\(\\operatorname{Res}(e^{1/z}, 0) = 1\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-residue-computation"></div>
`,
            visualizations: [
                {
                    id: 'viz-residue-computation',
                    title: 'Residue Computation: Step by Step',
                    description: 'Select a function and see its poles, the pole type, and residue at each singularity computed step by step.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 70, originX: 200, originY: 220 });

                        var funcs = [
                            {
                                label: '1/(z\u00b2+1)',
                                poles: [
                                    { z: [0, 1], order: 1, res: [0, -0.5], label: 'i', formula: 'lim\u2093\u2192i (z\u2212i)\u00d71/((z\u2212i)(z+i)) = 1/2i = \u2212i/2' },
                                    { z: [0, -1], order: 1, res: [0, 0.5], label: '\u2212i', formula: 'lim\u2093\u2192\u2212i (z+i)\u00d71/((z\u2212i)(z+i)) = \u22121/2i = i/2' }
                                ]
                            },
                            {
                                label: 'e\u1d63/z\u00b3',
                                poles: [
                                    { z: [0, 0], order: 3, res: [0.5, 0], label: '0', formula: '\u00bd\u00b7d\u00b2/dz\u00b2[e\u1d63]|z=0 = \u00bd\u00b71 = 1/2' }
                                ]
                            },
                            {
                                label: '1/sin(z)',
                                poles: [
                                    { z: [0, 0], order: 1, res: [1, 0], label: '0', formula: 'e\u1d63/cos(z) at z=0: e\u2070/cos(0) = 1' },
                                    { z: [Math.PI, 0], order: 1, res: [-1, 0], label: '\u03c0', formula: '1/cos(\u03c0) = \u22121' },
                                    { z: [-Math.PI, 0], order: 1, res: [-1, 0], label: '\u2212\u03c0', formula: '1/cos(\u2212\u03c0) = \u22121' }
                                ]
                            },
                            {
                                label: 'e^(1/z)',
                                poles: [
                                    { z: [0, 0], order: Infinity, res: [1, 0], label: '0', formula: 'Laurent: e^(1/z)=\u03a3 1/(n!z^n), a\u208b\u2081=1' }
                                ]
                            }
                        ];

                        var sel = 0;
                        var selectedPole = 0;

                        // Selector buttons
                        var btnRow = document.createElement('div');
                        btnRow.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px;';
                        funcs.forEach(function(fn, i) {
                            var b = document.createElement('button');
                            b.textContent = 'f(z)=' + fn.label;
                            b.style.cssText = 'padding:3px 9px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;cursor:pointer;';
                            b.addEventListener('click', function() {
                                sel = i; selectedPole = 0; draw();
                                btnRow.querySelectorAll('button').forEach(function(b2, j) {
                                    b2.style.background = j === i ? '#2a2a60' : '#1a1a40';
                                    b2.style.borderColor = j === i ? '#58a6ff' : '#30363d';
                                });
                            });
                            if (i === 0) { b.style.background = '#2a2a60'; b.style.borderColor = '#58a6ff'; }
                            btnRow.appendChild(b);
                        });
                        controls.appendChild(btnRow);

                        var poleColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.purple];

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;
                            var fn = funcs[sel];

                            // Label
                            viz.screenText('f(z) = ' + fn.label, 200, 18, viz.colors.white, 15);

                            // Draw poles
                            fn.poles.forEach(function(p, i) {
                                var sc = viz.toScreen(p.z[0], p.z[1]);
                                var col = poleColors[i % poleColors.length];
                                var isSelected = i === selectedPole;

                                // X mark
                                ctx.strokeStyle = col;
                                ctx.lineWidth = isSelected ? 3 : 2;
                                var sz = isSelected ? 10 : 7;
                                ctx.beginPath();
                                ctx.moveTo(sc[0]-sz, sc[1]-sz); ctx.lineTo(sc[0]+sz, sc[1]+sz);
                                ctx.moveTo(sc[0]+sz, sc[1]-sz); ctx.lineTo(sc[0]-sz, sc[1]+sz);
                                ctx.stroke();

                                // Order badge
                                var orderLabel = p.order === Infinity ? 'Ess.' : (p.order === 1 ? 'Ord 1' : 'Ord ' + p.order);
                                ctx.fillStyle = col + '33';
                                ctx.beginPath();
                                ctx.roundRect(sc[0]+12, sc[1]-22, 50, 18, 4);
                                ctx.fill();
                                ctx.fillStyle = col;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(orderLabel, sc[0]+16, sc[1]-13);

                                // Label below
                                ctx.fillStyle = col;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('z=' + p.label, sc[0], sc[1]+12);

                                // Click zone label
                                if (isSelected) {
                                    ctx.strokeStyle = col;
                                    ctx.lineWidth = 1.5;
                                    ctx.setLineDash([4, 3]);
                                    ctx.beginPath();
                                    ctx.arc(sc[0], sc[1], 22, 0, 2*Math.PI);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }
                            });

                            // Pole selector
                            if (fn.poles.length > 1) {
                                var poleRow = document.createElement('div');
                                poleRow.id = 'pole-sel-row';
                                poleRow.style.cssText = 'display:flex;gap:5px;margin-top:4px;';
                                fn.poles.forEach(function(p, i) {
                                    var pb = document.createElement('button');
                                    pb.textContent = 'Pole at ' + p.label;
                                    pb.style.cssText = 'padding:2px 8px;border:1px solid #30363d;border-radius:4px;background:' + (i===selectedPole?'#1a2a40':'#1a1a40') + ';color:' + poleColors[i] + ';font-size:0.72rem;cursor:pointer;';
                                    pb.addEventListener('click', function() { selectedPole = i; draw(); });
                                    poleRow.appendChild(pb);
                                });
                                var old = document.getElementById('pole-sel-row');
                                if (old) old.replaceWith(poleRow); else controls.appendChild(poleRow);
                            }

                            // Info panel
                            var p = fn.poles[selectedPole] || fn.poles[0];
                            var col = poleColors[selectedPole % poleColors.length];
                            var panelX = viz.width - 310, panelY = 44;
                            var panelW = 300, panelH = 200;

                            ctx.fillStyle = '#0e1526cc';
                            ctx.beginPath();
                            ctx.roundRect(panelX, panelY, panelW, panelH, 8);
                            ctx.fill();
                            ctx.strokeStyle = col;
                            ctx.lineWidth = 1.5;
                            ctx.stroke();

                            ctx.fillStyle = col;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Singularity at z\u2080 = ' + p.label, panelX+12, panelY+12);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            var typeStr = p.order === Infinity ? 'Essential singularity' : (p.order === 1 ? 'Simple pole (order 1)' : 'Pole of order ' + p.order);
                            ctx.fillText('Type: ' + typeStr, panelX+12, panelY+34);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Method:', panelX+12, panelY+56);
                            var methodStr = p.order === Infinity ? 'Laurent expansion (direct)' :
                                            p.order === 1 ? 'Limit: lim (z-z\u2080)\u00d7f(z)' :
                                            'Derivative formula: \u2155(m-1)! d^(m-1)/dz^(m-1)[(z-z\u2080)^m f]|z\u2080';
                            ctx.fillText(methodStr, panelX+12, panelY+72);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            var lines = p.formula.split('\n');
                            lines.forEach(function(line, li) {
                                ctx.fillText(line, panelX+12, panelY+92 + li*16);
                            });

                            var resStr = p.res[1] === 0 ? String(p.res[0]) :
                                         p.res[0] === 0 ? (p.res[1] + 'i') :
                                         (p.res[0] + ' + ' + p.res[1] + 'i');
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.fillText('Res(f, z\u2080) = ' + resStr, panelX+12, panelY+160);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\operatorname{Res}\\bigl(\\tfrac{\\cos z}{z^2}\\,,\\,0\\bigr)\\) using (a) the Laurent expansion and (b) the derivative formula for a pole of order 2.',
                    hint: 'For (a), expand \\(\\cos z = 1 - z^2/2 + z^4/24 - \\cdots\\) and divide by \\(z^2\\). For (b), apply \\(\\frac{1}{1!}\\lim_{z\\to 0}\\frac{d}{dz}[z^2 \\cdot \\cos z / z^2]\\).',
                    solution: '(a) \\(\\cos z / z^2 = z^{-2} - 1/2 + z^2/24 - \\cdots\\). The coefficient of \\(z^{-1}\\) is \\(0\\), so \\(\\operatorname{Res} = 0\\). (b) \\(\\frac{1}{1!}\\lim_{z\\to 0}\\frac{d}{dz}\\cos z = \\lim_{z\\to 0}(-\\sin z) = 0\\). Both methods agree.'
                },
                {
                    question: 'Find all residues of \\(f(z) = \\tan z = \\sin z / \\cos z\\).',
                    hint: 'The poles are where \\(\\cos z = 0\\), i.e., \\(z_k = (2k+1)\\pi/2\\). Use the quotient formula \\(\\operatorname{Res}(p/q, z_0) = p(z_0)/q\'(z_0)\\).',
                    solution: 'The poles are at \\(z_k = \\pi/2 + k\\pi\\) for \\(k \\in \\mathbb{Z}\\), all simple (since \\(\\cos z\\) has simple zeros there). By the quotient formula: \\(\\operatorname{Res}(\\tan z, z_k) = \\sin z_k / (-\\sin z_k) = -1\\). Every residue of \\(\\tan z\\) equals \\(-1\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Residue Theorem
        // ================================================================
        {
            id: 'sec-theorem',
            title: 'The Residue Theorem',
            content: `
<h2>The Residue Theorem</h2>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.1 (Residue Theorem)</div>
    <div class="env-body">
        <p>Let \\(D\\) be a simply connected domain, \\(\\gamma\\) a positively oriented (counterclockwise) simple closed contour in \\(D\\), and \\(f\\) analytic on \\(D\\) except for isolated singularities \\(z_1, z_2, \\ldots, z_n\\) inside \\(\\gamma\\). Then</p>
        \\[
        \\oint_\\gamma f(z)\\,dz = 2\\pi i \\sum_{k=1}^{n} \\operatorname{Res}(f, z_k).
        \\]
    </div>
</div>

<h3>Proof</h3>
<p>Surround each singularity \\(z_k\\) with a small positively oriented circle \\(\\gamma_k = \\{|z - z_k| = \\varepsilon_k\\}\\) that does not intersect each other or \\(\\gamma\\). Connect \\(\\gamma\\) to each \\(\\gamma_k\\) by two parallel cuts to form a region \\(R\\) with boundary</p>
\\[
\\partial R = \\gamma - \\gamma_1 - \\gamma_2 - \\cdots - \\gamma_n + \\text{(cuts cancel)}.
\\]
<p>On \\(R\\), \\(f\\) is analytic, so by Cauchy's Theorem \\(\\oint_{\\partial R} f(z)\\,dz = 0\\). Therefore</p>
\\[
\\oint_\\gamma f(z)\\,dz = \\sum_{k=1}^n \\oint_{\\gamma_k} f(z)\\,dz.
\\]
<p>By definition of the residue, \\(\\oint_{\\gamma_k} f(z)\\,dz = 2\\pi i \\cdot \\operatorname{Res}(f, z_k)\\). Summing over \\(k\\) gives the result. \\(\\square\\)</p>

<div class="env-block remark">
    <div class="env-title">Orientation Matters</div>
    <div class="env-body">
        <p>The formula assumes \\(\\gamma\\) is traversed counterclockwise (positive orientation). For a clockwise contour, the formula picks up a sign flip: \\(\\oint_{\\gamma^-} f = -2\\pi i \\sum \\operatorname{Res}\\).</p>
    </div>
</div>

<h3>Worked Example: Classic Real Integral</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(\\displaystyle\\int_{-\\infty}^{\\infty} \\frac{1}{1+x^2}\\,dx\\)</div>
    <div class="env-body">
        <p>Let \\(f(z) = 1/(1+z^2)\\). Poles at \\(z = \\pm i\\). Take the contour \\(\\gamma_R\\) = semicircle in upper half-plane of radius \\(R\\) plus the segment \\([-R, R]\\) on the real axis.</p>
        <p>For large \\(R\\), the integral over the semicircular arc vanishes (Jordan's Lemma: \\(|f(z)| = O(1/R^2)\\) on the arc). So</p>
        \\[
        \\int_{-\\infty}^{\\infty} \\frac{dx}{1+x^2} = 2\\pi i \\cdot \\operatorname{Res}\\!\\left(f,\\, i\\right) = 2\\pi i \\cdot \\frac{1}{2i} = \\pi.
        \\]
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-winding-number"></div>
`,
            visualizations: [
                {
                    id: 'viz-winding-number',
                    title: 'Winding Number & Residue Contribution',
                    description: 'Drag the contour center to wind around singularities. The winding number around each singularity determines its contribution to the integral.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 65, originX: 280, originY: 220 });

                        // Fixed poles
                        var poles = [
                            { x: 0.5, y: 0.7, res: 1, label: 'z\u2081', color: viz.colors.blue },
                            { x: -0.8, y: 0.2, res: 2, label: 'z\u2082', color: viz.colors.teal },
                            { x: 0.3, y: -0.9, res: -1, label: 'z\u2083', color: viz.colors.orange }
                        ];

                        // Draggable center of contour
                        var cx = 0, cy = 0, radius = 1.2;

                        var centerPt = viz.addDraggable('center', cx, cy, viz.colors.purple, 7, function(nx, ny) {
                            cx = nx; cy = ny; draw();
                        });

                        VizEngine.createSlider(controls, 'Radius', 0.3, 2.0, radius, 0.05, function(v) {
                            radius = v; draw();
                        });

                        function windingNumber(cx, cy, r, px, py) {
                            // Winding number of circle centered at (cx,cy) with radius r around (px,py)
                            var dist = Math.sqrt((cx-px)*(cx-px) + (cy-py)*(cy-py));
                            return dist < r ? 1 : 0;
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Compute winding numbers
                            var contributions = poles.map(function(p) {
                                return windingNumber(cx, cy, radius, p.x, p.y);
                            });
                            var totalRes = poles.reduce(function(s, p, i) { return s + contributions[i] * p.res; }, 0);

                            // Draw circular contour
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2.5;
                            var scC = viz.toScreen(cx, cy);
                            ctx.beginPath();
                            ctx.arc(scC[0], scC[1], radius * viz.scale, 0, 2*Math.PI);
                            ctx.stroke();

                            // CCW arrow
                            var asc = viz.toScreen(cx + radius, cy);
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.moveTo(asc[0], asc[1] - 10);
                            ctx.lineTo(asc[0] + 12, asc[1] - 10);
                            ctx.lineTo(asc[0] + 12, asc[1] - 18);
                            ctx.lineTo(asc[0] + 24, asc[1] - 3);
                            ctx.lineTo(asc[0] + 12, asc[1] + 12);
                            ctx.lineTo(asc[0] + 12, asc[1] + 4);
                            ctx.lineTo(asc[0], asc[1] + 4);
                            ctx.closePath();
                            ctx.fill();

                            // Draw poles
                            poles.forEach(function(p, i) {
                                var sc = viz.toScreen(p.x, p.y);
                                var col = p.color;
                                var inside = contributions[i] === 1;

                                // Highlight if inside
                                if (inside) {
                                    ctx.strokeStyle = col + '66';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath();
                                    ctx.moveTo(scC[0], scC[1]);
                                    ctx.lineTo(sc[0], sc[1]);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }

                                // X mark
                                ctx.strokeStyle = col;
                                ctx.lineWidth = inside ? 3 : 1.5;
                                ctx.beginPath();
                                ctx.moveTo(sc[0]-7, sc[1]-7); ctx.lineTo(sc[0]+7, sc[1]+7);
                                ctx.moveTo(sc[0]+7, sc[1]-7); ctx.lineTo(sc[0]-7, sc[1]+7);
                                ctx.stroke();

                                // Winding number label
                                var w = contributions[i];
                                var wLabel = 'n(\u03b3,z' + (i+1) + ')=' + w;
                                ctx.fillStyle = inside ? col : viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(p.label + ' Res=' + p.res, sc[0]+9, sc[1]-2);
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText(wLabel, sc[0]+9, sc[1]+14);
                            });

                            // Result box
                            ctx.fillStyle = '#ffffff11';
                            ctx.beginPath();
                            ctx.roundRect(10, viz.height-88, viz.width-20, 76, 8);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.stroke();

                            var termStr = poles.map(function(p, i) {
                                return contributions[i] + '\u00d7' + p.res;
                            }).join(' + ');
                            viz.screenText('\u222e f dz  =  2\u03c0i \u00d7 \u03a3 n(\u03b3,z_k)\u00d7Res(f,z_k)', viz.width/2, viz.height-70, viz.colors.text, 11);
                            viz.screenText('= 2\u03c0i \u00d7 (' + termStr + ') = 2\u03c0i \u00d7 ' + totalRes, viz.width/2, viz.height-50, viz.colors.text, 11);
                            viz.screenText('= ' + (2*totalRes) + '\u03c0i', viz.width/2, viz.height-28, viz.colors.white, 15);

                            viz.drawDraggables();
                            viz.drawText('\u25cf', cx, cy, viz.colors.purple, 10);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=2} \\frac{e^z}{z(z-1)}\\,dz\\).',
                    hint: 'Both poles \\(z=0\\) and \\(z=1\\) are inside \\(|z|=2\\). Compute residues at each using the simple pole formula.',
                    solution: 'Partial fractions: \\(\\frac{e^z}{z(z-1)} = \\frac{e^z}{z-1} - \\frac{e^z}{z}\\) (after checking). Residue at \\(z=0\\): \\(\\lim_{z\\to 0} z \\cdot e^z/(z(z-1)) = e^0/(0-1) = -1\\). Residue at \\(z=1\\): \\(\\lim_{z\\to 1}(z-1)\\cdot e^z/(z(z-1)) = e^1/1 = e\\). Sum of residues: \\(e - 1\\). Integral: \\(2\\pi i(e-1)\\).'
                },
                {
                    question: 'Evaluate \\(\\displaystyle\\oint_{|z|=3} \\frac{\\sin z}{z^2(z^2+4)}\\,dz\\).',
                    hint: 'Identify all poles inside \\(|z|=3\\). There is a second-order pole at \\(z=0\\) and simple poles at \\(z = \\pm 2i\\).',
                    solution: 'Poles at \\(z=0\\) (order 2) and \\(z = \\pm 2i\\) (simple, both inside since \\(|\\pm 2i|=2 < 3\\)). Res at \\(0\\): \\(\\frac{d}{dz}[\\frac{\\sin z}{z^2+4}]\\big|_0 = \\frac{\\cos 0 \\cdot 4 - \\sin 0 \\cdot 0}{16} = 1/4\\). Res at \\(2i\\): \\(\\frac{\\sin(2i)}{(2i)^2 \\cdot 4i} = \\frac{i\\sinh 2}{-4\\cdot 4i} = \\frac{\\sinh 2}{16}\\). Res at \\(-2i\\): by symmetry \\(-\\sinh 2/16\\). The two imaginary residues cancel; total \\(= 1/4\\). Integral: \\(2\\pi i \\cdot \\tfrac{1}{4} = \\pi i/2\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: Computing Residues
        // ================================================================
        {
            id: 'sec-computation',
            title: 'Computing Residues',
            content: `
<h2>Computing Residues in Practice</h2>

<p>The Residue Theorem reduces contour integrals to residue calculations. This section collects strategies and worked examples for the common cases.</p>

<h3>Simple Poles: Three Routes</h3>

<p><strong>Route A (direct limit):</strong> \\(\\operatorname{Res}(f, z_0) = \\lim_{z\\to z_0}(z-z_0)f(z)\\).</p>
<p><strong>Route B (quotient formula):</strong> If \\(f = p/q\\) with \\(q(z_0)=0\\), \\(p(z_0)\\neq 0\\), \\(q'(z_0)\\neq 0\\), then \\(\\operatorname{Res}(f,z_0) = p(z_0)/q'(z_0)\\).</p>
<p><strong>Route C (partial fractions):</strong> Decompose \\(f\\) explicitly; the residue is the coefficient of \\(1/(z-z_0)\\).</p>

<h3>Higher-Order Poles</h3>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = \\dfrac{\\cos z}{(z-\\pi/2)^3}\\)</div>
    <div class="env-body">
        <p>Pole of order 3 at \\(z_0 = \\pi/2\\). Let \\(w = z - \\pi/2\\), so \\(\\cos z = \\cos(w + \\pi/2) = -\\sin w\\). Then</p>
        \\[
        f = \\frac{-\\sin w}{w^3} = \\frac{-(w - w^3/6 + \\cdots)}{w^3} = -w^{-2} + \\frac{1}{6} + \\cdots
        \\]
        <p>The \\(w^{-1}\\) coefficient is 0, so \\(\\operatorname{Res}(f, \\pi/2) = 0\\).</p>
        <p>Check via formula: \\(\\frac{1}{2!}\\frac{d^2}{dw^2}(-\\sin w)\\big|_{w=0} = \\frac{1}{2}(\\sin 0) = 0\\). \\(\\checkmark\\)</p>
    </div>
</div>

<h3>Residues at Infinity</h3>

<div class="env-block definition">
    <div class="env-title">Definition 11.2 (Residue at Infinity)</div>
    <div class="env-body">
        <p>The residue of \\(f\\) at \\(\\infty\\) is defined by</p>
        \\[
        \\operatorname{Res}(f, \\infty) = -\\operatorname{Res}\\!\\left(\\frac{1}{z^2}f\\!\\left(\\frac{1}{z}\\right),\\, 0\\right).
        \\]
        <p>Equivalently, if \\(f\\) is meromorphic everywhere, then \\(\\sum_{\\text{all poles}} \\operatorname{Res}(f,z_k) + \\operatorname{Res}(f,\\infty) = 0\\).</p>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(f(z) = \\dfrac{z^3}{z^4-1}\\)</div>
    <div class="env-body">
        <p>Poles at \\(z = 1, -1, i, -i\\), each simple. Each residue: \\(z_k^3/(4z_k^3) = 1/4\\). Sum of finite residues: \\(4 \\times 1/4 = 1\\). So \\(\\operatorname{Res}(f,\\infty) = -1\\).</p>
    </div>
</div>

<h3>A Shortcut: Contributions from Real Axis Poles</h3>

<p>When evaluating real integrals via a semicircular contour, a <em>simple pole on the real axis</em> is handled by an indented contour. The indentation contributes a <em>half-residue</em>:</p>
\\[
\\lim_{\\varepsilon \\to 0^+} \\int_{\\text{small semicircle}} f(z)\\,dz = \\pm \\pi i \\cdot \\operatorname{Res}(f, x_0),
\\]
<p>with sign depending on whether the indentation goes above (\\(-\\pi i\\)) or below (\\(+\\pi i\\)).</p>

<div class="viz-placeholder" data-viz="viz-residue-gallery"></div>
`,
            visualizations: [
                {
                    id: 'viz-residue-gallery',
                    title: 'Residue Gallery',
                    description: 'Domain coloring of classic meromorphic functions. Color encodes argument (hue), brightness encodes modulus. Poles appear as bright centers with full color rotation; zeros as dark centers.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 400, scale: 60, originX: 280, originY: 200 });

                        var funcs = [
                            {
                                label: '1/sin(z)',
                                fn: function(re, im) {
                                    // sin(z) = sin(x)cosh(y) + i cos(x)sinh(y)
                                    var sr = Math.sin(re)*Math.cosh(im), si = Math.cos(re)*Math.sinh(im);
                                    var denom = sr*sr + si*si + 1e-30;
                                    return [sr/denom, -si/denom];
                                },
                                info: 'Simple poles at z=k\u03c0, Res=(-1)^k'
                            },
                            {
                                label: 'tan(z)',
                                fn: function(re, im) {
                                    var sr = Math.sin(re)*Math.cosh(im), si = Math.cos(re)*Math.sinh(im);
                                    var cr = Math.cos(re)*Math.cosh(im), ci = -Math.sin(re)*Math.sinh(im);
                                    var denom = cr*cr + ci*ci + 1e-30;
                                    return [(sr*cr+si*ci)/denom, (si*cr-sr*ci)/denom];
                                },
                                info: 'Simple poles at z=\u03c0/2+k\u03c0, all Res=\u22121'
                            },
                            {
                                label: '1/(z\u00b2+1)',
                                fn: function(re, im) {
                                    var ar = re*re - im*im + 1, ai = 2*re*im;
                                    var denom = ar*ar + ai*ai + 1e-30;
                                    return [ar/denom, -ai/denom];
                                },
                                info: 'Poles at \u00b1i; Res(i)=\u22121/(2i)=i/2'
                            },
                            {
                                label: 'e^(1/z)',
                                fn: function(re, im) {
                                    var d = re*re+im*im+1e-30;
                                    var wr = re/d, wi = -im/d;
                                    var er = Math.exp(wr);
                                    return [er*Math.cos(wi), er*Math.sin(wi)];
                                },
                                info: 'Essential singularity at 0; Res=1'
                            }
                        ];

                        var sel = 0;

                        var row = document.createElement('div');
                        row.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px;';
                        funcs.forEach(function(fn, i) {
                            var b = document.createElement('button');
                            b.textContent = fn.label;
                            b.style.cssText = 'padding:3px 10px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;cursor:pointer;';
                            b.addEventListener('click', function() {
                                sel = i; draw();
                                row.querySelectorAll('button').forEach(function(b2, j) {
                                    b2.style.background = j===i ? '#2a2a60' : '#1a1a40';
                                    b2.style.borderColor = j===i ? '#58a6ff' : '#30363d';
                                });
                            });
                            if (i===0) { b.style.background='#2a2a60'; b.style.borderColor='#58a6ff'; }
                            row.appendChild(b);
                        });
                        controls.appendChild(row);

                        function draw() {
                            viz.clear();
                            var xR = [-4.2, 4.2], yR = [-3, 3];
                            viz.drawDomainColoring(funcs[sel].fn, xR, yR);
                            viz.drawAxes();

                            // Info overlay
                            var ctx = viz.ctx;
                            ctx.fillStyle = '#0c0c2099';
                            ctx.beginPath();
                            ctx.roundRect(8, 8, viz.width - 16, 38, 6);
                            ctx.fill();
                            viz.screenText('f(z) = ' + funcs[sel].label + '   |   ' + funcs[sel].info, viz.width/2, 27, viz.colors.white, 12);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find \\(\\operatorname{Res}\\bigl(\\tfrac{1}{z\\sin z}\\,,\\,0\\bigr)\\). Note that \\(z=0\\) is a pole of order 2.',
                    hint: 'Write \\(\\sin z = z - z^3/6 + \\cdots\\), so \\(z \\sin z = z^2(1 - z^2/6 + \\cdots)\\). Use the geometric series \\(1/(1-u) = 1+u+\\cdots\\) with \\(u = z^2/6 - \\cdots\\).',
                    solution: '\\(z\\sin z = z^2(1 - z^2/6 + \\cdots)\\), so \\(\\frac{1}{z\\sin z} = \\frac{1}{z^2}(1 + z^2/6 + \\cdots) = z^{-2} + 1/6 + \\cdots\\). The \\(z^{-1}\\) coefficient is \\(0\\), so \\(\\operatorname{Res}(1/(z\\sin z), 0) = 0\\).'
                },
                {
                    question: 'For \\(f(z) = z^2/(z^4 - 1)\\), find all residues and verify that their sum plus \\(\\operatorname{Res}(f, \\infty)\\) equals zero.',
                    hint: 'The poles are the 4th roots of unity: \\(1, -1, i, -i\\). All are simple. Compute each residue using the quotient formula. For \\(\\operatorname{Res}(f,\\infty)\\): compute \\(-\\operatorname{Res}(g, 0)\\) where \\(g(z) = z^{-2}f(1/z)\\).',
                    solution: 'At each \\(z_k \\in \\{1,-1,i,-i\\}\\): \\(\\operatorname{Res} = z_k^2/(4z_k^3) = 1/(4z_k)\\). So residues are \\(1/4, -1/4, 1/(4i) = -i/4, -1/(4i) = i/4\\). Sum: \\(1/4 - 1/4 - i/4 + i/4 = 0\\). The sum is already zero, consistent with \\(f(z) = O(1/z^2)\\) at infinity which forces \\(\\operatorname{Res}(f,\\infty) = 0\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Argument Principle & Rouche
        // ================================================================
        {
            id: 'sec-argument',
            title: 'Argument Principle & Rouche\'s Theorem',
            content: `
<h2>Argument Principle and Rouche's Theorem</h2>

<p>The Residue Theorem has a beautiful consequence beyond computing integrals: it counts zeros and poles of meromorphic functions.</p>

<h3>The Argument Principle</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.2 (Argument Principle)</div>
    <div class="env-body">
        <p>Let \\(f\\) be meromorphic inside and on a simple closed positively oriented contour \\(\\gamma\\), with no zeros or poles on \\(\\gamma\\). Let \\(Z\\) be the number of zeros and \\(P\\) the number of poles of \\(f\\) inside \\(\\gamma\\), counted with multiplicity. Then</p>
        \\[
        \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f'(z)}{f(z)}\\,dz = Z - P.
        \\]
        <p>Equivalently, this equals the winding number of the image curve \\(f(\\gamma)\\) around the origin in the \\(w\\)-plane.</p>
    </div>
</div>

<h4>Proof sketch</h4>
<p>Near a zero of order \\(m\\): \\(f(z) = (z-z_0)^m g(z)\\) with \\(g(z_0) \\neq 0\\), so \\(f'/f = m/(z-z_0) + g'/g\\). The residue of \\(f'/f\\) at \\(z_0\\) is \\(m\\). Near a pole of order \\(p\\): \\(f(z) = (z-z_0)^{-p} h(z)\\) with \\(h(z_0) \\neq 0\\), so residue of \\(f'/f\\) is \\(-p\\). Sum over all singularities gives \\(Z - P\\).</p>

<h4>Geometric Interpretation</h4>
<p>As \\(z\\) traverses \\(\\gamma\\) once, \\(\\arg f(z)\\) changes by \\(2\\pi(Z-P)\\). This is the total change in argument, i.e., \\(2\\pi\\) times the number of times \\(f(\\gamma)\\) winds counterclockwise around 0.</p>

<div class="viz-placeholder" data-viz="viz-argument-principle"></div>

<h3>Rouche's Theorem</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 11.3 (Rouche's Theorem)</div>
    <div class="env-body">
        <p>Let \\(f\\) and \\(g\\) be analytic inside and on a simple closed contour \\(\\gamma\\). If \\(|g(z)| < |f(z)|\\) for all \\(z\\) on \\(\\gamma\\), then \\(f\\) and \\(f + g\\) have the same number of zeros inside \\(\\gamma\\).</p>
    </div>
</div>

<h4>Proof idea</h4>
<p>Since \\(|g| < |f|\\) on \\(\\gamma\\), neither \\(f\\) nor \\(f+g\\) vanishes on \\(\\gamma\\). Consider \\(h(t) = Z(f + tg) - Z(f)\\) for \\(t \\in [0,1]\\), where \\(Z\\) counts zeros via the argument principle. This is a continuous integer-valued function, hence constant. At \\(t=0\\) it is zero, so \\(Z(f+g) = Z(f)\\). \\(\\square\\)</p>

<div class="env-block example">
    <div class="env-title">Application: Fundamental Theorem of Algebra</div>
    <div class="env-body">
        <p>Every polynomial \\(p(z) = z^n + a_{n-1}z^{n-1} + \\cdots + a_0\\) has exactly \\(n\\) zeros in \\(\\mathbb{C}\\).</p>
        <p><em>Proof via Rouche:</em> Take \\(f(z) = z^n\\) and \\(g(z) = a_{n-1}z^{n-1} + \\cdots + a_0\\). On \\(|z| = R\\) for large \\(R\\): \\(|f(z)| = R^n\\) and \\(|g(z)| \\leq |a_{n-1}|R^{n-1} + \\cdots < R^n = |f(z)|\\). So \\(p = f + g\\) has the same number of zeros as \\(f(z) = z^n\\), which is \\(n\\). \\(\\square\\)</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-rouche"></div>
`,
            visualizations: [
                {
                    id: 'viz-argument-principle',
                    title: 'Argument Principle: Counting Windings = Counting Zeros',
                    description: 'As z traverses the contour \u03b3 (left), f(z) traces a curve in the w-plane (right). The number of times f(\u03b3) winds around the origin equals Z\u2212P.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 50, originX: 140, originY: 210 });

                        // f(z) = z^2 * (z-1) / (z + 0.5) -- 2 zeros, 1 pole
                        // We'll use a simpler: f(z) = z^2 (2 zeros inside |z|=1.5) for demo
                        var examples = [
                            { label: 'f(z)=z\u00b2', fn: function(re,im){return [re*re-im*im, 2*re*im];}, desc: 'Z=2, P=0: winds 2 times CCW' },
                            { label: 'f(z)=z\u00b3-1', fn: function(re,im){
                                return [re*re*re - 3*re*im*im - 1, 3*re*re*im - im*im*im];
                            }, desc: 'Z=3, P=0 inside |z|=2: winds 3 times' },
                            { label: 'f(z)=1/z', fn: function(re,im){
                                var d = re*re+im*im+1e-30; return [re/d, -im/d];
                            }, desc: 'Z=0, P=1: winds \u22121 (clockwise)' }
                        ];

                        var sel = 0;
                        var t = 0;
                        var N = 200;

                        var row = document.createElement('div');
                        row.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px;';
                        examples.forEach(function(ex, i) {
                            var b = document.createElement('button');
                            b.textContent = ex.label;
                            b.style.cssText = 'padding:3px 10px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;cursor:pointer;';
                            b.addEventListener('click', function() {
                                sel = i;
                                row.querySelectorAll('button').forEach(function(b2,j){ b2.style.background=j===i?'#2a2a60':'#1a1a40'; b2.style.borderColor=j===i?'#58a6ff':'#30363d'; });
                            });
                            if (i===0){b.style.background='#2a2a60'; b.style.borderColor='#58a6ff';}
                            row.appendChild(b);
                        });
                        controls.appendChild(row);

                        // Precompute f(gamma) for each example
                        function getImagePoints(exIdx) {
                            var pts = [];
                            var r = 1.5;
                            for (var k = 0; k <= N; k++) {
                                var ang = (k / N) * 2 * Math.PI;
                                var re = r * Math.cos(ang), im = r * Math.sin(ang);
                                var w = examples[exIdx].fn(re, im);
                                pts.push(w);
                            }
                            return pts;
                        }

                        var rightOriginX = 400, rightOriginY = 210, rightScale = 35;

                        function toRight(wx, wy) {
                            return [rightOriginX + wx * rightScale, rightOriginY - wy * rightScale];
                        }

                        function draw(ts) {
                            t = ts / 1000;
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Right panel background
                            ctx.fillStyle = '#0e1526';
                            ctx.fillRect(viz.width/2 + 5, 0, viz.width/2, viz.height);

                            // Right axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(viz.width/2+5, rightOriginY);
                            ctx.lineTo(viz.width-4, rightOriginY);
                            ctx.moveTo(rightOriginX, 10);
                            ctx.lineTo(rightOriginX, viz.height-10);
                            ctx.stroke();

                            // Panel labels
                            viz.screenText('z-plane', 70, 18, viz.colors.text, 12);
                            viz.screenText('w-plane: f(\u03b3)', rightOriginX, 18, viz.colors.text, 12);

                            // Left: draw contour gamma
                            var r = 1.5;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var k = 0; k <= N; k++) {
                                var ang = (k / N) * 2 * Math.PI;
                                var sc = viz.toScreen(r*Math.cos(ang), r*Math.sin(ang));
                                if (k === 0) ctx.moveTo(sc[0], sc[1]); else ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();
                            viz.drawText('\u03b3', r + 0.15, 0.1, viz.colors.blue, 13);

                            // Animated point on gamma
                            var animAng = (t * 0.6) % (2 * Math.PI);
                            var zx = r * Math.cos(animAng), zy = r * Math.sin(animAng);
                            viz.drawPoint(zx, zy, viz.colors.yellow, '', 5);

                            // Corresponding f(z) point in right panel
                            var ex = examples[sel];
                            var wPt = ex.fn(zx, zy);
                            var wsc = toRight(wPt[0], wPt[1]);
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.arc(wsc[0], wsc[1], 5, 0, 2*Math.PI);
                            ctx.fill();

                            // Right: draw full image curve f(gamma)
                            var pts = getImagePoints(sel);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            pts.forEach(function(p, i) {
                                var rsc = toRight(p[0], p[1]);
                                if (i===0) ctx.moveTo(rsc[0], rsc[1]); else ctx.lineTo(rsc[0], rsc[1]);
                            });
                            ctx.closePath();
                            ctx.stroke();

                            // Origin in right panel (red dot)
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.arc(rightOriginX, rightOriginY, 5, 0, 2*Math.PI);
                            ctx.fill();
                            viz.screenText('0', rightOriginX + 10, rightOriginY - 10, viz.colors.red, 11);

                            // Description
                            ctx.fillStyle = '#ffffff11';
                            ctx.beginPath();
                            ctx.roundRect(8, viz.height-52, viz.width-16, 40, 6);
                            ctx.fill();
                            viz.screenText(ex.desc, viz.width/2, viz.height - 28, viz.colors.white, 13);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                },
                {
                    id: 'viz-rouche',
                    title: 'Rouche\'s Theorem: Dominant Term Controls Zeros',
                    description: 'On the contour |z|=R, the dominant term f(z) (blue) overwhelms g(z) (orange), so f+g has the same zeros as f. Drag the radius slider.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 440, scale: 55, originX: 280, originY: 220 });

                        // f(z) = z^3, g(z) = 2z + 1 (constant term)
                        // On |z|=R: |f|=R^3, |g|<=2R+1. For R large enough |g|<|f|.
                        var R = 1.8;
                        var t = 0;

                        VizEngine.createSlider(controls, 'Radius R', 0.5, 3.0, R, 0.05, function(v) { R = v; });

                        function fMod(re, im) { // |z^3|
                            var r = Math.sqrt(re*re + im*im);
                            return Math.pow(r, 3);
                        }
                        function gMod(re, im) { // |2z+1|
                            return Math.sqrt((2*re+1)*(2*re+1) + (2*im)*(2*im));
                        }

                        function draw(ts) {
                            t = ts / 1000;
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;
                            var N = 120;

                            // Draw contour
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([]);
                            ctx.beginPath();
                            for (var k = 0; k <= N; k++) {
                                var ang = (k / N) * 2 * Math.PI;
                                var sc = viz.toScreen(R*Math.cos(ang), R*Math.sin(ang));
                                if (k === 0) ctx.moveTo(sc[0], sc[1]); else ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.closePath();
                            ctx.stroke();
                            viz.drawText('|z|=R', R+0.15, 0.15, viz.colors.white, 12);

                            // Animated comparison point
                            var animAng = (t * 0.5) % (2*Math.PI);
                            var re = R * Math.cos(animAng), im = R * Math.sin(animAng);
                            var fm = fMod(re, im), gm = gMod(re, im);
                            var dominated = gm < fm;

                            var sc = viz.toScreen(re, im);
                            ctx.fillStyle = dominated ? viz.colors.green : viz.colors.red;
                            ctx.beginPath();
                            ctx.arc(sc[0], sc[1], 6, 0, 2*Math.PI);
                            ctx.fill();

                            // Compute min(|f|-|g|) on contour
                            var minDiff = Infinity;
                            var allDominated = true;
                            for (var k = 0; k < N; k++) {
                                var a = (k / N) * 2 * Math.PI;
                                var rx = R*Math.cos(a), ry = R*Math.sin(a);
                                var diff = fMod(rx,ry) - gMod(rx,ry);
                                if (diff < minDiff) minDiff = diff;
                                if (diff <= 0) allDominated = false;
                            }

                            // Shade valid/invalid
                            ctx.fillStyle = dominated ? viz.colors.green + '22' : viz.colors.red + '22';
                            ctx.beginPath();
                            ctx.arc(viz.toScreen(0,0)[0], viz.toScreen(0,0)[1], R*viz.scale, 0, 2*Math.PI);
                            ctx.fill();

                            // Info box
                            ctx.fillStyle = '#0e1526cc';
                            ctx.beginPath();
                            ctx.roundRect(10, 10, viz.width - 20, 90, 8);
                            ctx.fill();

                            viz.screenText('f(z) = z\u00b3,  g(z) = 2z + 1', viz.width/2, 28, viz.colors.white, 13);
                            viz.screenText('On |z|='+R.toFixed(2)+':  min|f|-|g| = '+minDiff.toFixed(3), viz.width/2, 50, allDominated ? viz.colors.green : viz.colors.red, 12);
                            if (allDominated) {
                                viz.screenText('Rouche condition satisfied: f+g has same zeros as f (3 zeros)', viz.width/2, 72, viz.colors.green, 12);
                            } else {
                                viz.screenText('Rouche condition NOT satisfied for this R', viz.width/2, 72, viz.colors.red, 12);
                            }

                            // Draw zeros of z^3 (at origin, order 3) and z^3 + 2z + 1
                            // Exact zeros of z^3+2z+1 computed numerically (approximate)
                            var fPlusGZeros = [[-0.226, 0.974], [-0.226, -0.974], [0.453, 0]];
                            fPlusGZeros.forEach(function(z0) {
                                if (Math.sqrt(z0[0]*z0[0]+z0[1]*z0[1]) < R) {
                                    var sc2 = viz.toScreen(z0[0], z0[1]);
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.beginPath();
                                    ctx.arc(sc2[0], sc2[1], 5, 0, 2*Math.PI);
                                    ctx.fill();
                                }
                            });

                            // f zeros
                            if (R > 0.1) {
                                var sc0 = viz.toScreen(0, 0);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(sc0[0]-7, sc0[1]-7); ctx.lineTo(sc0[0]+7, sc0[1]+7);
                                ctx.moveTo(sc0[0]+7, sc0[1]-7); ctx.lineTo(sc0[0]-7, sc0[1]+7);
                                ctx.stroke();
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            var leg = viz.height - 50;
                            ctx.fillText('\u00d7 = zeros of z\u00b3 (triple at 0)', 14, leg);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(14, leg+18, 10, 10);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText(' = zeros of z\u00b3+2z+1', 26, leg+23);
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use Rouche\'s Theorem to prove that \\(p(z) = z^5 + 3z^2 + 1\\) has all five zeros inside the disk \\(|z| < 2\\).',
                    hint: 'Take \\(f(z) = z^5\\) and \\(g(z) = 3z^2 + 1\\). On \\(|z|=2\\), bound \\(|g(z)|\\) and compare to \\(|f(z)| = 32\\).',
                    solution: 'On \\(|z|=2\\): \\(|f(z)| = 2^5 = 32\\). \\(|g(z)| \\leq 3 \\cdot 4 + 1 = 13 < 32 = |f(z)|\\). By Rouche, \\(p = f + g\\) has the same number of zeros inside \\(|z|=2\\) as \\(f(z) = z^5\\), which is 5 (counting multiplicity). So all five zeros of \\(p\\) lie in \\(|z| < 2\\).'
                },
                {
                    question: 'Let \\(f\\) be analytic inside and on \\(|z|=1\\), with \\(|f(z)| < 1\\) for \\(|z|=1\\). Show that \\(f\\) has exactly one fixed point in \\(|z| < 1\\), i.e., exactly one solution to \\(f(z) = z\\).',
                    hint: 'Apply Rouche to \\(g(z) = f(z) - z\\) on \\(|z|=1\\). Write \\(g = (-z) + f(z)\\) and note \\(|-z|=1 > |f(z)|\\) on \\(|z|=1\\).',
                    solution: 'Write \\(g(z) = -z + f(z)\\). Take \\(F(z) = -z\\) and \\(G(z) = f(z)\\). On \\(|z|=1\\): \\(|F(z)| = 1 > |f(z)| = |G(z)|\\) by hypothesis. By Rouche, \\(g = F + G\\) has the same number of zeros as \\(F(z) = -z\\), which is exactly one (at \\(z=0\\), but that is a zero of \\(-z\\) not \\(g\\)). More precisely, \\(-z\\) has one zero inside \\(|z|<1\\), so \\(g(z) = f(z)-z\\) has exactly one zero, i.e., \\(f\\) has exactly one fixed point.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Bridge
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Looking Ahead',
            content: `
<h2>Looking Ahead: Applications and Extensions</h2>

<p>The Residue Theorem is not the end of the story; it is the beginning of a set of powerful techniques that span real analysis, number theory, and physics.</p>

<h3>What You've Built</h3>
<ul>
    <li><strong>Residues:</strong> the coefficient \\(a_{-1}\\) in the Laurent expansion, extractable by limits or differentiation.</li>
    <li><strong>The Residue Theorem:</strong> \\(\\oint_\\gamma f\\,dz = 2\\pi i \\sum \\operatorname{Res}\\), reducing integration to algebra.</li>
    <li><strong>Argument Principle:</strong> \\(Z - P\\) from the winding number of \\(f(\\gamma)\\) around zero.</li>
    <li><strong>Rouche's Theorem:</strong> zero counting by comparing magnitudes on the boundary.</li>
</ul>

<h3>Chapter 12: Applications of Residues</h3>
<p>The next chapter uses residues to evaluate a family of definite integrals that resist elementary methods:</p>
<ul>
    <li>Integrals of rational functions over \\((−\\infty, \\infty)\\): close with a semicircle.</li>
    <li>Integrals involving \\(\\sin\\) and \\(\\cos\\): convert via \\(z = e^{i\\theta}\\) to a circle.</li>
    <li>Integrals with branch cuts (e.g., \\(x^{\\alpha}\\) for \\(\\alpha \\notin \\mathbb{Z}\\)): use keyhole contours.</li>
    <li>Summation of series via the cotangent kernel \\(\\pi \\cot(\\pi z)\\).</li>
</ul>

<div class="env-block example">
    <div class="env-title">Preview: A Non-Elementary Integral</div>
    <div class="env-body">
        <p>Residues give</p>
        \\[
        \\int_0^\\infty \\frac{x^{1/3}}{1+x^2}\\,dx = \\frac{\\pi}{2\\cos(\\pi/6)} = \\frac{\\pi}{\\sqrt{3}},
        \\]
        <p>a result that requires a keyhole contour with a branch cut along the positive real axis. No elementary technique computes this.</p>
    </div>
</div>

<h3>Deeper Connections</h3>

<p><strong>Partial fraction decomposition revisited:</strong> Every rational function equals the sum of its principal parts at each pole plus a polynomial. The principal part at \\(z_k\\) is completely determined by the Laurent expansion there. Residues are its top-level invariant.</p>

<p><strong>The Mittag-Leffler theorem:</strong> Any meromorphic function is determined (up to an entire function) by specifying its poles and principal parts. The Residue Theorem is what makes this constructive.</p>

<p><strong>The Riemann zeta function:</strong> The celebrated formula</p>
\\[
\\zeta(s) = \\sum_{n=1}^\\infty \\frac{1}{n^s}
\\]
<p>extends to a meromorphic function on \\(\\mathbb{C}\\) with a single simple pole at \\(s=1\\) with residue 1. Contour integrals involving \\(\\zeta\\) and the Residue Theorem are central to the proof of the Prime Number Theorem.</p>

<div class="env-block remark">
    <div class="env-title">A Philosophical Note</div>
    <div class="env-body">
        <p>Why does a complex contour integral encode something as concrete as a real definite integral or a count of zeros? The answer is that analytic functions are extraordinarily rigid: knowing \\(f\\) on any open set determines \\(f\\) everywhere on its domain. Contour integrals exploit this rigidity. They are not just a computational device; they are a window into the global structure of analytic functions.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-zero-counting"></div>
`,
            visualizations: [
                {
                    id: 'viz-zero-counting',
                    title: 'Zero Counting via Domain Coloring',
                    description: 'Domain coloring of a polynomial. Each time the hue cycles through a full rotation inside a contour, it counts one zero. Trace the argument change as the contour moves.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 420, scale: 60, originX: 280, originY: 210 });

                        var polys = [
                            {
                                label: 'z\u00b3\u22123z+2',
                                fn: function(re, im) {
                                    // z^3 - 3z + 2 = (z-1)^2(z+2)
                                    var r3 = [re*re*re - 3*re*im*im - 3*re + 2, 3*re*re*im - im*im*im - 3*im];
                                    return r3;
                                },
                                zeros: [[1, 0], [1, 0], [-2, 0]],
                                desc: '(z\u22121)\u00b2(z+2): double zero at 1, simple at \u22122'
                            },
                            {
                                label: 'z\u2074+1',
                                fn: function(re, im) {
                                    var r2 = [re*re - im*im, 2*re*im];
                                    var r4 = [r2[0]*r2[0] - r2[1]*r2[1] + 1, 2*r2[0]*r2[1]];
                                    return r4;
                                },
                                zeros: [[Math.cos(Math.PI/4), Math.sin(Math.PI/4)],
                                        [Math.cos(3*Math.PI/4), Math.sin(3*Math.PI/4)],
                                        [Math.cos(5*Math.PI/4), Math.sin(5*Math.PI/4)],
                                        [Math.cos(7*Math.PI/4), Math.sin(7*Math.PI/4)]],
                                desc: 'Four simple zeros (4th roots of \u22121)'
                            }
                        ];

                        var sel = 0;
                        var contourR = 1.5;

                        var row = document.createElement('div');
                        row.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px;';
                        polys.forEach(function(p, i) {
                            var b = document.createElement('button');
                            b.textContent = 'p(z)=' + p.label;
                            b.style.cssText = 'padding:3px 10px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.75rem;cursor:pointer;';
                            b.addEventListener('click', function() {
                                sel = i;
                                row.querySelectorAll('button').forEach(function(b2,j){ b2.style.background=j===i?'#2a2a60':'#1a1a40'; b2.style.borderColor=j===i?'#58a6ff':'#30363d'; });
                                draw();
                            });
                            if (i===0){b.style.background='#2a2a60'; b.style.borderColor='#58a6ff';}
                            row.appendChild(b);
                        });
                        controls.appendChild(row);

                        VizEngine.createSlider(controls, 'Contour R', 0.3, 2.8, contourR, 0.05, function(v) {
                            contourR = v; draw();
                        });

                        function draw() {
                            viz.clear();
                            var xR = [-4.7, 4.7], yR = [-3.5, 3.5];
                            viz.drawDomainColoring(polys[sel].fn, xR, yR);
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw contour
                            ctx.strokeStyle = '#ffffff';
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            ctx.arc(viz.toScreen(0,0)[0], viz.toScreen(0,0)[1], contourR * viz.scale, 0, 2*Math.PI);
                            ctx.stroke();

                            // Count zeros inside contour
                            var p = polys[sel];
                            var zerosInside = p.zeros.filter(function(z0) {
                                return Math.sqrt(z0[0]*z0[0]+z0[1]*z0[1]) < contourR;
                            }).length;

                            // Mark zeros
                            p.zeros.forEach(function(z0) {
                                var sc = viz.toScreen(z0[0], z0[1]);
                                var inside = Math.sqrt(z0[0]*z0[0]+z0[1]*z0[1]) < contourR;
                                ctx.fillStyle = inside ? viz.colors.white : viz.colors.text;
                                ctx.beginPath();
                                ctx.arc(sc[0], sc[1], 5, 0, 2*Math.PI);
                                ctx.fill();
                                ctx.strokeStyle = '#000';
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            });

                            // Info overlay
                            ctx.fillStyle = '#0c0c2099';
                            ctx.beginPath();
                            ctx.roundRect(8, viz.height - 68, viz.width-16, 56, 6);
                            ctx.fill();
                            viz.screenText('p(z) = ' + p.label + '  |  ' + p.desc, viz.width/2, viz.height-52, viz.colors.text, 11);
                            viz.screenText('Zeros inside |z|=' + contourR.toFixed(2) + ':  ' + zerosInside, viz.width/2, viz.height - 30, viz.colors.white, 14);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\displaystyle\\int_{-\\infty}^{\\infty} \\frac{x^2}{(x^2+1)(x^2+4)}\\,dx\\) using the Residue Theorem.',
                    hint: 'Close in the upper half-plane. The poles in the upper half-plane are \\(z=i\\) and \\(z=2i\\). Use partial fractions or the quotient formula to find the residues.',
                    solution: 'Let \\(f(z) = z^2/((z^2+1)(z^2+4))\\). Poles in UHP: \\(z=i\\) (from \\(z^2+1\\)) and \\(z=2i\\) (from \\(z^2+4\\)). Res at \\(i\\): \\(\\frac{i^2}{2i\\cdot(i^2+4)} = \\frac{-1}{2i\\cdot 3} = \\frac{-1}{6i} = \\frac{i}{6}\\). Res at \\(2i\\): \\(\\frac{(2i)^2}{((2i)^2+1)\\cdot 4i} = \\frac{-4}{(-3)\\cdot 4i} = \\frac{1}{3i} = \\frac{-i}{3}\\). Sum of residues: \\(i/6 - i/3 = -i/6\\). Integral: \\(2\\pi i \\cdot(-i/6) = \\pi/3\\).'
                },
                {
                    question: 'Use Rouche\'s Theorem to count the zeros of \\(f(z) = z^4 - 6z + 3\\) in \\(|z| < 2\\).',
                    hint: 'On \\(|z|=2\\), try \\(F(z) = -6z\\) and bound \\(|z^4 + 3|\\). Alternatively, try \\(F(z) = z^4\\) and bound \\(|-6z+3|\\).',
                    solution: 'Use \\(F(z) = z^4\\) and \\(G(z) = -6z+3\\). On \\(|z|=2\\): \\(|F|=16\\), \\(|G| \\leq 12+3=15 < 16\\). By Rouche, \\(f = F+G\\) has 4 zeros inside \\(|z|<2\\), the same as \\(z^4\\). On \\(|z|=1\\): \\(|-6z+3| \\geq 6-3=3 > 1+1=|z^4+3|\\)... actually use \\(F=-6z\\), \\(|F|=6\\), \\(|z^4+3|\\leq 1+3=4 < 6\\). So \\(f\\) has the same zeros as \\(-6z\\) inside \\(|z|<1\\), which is 1 zero. Thus exactly 1 zero is in \\(|z|<1\\) and 3 more in \\(1 \\leq |z| < 2\\), for 4 total in \\(|z|<2\\).'
                },
                {
                    question: 'Verify the Argument Principle directly: for \\(f(z) = z^2\\) and \\(\\gamma = \\{|z|=1\\}\\), compute \\(\\frac{1}{2\\pi i}\\oint_\\gamma \\frac{f\'(z)}{f(z)}\\,dz\\) and confirm it equals \\(Z - P = 2\\).',
                    hint: 'Parametrize \\(\\gamma\\) by \\(z = e^{i\\theta}\\), \\(0 \\leq \\theta \\leq 2\\pi\\). Then \\(f\'(z)/f(z) = 2/z\\).',
                    solution: '\\(f\'(z)/f(z) = 2z/z^2 = 2/z\\). Then \\(\\oint_\\gamma \\frac{f\'}{f}\\,dz = \\oint_{|z|=1} \\frac{2}{z}\\,dz = 2 \\cdot 2\\pi i = 4\\pi i\\). Dividing by \\(2\\pi i\\): \\(4\\pi i / (2\\pi i) = 2\\). Since \\(f(z)=z^2\\) has a zero of order 2 at \\(z=0\\) inside \\(|z|=1\\) and no poles, \\(Z-P = 2-0 = 2\\). \\(\\checkmark\\)'
                }
            ]
        }
    ]
});
