import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';
import { selectCustomerSlice } from '../../store/customer/customerSlice';
import { useCustomerActions } from '../../store/customer/customerActions';

// COMMON
import { refresh } from '../../images/other';
import UsersTable from '../../components/Users/UsersTable';
import UserFilters from '../../components/Users/UsersFilters';
import { USERS_TABLE_DEFAULT_FILTERS } from '../../utils/constance';

type SORT_TYPE = {
  sortKey: string | null;
  direction: 'ASC' | 'DESC' | '' | null;
};

type FITLERS_TYPE = {
  search?: any;
  country?: any;
  accountType?: string;
  twoFA?: boolean | null;
  verified?: boolean | null;
  page?: number;
  status?: string;
};

const Users = () => {
  const { getCustomersList } = useCustomerActions();
  const { customersList } = useSelector(selectCustomerSlice);
  const [loading, setLoading] = useState(true);
  const [reFetch, setReFetch] = useState<string>('');

  const [filters, setFilters] = useState<FITLERS_TYPE>(USERS_TABLE_DEFAULT_FILTERS);
  const [sort, setSort] = useState<SORT_TYPE>({
    sortKey: null,
    direction: null,
  });

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target ? e.target.name : e.name]: e.target ? e.target.value : e.value,
    }));
  };

  const clearFilters = () => {
    setFilters(USERS_TABLE_DEFAULT_FILTERS);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      filters.page !== -1 && setFilters((prev) => ({ ...prev, page: 1 }));
      await getCustomersList({ ...filters, page: filters.page === -1 ? 1 : 1 });
      setLoading(false);
    })();
  }, [filters.country, filters.accountType, filters.twoFA, filters.verified, filters.status]);

  useEffect(() => {
    if (filters.page !== -1) {
      (async () => {
        setLoading(true);
        await getCustomersList(filters);
        setLoading(false);
      })();
    }
  }, [filters.page]);

  useEffect(() => {
    if (reFetch === 'fetch') {
      (async () => {
        setLoading(true);
        await getCustomersList({
          ...filters,
          page: filters.page === -1 ? 1 : 1,
        });
        setLoading(false);
        setReFetch('');
      })();
    }
  }, [reFetch]);

  useEffect(() => {
    if (filters.search !== null) {
      const search = setTimeout(async () => {
        setLoading(true);
        setFilters((prev) => ({ ...prev, page: 1 }));
        await getCustomersList(filters);
        setLoading(false);
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filters.search]);

  useEffect(() => {
    if (sort.sortKey !== null) {
      (async () => {
        const query =
          sort.sortKey !== ''
            ? {
                ...filters,
                page: 1,
                sortKey: sort.sortKey,
                sortBy: sort.direction,
              }
            : { ...filters, page: 1 };
        await getCustomersList(query);
      })();
    }
  }, [sort]);

  return (
    <div className="w-full bg-[#181717]">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center  text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Users</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getCustomersList({ ...USERS_TABLE_DEFAULT_FILTERS, page: 1 });
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      {/* Filter & Actions */}
      <UserFilters filters={filters} handleFilterChange={handleFilterChange} clearFilters={clearFilters} />

      {/* TABLE */}
      <UsersTable
        data={customersList}
        loading={loading}
        page={filters.page}
        setPage={(val) => setFilters((prev) => ({ ...prev, page: val }))}
        setReFetch={setReFetch}
        sort={sort}
        setSort={setSort}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default Users;
