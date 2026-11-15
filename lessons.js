// Lessons: one per topic. Each card: {t: title, p: paragraph, b: bullet list, f: formula}
// ex = worked example {q, s: steps, a: answer}; tip = common mistake to avoid.
const LESSONS = {};
function L(id, intro, cards, ex, tip){ LESSONS[id] = {intro, cards, ex, tip}; }

/* ===================== PHYSICS ===================== */
L("phy-measure","Physics starts with measuring things carefully, using units everyone agrees on.",[
 {t:"Base quantities and SI units",p:"Every measurement is a number and a unit. Scientists use SI units. Other units are built from these, e.g. speed in m/s and force in newtons (N).",b:["Length: metre (m)","Mass: kilogram (kg)","Time: second (s)","Current: ampere (A)","Temperature: kelvin (K)","Amount of substance: mole (mol)"]},
 {t:"Prefixes",p:"Prefixes make very big or very small numbers easy to write. 3 km = 3000 m and 5 mm = 0.005 m.",b:["mega (M) = 10⁶","kilo (k) = 10³","centi (c) = 10⁻²","milli (m) = 10⁻³","micro (µ) = 10⁻⁶","nano (n) = 10⁻⁹"]},
 {t:"Scalars and vectors",p:"A scalar has size only: mass, distance, speed, time, energy. A vector has size and direction: displacement, velocity, acceleration, force. Add vectors with a scale drawing, or with Pythagoras when they are at right angles."},
 {t:"Choosing instruments",p:"Pick the instrument whose precision matches what you measure.",b:["Metre rule: to 1 mm (0.1 cm)","Vernier calipers: to 0.1 mm","Micrometer screw gauge: to 0.01 mm","Stopwatch: time many oscillations to cut reaction-time error"]}
],{q:"A pendulum swings 20 times in 31.2 s. Find its period.",s:["The period is the time for one oscillation.","Divide total time by the number of oscillations: 31.2 ÷ 20.","Period = 1.56 s."],a:"1.56 s"},
"Convert to SI units before calculating, e.g. 250 g = 0.25 kg.");

L("phy-kinematics","Kinematics describes motion: how far, how fast, and how quickly speed changes.",[
 {t:"Speed and velocity",p:"Speed is how far you go each second. Velocity is speed in a stated direction.",f:"speed = distance ÷ time   (m/s)"},
 {t:"Acceleration",p:"Acceleration is the rate of change of velocity. A negative acceleration (deceleration) means slowing down.",f:"a = (v − u) ÷ t   (m/s²)"},
 {t:"Reading motion graphs",b:["Distance–time: gradient = speed; a flat line = at rest","Speed–time: gradient = acceleration","Speed–time: area under the line = distance travelled","Straight sloping line = constant acceleration; curve = changing acceleration"]},
 {t:"Free fall",p:"Without air resistance, falling objects near Earth accelerate at g ≈ 10 m/s². With air resistance, they speed up less and less until the forces balance at terminal velocity."}
],{q:"A cyclist speeds up from 2 m/s to 8 m/s in 3 s, then keeps that speed for 5 s. Find the acceleration and total distance.",s:["Acceleration = (8 − 2) ÷ 3 = 2 m/s².","Distance while speeding up = area of trapezium = ½ × (2 + 8) × 3 = 15 m.","Distance at steady speed = 8 × 5 = 40 m.","Total distance = 15 + 40 = 55 m."],a:"2 m/s² and 55 m"},
"Gradient and area mean different things on different graphs. Check the axes first.");

L("phy-dynamics","Dynamics explains why things move the way they do: forces.",[
 {t:"Forces and resultant force",p:"A force is a push or a pull, measured in newtons (N). Several forces combine into one resultant force.",b:["Same direction: add them","Opposite directions: subtract them","Balanced forces (resultant = 0): motion does not change"]},
 {t:"Newton's first law",p:"An object stays at rest, or keeps moving at constant velocity, unless a resultant force acts on it. This resistance to change is inertia: more mass, more inertia."},
 {t:"Newton's second law",p:"A resultant force makes a mass accelerate in the direction of the force. Double the force, double the acceleration.",f:"F = m × a"},
 {t:"Newton's third law and friction",p:"Forces come in pairs: if A pushes B, B pushes A back equally and oppositely. Friction opposes motion and turns kinetic energy into heat. Air resistance grows as speed increases."}
],{q:"A 1200 kg car has a driving force of 3000 N and friction of 600 N. Find its acceleration.",s:["Resultant force = 3000 − 600 = 2400 N.","a = F ÷ m = 2400 ÷ 1200.","a = 2 m/s²."],a:"2 m/s²"},
"Use the resultant force in F = ma, not just one of the forces.");

L("phy-density","Mass, weight and density sound alike, but they mean different things.",[
 {t:"Mass vs weight",p:"Mass is the amount of matter in an object, in kg, and is the same everywhere. Weight is the gravitational force on it, in N, and depends on the gravitational field strength g.",f:"W = m × g"},
 {t:"Gravitational field strength",p:"On Earth, g ≈ 10 N/kg. On the Moon, g ≈ 1.6 N/kg, so you would weigh less there, but your mass would not change."},
 {t:"Density",p:"Density tells you how much mass is packed into each unit of volume. Water's density is 1 g/cm³ (1000 kg/m³). Objects less dense than a liquid float in it.",f:"ρ = m ÷ V"},
 {t:"Measuring volume",p:"Regular shapes: measure the sides and calculate. Irregular objects: use displacement. Lower the object into a measuring cylinder of water; the rise in water level is its volume."}
],{q:"A stone of mass 54 g raises the water in a measuring cylinder from 30.0 cm³ to 50.0 cm³. Find its density.",s:["Volume = 50.0 − 30.0 = 20.0 cm³.","Density = mass ÷ volume = 54 ÷ 20.0.","Density = 2.7 g/cm³, so it sinks in water."],a:"2.7 g/cm³"},
"Weight is a force, measured in newtons, not kilograms.");

L("phy-moments","Forces can make things turn. That turning effect is called a moment.",[
 {t:"Moment of a force",p:"A bigger force, or a longer distance from the pivot, gives a bigger turning effect. That is why spanners have long handles.",f:"moment = force × perpendicular distance from pivot   (N m)"},
 {t:"Principle of moments",p:"When an object is balanced (in equilibrium), the total clockwise moment about any pivot equals the total anticlockwise moment, and the resultant force is zero."},
 {t:"Centre of gravity",p:"The point where the whole weight of an object seems to act. For a uniform ruler it is in the middle. For a flat shape, hang it from different points with a plumb line; the lines cross at the centre of gravity."},
 {t:"Stability",p:"An object topples when its centre of gravity moves outside its base. A low centre of gravity and a wide base make things more stable, like racing cars and buses."}
],{q:"A uniform plank is balanced at its centre. A 30 N weight sits 0.2 m left of the pivot. How far right should a 20 N weight go to balance it?",s:["Anticlockwise moment = 30 × 0.2 = 6 N m.","Clockwise moment = 20 × d.","For balance, 20 × d = 6, so d = 0.3 m."],a:"0.3 m right of the pivot"},
"Use the perpendicular distance from the pivot to the line of the force.");

L("phy-pressure","Pressure is about how concentrated a force is.",[
 {t:"Pressure on solids",p:"The same force on a small area gives a high pressure (knives, nails). On a large area it gives a low pressure (snowshoes, wide tractor tyres).",f:"p = F ÷ A   (Pa = N/m²)"},
 {t:"Pressure in liquids",p:"Pressure in a liquid increases with depth and with density, and acts equally in all directions. That is why dams are thicker at the bottom.",f:"p = h × ρ × g"},
 {t:"Atmospheric pressure",p:"The air above us presses down at about 100 000 Pa at sea level. A mercury barometer measures it (about 760 mm of mercury). A manometer measures gas pressure from the height difference of liquid in a U-tube."},
 {t:"Hydraulics",p:"Pressure applied to a trapped liquid is passed on equally everywhere. A small force on a small piston creates a large force on a large piston. This is how car brakes and hydraulic jacks work."}
],{q:"A diver is 5 m deep in sea water (ρ = 1030 kg/m³, g = 10 N/kg). Find the pressure from the water.",s:["Use p = hρg.","p = 5 × 1030 × 10.","p = 51 500 Pa."],a:"51 500 Pa"},
"Convert cm² to m² before using p = F ÷ A: 1 m² = 10 000 cm².");

L("phy-energy","Energy is never created or destroyed. It only moves from one store to another.",[
 {t:"Energy stores",p:"Conservation of energy: the total energy before a change equals the total energy after.",b:["Kinetic: Ek = ½mv²","Gravitational potential: Ep = mgh","Also chemical, elastic, thermal and nuclear stores"]},
 {t:"Work done",p:"Work is done when a force moves something in the direction of the force. Work done equals the energy transferred.",f:"W = F × d   (J)"},
 {t:"Power and efficiency",p:"Power is how fast energy is transferred. Efficiency = useful energy output ÷ total energy input × 100%. Wasted energy is usually heat.",f:"P = W ÷ t   (W)"},
 {t:"Energy resources",b:["Renewable: solar, wind, hydroelectric, tidal, geothermal, biomass","Non-renewable: coal, oil, natural gas, nuclear fuel","Most power stations heat water to make steam that turns turbines and generators"]}
],{q:"A 0.5 kg ball is dropped from 5 m. Ignoring air resistance, how fast is it moving just before it lands? (g = 10 N/kg)",s:["GPE lost = mgh = 0.5 × 10 × 5 = 25 J.","All of it becomes kinetic energy: ½ × 0.5 × v² = 25.","v² = 100, so v = 10 m/s."],a:"10 m/s"},
"In Ek = ½mv², only v is squared.");

L("phy-waves","Waves carry energy from place to place without carrying matter with them.",[
 {t:"Two kinds of wave",b:["Transverse: vibrations are at right angles to the direction of travel (light, water waves)","Longitudinal: vibrations are along the direction of travel, making compressions and rarefactions (sound)"]},
 {t:"Describing a wave",b:["Amplitude: the maximum displacement from the rest position","Wavelength (λ): the distance between neighbouring crests","Frequency (f): waves per second, in hertz (Hz)","Period (T): time for one wave; T = 1 ÷ f"]},
 {t:"The wave equation",p:"When a wave enters a new medium, its speed and wavelength change, but its frequency stays the same.",f:"v = f × λ"},
 {t:"Ripple tanks",p:"Water waves slow down in shallow water, so the wavefronts bunch up and can change direction (refraction). Waves also reflect off barriers at the same angle they hit them."}
],{q:"A radio wave has frequency 100 MHz and travels at 3.0 × 10⁸ m/s. Find its wavelength.",s:["Rearrange v = fλ to λ = v ÷ f.","λ = 3.0 × 10⁸ ÷ (100 × 10⁶).","λ = 3.0 m."],a:"3.0 m"},
"Convert kHz and MHz into Hz before using the wave equation.");

