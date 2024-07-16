import { useEffect, useState } from 'react';
// REDUX
import { useTokenActions } from '../../store/token/tokenAction';
import { selectToken } from '../../store/token/tokenSlice';
import { useSelector } from 'react-redux';
// COMMON
import { refresh } from '../../images/other';
import TokensTable from '../../components/Token/TokenTable';
import Button from '../../components/Button';
import { ReactComponent as CrossIcon } from '../../SVGIcons/cancelIcon.svg';
import GlobalDialog from '../../components/Dialog';
import GlobalInput from '../../components/Global/GlobalInput';
import GlobalFormControlLabel from '../../components/Global/GlobalFormControlLabel';
import GlobalSwitch from '../../components/Global/GlobalSwitch';
import GlobalSelect from '../../components/Global/GlobalSelect';
// import { ReactComponent as CrossIcon } from '../../../../SVGIcons/crossIcon.svg';

const Tokens = () => {
  const { getTokensList } = useTokenActions();
  const { tokensList } = useSelector(selectToken);
  console.log('🚀 ~ Tokens ~ tokensList:', tokensList);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getTokensList();
      setLoading(false);
    })();
  }, []);

  const onPopupHandler = () => {
    setOpen(!open);
  };
  return (
    <div className="w-full px-2">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center  text-white">
        <h1 className="flex-1 font-bold text-2xl px-3 py-1">Tokens</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getTokensList(true);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          className=" bg-primary rounded-md my-2"
          loadingType="circular"
          buttonType="button"
          onClick={onPopupHandler}
        >
          Add Token
        </Button>
      </div>
      {/* TABLE */}
      <TokensTable data={tokensList} loading={loading} />

      <GlobalDialog
        open={open}
        size="md"
        closeButtonShow={false}
        onClose={onPopupHandler}
        content={
          <div>
            <div className="flex justify-end items-center cursor-pointer" onClick={onPopupHandler}>
              <CrossIcon />
            </div>
            <div className="h-full mx-4 md:mx-2">
              <div className="flex flex-col  md:flex-row w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    required

                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // isError={formik.errors.email}
                    // error={formik.errors.email}
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="displayName"
                    label="Display Name"
                    placeholder="Enter your display name"
                    type="text"
                    required
                    className="w-1/2"
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // isError={formik.errors.email}
                    // error={formik.errors.email}
                  />
                </div>
              </div>

              <div className="flex flex-col md:items-center  md:flex-row w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="name"
                    label="Rate"
                    placeholder="1"
                    type="number"
                    required
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // isError={formik.errors.email}
                    // error={formik.errors.email}
                  />
                </div>

                <div className="w-full md:w-1/2 mx-2 pt-2">
                  <GlobalSelect
                    label="Rate"
                    labelOptionClass={'text-left'}
                    name={'name'}
                    placeholder={'Selecte ..'}
                    options={[
                      { label: 'one', value: 'one' },
                      { label: 'two', value: 'two' },
                      { label: 'three', value: 'three' },
                    ]}
                    // setFieldValue={setTest}
                    isError={false}
                    value={'test'}
                    onChange={(e) => {
                      // console.log('event ::', e);
                      // onFilterStateHandler(dt.name, e.value);
                    }}
                    inputClass="mb-2 w-full"
                  />
                </div>
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="networkDisplayName"
                    label="Network Display Name"
                    placeholder="Enter your"
                    type="text"
                    required
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // isError={formik.errors.email}
                    // error={formik.errors.email}
                  />
                </div>
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalInput
                    name="displayName"
                    label="Display Name"
                    placeholder="Enter your display name"
                    type="text"
                    required
                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // isError={formik.errors.email}
                    // error={formik.errors.email}
                  />
                </div>
              </div>

              <div className="flex flex-col  md:flex-row md:items-center w-full">
                <div className="w-full md:w-1/2 mx-2">
                  <GlobalSelect
                    required
                    label="Withdraw Type"
                    labelOptionClass={'text-left'}
                    name={'name'}
                    placeholder={'Selecte ..'}
                    options={[
                      { label: 'one', value: 'one' },
                      { label: 'two', value: 'two' },
                      { label: 'three', value: 'three' },
                    ]}
                    // setFieldValue={setTest}
                    isError={false}
                    value={'test'}
                    onChange={(e) => {
                      // console.log('event ::', e);
                      // onFilterStateHandler(dt.name, e.value);
                    }}
                    inputClass="mb-2 w-full"
                  />
                </div>

                <div className="w-full flex md:items-center md:w-1/2 mx-2 mt-6">
                  {/* <GlobalFormControlLabel
                    control={ */}
                  <GlobalSwitch
                    checked={true}
                    onChange={(e) => {
                      console.log('event ::', e);
                      // formik.setFieldValue(item.key, e.target.checked);
                    }}
                  />
                  <button className="px-2">Auto Generate Adress</button>
                  {/* }
                    label="My Custom Switch"
                    className="text-primary"
                  /> */}
                </div>
              </div>

              <div className="flex flex-col  md:flex-row w-full">
                <div className="w-full mx-2">
                  <GlobalInput
                    name="name"
                    label="Callback URL"
                    placeholder="Enter your name"
                    type="text"
                    required

                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // isError={formik.errors.email}
                    // error={formik.errors.email}
                  />
                </div>
              </div>

              <div className="flex flex-col  md:flex-row w-full">
                <div className="w-full mx-2">
                  <GlobalInput
                    name="name"
                    label="Scan URL"
                    placeholder="Enter your name"
                    type="text"
                    required

                    // value={formik.values.email}
                    // onChange={formik.handleChange}
                    // isError={formik.errors.email}
                    // error={formik.errors.email}
                  />
                </div>
              </div>

              <div className="flex flex-col  md:flex-row w-full">
                <div className="w-full mx-2 flex items-center bg-white">
                  <Button
                    className="bg-white border rounded-md my-2 text-gray-600"
                    loadingType="circular"
                    buttonType="button"
                  >
                    Choose File
                  </Button>{' '}
                  <span className="px-2">No file shosen</span>
                </div>
              </div>

              <div className="flex flex-col  md:flex-row md:items-center w-full">
                <div className="w-full flex md:items-center md:w-[20vw] mx-2">
                  <GlobalSelect
                    required
                    label="Community"
                    labelOptionClass={'text-left'}
                    name={'name'}
                    placeholder={'Selecte ..'}
                    options={[
                      { label: 'one', value: 'one' },
                      { label: 'two', value: 'two' },
                      { label: 'three', value: 'three' },
                    ]}
                    // setFieldValue={setTest}
                    isError={false}
                    value={'test'}
                    onChange={(e) => {
                      // console.log('event ::', e);
                      // onFilterStateHandler(dt.name, e.value);
                    }}
                    inputClass="mb-2 w-full"
                  />
                  <div className="px-4">
                    <CrossIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Tokens;
