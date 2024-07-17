import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GlobalInput from '../../../../components/Global/GlobalInput';
import GlobalButton from '../../../../components/Global/GlobalButton';
import { DeleteIcon } from '../../../../images/svg';

const CloneModalContent = ({ rows, setCloneRows, handleSave, loading }) => {
  useEffect(() => {
    setCloneRows(rows);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      adminNote: '',
      rules: rows || [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      adminNote: Yup.string().required('Remarks are required'),
      rules: Yup.array().of(
        Yup.object().shape({
          dropPercentage: Yup.number().required('Required'),
          productionDecreasePercentage: Yup.number().required('Required'),
          increaseDLPPercentage: Yup.number().required('Required'),
          mintingBoost: Yup.number().required('Required'),
        })
      ),
    }),
    onSubmit: (values) => {
      handleSave(values);
    },
  });

  const handleAddRow = () => {
    formik.setFieldValue('rules', [
      ...formik.values.rules,
      { dropPercentage: '', productionDecreasePercentage: '', increaseDLPPercentage: '', mintingBoost: '' },
    ]);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...formik.values.rules];
    newRows.splice(index, 1);
    formik.setFieldValue('rules', newRows);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...formik.values.rules];
    newRows[index][field] = value;
    formik.setFieldValue('rules', newRows);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex gap-10 py-5">
        <GlobalInput
          type="text"
          value={formik.values.name}
          placeholder="Enter Name"
          onChange={formik.handleChange}
          label="Name"
          name="name"
          className="!px-4"
          onBlur={formik.handleBlur}
          isError={formik.touched.name && formik.errors.name}
          error={formik.errors.name}
        />
        <GlobalInput
          type="text"
          value={formik.values.adminNote}
          onChange={formik.handleChange}
          label="Remarks"
          name="adminNote"
          placeholder="Enter Remarks"
          onBlur={formik.handleBlur}
          isError={formik.touched.adminNote && formik.errors.adminNote}
          className="!px-4"
          error={formik.errors.adminNote}
        />
      </div>
      <table className="table-bordered border-collapse w-full">
        <thead>
          <tr className="text-left font-semibold text-sm p-3 border-b border-borderGray">
            <th className="text-sm">% Fall in the LYK Price</th>
            <th className="">Decrease Producation</th>
            <th className="">Increase DLP</th>
            <th className="">Minting Boost</th>
            <th className="">Actions</th>
          </tr>
        </thead>
        <tbody className=" ">
          {formik.values.rules?.map((row, index) => (
            <tr key={index} className="p-5 ">
              <td className="">
                <GlobalInput
                  name={`rules[${index}].dropPercentage`}
                  type="number"
                  value={row.dropPercentage}
                  className={`rounded-none border-none !px-0 !py-0`}
                  onChange={(e) => handleInputChange(index, 'dropPercentage', e.target.value)}
                  onBlur={formik.handleBlur}
                  isError={
                    formik.touched.rules?.[index]?.dropPercentage && formik.errors.rules?.[index]?.dropPercentage
                  }
                />
              </td>
              <td className="">
                <GlobalInput
                  name={`rules[${index}].productionDecreasePercentage`}
                  type="number"
                  value={row.productionDecreasePercentage}
                  className="rounded-none border-none !px-0 !py-0"
                  onChange={(e) => handleInputChange(index, 'productionDecreasePercentage', e.target.value)}
                  onBlur={formik.handleBlur}
                  isError={
                    formik.touched.rules?.[index]?.productionDecreasePercentage &&
                    formik.errors.rules?.[index]?.productionDecreasePercentage
                  }
                />
              </td>
              <td className="">
                <GlobalInput
                  name={`rules[${index}].increaseDLPPercentage`}
                  type="number"
                  value={row.increaseDLPPercentage}
                  className="rounded-none border-none !px-0 !py-0"
                  onChange={(e) => handleInputChange(index, 'increaseDLPPercentage', e.target.value)}
                  onBlur={formik.handleBlur}
                  isError={
                    formik.touched.rules?.[index]?.increaseDLPPercentage &&
                    formik.errors.rules?.[index]?.increaseDLPPercentage
                  }
                />
              </td>
              <td className="">
                <GlobalInput
                  name={`rules[${index}].mintingBoost`}
                  type="number"
                  value={row.mintingBoost}
                  className="rounded-none border-none !px-0 !py-0 w"
                  onChange={(e) => handleInputChange(index, 'mintingBoost', e.target.value)}
                  onBlur={formik.handleBlur}
                  isError={formik.touched.rules?.[index]?.mintingBoost && formik.errors.rules?.[index]?.mintingBoost}
                />
              </td>
              <td>
                <DeleteIcon onClick={() => handleDeleteRow(index)} className="h-6 " />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-4 py-5">
        <GlobalButton type="button" outlined text="Add Row" onClick={handleAddRow} />
        <GlobalButton type="submit" text="Save" loading={loading} />
      </div>
    </form>
  );
};

export default CloneModalContent;