L("phy-light","Light travels in straight lines, reflects off surfaces and bends when it changes medium.",[
 {t:"Reflection",p:"Angle of incidence = angle of reflection, both measured from the normal. A plane-mirror image is virtual, upright, the same size, as far behind the mirror as the object is in front, and laterally inverted."},
 {t:"Refraction",p:"Light slows down when it enters a denser medium and bends towards the normal. It speeds up and bends away from the normal when it leaves.",f:"n = sin i ÷ sin r = c ÷ v"},
 {t:"Total internal reflection",p:"Going from a denser to a less dense medium at an angle bigger than the critical angle, all the light reflects back. Optical fibres use this to carry light around bends.",f:"sin c = 1 ÷ n"},
 {t:"Converging lenses",b:["Rays parallel to the principal axis meet at the focal point F","Object far away: real, inverted, smaller image (camera)","Object between F and the lens: virtual, upright, magnified image (magnifying glass)"]}
],{q:"Light enters a glass block at 40° and refracts to 25°. Find the refractive index.",s:["Use n = sin i ÷ sin r.","n = sin 40° ÷ sin 25° = 0.643 ÷ 0.423.","n ≈ 1.52."],a:"1.52"},
"Measure angles from the normal, not from the surface.");

L("phy-emspec","Visible light is one member of a family of waves: the electromagnetic spectrum.",[
 {t:"The order",p:"From longest wavelength (lowest frequency) to shortest: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays."},
 {t:"What they share",b:["All are transverse waves","All travel at 3.0 × 10⁸ m/s in a vacuum","All carry energy and obey v = fλ","All can be reflected and refracted"]},
 {t:"Uses",b:["Radio: TV and radio broadcasting","Microwaves: mobile phones, satellites, cooking","Infrared: remote controls, thermal imaging","Visible: seeing, optical fibres","Ultraviolet: sterilising water, checking banknotes","X-rays: seeing broken bones","Gamma rays: killing cancer cells, sterilising equipment"]},
 {t:"Dangers",p:"Higher-frequency waves carry more energy. Ultraviolet can cause sunburn and skin cancer. X-rays and gamma rays can damage cells and DNA. Strong microwaves can heat body tissue."}
],{q:"Which has a higher frequency, X-rays or microwaves, and why does that matter for safety?",s:["X-rays are further along the spectrum, towards gamma rays.","Higher frequency means more energy carried.","So X-rays are more harmful, and exposure must be kept low."],a:"X-rays, because they carry more energy"},
"All EM waves travel at the same speed in a vacuum. They differ in frequency and wavelength.");

L("phy-sound","Sound is a longitudinal wave made by vibrating objects.",[
 {t:"How sound travels",p:"A vibrating object pushes air particles together (compressions) and pulls them apart (rarefactions). Sound needs a medium, so it cannot cross a vacuum. It is fastest in solids and slowest in gases (about 340 m/s in air)."},
 {t:"Pitch and loudness",b:["Higher frequency → higher pitch","Bigger amplitude → louder sound","Human hearing range: about 20 Hz to 20 kHz"]},
 {t:"Echoes",p:"An echo is reflected sound. The sound travels there and back, so halve the total distance.",f:"distance to wall = speed × time ÷ 2"},
 {t:"Ultrasound",p:"Sound above 20 kHz, too high for us to hear. Used for scans of unborn babies, cleaning delicate objects, and sonar to measure the depth of the sea."}
],{q:"A ship's sonar pulse returns after 0.6 s. Sound travels at 1500 m/s in water. How deep is the sea?",s:["Total distance travelled = 1500 × 0.6 = 900 m.","That is there and back, so halve it.","Depth = 450 m."],a:"450 m"},
"Remember to halve the distance for echoes.");

L("phy-kinetic","Everything is made of tiny particles that are always moving.",[
 {t:"Three states",b:["Solid: particles close-packed in a regular pattern, vibrating in place","Liquid: particles close together but disordered, sliding past each other","Gas: particles far apart, moving fast and randomly"]},
 {t:"Evidence: Brownian motion",p:"Smoke particles seen under a microscope jiggle around randomly. Invisible, fast-moving air molecules are hitting them unevenly from all sides."},
 {t:"Temperature and pressure",p:"Higher temperature means faster particles. Gas pressure comes from particles hitting the container walls. Heat a sealed gas and the collisions become harder and more frequent, so pressure rises."},
 {t:"Boyle's law",p:"Squeeze a gas into a smaller volume at constant temperature, and the particles hit the walls more often, so the pressure goes up.",f:"p₁V₁ = p₂V₂"}
],{q:"A gas at 100 kPa fills 3.0 L. It is squeezed to 1.0 L at constant temperature. What is the new pressure?",s:["Use p₁V₁ = p₂V₂.","100 × 3.0 = p₂ × 1.0.","p₂ = 300 kPa."],a:"300 kPa"},
"Boyle's law only works when the temperature stays constant.");

L("phy-thermproc","Thermal energy always flows from hotter places to colder ones, by conduction, convection or radiation.",[
 {t:"Conduction",p:"Energy passes through a material as particles vibrate and pass it on. Metals conduct best because their free electrons carry energy quickly. Air and plastics are insulators."},
 {t:"Convection",p:"In liquids and gases, warm fluid expands, becomes less dense and rises; cooler, denser fluid sinks. This makes a convection current. Heaters go low and air-conditioners go high."},
 {t:"Radiation",p:"Infrared radiation needs no medium, so it can cross a vacuum. Dull black surfaces are good emitters and absorbers. Shiny silver surfaces are poor emitters and good reflectors."},
 {t:"Putting it together",p:"A vacuum flask reduces all three. The vacuum stops conduction and convection, the silvered walls reduce radiation, and the stopper stops convection and evaporation."}
],{q:"Why are the cooling fins on a motorcycle engine often painted black?",s:["The fins give a large surface area for losing heat.","Dull black surfaces are good emitters of infrared radiation.","So the engine loses heat faster."],a:"Black surfaces emit radiation well"},
"Convection cannot happen in solids, because their particles cannot flow.");

L("phy-thermprop","Heating can raise an object's temperature or change its state, but not both at the same time.",[
 {t:"Internal energy",p:"Internal energy is the total kinetic and potential energy of the particles. Temperature measures the average kinetic energy of the particles."},
 {t:"Specific heat capacity",p:"The energy needed to raise the temperature of 1 kg of a substance by 1 °C. Water's is high (4200 J/(kg °C)), so it heats up and cools down slowly.",f:"Q = m × c × Δθ"},
 {t:"Latent heat",p:"When a substance melts or boils, the energy breaks the attractions between particles, so the temperature stays constant. Specific latent heat is the energy to change the state of 1 kg.",f:"Q = m × l"},
 {t:"Evaporation vs boiling",b:["Evaporation: at any temperature, only at the surface","Boiling: at a fixed temperature, throughout the liquid","Evaporation cools, because the fastest particles escape","It is faster when warm, windy, dry or with a large surface area"]}
],{q:"How much energy is needed to melt 0.2 kg of ice at 0 °C? (specific latent heat of fusion = 340 000 J/kg)",s:["Use Q = m × l.","Q = 0.2 × 340 000.","Q = 68 000 J."],a:"68 000 J"},
"During a change of state, a temperature–time graph goes flat.");

L("phy-static","Rubbing some materials together moves electrons and leaves them charged.",[
 {t:"Charging by friction",p:"Only electrons move. The object that gains electrons becomes negatively charged. The object that loses electrons becomes positively charged."},
 {t:"Forces between charges",b:["Like charges repel","Unlike charges attract","A charged object can attract a neutral one by induction"]},
 {t:"Electric fields",p:"A charge has an electric field around it. Field lines point from positive to negative, showing which way a positive charge would be pushed."},
 {t:"Uses and dangers",p:"Uses: photocopiers, electrostatic paint spraying, dust precipitators in chimneys. Dangers: sparks when refuelling, and lightning. Earthing and lightning conductors let charge flow away safely."}
],{q:"A balloon rubbed on your hair sticks to a neutral wall. Explain why.",s:["The balloon gains electrons and becomes negative.","It repels electrons in the wall's surface, leaving that surface slightly positive.","Unlike charges attract, so the balloon sticks."],a:"Induced charge on the wall"},
"In static electricity, only electrons move. Protons stay put.");

L("phy-current","An electric current is a flow of charge, pushed round a circuit by a voltage.",[
 {t:"Current",p:"Current is the rate of flow of charge, measured in amperes (A). Conventional current flows from + to −; electrons actually flow the other way.",f:"I = Q ÷ t"},
 {t:"Voltage",p:"Electromotive force (e.m.f.) is the energy the source gives each coulomb of charge. Potential difference (p.d.) is the energy each coulomb transfers in a component. Both are in volts (1 V = 1 J/C)."},
 {t:"Resistance",p:"Resistance opposes current. A longer wire has more resistance; a thicker wire has less; the material matters too.",f:"R = V ÷ I"},
 {t:"I–V graphs",b:["Ohmic conductor at constant temperature: straight line through the origin","Filament lamp: curve, because resistance rises as it gets hot","Diode: current flows in one direction only"]}
],{q:"A 12 V battery drives 0.5 A through a lamp for 60 s. Find the charge that flows and the lamp's resistance.",s:["Q = I × t = 0.5 × 60 = 30 C.","R = V ÷ I = 12 ÷ 0.5.","R = 24 Ω."],a:"30 C and 24 Ω"},
"Ammeters go in series; voltmeters go in parallel.");

L("phy-dc","Components can be joined in series (one path) or in parallel (several branches).",[
 {t:"Series circuits",b:["The same current flows everywhere","The voltages across components add up to the e.m.f.","Total resistance: R = R₁ + R₂ + …"]},
 {t:"Parallel circuits",b:["Each branch has the same voltage","Branch currents add up to the total current","1/R = 1/R₁ + 1/R₂, so the total is less than the smallest resistor"]},
 {t:"Potential dividers",p:"Two resistors in series share the supply voltage in proportion to their resistances. Swap one for an LDR or a thermistor and you have a sensor circuit."},
 {t:"Sensors",b:["LDR: resistance falls as light gets brighter","Thermistor: resistance falls as temperature rises"]}
],{q:"A 6 V supply is connected to a 2 Ω and a 4 Ω resistor in series. Find the current and the voltage across the 4 Ω resistor.",s:["Total resistance = 2 + 4 = 6 Ω.","Current = 6 ÷ 6 = 1 A.","Voltage across 4 Ω = 1 × 4 = 4 V."],a:"1 A and 4 V"},
"Adding resistors in parallel makes the total resistance smaller.");

L("phy-practelec","How to use electricity safely, and how to work out what it costs.",[
 {t:"Power and energy",p:"Electricity bills use kilowatt-hours: 1 kWh is 1 kW used for 1 hour, which is 3.6 million J.",f:"P = V × I     E = P × t"},
 {t:"Cost",p:"Find the energy in kWh, then multiply by the price per unit.",f:"cost = energy (kWh) × price per kWh"},
 {t:"Mains wiring",b:["Live (brown): carries the high voltage","Neutral (blue): completes the circuit","Earth (green and yellow): safety wire to the ground"]},
 {t:"Safety features",p:"A fuse or circuit breaker in the live wire cuts the circuit if the current gets too big. Earthing stops a metal case becoming dangerous. Double-insulated appliances have plastic cases and no earth wire. Watch out for damaged insulation, overloaded sockets and damp conditions."}
],{q:"A 1500 W hair dryer is used for 20 minutes a day for 30 days. Electricity costs 30 cents per kWh. Find the cost.",s:["Time = 20 min × 30 = 600 min = 10 h.","Energy = 1.5 kW × 10 h = 15 kWh.","Cost = 15 × 30 cents = 450 cents = $4.50."],a:"$4.50"},
"Convert W to kW and minutes to hours before working in kWh.");

