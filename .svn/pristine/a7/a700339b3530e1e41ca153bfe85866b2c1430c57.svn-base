package com.xr.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.quartz.DisallowConcurrentExecution;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import com.xr.entity.XGClass;
import com.xr.entity.XGRecord;
import com.xr.entity.XG_Seek;
import com.xr.service.XG_PatrolAnalysisService;
import com.xr.util.ThreadLocalDate;
import com.xr.util.ThreadLocalDateTwo;
import com.xr.util.ThreadLocalDateUtil;
import com.xr.util.TimeUtil;

/**
 * @ClassName XG_PatrolAnalysisController
 * @Description 巡更分析服务
 * @Author csc
 * @Date 2019年11月19日 上午11:35:40
 */
@DisallowConcurrentExecution
public class XG_PatrolAnalysisController {

	
	XG_Seek seek = new XG_Seek();// 巡更分析专用的封装实体类

	XGRecord record = new XGRecord();// 巡更实时记录表
	//放入分隔好的小班段时间
	List<String> TIMELIST = new ArrayList<>();

	// XXX为要打印日志的类名
	public static final Logger logger = LoggerFactory.getLogger(XG_PatrolAnalysisController.class);

	@Autowired
	private XG_PatrolAnalysisService pservice;// 引入巡更分析的业务层

