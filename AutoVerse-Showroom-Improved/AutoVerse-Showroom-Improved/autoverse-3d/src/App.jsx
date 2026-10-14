import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import {
  ArrowDownRight, ArrowLeftRight, ArrowRight, Check, ChevronDown, CircleHelp,
  Gauge, Heart, Menu, Rotate3D, Search, Settings2, ShieldCheck, SlidersHorizontal,
  Sparkles, X, Zap, Plus, Pencil, Trash2, LayoutDashboard, CarFront, Bike, RotateCcw
} from 'lucide-react';

const initialVehicles = [
  { id: 1, name: 'Apex GT', brand: 'Apex', type: 'Coupe', year: 2026, price: 148000, power: '610 HP', speed: '3.1s', topSpeed: '205 mph', fuel: 'Petrol', color: '#c8c7c2', tag: 'EDITOR’S PICK', body: 'car', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85' },
  { id: 2, name: 'Raven R1', brand: 'Raven', type: 'Motorcycle', year: 2026, price: 24500, power: '220 HP', speed: '2.8s', topSpeed: '186 mph', fuel: 'Petrol', color: '#c69a42', tag: 'TRACK BRED', body: 'bike', image: 'https://images6.alphacoders.com/888/thumb-1920-888399.jpg' },
  { id: 3, name: 'Monarch X', brand: 'Monarch', type: 'SUV', year: 2025, price: 96500, power: '480 HP', speed: '4.4s', topSpeed: '155 mph', fuel: 'Hybrid', color: '#707a73', tag: 'GRAND TOURER', body: 'suv', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85' },
  { id: 4, name: 'Veloce S', brand: 'Veloce', type: 'Coupe', year: 2026, price: 189000, power: '720 HP', speed: '2.9s', topSpeed: '217 mph', fuel: 'Petrol', color: '#7e2624', tag: 'LIMITED SERIES', body: 'car', image: 'https://img.classistatic.de/api/v1/mo-prod/images/bf/bfc2d13a-e7b2-4818-b8d2-aabfc3c28a14?rule=mo-1600' },
  { id: 5, name: 'Nomad 900', brand: 'Nomad', type: 'Motorcycle', year: 2025, price: 17900, power: '115 HP', speed: '3.7s', topSpeed: '145 mph', fuel: 'Petrol', color: '#d8d1bf', tag: 'BUILT TO ROAM', body: 'bike', image: 'https://images8.alphacoders.com/119/1198169.jpg' },
  { id: 6, name: 'Eon GT-E', brand: 'Eon', type: 'Coupe', year: 2026, price: 112000, power: '540 HP', speed: '3.4s', topSpeed: '198 mph', fuel: 'Electric', color: '#64818a', tag: 'ELECTRIC SOUL', body: 'car', image: 'https://st2.depositphotos.com/2924751/8580/i/450/depositphotos_85804196-stock-photo-lamborghini-huracan-green-luxury-sports.jpg' }
];
const money = n => '$' + Number(n).toLocaleString('en-US');
const load = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };

function Wheels({ x, z, color = '#111' }) {
  return <group position={[x, 0.42, z]}>
    <mesh rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.42, 0.42, 0.22, 32]} /><meshStandardMaterial color={color} metalness={0.65} roughness={0.3} /></mesh>
    <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.22, 0.22, 0.235, 24]} /><meshStandardMaterial color="#b5b0a5" metalness={0.8} roughness={0.2} /></mesh>
    <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.07, 0.07, 0.24, 16]} /><meshStandardMaterial color="#252525" metalness={0.4} /></mesh>
  </group>;
}
function CarModel({ color, suv = false }) {
  const height = suv ? 1.05 : 0.78;
  return <group position={[0, -0.18, 0]} scale={1.05}>
    <mesh castShadow receiveShadow position={[0, height, 0]}><boxGeometry args={[3.5, 0.48, 1.48]} /><meshStandardMaterial color={color} metalness={0.78} roughness={0.23} /></mesh>
    <mesh castShadow position={[-0.12, height + 0.39, 0]}><boxGeometry args={[1.72, 0.55, 1.16]} /><meshStandardMaterial color={color} metalness={0.68} roughness={0.2} /></mesh>
    <mesh position={[-0.12, height + 0.4, 0]}><boxGeometry args={[1.57, 0.42, 1.19]} /><meshStandardMaterial color="#172126" metalness={0.55} roughness={0.16} transparent opacity={0.94} /></mesh>
    <mesh castShadow position={[1.32, height - 0.05, 0]}><boxGeometry args={[0.72, 0.22, 1.4]} /><meshStandardMaterial color={color} metalness={0.75} roughness={0.24} /></mesh>
    <mesh position={[1.76, height + 0.08, 0]}><boxGeometry args={[0.06, 0.1, 1.12]} /><meshStandardMaterial color="#fff2ce" emissive="#ffdca0" emissiveIntensity={2} /></mesh>
    <mesh position={[-1.77, height + 0.04, 0]}><boxGeometry args={[0.05, 0.12, 1.15]} /><meshStandardMaterial color="#d42f28" emissive="#d42f28" emissiveIntensity={1.4} /></mesh>
    <mesh position={[0, 0.47, 0]}><boxGeometry args={[3.65, 0.12, 1.45]} /><meshStandardMaterial color="#171717" metalness={0.3} /></mesh>
    <Wheels x={-1.1} z={0.79} /><Wheels x={1.1} z={0.79} /><Wheels x={-1.1} z={-0.79} /><Wheels x={1.1} z={-0.79} />
    <mesh position={[0.2, 0.5, 0]}><boxGeometry args={[0.7, 0.06, 1.52]} /><meshStandardMaterial color="#9d9b94" metalness={0.85} /></mesh>
  </group>;
}
function BikeWheel({ z }) {
  return <group position={[0, 0.55, z]} rotation={[0, 0, Math.PI / 2]}>
    <mesh castShadow><cylinderGeometry args={[0.48, 0.48, 0.2, 32]} /><meshStandardMaterial color="#111" roughness={0.85} /></mesh>
    <mesh><cylinderGeometry args={[0.3, 0.3, 0.215, 24]} /><meshStandardMaterial color="#b5b0a5" metalness={0.8} /></mesh>
  </group>;
}
function BikeModel({ color }) {
  return <group position={[0, -0.1, 0]} scale={1.05}>
    <BikeWheel z={1.2}/><BikeWheel z={-1.05}/>
    <mesh position={[0, 0.92, 0.1]} rotation={[0, 0, -0.18]} castShadow><capsuleGeometry args={[0.28, 0.82, 6, 14]} /><meshStandardMaterial color={color} metalness={0.65} roughness={0.25}/></mesh>
    <mesh position={[0, 1.28, -0.48]} rotation={[0.15, 0, -0.15]} castShadow><sphereGeometry args={[0.38, 24, 18]} /><meshStandardMaterial color={color} metalness={0.72} roughness={0.22}/></mesh>
    <mesh position={[0, 1.56, -0.48]}><sphereGeometry args={[0.27, 24, 16]} /><meshStandardMaterial color="#191d20" metalness={0.4} roughness={0.2}/></mesh>
    <mesh position={[0, 1.12, -0.86]} rotation={[0, 0, -0.5]}><cylinderGeometry args={[0.055, 0.055, 0.9, 12]}/><meshStandardMaterial color="#c5c2b9" metalness={0.85}/></mesh>
    <mesh position={[0, 1.42, 0.7]} rotation={[0, 0, 0.14]}><cylinderGeometry args={[0.035, 0.035, 0.8, 12]}/><meshStandardMaterial color="#c5c2b9" metalness={0.85}/></mesh>
    <mesh position={[0, 1.42, 0.95]}><boxGeometry args={[0.9, 0.05, 0.07]}/><meshStandardMaterial color="#161616" metalness={0.8}/></mesh>
    <mesh position={[0, 1.03, -0.2]} rotation={[0.3, 0, 0]}><boxGeometry args={[0.52, 0.12, 0.8]}/><meshStandardMaterial color="#181818" roughness={0.5}/></mesh>
    <mesh position={[0, 0.85, -0.6]} rotation={[0, 0, 0.4]}><cylinderGeometry args={[0.08, 0.08, 0.6, 12]}/><meshStandardMaterial color="#a9a9a9" metalness={0.85}/></mesh>
  </group>;
}
const referenceViews = {
  car: {
    orbit: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90',
    front: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=90',
    side: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=90'
  },
  suv: {
    orbit: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=90',
    front: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=90',
    side: 'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=1600&q=90'
  },
  bike: {
    orbit: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1600&q=90',
    front: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1600&q=90',
    side: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1600&q=90'
  }
};
function VehicleStage({ vehicle, color, cameraMode }) {
  // The viewer is a photo gallery: view buttons switch images instead of pretending to rotate one photo.
  const [imageFailed, setImageFailed] = useState(false);
  const viewSet = referenceViews[vehicle.body === 'bike' ? 'bike' : vehicle.body === 'suv' ? 'suv' : 'car'];
  const viewImage = viewSet[cameraMode] || vehicle.image;
  useEffect(() => setImageFailed(false), [vehicle.id, viewImage]);
  return <div className={`photo-stage photo-mode-${cameraMode}`}>
    {!imageFailed && viewImage ? <img className="showroom-photo" src={viewImage} alt={`${vehicle.brand} ${vehicle.name} — ${cameraMode === 'orbit' ? 'hero' : cameraMode} reference view`} onError={() => setImageFailed(true)} /> : <div className="photo-fallback"><CarFront size={100} strokeWidth={1}/><span>PHOTO UNAVAILABLE</span></div>}
    <div className="photo-paint-overlay" style={{ '--paint-color': color }} aria-hidden="true" />
    <div className="photo-vignette" />
    <div className="photo-caption"><span>{vehicle.brand} / {vehicle.year}</span><strong>{vehicle.name}</strong></div>
  </div>;
}
function VehicleCard({ vehicle, favorite, onFavorite, onView, selected, onCompare }) {
  return <article className={`vehicle-card ${selected ? 'selected' : ''}`}>
    <div className="card-visual" onClick={() => onView(vehicle)}>
      <span className="card-tag">{vehicle.tag || 'NEW ARRIVAL'}</span>
      <button className={`heart-btn ${favorite ? 'is-fav' : ''}`} aria-label="Toggle favorite" onClick={e => {e.stopPropagation(); onFavorite(vehicle.id);}}><Heart size={17} fill={favorite ? 'currentColor' : 'none'}/></button>
      <div className="mini-vehicle">
        {vehicle.image ? <img className="vehicle-photo" src={vehicle.image} alt={`${vehicle.brand} ${vehicle.name}`} loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} /> : (vehicle.body === 'bike' ? <Bike size={86} strokeWidth={1} /> : <CarFront size={104} strokeWidth={1} />)}
        <span className="vehicle-glow" style={{background: vehicle.color}}/>
      </div>
      <button className="view-link" onClick={() => onView(vehicle)}>EXPLORE VEHICLE <ArrowRight size={14}/></button>
    </div>
    <div className="card-info">
      <div className="card-title-row"><div><p className="eyebrow">{vehicle.brand} · {vehicle.year}</p><h3>{vehicle.name}</h3></div><p className="price">{money(vehicle.price)}</p></div>
      <div className="card-specs"><span><Zap size={13}/>{vehicle.power}</span><span><Gauge size={13}/>{vehicle.speed}</span><span>{vehicle.fuel}</span></div>
      <button className={`compare-toggle ${selected ? 'active' : ''}`} onClick={() => onCompare(vehicle.id)}>{selected ? <Check size={14}/> : <Plus size={14}/>} {selected ? 'ADDED TO COMPARE' : 'ADD TO COMPARE'}</button>
    </div>
  </article>;
}
function App() {
  const [vehicles, setVehicles] = useState(() => load('autoverse_vehicles', initialVehicles));
  const [favorites, setFavorites] = useState(() => load('autoverse_favorites', []));
  const [activeTab, setActiveTab] = useState('home');
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0] || initialVehicles[0]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [cameraMode, setCameraMode] = useState('orbit');
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('All brands');
  const [type, setType] = useState('All types');
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sort, setSort] = useState('Featured');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [adminForm, setAdminForm] = useState(null);
  const [toast, setToast] = useState('');
  const heroRef = useRef(null);
  const brands = useMemo(() => ['All brands', ...new Set(vehicles.map(v => v.brand))], [vehicles]);
  const filtered = useMemo(() => {
    let list = vehicles.filter(v => (v.name + ' ' + v.brand + ' ' + v.type).toLowerCase().includes(query.toLowerCase()) && (brand === 'All brands' || v.brand === brand) && (type === 'All types' || v.type === type) && v.price <= maxPrice && (!favoritesOnly || favorites.includes(v.id)));
    if (sort === 'Price: low to high') list.sort((a,b) => a.price-b.price);
    if (sort === 'Price: high to low') list.sort((a,b) => b.price-a.price);
    if (sort === 'Power') list.sort((a,b) => parseInt(b.power)-parseInt(a.power));
    return list;
  }, [vehicles, query, brand, type, maxPrice, sort, favoritesOnly, favorites]);
  useEffect(() => { localStorage.setItem('autoverse_vehicles', JSON.stringify(vehicles)); }, [vehicles]);
  useEffect(() => { localStorage.setItem('autoverse_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => {
    if (heroRef.current) gsap.fromTo(heroRef.current.querySelectorAll('.animate-in'), {y: 26, opacity: 0}, {y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.12});
  }, []);
  useEffect(() => {
    if (toast) { const timer = setTimeout(() => setToast(''), 2600); return () => clearTimeout(timer); }
  }, [toast]);
  const notify = message => setToast(message);
  const toggleFavorite = id => { setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); notify(favorites.includes(id) ? 'Removed from favorites' : 'Saved to favorites'); };
  const toggleCompare = id => setCompareIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length >= 3 ? (notify('Compare up to 3 vehicles'), prev) : [...prev, id]);
  const openVehicle = v => { setSelectedVehicle(v); setSelectedColor(null); setCameraMode('orbit'); setActiveTab('showroom'); window.scrollTo({top:0, behavior:'smooth'}); };
  const nav = [{id:'home',label:'HOME'}, {id:'explore',label:'EXPLORE'}, {id:'compare',label:'COMPARE'}, {id:'admin',label:'ADMIN DEMO'}];
  const currentVehicle = vehicles.find(v => v.id === selectedVehicle.id) || vehicles[0] || initialVehicles[0];
  const compareList = vehicles.filter(v => compareIds.includes(v.id));
  const saveVehicle = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const item = {id: adminForm?.id ?? Date.now(), name: form.get('name').trim(), brand: form.get('brand').trim(), type: form.get('type'), year: Number(form.get('year')), price: Number(form.get('price')), power: form.get('power'), speed: form.get('speed'), topSpeed: form.get('topSpeed') || 'N/A', fuel: form.get('fuel'), color: form.get('color'), tag: form.get('tag') || 'NEW ARRIVAL', body: form.get('type') === 'Motorcycle' ? 'bike' : form.get('type') === 'SUV' ? 'suv' : 'car'};
    if (!item.name || !item.brand || item.price <= 0) return notify('Please enter valid vehicle details');
    setVehicles(prev => adminForm ? prev.map(v => v.id === item.id ? item : v) : [item, ...prev]);
    setAdminForm(null); notify(adminForm ? 'Vehicle updated' : 'Vehicle added');
  };
  return <div className="app-shell">
    <header className="topbar">
      <button className="brand-lockup" onClick={() => setActiveTab('home')}><span className="brand-mark">A<span>V</span></span><span className="brand-name">AUTOVERSE<span>3D</span><small>THE ART OF MOTION</small></span></button>
      <nav className={`nav-links ${mobileMenu ? 'open' : ''}`}>
        {nav.map(n => <button key={n.id} className={activeTab === n.id || (n.id === 'home' && activeTab === 'showroom') ? 'nav-active' : ''} onClick={() => {setActiveTab(n.id); setMobileMenu(false);}}>{n.label}</button>)}
      </nav>
      <div className="header-actions"><button className="icon-button" onClick={() => {setFavoritesOnly(true);setActiveTab('explore');}} aria-label="Favorites"><Heart size={17}/><span className="fav-count">{favorites.length}</span></button><button className="outline-button header-cta" onClick={() => setActiveTab('explore')}>DISCOVER <ArrowRight size={14}/></button><button className="menu-button" onClick={() => setMobileMenu(v => !v)} aria-label="Toggle menu">{mobileMenu ? <X/> : <Menu/>}</button></div>
    </header>
    {activeTab === 'home' && <main>
      <section className="hero" ref={heroRef}>
        <div className="hero-grid"/>
        <div className="hero-copy">
          <p className="eyebrow animate-in"><span className="eyebrow-line"/> A NEW PERSPECTIVE ON PERFORMANCE</p>
          <h1 className="animate-in">DRIVE THE<br/><em>EXTRAORDINARY.</em></h1>
          <p className="hero-sub animate-in">A curated world of machines engineered to move you. Explore iconic design, precision performance, and the future of driving.</p>
          <div className="hero-actions animate-in"><button className="gold-button" onClick={() => setActiveTab('explore')}>ENTER THE SHOWROOM <ArrowRight size={16}/></button><button className="text-button" onClick={() => openVehicle(vehicles[0])}>MEET THE APEX GT <ArrowDownRight size={16}/></button></div>
          <div className="hero-foot animate-in"><span><i className="status-dot"/> CURATED MACHINES. UNLIMITED FEELING.</span><span>01 — 06 <span className="gold-text">/ COLLECTION</span></span></div>
        </div>
        <div className="hero-art">
          <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
          <div className="hero-art-label"><span>01 / PERFORMANCE SERIES</span><span>AV—026</span></div>
          <div className="hero-car"><img className="hero-car-photo" src={vehicles[0]?.image || initialVehicles[0].image} alt="Featured performance car in a studio setting" onError={e => { e.currentTarget.style.display = 'none'; }}/><div className="hero-car-glow"/></div>
          <div className="hero-art-bottom"><span>SCULPTED BY SPEED</span><span className="vertical-line"/><span>DEFINED BY DETAIL</span></div>
          <div className="hero-vertical">DESIGNED FOR THE FEELING</div>
        </div>
        <button className="scroll-cue" onClick={() => document.getElementById('curated')?.scrollIntoView({behavior:'smooth'})}><span>SCROLL TO DISCOVER</span><ArrowDownRight size={16}/></button>
      </section>
      <section className="stats-strip"><div><strong>06</strong><span>CURATED MACHINES</span></div><div><strong>PHOTO</strong><span>VEHICLE GALLERY</span></div><div><strong>3 VIEWS</strong><span>PHOTO VIEW OPTIONS</span></div><div><strong>∞</strong><span>DRIVE YOUR CURIOSITY</span></div></section>
      <section className="section curated-section" id="curated">
        <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line"/> THE COLLECTION</p><h2>CURATED <em>MACHINES.</em></h2></div><button className="text-button" onClick={() => setActiveTab('explore')}>VIEW ALL VEHICLES <ArrowRight size={15}/></button></div>
        <div className="vehicle-grid">{vehicles.slice(0,3).map(v => <VehicleCard key={v.id} vehicle={v} favorite={favorites.includes(v.id)} onFavorite={toggleFavorite} onView={openVehicle} onCompare={toggleCompare} selected={compareIds.includes(v.id)}/>)}</div>
      </section>
      <section className="manifesto"><div className="manifesto-mark">AV.</div><p className="eyebrow">MORE THAN A MACHINE</p><h2>FEEL THE ENGINEERING.<br/><em>OWN THE MOMENT.</em></h2><button className="gold-button" onClick={() => setActiveTab('showroom')}>EXPLORE THE SHOWROOM <Rotate3D size={16}/></button></section>
    </main>}
    {activeTab === 'showroom' && currentVehicle && <main className="page-main showroom-page">
      <div className="page-heading"><div><p className="eyebrow"><span className="eyebrow-line"/> VEHICLE GALLERY</p><h1>THE <em>SHOWROOM.</em></h1><p>Browse automotive photography, compare reference angles, and preview exterior color tints.</p></div><button className="back-link" onClick={() => setActiveTab('explore')}><ArrowRight size={15}/> ALL VEHICLES</button></div>
      <div className="showroom-layout">
        <div className="stage-wrap"><div className="stage-top"><span><span className="live-dot"/> PHOTO GALLERY</span><span>SWITCH REFERENCE ANGLES</span></div><div className="canvas-stage"><VehicleStage vehicle={currentVehicle} color={selectedColor || currentVehicle.color} cameraMode={cameraMode}/><div className="stage-watermark">AUTOVERSE <span>GALLERY</span></div><div className="stage-controls"><button onClick={() => setCameraMode('orbit')} className={cameraMode==='orbit'?'active':''}><Rotate3D size={15}/> HERO</button><button onClick={() => setCameraMode('front')} className={cameraMode==='front'?'active':''}>FRONT</button><button onClick={() => setCameraMode('side')} className={cameraMode==='side'?'active':''}>SIDE</button></div></div><div className="stage-bottom"><span><CircleHelp size={14}/> REFERENCE PHOTOS · DEMO CONFIGURATOR</span><button onClick={() => {setSelectedColor(null);setCameraMode('orbit');}}><RotateCcw size={14}/> RESET VIEW</button></div></div>
        <aside className="vehicle-config">
          <p className="eyebrow">{currentVehicle.tag || 'FEATURED VEHICLE'}</p><h2>{currentVehicle.name}</h2><p className="config-brand">{currentVehicle.brand} / {currentVehicle.year} / {currentVehicle.type}</p><div className="config-price">{money(currentVehicle.price)} <span>EST. STARTING PRICE</span></div>
          <div className="config-divider"/>
          <p className="config-label">PHOTO COLOR PREVIEW <span>{selectedColor ? 'TINT PREVIEW' : 'ORIGINAL PHOTO'}</span></p><div className="color-swatches">{['#c8c7c2','#c69a42','#7e2624','#202a2c','#d8d1bf','#6d727b'].map(c => <button key={c} style={{background:c}} className={(selectedColor || currentVehicle.color)===c?'chosen':''} onClick={() => setSelectedColor(c)} aria-label={`Choose color ${c}`}/>)}</div>
          <div className="config-divider"/>
          <div className="performance-grid"><div><span>POWER</span><strong>{currentVehicle.power}</strong></div><div><span>0–60 MPH</span><strong>{currentVehicle.speed}</strong></div><div><span>TOP SPEED</span><strong>{currentVehicle.topSpeed}</strong></div><div><span>POWERTRAIN</span><strong>{currentVehicle.fuel}</strong></div></div>
          <button className="gold-button full-button" onClick={() => toggleFavorite(currentVehicle.id)}><Heart size={16} fill={favorites.includes(currentVehicle.id)?'currentColor':'none'}/>{favorites.includes(currentVehicle.id)?'SAVED TO FAVORITES':'SAVE THIS MACHINE'}</button>
          <button className="outline-button full-button" onClick={() => toggleCompare(currentVehicle.id)}><ArrowLeftRight size={16}/> {compareIds.includes(currentVehicle.id)?'REMOVE FROM COMPARE':'ADD TO COMPARISON'}</button>
          <p className="demo-note"><ShieldCheck size={14}/> Demo configurator: color swatches tint the photo, not a manufacturer-accurate body paint. Vehicle images are reference photography.</p>
          <div className="other-vehicles"><p className="config-label">EXPLORE ANOTHER</p>{vehicles.filter(v=>v.id!==currentVehicle.id).slice(0,3).map(v=><button key={v.id} onClick={()=>{setSelectedVehicle(v);setSelectedColor(null);}}><span className="other-icon">{v.body==='bike'?<Bike size={19}/>:<CarFront size={21}/>}</span><span><strong>{v.name}</strong><small>{v.brand} · {money(v.price)}</small></span><ArrowRight size={15}/></button>)}</div>
        </aside>
      </div>
    </main>}
    {activeTab === 'explore' && <main className="page-main explore-page">
      <div className="page-heading"><div><p className="eyebrow"><span className="eyebrow-line"/> FIND YOUR MACHINE</p><h1>THE <em>COLLECTION.</em></h1><p>Performance, personality, and precision — find the one that speaks to you.</p></div><div className="collection-count"><strong>{filtered.length.toString().padStart(2,'0')}</strong><span>VEHICLES FOUND</span></div></div>
      <div className="filter-toolbar"><div className="search-field"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search vehicles or brands..."/>{query&&<button onClick={()=>setQuery('')}><X size={15}/></button>}</div><div className="select-wrap"><SlidersHorizontal size={15}/><select value={brand} onChange={e=>setBrand(e.target.value)}>{brands.map(b=><option key={b}>{b}</option>)}</select><ChevronDown size={14}/></div><div className="select-wrap"><select value={type} onChange={e=>setType(e.target.value)}>{['All types','Coupe','SUV','Motorcycle'].map(t=><option key={t}>{t}</option>)}</select><ChevronDown size={14}/></div><div className="select-wrap"><select value={sort} onChange={e=>setSort(e.target.value)}>{['Featured','Price: low to high','Price: high to low','Power'].map(s=><option key={s}>{s}</option>)}</select><ChevronDown size={14}/></div><button className={`favorites-filter ${favoritesOnly?'active':''}`} onClick={()=>setFavoritesOnly(v=>!v)}><Heart size={15} fill={favoritesOnly?'currentColor':'none'}/> SAVED ({favorites.length})</button></div>
      <div className="price-filter"><span>MAXIMUM PRICE</span><input type="range" min="15000" max="200000" step="5000" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/><strong>{money(maxPrice)}</strong><button onClick={()=>{setQuery('');setBrand('All brands');setType('All types');setMaxPrice(200000);setSort('Featured');setFavoritesOnly(false);}}>RESET FILTERS</button></div>
      {filtered.length ? <div className="vehicle-grid">{filtered.map(v=><VehicleCard key={v.id} vehicle={v} favorite={favorites.includes(v.id)} onFavorite={toggleFavorite} onView={openVehicle} onCompare={toggleCompare} selected={compareIds.includes(v.id)}/>)}</div> : <div className="empty-state"><Search size={34}/><h3>No machines found.</h3><p>Try adjusting your search or filters.</p><button className="outline-button" onClick={()=>{setQuery('');setBrand('All brands');setType('All types');setMaxPrice(200000);setFavoritesOnly(false);}}>CLEAR FILTERS</button></div>}
      {compareIds.length>0&&<button className="compare-floating" onClick={()=>setActiveTab('compare')}><ArrowLeftRight size={16}/> COMPARE {compareIds.length} VEHICLE{compareIds.length>1?'S':''}<ArrowRight size={15}/></button>}
    </main>}
    {activeTab === 'compare' && <main className="page-main compare-page">
      <div className="page-heading"><div><p className="eyebrow"><span className="eyebrow-line"/> SIDE BY SIDE</p><h1>MAKE THE <em>COMPARISON.</em></h1><p>Great machines deserve a closer look. Select up to three vehicles from Explore.</p></div><button className="outline-button" onClick={()=>setActiveTab('explore')}>ADD VEHICLES <Plus size={15}/></button></div>
      {compareList.length<2?<div className="compare-empty"><ArrowLeftRight size={36}/><h3>Your comparison starts here.</h3><p>Add at least two vehicles to compare specifications side by side.</p><button className="gold-button" onClick={()=>setActiveTab('explore')}>EXPLORE VEHICLES <ArrowRight size={15}/></button></div>:<div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>SPECIFICATION</th>{compareList.map(v=><th key={v.id}><div className="compare-vehicle-icon">{v.body==='bike'?<Bike size={42}/>:<CarFront size={50}/>}</div><span>{v.brand}</span><strong>{v.name}</strong><small>{money(v.price)}</small><button onClick={()=>toggleCompare(v.id)}><X size={13}/> REMOVE</button></th>)}</tr></thead><tbody>{[['Vehicle type',v=>v.type],['Model year',v=>v.year],['Power output',v=>v.power],['0–60 mph',v=>v.speed],['Top speed',v=>v.topSpeed],['Powertrain',v=>v.fuel],['Starting price',v=>money(v.price)]].map(([label,fn])=><tr key={label}><td>{label}</td>{compareList.map(v=><td key={v.id}>{fn(v)}</td>)}</tr>)}</tbody></table></div>}
    </main>}
    {activeTab === 'admin' && <main className="page-main admin-page">
      <div className="page-heading"><div><p className="eyebrow"><span className="eyebrow-line"/> LOCAL CONSOLE</p><h1>FLEET <em>MANAGEMENT.</em></h1><p>Manage the demo catalogue stored locally in this browser.</p></div><button className="gold-button" onClick={()=>setAdminForm({})}><Plus size={16}/> ADD VEHICLE</button></div>
      <div className="admin-notice"><ShieldCheck size={18}/><div><strong>Frontend-only</strong><p>Changes are stored in localStorage on this device and browser. This is not secure production administration and does not sync with other users.</p></div></div>
      <div className="admin-metrics"><div><span>TOTAL VEHICLES</span><strong>{vehicles.length.toString().padStart(2,'0')}</strong></div><div><span>FAVORITES SAVED</span><strong>{favorites.length.toString().padStart(2,'0')}</strong></div><div><span>COMPARE QUEUE</span><strong>{compareIds.length.toString().padStart(2,'0')}</strong></div><div><span>CATALOGUE VALUE</span><strong>{money(vehicles.reduce((sum,v)=>sum+Number(v.price||0),0))}</strong></div></div>
      <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>VEHICLE</th><th>TYPE</th><th>POWER</th><th>PRICE</th><th>ACTIONS</th></tr></thead><tbody>{vehicles.map(v=><tr key={v.id}><td><div className="admin-vehicle"><span className="admin-car-icon">{v.body==='bike'?<Bike size={22}/>:<CarFront size={24}/>}</span><span><strong>{v.name}</strong><small>{v.brand} · {v.year}</small></span></div></td><td>{v.type}</td><td>{v.power}</td><td>{money(v.price)}</td><td><div className="table-actions"><button onClick={()=>setAdminForm(v)} aria-label="Edit vehicle"><Pencil size={15}/></button><button className="delete-action" onClick={()=>{if(window.confirm(`Delete ${v.name} from this browser's demo catalogue?`)){setVehicles(prev=>prev.filter(x=>x.id!==v.id));setFavorites(prev=>prev.filter(x=>x!==v.id));setCompareIds(prev=>prev.filter(x=>x!==v.id));notify('Vehicle deleted');}}} aria-label="Delete vehicle"><Trash2 size={15}/></button></div></td></tr>)}</tbody></table></div>
      <button className="reset-demo" onClick={()=>{if(window.confirm('Restore the original demo catalogue? Your local catalogue changes will be lost.')){setVehicles(initialVehicles);setFavorites([]);setCompareIds([]);setSelectedVehicle(initialVehicles[0]);notify('Demo catalogue restored');}}}><RotateCcw size={14}/> RESTORE ORIGINAL DATA</button>
    </main>}
    <footer className="footer"><div className="footer-brand"><span className="brand-mark">A<span>V</span></span><span className="brand-name">AUTOVERSE<span>3D</span><small>THE ART OF MOTION</small></span></div><p>AN INTERACTIVE AUTOMOTIVE CONCEPT.<br/>BUILT FOR THE LOVE OF MACHINES.</p><span className="footer-right">2026 AUTOVERSE ·</span></footer>
    {compareIds.length>0&&activeTab!=='compare'&&<button className="compare-pill" onClick={()=>setActiveTab('compare')}><ArrowLeftRight size={15}/>{compareIds.length} IN COMPARE</button>}
    {toast&&<div className="toast"><Check size={16}/>{toast}</div>}
    {adminForm&&<div className="modal-backdrop" onClick={e=>{if(e.target===e.currentTarget)setAdminForm(null);}}><form className="vehicle-modal" onSubmit={saveVehicle}><div className="modal-heading"><div><p className="eyebrow">CATALOGUE EDITOR</p><h2>{adminForm.id?'EDIT VEHICLE':'ADD VEHICLE'}</h2></div><button type="button" className="icon-button" onClick={()=>setAdminForm(null)}><X size={19}/></button></div><div className="form-grid"><label>Vehicle name<input name="name" required defaultValue={adminForm.name||''} placeholder="e.g. Orion GT"/></label><label>Brand<input name="brand" required defaultValue={adminForm.brand||''} placeholder="e.g. Orion"/></label><label>Vehicle type<select name="type" defaultValue={adminForm.type||'Coupe'}><option>Coupe</option><option>SUV</option><option>Motorcycle</option></select></label><label>Model year<input name="year" type="number" min="1990" max="2100" required defaultValue={adminForm.year||2026}/></label><label>Price (USD)<input name="price" type="number" min="1" required defaultValue={adminForm.price||''} placeholder="85000"/></label><label>Power output<input name="power" required defaultValue={adminForm.power||''} placeholder="500 HP"/></label><label>0–60 mph<input name="speed" required defaultValue={adminForm.speed||''} placeholder="3.5s"/></label><label>Top speed<input name="topSpeed" defaultValue={adminForm.topSpeed||''} placeholder="190 mph"/></label><label>Powertrain<select name="fuel" defaultValue={adminForm.fuel||'Petrol'}><option>Petrol</option><option>Electric</option><option>Hybrid</option><option>Diesel</option></select></label><label>Paint color<input name="color" type="color" defaultValue={adminForm.color||'#c69a42'}/></label><label className="form-full">Collection tag<input name="tag" defaultValue={adminForm.tag||'NEW ARRIVAL'} placeholder="EDITOR'S PICK"/></label></div><div className="modal-actions"><button type="button" className="outline-button" onClick={()=>setAdminForm(null)}>CANCEL</button><button type="submit" className="gold-button"><Check size={15}/>{adminForm.id?'SAVE CHANGES':'ADD TO CATALOGUE'}</button></div></form></div>}
  </div>;
}
export default App;
