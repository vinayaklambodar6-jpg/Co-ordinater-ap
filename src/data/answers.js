// Model answers aligned with QUESTION_BANK (same chapter, same order).
export const ANSWER_BANK = {
  'Class 10': {
    Mathematics: {
      'Real Numbers': {
        objective: [
          '(b) 0 \u2264 r < b \u2014 by Euclid\u2019s division lemma the remainder is always less than the divisor and never negative.',
          '(b) 4 \u2014 96 = 2\u2075 \u00d7 3 and 404 = 2\u00b2 \u00d7 101, so HCF = 2\u00b2 = 4.',
          'Three decimal places \u2014 17/8 = 2.125.',
          '(a) 150 \u2014 LCM = (a \u00d7 b) / HCF = 1800 / 12 = 150.',
        ],
        short: [
          'Assume \u221a5 = p/q with p, q coprime. Then 5q\u00b2 = p\u00b2, so 5 divides p. Write p = 5m, then 25m\u00b2 = 5q\u00b2 \u21d2 q\u00b2 = 5m\u00b2, so 5 divides q too. This contradicts p, q being coprime, hence \u221a5 is irrational.',
          '510 = 2 \u00d7 3 \u00d7 5 \u00d7 17 and 92 = 2\u00b2 \u00d7 23, so HCF = 2 and LCM = 2\u00b2 \u00d7 3 \u00d7 5 \u00d7 17 \u00d7 23 = 23460. Verification: 2 \u00d7 23460 = 46920 = 510 \u00d7 92.',
        ],
        long: [
          'Suppose 3 + 2\u221a5 is rational, say r. Then \u221a5 = (r \u2212 3)/2. The right side is rational, so \u221a5 would be rational \u2014 a contradiction. Hence 3 + 2\u221a5 is irrational.',
          'Required time = LCM(9, 12, 15). 9 = 3\u00b2, 12 = 2\u00b2 \u00d7 3, 15 = 3 \u00d7 5, so LCM = 2\u00b2 \u00d7 3\u00b2 \u00d7 5 = 180 minutes = 3 hours. The bells next toll together after 3 hours.',
        ],
      },
      'Polynomials': {
        objective: [
          '(c) 3 \u2014 the highest power of x in 4x\u00b3 \u2212 2x\u00b2 + 7 is 3.',
          '(a) 5 \u2014 for x\u00b2 \u2212 5x + 6, sum of zeroes = \u2212b/a = 5.',
          '(a) x\u00b2 \u2212 x \u2212 6 \u2014 sum of zeroes = 1 and product = \u22126.',
          '(b) \u22122 \u2014 putting x = 1/2: 2(1/4) + 3(1/2) + k = 0 \u21d2 2 + k = 0 \u21d2 k = \u22122.',
        ],
        short: [
          'x\u00b2 + 7x + 10 = (x + 5)(x + 2), so the zeroes are \u22125 and \u22122. Sum = \u22127 = \u2212b/a and product = 10 = c/a, so the relationship is verified.',
          'For 2x\u00b2 \u2212 5x + 3: \u03b1 + \u03b2 = 5/2 and \u03b1\u03b2 = 3/2. Therefore 1/\u03b1 + 1/\u03b2 = (\u03b1 + \u03b2)/\u03b1\u03b2 = (5/2)/(3/2) = 5/3.',
        ],
        long: [
          'On dividing, quotient = x\u00b2 + (2/3)x + 8/9 and remainder = 53/9. Verification: (3x \u2212 1)(x\u00b2 + 2x/3 + 8/9) + 53/9 = 3x\u00b3 + x\u00b2 + 2x + 5.',
          'For x\u00b3 \u2212 3x\u00b2 + x + 1, sum of zeroes = 3a = 3 \u21d2 a = 1. Sum of products taken two at a time = 3a\u00b2 \u2212 b\u00b2 = 1 \u21d2 3 \u2212 b\u00b2 = 1 \u21d2 b\u00b2 = 2, so b = \u00b1\u221a2. Hence a = 1 and b = \u00b1\u221a2.',
        ],
      },
      'Pair of Linear Equations in Two Variables': {
        objective: [
          '(c) infinitely many solutions \u2014 the second equation is twice the first.',
          '(b) k \u2260 6 \u2014 a unique solution requires k/3 \u2260 2/1.',
          '(b) parallel to the y-axis \u2014 x = 3 is a vertical line.',
          '(a) 5 \u2014 subtracting the equations gives 7y = 35, so y = 5.',
        ],
        short: [
          'Adding: 2x = 18 \u21d2 x = 9. Then y = 14 \u2212 9 = 5. Solution: x = 9, y = 5.',
          'Let the numbers be x and y. x + y = 27 and xy = 182. Solving, x = 13 and y = 14 (or vice versa).',
        ],
        long: [
          'Let upstream speed = u and downstream speed = d (km/h). Then 30/u + 44/d = 10 and 40/u + 55/d = 13. Solving gives u = 5 and d = 11. Speed of boat = (5 + 11)/2 = 8 km/h and speed of stream = (11 \u2212 5)/2 = 3 km/h.',
          'Let the father\u2019s age be F and the son\u2019s age be S. F \u2212 5 = 7(S \u2212 5) and F + 5 = 3(S + 5). Solving: S = 10 years and F = 40 years.',
        ],
      },
      'Quadratic Equations': {
        objective: [
          '(a) 2 and 3 \u2014 x\u00b2 \u2212 5x + 6 = (x \u2212 2)(x \u2212 3).',
          '(b) \u22128 \u2014 D = (\u22124)\u00b2 \u2212 4(2)(3) = 16 \u2212 24 = \u22128.',
          '(a) \u22126 \u2014 2\u00b2 + 2k + 8 = 0 \u21d2 2k = \u221212 \u21d2 k = \u22126.',
          '(c) b\u00b2 = 4ac \u2014 this is the condition for equal (real) roots.',
        ],
        short: [
          '2x\u00b2 \u2212 7x + 3 = (2x \u2212 1)(x \u2212 3) = 0, so x = 1/2 or x = 3.',
          'For equal roots, D = 0: (\u22122k)\u00b2 \u2212 4(k)(6) = 0 \u21d2 4k\u00b2 \u2212 24k = 0 \u21d2 4k(k \u2212 6) = 0. Since k \u2260 0, k = 6.',
        ],
        long: [
          'Let the speed be x km/h. Then 360/x \u2212 360/(x + 5) = 1 \u21d2 x\u00b2 + 5x \u2212 1800 = 0 \u21d2 (x + 45)(x \u2212 40) = 0. Speed cannot be negative, so x = 40 km/h.',
          'Let the odd numbers be n and n + 2. Then n\u00b2 + (n + 2)\u00b2 = 394 \u21d2 2n\u00b2 + 4n \u2212 390 = 0 \u21d2 n\u00b2 + 2n \u2212 195 = 0 \u21d2 (n + 15)(n \u2212 13) = 0. So the numbers are 13 and 15 (or \u221215 and \u221213).',
        ],
      },
      'Arithmetic Progressions': {
        objective: [
          '(a) 47 \u2014 a\u2081\u2080 = 2 + 9(5) = 47.',
          '(a) 2 \u2014 a\u2085 = 10 + 4(\u22122) = 2.',
          '(a) 590 \u2014 S\u2082\u2080 = 20/2 [2(1) + 19(3)] = 10(59) = 590.',
          '(c) 8th \u2014 a\u2099 = 24 \u2212 3n = 0 \u21d2 n = 8.',
        ],
        short: [
          'The AP reversed is 253, 248, ..., 3 with d = \u22125. 20th term = 253 + 19(\u22125) = 158.',
          'Two-digit multiples of 3 run from 12 to 99 with d = 3. 99 = 12 + (n \u2212 1)3 \u21d2 n = 30.',
        ],
        long: [
          'a\u2083 + a\u2087 = 6 and a\u2083 \u00d7 a\u2087 = 8 give (a\u2083, a\u2087) = (2, 4) or (4, 2). For (2, 4), a = 1 and d = 0.5, so S\u2081\u2086 = 8[2 + 15(0.5)] = 76. For (4, 2), a = 5 and d = \u22120.5, so S\u2081\u2086 = 8[10 \u2212 7.5] = 20.',
          'Let the first prize be a, with d = \u221220. S\u2087 = 700 \u21d2 7/2[2a + 6(\u221220)] = 700 \u21d2 2a \u2212 120 = 200 \u21d2 a = 160. The prizes are \u20b9160, \u20b9140, \u20b9120, \u20b9100, \u20b980, \u20b960 and \u20b940.',
        ],
      },
      'Triangles': {
        objective: [
          '(a) same ratio \u2014 this is the Basic Proportionality Theorem.',
          '(b) equal \u2014 this is the AAA/AA similarity condition.',
          '(a) 6 cm \u2014 AD/DB = AE/EC \u21d2 2/3 = 4/EC \u21d2 EC = 6 cm.',
          '(b) squares of corresponding sides.',
        ],
        short: [
          'BPT: If a line parallel to one side of a triangle intersects the other two sides, it divides them in the same ratio. Proof uses equal-area triangles (\u0394BDE and \u0394CDE) and the ratio of their bases, giving AD/DB = AE/EC.',
          'By BPT, AD/DB = AE/EC \u21d2 4/6 = 5/EC \u21d2 EC = 30/4 = 7.5 cm.',
        ],
        long: [
          'Draw altitudes from the vertices to the corresponding sides. \u0394ABD ~ \u0394PQS gives AD/PS = AB/PQ. Using area = \u00bd \u00d7 base \u00d7 height for both triangles and the ratio of the corresponding sides squared gives ar(\u0394ABC)/ar(\u0394PQR) = (AB/PQ)\u00b2 = (BC/QR)\u00b2 = (CA/RP)\u00b2.',
          'Draw the altitude BD to the hypotenuse AC, giving \u0394ADB ~ \u0394ABC and \u0394BDC ~ \u0394ABC. Therefore AB\u00b2 = AD \u00d7 AC and BC\u00b2 = CD \u00d7 AC. Adding: AB\u00b2 + BC\u00b2 = AC(AD + CD) = AC\u00b2.',
        ],
      },
      'Coordinate Geometry': {
        objective: [
          '(a) 2\u221a2 \u2014 \u221a[(4 \u2212 2)\u00b2 + (1 \u2212 3)\u00b2] = \u221a8 = 2\u221a2.',
          '(a) (4, 5) \u2014 midpoint = ((2 + 6)/2, (3 + 7)/2).',
          '(b) the y-axis \u2014 x = 0.',
          '(a) (3, 5) \u2014 ((2\u00b74 + 1\u00b71)/3, (2\u00b76 + 1\u00b73)/3).',
        ],
        short: [
          'AB = \u221a[(7 \u2212 1)\u00b2 + (4 + 4)\u00b2] = \u221a(36 + 64) = \u221a100 = 10 units.',
          'Point = ((3\u00b78 + 1\u00b74)/4, (3\u00b75 + 1\u00b7(\u22123))/4) = (28/4, 12/4) = (7, 3).',
        ],
        long: [
          'AB = \u221a34, BC = \u221a34, CD = \u221a34 and DA = \u221a34, so all sides are equal. Diagonals AC = \u221a68 and BD = \u221a68 are also equal. A quadrilateral with equal sides and equal diagonals is a square.',
          'The triangle is right-angled at (0, 0), so its circumcentre is the midpoint of the hypotenuse joining (0, 6) and (8, 0), i.e. (4, 3).',
        ],
      },
      'Introduction to Trigonometry': {
        objective: [
          '(a) 1 \u2014 sin 30\u00b0 + cos 60\u00b0 = 1/2 + 1/2 = 1.',
          '(a) 3/5 \u2014 tan \u03b8 = 3/4 gives a 3-4-5 triangle, so sin \u03b8 = 3/5.',
          '(b) 1 \u2014 sec\u00b2\u03b8 \u2212 tan\u00b2\u03b8 = 1 is an identity.',
          '(b) 1 \u2014 cos 0\u00b0 = 1 and sec 0\u00b0 = 1.',
        ],
        short: [
          '3 cot A = 4 \u21d2 cot A = 4/3 \u21d2 tan A = 3/4. Then (1 \u2212 tan\u00b2A)/(1 + tan\u00b2A) = (1 \u2212 9/16)/(1 + 9/16) = 7/25. Also cos\u00b2A \u2212 sin\u00b2A = 16/25 \u2212 9/25 = 7/25. Hence both sides are equal.',
          '2 tan\u00b2 45\u00b0 + cos\u00b2 30\u00b0 \u2212 sin\u00b2 60\u00b0 = 2(1)\u00b2 + 3/4 \u2212 3/4 = 2.',
        ],
        long: [
          'LHS = (1 + sec \u03b8)/sec \u03b8 = cos \u03b8 + 1. RHS = sin\u00b2\u03b8/(1 \u2212 cos \u03b8) = (1 \u2212 cos\u00b2\u03b8)/(1 \u2212 cos \u03b8) = 1 + cos \u03b8. LHS = RHS, so the identity is proved.',
          'LHS = (cosec \u03b8 \u2212 cot \u03b8)\u00b2 = [(1 \u2212 cos \u03b8)/sin \u03b8]\u00b2 = (1 \u2212 cos \u03b8)\u00b2/(1 \u2212 cos\u00b2\u03b8) = (1 \u2212 cos \u03b8)/(1 + cos \u03b8) = RHS.',
        ],
      },
      'Statistics': {
        objective: [
          '(b) 3 \u2014 3 occurs most often (three times).',
          '(b) 9 \u2014 the middle value of the ordered data.',
          '(b) 14 \u2014 mode \u2248 3(median) \u2212 2(mean) = 54 \u2212 40 = 14.',
          '(b) 35 \u2014 class mark = (30 + 40)/2.',
        ],
        short: [
          'Mean = (10 + 12 + 14 + 16 + 18 + 20)/6 = 90/6 = 15.',
          'The ordered data is 12, 14, x \u2212 2, x + 4, 26, 30. Median = [(x \u2212 2) + (x + 4)]/2 = x + 1. Given median = 24, x + 1 = 24 \u21d2 x = 23.',
        ],
        long: [
          'Class marks: 5, 15, 25, 35, 45 with frequencies 5, 8, 15, 10, 2. \u03a3f = 40, \u03a3fx = 960, so mean = 24. Cumulative frequencies: 5, 13, 28, 38, 40, so the median class is 20\u201330 and median = 20 + (20 \u2212 13)/15 \u00d7 10 \u2248 24.67. Modal class is 20\u201330, so mode = 20 + (15 \u2212 8)/(30 \u2212 8 \u2212 10) \u00d7 10 \u2248 25.83.',
          'Cumulative frequencies: 12, 26, 34, 40, 50. N/2 = 25 lies in the class 120\u2013140. Median = 120 + (25 \u2212 12)/14 \u00d7 20 \u2248 138.57. The ogive confirms this value.',
        ],
      },
      'Probability': {
        objective: [
          '(a) 0 \u2014 an impossible event cannot occur.',
          '(b) 1/2 \u2014 prime numbers on a die are 2, 3 and 5.',
          '(b) 1 \u2014 the probabilities of all elementary events add up to 1.',
          '(a) 1/13 \u2014 there are 4 kings in 52 cards, 4/52 = 1/13.',
        ],
        short: [
          'Favourable outcomes for a sum of 8: (2,6), (3,5), (4,4), (5,3), (6,2) \u2014 five outcomes. Total outcomes = 36, so P = 5/36.',
          'Number of non-black balls = 5 red + 8 white = 13 out of 20. P(not black) = 13/20.',
        ],
        long: [
          'Sample space (HHH, HHT, HTH, HTT, THH, THT, TTH, TTT) has 8 outcomes. (i) Exactly two heads: 3/8. (ii) At least two heads: 4/8 = 1/2. (iii) At most one head: 4/8 = 1/2.',
          '(i) Two-digit numbers from 10 to 90: 81 outcomes, so P = 81/90 = 9/10. (ii) Perfect squares 1, 4, 9, 16, 25, 36, 49, 64, 81: 9 outcomes, P = 9/90 = 1/10. (iii) Multiples of 5: 18 outcomes, P = 18/90 = 1/5.',
        ],
      },
    },
    Science: {
      'Chemical Reactions and Equations': {
        objective: [
          '(c) double displacement \u2014 ions are exchanged and a precipitate forms.',
          '(a) Fe\u2082O\u2083\u00b7xH\u2082O \u2014 this is hydrated iron(III) oxide (rust).',
          '(b) a reducing agent \u2014 zinc is oxidised and reduces Cu\u00b2\u207a to Cu.',
          '(a) combination reaction \u2014 two substances combine to form one product.',
        ],
        short: [
          '3Fe + 4H\u2082O \u2192 Fe\u2083O\u2084 + 4H\u2082. Iron is oxidised and steam is reduced, so it is a redox (displacement) reaction.',
          'Iron is more reactive than copper, so it displaces copper from CuSO\u2084. The blue colour fades and a brownish-red deposit of copper forms on the nail: Fe + CuSO\u2084 \u2192 FeSO\u2084 + Cu.',
        ],
        long: [
          'Oxidation is loss of electrons or gain of oxygen; reduction is gain of electrons or loss of oxygen. Example 1: 2Mg + O\u2082 \u2192 2MgO (Mg is oxidised, O\u2082 is the oxidising agent). Example 2: CuO + H\u2082 \u2192 Cu + H\u2082O (CuO is reduced, H\u2082 is the reducing agent).',
          '(i) 2Mg + O\u2082 \u2192 2MgO. (ii) 2Pb(NO\u2083)\u2082 \u2192 2PbO + 4NO\u2082 + O\u2082. (iii) Zn + H\u2082SO\u2084 \u2192 ZnSO\u2084 + H\u2082.',
        ],
      },
      'Acids, Bases and Salts': {
        objective: [
          '(b) 7 \u2014 a neutral solution has pH 7 at 25 \u00b0C.',
          '(b) sodium hydrogen carbonate \u2014 NaHCO\u2083.',
          '(d) both (b) and (c) \u2014 NaOH and Ca(OH)\u2082 are strong bases.',
          '(b) 373 K \u2014 gypsum is heated at 373 K to form plaster of Paris.',
        ],
        short: [
          'pH measures the hydrogen-ion concentration on a 0\u201314 scale. It is used to test soil, treat acidity in the stomach, control tooth decay and check water quality.',
          'Washing soda: Na\u2082CO\u2083\u00b710H\u2082O \u2014 used in laundry and to soften hard water. Baking soda: NaHCO\u2083 \u2014 used in baking and as an antacid.',
        ],
        long: [
          'CaSO\u2084\u00b72H\u2082O (gypsum) on heating at 373 K gives CaSO\u2084\u00b7\u00bdH\u2082O (plaster of Paris) + 1\u00bdH\u2082O. It is a white powder that sets into a hard mass when mixed with water, and is used for plastering fractured bones, making casts, toys and false ceilings.',
          'Acid + metal \u2192 salt + hydrogen, e.g. Zn + H\u2082SO\u2084 \u2192 ZnSO\u2084 + H\u2082. Bases do not react with most metals; only amphoteric metals such as zinc and aluminium react with strong bases: Zn + 2NaOH \u2192 Na\u2082ZnO\u2082 + H\u2082.',
        ],
      },
      'Metals and Non-metals': {
        objective: [
          '(d) Potassium \u2014 it is among the most reactive metals.',
          '(a) galvanisation \u2014 coating iron with a layer of zinc.',
          '(b) Graphite \u2014 an allotrope of carbon that conducts electricity.',
          '(b) bauxite \u2014 the chief ore of aluminium.',
        ],
        short: [
          'Metals are good conductors of heat and electricity, malleable and ductile, and form basic oxides. Non-metals are generally poor conductors (graphite excepted), brittle, and form acidic or neutral oxides.',
          'Sodium reacts vigorously with oxygen and moisture in air and may catch fire, so it is stored under kerosene to keep it away from air and water.',
        ],
        long: [
          'The sulphide ore is first roasted in air to give the oxide: 2ZnS + 3O\u2082 \u2192 2ZnO + 2SO\u2082. The oxide is then reduced with carbon: ZnO + C \u2192 Zn + CO. The metal is finally refined.',
          'Corrosion is the slow attack of a metal by moisture, oxygen and acids, e.g. rusting of iron. It is faster in humid, salty or acidic conditions. Prevention: galvanisation, painting/oiling/greasing, and making alloys such as stainless steel.',
        ],
      },
      'Carbon and its Compounds': {
        objective: [
          '(b) 7 \u2014 ethane has 6 C\u2013H bonds and 1 C\u2013C bond.',
          '(b) \u2013OH \u2014 the alcohol functional group.',
          '(c) Ethane \u2014 it contains only single bonds.',
          '(b) fatty acids and sodium/potassium hydroxide \u2014 soaps are sodium or potassium salts of long-chain fatty acids.',
        ],
        short: [
          'Carbon has four valence electrons and forms four covalent bonds by sharing electrons, as in methane (CH\u2084). This gives stable molecules and the ability to form long chains.',
          'A homologous series is a family of compounds with the same functional group in which successive members differ by a \u2013CH\u2082\u2013 unit. Alkanes: CH\u2084, C\u2082H\u2086, C\u2083H\u2088.',
        ],
        long: [
          'A soap molecule has a long hydrocarbon tail (hydrophobic) and an ionic head (hydrophilic). In water the molecules form micelles with tails pointing inwards towards oil droplets and ionic heads outwards. Agitation pulls the oil away and it is washed off with water.',
          'Soaps form insoluble scum with calcium and magnesium ions in hard water, so they do not lather well. Detergents do not form scum and therefore work in hard water as well as soft water.',
        ],
      },
      'Life Processes': {
        objective: [
          '(b) chloroplast \u2014 it contains chlorophyll for photosynthesis.',
          '(b) nephron \u2014 the functional unit of the kidney.',
          '(b) lactic acid \u2014 formed in muscles during anaerobic respiration.',
          '(c) alveoli \u2014 the site of gaseous exchange in the lungs.',
        ],
        short: [
          '6CO\u2082 + 6H\u2082O \u2192(light, chlorophyll) C\u2086H\u2081\u2082O\u2086 + 6O\u2082. Rate depends on light intensity, CO\u2082 concentration, temperature and water availability.',
          'The small intestine completes digestion using pancreatic and intestinal enzymes, and its villi greatly increase the surface area for absorption of digested food into the blood.',
        ],
        long: [
          'Mouth (salivary amylase digests starch) \u2192 oesophagus (peristalsis) \u2192 stomach (HCl, pepsin digest proteins) \u2192 small intestine (bile emulsifies fats; pancreatic amylase, trypsin and lipase act) \u2192 large intestine (water absorption) \u2192 anus.',
          'Blood is filtered in the glomerulus under pressure into Bowman\u2019s capsule. Useful substances (glucose, amino acids, salts, water) are reabsorbed in the tubule. The remaining fluid is concentrated and passes through the collecting duct as urine.',
        ],
      },
      'Control and Coordination': {
        objective: [
          '(b) cerebellum \u2014 it maintains balance and posture.',
          '(b) insulin \u2014 lowers blood glucose levels.',
          '(a) synapse \u2014 the junction between two neurons.',
          '(a) auxin \u2014 promotes cell elongation.',
        ],
        short: [
          'A reflex action is a quick, automatic response to a stimulus. Reflex arc: receptor \u2192 sensory neuron \u2192 spinal cord \u2192 motor neuron \u2192 effector (muscle). Example: withdrawing the hand from a hot object.',
          'Thyroid gland: thyroxine, which regulates metabolism. Adrenal gland: adrenaline, which prepares the body for emergencies by increasing heart rate and blood flow.',
        ],
        long: [
          'Cerebrum: thinking, memory, voluntary actions and senses. Cerebellum: balance, posture and coordination of movement. Medulla oblongata: involuntary actions such as breathing, heartbeat and blood pressure.',
          'Nervous coordination uses electrical impulses along neurons; it is very fast and short-lived. Hormonal coordination uses chemicals carried in the blood; it is slower but has longer-lasting effects.',
        ],
      },
      'Light - Reflection and Refraction': {
        objective: [
          '(b) virtual and erect \u2014 a plane mirror always forms a virtual, erect image.',
          '(b) infinite \u2014 a plane mirror has infinite radius of curvature.',
          '(b) virtual and erect \u2014 a concave lens always forms a virtual, erect, diminished image.',
          '(b) dioptre \u2014 the SI unit of power of a lens.',
        ],
        short: [
          'Law 1: angle of incidence = angle of reflection. Law 2: the incident ray, the reflected ray and the normal at the point of incidence all lie in the same plane.',
          'Using 1/f = 1/v + 1/u with f = \u221215 cm and u = \u221220 cm: 1/v = \u22121/15 + 1/20 = \u22121/60, so v = \u221260 cm. The image is real, inverted and 3 times magnified.',
        ],
        long: [
          'For a concave mirror, 1/v + 1/u = 1/f, with distances measured from the pole. Sign convention: distances measured in the direction of the incident light are positive and those against it are negative; heights above the principal axis are positive. Applying the convention gives the mirror formula used for all spherical mirrors.',
          'Using 1/v \u2212 1/u = 1/f with f = +10 cm and u = \u221225 cm: 1/v = 1/10 \u2212 1/25 = 3/50, so v \u2248 +16.7 cm. Magnification m = v/u \u2248 \u22120.67, so the image is real, inverted and about 3.3 cm high (diminished).',
        ],
      },
      'Electricity': {
        objective: [
          '(c) ohm \u2014 the SI unit of resistance.',
          '(b) IR \u2014 Ohm\u2019s law is V = IR.',
          '(b) 10 \u03a9 \u2014 resistances in series add: 4 + 6 = 10 \u03a9.',
          '(b) VI \u2014 electric power P = VI.',
        ],
        short: [
          'Ohm\u2019s law: at constant temperature, the current through a conductor is directly proportional to the potential difference, V = IR. Experiment: connect a nichrome wire with an ammeter, voltmeter and rheostat; vary the current and plot V against I \u2014 a straight line through the origin verifies the law.',
          'Tungsten has a very high melting point and high resistivity, so the filament becomes white-hot without melting, giving light.',
        ],
        long: [
          'In parallel, the same voltage V is applied across each resistor and the current divides: I = I\u2081 + I\u2082 + I\u2083. Using I = V/R gives V/R = V/R\u2081 + V/R\u2082 + V/R\u2083, hence 1/R = 1/R\u2081 + 1/R\u2082 + 1/R\u2083. Therefore R = R\u2081R\u2082R\u2083/(R\u2081R\u2082 + R\u2082R\u2083 + R\u2083R\u2081).',
          'P = I\u00b2R = (15)\u00b2 \u00d7 8 = 1800 W = 1.8 kW. Energy = P \u00d7 t = 1.8 kW \u00d7 2 h = 3.6 kWh.',
        ],
      },
      'Magnetic Effects of Electric Current': {
        objective: [
          '(b) right-hand thumb rule \u2014 it gives the direction of the field around a straight conductor.',
          '(b) uniform \u2014 the field inside a long solenoid is uniform and parallel.',
          '(a) electrical energy into mechanical energy \u2014 that is the function of a motor.',
          '(a) 50 Hz \u2014 the standard AC frequency in India.',
        ],
        short: [
          'Fleming\u2019s left-hand rule: stretch the thumb, forefinger and middle finger of the left hand mutually perpendicular. If the forefinger points along the magnetic field and the middle finger along the current, the thumb gives the direction of the force (motion) on the conductor.',
          'Electromagnetic induction is the production of an electric current in a coil when the magnetic field linked with it changes. The direction of the induced current is given by Fleming\u2019s right-hand rule.',
        ],
        long: [
          'A rectangular coil is placed between the poles of a magnet. When current flows, forces on the two arms form a couple that rotates the coil. The commutator reverses the current every half rotation, so rotation continues in the same direction \u2014 this is the working of a simple electric motor.',
          'A solenoid is a coil of many circular turns. Its magnetic field is like that of a bar magnet, with uniform, parallel field lines inside. Uses: electromagnets, loudspeakers, MRI machines and electric bells.',
        ],
      },
    },
  },
  'Class 9': {
    Mathematics: {
      'Number Systems': {
        objective: [
          '(c) \u221a7 \u2014 it cannot be written as p/q.',
          '(a) 0.125 \u2014 1/8 = 0.125, a terminating decimal.',
          '(c) a real number \u2014 every rational number is real.',
          '(b) 8 \u2014 (64)^(1/2) = \u221a64 = 8.',
        ],
        short: [
          'Draw a number line, mark 0 to 2, and at 2 draw a perpendicular of length 1. Join the origin to its top: the hypotenuse is \u221a5. With the compass at the origin, mark this length on the number line to represent \u221a5.',
          '(3 + \u221a3)(2 + \u221a2) = 6 + 3\u221a2 + 2\u221a3 + \u221a6.',
        ],
        long: [
          'Suppose \u221a3 = p/q with p, q coprime. Then 3q\u00b2 = p\u00b2, so 3 divides p; write p = 3m. Then 9m\u00b2 = 3q\u00b2 \u21d2 q\u00b2 = 3m\u00b2, so 3 divides q also \u2014 a contradiction. Hence \u221a3 is irrational.',
          '1/(\u221a7 \u2212 \u221a6) = (\u221a7 + \u221a6)/(7 \u2212 6) = \u221a7 + \u221a6 \u2248 2.6458 + 2.4495 = 5.10 (correct to two decimal places).',
        ],
      },
      'Polynomials': {
        objective: [
          '(c) 2 \u2014 the highest power of x is 2.',
          '(a) 0 \u2014 p(1) = 1 \u2212 3 + 2 = 0.',
          '(a) linear \u2014 a polynomial of degree 1.',
          '(c) 3 \u2014 p(\u22121) = 1 \u2212 k + 2 = 0 \u21d2 k = 3.',
        ],
        short: [
          'By the remainder theorem, remainder = p(\u22121) = (\u22121)\u00b3 + 3(\u22121)\u00b2 + 3(\u22121) + 1 = \u22121 + 3 \u2212 3 + 1 = 0.',
          'x\u00b2 \u2212 5x + 6 = (x \u2212 2)(x \u2212 3).',
        ],
        long: [
          'p(1) = 1 \u2212 3 + 3 \u2212 1 = 0, so by the Factor Theorem (x \u2212 1) is a factor of x\u00b3 \u2212 3x\u00b2 + 3x \u2212 1.',
          '2x\u00b3 + x\u00b2 \u2212 2x \u2212 1 = x\u00b2(2x + 1) \u2212 1(2x + 1) = (2x + 1)(x\u00b2 \u2212 1) = (2x + 1)(x \u2212 1)(x + 1).',
        ],
      },
      'Triangles': {
        objective: [
          '(a) two sides and the included angle are equal \u2014 SAS criterion.',
          '(b) equal \u2014 angles opposite equal sides are equal.',
          '(b) 180\u00b0 \u2014 angle sum property.',
          '(c) AAA \u2014 it gives similarity, not congruence.',
        ],
        short: [
          'In \u0394ABC with AB = AC, draw AD bisecting \u2220A. \u0394ABD \u2245 \u0394ACD by SAS (AB = AC, AD common, \u2220BAD = \u2220CAD), so \u2220B = \u2220C (CPCT).',
          'Yes. AB = DE, \u2220B = \u2220E and BC = EF, so \u0394ABC \u2245 \u0394DEF by the SAS congruence rule.',
        ],
        long: [
          'Through A draw a line parallel to BC. Then \u2220PAB = \u2220ABC and \u2220QAC = \u2220ACB (alternate angles). Since \u2220PAB + \u2220BAC + \u2220QAC = 180\u00b0 (straight line), \u2220ABC + \u2220BAC + \u2220ACB = 180\u00b0.',
          'In \u0394ABC with \u2220B > \u2220C, mark D on AC such that \u2220CBD = \u2220BCD. Then BD = DC, and using the exterior angle theorem in \u0394ABD gives \u2220B > \u2220C \u21d2 AC > AB. Hence the greater side has the greater angle opposite it.',
        ],
      },
      'Surface Areas and Volumes': {
        objective: [
          '(c) 150 cm\u00b2 \u2014 6 \u00d7 5\u00b2 = 150 cm\u00b2.',
          '(a) \u03c0r\u00b2h \u2014 the volume of a cylinder.',
          '(a) 5 cm \u2014 l = \u221a(3\u00b2 + 4\u00b2) = 5 cm.',
          '(a) 2\u03c0r\u00b2 \u2014 the curved surface area of a hemisphere.',
        ],
        short: [
          'Surface area = 4\u03c0r\u00b2 = 4 \u00d7 22/7 \u00d7 7 \u00d7 7 = 616 cm\u00b2.',
          'Let r = 2k and h = 3k. Then \u03c0(2k)\u00b2(3k) = 1617 \u21d2 12k\u00b3 \u00d7 22/7 = 1617 \u21d2 k\u00b3 = 42.875 \u21d2 k = 3.5. So r = 7 cm and h = 10.5 cm.',
        ],
        long: [
          'Volume of the cylinder = \u03c0r\u00b2h = 22/7 \u00d7 49 \u00d7 8 = 1232 cm\u00b3. Volume of one cube = 2\u00b3 = 8 cm\u00b3. Number of cubes = 1232/8 = 154.',
          'Volume of the cone = (1/3)\u03c0r\u00b2h = (1/3)\u03c0(36)(24) = 288\u03c0 cm\u00b3. If the sphere has radius R, (4/3)\u03c0R\u00b3 = 288\u03c0 \u21d2 R\u00b3 = 216 \u21d2 R = 6 cm.',
        ],
      },
      'Statistics': {
        objective: [
          '(a) 49 \u2014 range = 56 \u2212 7 = 49.',
          '(a) 25 \u2014 class mark = (20 + 30)/2.',
          '(b) frequency \u2014 the height of a bar shows frequency.',
          '(b) 6 \u2014 mean = 30/5 = 6.',
        ],
        short: [
          'Mean of the first ten natural numbers = (1 + 2 + ... + 10)/10 = 55/10 = 5.5.',
          'Plot the class marks (5, 15, 25, 35) against frequencies (2, 5, 8, 3) and join the points by straight lines; close the polygon at the midpoints of the neighbouring classes with zero frequency.',
        ],
        long: [
          'Frequency table: marks 10, 20, 30, 40, 50 with frequencies 3, 5, 8, 9, 5. \u03a3f = 30 and \u03a3fx = 30 + 100 + 240 + 360 + 250 = 980, so mean = 980/30 \u2248 32.67.',
          'Ordered data: 15, 18, 20, 20, 22, 25, 25, 25, 28, 30. Median = (22 + 25)/2 = 23.5 and mode = 25 (it occurs three times).',
        ],
      },
    },
    Science: {
      'Matter in Our Surroundings': {
        objective: [
          '(a) evaporation \u2014 change of liquid to vapour at any temperature.',
          '(c) gases \u2014 particles move fastest and diffuse most quickly.',
          '(b) melting point \u2014 the temperature at which a solid melts.',
          '(b) liquid \u2014 definite volume but no definite shape.',
        ],
        short: [
          'Latent heat of vaporisation is the heat required to change 1 kg of a liquid into vapour at its boiling point without a change in temperature. Latent heat of fusion is the heat required to change 1 kg of a solid into liquid at its melting point.',
          'The heat supplied is used to overcome the intermolecular forces of attraction between particles, not to increase their kinetic energy, so the temperature stays constant during boiling.',
        ],
        long: [
          'On heating, particles gain kinetic energy and move faster: solid \u2192 liquid \u2192 gas. On cooling, the reverse happens. On increasing pressure, particles are brought closer, so gases liquefy and liquids may solidify.',
          'Solids: particles closely packed, strong forces, definite shape and volume, almost incompressible. Liquids: loosely packed, weaker forces, definite volume but no fixed shape, slightly compressible. Gases: far apart, negligible forces, no fixed shape or volume, highly compressible.',
        ],
      },
      'Atoms and Molecules': {
        objective: [
          '(b) 7 \u2014 2 H + 1 S + 4 O = 7 atoms.',
          '(a) 6.022 \u00d7 10\u00b2\u00b3 particles \u2014 Avogadro\u2019s number.',
          '(b) 16 u \u2014 the atomic mass of oxygen.',
          '(c) 58.5 u \u2014 23 + 35.5 = 58.5 u.',
        ],
        short: [
          'Law of conservation of mass: mass can neither be created nor destroyed in a chemical reaction. Law of constant proportions: a compound always contains the same elements in fixed proportions by mass.',
          'Molar mass of CaCO\u2083 = 40 + 12 + 3(16) = 100 g/mol. Therefore 100 g of CaCO\u2083 contains 1 mole.',
        ],
        long: [
          'Na\u2082CO\u2083, Al\u2082O\u2083, Ca(OH)\u2082, (NH\u2084)\u2082SO\u2084 and MgCl\u2082. Write the symbols with their valencies and cross them over, then simplify the ratios; for example, Al\u00b3\u207a with O\u00b2\u207b gives Al\u2082O\u2083 and Mg\u00b2\u207a with Cl\u207b gives MgCl\u2082.',
          'Molar mass of CO\u2082 = 44 g/mol, so 22 g = 0.5 mol = 0.5 \u00d7 6.022 \u00d7 10\u00b2\u00b3 = 3.011 \u00d7 10\u00b2\u00b3 molecules. Molar mass of H\u2082O = 18 g/mol, so 9 g = 0.5 mol of water.',
        ],
      },
      'Motion': {
        objective: [
          '(b) m/s\u00b2 \u2014 the SI unit of acceleration.',
          '(a) zero \u2014 velocity does not change with time.',
          '(b) displacement \u2014 the area under a v\u2013t graph gives displacement.',
          '(b) 60 km/h \u2014 average speed = distance/time.',
        ],
        short: [
          'Distance is the total length of the path travelled and is a scalar. Displacement is the shortest straight-line distance from the initial to the final position, with direction. For one full round of a circular track, distance = 2\u03c0r but displacement = 0.',
          'a = (v \u2212 u)/t = (20 \u2212 0)/5 = 4 m/s\u00b2.',
        ],
        long: [
          'Acceleration a = (v \u2212 u)/t gives v = u + at. The area under the v\u2013t graph = area of the rectangle + area of the triangle = ut + \u00bd(v \u2212 u)t = ut + \u00bdat\u00b2. Eliminating t gives v\u00b2 = u\u00b2 + 2as.',
          'At the highest point v = 0. Using v\u00b2 = u\u00b2 \u2212 2gh: 0 = 400 \u2212 20h \u21d2 h = 20 m. Time to reach the top = u/g = 2 s, so total time = 4 s.',
        ],
      },
      'Force and Laws of Motion': {
        objective: [
          '(b) newton \u2014 the SI unit of force.',
          '(b) inertia \u2014 Newton\u2019s first law is the law of inertia.',
          '(a) 10 kg\u00b7m/s \u2014 p = mv = 2 \u00d7 5.',
          '(b) on different bodies \u2014 action and reaction act on two different bodies.',
        ],
        short: [
          'First law: a body remains in its state of rest or uniform motion unless acted upon by an external force. Second law: F = ma (rate of change of momentum). Third law: every action has an equal and opposite reaction.',
          'When the bus stops suddenly, the lower part of the body stops with the bus, but the upper body tends to continue moving forward due to inertia, so the passenger falls forward.',
        ],
        long: [
          'Momentum p = mv. A change in momentum \u0394p = m(v \u2212 u) takes place in time t. Therefore F = \u0394p/t = m(v \u2212 u)/t = ma, which is Newton\u2019s second law.',
          'F = m(v \u2212 u)/t = 0.01(0 \u2212 400)/0.02 = \u2212200 N. The negative sign shows the force acts opposite to the motion of the bullet.',
        ],
      },
      'Sound': {
        objective: [
          '(b) longitudinal waves \u2014 particles vibrate along the direction of propagation.',
          '(c) steel \u2014 sound travels fastest in solids.',
          '(b) 20 Hz to 20,000 Hz \u2014 the audible range for humans.',
          '(c) time period \u2014 time for one complete oscillation.',
        ],
        short: [
          'Frequency is the number of oscillations per second (in hertz) and determines the pitch of a sound. Amplitude is the maximum displacement of a particle from its mean position and determines loudness.',
          'Reverberation is the repeated reflection of sound that makes it persist after the source stops. It is reduced by using sound-absorbing materials such as curtains, carpets and porous panels.',
        ],
        long: [
          'The pinna collects sound and directs it into the ear canal, where it strikes the eardrum and makes it vibrate. The three ossicles amplify the vibrations and pass them to the cochlea, which converts them into electrical signals. The auditory nerve carries these signals to the brain.',
          'Speed v = f\u03bb = 500 \u00d7 0.68 = 340 m/s. Time period T = 1/f = 1/500 = 0.002 s.',
        ],
      },
    },
  },
  'Class 8': {
    Mathematics: {
      'Rational Numbers': {
        objective: [
          '(c) \u22123/4 \u2014 it is of the form p/q with q \u2260 0.',
          '(a) 7/9 \u2014 additive inverse changes the sign.',
          '(a) 1 \u2014 the numbers are reciprocals.',
          '(b) \u22121/5 \u2014 reciprocal of \u22125 is \u22121/5.',
        ],
        short: [
          'Draw a number line from \u22121 to 1 and divide each unit into five equal parts. Mark 3/5 three parts to the right of 0 and \u22122/5 two parts to the left of 0.',
          'Write 1/3 = 10/30 and 1/2 = 15/30. Five rational numbers between them are 11/30, 12/30, 13/30, 14/30 and 14.5/30 (or use fractions with a larger denominator such as 21/60 to 29/60).',
        ],
        long: [
          'b + c = 2/3 \u2212 3/4 = 8/12 \u2212 9/12 = \u22121/12, so a(b + c) = (1/2)(\u22121/12) = \u22121/24. Also ab = 1/3 and ac = \u22123/8, whose sum is 8/24 \u2212 9/24 = \u22121/24. Hence a(b + c) = ab + ac.',
          'Other number = \u22125 \u2212 (\u221213/6) = \u221230/6 + 13/6 = \u221217/6.',
        ],
      },
      'Squares and Square Roots': {
        objective: [
          '(b) 225 \u2014 15 \u00d7 15 = 225.',
          '(d) both (b) and (c) \u2014 1089 = 33\u00b2 and 1024 = 32\u00b2.',
          '(a) 0.12 \u2014 0.12 \u00d7 0.12 = 0.0144.',
          '(a) 20 \u2014 numbers from 101 to 120 lie between 10\u00b2 and 11\u00b2.',
        ],
        short: [
          'Using the long division method, \u221a2304 = 48 (since 48\u00b2 = 2304).',
          '180 = 2\u00b2 \u00d7 3\u00b2 \u00d7 5. The factor 5 is unpaired, so 180 must be multiplied by 5 to get 900 = 30\u00b2.',
        ],
        long: [
          'Number of plants in each row = \u221a2025 = 45, since 45 \u00d7 45 = 2025.',
          '\u221a12.25 = 3.5 (because 3.5\u00b2 = 12.25) and \u221a0.0009 = 0.03 (because 0.03\u00b2 = 0.0009).',
        ],
      },
    },
    Science: {
      'Force and Pressure': {
        objective: [
          '(b) force/area \u2014 pressure is force per unit area.',
          '(b) pascal \u2014 the SI unit of pressure.',
          '(b) barometer \u2014 used to measure atmospheric pressure.',
          '(d) all of these \u2014 a force can change shape, speed and direction.',
        ],
        short: [
          'A sharp knife has a very small area of contact at its edge. For the same force, pressure = force/area is much greater, so it cuts easily.',
          'Atmospheric pressure is the force exerted by the weight of the air column above a surface per unit area. Example: a rubber sucker sticks to a surface because the outside atmospheric pressure holds it.',
        ],
        long: [
          'Pressure in a liquid depends on depth (P = h\u03c1g), on the density of the liquid, and on acceleration due to gravity. It acts equally in all directions at a given depth.',
          'Take a plastic bottle and make three holes at different heights. Fill it with water: water rushes out fastest and farthest from the lowest hole, showing that pressure increases with depth. At the same horizontal level, water flows out with equal force in all directions.',
        ],
      },
      'Light': {
        objective: [
          '(b) virtual and erect \u2014 a plane mirror forms a virtual, erect image.',
          '(a) angle of incidence \u2014 by the law of reflection.',
          '(b) diverging lens \u2014 a concave lens diverges light.',
          '(b) virtual and diminished \u2014 a convex mirror always forms such an image.',
        ],
        short: [
          'First law: angle of incidence = angle of reflection. Second law: the incident ray, reflected ray and normal all lie in the same plane.',
          'A real image is formed when rays actually meet, can be taken on a screen, and is usually inverted. A virtual image is formed when rays only appear to meet, cannot be taken on a screen, and is erect.',
        ],
        long: [
          'When white light passes through a prism, each colour bends by a different amount because the refractive index differs with wavelength. The light splits into seven colours (violet bends most, red least) \u2014 this is dispersion.',
          'A periscope has two plane mirrors fixed at 45\u00b0 inside a tube. Light from an object reflects from the top mirror to the bottom mirror and then to the eye, allowing a person to see over an obstacle.',
        ],
      },
    },
  },
  'Class 7': {
    Mathematics: {
      'Integers': {
        objective: [
          '(a) \u22123 \u2014 \u22128 + 5 = \u22123.',
          '(b) positive \u2014 the product of two negative integers is positive.',
          '(b) 3 \u2014 (\u221212)/(\u22124) = 3.',
          '(b) 0 \u2014 adding 0 does not change an integer.',
        ],
        short: [
          '(\u221215) + (\u22128) \u2212 (\u221223) = \u221223 + 23 = 0.',
          'Final depth = \u2212300 + 120 \u2212 50 = \u2212230 m, i.e. 230 m below sea level.',
        ],
        long: [
          'LHS = \u22127 \u00d7 (5 \u2212 3) = \u22127 \u00d7 2 = \u221214. RHS = (\u22127 \u00d7 5) + (\u22127 \u00d7 \u22123) = \u221235 + 21 = \u221214. LHS = RHS, so the property is verified.',
          'Profit from pens = 80 \u00d7 5 = \u20b9400; loss from pencils = 120 \u00d7 2 = \u20b9240. Net profit = 400 \u2212 240 = \u20b9160.',
        ],
      },
      'Simple Equations': {
        objective: [
          '(a) 7 \u2014 x = 12 \u2212 5.',
          '(b) 5 \u2014 2x = 10 \u21d2 x = 5.',
          '(b) 7 \u2014 x = 21/3.',
          '(b) 5x \u2212 3 = 12 \u2014 five times x minus 3 equals 12.',
        ],
        short: [
          '3x \u2212 6 = 2x + 2 \u21d2 3x \u2212 2x = 2 + 6 \u21d2 x = 8.',
          'Let the integers be x, x + 1, x + 2. Then 3x + 3 = 51 \u21d2 x = 16. The integers are 16, 17 and 18.',
        ],
        long: [
          'Let the son\u2019s age be x, so Ravi is 3x. After 12 years, 3x + 12 = 2(x + 12) \u21d2 3x + 12 = 2x + 24 \u21d2 x = 12. The son is 12 years old and Ravi is 36 years old.',
          'Let breadth = b, so length = b + 4. Perimeter = 2(b + b + 4) = 60 \u21d2 2b + 4 = 30 \u21d2 b = 13. Breadth = 13 m and length = 17 m.',
        ],
      },
    },
    Science: {
      'Heat': {
        objective: [
          '(c) kelvin \u2014 the SI unit of temperature.',
          '(b) Copper \u2014 a metal and a good conductor.',
          '(a) 37 \u00b0C \u2014 normal human body temperature.',
          '(b) convection \u2014 transfer of heat in fluids by currents.',
        ],
        short: [
          'Conduction transfers heat through direct contact of particles in solids, e.g. a metal spoon in hot tea. Convection transfers heat by the actual movement of heated fluid, e.g. water boiling in a vessel.',
          'Light-coloured clothes reflect most of the incoming heat and absorb little, keeping the body cooler in summer.',
        ],
        long: [
          'A clinical thermometer reads 35\u201342 \u00b0C and has a kink near the bulb that keeps the mercury level from falling until read. A laboratory thermometer reads a much wider range and has no kink, so it must be read while still in the substance.',
          'Take two identical cans, paint one black and the other white, fill both with water at the same temperature and place them in sunlight with thermometers. The water in the black can heats faster, showing that dark surfaces absorb more heat.',
        ],
      },
      'Light': {
        objective: [
          '(b) virtual \u2014 a plane mirror forms a virtual image.',
          '(c) real or virtual image \u2014 a concave mirror can form both.',
          '(c) seven colours \u2014 white light disperses into seven colours.',
          '(b) normal \u2014 the angle is measured from the normal.',
        ],
        short: [
          'A convex mirror bulges outwards, converges light and mostly forms real images. A concave mirror curves inwards, diverges light and forms virtual, diminished images of nearby objects.',
          'Light bends as it passes from water into air (refraction). The rays from the coin appear to come from a point higher than the actual coin, so it seems raised.',
        ],
        long: [
          'Sunlight enters a raindrop, is refracted and dispersed into colours, reflected at the inner surface and refracted again as it leaves. Different colours emerge at slightly different angles, forming a rainbow with red on the outside and violet inside.',
          'In a torch, a bulb is placed at the focus of a concave mirror, so the reflected rays form a parallel beam. In a solar cooker, a large concave mirror concentrates sunlight at the focus, producing high temperature for cooking.',
        ],
      },
    },
  },
  'Class 6': {
    Mathematics: {
      'Knowing Our Numbers': {
        objective: [
          '(a) 9999 \u2014 the greatest four-digit number.',
          '(c) 7000 \u2014 7 is in the thousands place.',
          '(a) 8,45,000 \u2014 the hundreds digit 3 is less than 5, so it is rounded down.',
          '(a) XC \u2014 100 \u2212 10 = 90.',
        ],
        short: [
          '9,07,048 is written as nine lakh seven thousand forty-eight.',
          '4,08,517 < 4,08,571 < 4,80,517 < 4,80,571.',
        ],
        long: [
          'Cost of 48 fans = 48 \u00d7 1,624 = \u20b977,952. Money left = 7,85,690 \u2212 77,952 = \u20b97,07,738.',
          '82 \u2248 80 and 39 \u2248 40, so the estimated product is 80 \u00d7 40 = 3200. Actual product = 82 \u00d7 39 = 3198, which is close to the estimate.',
        ],
      },
      'Fractions': {
        objective: [
          '(a) 6/10 \u2014 multiplying numerator and denominator by 2 gives an equivalent fraction.',
          '(b) 3/4 \u2014 1/2 = 2/4 and 1/4, so the sum is 3/4.',
          '(a) 1/2 \u2014 it is the smallest of the given fractions.',
          '(a) 2\u00bc \u2014 9 \u00f7 4 = 2 remainder 1.',
        ],
        short: [
          '3/7 + 2/5 = 15/35 + 14/35 = 29/35.',
          '2/3 \u00d7 5/4 = 10/12 = 5/6. Then 5/6 \u00f7 10/9 = 5/6 \u00d7 9/10 = 45/60 = 3/4.',
        ],
        long: [
          'Length = 11/2 m and breadth = 13/4 m. Perimeter = 2(11/2 + 13/4) = 2(22/4 + 13/4) = 2 \u00d7 35/4 = 35/2 = 17\u00bd m. Area = 11/2 \u00d7 13/4 = 143/8 = 17\u215e m\u00b2.',
          'Money spent = 2/5 + 1/4 = 8/20 + 5/20 = 13/20. Money left = 1 \u2212 13/20 = 7/20 of \u20b9200 = \u20b970.',
        ],
      },
    },
    Science: {
      'Components of Food': {
        objective: [
          '(b) Proteins \u2014 needed for growth and repair of the body.',
          '(b) night blindness \u2014 caused by deficiency of vitamin A.',
          '(b) Spinach \u2014 a rich source of iron.',
          '(a) digestion \u2014 roughage helps in the movement of food through the gut.',
        ],
        short: [
          'Carbohydrates and fats provide energy, proteins help growth and repair, vitamins and minerals protect the body and regulate functions, while water and roughage keep digestion healthy.',
          'Deficiency diseases are caused by lack of a particular nutrient. Examples: scurvy (vitamin C), rickets (vitamin D) and night blindness (vitamin A).',
        ],
        long: [
          'Starch test: add a few drops of iodine solution to the food sample; a blue-black colour shows starch. Protein test: add copper sulphate solution and then caustic soda; a violet colour shows protein.',
          'A balanced diet contains all nutrients in the right proportions. It depends on age, gender, level of physical activity, and special needs such as pregnancy or illness.',
        ],
      },
      'Light, Shadows and Reflections': {
        objective: [
          '(c) transparent \u2014 such objects allow light to pass through completely.',
          '(b) blocked \u2014 a shadow forms where light is blocked.',
          '(c) wooden block \u2014 opaque objects form shadows.',
          '(b) reflection \u2014 a mirror reflects light.',
        ],
        short: [
          'Transparent objects allow light to pass through fully (glass); translucent objects allow only part of the light (butter paper); opaque objects do not allow light at all (wood).',
          'A pinhole camera is a small box with a tiny hole on one side and a screen on the other. Light travels in straight lines through the hole, forming an inverted image on the screen.',
        ],
        long: [
          'Place an object between a torch and a screen. Moving the object closer to the torch makes the shadow larger, and moving it closer to the screen makes the shadow smaller and sharper. This shows that shadow size depends on the distances.',
          'The incident ray, the reflected ray and the normal lie in the same plane, and the angle of incidence equals the angle of reflection. A ray striking the mirror at 30\u00b0 is reflected at 30\u00b0 on the other side of the normal.',
        ],
      },
    },
  },
}
