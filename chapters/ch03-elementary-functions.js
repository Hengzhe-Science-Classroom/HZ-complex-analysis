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
            title: 'Why Elementary Functions Change',
            content: `
<h2>Why Elementary Functions Change</h2>

<div class="env-block intuition">
    <div class="env-title">A Familiar Landscape, Rearranged</div>
    <div class="env-body">
        <p>You already know \\(e^x\\), \\(\\ln x\\), \\(\\sin x\\), and \\(\\cos x\\). In real analysis these are tidy, well-separated creatures: the exponential is always positive and monotonically increasing; the logarithm is defined only for \\(x > 0\\); sine and cosine oscillate between \\(-1\\) and \\(1\\). Moving to the complex plane upends every one of these properties.</p>
    </div>
</div>

<p>The source of the upheaval is a single identity that ties together the exponential and trigonometric functions:</p>

\\[
e^{i\\theta} = \\cos\\theta + i\\sin\\theta.
\\]

<p>This is Euler's formula, which we met briefly in Chapter 0. In this chapter we take it seriously as a <em>definition</em> and follow its consequences:</p>

<ul>
    <li><strong>The exponential \\(e^z\\)</strong> becomes periodic (with period \\(2\\pi i\\)), so it is no longer injective. It maps horizontal strips onto the punctured plane.</li>
    <li><strong>The logarithm \\(\\log z\\)</strong> must "undo" a periodic function, so it becomes multi-valued. Choosing a single-valued branch forces a branch cut, and the natural domain is a Riemann surface.</li>
    <li><strong>Complex powers \\(z^\\alpha\\)</strong> are defined via \\(e^{\\alpha \\log z}\\) and inherit the multi-valuedness of the logarithm.</li>
    <li><strong>Trigonometric functions</strong> are no longer bounded: \\(\\cos(iy) = \\cosh y \\to \\infty\\) as \\(y \\to \\infty\\). They connect directly to the hyperbolic functions.</li>
</ul>

<p>We will build each of these from the exponential, using Euler's formula as the central link. The theme is: <em>extending real functions to the complex plane reveals hidden structure, but at the cost of single-valuedness</em>.</p>

<h3>What We Need from Earlier Chapters</h3>

<p>We assume familiarity with:</p>
<ol>
    <li>The polar form \\(z = re^{i\\theta}\\) and the argument \\(\\arg z\\) (Chapter 0).</li>
    <li>The Cauchy-Riemann equations and analyticity (Chapter 2).</li>
    <li>Domain coloring as a tool for visualizing complex functions (Chapter 1).</li>
</ol>

<div class="env-block remark">
    <div class="env-title">Historical Note</div>
    <div class="env-body">
        <p>Euler published the formula \\(e^{i\\theta} = \\cos\\theta + i\\sin\\theta\\) in 1748 in the <em>Introductio in analysin infinitorum</em>, though Roger Cotes had stated a related result in 1714. The systematic study of the complex logarithm and its branches was carried out by Bernoulli, Euler, and later Riemann, whose surface concept (1851 dissertation) finally resolved the multi-valuedness problem geometrically.</p>
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
        <p>For \\(z = x + iy\\), we define</p>
        \\[
        e^z = e^x(\\cos y + i\\sin y).
        \\]
        <p>Equivalently, \\(e^z = e^x e^{iy}\\), where \\(e^{iy}\\) is given by Euler's formula.</p>
    </div>
</div>

<p>This definition is the <em>only</em> continuous extension of the real exponential that preserves the law \\(e^{z+w} = e^z e^w\\). Let us record the basic properties.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.1 (Properties of \\(e^z\\))</div>
    <div class="env-body">
        <ol>
            <li><strong>Analyticity:</strong> \\(e^z\\) is entire (analytic on all of \\(\\mathbb{C}\\)), and \\(\\frac{d}{dz}e^z = e^z\\).</li>
            <li><strong>Non-vanishing:</strong> \\(e^z \\neq 0\\) for all \\(z \\in \\mathbb{C}\\).</li>
            <li><strong>Modulus and argument:</strong> \\(|e^z| = e^x\\) and \\(\\arg(e^z) = y + 2\\pi k\\).</li>
            <li><strong>Periodicity:</strong> \\(e^{z + 2\\pi i} = e^z\\) for all \\(z\\). The period is \\(2\\pi i\\).</li>
            <li><strong>Mapping:</strong> The horizontal strip \\(\\{x + iy : -\\infty < x < \\infty,\\; \\alpha < y < \\alpha + 2\\pi\\}\\) maps bijectively onto \\(\\mathbb{C} \\setminus \\{0\\}\\).</li>
        </ol>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Proof sketch</div>
    <div class="env-body">
        <p>Write \\(u = e^x \\cos y\\), \\(v = e^x \\sin y\\). Then \\(u_x = e^x \\cos y = v_y\\) and \\(u_y = -e^x \\sin y = -v_x\\), so the Cauchy-Riemann equations hold everywhere. The derivative is \\(u_x + iv_x = e^x\\cos y + ie^x\\sin y = e^z\\).</p>
        <p>For non-vanishing: \\(|e^z| = e^x > 0\\).</p>
        <p>For periodicity: \\(e^{z+2\\pi i} = e^x e^{i(y+2\\pi)} = e^x(\\cos(y+2\\pi) + i\\sin(y+2\\pi)) = e^x(\\cos y + i\\sin y) = e^z\\).</p>
    </div>
    <div class="qed">&#9646;</div>
</div>

<div class="env-block example">
    <div class="env-title">Example: Computing \\(e^z\\)</div>
    <div class="env-body">
        <p>Let \\(z = 1 + i\\pi/3\\). Then</p>
        \\[
        e^z = e^1\\bigl(\\cos\\tfrac{\\pi}{3} + i\\sin\\tfrac{\\pi}{3}\\bigr) = e\\bigl(\\tfrac{1}{2} + i\\tfrac{\\sqrt{3}}{2}\\bigr) = \\tfrac{e}{2} + i\\tfrac{e\\sqrt{3}}{2}.
        \\]
        <p>The modulus is \\(|e^z| = e \\approx 2.718\\) and the argument is \\(\\pi/3\\).</p>
    </div>
</div>

<h3>The Mapping \\(w = e^z\\)</h3>

<p>Since \\(|e^z| = e^x\\), vertical lines \\(x = c\\) map to circles \\(|w| = e^c\\). Since \\(\\arg(e^z) = y\\), horizontal lines \\(y = c\\) map to rays from the origin at angle \\(c\\). The rectangular grid in the \\(z\\)-plane becomes a polar grid in the \\(w\\)-plane.</p>

<p>Because \\(e^z\\) is \\(2\\pi i\\)-periodic, it is not injective on \\(\\mathbb{C}\\). Any horizontal strip of height \\(2\\pi\\) serves as a <em>fundamental domain</em>: inside such a strip, \\(e^z\\) is a bijection onto \\(\\mathbb{C} \\setminus \\{0\\}\\).</p>

<div class="viz-placeholder" data-viz="viz-exp-domain-coloring"></div>
`,
            visualizations: [
                {
                    id: 'viz-exp-domain-coloring',
                    title: 'Domain Coloring of e^z',
                    description: 'The left panel shows the identity map (the z-plane), and the right panel shows w = e^z. Notice how the horizontal strip of height 2pi covers the entire w-plane exactly once. Vertical lines map to circles, horizontal lines to rays.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 280 });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var hw = Math.floor(viz.width / 2);

                            // Left panel: identity (z-plane)
                            var imgL = ctx.createImageData(hw, viz.height);
                            var dL = imgL.data;
                            for (var py = 0; py < viz.height; py++) {
                                for (var px = 0; px < hw; px++) {
                                    var re = -4 + 8 * px / hw;
                                    var im = 4 - 8 * py / viz.height;
                                    var arg = Math.atan2(im, re);
                                    var mag = Math.sqrt(re * re + im * im);
                                    var hue = (arg / Math.PI + 1) / 2;
                                    var light = 1 - 1 / (1 + mag * 0.3);
                                    var rgb = VizEngine.hslToRgb(hue, 0.8, light);
                                    var idx = (py * hw + px) * 4;
                                    dL[idx] = rgb[0]; dL[idx+1] = rgb[1]; dL[idx+2] = rgb[2]; dL[idx+3] = 255;
                                }
                            }
                            ctx.putImageData(imgL, 0, 0);

                            // Right panel: e^z
                            var imgR = ctx.createImageData(hw, viz.height);
                            var dR = imgR.data;
                            for (var py2 = 0; py2 < viz.height; py2++) {
                                for (var px2 = 0; px2 < hw; px2++) {
                                    var re2 = -4 + 8 * px2 / hw;
                                    var im2 = 4 - 8 * py2 / viz.height;
                                    // e^z = e^x (cos y + i sin y)
                                    var ex = Math.exp(re2);
                                    var u = ex * Math.cos(im2);
                                    var v = ex * Math.sin(im2);
                                    var arg2 = Math.atan2(v, u);
                                    var mag2 = Math.sqrt(u * u + v * v);
                                    var hue2 = (arg2 / Math.PI + 1) / 2;
                                    var light2 = 1 - 1 / (1 + mag2 * 0.3);
                                    var rgb2 = VizEngine.hslToRgb(hue2, 0.8, light2);
                                    var idx2 = (py2 * hw + px2) * 4;
                                    dR[idx2] = rgb2[0]; dR[idx2+1] = rgb2[1]; dR[idx2+2] = rgb2[2]; dR[idx2+3] = 255;
                                }
                            }
                            ctx.putImageData(imgR, hw, 0);

                            // Divider
                            ctx.strokeStyle = '#ffffff44';
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(hw, 0); ctx.lineTo(hw, viz.height); ctx.stroke();

                            // Labels
                            ctx.fillStyle = '#ffffffcc';
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('z-plane (identity)', hw / 2, 18);
                            ctx.fillText('w = e^z', hw + hw / 2, 18);

                            // Mark 2pi strip on left
                            var stripTop = viz.height / 2 - viz.height * Math.PI / 8;
                            var stripBot = viz.height / 2 + viz.height * Math.PI / 8;
                            ctx.strokeStyle = '#ffffff88';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath(); ctx.moveTo(0, stripTop); ctx.lineTo(hw, stripTop); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(0, stripBot); ctx.lineTo(hw, stripBot); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('y = pi', 4, stripTop - 4);
                            ctx.fillText('y = -pi', 4, stripBot + 12);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find all \\(z \\in \\mathbb{C}\\) such that \\(e^z = -1\\).',
                    hint: 'Write \\(-1 = e^0 \\cdot e^{i\\pi}\\). What values of \\(x + iy\\) give \\(e^x = 1\\) and \\(y = \\pi + 2\\pi k\\)?',
                    solution: 'We need \\(e^x = 1\\) and \\(y = \\pi + 2k\\pi\\), so \\(x = 0\\). The solutions are \\(z = i(2k+1)\\pi\\) for \\(k \\in \\mathbb{Z}\\).'
                },
                {
                    question: 'Show that \\(e^z\\) is not injective on \\(\\mathbb{C}\\), but is injective on any horizontal strip of height less than \\(2\\pi\\).',
                    hint: 'If \\(e^{z_1} = e^{z_2}\\), what can you say about \\(z_1 - z_2\\)?',
                    solution: '\\(e^{z_1} = e^{z_2}\\) iff \\(e^{z_1 - z_2} = 1\\) iff \\(z_1 - z_2 = 2k\\pi i\\) for some \\(k \\in \\mathbb{Z}\\). So \\(e^z\\) is injective iff \\(z_1, z_2\\) in the strip means \\(|y_1 - y_2| < 2\\pi\\), which forces \\(k = 0\\).'
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

<div class="env-block intuition">
    <div class="env-title">Inverting a Periodic Function</div>
    <div class="env-body">
        <p>The real logarithm is the inverse of the real exponential, and the real exponential is injective, so \\(\\ln x\\) is single-valued. But the complex exponential is periodic with period \\(2\\pi i\\), so its "inverse" is necessarily multi-valued: if \\(e^w = z\\), then \\(e^{w + 2k\\pi i} = z\\) for every integer \\(k\\). The complex logarithm must account for all these values.</p>
    </div>
</div>

<div class="env-block definition">
    <div class="env-title">Definition 3.2 (Complex Logarithm)</div>
    <div class="env-body">
        <p>For \\(z \\neq 0\\), the <strong>complex logarithm</strong> is the multi-valued function</p>
        \\[
        \\log z = \\ln|z| + i\\arg z = \\ln|z| + i(\\theta + 2k\\pi), \\quad k \\in \\mathbb{Z},
        \\]
        <p>where \\(\\theta\\) is any particular value of \\(\\arg z\\).</p>
    </div>
</div>

<p>Each integer \\(k\\) gives a different <em>branch</em> of the logarithm. The values differ by integer multiples of \\(2\\pi i\\), arranged in a discrete vertical lattice in the \\(w\\)-plane.</p>

<h3>The Principal Branch</h3>

<div class="env-block definition">
    <div class="env-title">Definition 3.3 (Principal Logarithm)</div>
    <div class="env-body">
        <p>The <strong>principal value</strong> of the logarithm is</p>
        \\[
        \\operatorname{Log} z = \\ln|z| + i\\operatorname{Arg} z,
        \\]
        <p>where \\(\\operatorname{Arg} z \\in (-\\pi, \\pi]\\) is the principal argument. This is analytic on \\(\\mathbb{C} \\setminus (-\\infty, 0]\\), the complex plane with the non-positive real axis removed.</p>
    </div>
</div>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.2 (Properties of Log)</div>
    <div class="env-body">
        <ol>
            <li>\\(\\operatorname{Log} z\\) is analytic on \\(\\mathbb{C} \\setminus (-\\infty, 0]\\) with derivative \\(\\frac{d}{dz}\\operatorname{Log} z = \\frac{1}{z}\\).</li>
            <li>\\(e^{\\operatorname{Log} z} = z\\) for all \\(z \\neq 0\\).</li>
            <li>\\(\\operatorname{Log}(e^z) = z\\) only when \\(\\operatorname{Im}(z) \\in (-\\pi, \\pi]\\).</li>
            <li>\\(\\operatorname{Log}(z_1 z_2) = \\operatorname{Log} z_1 + \\operatorname{Log} z_2\\) may fail when arguments add past the branch cut.</li>
        </ol>
    </div>
</div>

<h3>Branch Cuts and Continuity</h3>

<p>The branch cut \\((-\\infty, 0]\\) is where \\(\\operatorname{Log}\\) is discontinuous. Approaching the negative real axis from above gives \\(\\operatorname{Arg} z \\to \\pi\\); from below gives \\(\\operatorname{Arg} z \\to -\\pi\\). The jump is \\(2\\pi i\\).</p>

<p>There is nothing sacred about this particular cut. We can place the cut along any ray from the origin and define a branch of \\(\\log\\) that is analytic on the complement. The standard choice \\((-\\infty, 0]\\) is merely conventional.</p>

<div class="env-block example">
    <div class="env-title">Example: Multi-valuedness in Action</div>
    <div class="env-body">
        <p>Consider \\(\\log(-1)\\). We have \\(|-1| = 1\\) and \\(\\arg(-1) = \\pi + 2k\\pi\\), so</p>
        \\[
        \\log(-1) = i(2k+1)\\pi, \\quad k \\in \\mathbb{Z}.
        \\]
        <p>The principal value is \\(\\operatorname{Log}(-1) = i\\pi\\), recovering Euler's identity \\(e^{i\\pi} = -1\\).</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-log-branches"></div>
<div class="viz-placeholder" data-viz="viz-log-riemann-surface"></div>
`,
            visualizations: [
                {
                    id: 'viz-log-branches',
                    title: 'Branches of log z',
                    description: 'Drag the point z around the origin. As z crosses the branch cut (shown as a red ray), the value of Log z jumps by 2pi i. Use the slider to rotate the branch cut.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, scale: 60 });

                        var cutAngle = Math.PI; // branch cut angle (default: negative real axis)
                        VizEngine.createSlider(controls, 'Cut angle', -3.14, 3.14, cutAngle, 0.1, function(v) {
                            cutAngle = parseFloat(v);
                        });

                        var zDrag = viz.addDraggable('z', 1.5, 1, viz.colors.blue, 8);

                        function branchArg(x, y, cutAng) {
                            // Argument in [cutAng, cutAng + 2pi)
                            var a = Math.atan2(y, x);
                            while (a < cutAng) a += 2 * Math.PI;
                            while (a >= cutAng + 2 * Math.PI) a -= 2 * Math.PI;
                            return a;
                        }

                        function drawFrame() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw branch cut ray
                            var rayLen = 12;
                            var rx = Math.cos(cutAngle), ry = Math.sin(cutAngle);
                            var sx0 = viz.originX, sy0 = viz.originY;
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(sx0, sy0);
                            ctx.lineTo(sx0 + rx * rayLen * viz.scale, sy0 - ry * rayLen * viz.scale);
                            ctx.stroke();

                            // Branch cut label
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var lx = sx0 + rx * 3 * viz.scale;
                            var ly = sy0 - ry * 3 * viz.scale;
                            ctx.fillText('branch cut', lx, ly - 10);

                            // Compute log z for each branch k = -1, 0, 1
                            var zx = zDrag.x, zy = zDrag.y;
                            var r = Math.sqrt(zx * zx + zy * zy);
                            if (r < 0.01) r = 0.01;
                            var theta = branchArg(zx, zy, cutAngle - 2 * Math.PI);

                            // Draw z point
                            viz.drawPoint(zx, zy, viz.colors.blue, 'z', 6);

                            // Show branches
                            var infoY = 20;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('z = ' + zx.toFixed(2) + ' + ' + zy.toFixed(2) + 'i', 10, infoY);
                            ctx.fillText('|z| = ' + r.toFixed(3), 10, infoY + 18);

                            var branchColors = [viz.colors.teal, viz.colors.orange, viz.colors.purple];
                            var labels = ['k = -1', 'k = 0 (principal)', 'k = 1'];
                            for (var k = -1; k <= 1; k++) {
                                var logRe = Math.log(r);
                                var logIm = theta + 2 * k * Math.PI;
                                var col = branchColors[k + 1];
                                ctx.fillStyle = col;
                                ctx.fillText(labels[k+1] + ': log z = ' + logRe.toFixed(3) + ' + ' + logIm.toFixed(3) + 'i', 10, infoY + 40 + (k + 1) * 18);
                            }

                            viz.drawDraggables();
                        }

                        viz.animate(function() { drawFrame(); });
                        return viz;
                    }
                },
                {
                    id: 'viz-log-riemann-surface',
                    title: 'Riemann Surface of log z (Stacked Sheets)',
                    description: 'The Riemann surface of log z is an infinite helicoid. Here we show three sheets (k = -1, 0, 1) stacked vertically. Each sheet covers one full 2pi of argument. Points on different sheets with the same projection correspond to different branches.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 380, originX: 0, originY: 0, scale: 1 });

                        var rotAngle = 0.4;
                        VizEngine.createSlider(controls, 'Rotate view', -1.5, 1.5, rotAngle, 0.05, function(v) {
                            rotAngle = parseFloat(v);
                            draw();
                        });

                        var sheetColors = ['#3fb9a066', '#58a6ff66', '#bc8cff66'];
                        var sheetEdge = ['#3fb9a0', '#58a6ff', '#bc8cff'];

                        function project3D(x, y, z) {
                            // Simple oblique projection with rotation
                            var cosA = Math.cos(rotAngle), sinA = Math.sin(rotAngle);
                            var px = x * cosA - y * sinA;
                            var py = -x * sinA * 0.4 - y * cosA * 0.4 + z;
                            return [280 + px * 60, 300 - py * 40];
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Riemann Surface of log z', viz.width / 2, 18, viz.colors.white, 15);

                            // Draw three sheets from bottom to top
                            for (var k = -1; k <= 1; k++) {
                                var sheetIdx = k + 1;
                                var zOff = k * 2.5;

                                // Draw sheet as a grid of radial lines and circles
                                ctx.strokeStyle = sheetEdge[sheetIdx];
                                ctx.lineWidth = 0.8;

                                // Radial lines
                                var nRays = 24;
                                for (var j = 0; j < nRays; j++) {
                                    var angle = (j / nRays) * 2 * Math.PI;
                                    ctx.beginPath();
                                    for (var rr = 0.3; rr <= 3; rr += 0.15) {
                                        var xx = rr * Math.cos(angle);
                                        var yy = rr * Math.sin(angle);
                                        // Height on helicoidal surface: proportional to angle + 2pi*k
                                        var hh = zOff + angle / (2 * Math.PI) * 2.5;
                                        var sp = project3D(xx, yy, hh);
                                        if (rr < 0.35) ctx.moveTo(sp[0], sp[1]);
                                        else ctx.lineTo(sp[0], sp[1]);
                                    }
                                    ctx.stroke();
                                }

                                // Concentric circles at fixed radii
                                var radii = [0.5, 1.0, 1.5, 2.0, 2.5];
                                for (var ri = 0; ri < radii.length; ri++) {
                                    var rad = radii[ri];
                                    ctx.strokeStyle = sheetColors[sheetIdx];
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    for (var t = 0; t <= 64; t++) {
                                        var ang = (t / 64) * 2 * Math.PI;
                                        var xc = rad * Math.cos(ang);
                                        var yc = rad * Math.sin(ang);
                                        var hc = zOff + ang / (2 * Math.PI) * 2.5;
                                        var sc = project3D(xc, yc, hc);
                                        if (t === 0) ctx.moveTo(sc[0], sc[1]);
                                        else ctx.lineTo(sc[0], sc[1]);
                                    }
                                    ctx.stroke();
                                }

                                // Label
                                var lp = project3D(-3.5, 0, zOff + 1.25);
                                ctx.fillStyle = sheetEdge[sheetIdx];
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'right';
                                ctx.textBaseline = 'middle';
                                ctx.fillText('k = ' + k, lp[0], lp[1]);
                            }

                            // Draw central axis
                            var axBot = project3D(0, 0, -4);
                            var axTop = project3D(0, 0, 6);
                            ctx.strokeStyle = viz.colors.red + '88';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath(); ctx.moveTo(axBot[0], axBot[1]); ctx.lineTo(axTop[0], axTop[1]); ctx.stroke();
                            ctx.setLineDash([]);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('origin (branch point)', axTop[0], axTop[1] - 8);
                        }

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute all values of \\(\\log(1+i)\\).',
                    hint: 'First find \\(|1+i|\\) and \\(\\arg(1+i)\\).',
                    solution: '\\(|1+i| = \\sqrt{2}\\), \\(\\arg(1+i) = \\pi/4 + 2k\\pi\\). So \\(\\log(1+i) = \\frac{1}{2}\\ln 2 + i\\bigl(\\frac{\\pi}{4} + 2k\\pi\\bigr)\\), \\(k \\in \\mathbb{Z}\\). The principal value is \\(\\operatorname{Log}(1+i) = \\frac{1}{2}\\ln 2 + i\\frac{\\pi}{4}\\).'
                },
                {
                    question: 'Find \\(z_1, z_2\\) such that \\(\\operatorname{Log}(z_1 z_2) \\neq \\operatorname{Log} z_1 + \\operatorname{Log} z_2\\).',
                    hint: 'Try \\(z_1 = z_2 = -1 + i\\epsilon\\) for small \\(\\epsilon > 0\\), or more directly, \\(z_1 = z_2 = e^{i \\cdot 3\\pi/4}\\).',
                    solution: 'Let \\(z_1 = z_2 = e^{i3\\pi/4}\\). Then \\(\\operatorname{Log} z_1 = i3\\pi/4\\) and \\(\\operatorname{Log} z_1 + \\operatorname{Log} z_2 = i3\\pi/2\\). But \\(z_1 z_2 = e^{i3\\pi/2} = e^{-i\\pi/2}\\), so \\(\\operatorname{Log}(z_1 z_2) = -i\\pi/2 \\neq i3\\pi/2\\). The discrepancy is \\(2\\pi i\\).'
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
<h2>Complex Powers \\(z^\\alpha\\)</h2>

<div class="env-block definition">
    <div class="env-title">Definition 3.4 (Complex Power)</div>
    <div class="env-body">
        <p>For \\(z \\neq 0\\) and \\(\\alpha \\in \\mathbb{C}\\), we define</p>
        \\[
        z^\\alpha = e^{\\alpha \\log z}.
        \\]
        <p>Since \\(\\log z\\) is multi-valued, \\(z^\\alpha\\) is in general multi-valued. Its values are</p>
        \\[
        z^\\alpha = e^{\\alpha(\\ln|z| + i\\arg z)} = e^{\\alpha(\\ln|z| + i\\theta + 2k\\pi i\\alpha)}, \\quad k \\in \\mathbb{Z}.
        \\]
    </div>
</div>

<h3>Special Cases</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.3 (Number of Values of \\(z^\\alpha\\))</div>
    <div class="env-body">
        <ol>
            <li>If \\(\\alpha = n \\in \\mathbb{Z}\\), then \\(z^n\\) is single-valued (the factors \\(e^{2k\\pi i n}\\) all equal 1).</li>
            <li>If \\(\\alpha = p/q\\) is rational (in lowest terms, \\(q > 0\\)), then \\(z^{p/q}\\) has exactly \\(q\\) distinct values, equally spaced on a circle of radius \\(|z|^{p/q}\\).</li>
            <li>If \\(\\alpha\\) is irrational or non-real, then \\(z^\\alpha\\) has infinitely many values.</li>
        </ol>
    </div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(i^i\\)</div>
    <div class="env-body">
        <p>We have \\(i = e^{i\\pi/2}\\), so \\(\\log i = i(\\pi/2 + 2k\\pi)\\). Then</p>
        \\[
        i^i = e^{i \\log i} = e^{i \\cdot i(\\pi/2 + 2k\\pi)} = e^{-(\\pi/2 + 2k\\pi)}.
        \\]
        <p>All values are <em>real</em>. The principal value (\\(k = 0\\)) is \\(e^{-\\pi/2} \\approx 0.2079\\).</p>
    </div>
</div>

<h3>The Principal Power</h3>

<p>Using the principal logarithm, the <strong>principal value</strong> of \\(z^\\alpha\\) is</p>
\\[
z^\\alpha_{\\text{pv}} = e^{\\alpha \\operatorname{Log} z}.
\\]
<p>This is analytic on \\(\\mathbb{C} \\setminus (-\\infty, 0]\\) with derivative</p>
\\[
\\frac{d}{dz}z^\\alpha = \\alpha z^{\\alpha - 1}
\\]
<p>(the familiar power rule, now valid for complex \\(\\alpha\\)).</p>

<div class="viz-placeholder" data-viz="viz-complex-power"></div>
`,
            visualizations: [
                {
                    id: 'viz-complex-power',
                    title: 'Domain Coloring of z^alpha',
                    description: 'Adjust the exponent alpha (real part) to see how the domain coloring of z^alpha changes. For alpha = 1/2 you see the square root (2 sheets); for alpha = 1/3, the cube root (3 sheets); for irrational alpha, infinitely many.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 340 });

                        var alphaRe = 0.5;
                        var alphaIm = 0;
                        VizEngine.createSlider(controls, 'Re(alpha)', -2, 3, alphaRe, 0.1, function(v) {
                            alphaRe = parseFloat(v); draw();
                        });
                        VizEngine.createSlider(controls, 'Im(alpha)', -2, 2, alphaIm, 0.1, function(v) {
                            alphaIm = parseFloat(v); draw();
                        });

                        function draw() {
                            var ctx = viz.ctx;
                            var pw = viz.width, ph = viz.height;
                            var imgData = ctx.createImageData(pw, ph);
                            var data = imgData.data;

                            for (var py = 0; py < ph; py++) {
                                for (var px = 0; px < pw; px++) {
                                    var re = -3 + 6 * px / pw;
                                    var im = 3 - 6 * py / ph;
                                    var r = Math.sqrt(re * re + im * im);
                                    if (r < 1e-10) {
                                        var idx = (py * pw + px) * 4;
                                        data[idx] = 0; data[idx+1] = 0; data[idx+2] = 0; data[idx+3] = 255;
                                        continue;
                                    }
                                    var theta = Math.atan2(im, re);
                                    // z^alpha = exp(alpha * log z)
                                    // alpha * log z = (aR + i*aI) * (ln r + i*theta)
                                    //   = (aR*ln r - aI*theta) + i*(aI*ln r + aR*theta)
                                    var logR = Math.log(r);
                                    var wRe = alphaRe * logR - alphaIm * theta;
                                    var wIm = alphaIm * logR + alphaRe * theta;
                                    var eR = Math.exp(wRe);
                                    var u = eR * Math.cos(wIm);
                                    var v = eR * Math.sin(wIm);
                                    var arg = Math.atan2(v, u);
                                    var mag = Math.sqrt(u * u + v * v);
                                    var hue = (arg / Math.PI + 1) / 2;
                                    var light = 1 - 1 / (1 + mag * 0.3);
                                    var rgb = VizEngine.hslToRgb(hue, 0.8, light);
                                    var idx2 = (py * pw + px) * 4;
                                    data[idx2] = rgb[0]; data[idx2+1] = rgb[1]; data[idx2+2] = rgb[2]; data[idx2+3] = 255;
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);

                            // Label
                            ctx.fillStyle = '#ffffffcc';
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var label = 'z^(' + alphaRe.toFixed(1);
                            if (alphaIm !== 0) label += (alphaIm >= 0 ? ' + ' : ' - ') + Math.abs(alphaIm).toFixed(1) + 'i';
                            label += ')';
                            ctx.fillText(label, pw / 2, 18);

                            // Mark branch cut
                            ctx.strokeStyle = viz.colors.red + 'aa';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(pw / 2, ph / 2);
                            ctx.lineTo(0, ph / 2);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('branch cut', 4, ph / 2 - 6);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find all values of \\((-1)^{1/3}\\). Which is the principal value?',
                    hint: 'Use \\(\\log(-1) = i(2k+1)\\pi\\) and compute \\(e^{\\frac{1}{3}\\log(-1)}\\).',
                    solution: 'The three values are \\(e^{i(2k+1)\\pi/3}\\) for \\(k = 0, 1, 2\\) (or equivalently \\(k = -1, 0, 1\\)). These are \\(e^{i\\pi/3} = \\frac{1}{2} + i\\frac{\\sqrt{3}}{2}\\), \\(e^{i\\pi} = -1\\), and \\(e^{i5\\pi/3} = \\frac{1}{2} - i\\frac{\\sqrt{3}}{2}\\). The principal value uses \\(\\operatorname{Arg}(-1) = \\pi\\), giving \\(e^{i\\pi/3} = \\frac{1}{2} + i\\frac{\\sqrt{3}}{2}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Complex Trigonometric Functions
        // ================================================================
        {
            id: 'sec-trig',
            title: 'Complex Trigonometric Functions',
            content: `
<h2>Complex Trigonometric Functions</h2>

<div class="env-block definition">
    <div class="env-title">Definition 3.5 (Complex Sine and Cosine)</div>
    <div class="env-body">
        <p>For \\(z \\in \\mathbb{C}\\), we define</p>
        \\[
        \\cos z = \\frac{e^{iz} + e^{-iz}}{2}, \\qquad \\sin z = \\frac{e^{iz} - e^{-iz}}{2i}.
        \\]
        <p>These agree with the real cosine and sine when \\(z \\in \\mathbb{R}\\).</p>
    </div>
</div>

<p>All the familiar trigonometric identities carry over: \\(\\sin^2 z + \\cos^2 z = 1\\), the addition formulas, double-angle formulas, etc. The proofs are purely algebraic manipulations of exponentials.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.4 (Properties of Complex Trig Functions)</div>
    <div class="env-body">
        <ol>
            <li><strong>Analyticity:</strong> \\(\\sin z\\) and \\(\\cos z\\) are entire, with \\((\\sin z)' = \\cos z\\) and \\((\\cos z)' = -\\sin z\\).</li>
            <li><strong>Zeros:</strong> \\(\\sin z = 0\\) iff \\(z = n\\pi\\), and \\(\\cos z = 0\\) iff \\(z = (n + \\tfrac{1}{2})\\pi\\), for \\(n \\in \\mathbb{Z}\\). These are the same zeros as in the real case.</li>
            <li><strong>Unboundedness:</strong> Unlike the real case, \\(|\\sin z|\\) and \\(|\\cos z|\\) are unbounded. On the imaginary axis, \\(\\sin(iy) = i\\sinh y\\) and \\(\\cos(iy) = \\cosh y\\), both of which grow exponentially.</li>
            <li><strong>Periodicity:</strong> \\(\\sin(z + 2\\pi) = \\sin z\\) and \\(\\cos(z + 2\\pi) = \\cos z\\).</li>
        </ol>
    </div>
</div>

<h3>Connection to Hyperbolic Functions</h3>

<div class="env-block definition">
    <div class="env-title">Definition 3.6 (Hyperbolic Functions)</div>
    <div class="env-body">
        \\[
        \\cosh z = \\frac{e^z + e^{-z}}{2}, \\qquad \\sinh z = \\frac{e^z - e^{-z}}{2}.
        \\]
    </div>
</div>

<p>The connection between trigonometric and hyperbolic functions is immediate from the definitions:</p>

\\[
\\cos(iz) = \\cosh z, \\quad \\sin(iz) = i\\sinh z, \\quad \\cosh(iz) = \\cos z, \\quad \\sinh(iz) = i\\sin z.
\\]

<p>In the complex plane, trigonometric and hyperbolic functions are the <em>same</em> function evaluated at rotated arguments. There is no fundamental distinction between them; the real-variable separation into "circular" and "hyperbolic" is an artifact of restricting to \\(\\mathbb{R}\\).</p>

<div class="env-block example">
    <div class="env-title">Example: \\(\\sin(1 + 2i)\\)</div>
    <div class="env-body">
        <p>Using the addition formula \\(\\sin(x + iy) = \\sin x \\cosh y + i \\cos x \\sinh y\\):</p>
        \\[
        \\sin(1 + 2i) = \\sin 1 \\cdot \\cosh 2 + i \\cos 1 \\cdot \\sinh 2 \\approx 3.166 + 1.960i.
        \\]
        <p>The modulus is \\(|\\sin(1 + 2i)| \\approx 3.73\\), which exceeds 1, illustrating unboundedness.</p>
    </div>
</div>

<div class="viz-placeholder" data-viz="viz-sin-domain-coloring"></div>
<div class="viz-placeholder" data-viz="viz-cosh-sinh"></div>
`,
            visualizations: [
                {
                    id: 'viz-sin-domain-coloring',
                    title: 'Domain Coloring of sin z',
                    description: 'The zeros of sin z at z = n*pi appear as dark spots on the real axis. Away from the real axis, the magnitude grows exponentially, shown by the brightening colors.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 340 });

                        function draw() {
                            var ctx = viz.ctx;
                            var pw = viz.width, ph = viz.height;
                            var imgData = ctx.createImageData(pw, ph);
                            var data = imgData.data;
                            var xMin = -4 * Math.PI, xMax = 4 * Math.PI;
                            var yMin = -3, yMax = 3;

                            for (var py = 0; py < ph; py++) {
                                for (var px = 0; px < pw; px++) {
                                    var re = xMin + (xMax - xMin) * px / pw;
                                    var im = yMax - (yMax - yMin) * py / ph;
                                    // sin(x+iy) = sin x cosh y + i cos x sinh y
                                    var u = Math.sin(re) * Math.cosh(im);
                                    var v = Math.cos(re) * Math.sinh(im);
                                    var arg = Math.atan2(v, u);
                                    var mag = Math.sqrt(u * u + v * v);
                                    var hue = (arg / Math.PI + 1) / 2;
                                    var light = 1 - 1 / (1 + mag * 0.3);
                                    var rgb = VizEngine.hslToRgb(hue, 0.8, light);
                                    var idx = (py * pw + px) * 4;
                                    data[idx] = rgb[0]; data[idx+1] = rgb[1]; data[idx+2] = rgb[2]; data[idx+3] = 255;
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);

                            // Mark zeros
                            ctx.fillStyle = '#ffffffaa';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (var n = -4; n <= 4; n++) {
                                var sx = (n * Math.PI - xMin) / (xMax - xMin) * pw;
                                var sy = ph / 2;
                                ctx.beginPath(); ctx.arc(sx, sy, 3, 0, Math.PI * 2); ctx.fill();
                                if (n !== 0) ctx.fillText(n + 'pi', sx, sy + 14);
                                else ctx.fillText('0', sx, sy + 14);
                            }

                            ctx.fillStyle = '#ffffffcc';
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('sin z', pw / 2, 18);
                        }
                        draw();
                        return viz;
                    }
                },
                {
                    id: 'viz-cosh-sinh',
                    title: 'Domain Coloring: cosh z and sinh z',
                    description: 'Toggle between cosh z and sinh z. Notice the zeros of sinh z at z = n*pi*i on the imaginary axis, and cosh z has zeros at z = (n + 1/2)*pi*i.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 560, height: 340 });
                        var showCosh = true;

                        VizEngine.createButton(controls, 'Toggle cosh / sinh', function() {
                            showCosh = !showCosh;
                            draw();
                        });

                        function draw() {
                            var ctx = viz.ctx;
                            var pw = viz.width, ph = viz.height;
                            var imgData = ctx.createImageData(pw, ph);
                            var data = imgData.data;
                            var xMin = -4, xMax = 4;
                            var yMin = -4 * Math.PI, yMax = 4 * Math.PI;

                            for (var py = 0; py < ph; py++) {
                                for (var px = 0; px < pw; px++) {
                                    var re = xMin + (xMax - xMin) * px / pw;
                                    var im = yMax - (yMax - yMin) * py / ph;
                                    var u, v;
                                    if (showCosh) {
                                        // cosh(x+iy) = cosh x cos y + i sinh x sin y
                                        u = Math.cosh(re) * Math.cos(im);
                                        v = Math.sinh(re) * Math.sin(im);
                                    } else {
                                        // sinh(x+iy) = sinh x cos y + i cosh x sin y
                                        u = Math.sinh(re) * Math.cos(im);
                                        v = Math.cosh(re) * Math.sin(im);
                                    }
                                    var arg = Math.atan2(v, u);
                                    var mag = Math.sqrt(u * u + v * v);
                                    var hue = (arg / Math.PI + 1) / 2;
                                    var light = 1 - 1 / (1 + mag * 0.3);
                                    var rgb = VizEngine.hslToRgb(hue, 0.8, light);
                                    var idx = (py * pw + px) * 4;
                                    data[idx] = rgb[0]; data[idx+1] = rgb[1]; data[idx+2] = rgb[2]; data[idx+3] = 255;
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);

                            ctx.fillStyle = '#ffffffcc';
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(showCosh ? 'cosh z' : 'sinh z', pw / 2, 18);
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that \\(|\\sin z|^2 = \\sin^2 x + \\sinh^2 y\\) for \\(z = x + iy\\).',
                    hint: 'Use \\(\\sin z = \\sin x \\cosh y + i \\cos x \\sinh y\\) and compute the modulus squared.',
                    solution: '\\(|\\sin z|^2 = \\sin^2 x \\cosh^2 y + \\cos^2 x \\sinh^2 y = \\sin^2 x(1 + \\sinh^2 y) + \\cos^2 x \\sinh^2 y = \\sin^2 x + \\sinh^2 y(\\sin^2 x + \\cos^2 x) = \\sin^2 x + \\sinh^2 y\\).'
                },
                {
                    question: 'Find all solutions to \\(\\cos z = 2\\). (This has no real solutions, but does have complex ones.)',
                    hint: 'Write \\(\\cos z = (e^{iz} + e^{-iz})/2 = 2\\) and let \\(w = e^{iz}\\). This gives a quadratic in \\(w\\).',
                    solution: 'Setting \\(w = e^{iz}\\), we get \\(w + 1/w = 4\\), so \\(w^2 - 4w + 1 = 0\\), giving \\(w = 2 \\pm \\sqrt{3}\\). Then \\(iz = \\log w\\), so \\(z = -i\\log(2 \\pm \\sqrt{3}) = -i(\\ln(2 \\pm \\sqrt{3}) + 2k\\pi i) = 2k\\pi \\mp i\\ln(2 + \\sqrt{3})\\) for \\(k \\in \\mathbb{Z}\\). (Using \\(\\ln(2 - \\sqrt{3}) = -\\ln(2 + \\sqrt{3})\\).)'
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

<p>Since \\(\\cos z\\) and \\(\\sin z\\) are not injective on \\(\\mathbb{C}\\), their inverses are multi-valued, just like \\(\\log z\\). We derive closed-form expressions using the exponential.</p>

<div class="env-block theorem">
    <div class="env-title">Theorem 3.5 (Inverse Trig via Logarithms)</div>
    <div class="env-body">
        <p>For \\(w \\in \\mathbb{C}\\):</p>
        \\[
        \\arcsin w = -i\\log\\bigl(iw + \\sqrt{1 - w^2}\\bigr),
        \\]
        \\[
        \\arccos w = -i\\log\\bigl(w + \\sqrt{w^2 - 1}\\bigr),
        \\]
        \\[
        \\arctan w = \\frac{1}{2i}\\log\\frac{1 + iw}{1 - iw}.
        \\]
        <p>Each is multi-valued because of the logarithm (and, for arcsin and arccos, the multi-valued square root).</p>
    </div>
</div>

<div class="env-block proof">
    <div class="env-title">Derivation of \\(\\arcsin\\)</div>
    <div class="env-body">
        <p>We want to solve \\(\\sin z = w\\), i.e., \\(\\frac{e^{iz} - e^{-iz}}{2i} = w\\). Let \\(\\zeta = e^{iz}\\). Then \\(\\zeta - 1/\\zeta = 2iw\\), so \\(\\zeta^2 - 2iw\\zeta - 1 = 0\\). By the quadratic formula,</p>
        \\[
        \\zeta = iw \\pm \\sqrt{1 - w^2}.
        \\]
        <p>Then \\(z = -i\\log \\zeta = -i\\log(iw + \\sqrt{1 - w^2})\\).</p>
    </div>
    <div class="qed">&#9646;</div>
</div>

<div class="env-block example">
    <div class="env-title">Example: \\(\\arcsin 2\\)</div>
    <div class="env-body">
        <p>We compute \\(\\arcsin 2 = -i\\log(2i + \\sqrt{1 - 4}) = -i\\log(2i + i\\sqrt{3}) = -i\\log(i(2 + \\sqrt{3}))\\).</p>
        <p>Now \\(\\log(i(2+\\sqrt{3})) = \\ln(2+\\sqrt{3}) + i(\\pi/2 + 2k\\pi)\\). So</p>
        \\[
        \\arcsin 2 = \\frac{\\pi}{2} + 2k\\pi + i\\ln(2 + \\sqrt{3}), \\quad k \\in \\mathbb{Z}.
        \\]
        <p>The real part matches the "expected" value \\(\\pi/2\\), and the imaginary part accounts for the fact that 2 lies outside \\([-1,1]\\).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">Branch Cuts for Inverse Trig</div>
    <div class="env-body">
        <p>The principal value of \\(\\arcsin\\) is usually taken with a branch cut on \\((-\\infty, -1) \\cup (1, \\infty)\\) on the real axis. The principal value of \\(\\arctan\\) has branch cuts on \\((-i\\infty, -i] \\cup [i, i\\infty)\\) on the imaginary axis. These choices ensure continuity on the largest possible domain.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: 'Derive the formula for \\(\\arctan w\\) by solving \\(\\tan z = w\\) for \\(z\\).',
                    hint: 'Write \\(\\tan z = \\frac{\\sin z}{\\cos z} = \\frac{e^{iz} - e^{-iz}}{i(e^{iz} + e^{-iz})} = w\\). Let \\(\\zeta = e^{2iz}\\) and solve for \\(\\zeta\\).',
                    solution: 'From \\(\\frac{\\zeta - 1}{i(\\zeta + 1)} = w\\), we get \\(\\zeta - 1 = iw(\\zeta + 1)\\), so \\(\\zeta(1 - iw) = 1 + iw\\), giving \\(\\zeta = \\frac{1+iw}{1-iw}\\). Then \\(2iz = \\log \\zeta\\), so \\(z = \\frac{1}{2i}\\log\\frac{1+iw}{1-iw}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: Branch Cuts and the Big Picture
        // ================================================================
        {
            id: 'sec-bridge',
            title: 'Branch Cuts and the Big Picture',
            content: `
<h2>Branch Cuts and the Big Picture</h2>

<div class="env-block intuition">
    <div class="env-title">The Recurring Theme</div>
    <div class="env-body">
        <p>Every multi-valued function in this chapter (\\(\\log z\\), \\(z^\\alpha\\), \\(\\arcsin z\\), \\(\\arctan z\\)) presents the same dilemma: the function is "naturally" defined on a Riemann surface, but for practical computation we work in \\(\\mathbb{C}\\) and must choose a branch. Each choice requires a branch cut, and each cut introduces a discontinuity that would not exist on the Riemann surface.</p>
    </div>
</div>

<h3>Anatomy of a Branch Cut</h3>

<p>A <strong>branch cut</strong> is a curve in \\(\\mathbb{C}\\) along which a multi-valued function has a discontinuity when restricted to a single branch. The endpoints of a branch cut are <strong>branch points</strong>, where the function genuinely cannot be made single-valued by any choice of branch.</p>

<div class="env-block example">
    <div class="env-title">Example: Branch Points of \\(\\sqrt{z}\\)</div>
    <div class="env-body">
        <p>The function \\(\\sqrt{z} = z^{1/2}\\) has two branch points: \\(z = 0\\) and \\(z = \\infty\\). If you walk around a small loop encircling the origin, the square root changes sign: \\(\\sqrt{re^{i(\\theta + 2\\pi)}} = -\\sqrt{re^{i\\theta}}\\). The standard branch cut connects 0 to \\(\\infty\\) along \\((-\\infty, 0]\\).</p>
    </div>
</div>

<h3>Summary Table</h3>

<table>
<thead>
<tr><th>Function</th><th>Domain</th><th>Branch points</th><th>Standard cut</th><th>Values</th></tr>
</thead>
<tbody>
<tr><td>\\(e^z\\)</td><td>\\(\\mathbb{C}\\)</td><td>none</td><td>none</td><td>single-valued</td></tr>
<tr><td>\\(\\log z\\)</td><td>\\(\\mathbb{C}\\setminus\\{0\\}\\)</td><td>\\(0, \\infty\\)</td><td>\\((-\\infty,0]\\)</td><td>infinitely many</td></tr>
<tr><td>\\(z^{p/q}\\)</td><td>\\(\\mathbb{C}\\setminus\\{0\\}\\)</td><td>\\(0, \\infty\\)</td><td>\\((-\\infty,0]\\)</td><td>\\(q\\) values</td></tr>
<tr><td>\\(z^\\alpha\\) (\\(\\alpha \\notin \\mathbb{Q}\\))</td><td>\\(\\mathbb{C}\\setminus\\{0\\}\\)</td><td>\\(0, \\infty\\)</td><td>\\((-\\infty,0]\\)</td><td>infinitely many</td></tr>
<tr><td>\\(\\arcsin z\\)</td><td>\\(\\mathbb{C}\\)</td><td>\\(\\pm 1\\)</td><td>\\((-\\infty,-1)\\cup(1,\\infty)\\)</td><td>infinitely many</td></tr>
<tr><td>\\(\\arctan z\\)</td><td>\\(\\mathbb{C}\\setminus\\{\\pm i\\}\\)</td><td>\\(\\pm i\\)</td><td>\\((-i\\infty,-i]\\cup[i,i\\infty)\\)</td><td>infinitely many</td></tr>
</tbody>
</table>

<h3>Looking Ahead</h3>

<p>Branch cuts will reappear when we integrate functions with branch points (Chapter 12: Applications of Residues). The keyhole contour and Hankel contour are tools specifically designed to work around branch cuts. Riemann surfaces will return in the context of analytic continuation (Chapter 18).</p>

<p>The key lesson: multi-valuedness is not an obstacle; it is a feature of the complex world that encodes topological information (the fundamental group of the punctured plane). Choosing a branch is choosing a local trivialization of a covering space.</p>

<div class="viz-placeholder" data-viz="viz-branch-cut-animation"></div>
`,
            visualizations: [
                {
                    id: 'viz-branch-cut-animation',
                    title: 'Branch Cut Jump Animation',
                    description: 'A point z traverses a circle around the origin. Watch how Log z (the principal branch of log z) jumps by 2pi i as z crosses the branch cut on the negative real axis. The real part (ln|z|) stays continuous; the imaginary part (Arg z) jumps.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {
                            width: 560, height: 380, scale: 50
                        });

                        var radius = 1.5;
                        var speed = 1;
                        var running = true;
                        VizEngine.createSlider(controls, 'Radius', 0.5, 3, radius, 0.1, function(v) {
                            radius = parseFloat(v);
                        });
                        VizEngine.createButton(controls, 'Pause / Resume', function() {
                            running = !running;
                        });

                        // Trail of (angle, Im(Log z)) pairs
                        var trail = [];

                        viz.animate(function(t) {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes();
                            var ctx = viz.ctx;

                            // Draw branch cut
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(viz.originX, viz.originY);
                            ctx.lineTo(0, viz.originY);
                            ctx.stroke();

                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('branch cut', 8, viz.originY - 8);

                            // Draw circle path
                            viz.drawCircle(0, 0, radius, null, viz.colors.text + '44', 1);

                            // Current point
                            var angle = running ? (t / 2000 * speed) % (2 * Math.PI) : 0;
                            var zx = radius * Math.cos(angle);
                            var zy = radius * Math.sin(angle);

                            viz.drawPoint(zx, zy, viz.colors.blue, 'z', 7);

                            // Log z values
                            var logRe = Math.log(radius);
                            var argZ = Math.atan2(zy, zx); // Arg z in (-pi, pi]
                            var logIm = argZ;

                            // Trail
                            if (running) {
                                trail.push({ angle: angle, logIm: logIm });
                                if (trail.length > 600) trail.shift();
                            }

                            // Draw trail in right panel (small plot of Arg z vs angle)
                            var plotL = viz.width * 0.55;
                            var plotR = viz.width - 15;
                            var plotT = 15;
                            var plotB = 120;
                            var plotW = plotR - plotL;
                            var plotH = plotB - plotT;

                            ctx.fillStyle = '#0c0c20cc';
                            ctx.fillRect(plotL, plotT, plotW, plotH);
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(plotL, plotT, plotW, plotH);

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Arg z vs angle', plotL + plotW / 2, plotT + 12);
                            ctx.textAlign = 'left';
                            ctx.fillText('pi', plotL + 2, plotT + 24);
                            ctx.fillText('-pi', plotL + 2, plotB - 4);

                            // Plot data
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            var started = false;
                            for (var i = 0; i < trail.length; i++) {
                                var tx = plotL + (trail[i].angle % (2 * Math.PI)) / (2 * Math.PI) * plotW;
                                var ty = plotT + 20 + (1 - (trail[i].logIm + Math.PI) / (2 * Math.PI)) * (plotH - 30);
                                if (!started) { ctx.moveTo(tx, ty); started = true; }
                                else {
                                    // Detect jump
                                    if (i > 0 && Math.abs(trail[i].logIm - trail[i-1].logIm) > Math.PI) {
                                        ctx.stroke();
                                        ctx.beginPath();
                                        ctx.moveTo(tx, ty);
                                    } else {
                                        ctx.lineTo(tx, ty);
                                    }
                                }
                            }
                            ctx.stroke();

                            // Info panel
                            var infoX = viz.width - 220;
                            var infoY = 145;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('z = ' + zx.toFixed(3) + ' + ' + zy.toFixed(3) + 'i', infoX, infoY);
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Log z = ' + logRe.toFixed(3) + ' + ' + logIm.toFixed(3) + 'i', infoX, infoY + 20);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Arg z = ' + argZ.toFixed(3) + ' rad', infoX, infoY + 40);

                            // Jump indicator
                            if (Math.abs(zy) < 0.15 && zx < 0) {
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.fillText('JUMP!', infoX, infoY + 65);
                            }

                            viz.drawDraggables();
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Explain why \\(z = 0\\) is a branch point of \\(\\log z\\) but \\(z = 1\\) is not.',
                    hint: 'Consider what happens when you traverse a small loop around each point and track the value of \\(\\log z\\).',
                    solution: 'Traversing a loop around \\(z = 0\\), the argument changes by \\(2\\pi\\), so \\(\\log z\\) changes by \\(2\\pi i\\); it does not return to its starting value. For a loop around \\(z = 1\\) that does not enclose the origin, the argument returns to its starting value, so \\(\\log z\\) is single-valued near \\(z = 1\\). A branch point is a point where analytic continuation around a loop changes the branch.'
                },
                {
                    question: 'Show that the Riemann surface of \\(z^{1/n}\\) (\\(n \\geq 2\\) integer) has \\(n\\) sheets, while the Riemann surface of \\(\\log z\\) has infinitely many.',
                    hint: 'For \\(z^{1/n}\\), going around the origin \\(n\\) times returns to the original branch. For \\(\\log z\\), no finite number of loops returns to the original value.',
                    solution: 'For \\(z^{1/n} = |z|^{1/n} e^{i(\\theta + 2k\\pi)/n}\\), there are exactly \\(n\\) distinct values (\\(k = 0, 1, \\ldots, n-1\\)). Going around the origin once changes the branch from \\(k\\) to \\(k+1 \\pmod{n}\\); after \\(n\\) loops we return to the start. The Riemann surface is an \\(n\\)-sheeted cover of \\(\\mathbb{C}^* = \\mathbb{C}\\setminus\\{0\\}\\). For \\(\\log z\\), the values \\(\\ln|z| + i(\\theta + 2k\\pi)\\) are all distinct for distinct \\(k \\in \\mathbb{Z}\\), so going around the origin never returns to the starting value. The Riemann surface is an infinite-sheeted (universal) cover of \\(\\mathbb{C}^*\\).'
                }
            ]
        }
    ]
});