L("phy-magnet","Magnets have poles and fields, and some materials can be made into magnets.",[
 {t:"Magnetic materials",p:"Iron, steel, nickel and cobalt are magnetic. Soft iron magnetises and demagnetises easily, so it is used in electromagnets. Steel keeps its magnetism, so it is used for permanent magnets."},
 {t:"Poles",b:["Like poles repel; unlike poles attract","Repulsion is the only sure test that something is a magnet"]},
 {t:"Magnetic fields",p:"Outside a magnet, field lines go from the north pole to the south pole. They are closest together where the field is strongest. You can plot them with a small compass or iron filings."},
 {t:"Making and destroying magnets",p:"To magnetise: stroke with a magnet, or put the material inside a coil carrying direct current. To demagnetise: heat it, hammer it, or slowly pull it out of a coil carrying alternating current."}
],{q:"You have two identical-looking metal bars. One is a magnet; the other is plain iron. How can you tell them apart?",s:["Attraction doesn't help: a magnet attracts iron, and iron is attracted to a magnet.","Bring each end of one bar near a known magnet's pole.","If an end is repelled, that bar is the magnet."],a:"Test for repulsion"},
"Field lines never cross each other.");

L("phy-electromag","An electric current makes a magnetic field. That is the secret behind motors.",[
 {t:"Field around a wire",p:"A current in a straight wire makes circular field lines around it. Right-hand grip rule: point your thumb along the current, and your fingers curl the way the field goes."},
 {t:"Solenoids and electromagnets",p:"A coil of wire carrying current acts like a bar magnet. It gets stronger with more current, more turns, or a soft iron core. Used in relays, electric bells and scrap-yard cranes."},
 {t:"The motor effect",p:"A current-carrying wire in a magnetic field feels a force. Fleming's left-hand rule: First finger = Field, seCond finger = Current, thuMb = Motion (force)."},
 {t:"The d.c. motor",p:"Forces on opposite sides of a coil push in opposite directions, so it turns. A split-ring commutator reverses the current every half turn to keep it spinning the same way. It spins faster with more current, more turns or a stronger magnet."}
],{q:"How could you make a d.c. motor spin the other way?",s:["The force direction depends on the current direction and the field direction.","Reverse one of them, but not both.","Swap the battery connections, or swap the magnet's poles."],a:"Reverse the current or the field"},
"Use your left hand for motors and your right hand for generators.");

L("phy-induction","Moving a magnet near a coil can make electricity. That is how power stations work.",[
 {t:"Faraday's law",p:"An e.m.f. is induced when the magnetic field through a conductor changes. It is bigger if the change is faster, the magnet is stronger, or the coil has more turns."},
 {t:"Lenz's law",p:"The induced current always flows so as to oppose the change causing it. Push a north pole into a coil, and that end of the coil becomes a north pole to push back."},
 {t:"The a.c. generator",p:"A coil spins in a magnetic field, making an alternating e.m.f. Slip rings keep contact with the spinning coil. Faster spinning gives a bigger output with a higher frequency."},
 {t:"Transformers",p:"Alternating current in the primary coil makes a changing field in the iron core, which induces a voltage in the secondary coil. Step-up transformers are used for transmission (smaller current, less heat lost in cables); step-down transformers are used for homes.",f:"Vs ÷ Vp = Ns ÷ Np"}
],{q:"A transformer steps 230 V down to 11.5 V. The primary coil has 2000 turns. How many turns are on the secondary?",s:["Rearrange: Ns = Np × Vs ÷ Vp.","Ns = 2000 × 11.5 ÷ 230.","Ns = 100 turns."],a:"100 turns"},
"Transformers do not work on d.c., because a steady current gives no changing field.");

L("phy-radio","Some atomic nuclei are unstable. They give out radiation to become more stable.",[
 {t:"The nucleus",p:"Nuclide notation shows the nucleon number A (protons + neutrons) and the proton number Z. Isotopes of an element have the same Z but different A."},
 {t:"Three kinds of radiation",b:["Alpha (α): a helium nucleus; most ionising; stopped by paper","Beta (β): a fast electron; stopped by a few mm of aluminium","Gamma (γ): an EM wave; least ionising; reduced by thick lead"]},
 {t:"Half-life",p:"The time for half of the radioactive nuclei in a sample to decay. Each decay is random, but the half-life of an isotope is fixed."},
 {t:"Uses and safety",p:"Uses: smoke alarms (alpha), paper-thickness gauges (beta), cancer treatment and sterilising (gamma), carbon dating. Background radiation is always around us. Keep exposure low: use tongs, keep your distance, and store sources in lead-lined boxes."}
],{q:"A sample's count rate is 800 counts/min and its half-life is 3 hours. What is the count rate after 9 hours?",s:["9 h ÷ 3 h = 3 half-lives.","800 → 400 → 200 → 100.","Count rate = 100 counts/min."],a:"100 counts/min"},
"Subtract the background count before working out a half-life from data.");

/* ===================== CHEMISTRY ===================== */
L("chem-experimental","Chemists separate and identify substances using careful techniques.",[
 {t:"Measuring",b:["Volume: burette, pipette, measuring cylinder, gas syringe","Mass: electronic balance","Time: stopwatch","Temperature: thermometer"]},
 {t:"Separating mixtures",b:["Filtration: an insoluble solid from a liquid","Evaporation or crystallisation: a dissolved solid from a solution","Simple distillation: the solvent from a solution","Fractional distillation: liquids with different boiling points","Separating funnel: liquids that don't mix","Chromatography: dyes and other coloured substances"]},
 {t:"Purity",p:"A pure substance melts and boils at sharp, fixed temperatures. Impurities lower the melting point, raise the boiling point, and make it melt over a range of temperatures."},
 {t:"Chromatography",p:"Draw the start line in pencil above the solvent level. A pure substance gives one spot. Colourless spots can be shown with a locating agent.",f:"Rf = distance moved by spot ÷ distance moved by solvent"}
],{q:"How would you get pure, dry sand and pure salt from a mixture of the two?",s:["Add water and stir: the salt dissolves, the sand doesn't.","Filter: the sand stays on the filter paper. Rinse and dry it.","Heat the filtrate to crystallise the salt."],a:"Dissolve, filter, then crystallise"},
"Use pencil for the chromatography start line. Ink would dissolve and run.");

L("chem-kpt","The kinetic particle theory explains the states of matter and how they change.",[
 {t:"Three states",b:["Solid: fixed shape and volume; particles vibrate in fixed positions","Liquid: fixed volume, takes the container's shape; particles slide past each other","Gas: no fixed shape or volume; particles move quickly and randomly"]},
 {t:"Changes of state",p:"Melting, boiling and evaporation take in energy. Freezing and condensation give it out. Sublimation goes straight from solid to gas."},
 {t:"Diffusion",p:"The overall movement of particles from a high concentration to a low concentration. Lighter particles (lower Mr) diffuse faster, and higher temperatures speed it up."},
 {t:"Heating curves",p:"On a heating curve, the flat parts show changes of state. The energy goes into overcoming the attractions between particles, so the temperature doesn't rise."}
],{q:"Ammonia (Mr 17) and hydrogen chloride (Mr 36.5) are released at opposite ends of a glass tube. Where does the white ring of ammonium chloride form?",s:["Lighter particles diffuse faster.","Ammonia travels further in the same time.","The ring forms nearer the hydrogen chloride end."],a:"Nearer the hydrogen chloride end"},
"Particles don't get bigger when heated. The spaces between them do.");

L("chem-atomic","Atoms are made of protons, neutrons and electrons.",[
 {t:"Subatomic particles",b:["Proton: charge +1, mass 1, in the nucleus","Neutron: charge 0, mass 1, in the nucleus","Electron: charge −1, mass about 1/1840, in shells"]},
 {t:"Proton and nucleon numbers",p:"Proton number (Z) = number of protons = number of electrons in a neutral atom. Nucleon number (A) = protons + neutrons. So neutrons = A − Z."},
 {t:"Electronic configuration",p:"Electrons fill shells from the inside out: 2 in the first shell, then 8, then 8 (for the first 20 elements). Sodium (11) is 2.8.1. The outer-shell electrons decide how an element reacts."},
 {t:"Isotopes",p:"Atoms of the same element with different numbers of neutrons, like carbon-12 and carbon-14. They have the same chemical properties but slightly different physical properties."}
],{q:"How many protons, neutrons and electrons are in a magnesium ion, Mg²⁺ (nucleon number 24, proton number 12)?",s:["Protons = proton number = 12.","Neutrons = 24 − 12 = 12.","Mg²⁺ has lost 2 electrons, so electrons = 12 − 2 = 10."],a:"12 protons, 12 neutrons, 10 electrons"},
"Ions change the number of electrons, never the number of protons.");

L("chem-bonding","Atoms bond to get a full outer shell. How they bond decides a substance's properties.",[
 {t:"Ionic bonding",p:"Between a metal and a non-metal. The metal loses electrons to form positive ions; the non-metal gains them to form negative ions. The ions attract strongly in a giant lattice.",b:["High melting and boiling points","Conduct electricity when molten or dissolved, not when solid","Often soluble in water"]},
 {t:"Covalent bonding",p:"Between non-metals. Atoms share pairs of electrons. Simple molecules like H₂O and CO₂ have weak forces between molecules, so they have low melting points and don't conduct."},
 {t:"Giant structures",b:["Diamond: each carbon bonded to 4 others, very hard","Graphite: layers that slide; delocalised electrons let it conduct","Metals: positive ions in a sea of delocalised electrons, so they conduct and can be hammered into shape"]},
 {t:"Shapes of molecules (VSEPR)",p:"Electron pairs around the central atom repel each other and spread out as far as possible. CO₂ is linear, BF₃ trigonal planar, CH₄ tetrahedral, NH₃ pyramidal and H₂O bent."}
],{q:"Explain why magnesium oxide has a much higher melting point than sodium chloride.",s:["Both are giant ionic lattices.","Mg²⁺ and O²⁻ have twice the charges of Na⁺ and Cl⁻.","The attraction is stronger, so more energy is needed to break the lattice."],a:"Its ions have higher charges"},
"When a simple molecular substance melts, the covalent bonds don't break. Only the weak forces between molecules do.");

L("chem-formulae","Formulae and equations are the language of chemistry.",[
 {t:"Ion charges",b:["Group 1: +1; Group 2: +2; aluminium: +3","Group 17: −1 (Cl⁻); Group 16: −2 (O²⁻)","Polyatomic ions: OH⁻, NO₃⁻, SO₄²⁻, CO₃²⁻, NH₄⁺"]},
 {t:"Writing formulae",p:"The charges must add up to zero. Al³⁺ and O²⁻ give Al₂O₃. Use brackets when there is more than one polyatomic ion: Ca(OH)₂."},
 {t:"Balancing equations",p:"Atoms aren't created or destroyed, so count each element on both sides. Change the big numbers in front of formulae, never the small ones inside. Add state symbols: (s), (l), (g), (aq)."},
 {t:"Ionic equations",p:"Split dissolved ionic compounds into their ions, then cross out the ions that appear unchanged on both sides (spectator ions). What's left is the ionic equation."}
],{q:"Balance: Mg + HCl → MgCl₂ + H₂",s:["Count atoms. Left: 1 Mg, 1 H, 1 Cl. Right: 1 Mg, 2 H, 2 Cl.","Put a 2 in front of HCl.","Mg + 2HCl → MgCl₂ + H₂"],a:"Mg + 2HCl → MgCl₂ + H₂"},
"Never change a formula to balance an equation.");

