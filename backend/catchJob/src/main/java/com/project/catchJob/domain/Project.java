package com.project.catchJob.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"member", "projectCommentsList", "projectLikeList", "projectReasonList"})
@Entity
public class Project {

	@Id @GeneratedValue @Column(name = "project_id")
	private Long projectId;
	
	private String pType; // �о�
	
	private String pTitle;
	
	private String pContents;
	
	private String pLoc; // ����
	
	private String pPeriod; // �����Ⱓ
	
	private String pPlatform; // ����÷���
	
	@Column(insertable = false, updatable = false, columnDefinition = "bigint default 0")
	private int pCnt; // ��ȸ��
	
	@Column(insertable = false, updatable = false, columnDefinition = "bigint default 0")
	private int pLike; // ���ƿ䰹��	
	
	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false, updatable = false)
	private Member member;
	
	public void setMember(Member member) {
		this.member = member;
		member.getProjectList().add(this);
	}

	@OneToMany(mappedBy = "project")
	private List<P_comments> projectCommentsList = new ArrayList<>();
	
	@OneToMany(mappedBy = "project")
	private List<P_like> projectLikeList = new ArrayList<>();	
	
	@OneToMany(mappedBy = "project")
	private List<P_reason> projectReasonList = new ArrayList<>();	
	
	@OneToMany(mappedBy = "project")
	private List<P_member> projectMemberList = new ArrayList<>();	
}