	/**
	 * 巡更分析处理
	 * 
	 * @throws ParseException
	 */
	public void PatrolAnalysis() throws ParseException {

		// 查询线路
		List<Map<String, Object>> routelist = pservice.queryRouteAndNode();

		if (routelist.size() == 0) {// 线路如果为空
			logger.trace("PatrolAnalysis:巡更分析没有查询到线路");
		} else {// 如果线路不为空

			for (int i = 0; i < routelist.size(); i++) {

				Integer routeid = (Integer) routelist.get(i).get("routeid");// 线路编号

				String routename = (String) routelist.get(i).get("routename");// 线路名称

				String eunite = (String) routelist.get(i).get("eunite");//线路所关联的卡号
				
				// 通过routeid查找到巡更线路下的所有班次
				XGClass[] classarray = pservice.queryClass(routeid);

				if (classarray.length == 0) {// 如果数组等于O,则代表该条线路(routeid)没有对应的班次
					continue;// 跳出循环
				} else {// 如果班次不为空就循环获取班次对应的巡更时间

					for (XGClass xgclass : classarray) {// 增强型for循环

						/** 班次主键 */
						Integer classid = xgclass.getClassid();

						/** 班次名称 */
						String classname = xgclass.getClassname();

						// 巡更开始时间*/
						String startshift = xgclass.getStartingtimeofshift();

						// 巡更结束时间*/
						String classhift = xgclass.getClosingtimeofshift();

						// 巡更时间段长度(巡更时长)*/
						Integer patrolduration = xgclass.getPatrolduration();

						// 巡更时间间隔*/
						Integer patrolintervallength = xgclass.getPatrolintervallength();

						// 巡更最短时长*/
						Integer classerrorrange = xgclass.getClasserrorrange();

						Date dd = new Date();// 获取当前时间

						// 判断当前时间是否在-巡更班次的开始时间和结束时间
						boolean flay = TimeUtil.isEffectiveDate(ThreadLocalDate.parse(ThreadLocalDate.formatDate(dd)),
								ThreadLocalDate.parse(startshift), ThreadLocalDate.parse(classhift));

						if (!flay) {// 如果当前时间不在线路的巡更班次中,直接跳过
							continue; // 跳出循环
						} else {// 如果存在,进行分析

							// 通过(巡更开始时间~巡更结束时间~巡更时长)来分隔该时间~然后计算出分割后所有巡更时间段的开始时间
							TIMELIST = TimeUtil.getIntervalTimeList(startshift, classhift,
									(patrolduration + patrolintervallength));

							Date before = null;// 上一个班次的开始时间
							Date present = null;// 当前班次的开始时间
							Date endpresent = null;// 当前班次的结束时间

							for (int j = 0; j < TIMELIST.size(); j++) {// 循环读取分割好后的班段开始时间

								Date startup = ThreadLocalDate.parse(TIMELIST.get(j).toString());// 分割班次开始时间

								Date endup = TimeUtil.getAddMINUTE(ThreadLocalDate.parse(TIMELIST.get(j).toString()),
										patrolduration);// 分割班次的结束时间

								// 判断当前时间在哪一个分隔的时间中
								boolean flat = TimeUtil.isEffectiveDate(
										ThreadLocalDate.parse(ThreadLocalDate.formatDate(dd)), startup, endup);

								if (flat) {// 如果当前时间在某一个分隔的时间中
									present = startup;
									endpresent = endup;
									// 当前时间减去(巡更班次时间+巡更休息时间)得到上一个班次的时间
									Date Front = TimeUtil.getCutMINUTE(startup,
											(patrolduration + patrolintervallength));

									// 将第一个时间与得到的上一个班次的时间进行对比(（如果myDate>compareDate返回1，<返回-1，相等返回0）
									// )
									int compare = TimeUtil
											.dateCompare(ThreadLocalDate.parse(TIMELIST.get(0).toString()), Front);

									if (compare == -1 || compare == 0) {// 如果分割后的第一个班次开始时间(<)小于上一个班次的时间
										before = Front;
									}
									break;
								} else {
									continue;
								}
							} // end 结束循环读取班次的循环
							// 通过线路编号查找线路的节点信息
							List<Map<String, Object>> nodelist = pservice.queryDoorNo(routeid);

							List<Integer> node = new ArrayList<>(); // 放入漏寻的门区

							if (before == null) {//上一个班次
								logger.trace("before:巡更分析没有上一个班次");
							} else {
								seek.setXgstarttime(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
										ThreadLocalDate.formatDate(before)));// 放入上一个班次的开始时间
								seek.setXgendtime(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
										ThreadLocalDate.formatDate(TimeUtil.getAddMINUTE(before, patrolduration))));// 放入上一个班次的结束时间

								for (int n = 0; n < nodelist.size(); n++) {
									Integer doorno = (Integer) nodelist.get(n).get("doorno");// 获取门区编号(节点编号)
									seek.setDoorno(doorno);
									seek.setRouteid(routeid);
                                     seek.setEunite(null);
									Map<String, Object> iomap = pservice.queryIoDataXG(seek);// 查询班次的打卡情况

									if (iomap == null) {
										node.add(doorno);
										seek.setDatatype("lx");// 放入漏寻类型的数据,用于查询是否已经处理过
										seek.setDoorno(doorno);
										seek.setRouteid(routeid);
                                        seek.setEunite(null);//放入该条线路所对应的卡号
										boolean beforlxflay = pservice.queryRecord(seek);//查询是否生成了对应的巡更结果

										if (!beforlxflay) {// 不等于true
											record.setCardswipetime(ThreadLocalDateUtil.parse(TimeUtil.splitDate(
													ThreadLocalDateTwo.formatDate(dd),
													ThreadLocalDate.formatDate(TimeUtil.getAddMINUTE(before, 2)))));// 生成漏寻数据
											record.setRouteid(routeid);record.setRoutename(routename);
											record.setClassid(classid);record.setClassname(classname);
											record.setPatrolstartingtime(ThreadLocalDateUtil
													.parse(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
															ThreadLocalDate.formatDate(before))));// 上一个班次的巡更开始时间
											record.setPatrolendingtime(ThreadLocalDateUtil.parse(TimeUtil.splitDate(
													ThreadLocalDateTwo.formatDate(dd), ThreadLocalDate.formatDate(
															TimeUtil.getAddMINUTE(before, patrolduration)))));// 上一个班次的巡更结束时间
											record.setDatatype("lx");//数据类型
											record.setCardswipedesc("lx");//刷卡描述
											record.setRecorddescription("漏寻");record.setDoorno(doorno);
											pservice.insertXGRecord(record);// 添加数据
											record.setRecorddescription("");
										} else {logger.trace("before:班次名称" + classname + "线路编号:" + routeid + "已经有结果处理了");}
									} else {
										continue;
									}
								} // end 结束门区编号的循环
								if (node.size() != 0) {
									seek.setDatatype("bj");
									seek.setRouteid(routeid);
									seek.setDoorno(null);seek.setEunite(null);
									boolean beforbjflay = pservice.queryRecord(seek);
									if (!beforbjflay) {// 不等于true
										record.setCardswipetime(ThreadLocalDateUtil
												.parse(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
														ThreadLocalDate.formatDate(TimeUtil.getAddMINUTE(before, 2)))));// 生成报警
										record.setRouteid(routeid);
										record.setClassid(classid);
										record.setClassname(classname);
										record.setPatrolstartingtime(ThreadLocalDateUtil
												.parse(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
														ThreadLocalDate.formatDate(before))));// 上一个班次的巡更开始时间
										record.setPatrolendingtime(ThreadLocalDateUtil.parse(
												TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd), ThreadLocalDate
														.formatDate(TimeUtil.getAddMINUTE(before, patrolduration)))));// 上一个班次的巡更结束时间
										record.setRoutename(routename);
										record.setRecorddescription("漏寻");//记录描述
										record.setDatatype("bj");
										record.setCardswipedesc("bj");
										record.setDoorno(null);
										pservice.insertXGRecord(record);// 添加数据
										node.clear();
									} else {
										logger.trace("before:班次名称" + routename + "线路编号:" + routeid + ":已经生成了结果数据");
									}

								} else {// 如果node为空那么所有数据点全都处理过了

									if (nodelist.size() - 1 < 0) {
										logger.trace("before:班次名称" + routename + "线路编号:" + classname + ":该线路节点小于两个");
									} else {

										seek.setDoorno((Integer) nodelist.get(nodelist.size() - 1).get("doorno"));// 给doorno放入最后一个节点(doorno)
										seek.setEunite(eunite);//放入巡更对应的巡更卡
										Map<String, Object> zuihou = pservice.queryIoDataXG(seek);
										seek.setDoorno((Integer) nodelist.get(0).get("doorno"));// 给doorno放入第一节点(doorno)
										seek.setEunite(eunite);//放入线路对应的巡更卡
										Map<String, Object> diyi = pservice.queryIoDataXG(seek);

										int commper = TimeUtil.getDatePoor(
												ThreadLocalDateUtil.parse((String) zuihou.get("iodate")),
												ThreadLocalDateUtil.parse((String) diyi.get("iodate")));
										if (commper >= classerrorrange) {
											logger.trace("before:班次名称" + routename + "线路编号:" + routeid + ":巡更数据完全规范");
										} else {
											seek.setDatatype("bj");
											seek.setRouteid(routeid);
											seek.setDoorno(null);
											seek.setEunite(null);
											boolean chaoshibj = pservice.queryRecord(seek);

											if (chaoshibj) {// 等于true,执行
												logger.trace(
														"before:班次名称" + routename + "线路编号:" + routeid + ":已生成线路分析结果");
											} else {
												record.setCardswipetime(ThreadLocalDateUtil.parse(TimeUtil.splitDate(
														ThreadLocalDateTwo.formatDate(dd),
														ThreadLocalDate.formatDate(TimeUtil.getAddMINUTE(before, 2)))));// 生成报警
												record.setRouteid(routeid);record.setDoorno(null);
												record.setClassid(classid);record.setClassname(classname);
												record.setPatrolstartingtime(ThreadLocalDateUtil
														.parse(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
																ThreadLocalDate.formatDate(before))));// 上一个班次的巡更开始时间
												record.setPatrolendingtime(ThreadLocalDateUtil.parse(TimeUtil.splitDate(
														ThreadLocalDateTwo.formatDate(dd), ThreadLocalDate.formatDate(
																TimeUtil.getAddMINUTE(before, patrolduration)))));// 上一个班次的巡更结束时间
												record.setRoutename(routename);
												record.setDatatype("bj");//数据类型
												record.setRecorddescription("巡更总时间小于允许的最短时间");
												record.setCardswipedesc("bj");//刷卡描述
												pservice.insertXGRecord(record);// 添加数据
												record.setRecorddescription("");
											}
										} // end
											// 判断最后一个节点与第一个节点的相差时间是否大于等于允许巡更的最短时间
									} // end
								} // 判断节点有几个
							} // 结束之前班次是否存在的判断

							// 巡更当前班次的开始时间
							String xgstarttime = TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
									ThreadLocalDate.formatDate(present));

							seek.setXgstarttime(xgstarttime);

							// 巡更当前班次的开始时间
							String xgendtime = TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
									ThreadLocalDate.formatDate(endpresent));

							seek.setXgendtime(xgendtime);

							List<Integer> deno = new ArrayList<>(); // 放入当前班段未巡的门区

							if (present != null) {// 当前班次

								for (int n = 0; n < nodelist.size(); n++) {

									Integer doorno = (Integer) nodelist.get(n).get("doorno");// 获取门区编号(节点编号)
									seek.setDoorno(doorno);
									seek.setEunite(eunite);//放入线路所关联的卡号
									Map<String, Object> iomap = pservice.queryIoDataXG(seek);// 查询是否有打卡记录
									if (iomap == null) {
										deno.add(doorno);
										continue;
									} else {// 如果漏寻的门区不为空
										seek.setDatatype("zc");
										seek.setDoorno(doorno);// 巡更节点
										seek.setContrast((String) iomap.get("iodate"));//放入最大打卡时间
										seek.setEunite(eunite);
										boolean currecord = pservice.queryCurrentRecord(seek);// 用于判断同一节点和同一时间下是否已经生成对应的巡更结果
										if (!currecord) {//如果没有查询到
											record.setCardswipetime(
													ThreadLocalDateUtil.parse((String) iomap.get("iodate")));// 获取打卡记录
											record.setRouteid(routeid);record.setDoorno(doorno);
											record.setClassid(classid);record.setClassname(classname);
											record.setCardno((Integer) iomap.get("cardno"));
											record.setPatrolstartingtime(ThreadLocalDateUtil
													.parse(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
															ThreadLocalDate.formatDate(present))));// 当前班次的巡更开始时间
											record.setPatrolendingtime(ThreadLocalDateUtil
													.parse(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
															ThreadLocalDate.formatDate(endpresent))));// 当前班次的巡更结束时间
											record.setRoutename(routename);
											record.setDatatype("zc");
											record.setCardswipedesc("zc");//刷卡描述
											record.setRecorddescription("刷卡正常");//记录描述
											pservice.insertXGRecord(record);// 添加数据
											record.setRecorddescription("");
										} else {
											logger.trace("before:线路名称" + routename + "班次名称:" + classname + ":已放入相同数据");
										}

										if (deno.size() != 0) {
											for (int t = 0; t < deno.size(); t++) {
												seek.setDoorno(deno.get(t));// 放入漏寻的门区编号
												seek.setRouteid(routeid);
												seek.setDatatype("lx");// 放入类型
												seek.setEunite(null);//卡号
												boolean panduan = pservice.queryRecord(seek);// 查询是否已经生成了漏寻记录
												if (!panduan) {// 如果没有查询到执行(flase)
													record.setCardswipetime(ThreadLocalDateUtil
															.parse(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
																	ThreadLocalDate.formatDate(
																			TimeUtil.getAddMINUTE(present, 2)))));// 生成漏寻数据
													record.setRouteid(routeid);record.setDoorno(deno.get(t));
													record.setClassid(classid);record.setClassname(classname);
													record.setPatrolstartingtime(ThreadLocalDateUtil
															.parse(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
																	ThreadLocalDate.formatDate(present))));// 当前班次的巡更开始时间
													record.setPatrolendingtime(ThreadLocalDateUtil
															.parse(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
																	ThreadLocalDate.formatDate(endpresent))));// 当前班次的巡更结束时间
													record.setRoutename(routename);
													record.setDatatype("lx");
													record.setCardswipedesc("lx");
													record.setRecorddescription("巡更漏寻");
													pservice.insertXGRecord(record);// 添加数据
													record.setRecorddescription("");
												} else {
													logger.trace("before:节点编号:" + deno.get(t) + "班次名称:" + classname
															+ ":已生成相同数据");
												}

												seek.setRouteid(routeid);
												seek.setDatatype("bj");
												seek.setDoorno(null);
												boolean duibi = pservice.queryRecord(seek);// 查询是否已经生成了报警记录
												if (!duibi) {// 未查询到值
													record.setCardswipetime(dd);// 生成报警数据
													record.setRouteid(routeid);record.setDoorno(null);
													record.setClassid(classid);record.setClassname(classname);
													record.setPatrolstartingtime(ThreadLocalDateUtil
															.parse(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
																	ThreadLocalDate.formatDate(present))));// 当前班次的巡更开始时间
													record.setPatrolendingtime(ThreadLocalDateUtil
															.parse(TimeUtil.splitDate(ThreadLocalDateTwo.formatDate(dd),
																	ThreadLocalDate.formatDate(endpresent))));// 当前班次的巡更结束时间
													record.setRoutename(routename);
													record.setDatatype("bj");
													record.setCardswipedesc("bj");
													record.setRecorddescription("巡更漏寻");
													pservice.insertXGRecord(record);// 添加数据
													record.setRecorddescription("");
												} else {
													logger.trace("before:线路名称" + routename + "班次名称:" + classname
															+ ":已放入相同数据");
												}
											} // end for循环读取漏寻的节点
											deno.clear();
										} else {
											logger.trace("PatrolAnalysis:当前班次没有漏寻");
										}
									}
								} // end 结束节点读取的循环
							}
							TIMELIST.clear();
						} // end 结束当前时间不在线路的巡更班次中的判断
					} // end for循环遍历班次
				} // end 判断班次是否存在
			} // end 循环路线结束
		} // end 线路判断是否为空(routelist)
	}// end 方法
	
	
}