L("chem-mole","The mole lets chemists count particles by weighing them.",[
 {t:"Relative masses",p:"Ar is the relative atomic mass, from the Periodic Table. Mr adds up the Ar values in a formula, e.g. H₂O = 2(1) + 16 = 18."},
 {t:"The mole",p:"One mole contains 6.02 × 10²³ particles (the Avogadro constant).",f:"moles = mass ÷ Mr"},
 {t:"Gases and solutions",p:"At room temperature and pressure, one mole of any gas takes up 24 dm³.",f:"gas volume (dm³) = moles × 24     concentration (mol/dm³) = moles ÷ volume (dm³)"},
 {t:"Using equations",p:"The equation gives the mole ratio. Find the moles of what you know, use the ratio, then convert to what you want. Percentage yield = actual yield ÷ theoretical yield × 100%."}
],{q:"What mass of CO₂ forms when 10 g of CaCO₃ (Mr 100) decomposes? CaCO₃ → CaO + CO₂",s:["Moles of CaCO₃ = 10 ÷ 100 = 0.1 mol.","The ratio is 1 : 1, so 0.1 mol of CO₂ forms.","Mass of CO₂ = 0.1 × 44 = 4.4 g."],a:"4.4 g"},
"Convert cm³ to dm³ by dividing by 1000.");

L("chem-acids","Acids and bases are everywhere, from lemon juice to soap.",[
 {t:"Acids",p:"Acids produce H⁺ ions in water and have a pH below 7. Strong acids (HCl, H₂SO₄, HNO₃) ionise completely; weak acids such as ethanoic acid only partly.",b:["Acid + metal → salt + hydrogen","Acid + base → salt + water","Acid + carbonate → salt + water + carbon dioxide"]},
 {t:"Bases and alkalis",p:"Bases are metal oxides and hydroxides. Alkalis are bases that dissolve in water, making OH⁻ ions, with a pH above 7. Alkalis react with ammonium salts to give ammonia gas."},
 {t:"pH and indicators",b:["Universal indicator: red (strong acid) to purple (strong alkali)","Litmus: red in acid, blue in alkali","Methyl orange: red in acid, yellow in alkali","Phenolphthalein: colourless in acid, pink in alkali"]},
 {t:"Types of oxide",b:["Acidic (non-metal oxides): CO₂, SO₂","Basic (metal oxides): CaO, CuO","Amphoteric (react with acids and bases): Al₂O₃, ZnO","Neutral: CO, H₂O"]}
],{q:"Write the word equation for zinc carbonate reacting with hydrochloric acid.",s:["Acid + carbonate → salt + water + carbon dioxide.","Hydrochloric acid makes chloride salts.","Zinc carbonate + hydrochloric acid → zinc chloride + water + carbon dioxide."],a:"→ zinc chloride + water + carbon dioxide"},
"Strong is not the same as concentrated. Strength is about how much the acid ionises.");

L("chem-salts","A salt forms when the hydrogen in an acid is replaced by a metal or ammonium ion.",[
 {t:"Solubility rules",b:["All sodium, potassium, ammonium and nitrate salts are soluble","Chlorides are soluble, except silver and lead(II) chloride","Sulfates are soluble, except barium, lead(II) and calcium sulfate","Carbonates are insoluble, except sodium, potassium and ammonium carbonate"]},
 {t:"Method 1: excess solid",p:"For a soluble salt from an insoluble base, metal or carbonate. Add the solid to warm acid until no more reacts, filter off the excess, then crystallise. Example: CuO + H₂SO₄ → CuSO₄ + H₂O."},
 {t:"Method 2: titration",p:"For soluble sodium, potassium and ammonium salts. Find the exact volumes needed using an indicator, repeat without the indicator, then crystallise."},
 {t:"Method 3: precipitation",p:"For insoluble salts. Mix two solutions that contain the ions you need, then filter, wash with distilled water and dry. Example: BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s) + 2NaCl(aq)."}
],{q:"Plan how to make a dry sample of lead(II) chloride.",s:["Lead(II) chloride is insoluble, so use precipitation.","Mix lead(II) nitrate solution with sodium chloride solution.","Filter, wash the solid with distilled water, and dry it."],a:"Precipitation"},
"Choose the method by first checking whether the salt is soluble.");

L("chem-qa","Qualitative analysis is detective work: identifying ions and gases from test results.",[
 {t:"Testing for gases",b:["Hydrogen: a lighted splint pops","Oxygen: relights a glowing splint","Carbon dioxide: limewater turns milky","Ammonia: turns damp red litmus blue","Chlorine: bleaches damp litmus","Sulfur dioxide: turns acidified potassium manganate(VII) from purple to colourless"]},
 {t:"Cations with sodium hydroxide",b:["Cu²⁺: blue precipitate","Fe²⁺: green precipitate","Fe³⁺: red-brown precipitate","Zn²⁺, Al³⁺, Pb²⁺: white precipitate that dissolves in excess","Ca²⁺: white precipitate that stays in excess","NH₄⁺: no precipitate; ammonia gas when warmed"]},
 {t:"Cations with aqueous ammonia",p:"This tells the white precipitates apart. Zn²⁺: white precipitate that dissolves in excess. Al³⁺ and Pb²⁺: white precipitate that does not dissolve. Cu²⁺: blue precipitate that dissolves to give a dark blue solution."},
 {t:"Anions",b:["Carbonate: add dilute acid → carbon dioxide","Chloride: dilute nitric acid + silver nitrate → white precipitate","Iodide: dilute nitric acid + silver nitrate → yellow precipitate","Sulfate: dilute nitric acid + barium nitrate → white precipitate","Nitrate: sodium hydroxide + aluminium foil, warm → ammonia"]}
],{q:"Solution X gives a white precipitate with NaOH(aq) that dissolves in excess. With excess NH₃(aq), the white precipitate does not dissolve. What could the cation be?",s:["Dissolves in excess NaOH: Zn²⁺, Al³⁺ or Pb²⁺.","Doesn't dissolve in excess NH₃: that rules out Zn²⁺.","So the cation is Al³⁺ or Pb²⁺."],a:"Al³⁺ or Pb²⁺"},
"Always state the precipitate's colour and whether it dissolves in excess.");

L("chem-periodic","The Periodic Table arranges elements by proton number, so their patterns repeat.",[
 {t:"Groups and periods",p:"Elements in the same group have the same number of outer electrons, so they react in similar ways. Going across a period, elements change from metals to non-metals."},
 {t:"Group 1: alkali metals",p:"Soft, low density, and react quickly with water to form an alkaline hydroxide and hydrogen. Reactivity increases down the group, because the outer electron is further from the nucleus and easier to lose."},
 {t:"Group 17: halogens",p:"Coloured, toxic, and made of two-atom molecules (Cl₂, Br₂, I₂). Reactivity decreases down the group. A more reactive halogen displaces a less reactive one from its salt."},
 {t:"Noble gases and transition metals",b:["Group 18: full outer shells, so unreactive; used in lamps and balloons","Transition metals: high melting points and densities, coloured compounds, more than one oxidation state, good catalysts"]}
],{q:"Predict what happens when bromine water is added to potassium iodide solution.",s:["Bromine is above iodine in Group 17, so it is more reactive.","Bromine displaces iodine: Br₂ + 2KI → 2KBr + I₂.","The solution turns brown as iodine forms."],a:"Iodine is displaced and the solution turns brown"},
"Group 1 gets more reactive going down; Group 17 gets less reactive.");

L("chem-redox","Redox reactions are ones where oxidation and reduction happen together.",[
 {t:"Spotting oxidation and reduction",b:["Oxidation: gain of oxygen, loss of hydrogen, loss of electrons, increase in oxidation state","Reduction: the opposite of each","Memory aid: OIL RIG (Oxidation Is Loss, Reduction Is Gain of electrons)"]},
 {t:"Oxidation states",p:"Uncombined elements are 0. Simple ions equal their charge. In compounds, oxygen is usually −2 and hydrogen +1. The oxidation states add up to the overall charge."},
 {t:"Oxidising and reducing agents",p:"An oxidising agent oxidises something else and is itself reduced (it gains electrons). A reducing agent is itself oxidised. In CuO + H₂ → Cu + H₂O, hydrogen is the reducing agent."},
 {t:"Tests",b:["For an oxidising agent: potassium iodide turns from colourless to brown","For a reducing agent: acidified potassium manganate(VII) turns from purple to colourless","For a reducing agent: acidified potassium dichromate(VI) turns from orange to green"]}
],{q:"In 2Fe²⁺ + Cl₂ → 2Fe³⁺ + 2Cl⁻, what is oxidised and what is reduced?",s:["Fe²⁺ → Fe³⁺: oxidation state goes up, an electron is lost, so it is oxidised.","Cl₂ → Cl⁻: 0 to −1, electrons gained, so it is reduced.","Chlorine is the oxidising agent."],a:"Fe²⁺ is oxidised; Cl₂ is reduced"},
"The oxidising agent is the one that gets reduced.");

L("chem-metals","Metals react differently depending on where they are in the reactivity series.",[
 {t:"Reactivity series",p:"Potassium, sodium, calcium, magnesium, aluminium, (carbon), zinc, iron, lead, (hydrogen), copper, silver, gold. Metals higher up react faster with water and acids and form more stable compounds."},
 {t:"Displacement",p:"A more reactive metal displaces a less reactive metal from its compounds. Example: Zn + CuSO₄ → ZnSO₄ + Cu."},
 {t:"Extraction",b:["Above carbon (potassium to aluminium): electrolysis of the molten compound","Below carbon (zinc, iron, lead): heat the oxide with carbon","Blast furnace: coke burns to make carbon monoxide, which reduces iron(III) oxide to iron; limestone removes impurities as slag"]},
 {t:"Rusting and alloys",p:"Iron rusts only when water and oxygen are both present. Prevent it with paint, oil, plastic, galvanising or a sacrificial metal. Alloys like steel and brass are harder than pure metals because atoms of different sizes stop the layers sliding."}
],{q:"Why can't copper be used as sacrificial protection for iron?",s:["A sacrificial metal must corrode instead of the iron.","That needs a metal more reactive than iron.","Copper is less reactive, so the iron would still corrode."],a:"Copper is less reactive than iron"},
"Carbon and hydrogen are in the series as reference points, not because they are metals.");

