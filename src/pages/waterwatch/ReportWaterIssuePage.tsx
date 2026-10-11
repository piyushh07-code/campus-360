import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { WaterIssueType, IssuePriority } from '../../types';

export const ReportWaterIssuePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { createWaterReport, waterReports } = useData();
  const navigate = useNavigate();

  const [issueType, setIssueType] = useState<WaterIssueType>('leaking_tap');
  const [building, setBuilding] = useState('Hostel Block A');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<IssuePriority>('medium');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  // Duplicate Check logic: Active leaks in same building with same issue type
  const possibleDuplicates = waterReports.filter(
    (r) =>
      r.building.toLowerCase() === building.toLowerCase() &&
      r.issueType === issueType &&
      r.status !== 'resolved'
  );

  const issueTypesList: {
    type: WaterIssueType;
    title: string;
    desc: string;
    icon: string;
    rateEst: number;
  }[] = [
    {
      type: 'leaking_tap',
      title: 'Leaking Tap / Faucet',
      desc: 'Sinks, wash basins, lab faucets dripping continually',
      icon: 'water_drop',
      rateEst: 1.8,
    },
    {
      type: 'pipe_burst',
      title: 'Pipe Burst / Rupture',
      desc: 'Pressurized water escaping wall or ceiling joints rapidly',
      icon: 'warning',
      rateEst: 18.5,
    },
    {
      type: 'overflowing_tank',
      title: 'Overflowing Tank / Drain',
      desc: 'Float valve failure or floor drain spigot backing up',
      icon: 'tsunami',
      rateEst: 24.0,
    },
    {
      type: 'low_pressure',
      title: 'Low Water Pressure',
      desc: 'Fountains, washrooms or labs receiving weak flow or air in line',
      icon: 'compress',
      rateEst: 0.5,
    },
    {
      type: 'washroom_hygiene',
      title: 'Flush Valve / Hygiene',
      desc: 'Continuous toilet running, faulty flushometer, or sanitation defect',
      icon: 'cleaning_services',
      rateEst: 2.5,
    },
    {
      type: 'water_contamination',
      title: 'Contaminated / Brown Water',
      desc: 'Discolored water, chemical odor, or sediment particulates',
      icon: 'science',
      rateEst: 1.0,
    },
  ];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !description.trim()) return;

    const selectedRate = issueTypesList.find((i) => i.type === issueType)?.rateEst || 2.0;

    const created = createWaterReport({
      reportedBy: currentUser.uid,
      reporterName: currentUser.name,
      reporterEmail: currentUser.email,
      reporterRole: currentUser.role === 'admin' ? 'Facilities Specialist' : 'Student (BioEng)',
      issueType,
      building,
      location,
      description,
      priority,
      photoUrl: photoPreview || undefined,
      estimatedGallonsSavedPerHour: selectedRate,
    });

    setSubmittedId(created.id);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-border-neutral text-center my-8 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[36px]">check_circle</span>
        </div>
        <h1 className="text-2xl font-headline-lg font-bold text-main-text mb-2">
          Water Incident Dispatched!
        </h1>
        <p className="text-sm text-secondary-text mb-4">
          Your ticket <strong className="text-main-text font-bold">#{submittedId}</strong> has been logged to campus
          facilities dispatch triage. You will receive notifications as technicians update the work order.
        </p>

        <div className="p-4 rounded-xl bg-surface-container-low border border-border-neutral mb-6 text-left text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-outline">Campus Zone:</span>
            <strong className="text-main-text">{building}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-outline">Exact Location:</span>
            <strong className="text-main-text">{location}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-outline">Issue Classification:</span>
            <strong className="text-main-text">{issueType.replace('_', ' ').toUpperCase()}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-outline">Initial Status:</span>
            <span className="text-amber-700 font-bold">Pending Triage</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setLocation('');
              setDescription('');
              setPhotoPreview(null);
            }}
            className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-main-text"
          >
            Report Another Issue
          </button>
          <button
            onClick={() => navigate('/my-reports')}
            className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-sm"
          >
            Track in My Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="flex flex-col gap-1 pb-2 border-b border-border-neutral">
        <div className="flex items-center gap-2 text-outline text-xs">
          <span>Sustainability Workstation</span>
          <span>/</span>
          <span className="text-secondary font-medium">WaterWatch</span>
          <span>/</span>
          <span className="text-[#138A72] font-semibold">Incident Submission</span>
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text">
          Report Campus Water Issue
        </h1>
        <p className="font-body-md text-sm text-secondary-text mt-0.5">
          Help campus facilities resolve leaks, overflows, and supply faults promptly. Submissions generate an actionable service order for building maintenance dispatch teams.
        </p>
      </div>

      {/* Duplicate Incident Alert Banner */}
      {possibleDuplicates.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3 shadow-xs">
          <span className="material-symbols-outlined text-amber-700 text-[22px] shrink-0 mt-0.5">warning</span>
          <div className="flex flex-col text-xs leading-relaxed">
            <strong className="font-bold text-amber-900 text-sm">
              Likely Duplicate Incident Detected ({possibleDuplicates.length} active):
            </strong>
            <span>
              An active report (<strong>#{possibleDuplicates[0].id}</strong>) for "{issueType.replace('_', ' ')}" in{' '}
              <strong>{building}</strong> is already under facilities triage. If this is the same leak, our technician is
              already alerted! You may still proceed if you have new location details.
            </span>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-border-neutral space-y-6">
        {/* STEP 1: Issue Classification */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h2 className="font-headline-sm text-base font-bold text-main-text">
                Issue Classification *
              </h2>
            </div>
            <span className="text-xs text-[#138A72] font-semibold uppercase tracking-wider">Required</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {issueTypesList.map((item) => {
              const selected = issueType === item.type;
              return (
                <div
                  key={item.type}
                  onClick={() => setIssueType(item.type)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selected
                      ? 'bg-blue-50/70 border-primary ring-2 ring-primary/20 shadow-xs'
                      : 'bg-surface-container-low/70 border-border-neutral hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    {selected && (
                      <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                    )}
                  </div>
                  <div>
                    <span className="font-label-md text-xs font-bold text-main-text block leading-tight">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-secondary-text mt-1 block leading-tight">{item.desc}</span>
                  </div>
                  <span className="text-[10px] text-outline mt-2 pt-1 border-t border-border-neutral/40">
                    Est. Loss: ~{item.rateEst} gal/hr
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Location Specification */}
        <div className="pt-4 border-t border-border-neutral">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h2 className="font-headline-sm text-base font-bold text-main-text">
              Campus Building &amp; Location *
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">Campus Building *</label>
              <select
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full h-11 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs font-medium focus:outline-none"
              >
                <option value="Hostel Block A">Hostel Block A (Residential)</option>
                <option value="Hostel Block B">Hostel Block B (Residential)</option>
                <option value="Science Complex">Science Complex (Biology &amp; Chem)</option>
                <option value="Engineering Quad">Engineering Quad (Labs &amp; Mechanical)</option>
                <option value="Main Library Complex">Main Library Complex</option>
                <option value="Cafeteria & Dining Hall">Cafeteria &amp; Dining Hall</option>
                <option value="Sports Arena & Gymnasium">Sports Arena &amp; Gymnasium</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">
                Specific Location (Floor, Room, Restroom) *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. 3rd Floor South Restroom, Sink #2"
                className="w-full h-11 px-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* STEP 3: Urgency & Description */}
        <div className="pt-4 border-t border-border-neutral">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs">
              3
            </span>
            <h2 className="font-headline-sm text-base font-bold text-main-text">
              Incident Severity &amp; Description *
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-main-text mb-2">Severity Level *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['low', 'medium', 'high', 'emergency'] as IssuePriority[]).map((p) => {
                  const selected = priority === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                        selected
                          ? p === 'emergency'
                            ? 'bg-red-600 text-white border-red-600'
                            : p === 'high'
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-primary text-white border-primary'
                          : 'bg-surface-container-low text-on-surface-variant border-border-neutral hover:bg-surface-container'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">
                Detailed Description of the Issue *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what is dripping, sounds heard, valve condition, puddle size, or safety hazards..."
                className="w-full p-3 rounded-lg bg-surface-container-low border border-border-neutral text-xs focus:outline-none"
              />
            </div>

            {/* Optional Photo Attachment */}
            <div>
              <label className="block text-xs font-semibold text-main-text mb-1">
                Optional Incident Photo (Simulated Upload)
              </label>
              <div className="border-2 border-dashed border-border-neutral rounded-xl p-4 text-center hover:bg-surface-container-low transition-colors">
                {photoPreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={photoPreview}
                      alt="Uploaded preview"
                      className="max-h-40 rounded-lg object-contain mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="text-xs text-error font-semibold hover:underline"
                    >
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-[32px] text-outline mb-1">
                      add_photo_alternate
                    </span>
                    <span className="text-xs font-semibold text-primary">Click to attach photo or screenshot</span>
                    <span className="text-[10px] text-outline mt-0.5">PNG, JPG, WebP up to 10MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-neutral">
          <button
            type="button"
            onClick={() => navigate('/waterwatch')}
            className="px-5 py-2.5 rounded-lg text-secondary-text hover:bg-surface-container text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-7 py-2.5 rounded-lg bg-[#07866E] hover:bg-[#056E5A] text-white font-bold text-xs shadow-sm transition-all active:scale-[0.99]"
          >
            Dispatch Facilities Work Order
          </button>
        </div>
      </form>
    </div>
  );
};
