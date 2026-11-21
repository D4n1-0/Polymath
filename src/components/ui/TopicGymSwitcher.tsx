import { TOPIC_GYM_MODULES } from '../../data/curriculum';
import { useAppState } from '../../state/AppStateContext';
import type { TopicGymId } from '../../types/polymath';

const TOPIC_ORDER: TopicGymId[] = ['linear', 'algebra', 'geometry', 'fractions'];

export function TopicGymSwitcher() {
  const { activeTopicGym, setActiveTopicGym, navigate } = useAppState();
  const active = TOPIC_GYM_MODULES[activeTopicGym];

  return (
    <div className="flex flex-col gap-[14px] w-full">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-jakarta font-bold text-[18px] leading-normal text-[#0f172a]">
          Topic Gym
        </h2>
        <span className="font-space font-bold text-[12px] text-[#475569]">
          Custom Drills
        </span>
      </div>

      <div className="flex gap-[8px] items-center overflow-x-auto no-scrollbar pb-[2px]">
        {TOPIC_ORDER.map((id) => {
          const item = TOPIC_GYM_MODULES[id];
          const isSelected = activeTopicGym === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTopicGym(id)}
              className={`tactile-btn h-[40px] px-[14px] rounded-full border-[1.5px] border-solid shrink-0 cursor-pointer flex items-center justify-center font-space font-bold text-[12px] whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-[#6b38d4] border-[#6b38d4] text-white shadow-[0px_2px_0px_0px_#5516be]'
                  : 'bg-white border-[#e2e8f0] text-[#334155] hover:border-[#cbc3d7]'
              }`}
            >
              {item.chipLabel}
            </button>
          );
        })}
      </div>

      <div className="bg-white border-[1.5px] border-[#e2e8f0] rounded-[20px] p-[18px] flex flex-col gap-[12px] drop-shadow-[0px_4px_0px_#cbc3d7]">
        <div className="flex items-center justify-between w-full">
          <span className="font-space font-bold text-[12px] text-[#6b38d4]">
            {active.tag}
          </span>
          <span className="font-jakarta font-bold text-[13px] text-[#b45309]">
            {active.stars}
          </span>
        </div>

        <h3 className="font-jakarta font-extrabold text-[18px] leading-tight text-[#0f172a]">
          {active.title}
        </h3>

        <div className="bg-[#f5f0ff] border border-[#d8c4fe] rounded-[10px] px-[12px] py-[8px] self-start">
          <span className="font-space font-bold text-[16px] text-[#6b38d4]">
            {active.formula}
          </span>
        </div>

        <p className="font-jakarta font-medium text-[13px] leading-[19px] text-[#475569]">
          {active.description}
        </p>

        <button
          type="button"
          onClick={() => navigate(active.targetGame)}
          className="tactile-btn bg-[#6b38d4] h-[50px] rounded-[14px] shadow-[0px_4px_0px_0px_#4f20ad] w-full flex items-center justify-center cursor-pointer font-jakarta font-extrabold text-[15px] text-white"
        >
          PRACTICE TOPIC
        </button>
      </div>
    </div>
  );
}