L("chem-electrochem","Electricity can split compounds apart, and chemical reactions can make electricity.",[
 {t:"Electrolysis basics",p:"An ionic compound conducts when molten or dissolved, because its ions can move. Positive ions (cations) go to the cathode (−) and gain electrons. Negative ions (anions) go to the anode (+) and lose electrons."},
 {t:"Molten compounds",p:"Only two kinds of ion are present, so the products are easy to predict. Molten lead(II) bromide gives lead at the cathode and bromine at the anode."},
 {t:"Aqueous solutions",b:["Cathode: whichever is less reactive, the metal or hydrogen, is discharged","Anode: hydroxide ions give oxygen, unless a halide is concentrated (then you get the halogen)","Graphite or platinum electrodes are inert; copper anodes dissolve, which is used in purifying copper and electroplating"]},
 {t:"Electric cells",p:"Two different metals in an electrolyte make a cell. The more reactive metal is the negative terminal. The bigger the difference in reactivity, the bigger the voltage. Hydrogen fuel cells produce only water."}
],{q:"Predict the products when dilute copper(II) sulfate is electrolysed with graphite electrodes.",s:["Cathode: Cu²⁺ or H⁺? Copper is less reactive, so copper forms.","Anode: SO₄²⁻ or OH⁻? Hydroxide is discharged, so oxygen forms.","The blue colour fades as the Cu²⁺ ions are used up."],a:"Copper at the cathode, oxygen at the anode"},
"Reduction happens at the cathode; oxidation happens at the anode.");

L("chem-energetics","Every chemical reaction involves an energy change.",[
 {t:"Exothermic vs endothermic",b:["Exothermic: gives out heat, so the surroundings warm up; ΔH is negative (combustion, neutralisation, respiration)","Endothermic: takes in heat, so the surroundings cool down; ΔH is positive (photosynthesis, thermal decomposition)"]},
 {t:"Bonds and energy",p:"Breaking bonds takes in energy. Making bonds gives energy out. If more energy is released making new bonds than is used breaking old ones, the reaction is exothermic."},
 {t:"Energy profile diagrams",p:"These show the energy of reactants and products. If the products are lower, the reaction is exothermic. The hump is the activation energy: the minimum energy that colliding particles need to react."},
 {t:"Calculating ΔH",p:"Use bond energies from a table.",f:"ΔH = energy to break bonds − energy released making bonds"}
],{q:"H₂ + Cl₂ → 2HCl. Bond energies: H–H 436, Cl–Cl 242, H–Cl 431 kJ/mol. Find ΔH.",s:["Bonds broken: 436 + 242 = 678 kJ.","Bonds made: 2 × 431 = 862 kJ.","ΔH = 678 − 862 = −184 kJ/mol, so the reaction is exothermic."],a:"−184 kJ/mol"},
"A negative ΔH means the reaction is exothermic.");

L("chem-rates","Some reactions are explosive and some take years. Collision theory explains why.",[
 {t:"Collision theory",p:"Particles react only if they collide with at least the activation energy. The more of these effective collisions per second, the faster the reaction."},
 {t:"What speeds a reaction up",b:["Higher concentration or pressure: particles are closer, so collisions are more frequent","Larger surface area: more particles exposed","Higher temperature: particles have more energy and collide more often","Catalyst: provides a route with a lower activation energy"]},
 {t:"Measuring rate",p:"Measure the volume of gas given off (gas syringe), the loss in mass (balance), or the time taken for a cross under the flask to disappear when a precipitate forms."},
 {t:"Reading rate graphs",p:"The steeper the curve, the faster the reaction. It flattens when a reactant is used up. The same amounts of reactants give the same final amount of product, however fast."}
],{q:"Marble chips react with acid. How does the graph of gas volume against time change if powdered marble of the same mass is used?",s:["Powder has a larger surface area, so the reaction is faster.","The curve is steeper at the start.","The same mass of marble is used, so it levels off at the same final volume."],a:"Steeper curve, same final volume"},
"A catalyst doesn't change how much product you get, only how fast.");

L("chem-equilibrium","Some reactions can go both ways and settle into a balance.",[
 {t:"Reversible reactions",p:"These are shown with ⇌. Heating blue hydrated copper(II) sulfate gives white anhydrous copper(II) sulfate; adding water turns it blue again."},
 {t:"Dynamic equilibrium",p:"In a closed system, the forward and backward reactions end up going at the same rate. Both keep happening, so the concentrations stay constant."},
 {t:"Le Chatelier's principle",p:"If conditions change, the equilibrium shifts to oppose the change.",b:["Add more reactant: shifts right","Increase pressure: shifts to the side with fewer gas molecules","Increase temperature: shifts in the endothermic direction","Add a catalyst: no shift, equilibrium is just reached faster"]},
 {t:"The Haber process",p:"N₂ + 3H₂ ⇌ 2NH₃ (forward reaction exothermic). Conditions: about 450 °C, 250 atm and an iron catalyst. These are a compromise between yield, speed and cost."}
],{q:"Why does the Haber process use a high pressure?",s:["The left side has 4 gas molecules; the right side has 2.","High pressure shifts the equilibrium towards fewer molecules, giving more ammonia.","It also makes the reaction faster."],a:"Higher yield and faster rate"},
"Equilibrium doesn't mean equal amounts. It means the amounts stay constant.");

L("chem-organic1","Organic chemistry is the chemistry of carbon compounds, and it starts with crude oil.",[
 {t:"Crude oil",p:"A mixture of hydrocarbons, separated by fractional distillation. Small molecules have low boiling points and come off near the top. From top to bottom: petroleum gas, petrol, naphtha, paraffin, diesel, lubricating oil, bitumen."},
 {t:"Homologous series",p:"A family of compounds with the same functional group and general formula. Members react in similar ways, and their physical properties (like boiling point) change gradually."},
 {t:"Alkanes, CₙH₂ₙ₊₂",p:"Saturated: only single C–C bonds. Fairly unreactive, apart from burning and substitution with chlorine in ultraviolet light. Methane, ethane, propane, butane."},
 {t:"Alkenes, CₙH₂ₙ",p:"Unsaturated: they have a C=C double bond, so they decolourise bromine water. They take part in addition reactions: with hydrogen (nickel catalyst) to make alkanes, and with steam to make alcohols. They are made by cracking long alkanes."}
],{q:"Name the alkene with 3 carbon atoms and write its formula.",s:["3 carbons gives the prefix prop-.","An alkene ends in -ene: propene.","Formula C₃H₆, structure CH₂=CH–CH₃."],a:"Propene, C₃H₆"},
"Isomers have the same molecular formula but different structures.");

L("chem-organic2","Alcohols, carboxylic acids and esters each have their own functional group.",[
 {t:"Alcohols (−OH)",p:"Methanol, ethanol, propanol and so on. Ethanol is made by fermentation (yeast and glucose, about 37 °C, no air) or by reacting ethene with steam (300 °C, 60 atm, phosphoric acid catalyst). Alcohols burn cleanly as fuels."},
 {t:"Carboxylic acids (−COOH)",p:"Made by oxidising alcohols with acidified potassium manganate(VII). They are weak acids that react with metals, bases and carbonates. Ethanoic acid is the acid in vinegar."},
 {t:"Esters (−COO−)",p:"Alcohol + carboxylic acid ⇌ ester + water, with a few drops of concentrated sulfuric acid as a catalyst. Esters smell fruity and are used in flavourings and perfumes."},
 {t:"Naming esters",p:"The alcohol gives the first word (ending -yl) and the acid gives the second (ending -oate). Ethanol + ethanoic acid → ethyl ethanoate. Methanol + propanoic acid → methyl propanoate."}
],{q:"Name the ester made from propanol and ethanoic acid.",s:["The alcohol part: propanol → propyl.","The acid part: ethanoic acid → ethanoate.","The ester is propyl ethanoate."],a:"Propyl ethanoate"},
"Alcohols are neutral. They are not acids or alkalis.");

L("chem-polymers","Polymers are huge molecules made by joining many small molecules called monomers.",[
 {t:"Addition polymerisation",p:"Alkene monomers open their C=C double bonds and join into a long chain, with nothing else produced. Ethene makes poly(ethene); chloroethene makes PVC."},
 {t:"Condensation polymerisation",p:"Monomers with two reactive groups join, giving off a small molecule (usually water) at each link. Nylon is a polyamide (amide links, −CONH−). Terylene (PET) is a polyester (ester links, −COO−)."},
 {t:"Natural polymers",b:["Proteins: made from amino acids, joined by amide (peptide) links","Starch: made from glucose","Fats: esters made from glycerol and fatty acids"]},
 {t:"The plastics problem",p:"Most plastics are non-biodegradable, so they stay in landfills and oceans for hundreds of years. Burning them can release toxic gases. Solutions: reduce, reuse, recycle, and biodegradable plastics."}
],{q:"How can you tell from a monomer whether it makes an addition or a condensation polymer?",s:["Look for a C=C double bond: that means addition.","Look for two reacting groups, e.g. −COOH with −OH or −NH₂: that means condensation.","Condensation also gives off a small molecule such as water."],a:"C=C means addition; two reactive groups means condensation"},
"When drawing a repeat unit, show bonds sticking out through the brackets.");

L("chem-air","Clean air matters for our health and for the planet.",[
 {t:"What air is made of",p:"Clean, dry air is about 78% nitrogen, 21% oxygen, about 1% argon and other noble gases, and about 0.04% carbon dioxide."},
 {t:"Pollutants",b:["Carbon monoxide: from incomplete combustion; toxic","Sulfur dioxide: from burning fuels containing sulfur; causes acid rain","Nitrogen oxides: from car engines; acid rain and smog","Unburnt hydrocarbons and particles: smog and breathing problems","Ozone at ground level: part of photochemical smog"]},
 {t:"Reducing pollution",p:"Catalytic converters in cars change carbon monoxide, nitrogen oxides and unburnt hydrocarbons into carbon dioxide, nitrogen and water. Flue gas desulfurisation uses calcium carbonate to remove sulfur dioxide from power-station chimneys."},
 {t:"Climate change",p:"Carbon dioxide and methane are greenhouse gases: they trap infrared radiation, warming the Earth. Effects include rising sea levels and more extreme weather. The carbon cycle moves carbon between air and living things through photosynthesis, respiration and combustion."}
],{q:"Why does burning coal cause acid rain?",s:["Coal contains sulfur.","Burning it produces sulfur dioxide.","Sulfur dioxide dissolves in rainwater to form acids that damage buildings, lakes and forests."],a:"Sulfur in coal makes sulfur dioxide"},
"The greenhouse effect is natural. Extra greenhouse gases make it stronger.");

/* ===================== BIOLOGY ===================== */
L("bio-cells","Cells are the building blocks of all living things.",[
 {t:"Parts of an animal cell",b:["Nucleus: contains DNA and controls the cell","Cell membrane: controls what enters and leaves","Cytoplasm: where most reactions happen","Mitochondria: aerobic respiration","Ribosomes and rough endoplasmic reticulum: make proteins","Golgi body: packages and sends out proteins"]},
 {t:"Plant cells also have",b:["A cellulose cell wall: support, and stops the cell bursting","Chloroplasts: photosynthesis","A large central vacuole full of cell sap: keeps the cell firm"]},
 {t:"Specialised cells",b:["Red blood cell: no nucleus, biconcave shape, full of haemoglobin","Root hair cell: long extension to absorb water and ions","Xylem vessel: hollow tube strengthened with lignin","Muscle and nerve cells: shaped for their jobs"]},
 {t:"Levels of organisation",p:"Cells → tissues (groups of similar cells) → organs (several tissues working together) → organ systems → organism."}
],{q:"A cell has a cell wall and a large vacuole but no chloroplasts. Where might it come from?",s:["A cell wall and a large vacuole mean it is a plant cell.","No chloroplasts means it doesn't photosynthesise.","It probably comes from a root, underground in the dark."],a:"A plant root"},
"Plant cells have a cell membrane too. It sits just inside the cell wall.");

