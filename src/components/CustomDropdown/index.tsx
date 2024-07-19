import React, { useMemo, useState } from 'react';
import GlobalCheckbox from '../Global/GlobalCheckbox';
import { ReactComponent as CancelIcon } from '../../SVGIcons/cancelIcon.svg';
import { ReactComponent as DropdownIcon } from '../../SVGIcons/arrowDown.svg';
import OutsideClickHandler from 'react-outside-click-handler';

interface RoleAndPermission {
  name: string;
  roles: string[];
}

const CustomDropdown: React.FC = () => {
  const [isClick, setIsClick] = useState(false);
  const [term, setTerms] = useState<boolean>(false);
  const [selectedRoles, setSelectedRoles] = useState<{
    [key: string]: string[];
  }>({});
  const [activedRoles, setActiveRoles] = useState<RoleAndPermission[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const roleAndPermission: RoleAndPermission[] = [
    {
      name: 'user',
      roles: ['all', 'view', 'edit', 'delete'],
    },
    {
      name: 'support',
      roles: ['all', 'view', 'edit', 'delete'],
    },
    {
      name: 'client',
      roles: ['all', 'view', 'edit', 'delete'],
    },
  ];

  const handleRoleSelection = (name: string, role: string) => {
    if (role === 'all' && !selectedRoles[name]?.includes(role)) {
      setSelectedRoles((prev) => ({
        ...prev,
        [name]: ['all', 'view', 'edit', 'delete'],
      }));
      return;
    }

    setSelectedRoles((prev) => {
      const userRoles = prev[name] || [];
      const updatedRoles = userRoles.includes(role)
        ? userRoles.filter((r) => r !== role)
        : [...userRoles, role];

      if (updatedRoles.length === 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [name]: updatedRoles,
      };
    });
  };

  const handleUserClick = (name: string) => {
    setSelectedRoles((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
    setActiveRoles((prev) => prev.filter((dt) => dt.name !== name));
  };

  const filterResult = useMemo(() => {
    if (!searchText) return roleAndPermission;
    return roleAndPermission.filter((itm) =>
      itm.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, roleAndPermission]);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start w-full relative">
        {/* dropdown section start */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsClick(false);
          }}
        >
          <div className="relative">
            <input
              className="w-full h-12 border outline-none text-defaultBlack py-2 px-4 text-xs rounded-full"
              type="text"
              name="search"
              onFocus={() => {
                setIsClick(true);
              }}
              placeholder="Search permission ..."
              value={searchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchText(e.target.value);
              }}
            />
            <div
              className="absolute top-3 right-4 flex justify-center items-center  border-l-2"
              style={{ zIndex: 99 }}
            >
              <div
                className="px-2"
                onClick={() => {
                  setIsClick(!isClick);
                }}
              >
                <DropdownIcon className={`w-5 h-5`} />
              </div>
            </div>
            {isClick && filterResult?.length > 0 && (
              <div className="flex flex-col justify-start items-start rounded-md z-[999] bg-white border border-gray-300 my-1 text-gray-500 absolute w-full min-w-[16wv]:">
                {filterResult.map((dt) => (
                  <div key={dt.name} className="px-4 py-3 w-full border-b-2">
                    <div className="flex gap-4">
                      <div className="font-medium text-sm w-14">{dt.name}</div>
                      {dt.roles.map((rl) => (
                        <div key={rl}>
                          <GlobalCheckbox
                            className="font-medium"
                            checked={
                              selectedRoles[dt.name]?.includes(rl) ?? false
                            }
                            setChecked={setTerms}
                            label={rl}
                            onChange={() => {
                              if (
                                !activedRoles.some(
                                  (role) => role.name === dt.name
                                )
                              ) {
                                setActiveRoles((prev) => [...prev, dt]);
                              }
                              handleRoleSelection(dt.name, rl);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </OutsideClickHandler>
        {/* dropdown section end */}

        {/* dropdown result section start */}
        {activedRoles.length > 0 && (
          <div className="flex flex-col justify-end items-start rounded-md z-10 border border-gray-300  text-gray-500 overflow-y-auto">
            <div className="h-[21vh] w-full">
              {activedRoles.map((dt) => (
                <div key={dt.name} className="px-4 py-3 w-full border-b-2">
                  <div className="flex gap-4 justify-between">
                    <div className="flex gap-4">
                      <div className="font-medium text-sm w-14">{dt.name}</div>
                      {dt.roles.map((rl) => (
                        <div key={rl}>
                          <GlobalCheckbox
                            className="font-medium"
                            checked={
                              selectedRoles[dt.name]?.includes(rl) ?? false
                            }
                            setChecked={setTerms}
                            label={rl}
                            onChange={() => {
                              handleRoleSelection(dt.name, rl);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div
                      className="selt-end cursor-pointer"
                      onClick={() => {
                        handleUserClick(dt.name);
                      }}
                    >
                      <CancelIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* dropdown result section end */}
      </div>
    </div>
  );
};

export default CustomDropdown;
