window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch19',
    number: 19,
    title: 'Special Functions & Applications',
    subtitle: 'Gamma, Beta, zeta, and the power of complex analysis',
    sections: [
        // ================================================================
        // SECTION 1: The Power of Complex Methods
        // ================================================================
        {
            id: 'sec-motivation',
            title: 'The Power of Complex Methods',
            content: `
<h2>The Power of Complex Methods</h2>

<div class="env-block intuition">
    <div class="env-title">A Preview of What Complex Analysis Achieves</div>
    <div class="env-body">
        <p>How do you prove that \\(\\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}\\)? Or evaluate \\(\\int_0^\\infty x^{s-1} e^{-x}\\,dx\\) and extract from it a function that extends the factorial to all complex numbers? Or establish a functional equation relating \\(\\zeta(s)\\) to \\(\\zeta(1-s)\\) that hints at a profound symmetry of the prime numbers?</p>
        <p>Complex analysis is the key to all of these. This final chapter shows how the machinery we have built — analytic continuation, residues, contour integration, and conformal mappings — bears fruit in the theory of <em>special functions</em>.</p>
    </div>
</div>

<p>Throughout this course, complex analysis has appeared to be a subject about analytic functions and their integrals. It is that, but it is also something more: a universal toolkit for evaluating integrals, summing series, and uncovering hidden structure in functions that arise across mathematics, physics, and engineering.</p>

<p>The special functions of classical analysis — Gamma, Beta, zeta, elliptic functions, Bessel functions, hypergeometric functions — are not a disorganized zoo. They are connected by the unifying language of complex analysis. Each one is best understood as a meromorphic or analytic function of a complex variable, and the deepest results about them come from complex-analytic methods.</p>

<h3>What We Cover Here</h3>

<p>In this capstone chapter we treat four families in depth:</p>
<ol>
    <li><strong>The Gamma function</strong> \\(\\Gamma(z)\\): the analytic extension of \\((n-1)!\\), with poles at non-positive integers and the beautiful reflection formula \\(\\Gamma(z)\\Gamma(1-z) = \\pi/\\sin(\\pi z)\\).</li>
    <li><strong>The Beta function</strong> \\(B(a,b)\\): a two-variable relative of Gamma that encodes Euler integrals and appears throughout probability and statistics.</li>
    <li><strong>The Riemann zeta function</strong> \\(\\zeta(s)\\): the gateway to analytic number theory, with a functional equation proved using complex methods and a single unresolved hypothesis worth one million dollars.</li>
    <li><strong>Elliptic functions</strong>: doubly periodic meromorphic functions on the complex plane, the simplest non-rational complex functions.</li>
</ol>

<p>We close by surveying how these functions and their complex-analytic properties illuminate number theory, quantum physics, and the global geometry of differential equations.</p>

<div class="env-block remark">
    <div class="env-title">Capstone Perspective</div>
    <div class="env-body">
        <p>Every major theorem of this course plays a role here. Analytic continuation (<em>Ch 18</em>) defines \\(\\Gamma(z)\\) and \\(\\zeta(s)\\) beyond their natural domains. The residue theorem (<em>Ch 11–12</em>) computes the functional equation of zeta. Conformal mappings (<em>Ch 13–15</em>) underlie the period lattices of elliptic functions. The subject is unified, and this chapter is its reunion.</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-grand-tour',
                    title: 'Grand Tour: Greatest Hits of Complex Analysis',
                    description: 'An animated tour through the signature visualizations of the course: from the complex plane to the Gamma function, the zeta function, and the Weierstrass P-function. Each panel links back to the chapter where it first appeared.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 620, height: 420 });

                        var scenes = [
                            { label: 'The Complex Plane (Ch 0)', fn: 'plane' },
                            { label: 'Gamma Function Domain Coloring (Ch 19)', fn: 'gamma' },
                            { label: 'Zeta Function Domain Coloring (Ch 19)', fn: 'zeta' },
                            { label: 'Weierstrass \u2118(z) (Ch 19)', fn: 'weierstrass' },
                        ];

                        var idx = 0;
                        var animT = 0;
                        var auto = true;

                        function complexMul(a1, b1, a2, b2) { return [a1*a2 - b1*b2, a1*b2 + b1*a2]; }
                        function complexAbs(a, b) { return Math.sqrt(a*a + b*b); }

                        // --- Complex special functions (approximate) ---

                        // Lanczos approximation to Gamma
                        function gammaLanczos(re, im) {
                            // Reflection for re < 0.5
                            if (re < 0.5) {
                                // Gamma(z)*Gamma(1-z) = pi/sin(pi*z)
                                var sinRe = Math.sin(Math.PI * re) * Math.cosh(Math.PI * im);
                                var sinIm = Math.cos(Math.PI * re) * Math.sinh(Math.PI * im);
                                var sinMag2 = sinRe*sinRe + sinIm*sinIm;
                                if (sinMag2 < 1e-20) return [0, 0];
                                var piOverSinRe =  Math.PI * sinRe / sinMag2;
                                var piOverSinIm = -Math.PI * sinIm / sinMag2;
                                var g1 = gammaLanczos(1 - re, -im);
                                var g1Mag2 = g1[0]*g1[0] + g1[1]*g1[1];
                                if (g1Mag2 < 1e-20) return [0, 0];
                                return [
                                    (piOverSinRe*g1[0] + piOverSinIm*g1[1]) / g1Mag2,
                                    (piOverSinIm*g1[0] - piOverSinRe*g1[1]) / g1Mag2
                                ];
                            }
                            // Lanczos coefficients g=7, n=9
                            var g = 7;
                            var p = [0.99999999999980993,676.5203681218851,-1259.1392167224028,
                                     771.32342877765313,-176.61502916214059,12.507343278686905,
                                     -0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
                            var zRe = re - 1, zIm = im;
                            var xRe = p[0], xIm = 0;
                            for (var i = 1; i < 9; i++) {
                                var denom = (zRe + i)*(zRe + i) + zIm*zIm;
                                if (denom < 1e-20) continue;
                                xRe += p[i] * (zRe + i) / denom;
                                xIm -= p[i] * zIm / denom;
                            }
                            var tRe = zRe + g + 0.5, tIm = zIm;
                            // (z+g+0.5)^(z+0.5) using exp((z+0.5)*log(t))
                            var logTMag = 0.5 * Math.log(tRe*tRe + tIm*tIm);
                            var logTArg = Math.atan2(tIm, tRe);
                            var expMul = zRe + 0.5;
                            var expArg = expMul * logTArg + zIm * logTMag;
                            var expMag = Math.exp(expMul * logTMag - zIm * logTArg);
                            var powRe = expMag * Math.cos(expArg);
                            var powIm = expMag * Math.sin(expArg);
                            // exp(-t)
                            var expNegT = Math.exp(-tRe);
                            var expNegRe = expNegT * Math.cos(-tIm);
                            var expNegIm = expNegT * Math.sin(-tIm);
                            // sqrt(2pi)
                            var sqrt2pi = Math.sqrt(2 * Math.PI);
                            var resRe = sqrt2pi * (powRe*expNegRe - powIm*expNegIm) * xRe - sqrt2pi*(powRe*expNegIm+powIm*expNegRe)*xIm;
                            var resIm = sqrt2pi * (powRe*expNegRe - powIm*expNegIm) * xIm + sqrt2pi*(powRe*expNegIm+powIm*expNegRe)*xRe;
                            // simplified: just return product
                            var t1Re = sqrt2pi * (powRe * expNegRe - powIm * expNegIm);
                            var t1Im = sqrt2pi * (powRe * expNegIm + powIm * expNegRe);
                            return [t1Re * xRe - t1Im * xIm, t1Re * xIm + t1Im * xRe];
                        }

                        // Zeta via Euler-Maclaurin (for Re(s)>0, s!=1)
                        function zetaApprox(sRe, sIm) {
                            if (Math.abs(sRe - 1) < 0.1 && Math.abs(sIm) < 0.1) return [0, 0];
                            var N = 20;
                            var sumRe = 0, sumIm = 0;
                            for (var n = 1; n <= N; n++) {
                                var logN = Math.log(n);
                                var mag = Math.exp(-sRe * logN);
                                var arg = -sIm * logN;
                                sumRe += mag * Math.cos(arg);
                                sumIm += mag * Math.sin(arg);
                            }
                            // Euler-Maclaurin correction: +N^(1-s)/(s-1) + N^(-s)/2
                            var log1ms = Math.log(N) * (1 - sRe);
                            var arg1ms = -Math.log(N) * sIm;
                            var mag1ms = Math.exp(log1ms);
                            var numRe = mag1ms * Math.cos(arg1ms);
                            var numIm = mag1ms * Math.sin(arg1ms);
                            var denRe = sRe - 1, denIm = sIm;
                            var denMag2 = denRe*denRe + denIm*denIm;
                            if (denMag2 > 1e-10) {
                                sumRe += (numRe*denRe + numIm*denIm) / denMag2;
                                sumIm += (numIm*denRe - numRe*denIm) / denMag2;
                            }
                            return [sumRe, sumIm];
                        }

                        // Weierstrass P-function via lattice sum (omega1=1, omega2=i)
                        function weierstrassP(zRe, zIm) {
                            var sumRe = 0, sumIm = 0;
                            var omega1Re = 2, omega1Im = 0;
                            var omega2Re = 0, omega2Im = 2;
                            var N = 5;
                            // 1/z^2
                            var zMag2 = zRe*zRe + zIm*zIm;
                            if (zMag2 < 1e-10) return [0, 0];
                            sumRe = zRe*zRe/zMag2/zMag2 - zIm*zIm/zMag2/zMag2;
                            sumIm = -2*zRe*zIm / (zMag2*zMag2);
                            for (var m = -N; m <= N; m++) {
                                for (var n = -N; n <= N; n++) {
                                    if (m === 0 && n === 0) continue;
                                    var omRe = m * omega1Re + n * omega2Re;
                                    var omIm = m * omega1Im + n * omega2Im;
                                    // 1/(z-omega)^2
                                    var dwRe = zRe - omRe, dwIm = zIm - omIm;
                                    var dwMag2 = dwRe*dwRe + dwIm*dwIm;
                                    if (dwMag2 < 1e-10) return [0, 0];
                                    var omMag2 = omRe*omRe + omIm*omIm;
                                    if (omMag2 < 1e-10) continue;
                                    // 1/(z-om)^2 - 1/om^2
                                    sumRe += (dwRe*dwRe - dwIm*dwIm)/(dwMag2*dwMag2) - (omRe*omRe - omIm*omIm)/(omMag2*omMag2);
                                    sumIm += -2*dwRe*dwIm/(dwMag2*dwMag2) - (-2*omRe*omIm/(omMag2*omMag2));
                                }
                            }
                            return [sumRe, sumIm];
                        }

                        function drawScene(scene) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var xR = [-4, 4], yR = [-3, 3];
                            if (scene.fn === 'plane') {
                                viz.drawGrid(); viz.drawAxes();
                                // Draw some complex numbers and circles
                                var t2 = animT * 0.001;
                                for (var k = 0; k < 6; k++) {
                                    var ang = t2 + k * Math.PI / 3;
                                    var r = 1.8;
                                    viz.drawPoint(r*Math.cos(ang), r*Math.sin(ang), viz.colors.blue, null, 5);
                                    viz.drawVector(0, 0, r*Math.cos(ang), r*Math.sin(ang), viz.colors.blue + '88', null, 1);
                                }
                                viz.drawCircle(0, 0, 1, null, viz.colors.teal, 2);
                                viz.screenText('The Complex Plane', viz.width/2, 20, viz.colors.white, 15);
                                viz.screenText('z = x + iy, |z| = r, arg(z) = \u03b8', viz.width/2, viz.height-20, viz.colors.text, 12);
                            } else if (scene.fn === 'gamma') {
                                viz.drawDomainColoring(gammaLanczos, xR, yR);
                                viz.screenText('\u0393(z) \u2014 Gamma Function', viz.width/2, 16, viz.colors.white, 15);
                                viz.screenText('Poles at z = 0, \u22121, \u22122, \u22123, ...', viz.width/2, viz.height-20, viz.colors.white, 12);
                            } else if (scene.fn === 'zeta') {
                                viz.drawDomainColoring(zetaApprox, [-2, 4], [-15, 15]);
                                viz.screenText('\u03b6(s) \u2014 Riemann Zeta Function', viz.width/2, 16, viz.colors.white, 15);
                                viz.screenText('Critical strip 0 < Re(s) < 1', viz.width/2, viz.height-20, viz.colors.white, 12);
                            } else if (scene.fn === 'weierstrass') {
                                viz.drawDomainColoring(weierstrassP, [-3.2, 3.2], [-2.4, 2.4]);
                                viz.screenText('\u2118(z) \u2014 Weierstrass P-function', viz.width/2, 16, viz.colors.white, 15);
                                viz.screenText('Doubly periodic on \u039b = 2\u2124 \u2295 2i\u2124', viz.width/2, viz.height-20, viz.colors.white, 12);
                            }
                            // Scene indicator
                            for (var j = 0; j < scenes.length; j++) {
                                var dotX = viz.width/2 - (scenes.length-1)*12 + j*24;
                                ctx.fillStyle = j === idx ? viz.colors.white : viz.colors.grid;
                                ctx.beginPath(); ctx.arc(dotX, viz.height - 44, 5, 0, Math.PI*2); ctx.fill();
                            }
                        }

                        VizEngine.createButton(controls, '\u25c4 Prev', function() {
                            idx = (idx - 1 + scenes.length) % scenes.length;
                            auto = false;
                            drawScene(scenes[idx]);
                        });
                        VizEngine.createButton(controls, '\u25ba Next', function() {
                            idx = (idx + 1) % scenes.length;
                            auto = false;
                            drawScene(scenes[idx]);
                        });
                        VizEngine.createButton(controls, 'Auto Tour', function() { auto = true; });

                        var lastSwitch = 0;
                        viz.animate(function(t) {
                            animT = t;
                            if (auto && t - lastSwitch > 3500) {
                                idx = (idx + 1) % scenes.length;
                                lastSwitch = t;
                            }
                            drawScene(scenes[idx]);
                        });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The Gamma function satisfies \\(\\Gamma(z+1) = z\\,\\Gamma(z)\\). Use this to show that \\(\\Gamma(n+1) = n!\\) for non-negative integers \\(n\\), given \\(\\Gamma(1) = 1\\).',
                    hint: 'Apply the functional equation repeatedly, starting from \\(\\Gamma(n+1)\\) and stepping down.',
                    solution: 'By the functional equation, \\(\\Gamma(n+1) = n\\,\\Gamma(n) = n(n-1)\\Gamma(n-1) = \\cdots = n!\\,\\Gamma(1) = n!\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 2: The Gamma Function
        // ================================================================
        {
            id: 'sec-gamma',
            title: 'The Gamma Function',
            content: `
<h2>The Gamma Function</h2>

<p>The factorial \\(n! = 1 \\cdot 2 \\cdots n\\) is defined only for non-negative integers. Yet the formula \\(n! = \\int_0^\\infty t^n e^{-t}\\,dt\\) generalizes at once to arbitrary complex \\(z\\).</p>

<div class="env-block theorem">
    <div class="env-title">Definition (Euler's Integral, 1729)</div>
    <div class="env-body">
        For \\(\\operatorname{Re}(z) > 0\\), the <strong>Gamma function</strong> is defined by
        \\[
            \\Gamma(z) = \\int_0^\\infty t^{z-1} e^{-t}\\,dt.
        \\]
        The integral converges absolutely for \\(\\operatorname{Re}(z) > 0\\) and defines an analytic function in the right half-plane.
    </div>
</div>

<h3>The Functional Equation</h3>

<p>Integration by parts yields the key functional equation immediately:</p>

\\[
    \\Gamma(z+1) = z\\,\\Gamma(z), \\qquad \\operatorname{Re}(z) > 0.
\\]

<p>Since \\(\\Gamma(1) = \\int_0^\\infty e^{-t}\\,dt = 1\\), induction gives \\(\\Gamma(n+1) = n!\\) for all \\(n \\in \\mathbb{Z}_{\\geq 0}\\).</p>

<h3>Analytic Continuation to \\(\\mathbb{C} \\setminus \\{0,-1,-2,\\ldots\\}\\)</h3>

<p>The functional equation \\(\\Gamma(z) = \\Gamma(z+1)/z\\) extends \\(\\Gamma\\) meromorphically to \\(\\operatorname{Re}(z) > -1\\) except for a simple pole at \\(z = 0\\). Iterating:</p>

\\[
    \\Gamma(z) = \\frac{\\Gamma(z+n)}{z(z+1)\\cdots(z+n-1)}, \\qquad z \\notin \\{0,-1,\\ldots,-(n-1)\\}.
\\]

<p>Taking \\(n \\to \\infty\\) in a suitable sense gives the analytic continuation of \\(\\Gamma\\) to all of \\(\\mathbb{C}\\) as a meromorphic function with simple poles exactly at \\(z = 0, -1, -2, \\ldots\\), with residue</p>
\\[
    \\operatorname{Res}_{z = -n}\\,\\Gamma(z) = \\frac{(-1)^n}{n!}.
\\]

<div class="env-block theorem">
    <div class="env-title">Theorem: Reflection Formula (Euler)</div>
    <div class="env-body">
        \\[
            \\Gamma(z)\\,\\Gamma(1-z) = \\frac{\\pi}{\\sin(\\pi z)}, \\qquad z \\notin \\mathbb{Z}.
        \\]
        Setting \\(z = \\tfrac{1}{2}\\) gives the famous special value \\(\\Gamma\\!\\left(\\tfrac{1}{2}\\right) = \\sqrt{\\pi}\\).
    </div>
</div>

<h4>Proof Sketch</h4>
<p>Define \\(h(z) = \\Gamma(z)\\Gamma(1-z)\\sin(\\pi z)\\). One shows \\(h\\) is entire and bounded, hence constant by Liouville; evaluating at \\(z = \\tfrac{1}{2}\\) gives \\(h \\equiv \\pi\\). The key technical step uses the Weierstrass product \\(\\sin(\\pi z) = \\pi z \\prod_{n=1}^\\infty \\bigl(1 - z^2/n^2\\bigr)\\).</p>

<h3>Stirling's Approximation</h3>

<p>For large \\(|z|\\) away from the negative real axis, the Gamma function has the asymptotic expansion</p>

\\[
    \\ln \\Gamma(z) = z\\ln z - z - \\tfrac{1}{2}\\ln z + \\tfrac{1}{2}\\ln(2\\pi) + \\frac{1}{12z} - \\frac{1}{360z^3} + \\cdots
\\]

<p>In particular, \\(n! \\sim \\sqrt{2\\pi n}\\,(n/e)^n\\) as \\(n \\to \\infty\\) (Stirling's formula). The asymptotic series is not convergent but is <em>asymptotic</em>: truncating after \\(N\\) terms gives an error of order \\(|z|^{-(2N+1)}\\).</p>

<div class="env-block remark">
    <div class="env-title">Gauss's Multiplication Formula</div>
    <div class="env-body">
        \\[
            \\prod_{k=0}^{m-1} \\Gamma\\!\\left(z + \\frac{k}{m}\\right) = (2\\pi)^{(m-1)/2}\\,m^{1/2-mz}\\,\\Gamma(mz).
        \\]
        The special case \\(m=2\\) is the <em>duplication formula</em>: \\(\\Gamma(z)\\,\\Gamma\\bigl(z + \\tfrac{1}{2}\\bigr) = \\frac{\\sqrt\\pi}{2^{2z-1}}\\,\\Gamma(2z)\\).
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-gamma-domain-coloring',
                    title: 'Domain Coloring of \u0393(z)',
                    description: 'The Gamma function on the complex plane. Hue encodes argument, brightness encodes modulus. Poles at z = 0, -1, -2, -3, ... appear as points where all colors meet (argument cycles through 2\u03c0). Drag the view by adjusting the range sliders.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 620, height: 400 });
                        var xCenter = 0, yCenter = 0, zoom = 1.5;

                        function gammaLanczos(re, im) {
                            if (re < 0.5) {
                                var sinRe = Math.sin(Math.PI*re)*Math.cosh(Math.PI*im);
                                var sinIm = Math.cos(Math.PI*re)*Math.sinh(Math.PI*im);
                                var sinMag2 = sinRe*sinRe + sinIm*sinIm;
                                if (sinMag2 < 1e-25) return [0,0];
                                var pRe = Math.PI*sinRe/sinMag2, pIm = -Math.PI*sinIm/sinMag2;
                                var g1 = gammaLanczos(1-re, -im);
                                var g1M2 = g1[0]*g1[0]+g1[1]*g1[1];
                                if (g1M2 < 1e-25) return [0,0];
                                return [(pRe*g1[0]+pIm*g1[1])/g1M2, (pIm*g1[0]-pRe*g1[1])/g1M2];
                            }
                            var g = 7;
                            var p = [0.99999999999980993,676.5203681218851,-1259.1392167224028,
                                     771.32342877765313,-176.61502916214059,12.507343278686905,
                                     -0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
                            var zr = re-1, zi = im;
                            var xr = p[0], xi = 0;
                            for (var i = 1; i < 9; i++) {
                                var d = (zr+i)*(zr+i)+zi*zi;
                                if (d < 1e-20) continue;
                                xr += p[i]*(zr+i)/d; xi -= p[i]*zi/d;
                            }
                            var tr = zr+g+0.5, ti = zi;
                            var lm = 0.5*Math.log(tr*tr+ti*ti), la = Math.atan2(ti,tr);
                            var em = zr+0.5, ea = em*la+zi*lm;
                            var powMag = Math.exp(em*lm-zi*la);
                            var pr2 = powMag*Math.cos(ea), pi2 = powMag*Math.sin(ea);
                            var en = Math.exp(-tr);
                            var er = en*Math.cos(-ti), ei2 = en*Math.sin(-ti);
                            var s2p = Math.sqrt(2*Math.PI);
                            var t1r = s2p*(pr2*er - pi2*ei2), t1i = s2p*(pr2*ei2 + pi2*er);
                            return [t1r*xr - t1i*xi, t1r*xi + t1i*xr];
                        }

                        function redraw() {
                            var hw = 3.5 / zoom, hh = hw * 400/620;
                            var xR = [xCenter - hw, xCenter + hw];
                            var yR = [yCenter - hh, yCenter + hh];
                            viz.clear();
                            viz.drawDomainColoring(gammaLanczos, xR, yR);
                            var ctx = viz.ctx;
                            // Mark poles
                            for (var n = 0; n >= -5; n--) {
                                var sx = viz.width * (n - xR[0]) / (xR[1]-xR[0]);
                                var sy = viz.height * 0.5;
                                if (sx > 10 && sx < viz.width-10) {
                                    ctx.strokeStyle = '#ffffff99';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(sx-6, sy-6); ctx.lineTo(sx+6, sy+6);
                                    ctx.moveTo(sx+6, sy-6); ctx.lineTo(sx-6, sy+6);
                                    ctx.stroke();
                                    ctx.fillStyle = '#ffffffcc';
                                    ctx.font = '10px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText(n === 0 ? '0' : n.toString(), sx, sy+16);
                                }
                            }
                            viz.screenText('\u0393(z): poles at z = 0, \u22121, \u22122, ...', viz.width/2, 18, viz.colors.white, 13);
                        }

                        VizEngine.createSlider(controls, 'Center Re', -3, 3, 0, 0.1, function(v) { xCenter = v; redraw(); });
                        VizEngine.createSlider(controls, 'Zoom', 0.3, 3, 1, 0.1, function(v) { zoom = v; redraw(); });
                        redraw();
                        return viz;
                    }
                },
                {
                    id: 'viz-reflection-formula',
                    title: 'Reflection Formula: \u0393(z)\u0393(1\u2212z) = \u03c0/sin(\u03c0z)',
                    description: 'Both sides of the reflection formula plotted for real z. Drag the point to see Gamma(z) * Gamma(1-z) equal pi/sin(pi*z) exactly. The identity encodes the symmetry z <-> 1-z.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 580, height: 360, scale: 50, originX: 290, originY: 180 });

                        // Real Gamma via Lanczos
                        function gammaReal(x) {
                            if (x <= 0 && x === Math.floor(x)) return Infinity;
                            if (x < 0.5) return Math.PI / (Math.sin(Math.PI*x) * gammaReal(1-x));
                            var g = 7;
                            var p = [0.99999999999980993,676.5203681218851,-1259.1392167224028,
                                     771.32342877765313,-176.61502916214059,12.507343278686905,
                                     -0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
                            x -= 1;
                            var s = p[0];
                            for (var i = 1; i <= 8; i++) s += p[i]/(x+i);
                            var t = x + g + 0.5;
                            return Math.sqrt(2*Math.PI) * Math.pow(t, x+0.5) * Math.exp(-t) * s;
                        }

                        var zVal = 0.4;

                        function draw() {
                            viz.clear(); viz.drawGrid(); viz.drawAxes();

                            // Plot Gamma(x)*Gamma(1-x)
                            viz.drawFunction(function(x) {
                                var g1 = gammaReal(x), g2 = gammaReal(1-x);
                                return g1 * g2;
                            }, -4, 5, viz.colors.blue, 2.5);

                            // Plot pi/sin(pi*x)
                            viz.drawFunction(function(x) {
                                var s = Math.sin(Math.PI*x);
                                if (Math.abs(s) < 0.01) return NaN;
                                return Math.PI/s;
                            }, -4, 5, viz.colors.orange, 1.5, 400);

                            // Draggable point
                            var yLHS = gammaReal(zVal)*gammaReal(1-zVal);
                            var yRHS = Math.abs(Math.sin(Math.PI*zVal)) < 0.001 ? Infinity : Math.PI/Math.sin(Math.PI*zVal);

                            viz.drawPoint(zVal, yLHS, viz.colors.blue, null, 6);

                            // Legend
                            viz.screenText('\u0393(z)\u0393(1\u2212z)', 80, 30, viz.colors.blue, 13);
                            viz.screenText('\u03c0 / sin(\u03c0z)', 80, 48, viz.colors.orange, 13);
                            viz.screenText('z = ' + zVal.toFixed(2), viz.width-80, 30, viz.colors.white, 12);
                            if (isFinite(yLHS)) {
                                viz.screenText('Value = ' + yLHS.toFixed(3), viz.width-80, 48, viz.colors.text, 11);
                            }
                        }

                        VizEngine.createSlider(controls, 'z', -3.5, 4.5, 0.4, 0.01, function(v) {
                            zVal = v; draw();
                        });
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(\\Gamma\\!\\left(\\frac{3}{2}\\right) = \\frac{\\sqrt{\\pi}}{2}\\) using the functional equation and the special value \\(\\Gamma\\!\\left(\\frac{1}{2}\\right) = \\sqrt{\\pi}\\).',
                    hint: 'Apply \\(\\Gamma(z+1) = z\\,\\Gamma(z)\\) with \\(z = \\tfrac{1}{2}\\).',
                    solution: '\\(\\Gamma\\!\\left(\\tfrac{3}{2}\\right) = \\Gamma\\!\\left(\\tfrac{1}{2}+1\\right) = \\tfrac{1}{2}\\,\\Gamma\\!\\left(\\tfrac{1}{2}\\right) = \\tfrac{\\sqrt\\pi}{2}\\).'
                },
                {
                    question: 'Use the reflection formula to evaluate \\(\\Gamma\\!\\left(\\frac{1}{4}\\right)\\Gamma\\!\\left(\\frac{3}{4}\\right)\\).',
                    hint: 'Apply the reflection formula with \\(z = \\tfrac{1}{4}\\), so \\(1-z = \\tfrac{3}{4}\\).',
                    solution: '\\(\\Gamma\\!\\left(\\tfrac{1}{4}\\right)\\Gamma\\!\\left(\\tfrac{3}{4}\\right) = \\dfrac{\\pi}{\\sin(\\pi/4)} = \\dfrac{\\pi}{1/\\sqrt{2}} = \\pi\\sqrt{2}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 3: The Beta Function
        // ================================================================
        {
            id: 'sec-beta',
            title: 'The Beta Function',
            content: `
<h2>The Beta Function</h2>

<p>The Beta function is a two-variable companion to Gamma. It arises naturally in probability distributions, combinatorics, and the theory of special functions.</p>

<div class="env-block theorem">
    <div class="env-title">Definition (Euler's First Integral)</div>
    <div class="env-body">
        For \\(\\operatorname{Re}(a) > 0\\) and \\(\\operatorname{Re}(b) > 0\\),
        \\[
            B(a,b) = \\int_0^1 t^{a-1}(1-t)^{b-1}\\,dt.
        \\]
    </div>
</div>

<h3>Connection to Gamma</h3>

<p>The fundamental identity is</p>

\\[
    B(a,b) = \\frac{\\Gamma(a)\\,\\Gamma(b)}{\\Gamma(a+b)}.
\\]

<p>This is proved by writing \\(\\Gamma(a)\\Gamma(b)\\) as a double integral, converting to polar coordinates, and recognizing the resulting integrals as \\(\\Gamma(a+b)\\cdot B(a,b)\\). The identity immediately extends \\(B(a,b)\\) to all \\(a, b \\in \\mathbb{C}\\) away from non-positive integers.</p>

<h3>Symmetry and Special Values</h3>

\\[
    B(a,b) = B(b,a), \\qquad B(1,1) = 1, \\qquad B\\!\\left(n, m\\right) = \\frac{(n-1)!(m-1)!}{(n+m-1)!}.
\\]

<p>The trigonometric form \\(B(a,b) = 2\\int_0^{\\pi/2}\\cos^{2a-1}\\!\\theta\\,\\sin^{2b-1}\\!\\theta\\,d\\theta\\) makes Beta a natural tool for evaluating trigonometric integrals. For instance,</p>

\\[
    \\int_0^{\\pi/2}\\sin^n\\theta\\,d\\theta = \\frac{\\sqrt\\pi}{2}\\,\\frac{\\Gamma\\bigl(\\frac{n+1}{2}\\bigr)}{\\Gamma\\bigl(\\frac{n+2}{2}\\bigr)}.
\\]

<h3>Beta in Probability</h3>

<p>The <em>Beta distribution</em> \\(\\operatorname{Beta}(\\alpha,\\beta)\\) has density \\(f(x) = x^{\\alpha-1}(1-x)^{\\beta-1}/B(\\alpha,\\beta)\\) on \\([0,1]\\). The normalizing constant \\(B(\\alpha,\\beta)\\) is computed analytically via the Gamma-Beta relation, making Bayesian inference with Beta priors exactly tractable.</p>

<div class="env-block remark">
    <div class="env-title">The Dirichlet Integral</div>
    <div class="env-body">
        The multivariate generalization of Beta is the <em>Dirichlet integral</em>:
        \\[
            \\int_{x_1+\\cdots+x_k=1,\\,x_i \\geq 0} x_1^{a_1-1}\\cdots x_k^{a_k-1}\\,d\\sigma = \\frac{\\Gamma(a_1)\\cdots\\Gamma(a_k)}{\\Gamma(a_1+\\cdots+a_k)},
        \\]
        which normalizes the Dirichlet distribution used in topic modeling and Bayesian statistics.
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-beta-function',
                    title: 'Beta Function B(a, b) as a Heatmap',
                    description: 'B(a, b) = \u0393(a)\u0393(b)/\u0393(a+b) plotted as a heatmap over (a, b) \u2208 (0,5]\u00d7(0,5]. Warmer colors indicate larger values. Notice the symmetry B(a,b) = B(b,a) along the diagonal.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 540, height: 420, scale: 80, originX: 60, originY: 360 });

                        function gammaReal(x) {
                            if (x <= 0 && x === Math.floor(x)) return Infinity;
                            if (x < 0.5) return Math.PI / (Math.sin(Math.PI*x) * gammaReal(1-x));
                            var g = 7;
                            var p = [0.99999999999980993,676.5203681218851,-1259.1392167224028,
                                     771.32342877765313,-176.61502916214059,12.507343278686905,
                                     -0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
                            x -= 1; var s = p[0];
                            for (var i = 1; i <= 8; i++) s += p[i]/(x+i);
                            var t2 = x + g + 0.5;
                            return Math.sqrt(2*Math.PI)*Math.pow(t2, x+0.5)*Math.exp(-t2)*s;
                        }

                        function betaFn(a, b) {
                            if (a <= 0 || b <= 0) return NaN;
                            return gammaReal(a)*gammaReal(b)/gammaReal(a+b);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var pw = viz.canvas.width, ph = viz.canvas.height;
                            ctx.save(); ctx.setTransform(1,0,0,1,0,0);
                            var imgData = ctx.createImageData(pw, ph);
                            var data = imgData.data;
                            var aRange = [0.2, 5], bRange = [0.2, 5];
                            var plotLeft = 60, plotRight = pw-20, plotTop = 20, plotBottom = ph-60;
                            var pW = plotRight - plotLeft, pH = plotBottom - plotTop;
                            // fill background
                            for (var i = 0; i < pw*ph; i++) {
                                data[i*4] = 12; data[i*4+1] = 12; data[i*4+2] = 32; data[i*4+3] = 255;
                            }
                            // compute values for colormap
                            var vals = [];
                            var vMin = Infinity, vMax = -Infinity;
                            for (var py = plotTop; py < plotBottom; py++) {
                                for (var px = plotLeft; px < plotRight; px++) {
                                    var a = aRange[0] + (aRange[1]-aRange[0])*(px-plotLeft)/pW;
                                    var b = bRange[1] - (bRange[1]-bRange[0])*(py-plotTop)/pH;
                                    var v = betaFn(a, b);
                                    var lv = isFinite(v) && v > 0 ? Math.log(v) : NaN;
                                    vals.push(lv);
                                    if (isFinite(lv)) { vMin = Math.min(vMin, lv); vMax = Math.max(vMax, lv); }
                                }
                            }
                            var range = vMax - vMin || 1;
                            var vIdx = 0;
                            for (var py2 = plotTop; py2 < plotBottom; py2++) {
                                for (var px2 = plotLeft; px2 < plotRight; px2++) {
                                    var lv2 = vals[vIdx++];
                                    var idx = (py2*pw + px2)*4;
                                    if (!isFinite(lv2)) { data[idx]=12;data[idx+1]=12;data[idx+2]=32;data[idx+3]=255; continue; }
                                    var t = Math.max(0, Math.min(1, (lv2-vMin)/range));
                                    // inferno-ish
                                    var r2 = Math.round(255*Math.min(1, 0.1+1.2*t));
                                    var g2 = Math.round(255*Math.max(0, t*t*1.2));
                                    var b2 = Math.round(255*Math.max(0, 0.5-t*0.6));
                                    data[idx]=r2; data[idx+1]=g2; data[idx+2]=b2; data[idx+3]=255;
                                }
                            }
                            ctx.putImageData(imgData, 0, 0);
                            // Axes labels
                            ctx.fillStyle = '#c9d1d9'; ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var av = 1; av <= 5; av++) {
                                var axX = plotLeft + (av-0.2)/(5-0.2)*pW;
                                ctx.fillText(av, axX, plotBottom+4);
                            }
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (var bv = 1; bv <= 5; bv++) {
                                var axY = plotBottom - (bv-0.2)/(5-0.2)*pH;
                                ctx.fillText(bv, plotLeft-4, axY);
                            }
                            ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
                            ctx.fillText('a', plotLeft + pW/2, ph);
                            ctx.save(); ctx.translate(12, plotTop + pH/2); ctx.rotate(-Math.PI/2);
                            ctx.textBaseline = 'bottom'; ctx.fillText('b', 0, 0); ctx.restore();
                            ctx.fillStyle = '#ffffff'; ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            ctx.fillText('B(a, b) = \u0393(a)\u0393(b)/\u0393(a+b)  [log scale]', plotLeft+pW/2, 4);
                            ctx.restore();
                        }
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Evaluate \\(\\int_0^1 \\sqrt{t}\\,(1-t)^2\\,dt\\) using the Beta function.',
                    hint: 'Write the integrand as \\(t^{3/2-1}(1-t)^{3-1}\\) and identify \\(a\\) and \\(b\\).',
                    solution: 'We have \\(a = 3/2\\), \\(b = 3\\), so the integral equals \\(B(3/2, 3) = \\Gamma(3/2)\\Gamma(3)/\\Gamma(9/2)\\). Now \\(\\Gamma(3/2) = \\sqrt{\\pi}/2\\), \\(\\Gamma(3) = 2\\), \\(\\Gamma(9/2) = \\frac{7 \\cdot 5 \\cdot 3 \\cdot 1}{2^4}\\sqrt\\pi = \\frac{105\\sqrt\\pi}{16}\\). Therefore \\(B(3/2,3) = \\frac{(\\sqrt\\pi/2)\\cdot 2}{105\\sqrt\\pi/16} = \\frac{16}{105}\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 4: The Riemann Zeta Function
        // ================================================================
        {
            id: 'sec-zeta',
            title: 'The Riemann Zeta Function',
            content: `
<h2>The Riemann Zeta Function</h2>

<p>The Riemann zeta function connects complex analysis to the deepest mysteries of number theory. It encodes the distribution of prime numbers in its analytic structure.</p>

<div class="env-block theorem">
    <div class="env-title">Definition</div>
    <div class="env-body">
        For \\(\\operatorname{Re}(s) > 1\\), the <strong>Riemann zeta function</strong> is
        \\[
            \\zeta(s) = \\sum_{n=1}^\\infty \\frac{1}{n^s} = \\prod_p \\frac{1}{1 - p^{-s}},
        \\]
        where the product runs over all primes \\(p\\). The Euler product converges for \\(\\operatorname{Re}(s)>1\\) and expresses the fundamental theorem of arithmetic analytically.
    </div>
</div>

<h3>Analytic Continuation</h3>

<p>Like the Gamma function, \\(\\zeta(s)\\) extends to a meromorphic function on all of \\(\\mathbb{C}\\). It has a single simple pole at \\(s = 1\\) with residue 1, and is analytic everywhere else. The analytic continuation uses the identity</p>

\\[
    \\zeta(s) = \\frac{1}{\\Gamma(s)}\\int_0^\\infty \\frac{t^{s-1}}{e^t - 1}\\,dt, \\qquad \\operatorname{Re}(s) > 1,
\\]

<p>and extends the right-hand side via the theory of the Mellin transform.</p>

<h3>The Functional Equation</h3>

<div class="env-block theorem">
    <div class="env-title">Theorem: Riemann's Functional Equation (1859)</div>
    <div class="env-body">
        Define \\(\\xi(s) = \\tfrac{1}{2}s(s-1)\\pi^{-s/2}\\Gamma(s/2)\\zeta(s)\\). Then \\(\\xi(s) = \\xi(1-s)\\).
    </div>
</div>

<p>Equivalently, writing \\(Z(s) = \\pi^{-s/2}\\Gamma(s/2)\\zeta(s)\\), the functional equation reads \\(Z(s) = Z(1-s)\\). This symmetry about \\(\\operatorname{Re}(s) = 1/2\\) is proved using the Poisson summation formula and the Jacobi theta function</p>

\\[
    \\theta(t) = \\sum_{n=-\\infty}^\\infty e^{-\\pi n^2 t}.
\\]

<p>The key identity is \\(\\theta(1/t) = t^{1/2}\\,\\theta(t)\\), which encodes modular symmetry and converts the Mellin transform of \\(\\theta\\) into the functional equation for \\(\\zeta\\).</p>

<h3>Trivial and Non-Trivial Zeros</h3>

<p>The functional equation forces \\(\\zeta(s) = 0\\) at \\(s = -2, -4, -6, \\ldots\\) (the <em>trivial zeros</em>, arising from poles of \\(\\Gamma(s/2)\\)). All other zeros, the <em>non-trivial zeros</em>, lie in the <em>critical strip</em> \\(0 < \\operatorname{Re}(s) < 1\\). By the functional equation they are symmetric about \\(\\operatorname{Re}(s) = 1/2\\).</p>

<div class="env-block theorem">
    <div class="env-title">The Riemann Hypothesis (1859, open)</div>
    <div class="env-body">
        <p>All non-trivial zeros of \\(\\zeta(s)\\) lie on the <em>critical line</em> \\(\\operatorname{Re}(s) = \\frac{1}{2}\\).</p>
        <p>This is one of the Millennium Prize Problems. Over \\(10^{13}\\) zeros have been verified numerically to lie on the critical line; none is known to lie off it. If true, the Riemann Hypothesis gives sharp control over the error term in the prime number theorem.</p>
    </div>
</div>

<h3>Special Values</h3>

<p>The values at even positive integers are classical:</p>
\\[
    \\zeta(2) = \\frac{\\pi^2}{6}, \\quad \\zeta(4) = \\frac{\\pi^4}{90}, \\quad \\zeta(2k) = \\frac{(-1)^{k+1}(2\\pi)^{2k}B_{2k}}{2(2k)!},
\\]
<p>where \\(B_{2k}\\) are Bernoulli numbers. The values at odd positive integers (\\(\\zeta(3) = 1.202\\ldots\\)) are far more mysterious; Apery proved \\(\\zeta(3)\\) irrational in 1978, but no closed form is known.</p>

<div class="env-block remark">
    <div class="env-title">Connection to the ANT Course</div>
    <div class="env-body">
        <p>If you take the <em>Analytic Number Theory</em> course, the Riemann zeta function is the central object. The prime number theorem \\(\\pi(x) \\sim x/\\ln x\\) is proved by showing \\(\\zeta(s) \\neq 0\\) on \\(\\operatorname{Re}(s) = 1\\), then contour integration. The functional equation appears there in full generality, extended to Dirichlet \\(L\\)-functions \\(L(s,\\chi)\\).</p>
    </div>
</div>
`,
            visualizations: [
                {
                    id: 'viz-zeta-domain-coloring',
                    title: 'Domain Coloring of \u03b6(s)',
                    description: 'The Riemann zeta function on the complex plane. The critical strip 0 < Re(s) < 1 is highlighted. Non-trivial zeros (where all colors meet at darkness) appear on the critical line Re(s)=1/2. The single pole at s=1 is visible as a bright all-colors point.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 620, height: 440 });
                        var imHeight = 40;

                        function zetaApprox(sRe, sIm) {
                            if (Math.abs(sRe-1) < 0.08 && Math.abs(sIm) < 0.08) return [1e8, 0];
                            if (sRe > 0.5) {
                                var N = 30;
                                var sumRe = 0, sumIm = 0;
                                for (var n = 1; n <= N; n++) {
                                    var logN = Math.log(n);
                                    var mag = Math.exp(-sRe*logN);
                                    sumRe += mag*Math.cos(-sIm*logN);
                                    sumIm += mag*Math.sin(-sIm*logN);
                                }
                                // tail correction via Euler-Maclaurin
                                var tr = Math.exp(Math.log(N+0.5)*(1-sRe));
                                var ta = Math.log(N+0.5)*(-sIm);
                                var dRe = sRe-1, dIm = sIm;
                                var dm = dRe*dRe+dIm*dIm;
                                if (dm > 1e-8) {
                                    sumRe += (tr*Math.cos(ta)*dRe + tr*Math.sin(ta)*dIm)/dm;
                                    sumIm += (tr*Math.sin(ta)*dRe - tr*Math.cos(ta)*dIm)/dm;
                                }
                                return [sumRe, sumIm];
                            }
                            // Functional equation: zeta(s) = 2^s*pi^(s-1)*sin(pi*s/2)*Gamma(1-s)*zeta(1-s)
                            var z1 = zetaApprox(1-sRe, -sIm);
                            // 2^s
                            var twoS_mag = Math.exp(sRe*Math.LN2);
                            var twoS_arg = sIm*Math.LN2;
                            var twoS_re = twoS_mag*Math.cos(twoS_arg), twoS_im = twoS_mag*Math.sin(twoS_arg);
                            // pi^(s-1)
                            var logPi = Math.log(Math.PI);
                            var piS1_mag = Math.exp((sRe-1)*logPi);
                            var piS1_arg = sIm*logPi;
                            var piS1_re = piS1_mag*Math.cos(piS1_arg), piS1_im = piS1_mag*Math.sin(piS1_arg);
                            // sin(pi*s/2)
                            var sinRe = Math.sin(Math.PI*sRe/2)*Math.cosh(Math.PI*sIm/2);
                            var sinIm = Math.cos(Math.PI*sRe/2)*Math.sinh(Math.PI*sIm/2);
                            // Gamma(1-s) via Lanczos
                            function gammaLanczos(re, im) {
                                if (re < 0.5) {
                                    var sRe2=Math.sin(Math.PI*re)*Math.cosh(Math.PI*im);
                                    var sIm2=Math.cos(Math.PI*re)*Math.sinh(Math.PI*im);
                                    var m2=sRe2*sRe2+sIm2*sIm2; if(m2<1e-25) return [0,0];
                                    var pR=Math.PI*sRe2/m2, pI=-Math.PI*sIm2/m2;
                                    var g1=gammaLanczos(1-re,-im); var g1m=g1[0]*g1[0]+g1[1]*g1[1];
                                    if(g1m<1e-25) return [0,0];
                                    return [(pR*g1[0]+pI*g1[1])/g1m,(pI*g1[0]-pR*g1[1])/g1m];
                                }
                                var g=7, p=[0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
                                var zr=re-1,zi=im,xr=p[0],xi=0;
                                for(var k=1;k<9;k++){var d=Math.pow(zr+k,2)+zi*zi;if(d<1e-20)continue;xr+=p[k]*(zr+k)/d;xi-=p[k]*zi/d;}
                                var tr=zr+g+0.5,ti=zi,lm=0.5*Math.log(tr*tr+ti*ti),la=Math.atan2(ti,tr);
                                var em=zr+0.5,ea=em*la+zi*lm,pm2=Math.exp(em*lm-zi*la),pr2=pm2*Math.cos(ea),pi2=pm2*Math.sin(ea);
                                var en=Math.exp(-tr),er=en*Math.cos(-ti),ei2=en*Math.sin(-ti);
                                var s2p=Math.sqrt(2*Math.PI),t1r=s2p*(pr2*er-pi2*ei2),t1i=s2p*(pr2*ei2+pi2*er);
                                return [t1r*xr-t1i*xi,t1r*xi+t1i*xr];
                            }
                            var gam = gammaLanczos(1-sRe, -sIm);
                            // multiply: 2^s * pi^(s-1) * sin * gamma * zeta(1-s)
                            function cmul(a,b,c,d){return[a*c-b*d,a*d+b*c];}
                            var p1=cmul(twoS_re,twoS_im,piS1_re,piS1_im);
                            var p2=cmul(p1[0],p1[1],sinRe,sinIm);
                            var p3=cmul(p2[0],p2[1],gam[0],gam[1]);
                            return cmul(p3[0],p3[1],z1[0],z1[1]);
                        }

                        function redraw() {
                            viz.clear();
                            var xR = [-2, 4], yR = [-imHeight, imHeight];
                            viz.drawDomainColoring(zetaApprox, xR, yR);
                            var ctx = viz.ctx;
                            // Critical strip shading
                            var x0 = viz.width * (0 - xR[0]) / (xR[1]-xR[0]);
                            var x1 = viz.width * (1 - xR[0]) / (xR[1]-xR[0]);
                            var xh = viz.width * (0.5 - xR[0]) / (xR[1]-xR[0]);
                            ctx.fillStyle = '#ffffff0a';
                            ctx.fillRect(x0, 0, x1-x0, viz.height);
                            ctx.strokeStyle = '#ffffff44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4,4]);
                            ctx.beginPath(); ctx.moveTo(x0, 0); ctx.lineTo(x0, viz.height); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(x1, 0); ctx.lineTo(x1, viz.height); ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.strokeStyle = '#ffdd0088';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(xh, 0); ctx.lineTo(xh, viz.height); ctx.stroke();
                            // Labels
                            ctx.fillStyle = '#ffffff99';
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Critical strip', (x0+x1)/2, viz.height-28);
                            ctx.fillText('Re(s) = 1/2', xh, viz.height-14);
                            viz.screenText('\u03b6(s): pole at s=1, zeros on critical line', viz.width/2, 14, viz.colors.white, 13);
                        }

                        VizEngine.createSlider(controls, 'Im range', 10, 80, 40, 5, function(v) {
                            imHeight = v; redraw();
                        });
                        redraw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(\\zeta(s) \\neq 0\\) for \\(\\operatorname{Re}(s) > 1\\) using the Euler product representation.',
                    hint: 'For \\(\\operatorname{Re}(s) > 1\\) the Euler product converges absolutely. What does absolute convergence of a product imply about its value?',
                    solution: 'For \\(\\operatorname{Re}(s) > 1\\), we have \\(\\zeta(s) = \\prod_p (1-p^{-s})^{-1}\\). Each factor satisfies \\(|1-p^{-s}| \\geq 1 - p^{-\\operatorname{Re}(s)} > 0\\). An absolutely convergent product of non-zero factors is non-zero, so \\(\\zeta(s) \\neq 0\\) for \\(\\operatorname{Re}(s) > 1\\).'
                },
                {
                    question: 'Use the series \\(\\zeta(2) = \\sum_{n=1}^\\infty 1/n^2 = \\pi^2/6\\) to evaluate \\(\\sum_{n=1}^\\infty 1/(2n)^2\\) and \\(\\sum_{n=0}^\\infty 1/(2n+1)^2\\).',
                    hint: 'Split the sum \\(\\zeta(2)\\) into even and odd terms.',
                    solution: 'Even terms: \\(\\sum_{n=1}^\\infty 1/(2n)^2 = \\frac{1}{4}\\zeta(2) = \\pi^2/24\\). Odd terms: \\(\\sum_{n=0}^\\infty 1/(2n+1)^2 = \\zeta(2) - \\pi^2/24 = \\pi^2/6 - \\pi^2/24 = \\pi^2/8\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 5: Elliptic Functions Preview
        // ================================================================
        {
            id: 'sec-elliptic',
            title: 'Elliptic Functions Preview',
            content: `
<h2>Elliptic Functions Preview</h2>

<p>Elliptic functions are meromorphic functions on \\(\\mathbb{C}\\) that are periodic in <em>two</em> independent directions. They are the "next level" beyond trigonometric functions, which are periodic in only one direction.</p>

<h3>Period Lattices</h3>

<p>A non-degenerate <em>lattice</em> is a set \\(\\Lambda = \\{m\\omega_1 + n\\omega_2 : m, n \\in \\mathbb{Z}\\}\\) where \\(\\omega_1, \\omega_2 \\in \\mathbb{C}\\) are linearly independent over \\(\\mathbb{R}\\) (i.e., \\(\\omega_2/\\omega_1 \\notin \\mathbb{R}\\)). An <em>elliptic function</em> with period lattice \\(\\Lambda\\) is a meromorphic function \\(f\\) satisfying \\(f(z + \\omega) = f(z)\\) for all \\(\\omega \\in \\Lambda\\).</p>

<div class="env-block theorem">
    <div class="env-title">Basic Properties</div>
    <div class="env-body">
        <ol>
            <li>A holomorphic elliptic function is constant (Liouville: bounded and entire).</li>
            <li>The sum of residues in any fundamental parallelogram is zero.</li>
            <li>The number of poles equals the number of zeros (counted with multiplicity) in any fundamental parallelogram.</li>
            <li>The simplest non-constant elliptic functions have exactly 2 poles per fundamental domain (order 2).</li>
        </ol>
    </div>
</div>

<h3>The Weierstrass \\(\\wp\\)-Function</h3>

<p>The most fundamental elliptic function is the <strong>Weierstrass \\(\\wp\\)-function</strong>:</p>

\\[
    \\wp(z) = \\frac{1}{z^2} + \\sum_{\\omega \\in \\Lambda \\setminus \\{0\\}} \\left(\\frac{1}{(z-\\omega)^2} - \\frac{1}{\\omega^2}\\right).
\\]

<p>The subtractive term \\(-1/\\omega^2\\) ensures convergence of the sum. The function \\(\\wp\\) has double poles at all lattice points and is even: \\(\\wp(-z) = \\wp(z)\\). Its derivative</p>

\\[
    \\wp'(z) = -2\\sum_{\\omega \\in \\Lambda} \\frac{1}{(z-\\omega)^3}
\\]

<p>has simple poles of order 3 at lattice points and is odd.</p>

<h3>The Differential Equation</h3>

<p>The pair \\((\\wp(z), \\wp'(z))\\) satisfies the cubic relation</p>

\\[
    (\\wp')^2 = 4\\wp^3 - g_2\\,\\wp - g_3,
\\]

<p>where \\(g_2 = 60\\sum_{\\omega \\neq 0} \\omega^{-4}\\) and \\(g_3 = 140\\sum_{\\omega \\neq 0} \\omega^{-6}\\). This is precisely the Weierstrass form of an <em>elliptic curve</em>. The Weierstrass \\(\\wp\\)-function is the uniformization map from \\(\\mathbb{C}/\\Lambda\\) to the elliptic curve \\(y^2 = 4x^3 - g_2 x - g_3\\).</p>

<div class="env-block remark">
    <div class="env-title">Why "Elliptic"?</div>
    <div class="env-body">
        <p>The name comes from elliptic integrals: the arc length of an ellipse involves integrals like \\(\\int dt/\\sqrt{1-k^2\\sin^2 t}\\), which cannot be expressed in elementary functions. Inverting such integrals gives doubly periodic functions — the elliptic functions. The connection \\(\\mathbb{C}/\\Lambda \\cong\\) elliptic curve ties the analytic and algebraic perspectives.</p>
    </div>
</div>

<h3>Every Elliptic Function is a Rational Function of \\(\\wp\\) and \\(\\wp'\\)</h3>

<p>This structure theorem shows that the field of elliptic functions with period lattice \\(\\Lambda\\) is exactly \\(\\mathbb{C}(\\wp, \\wp')\\), the field generated by \\(\\wp\\) and \\(\\wp'\\) over \\(\\mathbb{C}\\). Thus the Weierstrass \\(\\wp\\)-function is the building block of all elliptic functions, just as \\(\\sin z\\) and \\(\\cos z\\) generate trigonometric functions.</p>
`,
            visualizations: [
                {
                    id: 'viz-weierstrass-p',
                    title: 'Weierstrass \u2118(z) on the Fundamental Parallelogram',
                    description: 'Domain coloring of the Weierstrass P-function with period lattice \u039b = \u03c9\u2081\u2124 \u2295 \u03c9\u2082\u2124. Use the sliders to change the lattice periods \u03c9\u2081 (real) and \u03c9\u2082 (purely imaginary). The double poles at lattice points appear as bright spots where all colors cycle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 600, height: 420 });
                        var om1 = 2.5, om2 = 2.5;

                        function weierstrassP(zRe, zIm, w1, w2) {
                            var zMag2 = zRe*zRe + zIm*zIm;
                            if (zMag2 < 1e-12) return [0, 0];
                            var sumRe = (zRe*zRe - zIm*zIm)/(zMag2*zMag2);
                            var sumIm = -2*zRe*zIm/(zMag2*zMag2);
                            var N = 6;
                            for (var m = -N; m <= N; m++) {
                                for (var n = -N; n <= N; n++) {
                                    if (m === 0 && n === 0) continue;
                                    var omRe = m*w1, omIm = n*w2;
                                    var omMag2 = omRe*omRe + omIm*omIm;
                                    if (omMag2 < 1e-12) continue;
                                    var dwRe = zRe-omRe, dwIm = zIm-omIm;
                                    var dwMag2 = dwRe*dwRe + dwIm*dwIm;
                                    if (dwMag2 < 1e-12) return [0,0];
                                    var t1r = (dwRe*dwRe-dwIm*dwIm)/(dwMag2*dwMag2);
                                    var t1i = -2*dwRe*dwIm/(dwMag2*dwMag2);
                                    var t2r = (omRe*omRe-omIm*omIm)/(omMag2*omMag2);
                                    var t2i = -2*omRe*omIm/(omMag2*omMag2);
                                    sumRe += t1r - t2r;
                                    sumIm += t1i - t2i;
                                }
                            }
                            return [sumRe, sumIm];
                        }

                        function redraw() {
                            viz.clear();
                            var hw = om1 * 1.6, hh = om2 * 1.4;
                            var xR = [-hw, hw], yR = [-hh, hh];
                            viz.drawDomainColoring(function(re, im) {
                                return weierstrassP(re, im, om1, om2);
                            }, xR, yR);
                            var ctx = viz.ctx;
                            // Draw fundamental parallelogram
                            var corners = [[0,0],[om1,0],[om1,om2],[0,om2]];
                            ctx.strokeStyle = '#ffffff55';
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([5,4]);
                            ctx.beginPath();
                            corners.forEach(function(c, i) {
                                var sx = viz.width*(c[0]-xR[0])/(xR[1]-xR[0]);
                                var sy = viz.height*(yR[1]-c[1])/(yR[1]-yR[0]);
                                i === 0 ? ctx.moveTo(sx,sy) : ctx.lineTo(sx,sy);
                            });
                            ctx.closePath(); ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('\u2118(z)  \u03c9\u2081=' + om1.toFixed(1) + '  \u03c9\u2082='+om2.toFixed(1)+'i', viz.width/2, 16, viz.colors.white, 13);
                        }

                        VizEngine.createSlider(controls, '\u03c9\u2081', 1, 4, 2.5, 0.1, function(v) { om1 = v; redraw(); });
                        VizEngine.createSlider(controls, '\u03c9\u2082', 1, 4, 2.5, 0.1, function(v) { om2 = v; redraw(); });
                        redraw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that any holomorphic elliptic function (with no poles) must be constant.',
                    hint: 'A holomorphic function on a compact set is bounded. What does the double-periodicity imply about the domain of \\(f\\)?',
                    solution: 'An elliptic function is periodic on \\(\\mathbb{C}/\\Lambda\\), which is compact (a torus). A holomorphic function on a compact Riemann surface is bounded, hence constant by Liouville\'s theorem.'
                }
            ]
        },

        // ================================================================
        // SECTION 6: Applications Across Mathematics
        // ================================================================
        {
            id: 'sec-applications',
            title: 'Applications Across Mathematics',
            content: `
<h2>Applications Across Mathematics</h2>

<p>The special functions we have studied are not abstract curiosities. They appear throughout mathematics, physics, and engineering, often as the exact answer to concrete problems.</p>

<h3>Number Theory</h3>

<p>The Gamma function controls the Gamma factors in the functional equations of all automorphic \\(L\\)-functions, generalizing zeta. The Beta function appears in Euler's evaluation of period integrals. The zeta function itself enters through the <em>prime number theorem</em>:</p>

\\[
    \\pi(x) \\sim \\frac{x}{\\ln x} \\quad \\text{as } x \\to \\infty,
\\]

<p>proved by showing \\(\\zeta(s) \\neq 0\\) on \\(\\operatorname{Re}(s) = 1\\). Sharper results require deeper information about the zeros of \\(\\zeta\\) in the critical strip.</p>

<h3>Statistical Mechanics and Quantum Field Theory</h3>

<p>Partition functions in statistical mechanics typically involve sums over states weighted by \\(e^{-\\beta E}\\). For bosonic systems, these sums converge to zeta and polylogarithm functions. The <em>Bose-Einstein condensate</em> transition temperature is governed by \\(\\zeta(3/2)\\). In quantum field theory, zeta-function regularization assigns finite values to divergent sums: \\(1 + 2 + 3 + \\cdots\\) is defined as \\(\\zeta(-1) = -1/12\\).</p>

<h3>Probability and Statistics</h3>

<p>The Gamma distribution has density \\(f(x) = x^{k-1}e^{-x}/\\Gamma(k)\\) for \\(x > 0\\), with the normalizing constant given exactly by \\(\\Gamma(k)\\). Chi-squared, Weibull, and exponential distributions are all special cases. Bayesian inference with conjugate priors reduces to integrals against Beta distributions, computed via \\(B(a,b) = \\Gamma(a)\\Gamma(b)/\\Gamma(a+b)\\).</p>

<h3>Differential Equations and Mathematical Physics</h3>

<p>Bessel's equation \\(z^2 y'' + zy' + (z^2 - \\nu^2)y = 0\\) arises in heat flow, acoustics, and electromagnetic scattering in cylindrical geometry. Its solutions, the Bessel functions, have series representations involving \\(\\Gamma(n + \\nu + 1)\\) in the denominators. The hypergeometric equation unifies a wide class of special functions (Legendre polynomials, Jacobi polynomials, Chebyshev polynomials) under one roof, all expressible via \\(\\Gamma\\) through Gauss's hypergeometric series.</p>

<h3>Fluid Dynamics and Conformal Mapping</h3>

<p>Conformal mappings constructed from elliptic functions describe flows around obstacles with corners (Schwarz-Christoffel transformations). The Weierstrass \\(\\wp\\)-function maps the fundamental domain to the Riemann sphere, giving uniformizations of elliptic curves that appear in the study of nonlinear integrable systems (KdV equation, sine-Gordon equation).</p>

<h3>String Theory and the Gamma Function</h3>

<p>The Veneziano amplitude (1968), the first string theory amplitude, is</p>

\\[
    A(s,t) = \\frac{\\Gamma(-s/2)\\,\\Gamma(-t/2)}{\\Gamma(-s/2 - t/2)},
\\]

<p>a ratio of Gamma functions of the Mandelstam variables. The symmetry \\(A(s,t) = A(t,s)\\) follows immediately from \\(B(a,b) = B(b,a)\\).</p>
`,
            visualizations: [
                {
                    id: 'viz-application-gallery',
                    title: 'Application Gallery',
                    description: 'Three application domains side by side: (left) Gamma distribution family, (center) zeta-function zeros and prime counting, (right) Bessel function J\u2080 and J\u2081. Toggle between domains with the buttons.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 600, height: 380, scale: 40, originX: 300, originY: 190 });
                        var mode = 'gamma';

                        function gammaReal(x) {
                            if (x <= 0 && x === Math.floor(x)) return Infinity;
                            if (x < 0.5) return Math.PI/(Math.sin(Math.PI*x)*gammaReal(1-x));
                            var g=7, p=[0.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
                            x-=1; var s2=p[0]; for(var i=1;i<=8;i++) s2+=p[i]/(x+i);
                            var t2=x+g+0.5; return Math.sqrt(2*Math.PI)*Math.pow(t2,x+0.5)*Math.exp(-t2)*s2;
                        }

                        // Bessel J0, J1 via series
                        function besselJ(nu, x) {
                            var s = 0;
                            for (var m = 0; m < 20; m++) {
                                var term = Math.pow(-1,m)*Math.pow(x/2, 2*m+nu)/(gammaReal(m+1)*gammaReal(m+nu+1));
                                if (!isFinite(term)) break;
                                s += term;
                            }
                            return s;
                        }

                        // Gamma distribution density
                        function gammaDensity(x, k, theta) {
                            if (x <= 0) return 0;
                            return Math.pow(x/theta, k-1)*Math.exp(-x/theta)/(theta*gammaReal(k));
                        }

                        function draw() {
                            viz.clear();
                            if (mode === 'gamma') {
                                viz.drawGrid(); viz.drawAxes();
                                var kvs = [[1, viz.colors.blue], [2, viz.colors.teal], [3, viz.colors.orange], [5, viz.colors.purple]];
                                kvs.forEach(function(kv) {
                                    viz.drawFunction(function(x) { return gammaDensity(x, kv[0], 1)*3; }, 0.01, 12, kv[1], 2.5, 300);
                                });
                                viz.screenText('Gamma Distributions: k=1,2,3,5', viz.width/2, 18, viz.colors.white, 13);
                                viz.screenText('f(x) = x^(k-1)e^{-x}/\u0393(k)', viz.width/2, 36, viz.colors.text, 11);
                                kvs.forEach(function(kv, i) {
                                    viz.screenText('k='+kv[0], 30+i*80, viz.height-24, kv[1], 11);
                                });
                            } else if (mode === 'zeta') {
                                // Prime counting function vs x/ln(x)
                                var primes = VizEngine.sievePrimes(200);
                                var primeSet = new Set(primes);
                                viz.drawGrid(10); viz.drawAxes();
                                // pi(x)
                                var piX = 0;
                                var ctx = viz.ctx;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var x = 2; x <= 180; x += 0.5) {
                                    var xi = Math.floor(x);
                                    piX = 0;
                                    for (var k = 0; k < primes.length && primes[k] <= xi; k++) piX++;
                                    var pt = viz.toScreen(x/20, piX/3);
                                    x === 2 ? ctx.moveTo(pt[0],pt[1]) : ctx.lineTo(pt[0],pt[1]);
                                }
                                ctx.stroke();
                                // li(x) approximation
                                viz.drawFunction(function(x) {
                                    var xv = x*20;
                                    if (xv <= 2) return 0;
                                    return xv/Math.log(xv)/3;
                                }, 0.2, 9, viz.colors.orange, 2, 300);
                                viz.screenText('\u03c0(x) vs x/ln(x) for x \u2264 180', viz.width/2, 18, viz.colors.white, 13);
                                viz.screenText('\u03c0(x)', 50, viz.height-30, viz.colors.blue, 12);
                                viz.screenText('x/ln(x)', 130, viz.height-30, viz.colors.orange, 12);
                            } else {
                                // Bessel functions
                                viz.drawGrid(); viz.drawAxes();
                                viz.drawFunction(function(x) { return besselJ(0, x*3); }, -0.1, 4, viz.colors.blue, 2.5, 400);
                                viz.drawFunction(function(x) { return besselJ(1, x*3); }, 0.01, 4, viz.colors.orange, 2.5, 400);
                                viz.screenText('Bessel Functions J\u2080 and J\u2081', viz.width/2, 18, viz.colors.white, 13);
                                viz.screenText('J\u2080(x)', 50, viz.height-30, viz.colors.blue, 12);
                                viz.screenText('J\u2081(x)', 130, viz.height-30, viz.colors.orange, 12);
                            }
                        }

                        VizEngine.createButton(controls, 'Gamma Dist.', function() { mode='gamma'; draw(); });
                        VizEngine.createButton(controls, 'Prime Counting', function() { mode='zeta'; draw(); });
                        VizEngine.createButton(controls, 'Bessel Fns', function() { mode='bessel'; draw(); });
                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'The Veneziano amplitude \\(A(s,t) = B(-s/2, -t/2)\\) satisfies \\(A(s,t) = A(t,s)\\). Explain why this symmetry follows from a basic property of the Beta function.',
                    hint: 'What is the relationship between \\(B(a,b)\\) and \\(B(b,a)\\)?',
                    solution: 'The Beta function satisfies \\(B(a,b) = B(b,a)\\), since the substitution \\(t \\mapsto 1-t\\) in the integral \\(\\int_0^1 t^{a-1}(1-t)^{b-1}dt\\) exchanges \\(a\\) and \\(b\\). Therefore \\(A(s,t) = B(-s/2,-t/2) = B(-t/2,-s/2) = A(t,s)\\).'
                },
                {
                    question: 'Show that the Gamma distribution with shape \\(k = 1\\) reduces to the exponential distribution with rate \\(1/\\theta\\), and verify that \\(\\int_0^\\infty f(x)\\,dx = 1\\) using \\(\\Gamma(1) = 1\\).',
                    hint: 'Write out the Gamma density for \\(k=1\\) and simplify.',
                    solution: 'For \\(k=1\\): \\(f(x) = \\frac{x^0 e^{-x/\\theta}}{\\theta\\,\\Gamma(1)} = \\frac{1}{\\theta}e^{-x/\\theta}\\), which is the exponential distribution with mean \\(\\theta\\). Integrating: \\(\\int_0^\\infty \\frac{1}{\\theta}e^{-x/\\theta}dx = 1\\) (standard exponential integral). Alternatively, the normalization follows from the definition \\(\\Gamma(1) = \\int_0^\\infty e^{-t}dt = 1\\) after the substitution \\(t = x/\\theta\\).'
                }
            ]
        },

        // ================================================================
        // SECTION 7: The Unity of Complex Analysis
        // ================================================================
        {
            id: 'sec-coda',
            title: 'The Unity of Complex Analysis',
            content: `
<h2>The Unity of Complex Analysis</h2>

<div class="env-block intuition">
    <div class="env-title">The View from the Summit</div>
    <div class="env-body">
        <p>You have climbed a long way. From the geometry of \\(\\mathbb{C}\\) as a plane, through the rigidity of analytic functions, the power of Cauchy's theorem, the residue calculus, conformal mappings, and analytic continuation, you have arrived at the special functions that appear across all of mathematics. The journey is coherent: each chapter was a step toward a deeper understanding of the complex plane.</p>
    </div>
</div>

<h3>The Grand Unification</h3>

<p>Complex analysis is not a collection of techniques; it is a way of seeing. Here is how the threads weave together:</p>

<ul>
    <li><strong>Analyticity is rigidity.</strong> An analytic function is determined everywhere by its values on any open set, or even on any convergent sequence (Ch 18: analytic continuation). This rigidity makes special functions like \\(\\Gamma\\) and \\(\\zeta\\) well-defined by any of their multiple representations.</li>

    <li><strong>Cauchy's theorem is the engine.</strong> The fundamental theorem (Ch 5–6) implies the residue theorem (Ch 11), which computes real integrals, sums series, and proves the functional equations of \\(L\\)-functions. Every major computation in this chapter uses residues or contour integration.</li>

    <li><strong>Topology matters.</strong> The number of zeros and poles of a meromorphic function in a region is governed by a topological invariant — the winding number. The argument principle (Ch 7) and its relatives control zeros of special functions, including the Riemann Hypothesis' concern with where \\(\\zeta(s) = 0\\).</li>

    <li><strong>Geometry is the medium.</strong> Conformal mappings (Ch 13–15) are not just tools for engineering. The uniformization theorem says that every simply connected Riemann surface is conformally equivalent to \\(\\mathbb{C}\\), \\(\\hat{\\mathbb{C}}\\), or the disk. Elliptic functions are the uniformization of tori \\(\\mathbb{C}/\\Lambda\\). The geometry of Riemann surfaces is the natural home of all this analysis.</li>

    <li><strong>Complex analysis meets algebra.</strong> The elliptic curve \\(y^2 = 4x^3 - g_2 x - g_3\\) is simultaneously an algebraic object (a cubic curve over \\(\\mathbb{C}\\)) and an analytic one (the quotient \\(\\mathbb{C}/\\Lambda\\)). This algebraic-analytic duality, mediated by \\(\\wp\\), is the prototype for the Langlands program.</li>
</ul>

<h3>Where to Go Next</h3>

<p>Complex analysis opens doors to many deep areas:</p>

<table>
    <thead><tr><th>Direction</th><th>Key Objects</th><th>Course / Text</th></tr></thead>
    <tbody>
        <tr><td>Analytic Number Theory</td><td>\\(\\zeta(s)\\), \\(L(s,\\chi)\\), primes</td><td>Davenport; Montgomery-Vaughan</td></tr>
        <tr><td>Algebraic Geometry</td><td>Elliptic curves, modular forms</td><td>Silverman; Diamond-Shurman</td></tr>
        <tr><td>Several Complex Variables</td><td>\\(\\bar\\partial\\), pseudoconvexity</td><td>Hormander; Krantz</td></tr>
        <tr><td>Riemann Surfaces</td><td>\\(\\mathbb{C}/\\Lambda\\), \\(\\mathcal{H}/\\Gamma\\)</td><td>Forster; Miranda</td></tr>
        <tr><td>Mathematical Physics</td><td>Bessel, hypergeometric, modular</td><td>Whittaker-Watson; Olver</td></tr>
    </tbody>
</table>

<h3>A Final Theorem</h3>

<p>We close with a theorem that captures the depth and beauty of what complex analysis can achieve:</p>

<div class="env-block theorem">
    <div class="env-title">Theorem: The Functional Equation in its Full Form</div>
    <div class="env-body">
        <p>Define the completed zeta function \\(\\xi(s) = \\frac{1}{2}s(s-1)\\pi^{-s/2}\\Gamma(s/2)\\zeta(s)\\). Then:</p>
        <ol>
            <li>\\(\\xi(s)\\) is an entire function of order 1.</li>
            <li>\\(\\xi(s) = \\xi(1-s)\\) (functional equation).</li>
            <li>All zeros of \\(\\xi\\) are the non-trivial zeros of \\(\\zeta\\).</li>
            <li>\\(\\xi\\) has the Hadamard product \\(\\xi(s) = \\xi(0)\\prod_\\rho \\bigl(1 - s/\\rho\\bigr)e^{s/\\rho}\\), where the product is over non-trivial zeros \\(\\rho\\).</li>
        </ol>
        <p>This single theorem unifies: the Gamma function (factor \\(\\Gamma(s/2)\\)), the functional equation (Poisson summation, Ch 19), entire function theory (Hadamard products, Ch 17), and the distribution of primes (zeros \\(\\rho\\), ANT course).</p>
    </div>
</div>

<div class="env-block remark">
    <div class="env-title">An Invitation</div>
    <div class="env-body">
        <p>Riemann wrote just one paper on number theory — eight pages in 1859 — yet it opened a program of research that continues today. The tools he used were the analytic continuation of \\(\\zeta\\), the functional equation, the Hadamard product, and contour integration. Every one of these is something you now understand.</p>
        <p>The Riemann Hypothesis remains open. The Langlands program — a vast generalization of the functional equation to all automorphic \\(L\\)-functions — is active and growing. The interplay of complex analysis, geometry, and arithmetic is as vital today as it was in 1859.</p>
        <p>You have the foundation. The rest is the future of mathematics.</p>
    </div>
</div>
`,
            visualizations: [],
            exercises: [
                {
                    question: '(Essay) The functional equation \\(\\xi(s) = \\xi(1-s)\\) implies that the non-trivial zeros of \\(\\zeta\\) come in pairs \\(\\{\\rho, 1-\\rho\\}\\). If \\(\\rho = \\sigma + it\\) is a zero, explain what other values must also be zeros, using both the functional equation and the Schwarz reflection principle \\(\\zeta(\\bar{s}) = \\overline{\\zeta(s)}\\).',
                    hint: 'The two symmetries are: \\(\\rho \\leftrightarrow 1-\\rho\\) (functional equation) and \\(\\rho \\leftrightarrow \\bar\\rho\\) (Schwarz reflection). Combine them.',
                    solution: 'If \\(\\rho = \\sigma + it\\) is a non-trivial zero, then: (1) \\(1-\\rho = (1-\\sigma) - it\\) is a zero by the functional equation; (2) \\(\\bar\\rho = \\sigma - it\\) is a zero by the Schwarz reflection principle; (3) \\(1-\\bar\\rho = (1-\\sigma)+it\\) is a zero by combining both. Thus non-trivial zeros come in groups of four symmetric under \\(\\operatorname{Re}(s)=1/2\\) and the real axis, unless \\(\\sigma = 1/2\\) (in which case 1 and 2 coincide and 3 and 4 coincide, giving a group of two on the critical line).'
                },
                {
                    question: 'Use the Euler product \\(\\zeta(s) = \\prod_p (1-p^{-s})^{-1}\\) to prove that \\(\\zeta(s)/\\zeta(2s) = \\sum_{n=1}^\\infty \\mu(n)/n^s\\) for \\(\\operatorname{Re}(s)>1\\), where \\(\\mu\\) is the Mobius function.',
                    hint: 'Formally expand each Euler factor \\((1-p^{-s})\\) in the product for \\(\\zeta(2s)/\\zeta(s)\\) and interpret the coefficients using unique factorization.',
                    solution: 'We have \\(1/\\zeta(s) = \\prod_p (1-p^{-s}) = \\sum_{n=1}^\\infty \\mu(n)/n^s\\), the Dirichlet series for the Mobius function. This follows because the product \\(\\prod_p(1-p^{-s})\\) expands (by multiplicativity and unique factorization) to assign coefficient \\((-1)^k\\) to squarefree \\(n\\) with \\(k\\) prime factors and \\(0\\) to non-squarefree \\(n\\), which is exactly \\(\\mu(n)\\). Therefore \\(\\zeta(s) \\cdot (1/\\zeta(s)) = 1\\) corresponds to \\(\\mu * \\mathbf{1} = \\varepsilon\\), the Dirichlet series identity.'
                },
                {
                    question: '(Essay) This chapter has covered Gamma, Beta, zeta, and elliptic functions. Choose one and write a short essay (one paragraph) explaining why it deserves to be called a "natural" function — one that complex analysis essentially forces into existence.',
                    hint: 'Think about uniqueness theorems: what property characterizes your chosen function up to a constant? Does any real-variable definition capture the same thing?',
                    solution: 'Example for Gamma: The Bohr-Mollerup theorem characterizes \\(\\Gamma(x)\\) uniquely (up to normalization) as the log-convex positive function satisfying \\(f(x+1) = xf(x)\\) and \\(f(1)=1\\). No simpler function shares these properties. From a complex-analytic view, \\(\\Gamma(z)\\) is the unique meromorphic function with simple poles at non-positive integers, prescribed residues \\((-1)^n/n!\\), and satisfying the functional equation; it is the "minimal" meromorphic extension of factorial. The Hadamard factorization theorem (Ch 17) makes this precise: \\(1/\\Gamma(z) = ze^{\\gamma z}\\prod_{n=1}^\\infty(1+z/n)e^{-z/n}\\) is an entire function of order 1, and no simpler entire function can have the same zero structure. Complex analysis does not merely extend Gamma to \\(\\mathbb{C}\\); it reveals that Gamma was always a complex-analytic object waiting to be recognized.'
                }
            ]
        }
    ]
});