L("bio-movement","Substances move in and out of cells by diffusion, osmosis and active transport.",[
 {t:"Diffusion",p:"The net movement of particles from where they are more concentrated to where they are less concentrated, down a concentration gradient. It needs no energy. It is faster with a larger surface area, a steeper gradient, a shorter distance or a higher temperature."},
 {t:"Osmosis",p:"The net movement of water molecules from a region of higher water potential (a dilute solution) to a region of lower water potential (a concentrated solution), through a partially permeable membrane."},
 {t:"Osmosis in cells",b:["Animal cell in pure water: swells and bursts","Animal cell in a strong solution: shrinks","Plant cell in pure water: becomes turgid (firm)","Plant cell in a strong solution: becomes flaccid, then plasmolysed"]},
 {t:"Active transport",p:"Moving substances against a concentration gradient, using energy from respiration. Root hair cells take in mineral ions from the soil this way."}
],{q:"Why do vegetables go limp when you sprinkle salt on them?",s:["The salt makes a concentrated solution outside the cells.","Water leaves the cells by osmosis.","The cells become flaccid, so the vegetable goes limp."],a:"Water leaves the cells by osmosis"},
"Osmosis is only about water moving.");

L("bio-molecules","Living things are built mainly from carbohydrates, fats and proteins.",[
 {t:"Carbohydrates",p:"Made of carbon, hydrogen and oxygen. Simple sugars: glucose. Double sugars: maltose and sucrose. Polysaccharides: starch (stored in plants), glycogen (stored in animals) and cellulose (plant cell walls)."},
 {t:"Fats and proteins",b:["Fats: made from glycerol and 3 fatty acids; store energy and insulate","Proteins: chains of amino acids; form enzymes, antibodies, muscle and some hormones"]},
 {t:"Food tests",b:["Starch: iodine solution turns from brown to blue-black","Reducing sugar: heat with Benedict's; turns green, yellow, orange or brick-red","Protein: biuret solution turns from blue to violet","Fat: shake with ethanol, then add water; a cloudy white emulsion forms"]},
 {t:"Water and DNA",p:"Water is the solvent in which reactions happen, and it carries substances around the body. DNA is a polymer of nucleotides that carries genetic information."}
],{q:"A food turns iodine blue-black, but Benedict's solution stays blue after heating. What does the food contain?",s:["Blue-black with iodine: starch is present.","Benedict's stays blue: no reducing sugar.","It contains starch but no reducing sugar."],a:"Starch, but no reducing sugar"},
"The Benedict's test needs heating; the biuret test doesn't.");

L("bio-enzymes","Enzymes are biological catalysts that make the reactions of life fast enough.",[
 {t:"What enzymes are",p:"Proteins that speed up reactions without being used up. Each enzyme works on one particular substrate."},
 {t:"Lock and key",p:"The substrate fits into the enzyme's active site like a key in a lock, forming an enzyme–substrate complex. The products leave and the enzyme can be used again. (In the induced-fit idea, the active site moulds slightly around the substrate.)"},
 {t:"Temperature",p:"The rate rises as temperature increases, up to the optimum (about 37 °C for human enzymes). Above that, the active site changes shape: the enzyme is denatured and stops working."},
 {t:"pH",p:"Each enzyme has an optimum pH. Pepsin in the stomach works best at about pH 2; amylase works best near pH 7. Extreme pH also denatures enzymes."}
],{q:"Why does amylase stop working at 70 °C, but only slow down at 10 °C?",s:["At 10 °C, molecules move slowly, so there are fewer collisions. It works again when warmed.","At 70 °C, the active site changes shape: the enzyme is denatured.","The substrate can no longer fit, and this can't be undone."],a:"Denatured at 70 °C; just slow at 10 °C"},
"Enzymes are denatured, not killed. They were never alive.");

L("bio-humannut","Digestion breaks big food molecules into small ones that the body can absorb.",[
 {t:"The journey",b:["Mouth: teeth chew; salivary amylase starts digesting starch","Stomach: hydrochloric acid kills microbes; pepsin digests protein","Small intestine (duodenum and ileum): most digestion and most absorption","Large intestine: absorbs water"]},
 {t:"Digestive enzymes",b:["Amylase: starch → maltose","Maltase: maltose → glucose","Proteases (pepsin, trypsin): proteins → polypeptides → amino acids","Lipase: fats → glycerol + fatty acids"]},
 {t:"Bile",p:"Made in the liver and stored in the gall bladder. It neutralises stomach acid and emulsifies fats into tiny droplets, giving lipase a bigger surface area to work on."},
 {t:"Absorption and the liver",p:"Villi and microvilli give the ileum a huge surface area. Glucose and amino acids enter the blood capillaries and go to the liver in the hepatic portal vein. The liver stores glucose as glycogen and turns extra amino acids into urea (deamination)."}
],{q:"Why might someone whose gall bladder has been removed find fatty food harder to digest?",s:["The gall bladder stores bile and releases it after meals.","Without it, less bile reaches the food at once.","Fats are emulsified less, so lipase works more slowly."],a:"Less bile is available to emulsify fats"},
"Bile is not an enzyme. It emulsifies fats but doesn't break bonds.");

L("bio-plantnut","Plants make their own food by photosynthesis.",[
 {t:"Photosynthesis",p:"Chlorophyll in chloroplasts absorbs light energy and turns it into chemical energy stored in glucose.",f:"carbon dioxide + water → glucose + oxygen   (light, chlorophyll)"},
 {t:"Leaf structure",b:["Waxy cuticle: cuts water loss","Palisade mesophyll: packed with chloroplasts, near the light","Spongy mesophyll: air spaces for gases to move","Stomata with guard cells: let carbon dioxide in and oxygen out","Veins of xylem and phloem: bring water in and take sugars away"]},
 {t:"Limiting factors",p:"Light intensity, carbon dioxide concentration and temperature all affect the rate. Whichever is in shortest supply limits it. Greenhouses raise all three to grow crops faster."},
 {t:"What glucose is used for",p:"Respiration; storage as starch; making cellulose for cell walls; making sucrose to transport; and, with nitrate ions from the soil, making amino acids."}
],{q:"A plant is kept in the dark for 48 hours, then a leaf is tested for starch. What do you expect, and why?",s:["In the dark, the plant can't photosynthesise.","It uses up its stored starch for respiration.","The iodine stays brown: there is no starch. The plant has been destarched."],a:"No starch is found"},
"Plants respire all the time, day and night.");

L("bio-planttrans","Plants move water up from the roots, and sugars around the plant, in two kinds of tube.",[
 {t:"Xylem",p:"Dead, hollow tubes strengthened with lignin. They carry water and mineral ions up from the roots to the leaves, in one direction only, and help support the plant."},
 {t:"Phloem",p:"Living tubes that carry sugars (mainly sucrose) and amino acids from the leaves to wherever they are used or stored. This is called translocation."},
 {t:"Taking in water",p:"Root hair cells take in water by osmosis and mineral ions by active transport. Water then moves across the root and into the xylem."},
 {t:"Transpiration",p:"Water evaporates from the mesophyll cells and diffuses out through the stomata. This pulls more water up the xylem (transpiration pull). It is faster when it is hot, dry, windy or bright. A plant wilts when it loses water faster than it takes it in."}
],{q:"Why does a plant lose water faster on a windy day?",s:["Wind blows away the water vapour around the leaf.","This keeps the concentration gradient steep.","So water vapour diffuses out of the stomata faster."],a:"Wind keeps the concentration gradient steep"},
"Xylem carries water up; phloem carries food up and down.");

L("bio-humantrans","The heart and blood vessels carry substances around the body.",[
 {t:"Blood",b:["Red blood cells: carry oxygen using haemoglobin","White blood cells: phagocytes engulf microbes; lymphocytes make antibodies","Platelets: help blood clot","Plasma: carries nutrients, carbon dioxide, hormones and urea"]},
 {t:"The heart",p:"The right side pumps deoxygenated blood to the lungs; the left side pumps oxygenated blood to the body. The left ventricle has the thickest wall. Valves stop blood flowing backwards. Blood passes through the heart twice on each trip round the body (double circulation)."},
 {t:"Blood vessels",b:["Arteries: carry blood away from the heart; thick, muscular, elastic walls; high pressure","Veins: carry blood back to the heart; thinner walls and valves; low pressure","Capillaries: walls one cell thick, where substances are exchanged with tissues"]},
 {t:"Heart health",p:"In coronary heart disease, fatty deposits block the coronary arteries that supply the heart muscle. Risks include a high-fat diet, smoking, stress, lack of exercise and family history."}
],{q:"Trace the path of blood from the vena cava to the aorta.",s:["Vena cava → right atrium → right ventricle.","→ pulmonary artery → lungs → pulmonary vein.","→ left atrium → left ventricle → aorta."],a:"Through the right side, the lungs, then the left side"},
"Arteries carry blood away from the heart, so the pulmonary artery carries deoxygenated blood.");

L("bio-respiration","Respiration releases energy from food, in every living cell.",[
 {t:"Aerobic respiration",p:"Happens in mitochondria. The energy is used for muscle contraction, building proteins, active transport, cell division and keeping warm.",f:"glucose + oxygen → carbon dioxide + water (+ lots of energy)"},
 {t:"Anaerobic respiration",b:["In muscles: glucose → lactic acid (+ a little energy), leaving an oxygen debt","In yeast: glucose → ethanol + carbon dioxide, used in bread-making and brewing"]},
 {t:"Gas exchange",p:"Air travels down the trachea, bronchi and bronchioles to the alveoli. Alveoli have a huge surface area, walls one cell thick, a moist lining and lots of capillaries. Oxygen diffuses into the blood and carbon dioxide diffuses out."},
 {t:"Breathing",p:"Breathing in: the diaphragm contracts and flattens, the external intercostal muscles lift the ribs, chest volume rises, pressure falls and air rushes in. Breathing out is the reverse. Smoking damages the cilia and the alveoli."}
],{q:"Why do you keep breathing hard for a while after a sprint?",s:["During the sprint, your muscles respired anaerobically.","Lactic acid built up, creating an oxygen debt.","Extra oxygen is needed to break down the lactic acid."],a:"To repay the oxygen debt"},
"Respiration is not breathing. It is a chemical reaction inside cells.");

L("bio-excretion","Excretion is getting rid of the waste products made by the body's chemical reactions.",[
 {t:"Excretory organs",b:["Lungs: carbon dioxide","Kidneys: urea, extra water and salts","Skin: some water and salts in sweat"]},
 {t:"The kidney and nephron",p:"Each kidney has about a million tiny tubes called nephrons. Urine flows from the kidneys down the ureters to the bladder, and out through the urethra."},
 {t:"How urine is made",b:["Ultrafiltration: high blood pressure forces small molecules out of the glomerulus into Bowman's capsule","Selective reabsorption: all the glucose, and the water and salts the body needs, go back into the blood","What's left (urea, extra water and salts) becomes urine"]},
 {t:"Dialysis",p:"If the kidneys fail, a dialysis machine cleans the blood across a partially permeable membrane. The dialysis fluid has normal levels of glucose and salts but no urea, so urea diffuses out of the blood."}
],{q:"Why is there normally no glucose in urine?",s:["Glucose molecules are small, so they are filtered into the nephron.","All of the glucose is reabsorbed in the first part of the tubule.","So none is left in the urine."],a:"It is all reabsorbed"},
"Egestion (getting rid of faeces) is not excretion.");

