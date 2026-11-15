// Question bank. Each question: [question, correct answer, wrong 1, wrong 2, wrong 3, explanation]
// Options are shuffled when shown, so the correct answer is always written first here.
const TOPICS = [];
function T(s, id, name, y, qs) { TOPICS.push({ s, id: s + "-" + id, name, y, qs }); }

/* ===================== PHYSICS ===================== */
T("phy","measure","Physical quantities and measurement",3,[
["Which of these is an SI base quantity?","Mass (kg)","Force (N)","Speed (m/s)","Energy (J)","Mass is one of the seven base quantities. Newtons, m/s and joules are all derived units."],
["What is 2.5 km in metres?","2500 m","250 m","25 000 m","0.0025 m","1 km = 1000 m, so 2.5 × 1000 = 2500 m."],
["Which instrument measures the diameter of a thin wire most precisely?","Micrometer screw gauge","Metre rule","Vernier calipers","Measuring tape","A micrometer reads to 0.01 mm, more precise than vernier calipers (0.1 mm)."],
["A pendulum makes 20 oscillations in 30.0 s. What is its period?","1.5 s","0.67 s","600 s","20 s","Period = total time ÷ number of oscillations = 30.0 ÷ 20 = 1.5 s."],
["Which quantity is a vector?","Velocity","Speed","Mass","Temperature","A vector has size and direction. Velocity is speed in a stated direction."]
]);
T("phy","kinematics","Kinematics",3,[
["A ball is dropped from rest. Ignoring air resistance, what is its speed after 2 s? (g = 10 m/s²)","20 m/s","10 m/s","40 m/s","5 m/s","v = u + at = 0 + 10 × 2 = 20 m/s."],
["On a speed–time graph, what does the area under the line give?","Distance travelled","Acceleration","Speed","Force","Area = speed × time = distance. The gradient gives acceleration."],
["A car speeds up from 10 m/s to 30 m/s in 4 s. What is its acceleration?","5 m/s²","7.5 m/s²","10 m/s²","20 m/s²","a = (v − u) ÷ t = (30 − 10) ÷ 4 = 5 m/s²."],
["What does a horizontal line on a distance–time graph show?","The object is at rest","Constant speed","Constant acceleration","Deceleration","Distance is not changing, so the object is not moving."]
]);
T("phy","dynamics","Dynamics",3,[
["A 2 kg trolley accelerates at 3 m/s². What is the resultant force on it?","6 N","1.5 N","5 N","0.67 N","F = ma = 2 × 3 = 6 N."],
["A skydiver falls at terminal velocity. What is the resultant force on her?","Zero","Equal to her weight, downwards","Upwards and larger than her weight","Downwards and increasing","Air resistance equals weight, so the forces balance and speed stays constant."],
["Which law says every action has an equal and opposite reaction?","Newton's third law","Newton's first law","Newton's second law","Hooke's law","Newton's third law: forces come in equal and opposite pairs acting on different objects."],
["A 1000 kg car has a resultant force of 2000 N. What is its acceleration?","2 m/s²","0.5 m/s²","2000 m/s²","20 m/s²","a = F ÷ m = 2000 ÷ 1000 = 2 m/s²."],
["Why do passengers lurch forward when a bus brakes suddenly?","Their inertia keeps them moving forward","The brakes push them forward","Gravity suddenly increases","Friction pulls them forward","Inertia: a body keeps moving unless a resultant force acts on it."]
]);
T("phy","density","Mass, weight and density",3,[
["An object of mass 5 kg is on Earth (g = 10 N/kg). What is its weight?","50 N","5 N","0.5 N","5 kg","W = mg = 5 × 10 = 50 N. Weight is a force, measured in newtons."],
["A block has mass 200 g and volume 50 cm³. What is its density?","4 g/cm³","0.25 g/cm³","250 g/cm³","10 000 g/cm³","Density = mass ÷ volume = 200 ÷ 50 = 4 g/cm³."],
["An astronaut travels from Earth to the Moon. What happens to her mass and weight?","Mass stays the same, weight decreases","Both decrease","Mass decreases, weight stays the same","Both stay the same","Mass is the amount of matter and does not change. The Moon's g is smaller, so weight drops."],
["An object floats in water. What must be true about its density?","It is less than 1 g/cm³","It is more than 1 g/cm³","It is exactly 0","It equals its mass","Water's density is 1 g/cm³. Objects less dense than water float."]
]);
T("phy","moments","Turning effect of forces",3,[
["A 20 N force acts 0.5 m from a pivot. What is its moment?","10 N m","40 N m","20.5 N m","0.025 N m","Moment = force × perpendicular distance = 20 × 0.5 = 10 N m."],
["A 4 N weight sits 30 cm left of a pivot. Where must a 6 N weight go to balance it?","20 cm right of the pivot","30 cm right of the pivot","45 cm right of the pivot","10 cm right of the pivot","Principle of moments: 4 × 30 = 6 × d, so d = 20 cm."],
["Why is a door handle placed far from the hinges?","A larger distance gives a larger moment for the same force","It reduces the door's weight","It lowers the centre of gravity","It reduces friction","Moment = force × distance, so you need less force when the distance is larger."],
["Which change makes a bus more stable?","A lower centre of gravity and a wider base","A higher centre of gravity","A narrower base","More passengers on the top deck","A low centre of gravity and wide base mean it must tilt further before toppling."],
["For an object in equilibrium, which statement is true?","Total clockwise moments equal total anticlockwise moments, and the resultant force is zero","Only the resultant force is zero","Clockwise moments are larger","Its weight is zero","Equilibrium needs both: no resultant force and no resultant moment."]
]);
T("phy","pressure","Pressure",3,[
["A 600 N force acts on an area of 2 m². What is the pressure?","300 Pa","1200 Pa","602 Pa","0.0033 Pa","p = F ÷ A = 600 ÷ 2 = 300 Pa."],
["Why do snowshoes stop you sinking into snow?","They spread your weight over a larger area, lowering pressure","They reduce your weight","They increase the pressure","They reduce your mass","Same force over a larger area gives lower pressure."],
["Pressure in a liquid increases with…","Depth and density of the liquid","Surface area of the container","Shape of the container","Volume of the container","p = hρg. Shape and area of the container do not matter."],
["What is the pressure due to 10 m of water? (ρ = 1000 kg/m³, g = 10 N/kg)","100 000 Pa","10 000 Pa","1000 Pa","100 Pa","p = hρg = 10 × 1000 × 10 = 100 000 Pa."],
["A hydraulic jack works because…","Pressure is transmitted equally through a liquid","Liquids are easily compressed","Gases cannot be compressed","Force only increases with depth","A small force on a small piston creates a pressure that acts on a large piston, giving a large force."]
]);
T("phy","energy","Energy, work and power",3,[
["A 50 kg student climbs 4 m of stairs. How much gravitational potential energy is gained? (g = 10 N/kg)","2000 J","200 J","500 J","20 J","GPE = mgh = 50 × 10 × 4 = 2000 J."],
["A 2 kg ball moves at 3 m/s. What is its kinetic energy?","9 J","6 J","18 J","3 J","KE = ½mv² = ½ × 2 × 3² = 9 J."],
["A motor does 600 J of work in 5 s. What is its power?","120 W","3000 W","605 W","0.0083 W","P = W ÷ t = 600 ÷ 5 = 120 W."],
["A machine takes in 200 J and gives out 150 J of useful energy. What is its efficiency?","75%","50%","133%","25%","Efficiency = useful output ÷ input × 100% = 150 ÷ 200 × 100% = 75%."],
["Which energy source is renewable?","Solar","Coal","Natural gas","Uranium","Solar energy will not run out. Fossil fuels and uranium are used up."]
]);
T("phy","waves","General wave properties",3,[
["A wave has frequency 5 Hz and wavelength 2 m. What is its speed?","10 m/s","2.5 m/s","0.4 m/s","7 m/s","v = fλ = 5 × 2 = 10 m/s."],
["In a transverse wave, the particles vibrate…","At right angles to the direction the wave travels","Parallel to the direction the wave travels","Only in circles","Not at all","Light and water ripples are transverse."],
["Which of these is a longitudinal wave?","Sound","Light","A water ripple","A radio wave","In sound, air particles vibrate back and forth along the direction of travel."],
["What is the amplitude of a wave?","The maximum displacement from the rest position","The distance between two crests","The number of waves per second","The speed of the wave","Distance between crests is the wavelength; waves per second is the frequency."],
["A wave has a period of 0.25 s. What is its frequency?","4 Hz","0.25 Hz","25 Hz","2.5 Hz","f = 1 ÷ T = 1 ÷ 0.25 = 4 Hz."]
]);
T("phy","light","Light",3,[
["When does total internal reflection happen?","Light goes from a denser to a less dense medium at more than the critical angle","Light goes from air into glass","The angle of incidence is less than the critical angle","Light hits a mirror","Both conditions are needed: denser to less dense, and angle greater than the critical angle."],
["Why does a straw look bent in a glass of water?","Light refracts as it leaves the water into air","Light reflects off the water","The straw really bends","Light diffracts around the straw","Light changes speed and direction at the water–air boundary."],
["Light travels from air into glass. What happens?","It slows down and bends towards the normal","It speeds up and bends away from the normal","Its speed does not change","It bends away from the normal","Glass is optically denser, so light slows and bends towards the normal."],
["A glass has refractive index 1.5. What is the speed of light in it? (c = 3.0 × 10⁸ m/s)","2.0 × 10⁸ m/s","4.5 × 10⁸ m/s","3.0 × 10⁸ m/s","1.5 × 10⁸ m/s","n = c ÷ v, so v = 3.0 × 10⁸ ÷ 1.5 = 2.0 × 10⁸ m/s."],
["For a plane mirror, which statement is true?","Angle of incidence = angle of reflection","The image is real","The image is upside down","The image is larger than the object","Plane mirror images are virtual, upright, the same size and laterally inverted."]
]);
T("phy","emspec","Electromagnetic spectrum",3,[
["Which electromagnetic wave is used to sterilise medical equipment?","Gamma rays","Radio waves","Infrared","Visible light","Gamma rays carry enough energy to kill bacteria."],
["Which electromagnetic waves have the longest wavelength?","Radio waves","Gamma rays","X-rays","Ultraviolet","Order from longest: radio, microwave, infrared, visible, UV, X-ray, gamma."],
["What do all electromagnetic waves have in common?","They travel at the same speed in a vacuum","They have the same frequency","They have the same wavelength","They are all visible","All EM waves travel at 3.0 × 10⁸ m/s in a vacuum."],
["Which waves do TV remote controls use?","Infrared","Ultraviolet","X-rays","Gamma rays","Remotes send coded pulses of infrared."]
]);
T("phy","sound","Sound",3,[
["Why can't sound travel through space?","Sound needs a medium of particles to travel through","Space is too cold","Sound is too slow","Sound is an electromagnetic wave","Space is a vacuum, with no particles to pass on the vibrations."],
["A louder sound has a larger…","Amplitude","Frequency","Wavelength","Speed","Loudness depends on amplitude; pitch depends on frequency."],
["An echo returns 2.0 s after a shout. How far away is the wall? (speed of sound = 340 m/s)","340 m","680 m","170 m","1360 m","Sound travels 340 × 2 = 680 m there and back, so the wall is 680 ÷ 2 = 340 m away."],
["Ultrasound has a frequency…","Above 20 kHz","Below 20 Hz","Between 20 Hz and 20 kHz","Of exactly 20 kHz","Humans hear about 20 Hz to 20 kHz. Ultrasound is above that range."]
]);
T("phy","kinetic","Kinetic particle model of matter",4,[
["Why can gases be compressed easily?","Their particles are far apart with large spaces between them","Their particles are tightly packed","Their particles do not move","Their particles are very heavy","There is lots of empty space between gas particles."],
["A sealed gas is heated. What happens to its pressure?","It increases, because particles hit the walls faster and more often","It decreases","It stays the same","It increases, because the particles get bigger","Particles gain kinetic energy, so collisions with the walls are harder and more frequent."],
["Brownian motion of smoke particles is evidence that…","Air molecules move randomly","Smoke is a liquid","Air has no mass","Particles do not move","Invisible air molecules hit the smoke particles randomly, making them jiggle."],
["A gas at constant temperature has its volume halved. What happens to its pressure?","It doubles","It halves","It stays the same","It is four times larger","At constant temperature, pV is constant, so halving V doubles p."]
]);
T("phy","thermproc","Transfer of thermal energy",4,[
["Why does a metal spoon left in hot soup get hot?","Conduction","Convection","Radiation","Evaporation","Thermal energy passes through the solid metal by conduction."],
["Why is an air-conditioner usually mounted high on a wall?","Cool air sinks, setting up convection currents","Cool air rises","Radiation works better high up","Conduction is faster near the ceiling","Cool, denser air sinks and warm air rises, so the whole room circulates."],
["Which surface is the best emitter of infrared radiation?","Dull black","Shiny silver","Shiny white","Polished metal","Dull black surfaces are the best emitters and absorbers."],
["How does thermal energy from the Sun reach Earth?","Radiation","Conduction","Convection","All three equally","Space is a vacuum, so only radiation can cross it."]
]);
T("phy","thermprop","Thermal properties of matter",4,[
["During melting, the temperature stays constant because the energy is used to…","Overcome the forces between particles","Speed the particles up","Increase the mass","Cool the surroundings","This is latent heat: energy breaks the attractions instead of raising temperature."],
["How much energy heats 2 kg of water by 5 °C? (c = 4200 J/(kg °C))","42 000 J","8400 J","21 000 J","4200 J","Q = mcΔθ = 2 × 4200 × 5 = 42 000 J."],
["Why does evaporation cause cooling?","The most energetic particles escape, lowering the average kinetic energy","The liquid absorbs cold","Particles gain energy","It only happens at the boiling point","Losing the fastest particles lowers the temperature of what is left."],
["Which material warms up most slowly because of its high specific heat capacity?","Water","Copper","Iron","Aluminium","Water's specific heat capacity (4200 J/(kg °C)) is much higher than that of metals."]
]);
T("phy","static","Static electricity",4,[
["A plastic rod rubbed with a cloth becomes negatively charged. Why?","Electrons moved from the cloth to the rod","Protons moved to the rod","Electrons left the rod","Neutrons moved to the rod","Only electrons move. The rod gains electrons; the cloth becomes positive."],
["What happens between two negatively charged balloons?","They repel each other","They attract each other","Nothing","They both become neutral","Like charges repel."],
["Why does a tall building have a lightning conductor?","It safely conducts charge to the ground","It stores charge","It attracts rain","It insulates the building","Charge flows down the thick metal strip instead of through the building."],
["Which way do electric field lines point?","From positive to negative","From negative to positive","In circles","Only towards positive","Field lines show the direction of force on a positive charge."]
]);
T("phy","current","Current of electricity",4,[
["A charge of 30 C passes a point in 10 s. What is the current?","3 A","300 A","0.33 A","40 A","I = Q ÷ t = 30 ÷ 10 = 3 A."],
["A component has 6 V across it and 2 A through it. What is its resistance?","3 Ω","12 Ω","0.33 Ω","8 Ω","R = V ÷ I = 6 ÷ 2 = 3 Ω."],
["What is electromotive force (e.m.f.)?","Work done by a source to drive a unit charge around a complete circuit","The current in a circuit","The resistance of a battery","Charge per second","e.m.f. is measured in volts (joules per coulomb)."],
["Compared with a short wire, a longer wire of the same material and thickness has…","Higher resistance","Lower resistance","The same resistance","Zero resistance","Resistance is proportional to length."]
]);
T("phy","dc","D.C. circuits",4,[
["Two 4 Ω resistors are connected in series. What is the total resistance?","8 Ω","2 Ω","4 Ω","16 Ω","In series, add them: 4 + 4 = 8 Ω."],
["Two 4 Ω resistors are connected in parallel. What is the total resistance?","2 Ω","8 Ω","4 Ω","0.5 Ω","1/R = 1/4 + 1/4 = 1/2, so R = 2 Ω."],
["In a series circuit, the current is…","The same everywhere","Largest next to the battery","Shared equally between branches","Zero at the bulbs","There is only one path, so the same current flows through every component."],
["What happens to an LDR's resistance when the light gets brighter?","It decreases","It increases","It stays the same","It becomes infinite","Light-dependent resistors have low resistance in bright light."]
]);
T("phy","practelec","Practical electricity",4,[
["A 2 kW heater runs for 3 hours. How much energy does it use?","6 kWh","0.67 kWh","5 kWh","6000 kWh","Energy = power × time = 2 kW × 3 h = 6 kWh."],
["Electricity costs 30 cents per kWh. How much does 6 kWh cost?","$1.80","$0.18","$18.00","$5.00","6 × 30 cents = 180 cents = $1.80."],
["Why is the fuse placed in the live wire?","So the appliance is cut off from the high voltage when the fuse blows","It carries the return current","It earths the metal casing","It increases the current","If the fuse were in the neutral wire, the appliance would stay live after it blew."],
["What does the earth wire do?","Carries current safely to the ground if the metal casing becomes live","Supplies power to the appliance","Completes the normal circuit","Lowers the electricity bill","A large current flows to earth and blows the fuse, protecting the user."],
["A 2300 W kettle runs on 230 V mains. What current does it draw?","10 A","0.1 A","2530 A","23 A","I = P ÷ V = 2300 ÷ 230 = 10 A."]
]);
T("phy","magnet","Magnetism",4,[
["Which material is magnetic?","Iron","Copper","Aluminium","Brass","Iron, steel, nickel and cobalt are magnetic."],
["What happens between two north poles?","They repel","They attract","Nothing","They cancel out","Like poles repel; unlike poles attract."],
["Why is soft iron used for the core of an electromagnet?","It magnetises and demagnetises easily","It stays magnetised permanently","It is non-magnetic","It is a good insulator","Soft iron loses its magnetism when the current is switched off."],
["Outside a bar magnet, magnetic field lines go…","From the north pole to the south pole","From the south pole to the north pole","In circles around the middle","Only out of the north pole","Field lines show the direction a north pole would be pushed."]
]);
T("phy","electromag","Electromagnetism",4,[
["How can you make an electromagnet stronger?","Increase the current or the number of turns","Use a copper core","Reduce the current","Use fewer turns","More current or more turns gives a stronger field."],
["What does the split-ring commutator in a d.c. motor do?","Reverses the current in the coil every half turn","Increases the voltage","Stops the coil","Changes d.c. into a.c. for the battery","Reversing the current keeps the coil turning the same way."],
["What shape is the magnetic field around a straight wire carrying a current?","Concentric circles around the wire","Straight lines parallel to the wire","Like a bar magnet's field","There is no field","Use the right-hand grip rule to find the direction."],
["Fleming's left-hand rule predicts the direction of…","The force on a current-carrying conductor in a magnetic field","An induced current","A magnet's own field","Electron flow inside a battery","First finger: Field, seCond finger: Current, thuMb: Motion (force)."]
]);
T("phy","induction","Electromagnetic induction",4,[
["When is a current induced in a coil?","When the magnetic field through it changes","When a magnet sits still inside it","Only when it is connected to a battery","When it is heated","A changing magnetic field induces an e.m.f. (Faraday's law)."],
["A transformer has 100 primary turns and 500 secondary turns. The input is 12 V a.c. What is the output?","60 V","2.4 V","12 V","600 V","Vs ÷ Vp = Ns ÷ Np, so Vs = 12 × 500 ÷ 100 = 60 V."],
["Why do transformers only work with a.c.?","Alternating current produces a changing magnetic field","D.c. is too strong","A.c. has a higher voltage","D.c. damages the coils","A steady d.c. field does not change, so nothing is induced."],
["Why is electricity transmitted across the country at high voltage?","A lower current means less energy lost as heat in the cables","It is safer","It travels faster","High-voltage cables are cheaper","Power lost = I²R, so a smaller current wastes much less energy."]
]);
T("phy","radio","Radioactivity",4,[
["Which radiation is stopped by a sheet of paper?","Alpha","Beta","Gamma","All of them","Alpha particles are large and highly ionising, so they are absorbed quickly."],
["A sample has a half-life of 2 days. What fraction is left after 6 days?","1/8","1/3","1/6","1/4","6 days is 3 half-lives: 1 → 1/2 → 1/4 → 1/8."],
["Which type of radiation is the most ionising?","Alpha","Beta","Gamma","They are all equal","Alpha is the most ionising and the least penetrating."],
["What are isotopes?","Atoms with the same number of protons but different numbers of neutrons","Atoms with the same number of neutrons but different numbers of protons","Atoms of different elements","Atoms with the same mass number","Isotopes are the same element with different nucleon numbers."]
]);

