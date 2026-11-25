import { useMemo, useState } from 'react'
import {
  Add, CalendarMonth, CheckBox, CheckBoxOutlineBlank, DeleteOutlined, EditOutlined,
  Search, TableRows, VisibilityOutlined
} from '@mui/icons-material'
import {
  Alert, Avatar, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Pagination, Paper,
  Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField,
  ToggleButton, ToggleButtonGroup, Tooltip, Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

type Section = 'subjects' | 'sessions' | 'groups'
type RowData = Record<string, string | number>
type DemoData = { subjects: RowData[]; sessions: RowData[]; groups: RowData[] }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlexStack: any = Stack
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlexTypography: any = Typography
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlexTextField: any = TextField
const storageKey = 'dark-artistry-classes-demo-v1'
const seed: DemoData = {
  subjects: [
    { id: 'SUB-01', name: 'Vẽ cơ bản', category: 'Mỹ thuật', teacher: 'Nguyễn Minh Anh', duration: '12 buổi', status: 'Đang hoạt động' },
    { id: 'SUB-02', name: 'Màu nước', category: 'Hội họa', teacher: 'Trần Thu Hà', duration: '10 buổi', status: 'Đang hoạt động' },
    { id: 'SUB-03', name: 'Phác thảo chân dung', category: 'Hội họa', teacher: 'Lê Hoàng Nam', duration: '8 buổi', status: 'Tạm dừng' },
  ],
  sessions: [
    { id: 'SES-01', name: 'Vẽ cơ bản · Buổi 03', group: 'ART-01', subject: 'Vẽ cơ bản', date: '2026-11-26', time: '09:00', room: 'Phòng Lavender', teacher: 'Nguyễn Minh Anh', status: 'Sắp diễn ra' },
    { id: 'SES-02', name: 'Màu nước · Buổi 05', group: 'ART-02', subject: 'Màu nước', date: '2026-11-26', time: '14:00', room: 'Phòng Iris', teacher: 'Trần Thu Hà', status: 'Sắp diễn ra' },
    { id: 'SES-03', name: 'Vẽ cơ bản · Buổi 02', group: 'ART-01', subject: 'Vẽ cơ bản', date: '2026-11-24', time: '09:00', room: 'Phòng Lavender', teacher: 'Nguyễn Minh Anh', status: 'Hoàn thành' },
  ],
  groups: [
    { id: 'ART-01', name: 'Mỹ thuật thiếu nhi A', subject: 'Vẽ cơ bản', teacher: 'Nguyễn Minh Anh', students: '12 học viên', schedule: 'Thứ 3, 09:00', room: 'Phòng Lavender', status: 'Đang hoạt động' },
    { id: 'ART-02', name: 'Màu nước cuối tuần', subject: 'Màu nước', teacher: 'Trần Thu Hà', students: '8 học viên', schedule: 'Thứ 7, 14:00', room: 'Phòng Iris', status: 'Đang hoạt động' },
    { id: 'ART-03', name: 'Chân dung nâng cao', subject: 'Phác thảo chân dung', teacher: 'Lê Hoàng Nam', students: '6 học viên', schedule: 'Thứ 5, 16:00', room: 'Phòng Peony', status: 'Tạm dừng' },
  ]
}
const configs: Record<Section, { title: string; singular: string; fields: { key: string; label: string; options?: string[] }[] }> = {
  subjects: { title: 'Môn học', singular: 'môn học', fields: [
    { key: 'name', label: 'Tên môn học' }, { key: 'category', label: 'Nhóm môn học', options: ['Mỹ thuật', 'Hội họa', 'Thiết kế'] },
    { key: 'teacher', label: 'Giảng viên', options: ['Nguyễn Minh Anh', 'Trần Thu Hà', 'Lê Hoàng Nam'] }, { key: 'duration', label: 'Thời lượng' }, { key: 'status', label: 'Trạng thái', options: ['Đang hoạt động', 'Tạm dừng'] }
  ] },
  sessions: { title: 'Buổi học', singular: 'buổi học', fields: [
    { key: 'name', label: 'Tên buổi học' }, { key: 'group', label: 'Mã lớp', options: ['ART-01', 'ART-02', 'ART-03'] },
    { key: 'subject', label: 'Môn học', options: ['Vẽ cơ bản', 'Màu nước', 'Phác thảo chân dung'] }, { key: 'date', label: 'Ngày học', options: undefined },
    { key: 'time', label: 'Giờ học' }, { key: 'room', label: 'Phòng học', options: ['Phòng Lavender', 'Phòng Iris', 'Phòng Peony'] },
    { key: 'teacher', label: 'Giảng viên', options: ['Nguyễn Minh Anh', 'Trần Thu Hà', 'Lê Hoàng Nam'] }, { key: 'status', label: 'Trạng thái', options: ['Sắp diễn ra', 'Hoàn thành', 'Đã hủy'] }
  ] },
  groups: { title: 'Lớp học', singular: 'lớp học', fields: [
    { key: 'name', label: 'Tên lớp' }, { key: 'subject', label: 'Môn học', options: ['Vẽ cơ bản', 'Màu nước', 'Phác thảo chân dung'] },
    { key: 'teacher', label: 'Giảng viên', options: ['Nguyễn Minh Anh', 'Trần Thu Hà', 'Lê Hoàng Nam'] }, { key: 'students', label: 'Học viên' },
    { key: 'schedule', label: 'Lịch học' }, { key: 'room', label: 'Phòng học', options: ['Phòng Lavender', 'Phòng Iris', 'Phòng Peony'] },
    { key: 'status', label: 'Trạng thái', options: ['Đang hoạt động', 'Tạm dừng'] }
  ] }
}
function readData(): DemoData {
  try { const saved = localStorage.getItem(storageKey); if (saved) return { ...seed, ...JSON.parse(saved) as DemoData } } catch { /* use demo seed */ }
  return seed
}

export default function ClassesDemo({ section }: { section: Section }) {
  const navigate = useNavigate()
  const config = configs[section]
  const [data, setData] = useState<DemoData>(readData)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Tất cả')
  const [sortAsc, setSortAsc] = useState(true)
  const [page, setPage] = useState(1)
  const [calendar, setCalendar] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [dialog, setDialog] = useState<'create' | 'edit' | 'detail' | 'delete' | null>(null)
  const [active, setActive] = useState<RowData | null>(null)
  const [form, setForm] = useState<RowData>({})
  const canManage = true
  const items = data[section]
  const shown = useMemo(() => items.filter(row =>
    Object.values(row).some(value => String(value).toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi')))
      && (status === 'Tất cả' || row.status === status))
    .sort((a, b) => String(a.name).localeCompare(String(b.name), 'vi') * (sortAsc ? 1 : -1)), [items, query, status, sortAsc])
  const pageSize = 6
  const pageRows = shown.slice((page - 1) * pageSize, page * pageSize)
  const persist = (next: DemoData) => { setData(next); localStorage.setItem(storageKey, JSON.stringify(next)) }
  const openCreate = () => { setActive(null); setForm({}); setDialog('create') }
  const openEdit = (row: RowData) => { setActive(row); setForm({ ...row }); setDialog('edit') }
  const openDetail = (row: RowData) => { setActive(row); setDialog('detail') }
  const save = () => {
    const updated = { ...form, id: String(active?.id || `${section.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-5)}`) }
    persist({ ...data, [section]: dialog === 'edit' ? items.map(row => row.id === active?.id ? updated : row) : [updated, ...items] })
    setDialog(null)
  }
  const remove = (ids: string[]) => { persist({ ...data, [section]: items.filter(row => !ids.includes(String(row.id))) }); setSelected([]); setDialog(null) }
  const toggleSelected = (id: string) => setSelected(old => old.includes(id) ? old.filter(value => value !== id) : [...old, id])
  const statuses = ['Tất cả', ...Array.from(new Set(items.map(row => String(row.status))))]
  const tabs: { label: string; path: string }[] = [
    { label: 'MÔN HỌC', path: '/classes/subjects' }, { label: 'BUỔI HỌC', path: '/classes/sessions' }, { label: 'LỚP HỌC', path: '/classes/groups' }
  ]
  return <FlexStack spacing={2} sx={{ p: { xs: 2, md: 3 }, minHeight: '100%', bgcolor: '#fff' }}>
    <FlexStack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={1}>
      <Box><FlexTypography variant="h4" fontWeight={700} color="#302945">Quản lý lớp học</FlexTypography><FlexTypography color="text.secondary">Theo dõi môn học, lịch học và lớp học của DARK ARTISTRY</FlexTypography></Box>
    </FlexStack>
    <FlexStack direction="row" spacing={1} sx={{ borderBottom: '1px solid #eee' }}>{tabs.map(tab => <Button key={tab.path} onClick={() => navigate(tab.path)} sx={{ borderRadius: 0, borderBottom: location.pathname === tab.path ? '3px solid #8B78B8' : '3px solid transparent', color: location.pathname === tab.path ? '#70599f' : 'text.secondary', fontWeight: 700 }}>{tab.label}</Button>)}</FlexStack>
    <Paper variant="outlined" sx={{ p: 2, borderColor: '#eee', borderRadius: 3 }}>
      <FlexStack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ md: 'center' }}>
        <FlexTextField size="small" placeholder={`Tìm ${config.singular}...`} value={query} onChange={(e: { target: { value: string } }) => { setQuery(e.target.value); setPage(1) }} slotProps={{ input: { startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> } }} sx={{ flex: 1 }} />
        <FormControl size="small" sx={{ minWidth: 170 }}><InputLabel>Trạng thái</InputLabel><Select label="Trạng thái" value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>{statuses.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}</Select></FormControl>
        <Button onClick={() => setSortAsc(old => !old)} variant="outlined">Sắp xếp: {sortAsc ? 'A → Z' : 'Z → A'}</Button>
        <ToggleButtonGroup value={calendar ? 'calendar' : 'table'} exclusive onChange={(_, value) => value && setCalendar(value === 'calendar')} size="small"><ToggleButton value="table"><TableRows/></ToggleButton><ToggleButton value="calendar"><CalendarMonth/></ToggleButton></ToggleButtonGroup>
        {canManage && <Button variant="contained" startIcon={<Add/>} onClick={openCreate} sx={{ bgcolor: '#8874b5' }}>Thêm {config.singular}</Button>}
      </FlexStack>
    </Paper>
    {selected.length > 0 && canManage && <Alert severity="info" action={<Button color="error" startIcon={<DeleteOutlined/>} onClick={() => setDialog('delete')}>Xóa {selected.length} mục</Button>}>Đã chọn {selected.length} bản ghi</Alert>}
    {calendar ? <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>{pageRows.length ? pageRows.map(row => <Paper key={String(row.id)} variant="outlined" sx={{ p: 2, borderRadius: 3, borderLeft: '4px solid #a995d5' }}><FlexStack direction="row" spacing={1} alignItems="center"><CalendarMonth color="primary"/><FlexTypography fontWeight={700}>{String(row.name)}</FlexTypography></FlexStack><FlexTypography sx={{ mt: 1 }}>{String(row.date || row.schedule || row.duration || '')} {row.time ? `· ${row.time}` : ''}</FlexTypography><FlexTypography color="text.secondary">{String(row.room || row.teacher || row.category || '')}</FlexTypography><Chip size="small" sx={{ mt: 1 }} label={String(row.status || '')}/></Paper>) : <Alert severity="info">Không có dữ liệu phù hợp.</Alert>}</Box> : <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'auto' }}><Table size="small"><TableHead><TableRow sx={{ bgcolor: '#faf9fc' }}>
      {canManage && <TableCell padding="checkbox"><Checkbox checked={pageRows.length > 0 && pageRows.every(row => selected.includes(String(row.id)))} icon={<CheckBoxOutlineBlank/>} checkedIcon={<CheckBox/>} onChange={e => setSelected(e.target.checked ? Array.from(new Set([...selected, ...pageRows.map(row => String(row.id))])) : selected.filter(id => !pageRows.some(row => row.id === id)))}/></TableCell>}
      <TableCell>MÃ</TableCell><TableCell onClick={() => setSortAsc(old => !old)} sx={{ cursor: 'pointer', fontWeight: 700 }}>TÊN {sortAsc ? '↑' : '↓'}</TableCell>{config.fields.filter(field => field.key !== 'name').map(field => <TableCell key={field.key} sx={{ fontWeight: 700 }}>{field.label.toLocaleUpperCase('vi')}</TableCell>)}<TableCell align="right">THAO TÁC</TableCell>
    </TableRow></TableHead><TableBody>{pageRows.map(row => <TableRow hover key={String(row.id)}>
      {canManage && <TableCell padding="checkbox"><Checkbox checked={selected.includes(String(row.id))} onChange={() => toggleSelected(String(row.id))}/></TableCell>}
      <TableCell><FlexTypography variant="body2" color="text.secondary">{String(row.id)}</FlexTypography></TableCell><TableCell><FlexStack direction="row" alignItems="center" spacing={1}><Avatar sx={{ width: 30, height: 30, bgcolor: '#eee8f7', color: '#70599f', fontSize: 13 }}>{String(row.name).slice(0, 1)}</Avatar><FlexTypography fontWeight={600}>{String(row.name)}</FlexTypography></FlexStack></TableCell>
      {config.fields.filter(field => field.key !== 'name').map(field => <TableCell key={field.key}>{field.key === 'status' ? <Chip size="small" label={String(row[field.key])} color={String(row[field.key]).includes('Tạm') || String(row[field.key]).includes('hủy') ? 'default' : 'success'} variant="outlined"/> : String(row[field.key] ?? '—')}</TableCell>)}
      <TableCell align="right"><Tooltip title="Xem chi tiết"><IconButton size="small" onClick={() => openDetail(row)}><VisibilityOutlined fontSize="small"/></IconButton></Tooltip>{canManage && <><Tooltip title="Chỉnh sửa"><IconButton size="small" onClick={() => openEdit(row)}><EditOutlined fontSize="small"/></IconButton></Tooltip><Tooltip title="Xóa"><IconButton size="small" color="error" onClick={() => { setActive(row); setSelected([String(row.id)]); setDialog('delete') }}><DeleteOutlined fontSize="small"/></IconButton></Tooltip></>}</TableCell>
    </TableRow>)}{pageRows.length === 0 && <TableRow><TableCell colSpan={config.fields.length + (canManage ? 3 : 2)} align="center" sx={{ py: 5, color: 'text.secondary' }}>Không tìm thấy {config.singular} phù hợp.</TableCell></TableRow>}</TableBody></Table></Paper>}
    <FlexStack direction="row" justifyContent="space-between" alignItems="center"><FlexTypography variant="body2" color="text.secondary">{shown.length} {config.singular}{shown.length === 1 ? '' : 's'}</FlexTypography><Pagination count={Math.max(1, Math.ceil(shown.length / pageSize))} page={page} onChange={(_, value) => setPage(value)} color="primary"/></FlexStack>
    <Dialog open={dialog === 'create' || dialog === 'edit'} onClose={() => setDialog(null)} fullWidth maxWidth="sm"><DialogTitle>{dialog === 'edit' ? 'Chỉnh sửa' : 'Thêm'} {config.singular}</DialogTitle><DialogContent><FlexStack spacing={2} sx={{ pt: 1 }}>{config.fields.map(field => field.options ? <FormControl key={field.key} fullWidth><InputLabel>{field.label}</InputLabel><Select label={field.label} value={String(form[field.key] ?? '')} onChange={(e: { target: { value: string } }) => setForm(old => ({ ...old, [field.key]: e.target.value }))}>{field.options.map(value => <MenuItem value={value} key={value}>{value}</MenuItem>)}</Select></FormControl> : <FlexTextField key={field.key} label={field.label} type={field.key === 'date' ? 'date' : field.key === 'time' ? 'time' : 'text'} slotProps={field.key === 'date' || field.key === 'time' ? { inputLabel: { shrink: true } } : undefined} value={String(form[field.key] ?? '')} onChange={(e: { target: { value: string } }) => setForm(old => ({ ...old, [field.key]: e.target.value }))} fullWidth/> )}</FlexStack></DialogContent><DialogActions><Button onClick={() => setDialog(null)}>Hủy</Button><Button variant="contained" onClick={save} disabled={!form.name}>Lưu</Button></DialogActions></Dialog>
    <Dialog open={dialog === 'detail'} onClose={() => setDialog(null)} fullWidth maxWidth="sm"><DialogTitle>Chi tiết {config.singular}</DialogTitle><DialogContent><FlexStack spacing={1}>{active && config.fields.map(field => <FlexStack key={field.key} direction="row" justifyContent="space-between" gap={2}><FlexTypography color="text.secondary">{field.label}</FlexTypography><FlexTypography textAlign="right" fontWeight={600}>{String(active[field.key] ?? '—')}</FlexTypography></FlexStack>)}</FlexStack></DialogContent><DialogActions><Button onClick={() => setDialog(null)}>Đóng</Button></DialogActions></Dialog>
    <Dialog open={dialog === 'delete'} onClose={() => setDialog(null)}><DialogTitle>Xác nhận xóa</DialogTitle><DialogContent>Bạn có chắc muốn xóa {selected.length > 1 ? `${selected.length} bản ghi đã chọn` : `“${active?.name ?? 'bản ghi này'}”`}? Thao tác này sẽ cập nhật dữ liệu demo trên thiết bị.</DialogContent><DialogActions><Button onClick={() => setDialog(null)}>Hủy</Button><Button color="error" variant="contained" onClick={() => remove(selected.length ? selected : [String(active?.id)])}>Xóa</Button></DialogActions></Dialog>
  </FlexStack>
}