L("bio-homeostasis","Homeostasis keeps the conditions inside your body steady.",[
 {t:"Negative feedback",p:"A receptor detects a change. The control centre responds. An effector reverses the change, bringing conditions back to the normal level (the set point)."},
 {t:"Blood glucose",b:["Too high: the pancreas releases insulin, and the liver turns glucose into glycogen","Too low: the pancreas releases glucagon, and the liver turns glycogen into glucose","Type 1 diabetes: the pancreas makes too little insulin"]},
 {t:"When you're too hot",b:["Vasodilation: arterioles near the skin widen, so more heat is lost","Sweating: evaporation of sweat cools the skin","Hairs lie flat"]},
 {t:"When you're too cold",b:["Vasoconstriction: arterioles near the skin narrow","Shivering: muscles contract and respire, releasing heat","Hairs stand up, trapping a layer of air"]}
],{q:"What happens to your blood glucose after a sugary drink?",s:["Blood glucose rises, and the pancreas detects it.","The pancreas releases insulin into the blood.","The liver turns glucose into glycogen, so the level falls back to normal."],a:"Insulin brings it back down"},
"Glucagon is a hormone; glycogen is a store of glucose. Don't mix them up.");

L("bio-nervous","The nervous system lets you respond to changes quickly.",[
 {t:"How it's organised",p:"The central nervous system is the brain and spinal cord. Nerves connect it to the rest of the body. Neurones carry electrical impulses."},
 {t:"Reflex arc",p:"Stimulus → receptor → sensory neurone → relay neurone (in the spinal cord) → motor neurone → effector → response. Reflexes are fast and automatic, protecting you from harm."},
 {t:"Synapses",p:"The tiny gap between two neurones. A chemical (neurotransmitter) diffuses across and starts an impulse in the next neurone. Synapses make sure impulses travel in one direction only."},
 {t:"The eye",b:["Cornea and lens focus light onto the retina","Iris controls the pupil: in bright light, the circular muscles contract and the pupil gets smaller","Focusing on near objects: ciliary muscles contract and the lens becomes thicker","Retina: rods work in dim light; cones detect colour"]}
],{q:"You touch a hot pan and pull your hand away. Name the receptor and the effector.",s:["The receptor is the heat and pain receptors in your skin.","The effector is a muscle in your arm.","The response happens before you consciously feel the pain."],a:"Skin receptors and an arm muscle"},
"Effectors are muscles or glands.");

L("bio-hormones","Hormones are chemical messengers carried in the blood.",[
 {t:"Endocrine glands",b:["Pituitary gland: ADH, growth hormone","Pancreas: insulin and glucagon","Adrenal glands: adrenaline","Ovaries: oestrogen","Testes: testosterone"]},
 {t:"Adrenaline",p:"Released when you are scared, stressed or excited. It increases your heart rate and breathing rate, widens your pupils and raises blood glucose, getting you ready for 'fight or flight'."},
 {t:"Nerves vs hormones",b:["Nerves: electrical, fast, short-lived, go to precise places","Hormones: chemical, slower, longer-lasting, spread through the body"]},
 {t:"Hormones in use",p:"People with type 1 diabetes inject insulin. Plants have hormones too: auxins make shoots grow towards light."}
],{q:"Explain why your heart races just before a big test.",s:["Stress triggers your adrenal glands.","They release adrenaline into your blood.","Adrenaline raises your heart rate so more oxygen and glucose reach your muscles."],a:"Adrenaline"},
"A hormone only affects its target organs, which have the right receptors.");

L("bio-disease","Infectious diseases are caused by pathogens that spread from person to person.",[
 {t:"Pathogens",b:["Bacteria: e.g. cholera, tuberculosis","Viruses: e.g. influenza, dengue, COVID-19, HIV","Fungi and protoctists can also cause disease"]},
 {t:"How diseases spread",b:["Droplets in the air: flu, tuberculosis","Contaminated water or food: cholera","Vectors: dengue, carried by Aedes mosquitoes","Body fluids: HIV"]},
 {t:"Body defences",p:"Skin, mucus, cilia and stomach acid keep pathogens out. White blood cells fight those that get in: phagocytes engulf them, and lymphocytes make antibodies. Memory cells remember the pathogen for next time."},
 {t:"Medicines and vaccines",p:"Antibiotics kill bacteria but not viruses. Overusing them leads to antibiotic-resistant bacteria, so always finish the course. Vaccines contain a weakened or harmless form of a pathogen, so your body makes memory cells without you getting ill."}
],{q:"Why should you finish a full course of antibiotics, even when you feel better?",s:["The first doses kill the weakest bacteria.","Stopping early lets the more resistant ones survive.","They multiply, and resistance spreads."],a:"To avoid antibiotic-resistant bacteria"},
"Antibodies are made by lymphocytes, not phagocytes.");

L("bio-dna","DNA is the instruction manual for making proteins.",[
 {t:"Structure of DNA",p:"Two strands twisted into a double helix, joined by pairs of bases: A with T, and C with G. A gene is a section of DNA that codes for one polypeptide (protein)."},
 {t:"From gene to protein",p:"The bases are read in groups of three. Each group codes for one amino acid. In the nucleus, the gene is copied into mRNA, which carries the code to the ribosomes, where amino acids are joined in the right order."},
 {t:"Genetic engineering",p:"A useful gene is cut out with restriction enzymes and inserted into a bacterial plasmid using DNA ligase. The bacteria take up the plasmid, multiply, and make the product, such as human insulin."},
 {t:"Benefits and concerns",b:["Benefits: insulin for diabetes, pest-resistant crops, Golden Rice with extra vitamin A","Concerns: effects on ecosystems, food safety, ethics and costs for farmers"]}
],{q:"One DNA strand reads TACGGA. Write the matching strand.",s:["Pair each base: T with A, and C with G.","T→A, A→T, C→G, G→C, G→C, A→T.","The matching strand is ATGCCT."],a:"ATGCCT"},
"The base U (uracil) is only found in RNA, not in DNA.");

L("bio-division","Cells divide in two ways: mitosis and meiosis.",[
 {t:"Chromosomes",p:"Human body cells have 46 chromosomes, in 23 pairs (diploid). Sex cells (gametes) have 23 chromosomes, one from each pair (haploid)."},
 {t:"Mitosis",p:"One division makes two cells that are genetically identical to the parent cell, each with the full diploid number. Used for growth, repair and asexual reproduction."},
 {t:"Meiosis",p:"Two divisions make four genetically different haploid cells: the gametes. Variation comes from how chromosomes are shuffled and swap sections."},
 {t:"Why it matters",p:"At fertilisation, two haploid gametes join to restore the diploid number. If mitosis goes out of control, cells keep dividing and can form a tumour (cancer)."}
],{q:"A dog's body cells have 78 chromosomes. How many are in a dog's sperm cell, and in a skin cell made by mitosis?",s:["Sperm are made by meiosis, which halves the number: 39.","Mitosis keeps the number the same.","So the skin cell has 78."],a:"39 in sperm, 78 in a skin cell"},
"Mitosis makes two identical cells; meiosis makes four different ones.");

L("bio-plantrep","Flowering plants reproduce sexually using their flowers.",[
 {t:"Parts of a flower",b:["Male (stamen): the anther makes pollen; the filament holds it up","Female (carpel): the stigma catches pollen; the style; the ovary contains ovules","Petals attract insects; sepals protect the flower bud"]},
 {t:"Pollination",p:"Pollen moves from an anther to a stigma. Insect-pollinated flowers have bright petals, scent, nectar and sticky pollen. Wind-pollinated flowers have small dull petals, feathery stigmas hanging outside, and lots of light pollen."},
 {t:"Fertilisation",p:"A pollen tube grows down the style to an ovule, and the male nucleus fuses with the female nucleus. The ovule becomes a seed, and the ovary becomes the fruit."},
 {t:"Germination and cloning",p:"A seed needs water, oxygen and a suitable temperature to germinate. Plants can also reproduce asexually (cuttings, runners), making genetically identical clones."}
],{q:"Why do wind-pollinated plants make huge amounts of pollen?",s:["Wind carries pollen in random directions.","Most of it never lands on a stigma.","Making lots raises the chance that some does."],a:"Most of the pollen is wasted"},
"Pollination happens before fertilisation.");

L("bio-humanrep","Humans reproduce sexually: a sperm cell fertilises an egg cell.",[
 {t:"Reproductive systems",b:["Male: the testes make sperm and testosterone; sperm travel through the sperm duct; the prostate gland adds fluid","Female: the ovaries release eggs and make oestrogen; the oviduct carries the egg to the uterus"]},
 {t:"The menstrual cycle",p:"Lasts about 28 days. On days 1–5, the uterus lining breaks down (a period). Then the lining rebuilds. Around day 14, an egg is released (ovulation). Oestrogen and progesterone control the cycle."},
 {t:"Fertilisation and pregnancy",p:"Fertilisation happens in the oviduct. The zygote divides to form an embryo, which implants in the uterus lining. The placenta lets oxygen and nutrients diffuse to the fetus and wastes back to the mother, without their blood mixing. Amniotic fluid cushions the fetus."},
 {t:"Staying healthy",p:"Sexually transmitted infections such as HIV are spread through body fluids. Prevention and testing help protect people's health."}
],{q:"Why does the placenta need a large surface area?",s:["Oxygen and nutrients cross the placenta by diffusion.","A larger surface area makes diffusion faster.","So the growing fetus gets enough of what it needs."],a:"For fast diffusion"},
"Fertilisation happens in the oviduct, not in the uterus.");

L("bio-inheritance","Inheritance explains how features are passed from parents to their children.",[
 {t:"Key words",b:["Allele: one version of a gene","Dominant (capital letter): shows even with one copy","Recessive (small letter): shows only with two copies","Homozygous: two identical alleles (TT or tt); heterozygous: two different (Tt)","Genotype: the alleles you have; phenotype: the feature you can see"]},
 {t:"Genetic diagrams",p:"Write the parents' genotypes and their possible gametes, then use a Punnett square to show every combination. Crossing Tt × Tt gives a 3 : 1 ratio of the dominant to the recessive feature."},
 {t:"Test cross",p:"To find out if a dominant-looking organism is TT or Tt, cross it with a homozygous recessive (tt). If any offspring show the recessive feature, it must be Tt."},
 {t:"Other patterns",p:"Codominance: both alleles show, as in blood group AB. Sex: females are XX and males XY, so each baby has a 1 in 2 chance of being a boy or a girl."}
],{q:"Two brown-eyed parents are both Bb. What is the chance their child has blue eyes (bb)?",s:["Each parent's gametes: B or b.","Punnett square: BB, Bb, Bb, bb.","1 in 4 is bb, so a 25% chance."],a:"25%"},
"Ratios are probabilities. Real families can turn out differently.");