/* ===================== CHEMISTRY ===================== */
T("chem","experimental","Experimental chemistry",3,[
["Which method gets pure water from sea water?","Simple distillation","Filtration","Chromatography","Decanting","Water boils off and condenses; the salt stays behind."],
["In paper chromatography, what does a pure substance give?","One spot","Two spots","No spots","A long line","A mixture separates into several spots."],
["A spot travels 3 cm while the solvent travels 6 cm. What is the Rf value?","0.5","2","3","9","Rf = distance moved by spot ÷ distance moved by solvent = 3 ÷ 6 = 0.5."],
["How can you tell a solid is pure?","It has a sharp, fixed melting point","It melts over a range of temperatures","It is colourless","It dissolves in water","Impurities lower the melting point and make it melt over a range."],
["Which method collects ammonia, which is very soluble in water and less dense than air?","Upward delivery (displacing air downwards)","Collecting over water","Downward delivery","In an open beaker","Ammonia dissolves in water, so it can't be collected over water. It rises, so the tube points up."]
]);
T("chem","kpt","Kinetic particle theory",3,[
["Why does the smell of perfume spread across a room?","Diffusion: particles move randomly from high to low concentration","Only convection","The particles grow larger","Evaporation stops","Perfume particles spread out by moving randomly among air particles."],
["Which gas diffuses fastest?","Hydrogen (Mr = 2)","Oxygen (Mr = 32)","Carbon dioxide (Mr = 44)","Chlorine (Mr = 71)","Lighter particles move faster, so they diffuse faster."],
["A solid turning straight into a gas is called…","Sublimation","Evaporation","Condensation","Melting","Dry ice and iodine sublime when heated."],
["In a liquid, the particles…","Are close together but can slide past each other","Are fixed in place","Are far apart","Do not move","That is why liquids flow but are hard to compress."]
]);
T("chem","atomic","Atomic structure",3,[
["How many neutrons are in a sodium atom with nucleon number 23 and proton number 11?","12","11","23","34","Neutrons = nucleon number − proton number = 23 − 11 = 12."],
["What is the relative charge of an electron?","−1","+1","0","−2","Proton +1, neutron 0, electron −1."],
["What is the electronic configuration of chlorine (proton number 17)?","2.8.7","2.8.8","2.7.8","2.8.6.1","Fill shells 2, then 8, then the remaining 7."],
["Isotopes of an element have the same…","Chemical properties","Mass number","Number of neutrons","Physical properties","Same number of electrons means they react in the same way."]
]);
T("chem","bonding","Chemical bonding and structure",3,[
["Why does sodium chloride have a high melting point?","Strong electrostatic attraction between oppositely charged ions in a giant lattice","Weak forces between molecules","Covalent bonds inside small molecules","Metallic bonding","Lots of energy is needed to overcome the strong ionic bonds."],
["Why does graphite conduct electricity?","It has delocalised electrons that can move between the layers","It has free ions","It is a metal","Its atoms are charged","Each carbon uses 3 electrons for bonding; the 4th is free to move."],
["What shape is a water molecule?","Bent","Linear","Tetrahedral","Trigonal planar","Two bonding pairs and two lone pairs give a bent shape (VSEPR)."],
["Why does solid sodium chloride not conduct electricity?","Its ions are held in fixed positions","It has no ions","It has no electrons","It is covalent","When molten or dissolved, the ions can move and it conducts."],
["Which substance has a simple molecular structure?","Carbon dioxide","Diamond","Sodium chloride","Silicon dioxide","CO₂ is made of small molecules with weak forces between them, so it is a gas."]
]);
T("chem","formulae","Formulae and equations",3,[
["What is the formula of calcium chloride?","CaCl₂","CaCl","Ca₂Cl","CaCl₃","Ca²⁺ needs two Cl⁻ ions to balance its charge."],
["Balance the equation: __H₂ + O₂ → __H₂O","2 and 2","1 and 1","2 and 1","1 and 2","2H₂ + O₂ → 2H₂O has 4 H and 2 O on each side."],
["What is the formula of aluminium oxide?","Al₂O₃","AlO","Al₃O₂","AlO₂","Two Al³⁺ (total +6) balance three O²⁻ (total −6)."],
["What is the ionic equation for neutralisation?","H⁺ + OH⁻ → H₂O","Na⁺ + Cl⁻ → NaCl","H₂ + O₂ → H₂O","H⁺ + Cl⁻ → HCl","The spectator ions cancel out, leaving hydrogen and hydroxide ions forming water."]
]);
T("chem","mole","Mole concept and stoichiometry",3,[
["How many moles are in 8 g of oxygen gas, O₂ (Mr = 32)?","0.25 mol","4 mol","0.5 mol","256 mol","n = mass ÷ Mr = 8 ÷ 32 = 0.25 mol."],
["What is the Mr of CO₂? (C = 12, O = 16)","44","28","40","32","12 + 16 × 2 = 44."],
["What volume do 2 mol of gas take up at room temperature and pressure? (1 mol = 24 dm³)","48 dm³","12 dm³","24 dm³","2 dm³","2 × 24 = 48 dm³."],
["How many moles of NaOH are in 25.0 cm³ of 2.0 mol/dm³ solution?","0.050 mol","50 mol","0.080 mol","12.5 mol","n = concentration × volume in dm³ = 2.0 × 0.025 = 0.050 mol."],
["What is the percentage by mass of oxygen in water, H₂O? (H = 1, O = 16)","89%","11%","50%","67%","16 ÷ 18 × 100% = 88.9%."]
]);
T("chem","acids","Acids and bases",3,[
["A solution has pH 3. Is it acidic, alkaline or neutral?","Acidic","Alkaline","Neutral","You can't tell","Below 7 is acidic, 7 is neutral, above 7 is alkaline."],
["Acid + metal carbonate gives…","Salt + water + carbon dioxide","Salt + hydrogen","Salt + water only","Metal + acid","You see effervescence as the CO₂ is released."],
["Why is ethanoic acid called a weak acid?","It only partially ionises in water","It is dilute","Its pH is 7","It has no H⁺ ions","Strength is about how much it ionises, not how concentrated it is."],
["Which oxide is amphoteric (reacts with both acids and bases)?","Aluminium oxide","Sodium oxide","Carbon dioxide","Calcium oxide","Aluminium oxide and zinc oxide are amphoteric."],
["Acid + reactive metal gives…","Salt + hydrogen","Salt + water","Salt + carbon dioxide","Oxide + water","Test the gas with a lighted splint: it pops."]
]);
T("chem","salts","Salts",3,[
["Which method makes an insoluble salt such as barium sulfate?","Precipitation: mix two solutions","Titration","Adding excess insoluble base to acid","Crystallising from the acid","The insoluble salt forms as a solid that you filter off, wash and dry."],
["Which salt is insoluble in water?","Silver chloride","Sodium chloride","Potassium nitrate","Copper(II) sulfate","All sodium, potassium and nitrate salts are soluble; silver chloride is not."],
["When making copper(II) sulfate from copper(II) oxide and acid, why add the oxide in excess?","To make sure all the acid reacts","To make the salt insoluble","To speed up evaporation","To change the colour","The leftover solid oxide is filtered off, leaving only salt solution."],
["Which method suits making sodium chloride?","Titration of an acid with an alkali","Precipitation","Adding excess metal to acid","Filtration only","Sodium is too reactive to add to acid, and its salts are soluble, so use titration."]
]);
T("chem","qa","Qualitative analysis",3,[
["A gas turns damp red litmus paper blue. What is the gas?","Ammonia","Chlorine","Hydrogen","Carbon dioxide","Ammonia is the common alkaline gas."],
["Which gas relights a glowing splint?","Oxygen","Hydrogen","Carbon dioxide","Chlorine","Hydrogen gives a squeaky pop with a lighted splint instead."],
["Aqueous sodium hydroxide gives a blue precipitate. Which cation is present?","Cu²⁺","Fe²⁺","Fe³⁺","Zn²⁺","Fe²⁺ gives green, Fe³⁺ red-brown, Zn²⁺ white (dissolves in excess)."],
["Acidified silver nitrate gives a white precipitate. Which anion is present?","Chloride","Iodide","Sulfate","Nitrate","Iodide gives a yellow precipitate. Sulfate is tested with barium nitrate."],
["Which gas bleaches damp litmus paper?","Chlorine","Ammonia","Hydrogen","Nitrogen","Chlorine turns damp blue litmus red, then white."]
]);
T("chem","periodic","The Periodic Table",3,[
["Why does reactivity increase down Group 1?","The outer electron is further from the nucleus, so it is lost more easily","The atoms get smaller","There are more outer electrons","The nuclear charge decreases","Group 1 metals react by losing their single outer electron."],
["Why are noble gases unreactive?","They have a full outer shell of electrons","They are gases","They have no electrons","They are heavy","A full outer shell is stable, so they don't need to gain, lose or share electrons."],
["Going down Group 17 (the halogens), reactivity…","Decreases","Increases","Stays the same","Increases then decreases","Halogens react by gaining an electron, which gets harder as atoms get bigger."],
["Which property is typical of transition metals?","They form coloured compounds","They are soft with low density","They react violently with water","They have one outer electron","Transition metals are also hard and dense and often act as catalysts."],
["Chlorine water is added to potassium bromide solution. What forms?","Bromine, so the solution turns orange","Nothing, there is no reaction","Chlorine gas","Iodine","Chlorine is more reactive than bromine, so it displaces it."]
]);
T("chem","redox","Redox",3,[
["In Zn + Cu²⁺ → Zn²⁺ + Cu, which substance is oxidised?","Zn","Cu²⁺","Zn²⁺","Cu","Zinc loses electrons to become Zn²⁺, so it is oxidised."],
["Oxidation is…","Loss of electrons","Gain of electrons","Loss of oxygen","Gain of hydrogen","OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons)."],
["What is the oxidation state of Mn in KMnO₄?","+7","+4","+2","−1","K is +1 and 4 O are −8, so Mn must be +7 for the total to be 0."],
["Acidified potassium manganate(VII) turns from purple to colourless. What is it acting as?","An oxidising agent","A reducing agent","Only an indicator","A catalyst","It oxidises the other substance and is itself reduced to colourless Mn²⁺."]
]);
T("chem","metals","Metals",4,[
["Which metal is the most reactive?","Potassium","Zinc","Iron","Copper","Reactivity series: K, Na, Ca, Mg, Al, (C), Zn, Fe, Pb, (H), Cu, Ag, Au."],
["Why is aluminium extracted by electrolysis rather than by heating with carbon?","Aluminium is more reactive than carbon","Aluminium is less reactive than carbon","Aluminium is a liquid","Carbon is too expensive","Carbon can only reduce oxides of metals below it in the reactivity series."],
["Rusting of iron needs…","Water and oxygen","Only water","Only oxygen","Carbon dioxide","Remove either one and iron will not rust."],
["Why does galvanising (a zinc coating) protect iron even when scratched?","Zinc is more reactive, so it corrodes instead of the iron","Zinc is unreactive","Zinc keeps water out completely","Zinc is a catalyst","This is sacrificial protection."],
["Why are alloys harder than pure metals?","Different-sized atoms disrupt the layers, so they slide less easily","They have more electrons","They are ionic","They have no layers","Pure metals have regular layers that slide over each other easily."]
]);
T("chem","electrochem","Electrochemistry",4,[
["During electrolysis, positive ions (cations) move to the…","Cathode (negative electrode)","Anode (positive electrode)","Both electrodes","Neither electrode","Opposite charges attract."],
["Concentrated aqueous sodium chloride is electrolysed. What forms at the anode?","Chlorine","Oxygen","Sodium","Hydrogen","At high concentration, Cl⁻ ions are discharged in preference to OH⁻."],
["Molten lead(II) bromide is electrolysed. What forms at the cathode?","Lead","Bromine","Hydrogen","Oxygen","Pb²⁺ gains electrons at the cathode. Bromine forms at the anode."],
["In a simple cell made of zinc and copper, which is the negative terminal?","Zinc","Copper","Both","Neither","The more reactive metal loses electrons, so it is the negative terminal."],
["What is the only product of a hydrogen fuel cell?","Water","Carbon dioxide","Hydrogen","Methane","Hydrogen and oxygen combine to make water, producing electricity."]
]);
T("chem","energetics","Chemical energetics",4,[
["In an exothermic reaction…","Heat is released, and ΔH is negative","Heat is absorbed, and ΔH is positive","There is no energy change","A catalyst is always needed","The products have less energy than the reactants."],
["Breaking chemical bonds is…","Endothermic","Exothermic","Neither","Both","Energy must be taken in to break bonds; making bonds releases energy."],
["Dissolving ammonium nitrate in water makes it colder. This process is…","Endothermic","Exothermic","Combustion","Neutralisation","It takes in heat from the water, so the temperature falls."],
["Which process is exothermic?","Burning methane","Photosynthesis","Thermal decomposition of calcium carbonate","Melting ice","Combustion releases heat; the others take in energy."]
]);
T("chem","rates","Rate of reaction",4,[
["Why does raising the temperature speed up a reaction?","Particles have more energy, so more collisions have at least the activation energy","The activation energy increases","There are fewer collisions","The particles get bigger","Particles also move faster, so they collide more often."],
["Why does powdered marble react faster with acid than marble chips?","Powder has a larger surface area, so collisions are more frequent","Powder is more concentrated","Powder is a catalyst","Chips are heavier","More exposed particles means more collisions per second."],
["How does a catalyst speed up a reaction?","It provides a pathway with a lower activation energy","It raises the temperature","It gets used up","It increases the concentration","A catalyst is chemically unchanged at the end."],
["Which apparatus is used to measure the volume of gas produced over time?","Gas syringe","Pipette","Thermometer","Test tube","Read the syringe at regular time intervals and plot a graph."]
]);
T("chem","equilibrium","Chemical equilibrium",4,[
["At dynamic equilibrium…","The forward and backward reactions happen at the same rate","The reaction stops","Only products are left","Reactant and product concentrations must be equal","Both reactions keep going, so the concentrations stay constant."],
["For N₂ + 3H₂ ⇌ 2NH₃, what does increasing the pressure do?","Shifts the equilibrium right, to fewer gas molecules","Shifts it left","No change","Stops the reaction","There are 4 gas molecules on the left and 2 on the right."],
["The forward reaction is exothermic. What happens when you raise the temperature?","The equilibrium shifts left (the backward reaction is favoured)","It shifts right","No change","It depends on the catalyst","Le Chatelier: the system favours the endothermic direction to absorb the extra heat."],
["What does adding a catalyst do to a reaction at equilibrium?","It does not change the position, but equilibrium is reached faster","It shifts it right","It shifts it left","It increases the yield","A catalyst speeds up the forward and backward reactions equally."]
]);
T("chem","organic1","Organic chemistry: fuels, alkanes and alkenes",4,[
["What is the general formula of the alkanes?","CₙH₂ₙ₊₂","CₙH₂ₙ","CₙH₂ₙ₋₂","CₙH₂ₙ₊₁OH","Example: methane CH₄, ethane C₂H₆."],
["Which test shows a compound is an alkene?","It decolourises aqueous bromine","It turns limewater milky","It relights a glowing splint","It turns red litmus blue","Bromine adds across the C=C double bond, so the orange colour disappears."],
["What does cracking long-chain alkanes produce?","Shorter alkanes and alkenes","Only water","Polymers","Only alcohols","Cracking meets demand for petrol and makes alkenes for plastics."],
["Fractional distillation separates crude oil by…","Boiling point","Colour","Density","Solubility","Smaller molecules have lower boiling points and rise higher up the column."],
["What is the name of C₃H₈?","Propane","Propene","Butane","Ethane","3 carbons = prop-; single bonds only = -ane."]
]);
T("chem","organic2","Organic chemistry: alcohols, acids and esters",4,[
["What is the functional group of alcohols?","−OH","−COOH","C=C","−COO−","For example, ethanol is C₂H₅OH."],
["Ethanol reacts with ethanoic acid (with a few drops of concentrated sulfuric acid). What forms?","An ester and water","An alkene","A salt and hydrogen","A polymer","Esters often smell fruity. This reaction is esterification."],
["What does oxidising ethanol with acidified potassium manganate(VII) give?","Ethanoic acid","Ethene","Ethane","Methanol","The alcohol is oxidised to a carboxylic acid."],
["What does fermentation of glucose by yeast produce?","Ethanol and carbon dioxide","Ethene and water","Methane","Only ethanoic acid","It happens without oxygen, at around 37 °C."]
]);
T("chem","polymers","Polymers",4,[
["How is poly(ethene) made?","Addition polymerisation","Condensation polymerisation","Fermentation","Cracking","Many ethene monomers join by opening their C=C double bonds."],
["Condensation polymerisation also produces…","A small molecule such as water","Hydrogen","Nothing else","Carbon dioxide","Each link between monomers releases a small molecule."],
["Nylon is a…","Polyamide","Polyester","Poly(alkene)","Carbohydrate","Nylon has amide links; Terylene (PET) is a polyester."],
["Why are non-biodegradable plastics a problem for the environment?","Microorganisms can't break them down, so they last for many years","They dissolve in rain","They are too heavy","They break down too fast","They fill landfills and harm wildlife."]
]);
T("chem","air","Maintaining air quality",4,[
["About what percentage of clean air is nitrogen?","78%","21%","1%","50%","Roughly 78% nitrogen, 21% oxygen and 1% other gases."],
["Which toxic gas comes from incomplete combustion?","Carbon monoxide","Nitrogen","Oxygen","Argon","CO binds to haemoglobin and stops blood carrying oxygen."],
["A catalytic converter changes carbon monoxide and nitrogen monoxide into…","Carbon dioxide and nitrogen","Ammonia and water","Ozone","Sulfur dioxide","2CO + 2NO → 2CO₂ + N₂."],
["What mainly causes acid rain?","Sulfur dioxide and nitrogen oxides","Carbon monoxide","Methane","Ozone","These dissolve in rainwater to form acids."],
["Which greenhouse gas comes from cattle and rice fields?","Methane","Oxygen","Nitrogen","Argon","Methane is a powerful greenhouse gas."]
]);

