// Curated CBSE-style question bank used by the Auto Test Paper generator.
// Each chapter holds objective (1 mark), short answer (3 marks) and
// long answer (5 marks) questions.

export const QUESTION_BANK = {
  'Class 10': {
    Mathematics: {
      'Real Numbers': {
        objective: [
          'Euclid\u2019s division lemma states that for positive integers a and b, there exist unique integers q and r such that a = bq + r, where r satisfies: (a) 0 < r < b  (b) 0 \u2264 r < b  (c) 0 \u2264 r \u2264 b  (d) 1 \u2264 r < b',
          'The HCF of 96 and 404 is: (a) 2  (b) 4  (c) 8  (d) 12',
          'The decimal expansion of 17/8 will terminate after how many decimal places?',
          'If HCF(a, b) = 12 and a \u00d7 b = 1800, then LCM(a, b) is: (a) 150  (b) 300  (c) 900  (d) 1800',
        ],
        short: [
          'Prove that \u221a5 is an irrational number.',
          'Find the HCF and LCM of 510 and 92, and verify that HCF \u00d7 LCM = product of the two numbers.',
        ],
        long: [
          'Prove that 3 + 2\u221a5 is irrational, given that \u221a5 is irrational.',
          'Three bells toll at intervals of 9, 12 and 15 minutes respectively. If they start tolling together, after what time will they next toll together?',
        ],
      },
      'Polynomials': {
        objective: [
          'The degree of the polynomial 4x\u00b3 - 2x\u00b2 + 7 is: (a) 1  (b) 2  (c) 3  (d) 7',
          'If \u03b1 and \u03b2 are the zeroes of x\u00b2 - 5x + 6, then \u03b1 + \u03b2 equals: (a) 5  (b) -5  (c) 6  (d) -6',
          'A quadratic polynomial whose zeroes are 3 and -2 is: (a) x\u00b2 - x - 6  (b) x\u00b2 + x - 6  (c) x\u00b2 - 5x + 6  (d) x\u00b2 + 5x + 6',
          'If one zero of the polynomial 2x\u00b2 + 3x + k is 1/2, then the value of k is: (a) 2  (b) -2  (c) 1  (d) -1',
        ],
        short: [
          'Find the zeroes of the quadratic polynomial x\u00b2 + 7x + 10 and verify the relationship between the zeroes and the coefficients.',
          'If \u03b1 and \u03b2 are the zeroes of 2x\u00b2 - 5x + 3, find the value of 1/\u03b1 + 1/\u03b2.',
        ],
        long: [
          'Divide the polynomial 3x\u00b3 + x\u00b2 + 2x + 5 by 3x - 1 and verify the division algorithm.',
          'If the zeroes of the polynomial x\u00b3 - 3x\u00b2 + x + 1 are a - b, a, a + b, find the values of a and b.',
        ],
      },
      'Pair of Linear Equations in Two Variables': {
        objective: [
          'The pair of equations x + y = 5 and 2x + 2y = 10 has: (a) no solution  (b) a unique solution  (c) infinitely many solutions  (d) exactly two solutions',
          'For what value of k do the equations kx + 2y = 5 and 3x + y = 1 have a unique solution? (a) k = 6  (b) k \u2260 6  (c) k = 3  (d) k \u2260 3',
          'The graph of x = 3 is a line: (a) parallel to the x-axis  (b) parallel to the y-axis  (c) passing through the origin  (d) neither parallel to an axis',
          'If 2x + 3y = 11 and 2x - 4y = -24, then the value of y is: (a) 5  (b) 4  (c) 3  (d) 2',
        ],
        short: [
          'Solve the pair of equations x + y = 14 and x - y = 4 by the elimination method.',
          'Find two numbers whose sum is 27 and product is 182.',
        ],
        long: [
          'A boat goes 30 km upstream and 44 km downstream in 10 hours. In 13 hours it can go 40 km upstream and 55 km downstream. Find the speed of the boat in still water and the speed of the stream.',
          'Five years ago, a father was seven times as old as his son. Five years hence, the father will be three times as old as his son. Find their present ages.',
        ],
      },
      'Quadratic Equations': {
        objective: [
          'The roots of x\u00b2 - 5x + 6 = 0 are: (a) 2 and 3  (b) -2 and -3  (c) 1 and 6  (d) -1 and -6',
          'The discriminant of 2x\u00b2 - 4x + 3 = 0 is: (a) 8  (b) -8  (c) 40  (d) -40',
          'If one root of x\u00b2 + kx + 8 = 0 is 2, then k equals: (a) -6  (b) 6  (c) -4  (d) 4',
          'A quadratic equation ax\u00b2 + bx + c = 0 has equal roots when: (a) b\u00b2 < 4ac  (b) b\u00b2 > 4ac  (c) b\u00b2 = 4ac  (d) b\u00b2 = -4ac',
        ],
        short: [
          'Find the roots of 2x\u00b2 - 7x + 3 = 0 by the factorisation method.',
          'Find the value of k for which the equation kx\u00b2 - 2kx + 6 = 0 has equal roots (k \u2260 0).',
        ],
        long: [
          'A train covers a distance of 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the speed of the train.',
          'The sum of the squares of two consecutive odd numbers is 394. Find the numbers.',
        ],
      },
      'Arithmetic Progressions': {
        objective: [
          'The 10th term of the AP 2, 7, 12, ... is: (a) 47  (b) 52  (c) 42  (d) 37',
          'If the common difference of an AP is -2 and a\u2081 = 10, then a\u2085 is: (a) 2  (b) 0  (c) 4  (d) -2',
          'The sum of the first 20 terms of the AP 1, 4, 7, ... is: (a) 590  (b) 580  (c) 610  (d) 570',
          'Which term of the AP 21, 18, 15, ... is zero? (a) 6th  (b) 7th  (c) 8th  (d) 9th',
        ],
        short: [
          'Find the 20th term from the last term of the AP 3, 8, 13, ..., 253.',
          'How many two-digit numbers are divisible by 3?',
        ],
        long: [
          'The sum of the third and the seventh terms of an AP is 6 and their product is 8. Find the sum of the first sixteen terms of the AP.',
          'A sum of \u20b9700 is to be used to give seven cash prizes to students. If each prize is \u20b920 less than the preceding prize, find the value of each prize.',
        ],
      },
      'Triangles': {
        objective: [
          'If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the: (a) same ratio  (b) ratio 1 : 2  (c) ratio 2 : 1  (d) ratio of the angles',
          'Two triangles are similar if their corresponding angles are: (a) supplementary  (b) equal  (c) complementary  (d) unequal',
          'In \u0394ABC, DE || BC with AD = 2 cm, DB = 3 cm and AE = 4 cm. Then EC equals: (a) 6 cm  (b) 5 cm  (c) 4 cm  (d) 3 cm',
          'The ratio of the areas of two similar triangles is equal to the ratio of the: (a) corresponding sides  (b) squares of corresponding sides  (c) cubes of corresponding sides  (d) perimeters',
        ],
        short: [
          'State and prove the Basic Proportionality Theorem (Thales theorem).',
          'In the given figure, DE || BC. If AD = 4 cm, DB = 6 cm and AE = 5 cm, find EC.',
        ],
        long: [
          'Prove that the ratio of the areas of two similar triangles is equal to the ratio of the squares of their corresponding sides.',
          'In a right triangle, prove that the square of the hypotenuse is equal to the sum of the squares of the other two sides (Pythagoras theorem).',
        ],
      },
      'Coordinate Geometry': {
        objective: [
          'The distance between the points (2, 3) and (4, 1) is: (a) 2\u221a2  (b) \u221a2  (c) 4  (d) 2',
          'The midpoint of the line segment joining (2, 3) and (6, 7) is: (a) (4, 5)  (b) (8, 10)  (c) (2, 3)  (d) (3, 4)',
          'The point (0, -4) lies on: (a) the x-axis  (b) the y-axis  (c) the line x = y  (d) neither axis',
          'The coordinates of the point dividing the join of (1, 3) and (4, 6) internally in the ratio 2 : 1 are: (a) (3, 5)  (b) (2, 4)  (c) (5, 7)  (d) (3, 4)',
        ],
        short: [
          'Find the distance between the points A(7, 4) and B(1, -4).',
          'Find the coordinates of the point which divides the line segment joining (4, -3) and (8, 5) in the ratio 3 : 1 internally.',
        ],
        long: [
          'Prove that the points (1, 7), (4, 2), (-1, -1) and (-4, 4) are the vertices of a square.',
          'Find the coordinates of the circumcentre of a triangle whose vertices are (0, 6), (8, 0) and (0, 0).',
        ],
      },
      'Introduction to Trigonometry': {
        objective: [
          'The value of sin 30\u00b0 + cos 60\u00b0 is: (a) 1  (b) 0  (c) 1/2  (d) 2',
          'If tan \u03b8 = 3/4, then sin \u03b8 equals: (a) 3/5  (b) 4/5  (c) 5/3  (d) 4/3',
          'The value of sec\u00b2\u03b8 - tan\u00b2\u03b8 is: (a) 0  (b) 1  (c) -1  (d) 2',
          'cos 0\u00b0 \u00d7 sec 0\u00b0 equals: (a) 0  (b) 1  (c) 2  (d) undefined',
        ],
        short: [
          'If 3 cot A = 4, check whether (1 - tan\u00b2A)/(1 + tan\u00b2A) = cos\u00b2A - sin\u00b2A.',
          'Evaluate: 2 tan\u00b2 45\u00b0 + cos\u00b2 30\u00b0 - sin\u00b2 60\u00b0.',
        ],
        long: [
          'Prove the identity: (1 + sec \u03b8)/sec \u03b8 = sin\u00b2\u03b8/(1 - cos \u03b8).',
          'Prove that (cosec \u03b8 - cot \u03b8)\u00b2 = (1 - cos \u03b8)/(1 + cos \u03b8).',
        ],
      },
      'Statistics': {
        objective: [
          'The mode of the data 2, 3, 3, 4, 5, 3, 6 is: (a) 2  (b) 3  (c) 4  (d) 5',
          'The median of 5, 8, 9, 11, 13 is: (a) 8  (b) 9  (c) 11  (d) 10',
          'For the data with mean 20 and median 18, the empirical mode is approximately: (a) 18  (b) 14  (c) 22  (d) 16',
          'The class mark of the class 30-40 is: (a) 30  (b) 35  (c) 40  (d) 10',
        ],
        short: [
          'Find the mean of the following data: 10, 12, 14, 16, 18, 20.',
          'The median of the observations 12, 14, x - 2, x + 4, 26, 30 (arranged in ascending order) is 24. Find the value of x.',
        ],
        long: [
          'Find the mean, median and mode of the following frequency distribution: 0-10 (5), 10-20 (8), 20-30 (15), 30-40 (10), 40-50 (2).',
          'The following table gives the daily income of 50 workers. Draw a cumulative frequency curve (ogive) and find the median: 100-120 (12), 120-140 (14), 140-160 (8), 160-180 (6), 180-200 (10).',
        ],
      },
      'Probability': {
        objective: [
          'The probability of an impossible event is: (a) 0  (b) 1  (c) 1/2  (d) -1',
          'A die is thrown once. The probability of getting a prime number is: (a) 1/3  (b) 1/2  (c) 2/3  (d) 1/6',
          'The sum of the probabilities of all elementary events of an experiment is: (a) 0  (b) 1  (c) 1/2  (d) 2',
          'One card is drawn from a well-shuffled deck of 52 cards. The probability of getting a king is: (a) 1/13  (b) 1/26  (c) 1/52  (d) 4/13',
        ],
        short: [
          'Two dice are thrown together. Find the probability that the sum of the numbers on the top faces is 8.',
          'A bag contains 5 red, 8 white and 7 black balls. One ball is drawn at random. Find the probability that it is not black.',
        ],
        long: [
          'A game consists of tossing a coin three times. Find the probability of getting: (i) exactly two heads, (ii) at least two heads, (iii) at most one head.',
          'A box contains 90 discs numbered 1 to 90. If one disc is drawn at random, find the probability that it bears (i) a two-digit number, (ii) a perfect square number, (iii) a number divisible by 5.',
        ],
      },
    },
    Science: {
      'Chemical Reactions and Equations': {
        objective: [
          'The reaction between lead nitrate and potassium iodide is an example of: (a) decomposition  (b) displacement  (c) double displacement  (d) combination',
          'The chemical formula of rust is: (a) Fe\u2082O\u2083\u00b7xH\u2082O  (b) FeO  (c) Fe\u2083O\u2084  (d) FeS',
          'In the reaction Zn + CuSO\u2084 \u2192 ZnSO\u2084 + Cu, zinc acts as: (a) an oxidising agent  (b) a reducing agent  (c) a catalyst  (d) a solvent',
          'The reaction CaO + H\u2082O \u2192 Ca(OH)\u2082 is a: (a) combination reaction  (b) decomposition reaction  (c) displacement reaction  (d) redox reaction',
        ],
        short: [
          'Write a balanced chemical equation for the reaction of iron with steam and identify the type of reaction.',
          'Why does the colour of copper sulphate solution change when an iron nail is dipped in it?',
        ],
        long: [
          'What is meant by oxidation and reduction? Explain with two examples and identify the oxidising and reducing agents.',
          'Write balanced chemical equations for: (i) burning of magnesium ribbon in air, (ii) heating of lead nitrate, (iii) reaction of dilute sulphuric acid with zinc granules.',
        ],
      },
      'Acids, Bases and Salts': {
        objective: [
          'The pH of a neutral solution is: (a) 0  (b) 7  (c) 14  (d) 1',
          'The chemical name of baking soda is: (a) sodium carbonate  (b) sodium hydrogen carbonate  (c) sodium chloride  (d) calcium carbonate',
          'Which of the following is a strong base? (a) NH\u2084OH  (b) NaOH  (c) Ca(OH)\u2082  (d) both (b) and (c)',
          'Plaster of Paris is obtained by heating gypsum at: (a) 100 \u00b0C  (b) 373 K  (c) 573 K  (d) 1000 K',
        ],
        short: [
          'What is meant by the pH of a solution? How is it useful in everyday life?',
          'Write the chemical formula and one use each of washing soda and baking soda.',
        ],
        long: [
          'Explain the preparation, properties and uses of plaster of Paris. Write the chemical equation involved.',
          'What happens when an acid reacts with a metal? Explain with an example and write the balanced equation. How does the reaction differ with a base?',
        ],
      },
      'Metals and Non-metals': {
        objective: [
          'Which of the following is the most reactive metal among the given options? (a) Copper  (b) Zinc  (c) Iron  (d) Potassium',
          'The process of coating iron with zinc to prevent rusting is called: (a) galvanisation  (b) alloying  (c) anodising  (d) electroplating',
          'Which non-metal is a good conductor of electricity? (a) Sulphur  (b) Graphite  (c) Phosphorus  (d) Iodine',
          'The ore of aluminium is: (a) haematite  (b) bauxite  (c) gypsum  (d) cinnabar',
        ],
        short: [
          'Distinguish between metals and non-metals on the basis of (i) conductivity, (ii) malleability and (iii) reaction with oxygen.',
          'Explain why sodium is stored in kerosene.',
        ],
        long: [
          'Explain the process of extraction of a metal of medium reactivity from its sulphide ore with suitable equations.',
          'What is corrosion? Explain the factors affecting corrosion and describe any two methods of preventing it.',
        ],
      },
      'Carbon and its Compounds': {
        objective: [
          'The number of covalent bonds in a molecule of ethane (C\u2082H\u2086) is: (a) 6  (b) 7  (c) 8  (d) 5',
          'The functional group present in ethanol is: (a) -CHO  (b) -OH  (c) -COOH  (d) -CO-',
          'Which of the following is a saturated hydrocarbon? (a) Ethene  (b) Ethyne  (c) Ethane  (d) Propene',
          'Soaps are salts of: (a) strong acids and strong bases  (b) fatty acids and sodium/potassium hydroxide  (c) mineral acids  (d) alcohols',
        ],
        short: [
          'Explain the nature of the covalent bond in carbon compounds with the help of an example.',
          'What is a homologous series? Write the first three members of the alkane series.',
        ],
        long: [
          'Explain the cleansing action of soap with the help of a diagram/description of micelle formation.',
          'What are the differences between soaps and detergents? Why do detergents work better with hard water?',
        ],
      },
      'Life Processes': {
        objective: [
          'The process of photosynthesis mainly occurs in: (a) mitochondria  (b) chloroplast  (c) nucleus  (d) ribosome',
          'The basic filtration unit of the kidney is the: (a) neuron  (b) nephron  (c) alveolus  (d) villus',
          'During anaerobic respiration in muscles, glucose is converted into: (a) ethanol  (b) lactic acid  (c) carbon dioxide  (d) pyruvate only',
          'The exchange of gases in the lungs takes place in the: (a) bronchi  (b) trachea  (c) alveoli  (d) diaphragm',
        ],
        short: [
          'Write the balanced equation for photosynthesis and list the factors that affect its rate.',
          'Explain the role of the small intestine in the digestion and absorption of food.',
        ],
        long: [
          'Describe the human digestive system with the help of its main parts and the enzymes secreted in each part.',
          'Explain the process of urine formation in the human kidney with the help of the structure of a nephron.',
        ],
      },
      'Control and Coordination': {
        objective: [
          'The part of the brain that controls balance and posture is the: (a) cerebrum  (b) cerebellum  (c) medulla  (d) hypothalamus',
          'The hormone secreted by the pancreas that lowers blood sugar is: (a) glucagon  (b) insulin  (c) adrenaline  (d) thyroxine',
          'The gap between two neurons is called the: (a) synapse  (b) dendrite  (c) axon  (d) myelin sheath',
          'The plant hormone responsible for cell elongation is: (a) auxin  (b) cytokinin  (c) abscisic acid  (d) ethylene',
        ],
        short: [
          'What is a reflex action? Explain the reflex arc with an example.',
          'Name the hormones secreted by the thyroid gland and the adrenal gland, and state one function of each.',
        ],
        long: [
          'Explain the structure and function of the human brain with the help of its three major parts.',
          'Compare nervous coordination and hormonal coordination with respect to speed, duration and mode of transmission.',
        ],
      },
      'Light - Reflection and Refraction': {
        objective: [
          'The image formed by a plane mirror is: (a) real and inverted  (b) virtual and erect  (c) real and erect  (d) virtual and inverted',
          'The focal length of a plane mirror is: (a) zero  (b) infinite  (c) equal to its radius  (d) negative',
          'A concave lens always forms an image that is: (a) real and inverted  (b) virtual and erect  (c) real and erect  (d) enlarged',
          'The SI unit of power of a lens is: (a) metre  (b) dioptre  (c) newton  (d) watt',
        ],
        short: [
          'State the laws of reflection of light.',
          'An object is placed 20 cm in front of a concave mirror of focal length 15 cm. Find the position and nature of the image.',
        ],
        long: [
          'Derive the mirror formula for a concave mirror and state the sign conventions used.',
          'An object 5 cm high is placed 25 cm from a convex lens of focal length 10 cm. Find the position, size and nature of the image.',
        ],
      },
      'Electricity': {
        objective: [
          'The SI unit of electric resistance is: (a) volt  (b) ampere  (c) ohm  (d) watt',
          'According to Ohm\u2019s law, V is equal to: (a) I/R  (b) IR  (c) R/I  (d) I\u00b2R',
          'Two resistors of 4 \u03a9 and 6 \u03a9 are connected in series. The equivalent resistance is: (a) 2.4 \u03a9  (b) 10 \u03a9  (c) 5 \u03a9  (d) 24 \u03a9',
          'Electric power is given by: (a) V/I  (b) VI  (c) I/V  (d) V\u00b2I',
        ],
        short: [
          'State Ohm\u2019s law and describe an experiment to verify it.',
          'Why is tungsten used as the filament of an electric bulb?',
        ],
        long: [
          'Derive the expression for the equivalent resistance of three resistors connected in parallel.',
          'An electric heater of resistance 8 \u03a9 draws 15 A from the service mains for 2 hours. Calculate the rate at which heat is developed in the heater and the total energy consumed.',
        ],
      },
      'Magnetic Effects of Electric Current': {
        objective: [
          'The direction of the magnetic field around a straight current-carrying conductor is given by: (a) Fleming\u2019s left-hand rule  (b) right-hand thumb rule  (c) Fleming\u2019s right-hand rule  (d) Lenz\u2019s law',
          'The magnetic field inside a long current-carrying solenoid is: (a) zero  (b) uniform  (c) circular  (d) non-uniform',
          'An electric motor converts: (a) electrical energy into mechanical energy  (b) mechanical energy into electrical energy  (c) chemical energy into electrical energy  (d) heat into electricity',
          'The frequency of AC supply in India is: (a) 50 Hz  (b) 60 Hz  (c) 100 Hz  (d) 220 Hz',
        ],
        short: [
          'State Fleming\u2019s left-hand rule and explain its use.',
          'What is electromagnetic induction? State the rule used to find the direction of induced current.',
        ],
        long: [
          'Explain the working principle and construction of an electric motor with the help of a labelled diagram.',
          'What is a solenoid? Describe the pattern of the magnetic field produced by a current-carrying solenoid and list two of its uses.',
        ],
      },
    },
  },
  'Class 9': {
    Mathematics: {
      'Number Systems': {
        objective: [
          'Which of the following is an irrational number? (a) 0.25  (b) \u221a9  (c) \u221a7  (d) 22/7',
          'The decimal representation of 1/8 is: (a) 0.125  (b) 0.12  (c) 0.8  (d) 1.8',
          'Every rational number is: (a) a natural number  (b) an integer  (c) a real number  (d) a whole number',
          'The value of (64)^(1/2) is: (a) 4  (b) 8  (c) 16  (d) 32',
        ],
        short: [
          'Represent \u221a5 on the number line.',
          'Simplify: (3 + \u221a3)(2 + \u221a2).',
        ],
        long: [
          'Prove that \u221a3 is an irrational number.',
          'Rationalise the denominator of 1/(\u221a7 - \u221a6) and find its value correct to two decimal places.',
        ],
      },
      'Polynomials': {
        objective: [
          'The degree of the polynomial 5x\u00b2 - 3x + 2 is: (a) 0  (b) 1  (c) 2  (d) 3',
          'The value of p(x) = x\u00b2 - 3x + 2 at x = 1 is: (a) 0  (b) 1  (c) 2  (d) 3',
          'A polynomial of degree 1 is called: (a) linear  (b) quadratic  (c) cubic  (d) constant',
          'If x + 1 is a factor of x\u00b2 + kx + 2, then k equals: (a) 1  (b) 2  (c) 3  (d) 4',
        ],
        short: [
          'Find the remainder when x\u00b3 + 3x\u00b2 + 3x + 1 is divided by x + 1.',
          'Factorise: x\u00b2 - 5x + 6.',
        ],
        long: [
          'Use the Factor Theorem to determine whether x - 1 is a factor of x\u00b3 - 3x\u00b2 + 3x - 1.',
          'Factorise the polynomial 2x\u00b3 + x\u00b2 - 2x - 1 completely.',
        ],
      },
      'Triangles': {
        objective: [
          'Two triangles are congruent if: (a) two sides and an included angle are equal  (b) three angles are equal  (c) two angles are equal  (d) the areas are equal',
          'In an isosceles triangle, the angles opposite to equal sides are: (a) unequal  (b) equal  (c) supplementary  (d) complementary',
          'The sum of the angles of a triangle is: (a) 90\u00b0  (b) 180\u00b0  (c) 270\u00b0  (d) 360\u00b0',
          'Which of the following is not a congruence criterion? (a) SAS  (b) ASA  (c) AAA  (d) RHS',
        ],
        short: [
          'State and prove that the angles opposite to equal sides of an isosceles triangle are equal.',
          'In triangles ABC and DEF, AB = DE, BC = EF and \u2220B = \u2220E. Are the triangles congruent? Justify.',
        ],
        long: [
          'Prove that the sum of the angles of a triangle is 180\u00b0.',
          'In a triangle, prove that the greater side has the greater angle opposite to it and hence compare the sides of a triangle with given angles.',
        ],
      },
      'Surface Areas and Volumes': {
        objective: [
          'The total surface area of a cube of side 5 cm is: (a) 25 cm\u00b2  (b) 100 cm\u00b2  (c) 150 cm\u00b2  (d) 125 cm\u00b2',
          'The volume of a cylinder of radius r and height h is: (a) \u03c0r\u00b2h  (b) 2\u03c0rh  (c) \u03c0rh  (d) (1/3)\u03c0r\u00b2h',
          'The slant height of a cone of radius 3 cm and height 4 cm is: (a) 5 cm  (b) 7 cm  (c) 12 cm  (d) 25 cm',
          'The curved surface area of a hemisphere of radius r is: (a) 2\u03c0r\u00b2  (b) 3\u03c0r\u00b2  (c) 4\u03c0r\u00b2  (d) \u03c0r\u00b2',
        ],
        short: [
          'Find the surface area of a sphere of radius 7 cm. (Take \u03c0 = 22/7)',
          'The radius and height of a cylinder are in the ratio 2 : 3 and its volume is 1617 cm\u00b3. Find its radius.',
        ],
        long: [
          'A solid cylinder of radius 7 cm and height 10 cm is melted and recast into cubes of side 2 cm. Find the number of cubes formed.',
          'A cone of height 24 cm and base radius 6 cm is made of clay. It is reshaped into a sphere. Find the radius of the sphere.',
        ],
      },
      'Statistics': {
        objective: [
          'The range of the data 12, 45, 7, 23, 56 is: (a) 49  (b) 44  (c) 56  (d) 23',
          'The class mark of 20-30 is: (a) 25  (b) 20  (c) 30  (d) 10',
          'In a bar graph, the height of the bar represents: (a) class interval  (b) frequency  (c) mean  (d) range',
          'The mean of 2, 4, 6, 8, 10 is: (a) 5  (b) 6  (c) 7  (d) 8',
        ],
        short: [
          'Find the mean of the first ten natural numbers.',
          'Draw a frequency polygon for the data: 0-10 (2), 10-20 (5), 20-30 (8), 30-40 (3).',
        ],
        long: [
          'The marks of 30 students are given. Construct a frequency distribution table with class intervals 0-10, 10-20, ... and find the mean: 5, 8, 12, 15, 18, 22, 25, 28, 32, 35 (and similar values).',
          'Find the median and mode of the data: 15, 18, 20, 20, 22, 25, 25, 25, 28, 30.',
        ],
      },
    },
    Science: {
      'Matter in Our Surroundings': {
        objective: [
          'The process of change of a liquid into vapour at any temperature is called: (a) evaporation  (b) condensation  (c) sublimation  (d) fusion',
          'Which of the following has the highest rate of diffusion? (a) Solids  (b) Liquids  (c) Gases  (d) All are equal',
          'The temperature at which a solid changes into a liquid is called its: (a) boiling point  (b) melting point  (c) dew point  (d) freezing point',
          'The state of matter that has a definite volume but no definite shape is: (a) solid  (b) liquid  (c) gas  (d) plasma',
        ],
        short: [
          'Define latent heat of vaporisation and latent heat of fusion.',
          'Why does the temperature of a liquid remain constant during boiling?',
        ],
        long: [
          'Explain the effect of change of temperature and pressure on the states of matter with examples.',
          'Compare the three states of matter with respect to arrangement of particles, intermolecular forces and compressibility.',
        ],
      },
      'Atoms and Molecules': {
        objective: [
          'The number of atoms present in one molecule of H\u2082SO\u2084 is: (a) 6  (b) 7  (c) 8  (d) 9',
          'One mole of any substance contains: (a) 6.022 \u00d7 10\u00b2\u00b3 particles  (b) 6.022 \u00d7 10\u00b2\u00b2 particles  (c) 3.011 \u00d7 10\u00b2\u00b3 particles  (d) 1.0 \u00d7 10\u00b2\u00b3 particles',
          'The atomic mass of oxygen is: (a) 8 u  (b) 16 u  (c) 32 u  (d) 6 u',
          'The formula unit mass of NaCl is: (a) 23 u  (b) 35.5 u  (c) 58.5 u  (d) 40 u',
        ],
        short: [
          'State the law of conservation of mass and the law of constant proportions.',
          'Calculate the molar mass of CaCO\u2083 and the number of moles in 100 g of it.',
        ],
        long: [
          'Write the chemical formulae of: sodium carbonate, aluminium oxide, calcium hydroxide, ammonium sulphate and magnesium chloride, showing the steps.',
          'Calculate the number of molecules in 22 g of carbon dioxide and the number of moles in 9 g of water.',
        ],
      },
      'Motion': {
        objective: [
          'The SI unit of acceleration is: (a) m/s  (b) m/s\u00b2  (c) m\u00b2/s  (d) m\u00b7s',
          'A body moving with uniform velocity has an acceleration of: (a) zero  (b) positive  (c) negative  (d) infinite',
          'The area under a velocity-time graph gives: (a) acceleration  (b) displacement  (c) speed  (d) force',
          'A car travels 60 km in 1 hour. Its average speed is: (a) 60 m/s  (b) 60 km/h  (c) 16.7 km/h  (d) 1 km/h',
        ],
        short: [
          'Distinguish between distance and displacement with an example.',
          'A body starts from rest and attains a velocity of 20 m/s in 5 s. Find its acceleration.',
        ],
        long: [
          'Derive the equation v = u + at and s = ut + \u00bdat\u00b2 for uniformly accelerated motion.',
          'A ball is thrown vertically upwards with a velocity of 20 m/s. Find the maximum height reached and the total time taken to return (take g = 10 m/s\u00b2).',
        ],
      },
      'Force and Laws of Motion': {
        objective: [
          'The SI unit of force is: (a) joule  (b) newton  (c) watt  (d) pascal',
          'Newton\u2019s first law is also known as the law of: (a) momentum  (b) inertia  (c) action-reaction  (d) gravitation',
          'The momentum of a body of mass 2 kg moving at 5 m/s is: (a) 10 kg\u00b7m/s  (b) 2.5 kg\u00b7m/s  (c) 7 kg\u00b7m/s  (d) 20 kg\u00b7m/s',
          'Action and reaction forces act: (a) on the same body  (b) on different bodies  (c) in the same direction  (d) only in equilibrium',
        ],
        short: [
          'State Newton\u2019s three laws of motion.',
          'Why does a passenger fall forward when a bus stops suddenly?',
        ],
        long: [
          'Derive the relation F = ma from Newton\u2019s second law of motion.',
          'A bullet of mass 10 g travelling at 400 m/s strikes a wooden block and comes to rest in 0.02 s. Calculate the force exerted by the block on the bullet.',
        ],
      },
      'Sound': {
        objective: [
          'Sound waves are: (a) electromagnetic waves  (b) longitudinal waves  (c) transverse waves  (d) light waves',
          'The speed of sound is maximum in: (a) air  (b) water  (c) steel  (d) vacuum',
          'The audible range of frequency for human beings is: (a) 2 Hz to 20 Hz  (b) 20 Hz to 20,000 Hz  (c) 20,000 Hz to 2,00,000 Hz  (d) 0 Hz to 20 Hz',
          'The time taken for one complete oscillation is called: (a) frequency  (b) amplitude  (c) time period  (d) wavelength',
        ],
        short: [
          'Distinguish between frequency and amplitude of a sound wave.',
          'What is reverberation? How can it be reduced?',
        ],
        long: [
          'Explain the structure and working of the human ear with the help of a labelled diagram.',
          'A sound wave has a frequency of 500 Hz and a wavelength of 0.68 m. Calculate its speed and the time period.',
        ],
      },
    },
  },
  'Class 8': {
    Mathematics: {
      'Rational Numbers': {
        objective: [
          'Which of the following is a rational number? (a) \u221a2  (b) \u03c0  (c) -3/4  (d) \u221a5',
          'The additive inverse of -7/9 is: (a) 7/9  (b) -7/9  (c) 9/7  (d) -9/7',
          'The product of 2/3 and 3/2 is: (a) 1  (b) 0  (c) 4/9  (d) 9/4',
          'The reciprocal of -5 is: (a) 5  (b) -1/5  (c) 1/5  (d) -5',
        ],
        short: [
          'Represent 3/5 and -2/5 on the same number line.',
          'Find five rational numbers between 1/3 and 1/2.',
        ],
        long: [
          'Verify the distributive property of multiplication over addition for a = 1/2, b = 2/3 and c = -3/4.',
          'The sum of two rational numbers is -5. If one of them is -13/6, find the other.',
        ],
      },
      'Squares and Square Roots': {
        objective: [
          'The square of 15 is: (a) 150  (b) 225  (c) 125  (d) 250',
          'Which of the following is a perfect square? (a) 1050  (b) 1089  (c) 1024  (d) both (b) and (c)',
          'The square root of 0.0144 is: (a) 0.12  (b) 0.012  (c) 1.2  (d) 12',
          'The number of non-square numbers between 10\u00b2 and 11\u00b2 is: (a) 20  (b) 21  (c) 22  (d) 19',
        ],
        short: [
          'Find the square root of 2304 by the long division method.',
          'Find the smallest number by which 180 must be multiplied to make it a perfect square.',
        ],
        long: [
          'A gardener wants to plant 2025 plants in such a way that the number of rows equals the number of columns. Find the number of plants in each row.',
          'Find the square root of 12.25 and 0.0009 using the division method.',
        ],
      },
    },
    Science: {
      'Force and Pressure': {
        objective: [
          'Pressure is defined as: (a) force \u00d7 area  (b) force / area  (c) area / force  (d) force + area',
          'The SI unit of pressure is: (a) newton  (b) pascal  (c) joule  (d) watt',
          'Atmospheric pressure is measured using a: (a) thermometer  (b) barometer  (c) speedometer  (d) lactometer',
          'A force can: (a) change the shape of an object  (b) change its speed  (c) change its direction  (d) all of these',
        ],
        short: [
          'Why does a sharp knife cut better than a blunt one?',
          'Define atmospheric pressure and give one example that shows its effect.',
        ],
        long: [
          'Explain the factors on which the pressure exerted by a liquid depends.',
          'Describe an activity to show that pressure increases with depth and that liquids exert equal pressure at the same depth.',
        ],
      },
      'Light': {
        objective: [
          'A plane mirror forms an image that is: (a) real and inverted  (b) virtual and erect  (c) real and erect  (d) virtual and inverted',
          'The angle of reflection is always equal to the: (a) angle of incidence  (b) angle of refraction  (c) critical angle  (d) angle of deviation',
          'A concave lens is also called a: (a) converging lens  (b) diverging lens  (c) plane lens  (d) cylindrical lens',
          'The image formed by a convex mirror is always: (a) real  (b) virtual and diminished  (c) enlarged  (d) inverted',
        ],
        short: [
          'State the laws of reflection of light.',
          'Distinguish between a real image and a virtual image.',
        ],
        long: [
          'Explain the dispersion of light with the help of a prism and draw a labelled diagram.',
          'Describe the construction and working of a periscope with a diagram.',
        ],
      },
    },
  },
  'Class 7': {
    Mathematics: {
      'Integers': {
        objective: [
          'The sum of -8 and 5 is: (a) -3  (b) 3  (c) -13  (d) 13',
          'The product of two negative integers is: (a) negative  (b) positive  (c) zero  (d) undefined',
          'The value of (-12) \u00f7 (-4) is: (a) -3  (b) 3  (c) -8  (d) 8',
          'The additive identity for integers is: (a) 1  (b) 0  (c) -1  (d) 2',
        ],
        short: [
          'Evaluate: (-15) + (-8) - (-23).',
          'A submarine is at a depth of 300 m below sea level. It rises 120 m and then dives 50 m. Find its final depth.',
        ],
        long: [
          'Verify a \u00d7 (b + c) = (a \u00d7 b) + (a \u00d7 c) for a = -7, b = 5, c = -3.',
          'A shopkeeper earns a profit of \u20b95 per pen and incurs a loss of \u20b92 per pencil sold. In a month he sells 80 pens and 120 pencils. Find his profit or loss.',
        ],
      },
      'Simple Equations': {
        objective: [
          'The solution of x + 5 = 12 is: (a) 7  (b) 17  (c) -7  (d) 5',
          'The solution of 2x - 3 = 7 is: (a) 2  (b) 5  (c) 4  (d) 10',
          'If 3x = 21, then x equals: (a) 3  (b) 7  (c) 18  (d) 24',
          'The equation for \u201cfive times a number decreased by 3 is 12\u201d is: (a) 5x + 3 = 12  (b) 5x - 3 = 12  (c) 3x - 5 = 12  (d) 5(x - 3) = 12',
        ],
        short: [
          'Solve: 3(x - 2) = 2(x + 1).',
          'The sum of three consecutive integers is 51. Find the integers.',
        ],
        long: [
          'Ravi is three times as old as his son. After 12 years, he will be twice as old as his son. Find their present ages.',
          'The perimeter of a rectangle is 60 m and its length is 4 m more than its breadth. Find its length and breadth.',
        ],
      },
    },
    Science: {
      'Heat': {
        objective: [
          'The SI unit of temperature is: (a) Celsius  (b) Fahrenheit  (c) kelvin  (d) joule',
          'Which of the following is a good conductor of heat? (a) Wood  (b) Copper  (c) Plastic  (d) Air',
          'The normal temperature of the human body is about: (a) 37 \u00b0C  (b) 27 \u00b0C  (c) 47 \u00b0C  (d) 50 \u00b0C',
          'The process by which heat is transferred in liquids and gases is: (a) conduction  (b) convection  (c) radiation  (d) reflection',
        ],
        short: [
          'Distinguish between conduction and convection with examples.',
          'Why do we prefer light-coloured clothes in summer?',
        ],
        long: [
          'Explain how a clinical thermometer differs from a laboratory thermometer and why.',
          'Describe an activity to show that dark surfaces absorb more heat than light surfaces.',
        ],
      },
      'Light': {
        objective: [
          'The image formed by a plane mirror is: (a) real  (b) virtual  (c) inverted  (d) enlarged',
          'A concave mirror can form a: (a) real image only  (b) virtual image only  (c) real or virtual image  (d) no image',
          'Sunlight consists of: (a) one colour  (b) two colours  (c) seven colours  (d) no colour',
          'The angle of incidence is measured from the: (a) surface  (b) normal  (c) reflected ray  (d) plane of the mirror',
        ],
        short: [
          'State two differences between a convex and a concave mirror.',
          'Why does a coin placed in water appear raised?',
        ],
        long: [
          'Explain the formation of a rainbow with a labelled diagram.',
          'Describe how a concave mirror is used in a torch and in a solar cooker.',
        ],
      },
    },
  },
  'Class 6': {
    Mathematics: {
      'Knowing Our Numbers': {
        objective: [
          'The greatest four-digit number is: (a) 9999  (b) 1000  (c) 9990  (d) 1001',
          'The place value of 7 in 47,382 is: (a) 7  (b) 700  (c) 7000  (d) 70',
          'The number 8,45,321 rounded to the nearest thousand is: (a) 8,45,000  (b) 8,46,000  (c) 8,40,000  (d) 8,50,000',
          'The Roman numeral for 90 is: (a) XC  (b) CX  (c) XL  (d) LXXXX',
        ],
        short: [
          'Write the number 9,07,048 in words using the Indian system of numeration.',
          'Arrange 4,08,517; 4,80,517; 4,08,571; 4,80,571 in ascending order.',
        ],
        long: [
          'A merchant had \u20b97,85,690 with him. He placed an order for purchasing 48 ceiling fans at \u20b91,624 each. How much money will remain with him after the purchase?',
          'Estimate the product 82 \u00d7 39 using rounding off and verify the actual product.',
        ],
      },
      'Fractions': {
        objective: [
          'The fraction equivalent to 3/5 is: (a) 6/10  (b) 5/3  (c) 3/10  (d) 9/25',
          'The value of 1/2 + 1/4 is: (a) 1/6  (b) 3/4  (c) 2/6  (d) 2/4',
          'Which fraction is the smallest? (a) 1/2  (b) 2/3  (c) 3/4  (d) 5/6',
          'The improper fraction 9/4 written as a mixed number is: (a) 2\u00bc  (b) 2\u00bd  (c) 4\u00bc  (d) 1\u00bc',
        ],
        short: [
          'Add: 3/7 + 2/5.',
          'Simplify: 2/3 \u00d7 5/4 \u00f7 10/9.',
        ],
        long: [
          'A rectangle is 5\u00bd m long and 3\u00bc m broad. Find its perimeter and area.',
          'Seema spent 2/5 of her pocket money on books and 1/4 on stationery. If she had \u20b9200, how much money is left with her?',
        ],
      },
    },
    Science: {
      'Components of Food': {
        objective: [
          'Which nutrient is needed for body growth and repair? (a) Carbohydrates  (b) Proteins  (c) Fats  (d) Fibre',
          'Deficiency of vitamin A causes: (a) scurvy  (b) night blindness  (c) rickets  (d) beri-beri',
          'Which food is a rich source of iron? (a) Milk  (b) Spinach  (c) Rice  (d) Sugar',
          'Roughage helps in: (a) digestion  (b) building muscles  (c) providing energy  (d) supplying vitamins',
        ],
        short: [
          'Name the major nutrients present in our food and state one function of each.',
          'What are deficiency diseases? Name two with their causes.',
        ],
        long: [
          'Describe the test for detecting starch and protein in food with the help of chemicals used and the observations.',
          'Explain the importance of a balanced diet and list factors that affect the diet of an adolescent.',
        ],
      },
      'Light, Shadows and Reflections': {
        objective: [
          'Objects that allow light to pass through them completely are: (a) opaque  (b) translucent  (c) transparent  (d) shiny',
          'A shadow is formed when light is: (a) reflected  (b) blocked  (c) refracted  (d) absorbed fully',
          'Which object can form a shadow? (a) Glass  (b) Air  (c) Wooden block  (d) Water',
          'A plane mirror changes the direction of light by: (a) absorption  (b) reflection  (c) refraction  (d) dispersion',
        ],
        short: [
          'Distinguish between transparent, translucent and opaque objects with examples.',
          'What is a pinhole camera? How is the image formed in it?',
        ],
        long: [
          'Describe an activity to show that a shadow depends on the distance between the object and the light source.',
          'Explain the laws of reflection and draw a diagram showing the incident ray, reflected ray and normal.',
        ],
      },
    },
  },
}

// Fallback templates when a chapter is not present in the question bank.
// They keep the paper usable while clearly telling the teacher to review it.
export const FALLBACK_TEMPLATES = {
  objective: [
    'Define the key terms used in the chapter \u201c{chapter}\u201d.',
    'State one important rule, formula or principle from \u201c{chapter}\u201d.',
    'Write two examples that illustrate \u201c{chapter}\u201d.',
    'Choose the correct option: The main idea of \u201c{chapter}\u201d deals with (a) definitions (b) applications (c) both (d) neither.',
  ],
  short: [
    'Explain the main concept of \u201c{chapter}\u201d with a suitable example.',
    'Solve or explain a short problem based on \u201c{chapter}\u201d, showing all steps.',
  ],
  long: [
    'Answer in detail: Discuss the importance and applications of \u201c{chapter}\u201d.',
    'Explain \u201c{chapter}\u201d in depth with examples and a diagram/table wherever required.',
  ],
}

export const MARKS = { objective: 1, short: 3, long: 5 }