L("bio-variation","No two living things are exactly alike, and that is how evolution happens.",[
 {t:"Types of variation",b:["Continuous: a range of values, like height or mass; shown on a histogram","Discontinuous: separate groups, like blood group or tongue rolling; shown on a bar chart"]},
 {t:"Causes of variation",p:"Genes, the environment, or both. Mutations are random changes in DNA that create new alleles. Ionising radiation and some chemicals make mutations more likely."},
 {t:"Natural selection",b:["Individuals in a population vary","More offspring are born than can survive","They compete for food, mates and space","Those better adapted survive and reproduce","Their alleles become more common over many generations"]},
 {t:"Artificial selection",p:"Humans choose which plants or animals breed, to get useful features: crops with bigger yields, cows that give more milk, dogs with gentle temperaments."}
],{q:"Explain how antibiotic resistance spreads through a population of bacteria.",s:["A random mutation makes a few bacteria resistant.","The antibiotic kills the bacteria that aren't resistant.","The resistant ones survive, reproduce and pass on the resistance allele."],a:"By natural selection"},
"Organisms don't choose to adapt. Mutations happen at random.");

L("bio-ecology","Ecology is about how living things interact with each other and their environment.",[
 {t:"Food chains and webs",p:"Producer → primary consumer → secondary consumer → tertiary consumer. The arrows show the direction energy flows. Food webs join many food chains together."},
 {t:"Energy flow",p:"Only about 10% of the energy at one level passes to the next. The rest is lost as heat from respiration, through movement, and in undigested waste. That is why food chains rarely have more than five levels."},
 {t:"Pyramids",p:"A pyramid of numbers can be an odd shape, because one tree can feed thousands of insects. A pyramid of biomass is nearly always a true pyramid shape."},
 {t:"Cycles and people",p:"The carbon cycle: photosynthesis takes carbon dioxide out of the air; respiration, decomposition and combustion put it back. People affect ecosystems through deforestation, pollution and overfishing. Conservation protects habitats and species."}
],{q:"Grass → grasshopper → frog → snake. The grass captures 10 000 kJ. Roughly how much energy reaches the snake?",s:["About 10% passes on at each step.","Grasshopper: 1000 kJ. Frog: 100 kJ.","Snake: about 10 kJ."],a:"About 10 kJ"},
"In food chains, arrows point towards the eater.");

/* ===================== PRACTICAL ===================== */
L("prac-planning","A good experiment starts with a good plan.",[
 {t:"Variables",b:["Independent variable: the one you change","Dependent variable: the one you measure","Controlled variables: everything you keep the same, to make it a fair test"]},
 {t:"Writing a method",p:"Write numbered steps that someone else could follow: the apparatus, the quantities, what you change and how, what you measure and how, how many repeats, and safety precautions."},
 {t:"Range and repeats",p:"Use at least 5 values of the independent variable, evenly spread. Repeat each reading and calculate the mean, leaving out any anomalies."},
 {t:"Predictions",p:"Say what you expect and explain why using science, e.g. 'As temperature increases, the rate increases, because particles have more energy and collide more often.'"}
],{q:"Identify the variables for: 'Does the length of a wire affect its resistance?'",s:["Independent variable: the length of the wire.","Dependent variable: the resistance (from voltmeter and ammeter readings).","Controlled variables: the wire's material, its thickness and its temperature."],a:"Change the length; measure the resistance"},
"'Use the same amount' isn't enough. Say what you keep the same and how much.");

L("prac-apparatus","Choosing and reading apparatus correctly gives you accurate data.",[
 {t:"Measuring volume",b:["Pipette: one fixed volume, very precise (e.g. 25.0 cm³)","Burette: any volume, read to 0.05 cm³","Measuring cylinder: quick but less precise","Gas syringe: volumes of gas"]},
 {t:"Reading scales",p:"Read with your eye level with the mark, to avoid parallax error. For liquids, read the bottom of the meniscus. Record readings to the precision of the instrument."},
 {t:"Length and time",b:["Ruler: 0.1 cm","Vernier calipers: 0.01 cm","Micrometer screw gauge: 0.001 cm","Time several cycles to reduce reaction-time error"]},
 {t:"Zero errors",p:"Check an instrument reads zero before you start. If a balance reads 0.02 g with nothing on it, subtract 0.02 g from every reading."}
],{q:"A burette reads 1.20 cm³ at the start and 24.65 cm³ at the end. What volume was added?",s:["Volume added = final reading − initial reading.","= 24.65 − 1.20.","= 23.45 cm³."],a:"23.45 cm³"},
"Burettes are numbered from the top down: 0 is at the top.");

L("prac-data","Clear tables and graphs turn readings into results.",[
 {t:"Results tables",p:"Put the independent variable in the first column. Each heading has the quantity and unit, e.g. 'time / s'. Keep the same number of decimal places down each column. Include repeats and a mean column."},
 {t:"Plotting graphs",b:["Independent variable on the x-axis","Label each axis with the quantity and unit","Choose even scales that use at least half the grid","Plot points as small, neat crosses"]},
 {t:"Best-fit lines",p:"Draw a single smooth line or curve with points spread evenly on both sides. Don't join the dots. Ignore anomalous points."},
 {t:"Gradients",p:"Draw a large triangle on your line. Gradient = change in y ÷ change in x, with units. On a distance–time graph, the gradient is the speed."}
],{q:"Three timings were 2.7 s, 2.8 s and 4.1 s. What mean should you record?",s:["4.1 s is much bigger than the others, so it is anomalous.","Leave it out (or repeat the reading).","Mean = (2.7 + 2.8) ÷ 2 = 2.75 s."],a:"2.75 s"},
"Don't start an axis at an odd number unless you show a clear break.");

L("prac-errors","Every experiment has errors. Good scientists spot them and reduce them.",[
 {t:"Random errors",p:"Readings scatter unpredictably above and below the true value, e.g. from reaction time or a flickering reading. Reduce them by repeating readings and averaging."},
 {t:"Systematic errors",p:"Every reading is shifted the same way, e.g. a zero error or heat loss. Repeating doesn't help. Fix the method or correct the instrument instead."},
 {t:"Anomalies",p:"Results that don't fit the pattern. Check them, repeat them, and leave them out of your averages."},
 {t:"Suggesting improvements",p:"Be specific: say what to change and why. 'Use a lid to reduce heat loss' is much better than 'be more careful'. Data loggers, more precise instruments and more readings also help."}
],{q:"In a cooling experiment, the water cools faster than expected. Suggest a reason and an improvement.",s:["Heat is lost from the water's surface and through the sides of the container.","This is a systematic error.","Use an insulated cup with a lid."],a:"Heat loss; insulate the cup and use a lid"},
"'Human error' isn't an answer. Name the specific error.");

L("prac-safety","Safety comes first in every lab.",[
 {t:"The basics",b:["Wear safety goggles and tie long hair back","Stand up when working with chemicals or heat","Never eat or drink in the lab","Tell your teacher about spills and breakages straight away"]},
 {t:"Hazard symbols",b:["Flammable: catches fire easily","Corrosive: destroys skin and materials","Toxic: harmful if swallowed, breathed in or touched","Irritant or harmful: causes redness or illness","Oxidising: helps other things burn"]},
 {t:"Heating safely",p:"Use a heatproof mat, and the blue flame only while heating. Point test tubes away from people. Heat flammable liquids like ethanol in a water bath, never over a flame."},
 {t:"Handling chemicals",p:"Waft gases gently towards your nose; never sniff them directly. Add acid to water, not water to acid. Use a fume cupboard for toxic gases. Dispose of chemicals the way your teacher says."}
],{q:"Why should ethanol be heated in a water bath instead of over a Bunsen burner?",s:["Ethanol is highly flammable.","An open flame could set it on fire.","A water bath heats it gently with no flame near it."],a:"Because ethanol is flammable"},
"Know where the eyewash station and fire blanket are before you start.");

L("prac-chemprac","Chemistry practicals often test titration, making salts and qualitative analysis.",[
 {t:"Setting up a titration",b:["Rinse the pipette with the solution it will measure, then fill it to the line","Rinse the burette with its solution, and run some through to remove the air bubble in the tip","Add 2–3 drops of indicator to the conical flask","Swirl the flask, and add drop by drop near the end point"]},
 {t:"Titration results",p:"Do a rough titration first, then accurate ones. Record burette readings to 2 decimal places. Average only the concordant titres (within 0.10 cm³ of each other)."},
 {t:"Making salt crystals",p:"Filter off any excess solid. Heat the filtrate until it is saturated (crystals form on a cold glass rod dipped in it), then leave it to cool. Filter off the crystals and dry them between sheets of filter paper."},
 {t:"Qualitative analysis tips",p:"Add the reagent drop by drop, then in excess. Record the colour of any precipitate and whether it dissolves. Test gases straight away, at the mouth of the test tube."}
],{q:"Titres: rough 25.6 cm³, then 24.95, 25.05 and 25.40 cm³. Find the mean titre.",s:["Concordant titres are within 0.10 cm³ of each other: 24.95 and 25.05.","Leave out the rough titre and 25.40.","Mean = (24.95 + 25.05) ÷ 2 = 25.00 cm³."],a:"25.00 cm³"},
"Rinse the conical flask with distilled water only, not with the solution.");

L("prac-bioprac","Biology practicals often test food tests, osmosis, microscopes and enzymes.",[
 {t:"Food tests",b:["Starch: iodine solution turns blue-black","Reducing sugar: Benedict's in a hot water bath turns brick-red","Protein: biuret turns violet","Fat: ethanol, then water, gives a cloudy white emulsion"]},
 {t:"Microscopes and drawings",p:"Start on the lowest power. Draw with a sharp pencil: clear single lines, no shading, and label with ruled lines.",f:"magnification = image size ÷ actual size"},
 {t:"Osmosis experiments",p:"Cut equal potato strips, blot them dry and weigh them. Put them in different salt or sugar solutions, then blot and reweigh. Work out the percentage change in mass so the results can be compared fairly."},
 {t:"Enzyme experiments",p:"Use water baths to control temperature and buffer solutions to control pH. Measure how fast the substrate disappears (e.g. test for starch with iodine every 30 s) or how fast product appears."}
],{q:"A potato strip's mass changes from 2.50 g to 2.20 g. Find the percentage change.",s:["Change in mass = 2.20 − 2.50 = −0.30 g.","Percentage change = −0.30 ÷ 2.50 × 100.","= −12%."],a:"−12%"},
"Use percentage change, because the strips don't start at exactly the same mass.");

L("prac-phyprac","Physics practicals test careful measuring, good graphs and circuits.",[
 {t:"Pendulums",p:"Time 20 oscillations, repeat, and divide by 20 to get the period. Use a marker at the centre of the swing to start and stop timing. Keep the swing small."},
 {t:"Moments",p:"Balance a metre rule on a pivot, hang known masses from it, and adjust their distances until it balances. Then check that clockwise moments equal anticlockwise moments."},
 {t:"Light",p:"Trace rays through a glass block using pins placed far apart. Measure the angles from the normal with a protractor. A graph of sin i against sin r has a gradient equal to the refractive index."},
 {t:"Circuits",p:"Connect ammeters in series and voltmeters in parallel. Use a rheostat to change the current. Switch off between readings so the wire doesn't heat up. A graph of V against I has a gradient equal to the resistance."}
],{q:"Why should you switch the circuit off between readings when measuring a wire's resistance?",s:["The current heats the wire.","A hotter wire has a higher resistance.","Switching off keeps the temperature, a controlled variable, constant."],a:"To stop the wire heating up"},
"Check that meters read zero before you connect them.");