/* ===================== BIOLOGY ===================== */
T("bio","cells","Cell structure and organisation",3,[
["Which organelle is the site of aerobic respiration?","Mitochondrion","Ribosome","Nucleus","Chloroplast","Mitochondria release energy from glucose."],
["Which structure is found in plant cells but not in animal cells?","Cell wall","Cell membrane","Nucleus","Mitochondrion","Plant cells also have chloroplasts and a large central vacuole."],
["What do ribosomes do?","Make proteins","Release energy","Control what enters the cell","Store water","Ribosomes are found on rough endoplasmic reticulum and in the cytoplasm."],
["Why do root hair cells have a long extension?","To increase the surface area for absorbing water and mineral ions","To photosynthesise","Only to anchor the plant","To store starch","More surface area means faster absorption."],
["What is the correct order of organisation?","Cell → tissue → organ → organ system","Tissue → cell → organ → organ system","Organ → tissue → cell → organ system","Cell → organ → tissue → organ system","Similar cells form tissues; tissues form organs; organs work together in systems."]
]);
T("bio","movement","Movement of substances",3,[
["A potato strip placed in strong salt solution gets shorter. Why?","Water left the cells by osmosis","Salt entered by active transport","Water entered by diffusion","The cell walls burst","The salt solution has a lower water potential than the cells."],
["How is active transport different from diffusion?","It uses energy to move substances against a concentration gradient","It needs no energy","It only moves water","It moves substances down a concentration gradient","Root hair cells use active transport to take in mineral ions."],
["What happens to a red blood cell placed in distilled water?","It swells and bursts","It shrinks","It stays the same","It becomes plasmolysed","Water enters by osmosis and there is no cell wall to stop it bursting."],
["Osmosis is the movement of water through a partially permeable membrane from…","A dilute solution to a more concentrated solution","A concentrated solution to a dilute solution","Any direction at random","Plants to animals only","Water moves from higher to lower water potential."]
]);
T("bio","molecules","Biological molecules",3,[
["Which reagent tests for reducing sugar, and what shows a positive result?","Benedict's solution: a brick-red precipitate","Iodine: blue-black","Biuret: violet","Ethanol: cloudy white","Heat with Benedict's in a water bath. Colours go green, yellow, orange, brick-red with more sugar."],
["What colour does iodine turn when starch is present?","Blue-black","Brick-red","Violet","Milky white","Iodine stays brown if there is no starch."],
["Proteins are made from…","Amino acids","Glucose","Fatty acids and glycerol","Starch","Amino acids join to form polypeptides."],
["What is a positive result for the biuret test?","Violet / purple","Blue-black","Brick-red","Yellow","Biuret tests for protein. It stays blue if no protein is present."]
]);
T("bio","enzymes","Enzymes",3,[
["Why does an enzyme stop working at very high temperatures?","Its active site changes shape (it is denatured)","It gets used up","It works too fast","The substrate disappears","The substrate no longer fits the active site."],
["In the lock-and-key model, the substrate fits into the enzyme's…","Active site","Cell wall","Nucleus","Product","The shape of the active site is complementary to the substrate."],
["Pepsin, a stomach enzyme, works best at about…","pH 2 (acidic)","pH 7","pH 12","Any pH","The stomach contains hydrochloric acid."],
["Enzymes are…","Biological catalysts made of protein","Fats","Carbohydrates","Minerals","They speed up reactions without being used up."]
]);
T("bio","humannut","Nutrition in humans",3,[
["Which enzyme starts digesting starch in the mouth?","Salivary amylase","Pepsin","Lipase","Trypsin","Amylase breaks starch into maltose."],
["Where are most digested nutrients absorbed?","Small intestine (ileum)","Stomach","Large intestine","Oesophagus","The large intestine mainly absorbs water."],
["What does bile do?","Emulsifies fats into small droplets","Digests protein","Kills all bacteria","Absorbs water","Smaller droplets have a larger surface area for lipase to work on."],
["How do villi help absorption?","They greatly increase the surface area","They produce bile","They store food","They slow digestion down","Villi also have thin walls and many capillaries."],
["Where is bile made?","Liver","Gall bladder","Pancreas","Stomach","Bile is made in the liver and stored in the gall bladder."]
]);
T("bio","plantnut","Nutrition in plants",3,[
["What is the word equation for photosynthesis?","Carbon dioxide + water → glucose + oxygen","Glucose + oxygen → carbon dioxide + water","Water + oxygen → glucose","Glucose → ethanol + carbon dioxide","Light energy is absorbed by chlorophyll."],
["Which pigment absorbs light for photosynthesis?","Chlorophyll","Haemoglobin","Starch","Xylem","Chlorophyll is found in chloroplasts."],
["Why are palisade mesophyll cells near the top of the leaf?","To absorb the most light","To store water","To take in carbon dioxide from the soil","To transport sugars","They are packed with chloroplasts."],
["How do gases enter and leave a leaf?","Through stomata","Through xylem","Through the waxy cuticle","Through root hairs","Guard cells open and close the stomata."]
]);
T("bio","planttrans","Transport in plants",3,[
["Which tissue carries water up the stem?","Xylem","Phloem","Epidermis","Cuticle","Xylem vessels are hollow, dead tubes strengthened with lignin."],
["What does phloem transport?","Sugars (sucrose) and amino acids","Only water","Only mineral salts","Oxygen","This is called translocation."],
["When does transpiration happen fastest?","On a hot, dry, windy day","On a humid day","When it is dark and cold","When the stomata are closed","Hot, dry and windy conditions speed up evaporation from the leaves."],
["Why do plants wilt?","Their cells lose water and become flaccid","They get too much light","They get too much water","Their roots grow","Without water, cells lose their turgor and can't support the plant."]
]);
T("bio","humantrans","Transport in humans",3,[
["Why does the left ventricle have a thicker wall than the right ventricle?","It pumps blood all around the body at higher pressure","It holds more blood","It pumps blood to the lungs","It receives blood from the body","The right ventricle only pumps blood to the nearby lungs."],
["Which blood vessels carry blood away from the heart?","Arteries","Veins","Capillaries","Valves","Arteries have thick, muscular, elastic walls."],
["Why do veins have valves?","To stop blood flowing backwards","To speed blood up","To make blood cells","To exchange gases","Blood in veins is at low pressure."],
["Which cells carry oxygen?","Red blood cells","White blood cells","Platelets","Plasma","They contain haemoglobin and have no nucleus."],
["Where does the pulmonary artery carry blood?","To the lungs","To the body","To the brain","To the liver","It carries deoxygenated blood from the right ventricle."]
]);
T("bio","respiration","Respiration in humans",3,[
["What builds up in muscles during hard exercise when oxygen runs short?","Lactic acid","Glucose","Oxygen","Ethanol","This is anaerobic respiration, which leaves an oxygen debt."],
["What is the word equation for aerobic respiration?","Glucose + oxygen → carbon dioxide + water (+ energy)","Carbon dioxide + water → glucose + oxygen","Glucose → lactic acid","Glucose → ethanol + carbon dioxide","It happens in mitochondria."],
["Where does gas exchange take place in the lungs?","Alveoli","Trachea","Bronchi","Diaphragm","Alveoli have thin walls, a huge surface area and many capillaries."],
["When you breathe in, the diaphragm…","Contracts and flattens","Relaxes and domes upwards","Does not move","Pushes air out","This increases the volume of the chest and lowers the pressure."],
["What does yeast produce in anaerobic conditions?","Ethanol and carbon dioxide","Lactic acid","Oxygen","Glucose","This is used in bread-making and brewing."]
]);
T("bio","excretion","Excretion in humans",3,[
["Where in the kidney does ultrafiltration happen?","Glomerulus and Bowman's capsule","Loop of Henle","Collecting duct","Ureter","High blood pressure forces small molecules out of the glomerulus."],
["Where is urea made?","Liver","Kidney","Bladder","Stomach","Excess amino acids are deaminated in the liver."],
["Where in the nephron is glucose reabsorbed?","Proximal convoluted tubule","Bladder","Ureter","Urethra","All the glucose is normally reabsorbed back into the blood."],
["What does ADH do?","Makes the kidneys reabsorb more water, so less, more concentrated urine is made","Makes the kidneys release more water","Makes more urea","Filters more glucose","ADH is released when the blood is too concentrated."]
]);
T("bio","homeostasis","Homeostasis",3,[
["Which hormone lowers blood glucose?","Insulin","Glucagon","Adrenaline","ADH","Insulin makes the liver convert glucose into glycogen."],
["What is homeostasis?","Keeping the internal environment constant","Growth","Reproduction","Breathing","For example, body temperature, blood glucose and water levels."],
["When you are too hot, the arterioles near your skin…","Dilate (vasodilation), sending more blood to the skin surface","Constrict","Close permanently","Produce sweat","More heat is lost from the skin by radiation."],
["What does glucagon do?","Makes the liver convert glycogen into glucose","Makes the liver store more glycogen","Makes insulin","Makes urea","Glucagon raises blood glucose when it is too low."]
]);
T("bio","nervous","Nervous system and the eye",3,[
["What is the correct order of a reflex arc?","Receptor → sensory neurone → relay neurone → motor neurone → effector","Effector → motor neurone → relay neurone → sensory neurone → receptor","Receptor → motor neurone → sensory neurone → effector","Brain → receptor → effector","Reflexes are fast and automatic."],
["What happens to the pupil in bright light?","It gets smaller, because the circular muscles of the iris contract","It gets bigger","It stays the same","It closes completely","This protects the retina from too much light."],
["Which parts of the eye focus light onto the retina?","Cornea and lens","Iris","Pupil","Optic nerve","Ciliary muscles change the lens shape for near and far objects."],
["What is the gap between two neurones called?","Synapse","Axon","Dendrite","Receptor","Chemicals called neurotransmitters cross the synapse."]
]);
T("bio","hormones","Hormones",3,[
["What does adrenaline do?","Increases heart rate and blood glucose","Lowers heart rate","Lowers blood glucose","Stops breathing","It prepares the body for 'fight or flight'."],
["How are hormones carried around the body?","In the blood","Along nerves","Through the air","Only in lymph","Hormones are made by endocrine glands."],
["Compared with nerve impulses, the effects of hormones are usually…","Slower and longer-lasting","Faster and shorter","Exactly the same","Instant","Nerve impulses are fast electrical signals."],
["In type 1 diabetes, the pancreas…","Does not make enough insulin","Makes too much insulin","Makes too much glucagon","Stops digesting food","Blood glucose can rise too high, so insulin is injected."]
]);
T("bio","disease","Infectious diseases",4,[
["Why don't antibiotics work against the flu?","Flu is caused by a virus","Flu is caused by a bacterium","Antibiotics are too weak","Flu is not infectious","Antibiotics kill bacteria, not viruses."],
["How does a vaccine protect you?","It triggers your immune system to make antibodies and memory cells","It kills all bacteria","It is an antibiotic","It replaces your red blood cells","Next time, memory cells respond quickly before you get ill."],
["Which disease is caused by a virus?","Dengue","Cholera","Tuberculosis","Tetanus","Cholera, TB and tetanus are caused by bacteria."],
["Why does misusing antibiotics cause problems?","It can lead to antibiotic-resistant bacteria","It makes viruses resistant","It stops vaccines working","It causes diabetes","Resistant bacteria survive and multiply."],
["How is dengue spread?","By the bite of an infected Aedes mosquito","Through contaminated water","By shaking hands","By eating undercooked food","That is why we remove stagnant water where mosquitoes breed."]
]);
T("bio","dna","Molecular genetics",4,[
["How do the bases in DNA pair up?","A with T, and C with G","A with C, and G with T","A with G, and C with T","A with U only","These are complementary base pairs."],
["What is a gene?","A section of DNA that codes for one polypeptide","A whole chromosome","A cell","A protein","Genes are found on chromosomes in the nucleus."],
["To make human insulin by genetic engineering, the human insulin gene is put into…","Bacteria","Red blood cells","Viruses only","Fungi only","The bacteria multiply and make insulin, which is collected."],
["A DNA strand reads ATGC. What is the complementary strand?","TACG","ATGC","GCAT","UACG","A pairs with T and C pairs with G."]
]);
T("bio","division","Cell division",4,[
["What does mitosis produce?","Two genetically identical cells","Four genetically different cells","Gametes","One cell","Mitosis is used for growth, repair and asexual reproduction."],
["What is meiosis used for?","Making gametes","Making skin cells","Growing body cells","Making red blood cells","Meiosis halves the chromosome number."],
["A human body cell has 46 chromosomes. How many does a sperm cell have?","23","46","92","12","At fertilisation, 23 + 23 = 46."],
["Why is mitosis important?","For growth and repair","For making gametes","For creating variation","For digestion","The new cells are identical to the parent cell."]
]);
T("bio","plantrep","Reproduction in plants",4,[
["What is pollination?","Transfer of pollen from an anther to a stigma","The joining of gametes","Seed dispersal","Germination","Fertilisation happens after pollination."],
["Insect-pollinated flowers usually have…","Bright petals and nectar","Feathery stigmas hanging outside","No scent","Huge amounts of light, smooth pollen","Wind-pollinated flowers have feathery stigmas and light pollen."],
["Which part of a flower is male?","Anther","Stigma","Ovary","Ovule","The anther makes pollen. Stigma, style and ovary are female parts."],
["After fertilisation, the ovule becomes the…","Seed","Fruit","Petal","Pollen grain","The ovary becomes the fruit."]
]);
T("bio","humanrep","Reproduction in humans",4,[
["Where does fertilisation usually happen?","In the oviduct (fallopian tube)","In the uterus","In the ovary","In the vagina","The fertilised egg then moves to the uterus and implants."],
["What does the placenta do?","Exchanges nutrients, oxygen and wastes between mother and fetus","Produces eggs","Protects the fetus from every disease","Makes sperm","The bloods of mother and fetus do not mix."],
["Which hormone mainly controls male secondary sexual characteristics?","Testosterone","Oestrogen","Insulin","Adrenaline","Testosterone is made in the testes."],
["Where are sperm made?","Testes","Prostate gland","Urethra","Bladder","The prostate gland adds fluid to make semen."]
]);
T("bio","inheritance","Inheritance",4,[
["Tt is crossed with tt. What proportion of the offspring are tt?","50%","25%","75%","0%","Offspring are Tt, Tt, tt, tt, so half are tt."],
["An organism with two different alleles for a gene is…","Heterozygous","Homozygous","Recessive","A mutant","Homozygous means two identical alleles."],
["What does phenotype mean?","The observable characteristics","The alleles present","The DNA bases","The number of chromosomes","Genotype is the alleles; phenotype is what you can observe."],
["Which inheritance pattern does blood group AB show?","Codominance","Recessive inheritance","Mutation","Natural selection","Both the A and B alleles are expressed."],
["What are the sex chromosomes of a human male?","XY","XX","YY","X only","Females are XX."]
]);
T("bio","variation","Variation and natural selection",4,[
["Which is an example of continuous variation?","Height","Blood group","Tongue rolling","Biological sex","Continuous variation has a range of values with no distinct groups."],
["In natural selection, organisms that are better adapted…","Survive and reproduce, passing on their alleles","Die out","Change their genes on purpose","Stop reproducing","Over many generations, useful alleles become more common."],
["What is a mutation?","A random change in DNA","Always harmful","A type of cell division","Caused only by diet","Most mutations have no effect; a few are useful or harmful."],
["Antibiotic resistance spreading through bacteria is an example of…","Natural selection","Artificial selection","Pollination","Homeostasis","Resistant bacteria survive the antibiotic and reproduce."]
]);
T("bio","ecology","Organisms and their environment",4,[
["What do the arrows in a food chain show?","The direction energy flows","Who is eaten by whom, backwards","Water flow","Oxygen flow","Arrows point from the food to the organism that eats it."],
["Why is energy lost along a food chain?","It is lost as heat from respiration, in movement and in undigested waste","Producers make no energy","Energy increases at each level","Decomposers create energy","Only about 10% passes to the next level, so food chains are short."],
["What do decomposers do?","Break down dead matter, releasing nutrients","Make food by photosynthesis","Eat only living plants","Hunt other animals","Bacteria and fungi recycle nutrients back to the soil."],
["Cutting down forests increases the amount of which gas in the air?","Carbon dioxide","Oxygen","Nitrogen","Argon","Fewer trees means less CO₂ is removed by photosynthesis."],
["What are organisms that make their own food called?","Producers","Consumers","Decomposers","Predators","Green plants are producers."]
]);

/* ===================== PRACTICAL ===================== */
T("prac","planning","Planning and variables",3,[
["You test how temperature affects enzyme activity. Which two things should you keep constant?","pH and enzyme concentration","Temperature and time","The colour of the beaker and the result","Nothing","Controlled variables keep the test fair."],
["The variable you change on purpose is the…","Independent variable","Dependent variable","Controlled variable","Random variable","The dependent variable is the one you measure."],
["Why do we repeat an experiment and take an average?","To make results more reliable and spot anomalies","To change the variable","To finish faster","To use more apparatus","Repeats reduce the effect of random errors."],
["In 'How does length affect a pendulum's period?', what is the dependent variable?","The period","The length","The mass of the bob","The angle of release","You measure the period after changing the length."]
]);
T("prac","apparatus","Measuring and apparatus",3,[
["Which measures 25.0 cm³ of liquid more precisely?","A pipette","A measuring cylinder","A beaker","A conical flask","A pipette delivers a fixed volume very precisely."],
["How should you read a measuring cylinder?","At the bottom of the meniscus, with your eye level with it","At the top of the meniscus","From above","At any angle","Reading at an angle causes parallax error."],
["How are burette readings usually recorded?","To 2 decimal places, ending in 0 or 5 (e.g. 23.45 cm³)","As whole numbers","To 1 decimal place","To 3 decimal places","A burette can be read to the nearest 0.05 cm³."],
["Why is hand timing less accurate than the stopwatch display (0.01 s)?","Human reaction time","Gravity","The battery","Room temperature","Reaction time is about 0.2 s, much bigger than 0.01 s."],
["When does parallax error happen?","When you read a scale at an angle","When the instrument is broken","When there is a zero error","When the temperature changes","Always read with your eye directly in line with the mark."]
]);
T("prac","data","Recording data and graphs",3,[
["What should a results table heading include?","The quantity and its unit, e.g. time / s","Only the unit","A unit in every cell","No units","Units go in the heading, not in the table cells."],
["A best-fit line should…","Follow the trend, with points spread evenly on either side","Join every point dot-to-dot","Always pass through the origin","Pass through the anomaly","Ignore anomalous points when drawing it."],
["A distance–time graph rises 20 m in 4 s. What is the gradient?","5 m/s","80 m/s","0.2 m/s","24 m/s","Gradient = change in y ÷ change in x = 20 ÷ 4 = 5 m/s (the speed)."],
["How big should a plotted graph be?","At least half the grid in each direction","In one small corner","As small as possible","It does not matter","Choose sensible, even scales so the points spread out."]
]);
T("prac","errors","Errors and improvements",3,[
["What is an anomalous result?","One that does not fit the pattern","The average","The first reading","Always the largest reading","Repeat it or leave it out of the average."],
["A balance shows 0.02 g with nothing on it. What kind of error is this?","Zero error","Random error","Parallax error","Reaction time error","Subtract 0.02 g from every reading, or reset the balance to zero."],
["In a heating experiment, how could you reduce heat loss?","Insulate the beaker and use a lid","Use a bigger flame","Stir less","Use a metal beaker","Less heat lost to the surroundings gives more accurate results."],
["How can random errors be reduced?","By repeating readings and taking an average","By adding a zero error","By rounding the numbers","By changing the independent variable","Random errors scatter readings above and below the true value."]
]);
T("prac","safety","Lab safety",3,[
["Why do you wear safety goggles in the lab?","To protect your eyes from splashes","To see better","To keep warm","Because you are writing","Chemicals and hot liquids can splash."],
["How do you smell a gas safely?","Waft it gently towards your nose with your hand","Sniff it directly","Taste it","Hold it right under your nose","Some gases are toxic or irritating."],
["When heating a liquid in a test tube, you should…","Point the mouth of the tube away from people","Point it towards yourself","Seal it with a cork","Fill it to the top","The liquid can spit out suddenly."],
["What does the corrosive hazard symbol mean?","The substance can destroy skin and materials","It catches fire easily","It is radioactive","It is harmless","Concentrated acids and alkalis are corrosive."]
]);
T("prac","chemprac","Chemistry practicals",3,[
["In a titration, which apparatus transfers exactly 25.0 cm³ into the flask?","Pipette","Burette","Beaker","Measuring cylinder","The burette adds the other solution bit by bit."],
["Why do you rinse the burette with the acid it will hold?","So leftover water doesn't dilute the acid","To clean it","To warm it up","To add indicator","Rinsing with distilled water only would dilute the solution."],
["Acid is added to an alkali with methyl orange. What colour change shows the end point?","Yellow to orange","Pink to colourless","Blue to green","Red to yellow","Methyl orange is yellow in alkali, red in acid and orange at the end point."],
["What are concordant titres?","Results within 0.10 cm³ of each other","The first reading","Any three readings","The rough titre","Average only the concordant titres."],
["How do you get crystals from a salt solution?","Heat until saturated, cool to crystallise, then filter and dry","Always boil it to dryness","Freeze it","Add more water","Boiling to dryness can decompose some salts or lose water of crystallisation."]
]);
T("prac","bioprac","Biology practicals",3,[
["What is a positive result for the ethanol emulsion test?","A cloudy white emulsion","Blue-black","Violet","Brick-red precipitate","This shows fats are present."],
["A drawing of a cell is 60 mm long. The real cell is 0.1 mm long. What is the magnification?","×600","×6","×60","×6000","Magnification = drawing size ÷ actual size = 60 ÷ 0.1 = 600."],
["Why do you boil a leaf in ethanol before testing it for starch?","To remove the chlorophyll so the colour change is easy to see","To add starch","To kill bacteria","To make it greener","Do it in a hot water bath, never over a flame: ethanol is flammable."],
["In an osmosis experiment, why blot potato strips dry before weighing?","Surface water would add mass and cause errors","To kill the cells","To add sugar","To speed up osmosis","Only water inside the cells should count."],
["Why use a water bath in an enzyme experiment?","To keep the temperature constant","To add water to the mixture","To denature the enzyme","To measure the pH","Temperature is a controlled variable."]
]);
T("prac","phyprac","Physics practicals",3,[
["Why time 20 oscillations of a pendulum instead of just 1?","It reduces the percentage error from reaction time","It is faster","It changes the period","One oscillation can't be seen","Divide the total time by 20 to get the period."],
["How do you measure the volume of an irregular stone to find its density?","By the rise in water level in a measuring cylinder (displacement)","With a ruler","By weighing it twice","By heating it","Volume of stone = new reading − old reading."],
["In the metre-rule balancing experiment, why pivot the rule at its centre of gravity first?","So the rule's own weight causes no moment","To make it heavier","To increase friction","To measure its length","Then only the hanging masses cause moments."],
["How must an ammeter be connected?","In series with the component","In parallel with the component","Directly across the battery","With no circuit","A voltmeter is connected in parallel."],
["When tracing light through a glass block, why place the pins far apart?","To find the direction of the ray more accurately","To make the block heavier","To reflect more light","It only looks neater","Pins close together make small errors in the angle much bigger."]
]);
